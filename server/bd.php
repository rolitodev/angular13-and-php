<?php

//localhost
// $usuario = "root";
// $contraseña = "";
// $nombre_base_de_datos = "inmobiliaria";

//compilado
$usuario = "id18819381_inmobiliaria";
$contraseña = "X|Zah)k=D14PxlW%";
$nombre_base_de_datos = "id18819381_root";

try {
    return new PDO('mysql:host=localhost;dbname=' . $nombre_base_de_datos, $usuario, $contraseña);
} catch (Exception $e) {
    echo "Ocurrió algo con la base de datos: " . $e->getMessage();
}

?>