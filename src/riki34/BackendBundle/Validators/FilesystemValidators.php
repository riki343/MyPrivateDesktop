<?php

namespace riki34\BackendBundle\Validators;

class FilesystemValidators
{
    public static function createFile($data) {
        return $data !== null && isset($data['name']);
    }

    public static function createDirectory($data) {
        return $data !== null && isset($data['name']);
    }
}