import {test} from 'node:test';
import assert from 'node:assert/strict';
test('three pages and planning dialogs render without runtime errors',async()=>{
 const elements=new Map(),events={},windowEvents={};
 const element=s=>{if(!elements.has(s))elements.set(s,{innerHTML:'',textContent:'',value:'',open:false,dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},removeAttribute(){},addEventListener(){},showModal(){this.open=true},close(){this.open=false}});return elements.get(s)};
 globalThis.document={querySelector:element,querySelectorAll:()=>[],addEventListener:(name,fn)=>events[name]=fn};
 globalThis.location={hash:'#home'};globalThis.window={addEventListener:(name,fn)=>windowEvents[name]=fn,scrollTo(){}};globalThis.localStorage={getItem:()=>null,setItem(){}};
 await import('../src/app.js');
 assert.match(element('#app').innerHTML,/What has actually been managed/);
 assert.match(element('#app').innerHTML,/Late-order risk: an annual view/);
 for(const [page,title] of [['business','Business waste plans'],['efwa','Demand forecasts']]){location.hash='#'+page;windowEvents.hashchange();assert.ok(element('#app').innerHTML.includes(title));assert.ok(element('#app').innerHTML.includes(page==='business'?'Five bakery stress tests':'Share the cost of late changes'))}
 const click=(action,id='')=>events.click({target:{closest:()=>({dataset:{action,id}})}});
 for(const [action,id,expected] of [['plan','','Create a bakery waste plan'],['demand','','Add a food demand forecast'],['partner','','Add a possible recovery partner'],['opportunities','p1','Suitable demand opportunities'],['supply','d1','Compatible business plans'],['match','p1|d1|food','Plan a connection'],['confirm','m1','Confirm a demo handover']]){click(action,id);assert.ok(element('#modal').innerHTML.includes(expected));click('close')}
});
