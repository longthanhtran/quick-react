<?php
session_start();
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/get_fb_keys.php';

$fb = new Facebook\Facebook([
  'app_id'                => $keys['app_id'],
  'app_secret'            => $keys['app_secret'],
  'default_graph_version' => 'v2.2',
  ]);

$helper = $fb->getRedirectLoginHelper();

$permissions = ['email', 'publish_actions'];

$loginUrl = $helper->getLoginUrl('http://longtt.com:9000/fb-callback.php', $permissions);
echo "<pre />";
var_dump($_SESSION);
echo '<a href="' . htmlspecialchars($loginUrl) . '">Login with Facebook!</a>';
