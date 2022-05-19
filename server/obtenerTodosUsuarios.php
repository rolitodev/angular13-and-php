<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    $rol = $_GET["rol"];
    $id_usuario = $_GET["id"];

    $bd = include_once "bd.php";

    if ($rol === '1') {
        $sentencia = $bd->query("SELECT * FROM usuarios ORDER BY fecha DESC");
        $usuarios = $sentencia->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($usuarios);
    } else {
        $sentencia = $bd->prepare("SELECT * FROM usuarios WHERE id = ? ORDER BY fecha DESC");
        $resultado = $sentencia->execute([$id_usuario]);
        $usuarios = $sentencia->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($usuarios);
    }

?>