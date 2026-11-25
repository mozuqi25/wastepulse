export const REGIONS = {VIC:'Victoria',NSW:'New South Wales',QLD:'Queensland',WA:'Western Australia',SA:'South Australia',TAS:'Tasmania',ACT:'Australian Capital Territory',NT:'Northern Territory'};
export const PERIODS = [
 {id:'2026-11-23',label:'23–29 Nov 2026'},
 {id:'2026-11-30',label:'30 Nov–6 Dec 2026'},
 {id:'2026-12-07',label:'7–13 Dec 2026'},
 {id:'2026-12-14',label:'14–20 Dec 2026'}
];
export const CATEGORIES=['Flour & raw ingredients','Bread & rolls','Pastries & baked goods','Bakery by-products'];
export const ROLES=['Farmer / supplier','Manufacturer / packer','Distributor'];
export function seedData(){
 return {version:3,plans:[
 {id:'p1',business:'Southern Grain Supply',role:ROLES[0],region:'VIC',period:'2026-11-30',category:CATEGORIES[0],stream:'Edible',material:'Surplus bread flour',reason:'Order reduction',qty:1200,forecast:18000,ordered:16200,notices:[2,3,1],handling:'Sealed 20 kg bags. Contains wheat / gluten. Recipient to confirm specification and shelf life.'},
 {id:'p2',business:'Rise Bakery Manufacturing',role:ROLES[1],region:'VIC',period:'2026-11-30',category:CATEGORIES[1],stream:'Edible',material:'Packed bread production overrun',reason:'Production overrun',qty:800,forecast:12000,ordered:10800,notices:[1,2,1],handling:'Contains wheat / gluten. Available in agreed daily batches; recipient must confirm usable life.'},
 {id:'p3',business:'Metro Bakery Distribution',role:ROLES[2],region:'NSW',period:'2026-11-30',category:CATEGORIES[1],stream:'Edible',material:'Unsold packaged rolls',reason:'Unsold stock',qty:600,forecast:15000,ordered:14100,notices:[3,4],handling:'Intact packaging, contains wheat / gluten. Confirm daily collection and product dates.'},
 {id:'p4',business:'Coastal Bakehouse',role:ROLES[1],region:'QLD',period:'2026-11-30',category:CATEGORIES[2],stream:'Edible',material:'Unfilled pastry overrun',reason:'Production overrun',qty:350,forecast:5000,ordered:4500,notices:[2,2,4],handling:'Contains wheat, milk and egg. Storage conditions and recipient suitability need agreement.'},
 {id:'p5',business:'Rise Bakery Manufacturing',role:ROLES[1],region:'VIC',period:'2026-11-30',category:CATEGORIES[3],stream:'Inedible',material:'Separated bakery process residues',reason:'Process by-product',qty:450,forecast:12000,ordered:10800,notices:[1,2,1],handling:'Not for human consumption. Composition and contamination assessment required; no packaging.'},
 {id:'p6',business:'Western Grain Ingredients',role:ROLES[0],region:'WA',period:'2026-11-30',category:CATEGORIES[3],stream:'Inedible',material:'Separated milling residues',reason:'Process by-product',qty:300,forecast:20000,ordered:19400,notices:[5,7],handling:'Not food grade. Processor must assess suitability before accepting any material.'},
 {id:'p7',business:'Adelaide Bakery Logistics',role:ROLES[2],region:'SA',period:'2026-11-30',category:CATEGORIES[1],stream:'Edible',material:'Packed sliced bread',reason:'Order reduction',qty:250,forecast:6000,ordered:5700,notices:[2,5],handling:'Contains wheat / gluten. Confirm remaining usable life and transport conditions.'},
 {id:'p8',business:'Southern Grain Supply',role:ROLES[0],region:'VIC',period:'2026-12-07',category:CATEGORIES[0],stream:'Edible',material:'Projected surplus bread flour',reason:'Forecast uncertainty',qty:900,forecast:18000,ordered:16800,notices:[4,6],handling:'Forecast only. Sealed bags; quantity and availability subject to confirmation.'},
 {id:'p9',business:'Metro Bakery Distribution',role:ROLES[2],region:'NSW',period:'2026-12-07',category:CATEGORIES[1],stream:'Edible',material:'Projected bread surplus',reason:'Forecast uncertainty',qty:700,forecast:15000,ordered:14200,notices:[4,5],handling:'Forecast only. Product dates and collection schedule to be agreed.'}
 ],demands:[
 {id:'d1',organisation:'Victorian Bakery Co-op',region:'VIC',period:'2026-11-30',category:CATEGORIES[0],qty:1600,requirements:'Food-grade bread flour in sealed bags. Wheat / gluten accepted.'},
 {id:'d2',organisation:'Victorian Community Meals Network',region:'VIC',period:'2026-11-30',category:CATEGORIES[1],qty:1200,requirements:'Safe, packaged bread for meal services. Daily intake and allergen information required.'},
 {id:'d3',organisation:'NSW Food Access Network',region:'NSW',period:'2026-11-30',category:CATEGORIES[1],qty:400,requirements:'Safe packaged bread / rolls, confirmed usable life. Recipients confirm acceptance.'},
 {id:'d4',organisation:'Queensland Community Kitchens',region:'QLD',period:'2026-11-30',category:CATEGORIES[2],qty:250,requirements:'Unfilled pastries accepted subject to allergen, storage and date checks.'},
 {id:'d5',organisation:'South Australian Meal Partners',region:'SA',period:'2026-11-30',category:CATEGORIES[1],qty:450,requirements:'Safe sliced bread. Confirm delivery and remaining usable life.'},
 {id:'d6',organisation:'Tasmanian Food Network',region:'TAS',period:'2026-11-30',category:CATEGORIES[1],qty:120,requirements:'Packaged bread; intake agreement needed.'},
 {id:'d7',organisation:'ACT Community Meals',region:'ACT',period:'2026-11-30',category:CATEGORIES[1],qty:100,requirements:'Packaged bread for meal services; confirm dates and allergens.'},
 {id:'d8',organisation:'Territory Food Partners',region:'NT',period:'2026-11-30',category:CATEGORIES[1],qty:80,requirements:'Packaged bread with suitable storage and delivery arrangements.'},
 {id:'d9',organisation:'Victorian Bakery Co-op',region:'VIC',period:'2026-12-07',category:CATEGORIES[0],qty:1500,requirements:'Food-grade bread flour in sealed bags.'},
 {id:'d10',organisation:'NSW Food Access Network',region:'NSW',period:'2026-12-07',category:CATEGORIES[1],qty:500,requirements:'Food-safe packaged bread / rolls; acceptance checks required.'}
 ],partners:[
 {id:'r1',organisation:'Victorian Fermentation Works',region:'VIC',period:'2026-11-30',category:CATEGORIES[3],qty:600,pathway:'Industrial fermentation',requirements:'Assessed starch-rich residues for non-food fermentation only. Sample and contamination checks required.'},
 {id:'r2',organisation:'Western Soil Products',region:'WA',period:'2026-11-30',category:CATEGORIES[3],qty:400,pathway:'Fertiliser / compost',requirements:'Separated organic residues with packaging removed; processor acceptance required.'},
 {id:'r3',organisation:'Victorian Bio-ingredients Lab',region:'VIC',period:'2026-11-30',category:CATEGORIES[3],qty:100,pathway:'Cosmetic ingredients',requirements:'Exploratory pilot only. Ingredient composition, processing and safety assessment required.'}
 ],matches:[{id:'m1',planId:'p2',targetId:'d2',kind:'food',qty:200,status:'Planned',people:null}],
 outcomes:[
 {id:'o1',region:'VIC',period:'2026-11-23',category:CATEGORIES[1],stream:'Edible',qty:420,people:840,pathway:'Food redistribution'},
 {id:'o2',region:'NSW',period:'2026-11-23',category:CATEGORIES[1],stream:'Edible',qty:280,people:560,pathway:'Food redistribution'},
 {id:'o3',region:'VIC',period:'2026-11-23',category:CATEGORIES[3],stream:'Inedible',qty:300,people:0,pathway:'Industrial fermentation'},
 {id:'o4',region:'WA',period:'2026-11-23',category:CATEGORIES[3],stream:'Inedible',qty:180,people:0,pathway:'Fertiliser / compost'}
 ]};
}
