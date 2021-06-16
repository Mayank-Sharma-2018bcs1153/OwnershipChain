<?php
$cn=mysqli_connect("localhost","id15447715_abesa2hs_dataritz_projects1","R%NMM3fmw&luBPcP","id15447715_abesa2hs_dataritz_projects");
$json=file_get_contents('php://input');
$obj=json_decode($json,true);
$username=$obj['username'];
$sql="SELECT * FROM ownership_chain_maindashboard WHERE username='$username'";
// $sql="SELECT * FROM ownership_chain_maindashboard WHERE username='Mayank'";
$result=mysqli_query($cn,$sql);
if($result->num_rows>0){
    while($row['item'][]=$result->fetch_assoc()){
        $item=$row;
        $json=json_encode($item);
    }
}
else{
    $msg='no result found !';
    $json=json_encode($msg);
}
echo $json;
?>