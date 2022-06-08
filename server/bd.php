<?php

$usuario = "272124";
$contraseña = "JnjvKAf@c5jh8T@";
$nombre_base_de_datos = "inmobiliariadccn_bd";

try {
    return new PDO('mysql:host=mysql-inmobiliariadccn.alwaysdata.net;dbname=' . $nombre_base_de_datos, $usuario, $contraseña);
} catch (Exception $e) {
    echo "Ocurrió algo con la base de datos: " . $e->getMessage();
}

?>