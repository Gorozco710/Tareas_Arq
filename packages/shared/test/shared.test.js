import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateTitle, summarize} from '../src/index.js';
test('valida títulos vacíos, tipos y longitud', () => {
 for (const value of ['', '  ', null, 42, 'x'.repeat(101)]) assert.ok(validateTitle(value));
 assert.equal(validateTitle(' Estudiar '), null);
});
test('resume tareas y lista vacía', () => {
 assert.deepEqual(summarize([]), {total:0,done:0,pending:0});
 assert.deepEqual(summarize([{status:'done'},{status:'pending'}]), {total:2,done:1,pending:1});
});
