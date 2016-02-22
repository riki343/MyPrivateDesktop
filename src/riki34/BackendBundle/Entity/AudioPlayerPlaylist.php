<?php

namespace riki34\BackendBundle\Entity;

use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use riki34\BackendBundle\Interfaces\JsonEntity;
use riki34\BackendBundle\Utils\JsonTransformer;

/**
 * AudioPlayerPlaylist
 *
 * @ORM\Table(name="audio_player_playlist")
 * @ORM\Entity(repositoryClass="riki34\BackendBundle\Repository\AudioPlayerPlaylistRepository")
 */
class AudioPlayerPlaylist implements JsonEntity
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
     * @ORM\ManyToOne(targetEntity="riki34\BackendBundle\Entity\User", inversedBy="playlists")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @var string
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @var ArrayCollection
     * @ORM\ManyToMany(targetEntity="riki34\BackendBundle\Entity\UserFile", mappedBy="playlists")
     */
    private $tracks;

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
        $this->tracks = new ArrayCollection();
    }

    public function getFullInArray() {
        return [
            'id' => $this->getId(),
            'userID' => $this->getUserId(),
            'title' => $this->getTitle(),
            'trackCount' => $this->getTracks()->count(),
            'tracks' => JsonTransformer::arrayToFullJson($this->getTracks()),
        ];
    }

    public function getMinInArray() {
        return [
            'id' => $this->getId(),
            'userID' => $this->getUserId(),
            'title' => $this->getTitle(),
            'trackCount' => $this->getTracks()->count(),
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
     * @return AudioPlayerPlaylist
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
     * Set title
     *
     * @param string $title
     *
     * @return AudioPlayerPlaylist
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set user
     *
     * @param \riki34\BackendBundle\Entity\User $user
     *
     * @return AudioPlayerPlaylist
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
     * Add track
     *
     * @param \riki34\BackendBundle\Entity\UserFile $track
     *
     * @return AudioPlayerPlaylist
     */
    public function addTrack(\riki34\BackendBundle\Entity\UserFile $track)
    {
        $this->tracks[] = $track;

        return $this;
    }

    /**
     * Remove track
     *
     * @param \riki34\BackendBundle\Entity\UserFile $track
     */
    public function removeTrack(\riki34\BackendBundle\Entity\UserFile $track)
    {
        $this->tracks->removeElement($track);
    }

    /**
     * Get tracks
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTracks()
    {
        return $this->tracks;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return AudioPlayerPlaylist
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
     * @return AudioPlayerPlaylist
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
