<?php

//localhost
// $usuario = "root";
// $contraseña = "";
// $nombre_base_de_datos = "inmobiliaria";

//compilado
$usuario = "265929";
$contraseña = "JnjvKAf@c5jh8T@";
$nombre_base_de_datos = "inmobiliariapuilo_bd";

try {
    return new PDO('mysql:host=localhost;dbname=' . $nombre_base_de_datos, $usuario, $contraseña);
} catch (Exception $e) {
    echo "Ocurrió algo con la base de datos: " . $e->getMessage();
}

?>