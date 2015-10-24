<?php

namespace riki34\BackendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Class FilesystemController
 * @package riki34\BackendBundle\Controller
 * @Route("/filesystem", options={"expose"=true})
 */
class FilesystemController extends Controller
{
    /**
     * @Route("/get-file/{file}")
     * @param string $file
     */
    public function getFile($file) {

    }
}