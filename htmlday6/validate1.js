function validatemobile(){
    var val =document.getElementById("txtmobile").value;
    if(/^[6-9][0-9]{9}$/.test(val)){
        window.alert("valid number");
    }
    else{
        window.alert("Invalid number");
        document.getElementById("txtmobile").focus();

    }
}