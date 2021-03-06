<?php

namespace riki34\BackendBundle\Repository;
use Doctrine\ORM\Query;
use riki34\BackendBundle\Entity\User;
use riki34\BackendBundle\Entity\UserDirectory;

/**
 * UserDirectoryRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class UserDirectoryRepository extends \Doctrine\ORM\EntityRepository
{
    /**
     * @param User $user
     * @param boolean $hydrate
     * @return UserDirectory|null
     */
    public function getRootDir($user, $hydrate = true) {
        return $this
            ->createQueryBuilder('d')
            ->where('d.userId = :user_id AND d.isRoot = 1')
            ->setParameter('user_id', $user->getId())
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult($hydrate === true ? Query::HYDRATE_OBJECT : Query::HYDRATE_ARRAY)
        ;
    }

    /**
     * @param integer $dir_id
     * @param boolean $hydrate
     * @return UserDirectory|null
     */
    public function getDir($dir_id, $hydrate = true) {
        return $this
            ->createQueryBuilder('d')
            ->where('d.id = :dir_id')
            ->setParameter('dir_id', $dir_id)
            ->getQuery()
            ->getOneOrNullResult($hydrate === true ? Query::HYDRATE_OBJECT : Query::HYDRATE_ARRAY)
        ;
    }
}
