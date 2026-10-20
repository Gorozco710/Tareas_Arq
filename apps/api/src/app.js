import express from 'express';
import {randomUUID} from 'node:crypto';
import {APP_NAME, STATUSES, validateTitle, summarize} from '@hw/shared';
export function createApp() {
 const app = express();
 const tasks = new Map();
 app.use(express.json({limit:'16kb'}));
 app.get('/api/health', (req,res) => res.json({status:'ok', app:APP_NAME}));
 app.get('/api/tasks', (req,res) => res.json({tasks:[...tasks.values()], summary:summarize([...tasks.values()])}));
 app.post('/api/tasks', (req,res) => {
  const error=validateTitle(req.body?.title);
  if(error) return res.status(400).json({error});
  const task={id:randomUUID(),title:req.body.title.trim(),status:'pending'};
  tasks.set(task.id,task); res.status(201).json(task);
 });
 app.patch('/api/tasks/:id', (req,res) => {
  const task=tasks.get(req.params.id);
  if(!task) return res.status(404).json({error:'Tarea no encontrada.'});
  if(!Object.hasOwn(STATUSES,req.body?.status)) return res.status(400).json({error:'Estado inválido.'});
  task.status=req.body.status; res.json(task);
 });
 app.delete('/api/tasks/:id', (req,res) => {
  if(!tasks.delete(req.params.id)) return res.status(404).json({error:'Tarea no encontrada.'});
  res.sendStatus(204);
 });
 app.use((req,res)=>res.status(404).json({error:'Ruta no encontrada.'}));
 app.use((error,req,res,next)=>res.status(error.status || 500).json({error:error.status===400?'JSON inválido.':'No se pudo procesar la solicitud.'}));
 return app;
}
