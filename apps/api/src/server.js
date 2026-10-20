import {createApp} from './app.js';
const port=Number(process.env.PORT || 3001);
createApp().listen(port,process.env.HOST || '127.0.0.1',()=>console.log(`API: http://localhost:${port}/api/health`));
