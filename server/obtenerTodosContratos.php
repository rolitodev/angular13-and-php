<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    $bd = include_once "bd.php";
    $sentencia = $bd->query("SELECT * FROM contratos ORDER BY fecha DESC");
    $inmuebles = $sentencia->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($inmuebles);
?>