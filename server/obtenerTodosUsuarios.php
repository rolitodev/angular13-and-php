<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    $bd = include_once "bd.php";
    $sentencia = $bd->query("SELECT * FROM usuarios ORDER BY fecha DESC");
    $usuarios = $sentencia->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($usuarios);
?>