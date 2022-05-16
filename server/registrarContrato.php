<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

    $jsonRegistro = json_decode(file_get_contents("php://input"));

    if (!$jsonRegistro) {
        exit("[ERROR]: No se han encontrado datos para hacer la petición.");
    }

    $bd = include_once "bd.php";

    $sentencia = $bd->prepare("INSERT INTO contratos(id_propietario, id_inmueble, fecha_inicio, fecha_final, valor, fecha) VALUES (?,?,?,?,?,?)");
    $resultado = $sentencia->execute([$jsonRegistro->id_propietario,$jsonRegistro->id_inmueble, $jsonRegistro->fecha_inicio, $jsonRegistro->fecha_final, $jsonRegistro->valor, $jsonRegistro->fecha]);

    echo json_encode($resultado);

?>