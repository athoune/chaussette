<?php
$f = fopen('/tmp/chaussette.log', 'w');
ob_start ();
var_dump($_POST);
fwrite($f, ob_get_contents());
ob_end_flush();
?>