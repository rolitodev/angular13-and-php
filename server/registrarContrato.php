<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$jsonLogin = json_decode(file_get_contents("php://input"));

define('AWS_S3_KEY', 'AKIASWEDEJGTRBCJPEXU');
define('AWS_S3_SECRET', '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');
define('AWS_S3_REGION', 'us-east-1');
define('AWS_S3_BUCKET', 'camilomanbucket');
define('AWS_S3_URL', 'http://s3.'.AWS_S3_REGION.'.amazonaws.com/'.AWS_S3_BUCKET.'/');

$id = $_GET["id"];
$tmpfile = $_FILES['uploadFile']['tmp_name'];
$file = $_FILES['uploadFile']['name'];
$datos = json_decode($_POST['datos']);

if (defined('AWS_S3_URL')) {
    
  require_once('s3.php');
  S3::setAuth(AWS_S3_KEY, AWS_S3_SECRET);
  S3::setRegion(AWS_S3_REGION);
  S3::setSignatureVersion('v4');
  S3::putObject(S3::inputFile($tmpfile), AWS_S3_BUCKET, ''.$file, S3::ACL_PUBLIC_READ);
  unlink($tmpfile);

  $bd = include_once "bd.php";
  $urlFinal = "https://camilomanbucket.s3.amazonaws.com/". $id .".pdf";

  $sentencia = $bd->prepare("INSERT INTO contratos(id_propietario, id_inmueble, fecha_inicio, fecha_final, valor, fecha, imagen_contrato) VALUES (?,?,?,?,?,?,?)");
  $resultado = $sentencia->execute([$datos->id_propietario, $datos->id_inmueble, $datos->fecha_inicio, $datos->fecha_final, $datos->valor, $datos->fecha, $urlFinal]);

   echo json_encode($resultado);

} else {
    echo json_encode(false);
}

?>