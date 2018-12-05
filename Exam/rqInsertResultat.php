<?php
  include './conndb.php';
  
  $resultat= json_decode($_POST['resultat']);

  $statement=$pdo->prepare("
    REPLACE INTO resultat(idC, idA, temps, statut)
    VALUES (:idC, :idA, :temps, :statut);
    ");
  $statement->bindParam(':idC', $resultat->idC, PDO::PARAM_INT);
  $statement->bindParam(':idA', $resultat->idA, PDO::PARAM_INT);
  $statement->bindParam(':temps', $resultat->temps, PDO::PARAM_STR);
  $statement->bindParam(':statut', $resultat->statut, PDO::PARAM_STR);
  $statement->execute();

  echo $statement->rowCount()

?>
