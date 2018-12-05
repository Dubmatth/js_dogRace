<?php
  include './conndb.php';

  $statement=$pdo->prepare("
      SELECT idA, nomA, descA, espA, nomE, nbPattesE, nationA, nomP
      FROM animal
        LEFT JOIN espece ON espA=codeE
        LEFT JOIN pays ON nationA=codeP
      ORDER BY nomA ASC
      ");
  $statement->execute();
  $results=$statement->fetchAll(PDO::FETCH_ASSOC);
  $json=json_encode($results);

  echo $json;
?>
