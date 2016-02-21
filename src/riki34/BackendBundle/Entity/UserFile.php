<?php

namespace riki34\BackendBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use riki34\BackendBundle\Constants\ServerConstants;
use riki34\BackendBundle\Interfaces\JsonEntity;
use Symfony\Component\Filesystem\Filesystem;

/**
 * UserFile
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="riki34\BackendBundle\Repository\UserFileRepository")
 */
class UserFile implements JsonEntity
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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="extension", type="string", length=255, nullable=true)
     */
    private $extension;

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
     * @var integer
     * @ORM\Column(name="user_id", type="integer")
     */
    private $userId;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="riki34\BackendBundle\Entity\User", inversedBy="files")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @var float
     *
     * @ORM\Column(name="size", type="float")
     */
    private $size;

    /**
     * @var integer
     *
     * @ORM\Column(name="directory_id", type="integer")
     */
    private $directoryId;

    /**
     * @var string
     * @ORM\Column(name="path", type="string", length=2000)
     */
    private $path;

    /**
     * @var UserDirectory
     * @ORM\ManyToOne(targetEntity="riki34\BackendBundle\Entity\UserDirectory", inversedBy="files")
     * @ORM\JoinColumn(name="directory_id", referencedColumnName="id")
     */
    private $directory;

    /**
     * UserFile constructor.
     * @param string|null $name
     * @param User|null $user
     * @param UserDirectory|null $directory
     */
    public function __construct($name = null, $user = null, $directory = null) {
        $fs = new Filesystem();
        $this->name = $name;
        $this->setUser($user);
        $this->setDirectory($directory);
        if ($user !== null && $name !== null && $directory !== null) {
            $filename = explode('.', $name);
            $this->extension = (count($filename) > 1) ? $filename[count($filename) - 1] : null;
            $filePath = sprintf('%s/%s', $directory->getFullPath(), $name);
            $fs->touch($filePath);
            $this->setPath(sprintf('%s/%s', $directory->getPath(), $name));
        }
        $this->size = 0;
    }

    public function getFullInArray() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'extension' => $this->extension,
            'path' => $this->getFullPath(),
            'userID' => $this->userId,
            'created' => $this->created->format(\DateTime::ISO8601),
            'updated' => $this->updated->format(\DateTime::ISO8601),
            'directoryID' => $this->directoryId,
        ];
    }

    public function getMinInArray() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'extension' => $this->extension,
            'path' => $this->getFullPath(),
            'userID' => $this->userId,
            'created' => $this->created->format(\DateTime::ISO8601),
            'updated' => $this->updated->format(\DateTime::ISO8601),
            'directoryID' => $this->directoryId,
        ];
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
     * Set name
     *
     * @param string $name
     *
     * @return UserFile
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
     * Set extension
     *
     * @param string $extension
     *
     * @return UserFile
     */
    public function setExtension($extension)
    {
        $this->extension = $extension;

        return $this;
    }

    /**
     * Get extension
     *
     * @return string
     */
    public function getExtension()
    {
        return $this->extension;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return UserFile
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set size
     *
     * @param float $size
     *
     * @return UserFile
     */
    public function setSize($size)
    {
        $this->size = $size;

        return $this;
    }

    /**
     * Get size
     *
     * @return float
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * Set directoryId
     *
     * @param integer $directoryId
     *
     * @return UserFile
     */
    public function setDirectoryId($directoryId)
    {
        $this->directoryId = $directoryId;

        return $this;
    }

    /**
     * Get directoryId
     *
     * @return integer
     */
    public function getDirectoryId()
    {
        return $this->directoryId;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     *
     * @return UserFile
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
     * Set user
     *
     * @param \riki34\BackendBundle\Entity\User $user
     *
     * @return UserFile
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
     * Set directory
     *
     * @param \riki34\BackendBundle\Entity\UserDirectory $directory
     *
     * @return UserFile
     */
    public function setDirectory(\riki34\BackendBundle\Entity\UserDirectory $directory = null)
    {
        $this->directory = $directory;

        return $this;
    }

    /**
     * Get directory
     *
     * @return \riki34\BackendBundle\Entity\UserDirectory
     */
    public function getDirectory()
    {
        return $this->directory;
    }

    /**
     * Set path
     *
     * @param string $path
     *
     * @return UserFile
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

    public function getFullPath() {
        return ServerConstants::FILESYSTEM_BASE_DIR . $this->path;
    }

    /**
     * Set updated
     *
     * @param \DateTime $updated
     *
     * @return UserFile
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
