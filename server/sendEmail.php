<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$jsonUsuario = json_decode(file_get_contents("php://input"));
    
if (!$jsonUsuario) {
    exit("[ERROR]: No se han encontrado datos para hacer la petición.");
}

$bd = include_once "bd.php";

$sentencia_login = $bd->prepare("SELECT * FROM usuarios WHERE correo = ?");
$sentencia_login->execute([$jsonUsuario->correo]);
$resultado_login = $sentencia_login->fetch(PDO::FETCH_OBJ);

if ($resultado_login) {

    try {
    ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );

    $codigo = randomPassword();

    $sentencia = $bd->prepare("UPDATE usuarios SET password = ? WHERE correo = ?");
    $resultado = $sentencia->execute([$codigo, $jsonUsuario->correo]);

    if($resultado){

        $from = "no-responder@inmobiliariabuilo.com";
        $to = $jsonUsuario->correo;
        $subject = "Recuperar tu Password";
        $message = "Hola ".$resultado_login->nombres."!\nEnviaste una solicitud para restablecer tu contraseña.\n\nTu nueva contraseña es: ". $codigo . "\nDebes ingresar a la plataforma con esta nueva contraseña.\n\nDel equipo de Builo." ;
        $headers = "From:" . $from;
    
        if(mail($to, $subject, $message, $headers)){
            echo json_encode(true);
        } else {
            echo json_encode(false);
        }

    } else {
        echo json_encode(false);
    }

    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }

} else {
    echo "El correo que ingresaste no existe en la base de datos.";
    return;
}

function randomPassword() {
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}

?>