<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

    $jsonRegistro = json_decode(file_get_contents("php://input"));

    if (!$jsonRegistro) {
        exit("[ERROR]: No se han encontrado datos para hacer la petición.");
    }

    $bd = include_once "bd.php";

    $sentencia = $bd->prepare("INSERT INTO inmuebles(matricula, id_propietario, id_tipo_inmueble, id_ubicacion_inmueble, valor_comercial, area_total, area_construida, fecha) VALUES (?,?,?,?,?,?,?,?)");
    $resultado = $sentencia->execute([$jsonRegistro->matricula, $jsonRegistro->id_propietario, $jsonRegistro->id_tipo_inmueble, $jsonRegistro->id_ubicacion_inmueble, $jsonRegistro->valor_comercial, $jsonRegistro->area_total, $jsonRegistro->area_construida, $jsonRegistro->fecha]);

    echo json_encode($resultado);

?>