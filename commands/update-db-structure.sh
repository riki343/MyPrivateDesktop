#!/usr/bin/env bash
sudo php app/console doctrine:generate:entities riki34
sudo php app/console doctrine:schema:update --force
sudo chmod a+rwx -R *