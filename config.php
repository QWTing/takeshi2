<?php
//データベース接続情報を格納
$host = "localhost:3306";
$db = "takeshi";
$username = "root";
$password = "necu960107";

$dsn = "mysql:dbname=$db;host=$host;";

try {
  $dbn = new PDO($dsn, $username, $password);
  $dbn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connection successful";
  $sql = "SELECT * FROM meun";

  // prepare 方法來準備一個 SQL 查詢，然後使用 execute 方法來執行這個已準備好的查詢
  $users = $dbn->prepare($sql);
  $users->execute();
} catch (PDOException $error) {
  echo $error->getCode();
}
