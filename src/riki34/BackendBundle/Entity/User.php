<?php

namespace riki34\BackendBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="riki34\BackendBundle\Entity\UserFile", mappedBy="user")
     */
    private $files;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="riki34\BackendBundle\Entity\UserDirectory", mappedBy="user")
     */
    private $directories;

    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="riki34\BackendBundle\Entity\AudioPlayerPlaylist", mappedBy="user")
     */
    private $playlists;

    public function __construct()
    {
        parent::__construct();
        $this->files        = new ArrayCollection();
        $this->directories  = new ArrayCollection();
        $this->playlists    = new ArrayCollection();
    }

    /**
     * Add file
     *
     * @param \riki34\BackendBundle\Entity\UserFile $file
     *
     * @return User
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
     * Add directory
     *
     * @param \riki34\BackendBundle\Entity\UserDirectory $directory
     *
     * @return User
     */
    public function addDirectory(\riki34\BackendBundle\Entity\UserDirectory $directory)
    {
        $this->directories[] = $directory;

        return $this;
    }

    /**
     * Remove directory
     *
     * @param \riki34\BackendBundle\Entity\UserDirectory $directory
     */
    public function removeDirectory(\riki34\BackendBundle\Entity\UserDirectory $directory)
    {
        $this->directories->removeElement($directory);
    }

    /**
     * Get directories
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getDirectories()
    {
        return $this->directories;
    }

    /**
     * Add playlist
     *
     * @param \riki34\BackendBundle\Entity\AudioPlayerPlaylist $playlist
     *
     * @return User
     */
    public function addPlaylist(\riki34\BackendBundle\Entity\AudioPlayerPlaylist $playlist)
    {
        $this->playlists[] = $playlist;

        return $this;
    }

    /**
     * Remove playlist
     *
     * @param \riki34\BackendBundle\Entity\AudioPlayerPlaylist $playlist
     */
    public function removePlaylist(\riki34\BackendBundle\Entity\AudioPlayerPlaylist $playlist)
    {
        $this->playlists->removeElement($playlist);
    }

    /**
     * Get playlists
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPlaylists()
    {
        return $this->playlists;
    }
}
