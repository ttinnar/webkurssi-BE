import{f as l}from"./fetch-B09IB6gx.js";const i=document.querySelector(".createuser");i.addEventListener("click",async t=>{t.preventDefault(),console.log("Nyt luodaan käyttäjä");const o="/api/users",e=document.querySelector(".create_user_form");if(!e.checkValidity()){e.reportValidity();return}console.log("Tiedot valideja, jatketaan");const r={username:e.querySelector("input[name=username]").value,password:e.querySelector("input[name=password]").value,email:e.querySelector("input[name=email]").value},c={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)};try{const n=await l(o,c);console.log(n)}catch(n){console.error(n)}});const u=document.querySelector(".loginuser");u.addEventListener("click",async t=>{t.preventDefault(),console.log("Nyt logataan sisään");const o="/api/auth/login",e=document.querySelector(".login_form"),s=e.querySelector("input[name=username]").value,r=e.querySelector("input[name=password]").value,n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:s,password:r})};l(o,n).then(a=>{console.log(a),console.log(a.token),localStorage.setItem("token",a.token),a.token==null?alert("Käyttäjänimi tai salasana väärin"):(alert("login in now!"),window.location.href="home.html"),d("loginResponse",`localStorage set with token value: ${a.token}`)})});const m=document.querySelector("#meRequest");m.addEventListener("click",async()=>{console.log("Testataan TOKENIA ja haetaan käyttäjän tiedot");const t="/api/auth/me",o=localStorage.getItem("token");console.log(o);const e={method:"GET",headers:{Authorization:"Bearer: "+o}};console.log(e),l(t,e).then(s=>{console.log(s)})});function d(t,o){document.getElementById(t).innerText=o}
