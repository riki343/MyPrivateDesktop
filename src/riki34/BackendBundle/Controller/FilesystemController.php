<?php

namespace riki34\BackendBundle\Controller;

use Doctrine\ORM\EntityManager;
use riki34\BackendBundle\Entity\UserDirectory;
use riki34\BackendBundle\Entity\UserFile;
use riki34\BackendBundle\Validators\FilesystemValidators;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class FilesystemController
 * @package riki34\BackendBundle\Controller
 * @Route("/filesystem", options={"expose"=true})
 */
class FilesystemController extends Controller
{
    /**
     * @Route("/file/{file_id}", name="fs.file.get")
     * @Method({"GET"})
     * @param integer|null $file_id
     * @return JsonResponse
     */
    public function getFile($file_id) {
        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();
        $fs = new Filesystem();

        $fileInfo = $em->getRepository('riki34BackendBundle:UserFile')->find($file_id);
        if ($fileInfo === null || $fs->exists($fileInfo->getFullPath()) === false) {
            $message = $this->get('translator')->trans('fs.error.file404', [], 'fs');
            return new JsonResponse(['error' => $message], 404);
        }

        return new JsonResponse($fileInfo->getFullInArray(), 200);
    }

    /**
     * @Route("/file/{dir_id}")
     * @Method({"PUT"})
     * @param Request $request
     * @param integer $dir_id
     * @return JsonResponse
     */
    public function createFile(Request $request, $dir_id) {
        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('riki34BackendBundle:User')->findOneBy(['username' => 'test']);
        $directory = $em->find('riki34BackendBundle:UserDirectory', $dir_id);

        // If directory not found then return error
        if ($directory === null) {
            $message = $this->get('translator')->trans('fs.error.directory404', [], 'fs');
            return new JsonResponse(['error' => $message], 404);
        }

        // Check if all fields is sent by client
        $data = json_decode($request->getContent(), true);
        if (FilesystemValidators::createFile($data) === false) {
            $message = $this->get('translator')->trans('fs.error.directory.fieldsRequired', [], 'fs');
            return new JsonResponse(['error' => $message], 417);
        }

        $exist = false;
        /** @var UserFile $file */
        foreach ($directory->getFiles() as $file) {
            if ($file->getName() === $data['name']) {
                $exist = true; break;
            }
        }

        if ($exist === true) {
            $message = $this->get('translator')->trans('fs.error.file.exist', [], 'fs');
            return new JsonResponse(['error' => $message], 400);
        }

        // Create new file and store to DB
        $file = new UserFile($data['name'], $user, $directory);
        $em->persist($file);
        $em->flush();

        return new JsonResponse($file->getFullInArray(), 201);
    }

    public function moveFile() {
        // TODO: implement function moveFile()
    }

    public function renameFile() {
        // TODO: implement function renameFile()
    }

    public function deleteFile() {
        // TODO: implement function deleteFile()
    }

    /**
     * @Route("/file/{dir_id}", name="fs.file.upload")
     * @Method({"POST"})
     * @param Request $request
     * @param integer $dir_id
     * @return JsonResponse
     */
    public function uploadFile(Request $request, $dir_id) {
        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('riki34BackendBundle:User')->findOneBy(['username' => 'test']);
        $directory = $em->find('riki34BackendBundle:UserDirectory', $dir_id);

        // If directory not found then return error
        if ($directory === null) {
            $message = $this->get('translator')->trans('fs.error.directory404', [], 'fs');
            return new JsonResponse(['error' => $message], 404);
        }

        $files = $request->files->all();
        /** @var UploadedFile $file */
        foreach ($files as $file) {
            $uploadedFile = $directory->uploadFile($file);
            $uploadedFile->setUser($user);
            $uploadedFile->setUserId($user->getId());
            $em->persist($uploadedFile);
        }

        $em->flush();

        $message = $this->get('translator')->trans('fs.files.uploaded', [], 'fs');
        return new JsonResponse(['success' => $message], 201);
    }

    /**
     * @Route("/directory/{dir_id}", name="fs.directory.get", defaults={"dir_id": null})
     * @Method({"GET"})
     * @param integer|null $dir_id
     * @return JsonResponse
     */
    public function getFolder($dir_id = null) {
        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('riki34BackendBundle:User')->findOneBy(['username' => 'test']);
        if ($dir_id === null) {
            $dir = $em->getRepository('riki34BackendBundle:UserDirectory')->getRootDir($user);
        } else {
            $dir = $em->getRepository('riki34BackendBundle:UserDirectory')->getDir($dir_id);
            if ($dir === null) {
                $message = $this->get('translator')->trans('fs.error.directory404', [], 'fs');
                return new JsonResponse(['error' => $message], 404);
            }
        }

        return new JsonResponse($dir->getFullInArray(), 200);
    }

    /**
     * @Route("/directory/{parent_id}")
     * @Method({"PUT"})
     * @param Request $request
     * @param integer $parent_id
     * @return JsonResponse
     */
    public function createDirectory(Request $request, $parent_id) {
        /** @var EntityManager $em */
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('riki34BackendBundle:User')->findOneBy(['username' => 'test']);
        $parent = $em->find('riki34BackendBundle:UserDirectory', $parent_id);

        // If parent directory not found then return error
        if ($parent === null) {
            $message = $this->get('translator')->trans('fs.error.directory404', [], 'fs');
            return new JsonResponse(['error' => $message], 404);
        }

        // Check if all fields is sent by client
        $data = json_decode($request->getContent(), true);
        if (FilesystemValidators::createDirectory($data) === false) {
            $message = $this->get('translator')->trans('fs.error.directory.fieldsRequired', [], 'fs');
            return new JsonResponse(['error' => $message], 400);
        }

        // Check if directory is not exist yet
        $exist = false;
        /** @var UserDirectory $dir */
        foreach ($parent->getSubdirs() as $dir) {
            if ($dir->getName() === $data['name']) {
                $exist = true; break;
            }
        }
        if ($exist === true) {
            $message = $this->get('translator')->trans('fs.error.directory.exist', [], 'fs');
            return new JsonResponse(['error' => $message], 417);
        }

        // Create new file and store to DB
        $dir = new UserDirectory($data['name'], $user, $parent);
        $em->persist($dir);
        $em->flush();
        $parent->addSubdir($dir);

        return new JsonResponse($parent->getFullInArray(), 201);
    }

    public function moveDirectory() {
        // TODO: implement function moveDirectory()
    }

    public function renameDirectory() {
        // TODO: implement function renameDirectory()
    }

    public function deleteDirectory() {
        // TODO: implement function deleteDirectory()
    }
}