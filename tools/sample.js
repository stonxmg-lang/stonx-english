const fs=require("fs"),vm=require("vm");
let src=fs.readFileSync(__dirname+"/../dist/a1.js","utf8").replace(/page=\(location\.hash[^\n]*render\(\);\s*$/,"");
const el=()=>({classList:{add(){},remove(){},toggle(){}}});
const ctx={console,window:{},document:{getElementById:el,body:el()},location:{hash:""},history:{},localStorage:{getItem(){return null},setItem(){}},addEventListener(){},scrollTo(){}};ctx.window=ctx;
vm.createContext(ctx);vm.runInContext(src+";this.A=A1;this.D=unitData;",ctx);
const only=process.argv[2];const n=+process.argv[3]||8;
for(const u of ctx.A){if(only&&!only.split(",").includes(u.id))continue;const d=ctx.D(u);const s=d.prac.filter((_,i)=>i%Math.floor(d.prac.length/n)==0).slice(0,n);
 console.log("=== "+u.id);for(const q of s){const strip=x=>String(x).replace(/<[^>]+>/g,"");
  if(q.t=="order")console.log(` [${q.t}] ${q.words.join("/")} => ${q.answer}`);else console.log(` [${q.t}] ${strip(q.prompt)} | ${q.opts.map((o,i)=>(i==q.a?"*":"")+strip(o)).join(" | ")}`)}}
