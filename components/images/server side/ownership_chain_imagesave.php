<?php
$username=$_POST['username'];
$imagename1=$_FILES['image']['name'];
$imagename='https://ownershipchain1.000webhostapp.com/upload_ownership/'.$imagename1;
echo $imagename;
$description=$_POST['description'];
$date=$_POST['date'];
$sql="INSERT INTO ownership_chain_maindashboard VALUES('$username','$imagename','$description','$date')";
// $sql="INSERT INTO ownership_chain_maindashboard VALUES('coolmayank615@gmail.com','sense','Mayank','aaj ki')";
$cn=mysqli_connect("localhost","id15447715_abesa2hs_dataritz_projects1","R%NMM3fmw&luBPcP","id15447715_abesa2hs_dataritz_projects");
mysqli_query($cn,$sql);
mysqli_close($cn);
move_uploaded_file($_FILES['image']['tmp_name'],"upload_ownership/$imagename1");
// move_uploaded_file($_FILES['image']['tmp_name'],"upload_ownership");
echo "Image saved in gallery";
?>