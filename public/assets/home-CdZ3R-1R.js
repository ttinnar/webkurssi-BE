import{s as l,f as c}from"./snackbar-ZwFHH3Ce.js";function f(t){const e=t.split("T")[0],[o,n,a]=e.split("-");return`${a}-${n}-${o}`}function w(){const t=new Date,e=t.getFullYear(),o=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${e}-${o}-${n}`}const p=document.querySelector("#entry_form");p.addEventListener("submit",t=>{const e=document.getElementById("workout").value;if(t.preventDefault(),p.checkValidity())if(e==="placeholder"){l("Crimson","Please select a color to represent your mood");return}else S();else{p.reportValidity();return}});async function S(){const t=document.getElementById("workout").value,e=document.getElementById("duration").value,o=document.getElementById("intensity").value,n=document.getElementById("notes").value,a=localStorage.getItem("token");if(!a){console.error("Token not found in local storage");return}const d={workout:t,duration:e,intensity:o,notes:n,entry_date:w()},r={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+a},body:JSON.stringify(d)};I(r)}async function I(t){b("https://trdns.northeurope.cloudapp.azure.com/api/entries",t).then(e=>{console.log("Response:",e),l("darkgreen","New entry added!")}).catch(e=>{console.error("Error:",e),l("red","New entry couldn't be added!")})}async function b(t,e={}){return(await fetch(t,e)).json()}const B=document.querySelector(".toggle_list"),v=document.querySelector(".result-table");let m=!1;B.addEventListener("click",()=>{m=!m,m?v.style.display="table":v.style.display="none"});const D=document.querySelector(".get_entries");D.addEventListener("click",y);async function y(){console.log("Haetaan kaikki merkinnät");const t="https://trdns.northeurope.cloudapp.azure.com/api/entries",o={method:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("token")}};c(t,o).then(n=>{T(n)}).catch(n=>{console.error("Error fetching entries:",n)})}function T(t){console.log(t);const e=document.querySelector(".tbody");e.innerHTML="",t.forEach(o=>{console.log(o.user_id,o.entry_date,o.workout,o.duration,o.intensity,o.notes);const n=document.createElement("tr"),a=document.createElement("td");a.innerText=f(o.entry_date);const d=document.createElement("td");d.innerText=o.workout;const r=document.createElement("td");r.innerText=o.duration;const g=document.createElement("td");g.innerText=o.intensity;const h=document.createElement("td");h.innerText=o.notes;const k=document.createElement("td"),i=document.createElement("button");i.className="check",i.setAttribute("data-id",o.entry_id),i.innerText="Edit workout",k.appendChild(i);const E=document.createElement("td"),s=document.createElement("button");s.className="check",s.setAttribute("data-id",o.entry_id),s.innerText="Delete",E.appendChild(s),i.addEventListener("click",C),s.addEventListener("click",x),n.appendChild(a),n.appendChild(d),n.appendChild(r),n.appendChild(g),n.appendChild(h),n.appendChild(k),n.appendChild(E),e.appendChild(n)})}const u=document.querySelector(".info_dialog"),$=document.querySelector(".info_dialog button");$.addEventListener("click",()=>{u.close()});async function C(t){console.log("Muokataan tietoa"),console.log(t);const e=t.target.attributes["data-id"].value;console.log(e);const o=`https://trdns.northeurope.cloudapp.azure.com/api/entries/${e}`,a={method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};c(o,a).then(d=>{console.log(d),_(d)})}function _(t){u.showModal(),console.log("in modal"),u.querySelector("p").innerHTML=`
    <div>Entry ID: <span>${t.entry_id}</span></div>
    <div>Entry Date: <input type="date" id="edit-entry-date" value="${t.entry_date}"></div>
    <div>Workout: <input type="text" id="edit-workout" value="${t.workout}"></div>
    <div>Duration: <input type="number" id="edit-duration" value="${t.duration}"></div>
    <div>Intensity: <input type="text" id="edit-intensity" value="${t.intensity}"></div>
    <div>Notes: <textarea id="edit-notes">${t.notes}</textarea></div>
    <button class="save-edit" data-id="${t.entry_id}">Save Changes</button>
  `,document.querySelector(".save-edit").addEventListener("click",L)}async function L(t){const e=t.target.dataset.id;console.log("Saving changes for entry ID:",e);const o={entry_date:document.getElementById("edit-entry-date").value,workout:document.getElementById("edit-workout").value,duration:document.getElementById("edit-duration").value,intensity:document.getElementById("edit-intensity").value,notes:document.getElementById("edit-notes").value},n=`https://trdns.northeurope.cloudapp.azure.com/api/entries/${e}`,d={method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")},body:JSON.stringify(o)};c(n,d).then(r=>{console.log("Workout updated successfully:",r),l("darkgreen","Diary entry updated!"),y(),u.close()}).catch(r=>{console.error("Error updating workout:",r)})}async function x(t){console.log("Deleting workout entry");const e=t.target.dataset.id;if(console.log("Entry ID to delete:",e),!confirm(`Are you sure you want to delete workout entry with ID: ${e}?`))return;const n=`https://trdns.northeurope.cloudapp.azure.com/api/entries/${e}`,d={method:"DELETE",headers:{Authorization:"Bearer "+localStorage.getItem("token")}};c(n,d).then(r=>{console.log("Workout entry deleted successfully:",r),y()}).catch(r=>{console.error("Error deleting workout entry:",r)})}async function z(){console.log("Onnistuneesti kirjauduttu ja käyttäjätietojen pitäisi näkyä");const t="https://trdns.northeurope.cloudapp.azure.com/api/auth/me",o={method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};c(t,o).then(n=>{console.log(n),document.getElementById("name").innerHTML=n.user.username})}document.querySelector(".logout").addEventListener("click",q);function q(t){t.preventDefault(),localStorage.removeItem("token"),console.log("logginout"),window.location.href="index.html"}z();
