<?php

namespace riki34\FrontendBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Class DefaultController
 * @package riki34\FrontendBundle\Controller
 */
class DefaultController extends Controller
{
    /**
     * @Route("")
     * @Method({"GET"})
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        return $this->render('@riki34Frontend/landing.html.twig');
    }

    public function loginAction() {

    }

    public function registerAction() {

    }

    /**
     * @Route("/desktop")
     * @Method({"GET"})
     */
    public function desktopAction() {
        return $this->render('@riki34Frontend/desktop.html.twig', [
            'desktop_id' => 1
        ]);
    }
}