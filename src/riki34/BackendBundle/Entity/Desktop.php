<?php

namespace riki34\BackendBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Desktop
 *
 * @ORM\Table(name="desktops")
 * @ORM\Entity
 */
class Desktop
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
     * @var array
     *
     * @ORM\Column(name="grid", type="array")
     */
    private $grid;

    /**
     * @var DesktopSettings
     * @ORM\OneToOne(targetEntity="riki34\BackendBundle\Entity\DesktopSettings", mappedBy="desktop")
     */
    private $settings;

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

    public function __construct() {
        $this->settings = [];
        $this->grid = [];
    }

    public function getFullInArray() {
        return [
            'id' => $this->id,
            'userID' => $this->userId,
            'settings' => $this->getSettings()->getFullInArray(),
            'grid' => $this->grid,
            'created' => $this->created->format(\DateTime::ISO8601),
            'updated' => $this->updated->format(\DateTime::ISO8601),
        ];
    }

    public function getMinInArray() {
        return [
            'id' => $this->id,
            'userID' => $this->userId,
            'settings' => $this->getSettings()->getFullInArray(),
            'grid' => $this->grid,
            'created' => $this->created->format(\DateTime::ISO8601),
            'updated' => $this->updated->format(\DateTime::ISO8601),
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
     * Set userId
     *
     * @param integer $userId
     *
     * @return Desktop
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
     * Set grid
     *
     * @param array $grid
     *
     * @return Desktop
     */
    public function setGrid($grid)
    {
        $this->grid = $grid;

        return $this;
    }

    /**
     * Get grid
     *
     * @return array
     */
    public function getGrid()
    {
        return $this->grid;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Desktop
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
     * @return Desktop
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
     * Set settings
     *
     * @param \riki34\BackendBundle\Entity\DesktopSettings $settings
     *
     * @return Desktop
     */
    public function setSettings(\riki34\BackendBundle\Entity\DesktopSettings $settings = null)
    {
        $this->settings = $settings;

        return $this;
    }

    /**
     * Get settings
     *
     * @return \riki34\BackendBundle\Entity\DesktopSettings
     */
    public function getSettings()
    {
        return $this->settings;
    }
}
