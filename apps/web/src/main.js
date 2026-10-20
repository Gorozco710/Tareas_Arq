import './style.css';
import {APP_NAME} from '@hw/shared';
import {taskPayload,summarize,STATUSES} from './model.js';
document.title=`${APP_NAME} · HW-05`;
const list=document.querySelector('#tasks'),message=document.querySelector('#message');
async function api(path='',method='GET',body) {
 const response=await fetch('/api/tasks'+path,{method,headers:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});
 if(!response.ok) {const data=await response.json();throw new Error(data.error || 'Error de conexión.');}
 return response.status===204?null:response.json();
}
async function load() {
 const {tasks}=await api(); const summary=summarize(tasks);
 document.querySelector('#summary').replaceChildren(...[['Total',summary.total],['Pendientes',summary.pending],['Completadas',summary.done]].map(([label,value])=>{
 const card=document.createElement('div');const count=document.createElement('strong');count.textContent=value;const text=document.createElement('span');text.textContent=label;card.append(count,text);return card;
 }));
 list.replaceChildren();
 if(!tasks.length) {const empty=document.createElement('li');empty.textContent='Todo despejado. Agrega tu primera tarea.';empty.className='empty';list.append(empty);}
 for(const task of tasks) {
  const row=document.createElement('li');const label=document.createElement('label');const check=document.createElement('input');check.type='checkbox';check.checked=task.status==='done';
  check.setAttribute('aria-label',`Completar: ${task.title}`);
  const title=document.createElement('span');title.textContent=task.title;if(check.checked)title.className='done';
  const status=document.createElement('small');status.textContent=STATUSES[task.status];
  const remove=document.createElement('button');remove.textContent='Eliminar';remove.className='remove';remove.setAttribute('aria-label',`Eliminar: ${task.title}`);
  check.onchange=()=>run(()=>api('/'+task.id,'PATCH',{status:check.checked?'done':'pending'}));
  remove.onclick=()=>run(()=>api('/'+task.id,'DELETE'));
  label.append(check,title);row.append(label,status,remove);list.append(row);
 }
}
async function run(action) {try{await action();await load();message.textContent='';}catch(error){message.textContent=error.message;}}
document.querySelector('#form').onsubmit=async event=>{event.preventDefault();const input=document.querySelector('#title');await run(async()=>{await api('','POST',taskPayload(input.value));input.value='';});};
load().catch(()=>{message.textContent='No se pudo conectar con la API. Inicia ambas aplicaciones con npm run dev.';});
