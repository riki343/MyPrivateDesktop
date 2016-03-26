<?php

namespace riki34\BackendBundle\Controller;

use Doctrine\ORM\EntityManager;
use riki34\BackendBundle\Entity\ExtensionApplication;
use riki34\BackendBundle\Utils\JsonTransformer;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class ExtensionApplicationController
 * @package riki34\BackendBundle\Controller
 *
 * @Route("/extensions-applications")
 */
class ExtensionApplicationController extends Controller
{
    /**
     * @Route("/list/{desktop_id}")
     * @param $desktop_id
     * @return JsonResponse
     */
    public function getExtensionsForDesktop($desktop_id) {
        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();

        $applicationsForExtensions = $em
            ->getRepository('riki34BackendBundle:ExtensionApplication')
            ->findBy([
                'desktopID' => $desktop_id
            ])
        ;

        $exts = [];
        /** @var ExtensionApplication $applicationsForExtension */
        foreach ($applicationsForExtensions as $applicationsForExtension) {
            $exts[$applicationsForExtension->getExtension()] = $applicationsForExtension->getFullInArray();
        }

        return new JsonResponse($exts);
    }
}
