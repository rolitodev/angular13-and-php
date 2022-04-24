<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Methods: PUT");
    header("Access-Control-Allow-Headers: *");

    if ($_SERVER["REQUEST_METHOD"] != "PUT") {
        exit("Solo acepto peticiones PUT");
    }

    $jsonUsuario = json_decode(file_get_contents("php://input"));
    
    if (!$jsonUsuario) {
        exit("[ERROR]: No se han encontrado datos para hacer la petición.");
    }

    $bd = include_once "bd.php";

    $sentencia = $bd->prepare("UPDATE usuarios SET nombres = ?, apellidos = ?, password = ? WHERE id = ?");
    $resultado = $sentencia->execute([$jsonUsuario->nombres, $jsonUsuario->apellidos, $jsonUsuario->password, $jsonUsuario->id]);
    
    echo json_encode($resultado);

?>