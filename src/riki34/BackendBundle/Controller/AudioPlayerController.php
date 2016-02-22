<?php

namespace riki34\BackendBundle\Controller;

use Doctrine\ORM\EntityManager;
use riki34\BackendBundle\Entity\User;
use riki34\BackendBundle\Utils\JsonTransformer;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class AudioPlayerController
 * @package riki34\BackendBundle\Controller
 *
 * @Route("/audio-player")
 */
class AudioPlayerController extends Controller
{
    /**
     * @Route("/playlists", name="audio-player.playlist.get.all")
     * @Method({"GET"})
     * @return JsonResponse
     */
    public function getPlaylists() {
        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();
        /** @var User $user */
        $user = $em->getRepository('riki34BackendBundle:User')->findOneBy(['username' => 'test']);

        return new JsonResponse(JsonTransformer::arrayToMinJson($user->getPlaylists()), 200);
    }

    /**
     * @Route("/playlists", name="audio-player.playlist.get.single")
     * @Method({"GET"})
     * @param integer $id
     * @return JsonResponse
     */
    public function getPlaylist($id) {
        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();

        $playlist = $em->find('riki34BackendBundle:AudioPlayerPlaylist', $id);
        if ($playlist === null) {
            $message = $this->get('translator')->trans('audio-player.playlist404', [], 'audio-player');
            return new JsonResponse(['error' => $message], 404);
        }

        return new JsonResponse($playlist->getFullInArray(), 200);
    }

    /**
     * @Route("/playlists", name="audio-player.playlist.add.list")
     * @Method({"PUT"})
     * @return JsonResponse
     */
    public function createPlaylist(Request $request) {
        return new JsonResponse(['error' => 'Not implemented']);
    }

    /**
     * @Route("/playlists", name="audio-player.playlist.add.tracks")
     * @Method({"PATCH"})
     * @return JsonResponse
     */
    public function addToPlaylist(Request $request) {
        return new JsonResponse(['error' => 'Not implemented']);
    }

    /**
     * @Route("/playlists", name="audio-player.playlist.delete.tracks")
     * @Method({"PATCH"})
     * @return JsonResponse
     */
    public function removeFromPlaylist(Request $request) {
        return new JsonResponse(['error' => 'Not implemented']);
    }

    /**
     * @Route("/playlists/{id}", name="audio-player.playlist.delete.playlist")
     * @Method({"DELETE"})
     * @return JsonResponse
     */
    public function deletePlaylist($id) {
        return new JsonResponse(['error' => 'Not implemented']);
    }
}
