/* SIGNUP */

function signup(){

const name =
document.getElementById("signupName").value;

const email =
document.getElementById("signupEmail").value;

const password =
document.getElementById("signupPassword").value;

if(!name || !email || !password){

alert("Please Fill All Fields");

return;
}

const user = {

name,
email,
password
};

localStorage.setItem(
"user",
JSON.stringify(user)
);

alert("Signup Successful");

window.location.href="login.html";
}

/* LOGIN */

function login(){

const email =
document.getElementById("loginEmail").value;

const password =
document.getElementById("loginPassword").value;

const user =
JSON.parse(localStorage.getItem("user"));

if(
user &&
user.email===email &&
user.password===password
){

localStorage.setItem(
"loggedInUser",
JSON.stringify(user)
);

alert("Login Successful");

window.location.href="index.html";

}else{

alert("Invalid Email Or Password");
}
}

/* LOGOUT */

function logout(){

localStorage.removeItem(
"loggedInUser"
);

window.location.href="login.html";
}
