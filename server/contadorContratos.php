<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    $bd = include_once "bd.php";
    $sentencia = $bd->query("SELECT COUNT(*) AS contador_contratos FROM contratos");
    $contador = $sentencia->fetchObject();
    echo json_encode($contador);
?>