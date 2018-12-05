<?php
  include './conndb.php';

  $statement=$pdo->prepare("
      SELECT codeP, nomP FROM pays ORDER BY nomP ASC
      ");
  $statement->execute();
  $results=$statement->fetchAll(PDO::FETCH_ASSOC);
  $json=json_encode($results);

  echo $json;
?>
