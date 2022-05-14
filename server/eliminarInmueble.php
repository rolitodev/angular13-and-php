<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: DELETE");
    header("Access-Control-Allow-Headers: *");

    if ($_SERVER["REQUEST_METHOD"] != "DELETE") {
        exit("Solo acepto peticiones delete");
    }

    $inmueble = $_GET["inmueble"];
    if(empty($inmueble)) {
        exit("No existe el id del inmueble.");
    }

    $bd = include_once "bd.php";

    $sentencia = $bd->prepare("DELETE FROM inmuebles WHERE id = ?");
    $resultado = $sentencia->execute([$inmueble]);

    if($resultado) {
        echo json_encode($resultado);
    } else {
        exit("[ERROR]: No hemos podido eliminar el usuario");
    }
?>