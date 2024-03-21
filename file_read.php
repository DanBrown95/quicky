<!-- <?php
if (isset($_GET['tail'])) {
  session_start();
  $handle = fopen('loc.txt', 'r');// I assume, a.txt is in the same path with file_read.php
  if (isset($_SESSION['offset'])) {
    $data = stream_get_contents($handle, -1, $_SESSION['offset']);// Second parameter is the size of text you will read on each request
    echo nl2br($data);
  } else {
    fseek($handle, 0, SEEK_END);
    $_SESSION['offset'] = ftell($handle);
  } 
  exit();
} 
?> -->
