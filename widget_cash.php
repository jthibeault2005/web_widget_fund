//SERVER SIDE
  <?php
 $fname = $_GET['firstname'];
      if($fname=='Jeff')
      {
          //header("Content-Type: application/json");
         echo $_GET['callback'] . '(' . "{'fullname' : 'Jeff Hansen'}" . ')';

      }
?>
