<?php
  try {
    $pdo=new PDO('mysql:host=localhost; dbname=courses2018; charset=utf8', 'root', '');
  } catch (PDOException $e) {
    echo 'Erreur de connexion: ' . $e->getMessage();
  }
?>