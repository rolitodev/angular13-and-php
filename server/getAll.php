<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Headers: *");
    $bd = include_once "bd.php";
    $sentencia = $bd->query("SELECT * FROM usuarios");
    $usuarios = $sentencia->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($usuarios);
?>