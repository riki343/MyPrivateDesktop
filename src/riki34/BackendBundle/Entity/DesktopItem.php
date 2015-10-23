<?php

namespace riki34\BackendBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\File;

/**
 * DesktopItem
 *
 * @ORM\Table(name="desktop_items")
 * @ORM\Entity
 */
class DesktopItem
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
     * @ORM\Column(name="desktop_id", type="integer")
     */
    private $desktopId;

    /**
     * @var integer
     *
     * @ORM\Column(name="row", type="integer")
     */
    private $row;

    /**
     * @var integer
     *
     * @ORM\Column(name="col", type="integer")
     */
    private $col;

    /**
     * @var integer
     *
     * @ORM\Column(name="type", type="integer")
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="item", type="string", length=1024)
     */
    private $item;

    public function __construct() {
        $this->item = new File($this->item);
    }

    const DIRECTORY     = 1;
    const TEXT_FILE     = 2;
    const IMAGE         = 3;
    const VIDEO         = 4;
    const DOCUMENT      = 5;
    const SOUND         = 6;
    const SCRIPT        = 7;
    const WEB_DOCUMENT  = 8;

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
     * @return DesktopItem
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
     * Set row
     *
     * @param integer $row
     *
     * @return DesktopItem
     */
    public function setRow($row)
    {
        $this->row = $row;

        return $this;
    }

    /**
     * Get row
     *
     * @return integer
     */
    public function getRow()
    {
        return $this->row;
    }

    /**
     * Set col
     *
     * @param integer $col
     *
     * @return DesktopItem
     */
    public function setCol($col)
    {
        $this->col = $col;

        return $this;
    }

    /**
     * Get col
     *
     * @return integer
     */
    public function getCol()
    {
        return $this->col;
    }

    /**
     * Set type
     *
     * @param integer $type
     *
     * @return DesktopItem
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return integer
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set item
     *
     * @param string $item
     *
     * @return DesktopItem
     */
    public function setItem($item)
    {
        $this->item = $item;

        return $this;
    }

    /**
     * Get item
     *
     * @return string
     */
    public function getItem()
    {
        return $this->item;
    }
}

