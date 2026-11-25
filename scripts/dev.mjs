import http from 'node:http';
import {readFile,watch} from 'node:fs';
import {resolve,extname} from 'node:path';
const root=resolve('src'),clients=new Set();
watch(root,{recursive:true},()=>{for(const client of clients)client.write('data: reload\n\n')});
http.createServer((req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 if(pathname==='/__reload'){res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});res.write(': connected\n\n');clients.add(res);req.on('close',()=>clients.delete(res));return}
 const file=resolve(root,'.'+decodeURIComponent(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(root+'/')){res.writeHead(403);res.end();return}
 readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return}const ext=extname(file);res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css'})[ext]||'application/octet-stream');res.setHeader('Cache-Control','no-store');res.end(ext==='.html'?data.toString()+`<script>new EventSource('/__reload').onmessage=()=>location.reload()</script>`:data)})
}).listen(5173,'127.0.0.1',()=>console.log('WastePulse local: http://127.0.0.1:5173'));
