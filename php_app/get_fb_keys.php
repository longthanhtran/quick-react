<?php

function get_creds()
{
  return parse_ini_file(__DIR__ . "/../fb_keys.ini");
}
/* print_r($keys); */
