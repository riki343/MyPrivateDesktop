<?php

namespace riki34\BackendBundle\Entity;

use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use riki34\BackendBundle\Constants\ServerConstants;
use riki34\BackendBundle\Interfaces\JsonEntity;
use riki34\BackendBundle\Utils\JsonTransformer;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * UserDirectory
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="riki34\BackendBundle\Repository\UserDirectoryRepository")
 */
class UserDirectory implements JsonEntity
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer")
     */
    private $userId;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="riki34\BackendBundle\Entity\User", inversedBy="directories")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     * @ORM\Column(name="path", type="string", length=2000)
     */
    private $path;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="riki34\BackendBundle\Entity\UserFile",
     *     mappedBy="directory", fetch="EAGER", cascade={"remove"})
     */
    private $files;

    /**
     * @var integer
     * @ORM\Column(name="parent_id", type="integer", nullable=true)
     */
    private $parentId;

    /**
     * @var UserDirectory
     * @ORM\ManyToOne(targetEntity="riki34\BackendBundle\Entity\UserDirectory", inversedBy="subdirs")
     * @ORM\JoinColumn(name="parent_id", referencedColumnName="id")
     */
    private $parent;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="riki34\BackendBundle\Entity\UserDirectory",
     *     mappedBy="parent", cascade={"remove"}, fetch="LAZY")
     */
    private $subdirs;

    /**
     * @var boolean
     * @ORM\Column(name="is_root", type="boolean")
     */
    private $isRoot;

    /**
     * @var \DateTime $created
     *
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     */
    protected $created;

    /**
     * @var \DateTime $updated
     *
     * @Gedmo\Timestampable(on="update")
     * @ORM\Column(type="datetime")
     */
    protected $updated;

    /**
     * UserDirectory constructor.
     * @param string|null $name
     * @param User|null $user
     * @param UserDirectory|null $directory
     */
    public function __construct($name = null, $user = null, $directory = null) {
        $this->files   = new ArrayCollection();
        $this->subdirs = new ArrayCollection();
        $this->isRoot  = false;

        $fs = new Filesystem();
        $this->name = $name;
        $this->setUser($user);
        $this->setParent($directory);
        if ($user !== null && $name !== null && $directory !== null) {
            $filePath = sprintf('%s/%s/%s',
                ServerConstants::FILESYSTEM_BASE_DIR,
                $directory->getPath(), '/' . $name
            );
            $fs->mkdir($filePath);
            $this->setPath(sprintf('%s/%s', $directory->getPath(), $name));
        }
    }

    public function getFullInArray() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'parentID' => $this->parentId,
            'path' => $this->getFullPath(),
            'userID' => $this->userId,
            'subdirs' => JsonTransformer::arrayToMinJson($this->getSubdirs()),
            'files' => JsonTransformer::arrayToFullJson($this->getFiles()),
            'created' => $this->created->format(\DateTime::ISO8601),
            'updated' => $this->updated->format(\DateTime::ISO8601),
        ];
    }

    public function getMinInArray() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'parentID' => $this->parentId,
            'path' => $this->getFullPath(),
            'userID' => $this->userId,
            'created' => $this->created->format(\DateTime::ISO8601),
            'updated' => $this->updated->format(\DateTime::ISO8601),
        ];
    }

    /**
     * @param UploadedFile $file
     * @return UserFile
     */
    public function uploadFile($file) {
        $exist = $this->checkFileName($file->getClientOriginalName());
        $filenameArray = explode('.', $file->getClientOriginalName());
        if ($exist === true) {
            $counter = 1;
            do {
                $filename = $filenameArray[count($filenameArray) - 2] + $counter++;
                $filenameArray[count($filenameArray) - 2] = $filename;
                $filename = implode('.', $filenameArray);
            } while ($this->checkFileName($filename) === true);
        } else {
            $filename = $file->getClientOriginalName();
        }
        $Arr = $this->getFullInArray();
        $file->move($Arr['path'], $filename);
        $file = new UserFile($filename, null, $this);

        return $file;
    }

    private function checkFileName($filename) {
        $existing = false;
        /** @var UserFile $file */
        foreach ($this->getFiles() as $file) {
            if ($file->getName() === $filename) {
                $existing = true; break;
            }
        }

        return $existing;
    }


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     *
     * @return UserDirectory
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return integer
     */
    public function getUserId()
    {
        return $this->userId;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return UserDirectory
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set created
     *
     * @param string $created
     *
     * @return UserDirectory
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return string
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Add file
     *
     * @param \riki34\BackendBundle\Entity\UserFile $file
     *
     * @return UserDirectory
     */
    public function addFile(\riki34\BackendBundle\Entity\UserFile $file)
    {
        $this->files[] = $file;

        return $this;
    }

    /**
     * Remove file
     *
     * @param \riki34\BackendBundle\Entity\UserFile $file
     */
    public function removeFile(\riki34\BackendBundle\Entity\UserFile $file)
    {
        $this->files->removeElement($file);
    }

    /**
     * Get files
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFiles()
    {
        return $this->files;
    }

    /**
     * Set path
     *
     * @param string $path
     *
     * @return UserDirectory
     */
    public function setPath($path)
    {
        $this->path = $path;

        return $this;
    }

    /**
     * Get path
     *
     * @return string
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * @return string
     */
    public function getFullPath() {
        return ServerConstants::FILESYSTEM_BASE_DIR . $this->path;
    }

    /**
     * Set parentId
     *
     * @param integer $parentId
     *
     * @return UserDirectory
     */
    public function setParentId($parentId)
    {
        $this->parentId = $parentId;

        return $this;
    }

    /**
     * Get parentId
     *
     * @return integer
     */
    public function getParentId()
    {
        return $this->parentId;
    }

    /**
     * Set parent
     *
     * @param \riki34\BackendBundle\Entity\UserDirectory $parent
     *
     * @return UserDirectory
     */
    public function setParent(\riki34\BackendBundle\Entity\UserDirectory $parent = null)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Get parent
     *
     * @return \riki34\BackendBundle\Entity\UserDirectory
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * Add subdir
     *
     * @param \riki34\BackendBundle\Entity\UserDirectory $subdir
     *
     * @return UserDirectory
     */
    public function addSubdir(\riki34\BackendBundle\Entity\UserDirectory $subdir)
    {
        $this->subdirs[] = $subdir;

        return $this;
    }

    /**
     * Remove subdir
     *
     * @param \riki34\BackendBundle\Entity\UserDirectory $subdir
     */
    public function removeSubdir(\riki34\BackendBundle\Entity\UserDirectory $subdir)
    {
        $this->subdirs->removeElement($subdir);
    }

    /**
     * Get subdirs
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSubdirs()
    {
        return $this->subdirs;
    }

    /**
     * Set user
     *
     * @param \riki34\BackendBundle\Entity\User $user
     *
     * @return UserDirectory
     */
    public function setUser(\riki34\BackendBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \riki34\BackendBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set isRoot
     *
     * @param boolean $isRoot
     *
     * @return UserDirectory
     */
    public function setIsRoot($isRoot)
    {
        $this->isRoot = $isRoot;

        return $this;
    }

    /**
     * Get isRoot
     *
     * @return boolean
     */
    public function getIsRoot()
    {
        return $this->isRoot;
    }

    /**
     * Set updated
     *
     * @param \DateTime $updated
     *
     * @return UserDirectory
     */
    public function setUpdated($updated)
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * Get updated
     *
     * @return \DateTime
     */
    public function getUpdated()
    {
        return $this->updated;
    }
}
