<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    if ($_SERVER["REQUEST_METHOD"] != "DELETE") {
        exit("Solo acepto peticiones delete");
    }

    $idUser = $_GET["idUser"];
    if(empty($idUser)) {
        exit("No existe id de usuario.");
    }

    $bd = include_once "bd.php";

    $sentencia = $bd->prepare("DELETE FROM usuarios WHERE id = ?");
    $resultado = $sentencia->execute([$idUser]);

    if($resultado) {
        echo json_encode($resultado);
    } else {
        exit("[ERROR]: No hemos podido eliminar el usuario");
    }
