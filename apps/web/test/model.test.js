import {test} from 'node:test';
import assert from 'node:assert/strict';
import {taskPayload,summarize,STATUSES} from '../src/model.js';
test('frontend normaliza el título y rechaza valores inválidos',()=>{
 assert.deepEqual(taskPayload(' Leer '),{title:'Leer'});
 assert.throws(()=>taskPayload(' '),/título/);
 assert.throws(()=>taskPayload('x'.repeat(101)),/100/);
});
test('frontend obtiene estados y estadísticas del paquete compartido',()=>{
 assert.equal(STATUSES.done,'Completada');
 assert.deepEqual(summarize([{status:'pending'}]),{total:1,done:0,pending:1});
});
