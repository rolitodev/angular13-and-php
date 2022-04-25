<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

    $jsonRegistro = json_decode(file_get_contents("php://input"));

    if (!$jsonRegistro) {
        exit("[ERROR]: No se han encontrado datos para hacer la petición.");
    }

    $bd = include_once "bd.php";

    $sentencia = $bd->prepare("INSERT INTO usuarios(nombres, apellidos, password, correo) VALUES (?, ?, ?, ?)");
    $resultado = $sentencia->execute([$jsonRegistro->nombres, $jsonRegistro->apellidos, $jsonRegistro->password, $jsonRegistro->correo]);

    $registro = $sentencia->fetchObject();

    echo json_encode($registro);

?>