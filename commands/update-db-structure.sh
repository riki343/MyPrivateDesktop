#!/usr/bin/env bash
php app/console doctrine:generate:entities riki34
php app/console doctrine:schema:update --force
chmod a+rwx -R *