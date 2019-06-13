# Drupal requests with Node

This is place to put node scripts that permit interaction between node and drupal if for what ever reason one would need that...

At the moment there are 3 modules regularly ussed in order to expose endpoints with Drupal: Rest, Json API and GraphQL.
I've had to work with the JSON API and Rest API, I've also dabled a bit with GraphQL.

Note: This will probably be a place just to add scripts that I'll find useful in the future. I'm completely open pull requests.

Also: the url burnt in the code is the default url of [DrupalVM](https://github.com/geerlingguy/drupal-vm). [Thanks!](https://www.jeffgeerling.com/)

## login.js

Does what it says, logs the user in and extract information about him with a jsonapi endpoint.

## install.module

Bash script that downloads a module (from the tar.gz link from drupal modules) and extracts it, simple as that.

Composer is the way to go to downloading modules and you can use drush en to enable them, but if you're in a hurry and don't care about setting those up. You can use this and enamble the module in the interface.
