<?php 
if (isset($_POST['enviar'])){
    if(!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['message'])){
        $name =$_POST['name'];
        $email=$_POST['email'];
        $message=$_POST['message'];
        $header = "from: noreply@example.com" . "\r\n";
        $header = "Reply-To: noreply@example.com" . "\r\n";
        $header = "X-Mailer: PHP/" . phpversion();
        $mail = @mail($email, $name, $message, $header);
        if ($mail) {
            echo "<h4 style=color: white;>¡Email enviado exitosamente!</h4>";
        }
    }
}
?>