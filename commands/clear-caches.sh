#!/usr/bin/env bash
sudo php app/console cache:clear --env=prod
sudo php app/console cache:clear --env=dev
sudo chmod a+rwx -R *