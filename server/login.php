<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $jsonLogin = json_decode(file_get_contents("php://input"));

    if (!$jsonLogin) {
        exit("[ERROR]: No se han encontrado datos para hacer la petición.");
    }

    $bd = include_once "bd.php";

    $sentencia = $bd->prepare("SELECT * FROM usuarios WHERE password = ? AND correo = ?");
    $resultado = $sentencia->execute([$jsonLogin->password, $jsonLogin->correo]);
    
    $login = $sentencia->fetchObject();

    echo json_encode($login);

?>