<?php

namespace riki34\BackendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('riki34BackendBundle:Default:index.html.twig', array('name' => $name));
    }
}
