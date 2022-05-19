<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $bd = include_once "bd.php";

    $rol = $_GET["rol"];
    $id_usuario = $_GET["id"];
    
    if ($rol === '1') {
        $sentencia = $bd->query("SELECT * FROM contratos ORDER BY fecha DESC");
        $inmuebles = $sentencia->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($inmuebles);
    } else {
        $sentencia = $bd->prepare("SELECT * FROM contratos WHERE id_propietario = ?");
        $resultado = $sentencia->execute([$id_usuario]);
        $usuarios = $sentencia->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($usuarios);
    }


?>