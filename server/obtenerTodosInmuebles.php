<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $bd = include_once "bd.php";

    $rol = $_GET["rol"];
    $id_usuario = $_GET["id"];

    if ($rol === '1') {
        $sentencia = $bd->query("SELECT * FROM inmuebles ORDER BY fecha DESC");
        $inmuebles = $sentencia->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($inmuebles);
    } else {
        $sentencia = $bd->query("SELECT * FROM inmuebles WHERE id_propietario = ? ORDER BY fecha DESC");
        $resultado = $sentencia->execute([$id_usuario]);
        $inmuebles = $sentencia->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($inmuebles);
    }

?>