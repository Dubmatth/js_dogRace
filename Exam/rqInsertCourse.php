<?php
  include './conndb.php';

  $course= json_decode($_POST['course']);

  $statement=$pdo->prepare("
    INSERT INTO course(idC, nomC, descC, dateC, lieuC)
    VALUES (NULL, :nomC, :descC, :dateC, :lieuC);
    ");
  $statement->bindParam(':nomC', $course->nomC, PDO::PARAM_STR);
  $statement->bindParam(':descC', $course->descC, PDO::PARAM_STR);
  $statement->bindParam(':dateC', $course->dateC, PDO::PARAM_STR);
  $statement->bindParam(':lieuC', $course->lieuC, PDO::PARAM_STR, 2);
  $statement->execute();

  echo $pdo->lastInsertId();

?>
