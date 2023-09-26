<?php

include('config.php');

try {
  $dbn = new PDO($dsn, $username, $password);
  $dbn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $sql = "SELECT * FROM takeshi.meun
  join takeshi.menu_categorization
  on menu_categorization.jp = meun.group;";
  echo "已讀取";
  $meun = $dbn->prepare($sql);
  $meun->execute();
  $data = $meun->fetchAll(PDO::FETCH_ASSOC);

  foreach ($data as $row) {
    echo $row['id'];
  }

  $json_data = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
  echo "已創造";
  file_put_contents('data.json', $json_data);
} catch (PDOException $e) {
  echo $e->getMessage();
}
