const fs=require("fs"),vm=require("vm");
let src=fs.readFileSync(__dirname+"/../dist/a1.js","utf8").replace(/page=\(location\.hash[^\n]*render\(\);\s*$/,"");
const el=()=>({classList:{add(){},remove(){},toggle(){}},innerHTML:"",textContent:""});
const ctx={console,Math,Date,JSON,Set,Map,Array,Object,String,Number,RegExp,Error,parseInt,isNaN,
 window:{addEventListener(){}},document:{getElementById:el,body:el()},location:{hash:""},history:{},localStorage:{getItem(){return null},setItem(){}},addEventListener(){},scrollTo(){}};
ctx.window=ctx;vm.createContext(ctx);vm.runInContext(src+"\n;this.__A1=A1;this.__unitData=unitData;this.__okQ=okQ;this.__unitTest=unitTest;this.__finalExam=()=>0;",ctx);
let bad=0,tot=0;
for(const u of ctx.__A1){let d;try{d=ctx.__unitData(u)}catch(e){console.log(u.id,"ERR",e.message);bad++;continue}
 const prob=[];for(const q of d.prac.concat(d.lis)){tot++;if(!ctx.__okQ(q))prob.push(q.key);if(/undefined|NaN|null/.test(JSON.stringify([q.prompt,q.opts,q.en,q.words,q.exp,q.hint].filter(x=>x!==undefined))))prob.push("UNDEF "+q.key)}
 let t;try{t=ctx.__unitTest(u)}catch(e){prob.push("test ERR "+e.message)}
 const types={};d.prac.forEach(q=>types[q.t]=(types[q.t]||0)+1);
 console.log(u.id.padEnd(4),"prac",String(d.prac.length).padStart(3),"lis",String(d.lis.length).padStart(3),"speak",String(d.speak.length).padStart(3),"words",String(u.words.length).padStart(3),"test",t&&t.length,JSON.stringify(types),prob.length?"PROBLEMS "+prob.slice(0,3).join(" | "):"");
 if(prob.length)bad++;}
console.log("units",ctx.__A1.length,"questions",tot,"bad units",bad);
