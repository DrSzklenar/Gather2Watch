<?php

require("../dependencies/connection.php");

// session_start();

if(isset($_POST['submit'])){

   $name = mysqli_real_escape_string($conn, $_POST['name']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $pass = md5($_POST['password']);
   
   

   $select = " SELECT * FROM user WHERE email = '$email' && jelszo = '$pass' ";

   $result = mysqli_query($conn, $select);

   if(mysqli_num_rows($result) ===1){
      $row = mysqli_fetch_array($result);
      if($row['email'] === $email && $row['password'] === $jelszo){
         $bytes = random_bytes(20);
         $token = bin2hex($bytes);
         
         $sql = "INSERT INTO `sessions`(`userID`, `active`, `token`, `acquired`, `expires`) VALUES ('".$row['id']."',   true,'$token','".date("Y-m-d H:i:s")."','".$NewDate=date('Y-m-d H:i:s', strtotime('+7 days'))."')";
         // $sql = "INSERT INTO `sessions`(`userID`, `active`, `token`, `acquired`, `expires`) VALUES ()";
         mysqli_query($conn, $sql);
         if (!mysqli_query($conn, $sql_signup)) {
            echo "Error: " . mysqli_error($conn);
         }
         setcookie("session", $token, time() + (60*60*24*7), "/");

         // $_SESSION['email'] = $row['email'];
         // $_SESSION['jelszo'] = $row['jelszo'];
         header("Location: ../index.php ");
      }
     
   }else{
      $error[] = 'incorrect email or password!';
   }

};
?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>login form</title>

   
   <link rel="stylesheet" href="../css/style.css">

</head>
<body>
   
<div class="form-container">

   <form action="" method="post">
      <h3>Login now</h3>
      <?php
      if(isset($error)){
         foreach($error as $error){
            echo '<span class="error-msg">'.$error.'</span>';
         };
      };
      ?>
      <input type="email" name="email" required placeholder="Enter your email">
      <input type="password" name="password" required placeholder="Enter your password">
      <input type="submit" name="submit" value="Login now" class="form-btn">
      <p>Don't have an account? <a href="register.php">Register now</a></p>
   </form>

</div>

</body>
</html>