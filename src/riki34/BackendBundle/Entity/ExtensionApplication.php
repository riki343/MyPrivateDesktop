<?php

namespace riki34\BackendBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use riki34\BackendBundle\Interfaces\JsonEntity;

/**
 * ExtensionApplication
 *
 * @ORM\Table("extension_application")
 * @ORM\Entity(repositoryClass="riki34\BackendBundle\Repository\ExtensionApplicationRepository")
 */
class ExtensionApplication implements JsonEntity
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
     * @ORM\Column(name="extension", type="string", length=255)
     */
    private $extension;

    /**
     * @var string
     *
     * @ORM\Column(name="application", type="string", length=500)
     */
    private $application;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer")
     */
    private $userID;

    /**
     * @var integer
     *
     * @ORM\Column(name="desktop_id", type="integer")
     */
    private $desktopID;

    public function getFullInArray() {
        return [
            'id' => $this->getId(),
            'extension' => $this->getExtension(),
            'application' => $this->getApplication(),
            'userID' => $this->getUserID(),
            'desktopID' => $this->getDesktopID(),
        ];
    }

    public function getMinInArray() {
        return [
            'id' => $this->getId(),
            'extension' => $this->getExtension(),
            'application' => $this->getApplication(),
            'userID' => $this->getUserID(),
            'desktopID' => $this->getDesktopID(),
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
     * Set extension
     *
     * @param string $extension
     *
     * @return ExtensionApplication
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
     * Set application
     *
     * @param string $application
     *
     * @return ExtensionApplication
     */
    public function setApplication($application)
    {
        $this->application = $application;

        return $this;
    }

    /**
     * Get application
     *
     * @return string
     */
    public function getApplication()
    {
        return $this->application;
    }

    /**
     * Set userID
     *
     * @param integer $userID
     *
     * @return ExtensionApplication
     */
    public function setUserID($userID)
    {
        $this->userID = $userID;

        return $this;
    }

    /**
     * Get userID
     *
     * @return integer
     */
    public function getUserID()
    {
        return $this->userID;
    }

    /**
     * Set desktopID
     *
     * @param integer $desktopID
     *
     * @return ExtensionApplication
     */
    public function setDesktopID($desktopID)
    {
        $this->desktopID = $desktopID;

        return $this;
    }

    /**
     * Get desktopID
     *
     * @return integer
     */
    public function getDesktopID()
    {
        return $this->desktopID;
    }
}
