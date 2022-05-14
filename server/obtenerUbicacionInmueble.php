<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    $bd = include_once "bd.php";
    $sentencia = $bd->query("SELECT *  FROM ubicacion_inmueble");
    $ubicacion = $sentencia->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($ubicacion);
?>