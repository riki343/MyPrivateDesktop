<?php

namespace riki34\BackendBundle\Controller;

use Doctrine\ORM\EntityManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DesktopController
 * @package riki34\BackendBundle\Controller
 * @Route("/desktop", options={"expose"=true})
 */
class DesktopController extends Controller {
    /**
     * @Route("/get/{desktop_id}", name="get-desktop")
     * @Method({"GET"})
     * @param int $desktop_id
     * @return Response
     */
    public function getDesktop($desktop_id) {
        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();

        $desktop = $em->find('riki34BackendBundle:Desktop', $desktop_id);

        return new Response($this->get('jms_serializer')->serialize($desktop, 'json'));
    }

    /**
     * @Route("/save/grid/{desktop_id}", name="save-desktop-grid")
     * @Method({"PUT"})
     * @param Request $request
     * @param int $desktop_id
     * @return JsonResponse
     */
    public function saveDesktopGrid(Request $request, $desktop_id) {
        $data = json_decode($request->getContent(), true);

        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();
        $desktop = $em->find('riki34BackendBundle:Desktop', $desktop_id);
        if ($desktop !== null) {
            $desktop->setGrid($data);
            $em->persist($desktop);
            $em->flush();
            return new JsonResponse(true);
        } else {
            return new JsonResponse(false);
        }
    }
}