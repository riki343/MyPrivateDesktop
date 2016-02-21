<?php

namespace riki34\BackendBundle\Interfaces;

interface JsonEntity {
    /**
     * @return array
     */
    public function getMinInArray();

    /**
     * @return array
     */
    public function getFullInArray();
}