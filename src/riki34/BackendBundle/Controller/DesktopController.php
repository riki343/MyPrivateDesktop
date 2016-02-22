<?php

namespace riki34\BackendBundle\Controller;

use Doctrine\ORM\EntityManager;
use riki34\BackendBundle\Constants\ServerConstants;
use riki34\BackendBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\File\UploadedFile;
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

        $serialized = $desktop->getFullInArray();
        $serialized['settings'] = [
            'backgroundImage' => "url('/images/1.jpg')",
            'backgroundRepeat' => 'no-repeat',
            'backgroundPosition' => 'center',
            'backgroundSize' => 'cover'
        ];
        return new JsonResponse($serialized);
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

    /**
     * @Route("/{desktop_id}/settings", name="desktop.settings.save", requirements={"desktop_id": "\d+"})
     * @Method({"PATCH"})
     * @param Request $request
     * @param integer $desktop_id
     * @return JsonResponse
     */
    public function saveSettings (Request $request, $desktop_id) {
        $data = json_decode($request->getContent(), true);

        // If client not sent body then return error
        if ($data === null) {
            $message = $this->get('translator')->trans('desktop.settings.fieldsRequired', [], 'desktop');
            return new JsonResponse(['error' => $message], 417);
        }

        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();
        $settings = $em
            ->getRepository('riki34BackendBundle:DesktopSettings')
            ->findOneBy(['desktopId', $desktop_id])
        ;
        // If settings entity was not found then return error
        if ($settings === null) {
            $message = $this->get('translator')->trans('desktop404', [], 'desktop');
            return new JsonResponse(['error' => $message], 404);
        }

        // Setup new settings and save it
        $settings->setCss($data);
        $em->persist($settings);
        $em->flush();

        return new JsonResponse(['success' => 'saved'], 200);
    }

    /**
     * @Route("/{desktop_id}/settings/upload-image")
     * @Method({"PATCH"})
     * @param Request $request
     * @param integer $desktop_id
     * @return JsonResponse
     */
    public function uploadBackground(Request $request, $desktop_id) {
        $files = $request->files->all();
        $uploaded = null;
        foreach ($files as $file) {
            /** @var UploadedFile $uploaded */
            $uploaded = $file; break;
        }

        if ($uploaded === null) {
            $message = $this->get('translator')->trans('desktop.settings.image.dataMissing', [], 'desktop');
            return new JsonResponse(['error' => $message], 417);
        }

        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();
        $settings = $em->getRepository('riki34BackendBundle:DesktopSettings')->findOneBy(['desktopId' => $desktop_id]);
        // If settings entity was not found then return error
        if ($settings === null) {
            $message = $this->get('translator')->trans('desktop404', [], 'desktop');
            return new JsonResponse(['error' => $message], 404);
        }

        $user = $em->getRepository('riki34BackendBundle:User')->findOneBy(['username' => 'test']);
        $settings->uploadImage($uploaded, $user);
        $em->persist($settings);
        $em->flush();

        return new JsonResponse(['image' => ServerConstants::WEB_DIR . $settings->getBackgroundImage()], 200);
    }
}