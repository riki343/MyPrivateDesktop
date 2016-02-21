<?php

namespace riki34\BackendBundle\Utils;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use riki34\BackendBundle\Interfaces\JsonEntity;

/**
 * This class contains functions to transform arrays of PHP objects
 * to arrays of arrays for you can transform it to JSON
 *
 * Class JsonTransformer
 * @package Vapex\ApiBundle\Utils
 */
class JsonTransformer {
    /**
     * @param array|Collection|ArrayCollection|\Countable|\Iterator|\ArrayAccess $array
     * @param boolean $nestedFull
     * @return array
     */
    public static function arrayToFullJson($array, $nestedFull = true) {
        $transformed = [];

        if ($nestedFull === true) {
            /** @var JsonEntity $item */
            foreach ($array as $item) {
                $transformed[] = $item->getFullInArray();
            }
        } else {
            /** @var JsonEntity $item */
            foreach ($array as $item) {
                $transformed[] = $item->getFullInArray();
            }
        }

        return $transformed;
    }

    /**
     * @param array|Collection|ArrayCollection|\Countable|\Iterator|\ArrayAccess $array
     * @param boolean $nestedFull
     * @return array
     */
    public static function arrayToMinJson($array, $nestedFull = false) {
        $transformed = [];

        if ($nestedFull === true) {
            /** @var JsonEntity $item */
            foreach ($array as $item) {
                $transformed[] = $item->getMinInArray();
            }
        } else {
            /** @var JsonEntity $item */
            foreach ($array as $item) {
                $transformed[] = $item->getMinInArray();
            }
        }

        return $transformed;
    }
}