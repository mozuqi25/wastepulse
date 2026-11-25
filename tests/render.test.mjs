import {test} from 'node:test';
import assert from 'node:assert/strict';
test('three pages and planning dialogs render without runtime errors',async()=>{
 const elements=new Map(),events={},windowEvents={};
 const element=s=>{if(!elements.has(s))elements.set(s,{innerHTML:'',textContent:'',value:'',open:false,dataset:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},removeAttribute(){},addEventListener(){},insertAdjacentHTML(position,html){this.innerHTML+=html},showModal(){this.open=true},close(){this.open=false}});return elements.get(s)};
 globalThis.document={querySelector:element,querySelectorAll:()=>[],addEventListener:(name,fn)=>events[name]=fn};
 globalThis.location={hash:'#home'};globalThis.window={addEventListener:(name,fn)=>windowEvents[name]=fn,scrollTo(){}};globalThis.localStorage={getItem:()=>null,setItem(){}};
 await import('../src/app.js');
 assert.match(element('#app').innerHTML,/What has actually been managed/);
 assert.doesNotMatch(element('#app').innerHTML,/Late-order risk: an annual view|ILLUSTRATIVE SCENARIO/);
 for(const [page,title] of [['business','Business waste plans'],['efwa','Demand forecasts']]){location.hash='#'+page;windowEvents.hashchange();assert.ok(element('#app').innerHTML.includes(title));if(page==='efwa')assert.equal((element('#app').innerHTML.match(/data-action="supply"/g)||[]).length,4);if(page==='business'){const html=element('#app').innerHTML;assert.match(html,/<details class="panel risksection risklab" id="risk-analysis">/);assert.equal((html.match(/<article class="plan">/g)||[]).length,3);for(const name of ['Surplus bread flour','Separated bakery process residues','Unsold packaged rolls'])assert.ok(html.includes(name));}if(page==='business')assert.ok(element('#app').innerHTML.includes('Five bakery stress tests'));else assert.doesNotMatch(element('#app').innerHTML,/PROPOSED INCENTIVE MECHANISM|Share the cost of late changes/)}
 const click=(action,id='')=>events.click({target:{closest:()=>({dataset:{action,id}})}});
 for(const [action,id,expected] of [['plan','','Create a bakery waste plan'],['demand','','Add a food demand forecast'],['partner','','Add a possible recovery partner'],['opportunities','p1','Suitable demand opportunities'],['supply','d1','Compatible business plans'],['match','p1|d1|food','Plan a connection'],['confirm','m1','Confirm a demo handover']]){click(action,id);assert.ok(element('#modal').innerHTML.includes(expected));click('close')}
});
