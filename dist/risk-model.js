// Adapted analytical structure, not tomato observations or calibrated bakery estimates.
export const RISK_SOURCE={file:'EFWA_Option2_Actuarial_Model.xlsx',event:'Demo!A5:C20',rules:'Assumptions!A19:C22',scenarios:'Scenarios!A4:F17',annual:'Results!A4:D15',simulation:'Guide!A16:A17 and Simulation!A2:J4'};
export const PRESETS={
 flour:{label:'Flour supplier → manufacturer',seller:'Farmer / supplier',buyer:'Manufacturer / packer',order:18000,cancelled:1200,price:0.85,salvage:0.45,recovery:70,disposal:0.10,handling:0.05,notice:1,shortDays:2,longDays:8,shortShare:80,mediumShare:50,longShare:0,frequency:15,severityCV:30},
 bread:{label:'Bread manufacturer → distributor',seller:'Manufacturer / packer',buyer:'Distributor',order:12000,cancelled:800,price:3.00,salvage:0.60,recovery:50,disposal:0.12,handling:0.08,notice:0.5,shortDays:1,longDays:3,shortShare:80,mediumShare:50,longShare:0,frequency:15,severityCV:30},
 pastry:{label:'Pastry manufacturer → distributor',seller:'Manufacturer / packer',buyer:'Distributor',order:5000,cancelled:350,price:6.00,salvage:1.20,recovery:40,disposal:0.15,handling:0.12,notice:0.5,shortDays:1,longDays:3,shortShare:80,mediumShare:50,longShare:0,frequency:15,severityCV:30}
};
export function validateRisk(a){
 for(const k of ['order','cancelled','price','salvage','recovery','disposal','handling','notice','shortDays','longDays','shortShare','mediumShare','longShare','frequency','severityCV'])if(!Number.isFinite(a[k])||a[k]<0)throw Error(`${k}: enter a non-negative number.`);
 if(a.order<=0||a.price<=0)throw Error('Order volume and contract price must be greater than zero.');
 if(a.cancelled>a.order)throw Error('Affected volume cannot exceed the weekly order.');
 for(const k of ['recovery','shortShare','mediumShare','longShare','frequency'])if(a[k]>100)throw Error(`${k}: enter a percentage from 0 to 100.`);
 if(a.shortDays>=a.longDays)throw Error('The longer-notice threshold must exceed the short-notice threshold.');
 if(a.severityCV>200)throw Error('Limit severity variation to 200% for this prototype.');
 return a;
}
export function eventExposure(a){validateRisk(a);const buyerRate=(a.notice<a.shortDays?a.shortShare:a.notice<a.longDays?a.mediumShare:a.longShare)/100,recovered=a.cancelled*a.recovery/100,residual=a.cancelled-recovered,contractValue=a.cancelled*a.price,recoveredRevenue=recovered*a.salvage,handlingCost=recovered*a.handling,disposalCost=residual*a.disposal,rawExposure=contractValue-recoveredRevenue+handlingCost+disposalCost,total=Math.max(0,rawExposure),buyer=total*buyerRate;return {contractValue,recoveredRevenue,handlingCost,disposalCost,rawExposure,total,buyerRate,buyer,seller:total-buyer,recovered,residual,fillRate:(a.order-a.cancelled)/a.order*100}}
export function stressCases(a){return [
 {name:'Current assumptions',note:'Selected inputs unchanged.',inputs:{...a}},
 {name:'Larger cancellation',note:'Affected volume doubled, capped at weekly order.',inputs:{...a,cancelled:Math.min(a.order,a.cancelled*2)}},
 {name:'Contract price +20%',note:'Higher contract value; other inputs unchanged.',inputs:{...a,price:a.price*1.2}},
 {name:'No recovery outlet',note:'Recovery share set to zero; all affected material incurs assumed disposal cost.',inputs:{...a,recovery:0}},
 {name:'Earlier notice + better recovery',note:'Notice reaches the long threshold and recovery rises by 30 percentage points (max 100%). Two explicit assumptions, not a causal estimate.',inputs:{...a,notice:Math.max(a.longDays,a.notice),recovery:Math.min(100,a.recovery+30)}}
 ].map(c=>({...c,result:eventExposure(c.inputs)}))}
function random(seed){return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296}}
export function riskStats(values){const sorted=[...values].sort((a,b)=>a-b),n=sorted.length,mean=sorted.reduce((s,v)=>s+v,0)/n,pos=(n-1)*.95,lo=Math.floor(pos),hi=Math.ceil(pos),var95=sorted[lo]+(sorted[hi]-sorted[lo])*(pos-lo),tail=sorted.slice(-Math.max(1,Math.ceil(n*.05)));return {mean,var95,tvar95:tail.reduce((s,v)=>s+v,0)/tail.length,max:sorted.at(-1)}}
export function annualExposure(a,n=10000){const base=eventExposure(a),rng=random(2026),sigma=Math.sqrt(Math.log(1+(a.severityCV/100)**2)),meanShift=-sigma*sigma/2,raw=[],seller=[],buyer=[];for(let y=0;y<n;y++){let total=0;for(let w=0;w<52;w++){if(rng()<a.frequency/100){const z=Math.sqrt(-2*Math.log(Math.max(rng(),1e-12)))*Math.cos(2*Math.PI*rng());total+=base.total*Math.exp(meanShift+sigma*z)}}raw.push(total);seller.push(total*(1-base.buyerRate));buyer.push(total*base.buyerRate)}return {baseline:riskStats(raw),shared:riskStats(seller),buyer:riskStats(buyer),theoreticalMean:52*a.frequency/100*base.total,n,seed:2026}}
