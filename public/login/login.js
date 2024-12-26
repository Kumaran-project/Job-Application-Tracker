const form=document.querySelector("form");
const Err=document.querySelector(".error-message");

form.addEventListener("submit",(e)=>{
  e.preventDefault();


  const email=document.querySelector("#email");
  const password=document.querySelector("#password");
  const user={
    email:email.value,
    password:password.value

  }
  axios.post("http://localhost:4000/api/user/login",user).then((response) => {
    alert("user logged in successfully");
    
    if(response.status===200){
      localStorage.setItem("JWTToken",response.data.token);
      console.log(response.data.redirectUrl);
       window.location.href = "../job/jobs.html"
    }
    
  }).catch((error) => {
    console.log(error.response.data.message);
    console.log(Err)
    Err.textContent=error.response.data.message;
   
})

})

// document.querySelector(".forgot").addEventListener("click",()=>{
//   window.location.href="../password/forgotpassword.html";
// })