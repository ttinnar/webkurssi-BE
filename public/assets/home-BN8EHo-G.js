import{f as d}from"./fetch-B09IB6gx.js";function y(t,n){const e=document.getElementById("snackbar-target");e.className="show",e.innerText=n,e.style.backgroundColor=t,setTimeout(function(){e.className=e.className.replace("show","")},3e3),e.classList.contains("show")||(e.classList.add("show"),setTimeout(function(){e.classList.remove("show")},3e3))}function f(t){const n=t.split("T")[0],[e,o,s]=n.split("-");return`${s}-${o}-${e}`}function w(){const t=new Date,n=t.getFullYear(),e=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0");return`${n}-${e}-${o}`}const u=document.querySelector("#entry_form");u.addEventListener("submit",t=>{const n=document.getElementById("workout").value;if(t.preventDefault(),u.checkValidity())if(n==="placeholder"){y("Crimson","Please select a color to represent your mood");return}else S();else{u.reportValidity();return}});async function S(){const t=document.getElementById("workout").value,n=document.getElementById("duration").value,e=document.getElementById("intensity").value,o=document.getElementById("notes").value,s=localStorage.getItem("token");if(!s){console.error("Token not found in local storage");return}const i={workout:t,duration:n,intensity:e,notes:o,entry_date:w()},r={method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+s},body:JSON.stringify(i)};I(r)}async function I(t){b("/api/entries",t).then(n=>{console.log("Response:",n),y("darkgreen","New entry added!")}).catch(n=>{console.error("Error:",n),y("crimson","New entry couldn't be added!")})}async function b(t,n={}){return(await fetch(t,n)).json()}const T=document.querySelector(".toggle_list"),v=document.querySelector(".result-table");let m=!1;T.addEventListener("click",()=>{m=!m,m?v.style.display="table":v.style.display="none"});const B=document.querySelector(".get_entries");B.addEventListener("click",g);async function g(){console.log("Haetaan kaikki merkinnät");const t="/api/entries",e={method:"GET",headers:{Authorization:"Bearer "+localStorage.getItem("token")}};d(t,e).then(o=>{D(o)}).catch(o=>{console.error("Error fetching entries:",o)})}function D(t){console.log(t);const n=document.querySelector(".tbody");n.innerHTML="",t.forEach(e=>{console.log(e.user_id,e.entry_date,e.workout,e.duration,e.intensity,e.notes);const o=document.createElement("tr"),s=document.createElement("td");s.innerText=f(e.entry_date);const i=document.createElement("td");i.innerText=e.workout;const r=document.createElement("td");r.innerText=e.duration;const p=document.createElement("td");p.innerText=e.intensity;const h=document.createElement("td");h.innerText=e.notes;const k=document.createElement("td"),a=document.createElement("button");a.className="check",a.setAttribute("data-id",e.entry_id),a.innerText="Edit workout",k.appendChild(a);const E=document.createElement("td"),c=document.createElement("button");c.className="check",c.setAttribute("data-id",e.entry_id),c.innerText="Delete",E.appendChild(c),a.addEventListener("click",C),c.addEventListener("click",x),o.appendChild(s),o.appendChild(i),o.appendChild(r),o.appendChild(p),o.appendChild(h),o.appendChild(k),o.appendChild(E),n.appendChild(o)})}const l=document.querySelector(".info_dialog"),$=document.querySelector(".info_dialog button");$.addEventListener("click",()=>{l.close()});async function C(t){console.log("Muokataan tietoa"),console.log(t);const n=t.target.attributes["data-id"].value;console.log(n);const e=`/api/entries/${n}`,s={method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};d(e,s).then(i=>{console.log(i),L(i)})}function L(t){l.showModal(),console.log("in modal"),l.querySelector("p").innerHTML=`
    <div>Entry ID: <span>${t.entry_id}</span></div>
    <div>Entry Date: <input type="date" id="edit-entry-date" value="${t.entry_date}"></div>
    <div>Workout: <input type="text" id="edit-workout" value="${t.workout}"></div>
    <div>Duration: <input type="number" id="edit-duration" value="${t.duration}"></div>
    <div>Intensity: <input type="text" id="edit-intensity" value="${t.intensity}"></div>
    <div>Notes: <textarea id="edit-notes">${t.notes}</textarea></div>
    <button class="save-edit" data-id="${t.entry_id}">Save Changes</button>
  `,document.querySelector(".save-edit").addEventListener("click",_)}async function _(t){const n=t.target.dataset.id;console.log("Saving changes for entry ID:",n);const e={entry_date:document.getElementById("edit-entry-date").value,workout:document.getElementById("edit-workout").value,duration:document.getElementById("edit-duration").value,intensity:document.getElementById("edit-intensity").value,notes:document.getElementById("edit-notes").value},o=`/api/entries/${n}`,i={method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("token")},body:JSON.stringify(e)};d(o,i).then(r=>{console.log("Workout updated successfully:",r),g(),l.close()}).catch(r=>{console.error("Error updating workout:",r)})}async function x(t){console.log("Deleting workout entry");const n=t.target.dataset.id;if(console.log("Entry ID to delete:",n),!confirm(`Are you sure you want to delete workout entry with ID: ${n}?`))return;const o=`/api/entries/${n}`,i={method:"DELETE",headers:{Authorization:"Bearer "+localStorage.getItem("token")}};d(o,i).then(r=>{console.log("Workout entry deleted successfully:",r),g()}).catch(r=>{console.error("Error deleting workout entry:",r)})}async function N(){console.log("Onnistuneesti kirjauduttu ja käyttäjätietojen pitäisi näkyä");const t="/api/auth/me",e={method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};d(t,e).then(o=>{console.log(o),document.getElementById("name").innerHTML=o.user.username})}document.querySelector(".logout").addEventListener("click",q);function q(t){t.preventDefault(),localStorage.removeItem("token"),console.log("logginout"),window.location.href="index.html"}N();
