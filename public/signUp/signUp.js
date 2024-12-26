const form=document.querySelector(".form");
const Err=document.querySelector("error-message");

form.addEventListener("submit",(e)=>{
  e.preventDefault();

  const userName=document.querySelector("#name");
  const email=document.querySelector("#email");
  const password=document.querySelector("#password");
  const user={
    userName:userName.value,
    email:email.value,
    password:password.value

  }
  axios.post("http://localhost:4000/api/user/signUp",user).then((result) => {
    console.log(result)
    alert("user successfully registered");
    window.location.href="../login/login.html"
    
  }).catch((error) => {
    if (error.response && error.response.status === 409) {
      alert('This email is already registered. Please use another email.');
    } else {
      alert('An error occurred. Please try again.');
    }
})

})