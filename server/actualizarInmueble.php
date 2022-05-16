<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: PUT");

    if ($_SERVER["REQUEST_METHOD"] != "PUT") {
        exit("Solo acepto peticiones PUT");
    }

    $jsonUsuario = json_decode(file_get_contents("php://input"));
    
    if (!$jsonUsuario) {
        exit("[ERROR]: No se han encontrado datos para hacer la petición.");
    }

    $bd = include_once "bd.php";
    
    $sentencia = $bd->prepare("UPDATE inmuebles SET id_propietario = ?, id_tipo_inmueble = ?, direccion = ?, valor_comercial = ?, area_total = ?, area_construida = ?, fechaUpdate = ? WHERE id = ?");

    $resultado = $sentencia->execute([$jsonUsuario->id_propietario, $jsonUsuario->id_tipo_inmueble, $jsonUsuario->direccion, $jsonUsuario->valor_comercial, $jsonUsuario->area_total, $jsonUsuario->area_construida, $jsonUsuario->fechaUpdate, $jsonUsuario->id]);

    echo json_encode($resultado);

?>