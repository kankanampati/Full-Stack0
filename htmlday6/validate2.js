function validaterollnumber(){
    var val =document.getElementById("txtrollnumber").value;
    if(/^[2][2][1][7][1][0][3][0][1][0-3][0-9][1-9]$/.test(val)){
        window.alert("valid rollnumber");
    }
    else{
        window.alert("Invalid rollnumber");
        document.getElementById("txtrollnumber").focus();

    }
}