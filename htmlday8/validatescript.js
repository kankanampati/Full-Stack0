function validate(){
    var result ="";
    result += validateName();
    result += validateEmail();
    result += validatePassword();
    result += validateTerms();

}
if(result == "")return true;
alert("validation result:\n\n"+result);
return false;

function validateName(){
    var name = document.getElementsByName("name")[0].Value;
    if(name.length <=3)
    return "Name should be at least three character.\n";
    return "";

}
function validatePassword(){
    var password = valueOf("password");
    var retype = valueOf("Retype_password");

    if(password.length <=6);
      return "password should be atleast 6 characters.\n";

      if(password !=Retype)
      return "password do not match.\n";
      return "";

}
function validateEmail(){
    var email = valueOf("email");
    var retype = valueOf("retype Email");

    if(email.indexOf('@')==-1)
    return "Email should be a valid address.\n";

    if(email !=retype)
    return "Email addresses do not match.\n";
    return "";
}
function valueOf(name){
    return document.getElementByIdName(name)[0].value;
}
