<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    $bd = include_once "bd.php";
    $sentencia = $bd->query("SELECT COUNT(*) AS contador_usuarios FROM usuarios");
    $contador = $sentencia->fetchObject();
    echo json_encode($contador);
?>