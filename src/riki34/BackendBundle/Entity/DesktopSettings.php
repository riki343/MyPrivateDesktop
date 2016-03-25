<?php

namespace riki34\BackendBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use riki34\BackendBundle\Constants\ServerConstants;
use riki34\BackendBundle\Interfaces\JsonEntity;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use riki34\BackendBundle\Entity\UserFile;

/**
 * DesktopSettings
 *
 * @ORM\Table(name="desktop_settings")
 * @ORM\Entity
 */
class DesktopSettings implements JsonEntity
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
     * @ORM\Column(name="desktop_id", type="integer", nullable=true)
     */
    private $desktopId;

    /**
     * @var Desktop
     * @ORM\OneToOne(targetEntity="riki34\BackendBundle\Entity\Desktop", inversedBy="settings")
     * @ORM\JoinColumn(name="desktop_id", referencedColumnName="id")
     */
    private $desktop;

    /**
     * @var string
     *
     * @ORM\Column(name="background_image", type="string", length=255)
     */
    private $backgroundImage;

    /**
     * @var string
     *
     * @ORM\Column(name="background_position", type="string", length=255)
     */
    private $backgroundPosition;

    /**
     * @var string
     *
     * @ORM\Column(name="background_size", type="string", length=255)
     */
    private $backgroundSize;

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
     * DesktopSettings constructor.
     * @param null|string $image
     * @param null|string $position
     * @param null|string $size
     * @param null|Desktop $desktop
     */
    public function __construct($image = null, $position = null, $size = null, $desktop = null) {
        $this->setBackgroundImage($image);
        $this->setBackgroundPosition($position);
        $this->setBackgroundSize($size);

        if ($desktop !== null) {

        }
    }

    public function uploadImage(UploadedFile $image, User $user) {
        $webpath  =  '/files/resources/desktop-images/' . $user->getUsername() . '/';
        $apppath = __DIR__ . '/../../../../web';
        $fs = new Filesystem();

        if ($this->getBackgroundImage() !== ServerConstants::DEFAULT_BACKGROUND_IMAGE) {
            $fs->remove($apppath . $this->getBackgroundImage());
        }

        $image->move($apppath . $webpath, $image->getClientOriginalName());
        $this->setBackgroundImage($webpath . $image->getClientOriginalName());

        return $this;
    }

    public function changeBckImage(UserFile $image, User $user) {
        $webpath  =  '/files/resources/desktop-images/' . $user->getUsername() . '/';
        $apppath = __DIR__ . '/../../../../web';
        $fs = new Filesystem();
        if ($this->getBackgroundImage() !== ServerConstants::DEFAULT_BACKGROUND_IMAGE) {
            $fs->remove($apppath . $this->getBackgroundImage());
        }
        $fs->copy($apppath . $image->getWebPath(), $apppath . $webpath . $image->getName());
        $this->setBackgroundImage($webpath . $image->getName());

        return $this;
    }

    /**
     * @param array $data
     * @return DesktopSettings
     */
    public function setCss($data) {
        $this->setBackgroundImage($data['background-image']);
        $this->setBackgroundPosition($data['background-position']);
        $this->setBackgroundSize($data['background-size']);
    }

    public function getFullInArray() {
        return [
            'backgroundImage'      => $this->getBackgroundImage(),
            'backgroundPosition'   => $this->getBackgroundPosition(),
            'backgroundSize'       => $this->getBackgroundSize(),
        ];
    }

    public function getMinInArray() {
        return [
            'backgroundImage'      => $this->getBackgroundImage(),
            'backgroundPosition'   => $this->getBackgroundPosition(),
            'backgroundSize'       => $this->getBackgroundSize(),
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
     * Set desktopId
     *
     * @param integer $desktopId
     *
     * @return DesktopSettings
     */
    public function setDesktopId($desktopId)
    {
        $this->desktopId = $desktopId;

        return $this;
    }

    /**
     * Get desktopId
     *
     * @return integer
     */
    public function getDesktopId()
    {
        return $this->desktopId;
    }

    /**
     * Set backgroundImage
     *
     * @param string $backgroundImage
     *
     * @return DesktopSettings
     */
    public function setBackgroundImage($backgroundImage)
    {
        $this->backgroundImage = $backgroundImage;

        return $this;
    }

    /**
     * Get backgroundImage
     *
     * @return string
     */
    public function getBackgroundImage()
    {
        return $this->backgroundImage;
    }

    /**
     * Set backgroundPosition
     *
     * @param string $backgroundPosition
     *
     * @return DesktopSettings
     */
    public function setBackgroundPosition($backgroundPosition)
    {
        $this->backgroundPosition = $backgroundPosition;

        return $this;
    }

    /**
     * Get backgroundPosition
     *
     * @return string
     */
    public function getBackgroundPosition()
    {
        return $this->backgroundPosition;
    }

    /**
     * Set backgroundSize
     *
     * @param string $backgroundSize
     *
     * @return DesktopSettings
     */
    public function setBackgroundSize($backgroundSize)
    {
        $this->backgroundSize = $backgroundSize;

        return $this;
    }

    /**
     * Get backgroundSize
     *
     * @return string
     */
    public function getBackgroundSize()
    {
        return $this->backgroundSize;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return DesktopSettings
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
     * Set updated
     *
     * @param \DateTime $updated
     *
     * @return DesktopSettings
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

    /**
     * Set desktop
     *
     * @param \riki34\BackendBundle\Entity\Desktop $desktop
     *
     * @return DesktopSettings
     */
    public function setDesktop(\riki34\BackendBundle\Entity\Desktop $desktop = null)
    {
        $this->desktop = $desktop;

        return $this;
    }

    /**
     * Get desktop
     *
     * @return \riki34\BackendBundle\Entity\Desktop
     */
    public function getDesktop()
    {
        return $this->desktop;
    }
}
