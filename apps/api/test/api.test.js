import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from '../src/app.js';
test('API: salud, validación, creación, actualización y eliminación', async () => {
 const server=createApp().listen(0,'127.0.0.1');
 await new Promise(resolve=>server.once('listening',resolve));
 const base=`http://127.0.0.1:${server.address().port}/api`;
 const request=(path,method='GET',body)=>fetch(base+path,{method,headers:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});
 try {
  assert.equal((await request('/health')).status,200);
  assert.equal((await request('/tasks','POST',{title:' '})).status,400);
  const created=await request('/tasks','POST',{title:' Probar monorepo '});
  assert.equal(created.status,201); const task=await created.json();
  assert.equal(task.title,'Probar monorepo');
  assert.equal((await request('/tasks/'+task.id,'PATCH',{status:'invalid'})).status,400);
  assert.equal((await request('/tasks/'+task.id,'PATCH',{status:'done'})).status,200);
  assert.deepEqual((await (await request('/tasks')).json()).summary,{total:1,done:1,pending:0});
  assert.equal((await request('/tasks/'+task.id,'DELETE')).status,204);
  assert.equal((await request('/tasks/'+task.id,'DELETE')).status,404);
  assert.equal((await request('/tasks','POST',{title:99})).status,400);
 } finally {await new Promise(resolve=>server.close(resolve));}
});
