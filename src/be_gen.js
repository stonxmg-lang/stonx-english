
function R(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
let rnd=R(20261117);
const pick=a=>a[Math.floor(rnd()*a.length)];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const PRON=[
{en:"I",be:"am",ar:"أنا",neg:"لستُ",g:"m",pr:"I",kind:"p"},
{en:"You",be:"are",ar:"أنتَ",neg:"لستَ",g:"m",pr:"You",kind:"p"},
{en:"He",be:"is",ar:"هو",neg:"ليس",g:"m",pr:"He",kind:"p"},
{en:"She",be:"is",ar:"هي",neg:"ليست",g:"f",pr:"She",kind:"p"},
{en:"We",be:"are",ar:"نحن",neg:"لسنا",g:"p",pr:"We",kind:"p"},
{en:"They",be:"are",ar:"هم",neg:"ليسوا",g:"p",pr:"They",kind:"p"}];
const IT={en:"It",be:"is",ar:"إنه",neg:"ليس",g:"m",pr:"It",kind:"it"};
const NAMES=[["Ali","علي","m"],["Omar","عمر","m"],["Ahmed","أحمد","m"],["Yusuf","يوسف","m"],["Adam","آدم","m"],["John","جون","m"],["Sara","سارة","f"],["Lina","لينا","f"],["Maryam","مريم","f"],["Emma","إيما","f"],["Huda","هدى","f"],["Noor","نور","f"]]
.map(([en,ar,g])=>({en,be:"is",ar,neg:g=="m"?"ليس":"ليست",g,pr:g=="m"?"He":"She",kind:"n"}));
const NPS=[["My father","أبي","m"],["My mother","أمي","f"],["My brother","أخي","m"],["My sister","أختي","f"],["The teacher","المعلم","m"],["My friend","صديقي","m"],["My cousin","ابن عمي","m"],["Our teacher","معلمتنا","f"]]
.map(([en,ar,g])=>({en,be:"is",ar,neg:g=="m"?"ليس":"ليست",g,pr:g=="m"?"He":"She",kind:"np"}));
const NPP=[["My friends","أصدقائي"],["The students","الطلاب"],["My brothers","إخوتي"],["My classmates","زملائي"],["The doctors","الأطباء"],["Your parents","والداك"]]
.map(([en,ar])=>({en,be:"are",ar:en=="Your parents"?null:ar,neg:"ليسوا",g:"p",pr:"They",kind:"npp"}));
const PAIRS=[["Ali and Sara"],["Omar and Lina"],["Emma and John"],["You and I"],["My mother and I"],["Adam and Noor"]]
.map(([en])=>({en,be:"are",ar:null,neg:null,g:"p",pr:en.endsWith(" I")?"We":"They",kind:"pair"}));
const PERSON_SUBJ=[...PRON,...NAMES,...NPS,...NPP];
function reg(m){return{ar:{m,f:m+"ة",p:m+"ون"},acc:{m:m+"ًا",f:m+"ة",p:m+"ين"}}}
function irr(m,p,pacc){return{ar:{m,f:m+"ة",p},acc:{m:m+"ًا",f:m+"ة",p:pacc}}}
const JOBS=[
{k:"student",en:{s:"a student",p:"students"},...irr("طالب","طلاب","طلابًا")},
{k:"teacher",en:{s:"a teacher",p:"teachers"},...reg("معلم")},
{k:"doctor",en:{s:"a doctor",p:"doctors"},...irr("طبيب","أطباء","أطباء")},
{k:"engineer",en:{s:"an engineer",p:"engineers"},...reg("مهندس")},
{k:"nurse",en:{s:"a nurse",p:"nurses"},...reg("ممرض")},
{k:"driver",en:{s:"a driver",p:"drivers"},ar:{m:"سائق",f:"سائقة",p:"سائقون"},acc:{m:"سائقًا",f:"سائقة",p:"سائقين"}}];
const ADJ=[
{k:"happy",en:{s:"happy"},...irr("سعيد","سعداء","سعداء")},
{k:"tired",en:{s:"tired"},...reg("متعب")},
{k:"hungry",en:{s:"hungry"},...reg("جائع")},
{k:"busy",en:{s:"busy"},...reg("مشغول")},
{k:"late",en:{s:"late"},...reg("متأخر")},
{k:"ready",en:{s:"ready"},...reg("مستعد")},
{k:"sick",en:{s:"sick"},...irr("مريض","مرضى","مرضى")},
{k:"sad",en:{s:"sad"},...irr("حزين","حزانى","حزانى")},
{k:"tall",en:{s:"tall"},...irr("طويل","طوال","طوالًا")},
{k:"angry",en:{s:"angry"},...irr("غاضب","غاضبون","غاضبين")}];
const PLACE=[["at home","في البيت"],["at school","في المدرسة"],["in class","في الصف"],["in Istanbul","في إسطنبول"],["at the university","في الجامعة"],["in the library","في المكتبة"],["at work","في العمل"],["in the car","في السيارة"]]
.map(([e,a])=>({k:e,en:{s:e},ar:{m:a,f:a,p:a},acc:{m:a,f:a,p:a}}));
const NAT=[
["Egypt","Egyptian","مصر","مصري","مصريون","مصريين"],["Turkey","Turkish","تركيا","تركي","أتراك","أتراكًا"],["Syria","Syrian","سوريا","سوري","سوريون","سوريين"],
["Iraq","Iraqi","العراق","عراقي","عراقيون","عراقيين"],["Saudi Arabia","Saudi","السعودية","سعودي","سعوديون","سعوديين"],["Oman","Omani","عُمان","عماني","عمانيون","عمانيين"],
["Jordan","Jordanian","الأردن","أردني","أردنيون","أردنيين"],["Lebanon","Lebanese","لبنان","لبناني","لبنانيون","لبنانيين"],["Morocco","Moroccan","المغرب","مغربي","مغاربة","مغاربة"],
["Iran","Iranian","إيران","إيراني","إيرانيون","إيرانيين"],["the USA","American","أمريكا","أمريكي","أمريكيون","أمريكيين"],["Japan","Japanese","اليابان","ياباني","يابانيون","يابانيين"],
["China","Chinese","الصين","صيني","صينيون","صينيين"],["Germany","German","ألمانيا","ألماني","ألمان","ألمانًا"],["France","French","فرنسا","فرنسي","فرنسيون","فرنسيين"],
["Italy","Italian","إيطاليا","إيطالي","إيطاليون","إيطاليين"],["Spain","Spanish","إسبانيا","إسباني","إسبان","إسبانًا"],["the UK","British","بريطانيا","بريطاني","بريطانيون","بريطانيين"],
["Russia","Russian","روسيا","روسي","روس","روسًا"],["India","Indian","الهند","هندي","هنود","هنودًا"],["Canada","Canadian","كندا","كندي","كنديون","كنديين"],
["Brazil","Brazilian","البرازيل","برازيلي","برازيليون","برازيليين"],["Pakistan","Pakistani","باكستان","باكستاني","باكستانيون","باكستانيين"],["Algeria","Algerian","الجزائر","جزائري","جزائريون","جزائريين"],
["Tunisia","Tunisian","تونس","تونسي","تونسيون","تونسيين"],["Libya","Libyan","ليبيا","ليبي","ليبيون","ليبيين"],["Sudan","Sudanese","السودان","سوداني","سودانيون","سودانيين"],
["Yemen","Yemeni","اليمن","يمني","يمنيون","يمنيين"],["Kuwait","Kuwaiti","الكويت","كويتي","كويتيون","كويتيين"],["Qatar","Qatari","قطر","قطري","قطريون","قطريين"],
["Palestine","Palestinian","فلسطين","فلسطيني","فلسطينيون","فلسطينيين"],["Mexico","Mexican","المكسيك","مكسيكي","مكسيكيون","مكسيكيين"],["Greece","Greek","اليونان","يوناني","يونانيون","يونانيين"],
["Afghanistan","Afghan","أفغانستان","أفغاني","أفغان","أفغانًا"],["Indonesia","Indonesian","إندونيسيا","إندونيسي","إندونيسيون","إندونيسيين"],["Malaysia","Malaysian","ماليزيا","ماليزي","ماليزيون","ماليزيين"]];
const FROM=NAT.map(n=>({k:"from "+n[0],en:{s:"from "+n[0]},ar:{m:"من "+n[2],f:"من "+n[2],p:"من "+n[2]},acc:{m:"من "+n[2],f:"من "+n[2],p:"من "+n[2]},country:n[0],nat:n[1]}));
const NATC=NAT.map(n=>({k:n[1],en:{s:n[1]},ar:{m:n[3],f:n[3]+"ة",p:n[4]},acc:{m:n[3]+"ًا",f:n[3]+"ة",p:n[5]},country:n[0],nat:n[1]}));
const ITC=[["big","كبير"],["small","صغير"],["cold","بارد"],["hot","حار"],["new","جديد"],["old","قديم"],["easy","سهل"],["difficult","صعب"],["cheap","رخيص"],["open","مفتوح"],["closed","مغلق"],["clean","نظيف"]]
.map(([e,a])=>({k:e,en:{s:e},ar:{m:a,f:a,p:a},acc:{m:a+"ًا",f:a+"ًا",p:a+"ًا"},it:true}));
const PERSON_COMP=[...JOBS,...ADJ,...PLACE,...FROM,...NATC];
const CONTR={I:"I'm",You:"You're",He:"He's",She:"She's",It:"It's",We:"We're",They:"They're"};
const NEGC={am:"'m not",is:" isn't",are:" aren't"};
function compEn(s,c){return s.g=="p"&&c.en.p?c.en.p:c.en.s}
function sent(s,c,neg=false,form="full",dot=true){
let head;
if(form=="short"&&s.kind=="p"||form=="short"&&s.kind=="it"){
if(!neg)head=CONTR[s.en];
else head=s.be=="am"?"I'm not":s.en+NEGC[s.be];
}else if(form=="short"&&neg){head=s.be=="am"?"I'm not":s.en+NEGC[s.be]}
else head=s.en+" "+s.be+(neg?" not":"");
return head+" "+compEn(s,c)+(dot?".":"")
}
function arS(s,c,neg){if(!s.ar||!c.ar)return null;const g=s.g;return neg?`${s.ar} ${s.neg} ${c.acc[g]}`:`${s.ar} ${c.ar[g]}`}
function compatible(s,c){
if(c.it)return s.kind=="it";
if(s.kind=="it")return false;
if(s.kind=="npp"&&(s.en.includes("students")&&c.k=="student"||s.en.includes("doctors")&&c.k=="doctor"))return false;
if(s.en=="The teacher"&&c.k=="teacher"||s.en=="Our teacher"&&c.k=="teacher")return false;
return true;
}
function pickSC(opts={}){
const subs=opts.subs||PERSON_SUBJ, comps=opts.comps||PERSON_COMP;
for(let i=0;i<50;i++){
let s,c;
if(opts.allowIt&&rnd()<.1){s=IT;c=pick(ITC)}else{s=pick(subs);c=pick(comps)}
if(!compatible(s,c))continue;
if(opts.needAr&&!arS(s,c,false))continue;
return [s,c];
}
return [PRON[2],ADJ[0]];
}
const WRONGBE={am:["is","are"],is:["am","are"],are:["am","is"]};
const EXP={
am:"I → am",
is:"He / She / It / one person → is",
are:"You / We / They / more than one → are"};
const EXPAR={am:"مع I نستخدم am",is:"مع المفرد (هو، هي، شخص أو شيء واحد) نستخدم is",are:"مع you و we و they والجمع نستخدم are"};
const NEGEXP="Negative: am / is / are + not";
const NEGAR="النفي: نضع not بعد am / is / are مباشرة";
const T={};
T.fill=(neg=false,subs)=>{const[s,c]=pickSC({allowIt:!subs,subs});const tail=" "+(neg?"not ":"")+compEn(s,c)+".";
return{t:"fill",label:"Choose am, is or are",color:"var(--blue)",prompt:`${s.en} <span class="blank">___</span>${tail}`,opts:["am","is","are"],a:["am","is","are"].indexOf(s.be),grid:3,en:sent(s,c,neg),ar:arS(s,c,neg),exp:EXP[s.be],expAr:EXPAR[s.be],key:"fill|"+s.en+tail}};
T.fillPair=()=>{const s=pick(PAIRS);const c=pick(PERSON_COMP.filter(x=>!x.it));const neg=rnd()<.3;const tail=" "+(neg?"not ":"")+compEn(s,c)+".";
return{t:"fill",label:"Choose am, is or are",color:"var(--blue)",prompt:`${s.en} <span class="blank">___</span>${tail}`,opts:["am","is","are"],a:2,grid:3,en:sent(s,c,neg),ar:null,exp:"Two people = they / we → are",expAr:"شخصان أو أكثر ← are",key:"fillp|"+s.en+tail}};
T.subj=()=>{const be=pick(["am","is","is","are","are"]);
let correct,dis;
if(be=="am"){correct=PRON[0];dis=[PRON[2],PRON[3],PRON[1],PRON[5]]}
else if(be=="is"){correct=pick([PRON[2],PRON[3]]);dis=[PRON[0],PRON[1],PRON[4],PRON[5]]}
else{correct=pick([PRON[1],PRON[4],PRON[5]]);dis=[PRON[0],PRON[2],PRON[3]]}
let c;do{c=pick(PERSON_COMP)}while(!compatible(correct,c));
const neg=rnd()<.35;const tail=" "+be+(neg?" not ":" ")+compEn(correct,c)+".";
const o=shuf([correct.en,...shuf(dis).slice(0,3).map(x=>x.en)]);
return{t:"subj",label:"Choose the subject",color:"var(--purple)",prompt:`<span class="blank">___</span>${tail}`,opts:o,a:o.indexOf(correct.en),grid:2,en:correct.en+tail,ar:arS(correct,c,neg),exp:EXP[be],expAr:EXPAR[be],key:"subj|"+correct.en+tail}};
T.pron=()=>{const s=pick([...NAMES,...NPS,...NPP,...PAIRS]);let c;do{c=pick(PERSON_COMP)}while(!compatible(s,c));const neg=rnd()<.35;
const tail=" "+s.be+(neg?" not ":" ")+compEn(s,c)+".";const o=s.pr=="We"?["He","She","We","They"]:["He","She","It","They"];
return{t:"pron",label:"Change the subject to a pronoun",color:"var(--purple)",prompt:`${sent(s,c,neg)}<br><span style="color:var(--mu);font-size:20px">→</span> <span class="blank">___</span>${tail}`,opts:o,a:o.indexOf(s.pr),grid:2,en:s.pr+tail,ar:arS(PRON.find(x=>x.en==s.pr),c,neg),exp:`${s.en} = ${s.pr}`,expAr:s.pr=="They"?"أكثر من شخص ← They":s.pr=="We"?"أنا + شخص آخر ← We":s.pr=="He"?"ذكر واحد ← He":"أنثى واحدة ← She",key:"pron|"+s.en+tail}};
function wrongNeg(s,c){const sub=s.en,comp=compEn(s,c),w=[];
w.push(`${sub} not ${s.be} ${comp}.`);
for(const b of WRONGBE[s.be])w.push(`${sub} ${b} not ${comp}.`);
w.push(`${sub} ${s.be} no ${comp}.`);
w.push(`${sub} don't ${comp}.`);
if(s.be=="am")w.push(`I amn't ${comp}.`);
else w.push(`${sub} ${s.be}n't not ${comp}.`);
return w}
function wrongPos(s,c){const sub=s.en,comp=compEn(s,c);return[...WRONGBE[s.be].map(b=>`${sub} ${b} ${comp}.`),`${sub} ${comp}.`,`${sub} be ${comp}.`]}
T.toNeg=()=>{const[s,c]=pickSC({allowIt:true});const correct=sent(s,c,true,rnd()<.5?"full":"short");const o=shuf([correct,...shuf(wrongNeg(s,c)).slice(0,3)]);
return{t:"toNeg",label:"Make it negative",color:"var(--red)",prompt:`${sent(s,c,false)}`,hint:"Which is the correct negative?",opts:o,a:o.indexOf(correct),en:correct,ar:arS(s,c,true),exp:NEGEXP,expAr:NEGAR,key:"neg|"+correct}};
T.toPos=()=>{const[s,c]=pickSC({allowIt:true});const correct=sent(s,c,false);const o=shuf([correct,...shuf(wrongPos(s,c)).slice(0,3)]);
return{t:"toPos",label:"Make it positive",color:"var(--green)",prompt:`${sent(s,c,true,rnd()<.5?"full":"short")}`,hint:"Which is the correct positive?",opts:o,a:o.indexOf(correct),en:correct,ar:arS(s,c,false),exp:"Positive: remove not → "+s.en+" "+s.be,expAr:"الإثبات: نحذف not",key:"pos|"+correct}};
T.short=()=>{const s=pick([...PRON,IT]);const neg=rnd()<.55;let correct,w;
if(!neg){correct=CONTR[s.en];w=["'m","'s","'re"].map(x=>s.en+x).filter(x=>x!=correct);w.push(s.en+"'be")}
else if(s.be=="am"){correct="I'm not";w=["I amn't","I'm no","I not'm","I aren't"]}
else{correct=s.en+NEGC[s.be];w=[s.en+(s.be=="is"?" aren't":" isn't"),s.en+" not's",s.en+" n't",s.en+" "+s.be+"'nt"]}
const full=s.en+" "+s.be+(neg?" not":"");const o=shuf([correct,...shuf(w).slice(0,3)]);
return{t:"short",label:"Choose the short form",color:"var(--gold)",prompt:full+' = <span class="blank">?</span>',opts:o,a:o.indexOf(correct),grid:2,en:full+". "+correct+".",ar:null,exp:neg?(s.be=="am"?"I am not = I'm not (there is no amn't)":`${s.be} not = ${s.be}n't`):`${full} = ${correct}`,expAr:neg?"الاختصار في النفي":"الاختصار في الإثبات",key:"short|"+full}};
T.shortSent=()=>{const s=pick(PRON);const c=pick(PERSON_COMP.filter(x=>compatible(s,x)));const neg=rnd()<.6;const correct=sent(s,c,neg,"short");
const comp=compEn(s,c);const w=neg?[s.be=="am"?`I amn't ${comp}.`:`${s.en}${s.be=="is"?" aren't":" isn't"} ${comp}.`,`${s.en} not's ${comp}.`,`${s.en}'s no ${comp}.`.replace("I's","I'm"),`${s.en} n't ${comp}.`]
:["'m","'s","'re"].map(x=>`${s.en}${x} ${comp}.`).filter(x=>x!=correct);
const o=shuf([correct,...shuf(w.filter(x=>x!=correct)).slice(0,3)]);
return{t:"shortSent",label:"Choose the correct short form",color:"var(--gold)",prompt:sent(s,c,neg,"full"),hint:"Same meaning — short form:",opts:o,a:o.indexOf(correct),en:correct,ar:arS(s,c,neg),exp:neg?"isn't = is not · aren't = are not · I'm not":"I'm · you're · he's · she's · we're · they're",expAr:"نفس المعنى بالاختصار",key:"ss|"+correct}};
function badVariants(s,c,neg){const comp=compEn(s,c),sub=s.en,v=[];
for(const b of WRONGBE[s.be])v.push(`${sub} ${b}${neg?" not":""} ${comp}.`);
v.push(neg?`${sub} not ${s.be} ${comp}.`:`${sub} ${comp}.`);
v.push(neg?`${sub} ${s.be} no ${comp}.`:`${sub} ${comp} ${s.be}.`);
return v}
T.correct=(neg)=>{if(neg==null)neg=rnd()<.5;const[s,c]=pickSC({allowIt:true});const ok=sent(s,c,neg);const o=shuf([ok,...shuf(badVariants(s,c,neg)).slice(0,3)]);
return{t:"correct",label:"Choose the correct sentence",color:"var(--green)",prompt:"Which sentence is correct?",opts:o,a:o.indexOf(ok),en:ok,ar:arS(s,c,neg),exp:EXP[s.be]+(neg?" · "+NEGEXP:""),expAr:EXPAR[s.be],key:"cor|"+ok}};
T.wrong=()=>{const neg=rnd()<.5;const items=[];const used=new Set();let bad,badS;
while(items.length<3){const[s,c]=pickSC({allowIt:true});const x=sent(s,c,neg);if(used.has(x))continue;used.add(x);items.push(x)}
{const[s,c]=pickSC();badS=s;bad=pick(badVariants(s,c,neg));}
const o=shuf([...items,bad]);
return{t:"wrong",label:"Find the mistake",color:"var(--rose)",prompt:"Which sentence is <b style='color:var(--red)'>WRONG</b>?",opts:o,a:o.indexOf(bad),en:bad,ar:null,exp:"✗ "+bad+" — "+EXP[badS.be]+(neg?" · "+NEGEXP:""),expAr:EXPAR[badS.be],key:"wr|"+bad+o.join("")}};
T.tf=(neg)=>{if(neg==null)neg=rnd()<.5;const[s,c]=pickSC({allowIt:true});const good=rnd()<.5;const ok=sent(s,c,neg);const x=good?ok:pick(badVariants(s,c,neg));
return{t:"tf",label:"Correct or wrong?",color:"var(--rose)",prompt:x,opts:["✓ Correct","✗ Wrong"],a:good?0:1,grid:2,en:ok,ar:arS(s,c,neg),exp:good?"✓ "+EXP[s.be]:"Correct: "+ok,expAr:EXPAR[s.be],key:"tf|"+x}};
T.nat=()=>{const n=pick(NAT);const s=pick([...NAMES,...NPS,...NPP,...PRON.slice(2)]);const subLine=`${s.en} ${s.be} from ${n[0]}.`;
const pr=s.kind=="p"?s.en:s.pr;const prS=[...PRON,IT].find(p=>p.en==pr);
const others=shuf(NAT.filter(x=>x!=n)).slice(0,2).map(x=>x[1]);const o=shuf([n[1],n[0].replace("the ",""),...others]);
const c=NATC.find(x=>x.nat==n[1]);
return{t:"nat",label:"Nationality",color:"var(--green)",prompt:`${subLine}<br>${pr} ${prS.be} <span class="blank">___</span>.`,opts:o,a:o.indexOf(n[1]),grid:2,en:`${pr} ${prS.be} ${n[1]}.`,ar:arS(prS,c,false),exp:`${n[0]} → ${n[1]} (country → nationality)`,expAr:"بعد am/is/are نضع الجنسية، وبعد from نضع اسم الدولة",key:"nat|"+s.en+n[0]}};
T.country=()=>{const n=pick(NAT);const s=pick([...NAMES,...NPS,...PRON.slice(2)]);const pr=s.kind=="p"?s.en:s.pr;const prS=PRON.find(p=>p.en==pr);
const others=shuf(NAT.filter(x=>x!=n)).slice(0,2).map(x=>x[0]);const o=shuf([n[0],n[1],...others]);const c=FROM.find(x=>x.country==n[0]);
return{t:"country",label:"Country",color:"var(--blue)",prompt:`${s.en} ${s.be} ${n[1]}.<br>${pr} ${prS.be} from <span class="blank">___</span>.`,opts:o,a:o.indexOf(n[0]),grid:2,en:`${pr} ${prS.be} from ${n[0]}.`,ar:arS(s,c,false),exp:`from + country: from ${n[0]}`,expAr:"بعد from نضع اسم الدولة",key:"cty|"+s.en+n[0]}};
T.ar2en=()=>{const[s,c]=pickSC({needAr:true,subs:[...PRON,...NAMES,...NPS,...NPP.filter(x=>x.ar)]});const neg=rnd()<.5;const ok=sent(s,c,neg);
const set=new Set([ok]);const w=[];const add=x=>{if(!set.has(x)){set.add(x);w.push(x)}};
add(sent(s,c,!neg));add(pick(badVariants(s,c,neg)));
const other=pick(PRON.filter(p=>p.be!=s.be&&p.g!=s.g||p.en!=s.en&&p.be!=s.be));if(compatible(other,c))add(sent(other,c,neg));
while(w.length<3){const[s2,c2]=pickSC();add(sent(s2,c2,neg))}
const o=shuf([ok,...w.slice(0,3)]);
return{t:"ar2en",label:"Translate to English",color:"var(--purple)",prompt:arS(s,c,neg),arq:1,opts:o,a:o.indexOf(ok),en:ok,ar:arS(s,c,neg),exp:EXP[s.be]+(neg?" · "+NEGEXP:""),expAr:EXPAR[s.be],key:"a2e|"+ok}};
T.en2ar=()=>{const[s,c]=pickSC({needAr:true,subs:[...PRON,...NAMES,...NPS,...NPP.filter(x=>x.ar)]});const neg=rnd()<.5;const ok=arS(s,c,neg);
const set=new Set([ok]);const w=[];const add=x=>{if(x&&!set.has(x)){set.add(x);w.push(x)}};
add(arS(s,c,!neg));for(let i=0;i<20&&w.length<3;i++){const s2=pick(PRON);if(compatible(s2,c))add(arS(s2,c,neg));if(rnd()<.4){const c2=pick(PERSON_COMP);if(compatible(s,c2))add(arS(s,c2,neg))}}
const o=shuf([ok,...w.slice(0,3)]);
return{t:"en2ar",label:"Choose the meaning",color:"var(--purple)",prompt:sent(s,c,neg),opts:o,a:o.indexOf(ok),arOpts:1,en:sent(s,c,neg),ar:ok,exp:EXP[s.be]+(neg?" · "+NEGEXP:""),expAr:EXPAR[s.be],key:"e2a|"+ok}};
T.order=(neg)=>{if(neg==null)neg=rnd()<.5;const[s,c]=pickSC({allowIt:true,subs:[...PERSON_SUBJ,...PAIRS]});const ok=sent(s,c,neg,"full",false);
return{t:"order",label:"Put the words in order",color:"var(--gold)",words:ok.split(" "),answer:ok,en:ok+".",ar:arS(s,c,neg),exp:neg?"Subject + am/is/are + not + …":"Subject + am/is/are + …",expAr:neg?"الفاعل + am/is/are + not + الباقي":"الفاعل + am/is/are + الباقي",key:"ord|"+ok}};

/* ================= NEW GRAMMAR UNITS ================= */
const BeCap={am:"Am",is:"Is",are:"Are"};
const lowS=s=>s.kind=="p"&&s.en!="I"?s.en.toLowerCase():(s.kind=="np"||s.kind=="npp")?s.en[0].toLowerCase()+s.en.slice(1):s.en;
const QSUBJ=[...PRON,...NAMES,...NPS,...NPP];
function qS(s,c){return `${BeCap[s.be]} ${lowS(s)} ${compEn(s,c)}?`}
function arQ(s,c){const a=arS(s,c,false);return a?"هل "+a+"؟":null}
const uniq3=(correct,arr)=>{const out=[],seen=new Set([correct]);for(const x of shuf(arr)){if(!seen.has(x)){seen.add(x);out.push(x)}if(out.length==3)break}return out};
function mcq(o){const opts=shuf([o.correct,...uniq3(o.correct,o.wrong)]);return Object.assign({opts,a:opts.indexOf(o.correct)},o)}
const QEXP="Question: am / is / are + subject + … ?",QEXPAR="السؤال: نقدّم am / is / are قبل الفاعل";
// ---- questions
T.qMake=()=>{const[s,c]=pickSC({subs:QSUBJ});const comp=compEn(s,c),cor=qS(s,c);
 return mcq({t:"qMake",label:"Make a question",color:"var(--blue)",prompt:sent(s,c,false),hint:"Which is the correct question?",correct:cor,wrong:[sent(s,c,false).replace(/\.$/,"?"),`${BeCap[s.be]} ${lowS(s)} ${s.be} ${comp}?`,`${BeCap[WRONGBE[s.be][0]]} ${lowS(s)} ${comp}?`,`${BeCap[WRONGBE[s.be][1]]} ${lowS(s)} ${comp}?`,`Does ${lowS(s)} ${comp}?`,`${s.en} ${comp} ${s.be}?`],en:cor,ar:arQ(s,c),exp:QEXP,expAr:QEXPAR,key:"qm|"+cor})};
T.qFill=()=>{const[s,c]=pickSC({subs:QSUBJ});const tail=` ${lowS(s)} ${compEn(s,c)}?`;
 return{t:"qFill",label:"Complete the question",color:"var(--blue)",prompt:`<span class="blank">___</span>${tail}`,opts:["Am","Is","Are"],a:["am","is","are"].indexOf(s.be),grid:3,en:qS(s,c),ar:arQ(s,c),exp:EXP[s.be],expAr:EXPAR[s.be],key:"qf|"+tail}};
T.qOrder=()=>{const[s,c]=pickSC({subs:QSUBJ});const q=qS(s,c);
 return{t:"order",label:"Put the question in order",color:"var(--gold)",words:q.split(" "),answer:q,en:q,ar:arQ(s,c),exp:QEXP,expAr:QEXPAR,key:"qo|"+q}};
T.qCorrect=()=>{const x=T.qMake();x.t="qCorrect";x.label="Choose the correct question";x.prompt="Which question is correct?";x.hint="";x.key="qc"+x.key;return x};
// ---- short answers
function ansP(s){if(s.en=="I")return["you","are"];if(s.en=="You")return["I","am"];const p=s.kind=="p"?s.en:s.pr;return[p.toLowerCase(),p=="They"?"are":"is"]}
const capI=p=>p=="i"?"I":p;
T.shortAns=(past=false)=>{let s,c;do{[s,c]=pickSC({subs:QSUBJ,comps:past?PCOMP():undefined})}while(s.en=="We");const yes=rnd()<.5;let[p,b]=ansP(s);
 if(past)b=b=="are"?"were":"was";const P=capI(p);const sb=past?(s.be=="are"?"were":"was"):s.be;
 const q=past?`${cap(sb)} ${lowS(s)} ${compEn(s,c)} yesterday?`:qS(s,c);
 const neg=b=="am"?"'m not":" "+b+"n't";
 const cor=yes?`Yes, ${P} ${b}.`:`No, ${P}${neg}.`;
 const otherP=p=="he"?"she":p=="she"?"he":p=="they"?"he":p=="I"?"you":"I";const ob=otherP=="they"||otherP=="you"?(past?"were":"are"):otherP=="I"?(past?"was":"am"):(past?"was":"is");
 const wrong=yes?[`Yes, ${P}${b=="am"?"'m":b=="is"?"'s":b=="are"?"'re":" "+b+" yes"}.`,`Yes, ${capI(otherP)} ${ob}.`,`Yes, ${P} ${past?(b=="was"?"were":"was"):WRONGBE[b][0]}.`,`Yes, ${P} do.`,`Yes, ${b} ${P}.`]
  :[`No, ${P} not.`,`No, ${P} don't.`,`No, ${capI(otherP)}${otherP=="I"?(past?" wasn't":"'m not"):" "+ob+"n't"}.`,b=="am"?"No, I amn't.":`No, ${P} ${b} no.`,`No, ${b}n't ${P}.`];
 return mcq({t:"shortAns",label:past?"Short answer (past)":"Short answer",color:"var(--green)",prompt:`${q}<br><span class="mk ${yes?"mk-y":"mk-n"}">${yes?"✓ Yes":"✗ No"}</span>`,correct:cor,wrong,en:q+" "+cor,ar:(yes?"نعم":"لا"),exp:yes?"Yes + pronoun + "+b+" (no short form after Yes)":"No + pronoun + "+(b=="am"?"'m not":b+"n't"),expAr:"في الإجابة نستخدم الضمير (he / she / it / they) ولا نختصر بعد Yes",key:"sa|"+q+yes})};
function cap(x){return x[0].toUpperCase()+x.slice(1)}
// ---- wh questions
const POSS={I:"my",You:"your",He:"his",She:"her",We:"our",They:"their"};
function possOf(s){return s.kind=="p"?POSS[s.en]:s.kind=="n"?s.en+"'s":s.kind=="np"||s.kind=="npp"?lowS(s).replace(/^(my|the|our|your) /,m=>m)+(s.kind=="npp"?"'":"'s"):"their"}
function whSubj(){return pick([PRON[1],PRON[2],PRON[3],PRON[5],...NAMES,...NAMES,NPS[0],NPS[1],NPS[2],NPS[3]])}
function ansHead(s){if(s.en=="You")return"I am";if(s.en=="I")return"You are";const p=s.kind=="p"?s.en:s.pr;return p+" "+(p=="They"?"are":"is")}
const EVENTS=[["lesson","الدرس"],["exam","الامتحان"],["party","الحفلة"],["film","الفيلم"],["meeting","الاجتماع"],["match","المباراة"]];
const PRICES=[["coffee","القهوة"],["ticket","التذكرة"],["book","الكتاب"],["tea","الشاي"],["sandwich","الساندويتش"],["T-shirt","القميص"]];
const WH={
 from:()=>{const s=whSubj(),n=pick(NAT);return{wh:"Where",q:`Where ${s.be} ${lowS(s)} from?`,a:`${ansHead(s)} from ${n[0]}.`,cat:"from"}},
 old:()=>{const s=whSubj(),n=5+Math.floor(rnd()*70);return{wh:"How old",q:`How old ${s.be} ${lowS(s)}?`,a:`${ansHead(s)} ${n}.`,cat:"old"}},
 job:()=>{const s=pick([PRON[1],PRON[2],PRON[3],...NAMES]);const j=pick(V_JOBS)[0];return{wh:"What",q:`What is ${possOf(s)} job?`,a:`${ansHead(s)} ${AN(j)} ${j}.`,cat:"job"}},
 place:()=>{const s=whSubj(),pl=pick(V_PLACE);return{wh:"Where",q:`Where ${s.be} ${lowS(s)}?`,a:`${ansHead(s)} ${pl[2]} ${pl[0]}.`,cat:"place"}},
 how:()=>{const s=pick([PRON[1],PRON[2],PRON[3],PRON[5],...NAMES]);const f=pick(["fine","tired","happy","sick","OK","very well"]);return{wh:"How",q:`How ${s.be} ${lowS(s)}?`,a:`${ansHead(s)} ${f}.`,cat:"how"}},
 color:()=>{const o=pick(V_OBJ)[0],c=pick(V_COLOR)[0],s=pick([PRON[1],PRON[2],PRON[3],...NAMES]);return{wh:"What color",q:`What color is ${possOf(s)} ${o}?`,a:`It's ${c}.`,cat:"color"}},
 time:()=>{const e=pick(EVENTS)[0],h=1+Math.floor(rnd()*12);return{wh:"What time",q:`What time is the ${e}?`,a:`It's at ${h} o'clock.`,cat:"time"}},
 when:()=>{const e=pick(EVENTS)[0],d=pick(V_DAYS)[0];return{wh:"When",q:`When is the ${e}?`,a:`It's on ${d}.`,cat:"when"}},
 much:()=>{const p=pick(PRICES)[0],n=5*(1+Math.floor(rnd()*40));return{wh:"How much",q:`How much is the ${p}?`,a:`It's ${n} lira.`,cat:"much"}},
 who:()=>{const f=pick(V_FAM.filter(x=>x[3]!="p"));const d=pick(["that","this"]);const pr=f[3]=="f"?"She's":"He's";return{wh:"Who",q:`Who is ${d}?`,a:`${pick([cap(d)+"'s",pr])} my ${f[0]}.`,cat:"who"}},
 name:()=>{const s=pick([PRON[1],PRON[2],PRON[3],PRON[5]]);const nm=pick(NAMES).en;const ap=s.en=="You"?"My":POSS[s.en][0].toUpperCase()+POSS[s.en].slice(1);return{wh:"What",q:`What is ${POSS[s.en]} name?`,a:`${ap} name is ${s.en=="They"?"Smith":nm}.`,cat:"name"}},
 weather:()=>{const w=pick(V_WEATHER)[0];return{wh:"What",q:"What's the weather like today?",a:`It's ${w}.`,cat:"weather",fixed:1}},
 many:()=>{const t=pick(THINGS);const n=2+Math.floor(rnd()*30);return{wh:"How many",q:`How many ${t[1]} are there?`,a:`There are ${n}.`,cat:"many"}},
 day:()=>{const d=pick(V_DAYS)[0];return{wh:"What",q:"What day is it today?",a:`It's ${d}.`,cat:"day",fixed:1}}
};
const WHK=Object.keys(WH);const WHWORDS=["What","Where","Who","How","How old","When","What time","What color","How much","How many"];
function whItem(){return WH[pick(WHK)]()}
T.whWord=()=>{let it;do{it=whItem()}while(it.fixed);const rest=it.q.slice(it.wh.length);
 const pool=WHWORDS.filter(w=>w!=it.wh&&!(it.wh=="What"&&(w=="What time"||w=="What color"))&&!(it.wh=="How"&&w.startsWith("How ")));
 return mcq({t:"whWord",label:"Choose the question word",color:"var(--purple)",prompt:`<span class="blank">___</span>${rest}<br><span class="ans">— ${it.a}</span>`,correct:it.wh,wrong:pool,grid:2,en:it.q+" "+it.a,ar:null,exp:`${it.wh} … ? → ${it.a}`,expAr:"اختر أداة الاستفهام المناسبة للجواب",key:"ww|"+it.q})};
T.whAnswer=()=>{const it=whItem();const wr=[];let g=0;while(wr.length<6&&g++<40){const o=whItem();if(o.cat!=it.cat&&o.a!=it.a)wr.push(o.a)}
 return mcq({t:"whAnswer",label:"Choose the answer",color:"var(--purple)",prompt:it.q,correct:it.a,wrong:wr,en:it.q+" "+it.a,ar:null,exp:`${it.q} → ${it.a}`,expAr:"اقرأ أداة الاستفهام جيداً: Where = مكان، How old = عمر، What color = لون …",key:"wa|"+it.q+it.a})};
T.whOrder=()=>{let it;do{it=whItem()}while(it.fixed&&rnd()<.7);return{t:"order",label:"Put the question in order",color:"var(--gold)",words:it.q.split(" "),answer:it.q,en:it.q,ar:null,exp:"Question word + am/is/are + subject + …?",expAr:"أداة الاستفهام + الفعل + الفاعل",key:"wo|"+it.q}};
T.whCorrect=()=>{const s=whSubj();const n=pick(NAT);const kind=pick(["from","old","place"]);let cor,wr;
 if(kind=="from"){cor=`Where ${s.be} ${lowS(s)} from?`;wr=[`Where ${lowS(s)} ${s.be} from?`,`Where from ${s.be} ${lowS(s)}?`,`Where ${lowS(s)} from?`,`From where ${lowS(s)} ${s.be}?`,`Where ${WRONGBE[s.be][0]} ${lowS(s)} from?`]}
 else if(kind=="old"){cor=`How old ${s.be} ${lowS(s)}?`;wr=[`How old ${lowS(s)} ${s.be}?`,`How ${s.be} old ${lowS(s)}?`,`How old ${lowS(s)}?`,`How old ${WRONGBE[s.be][0]} ${lowS(s)}?`,`How many years ${s.be} ${lowS(s)}?`]}
 else{cor=`Where ${s.be} ${lowS(s)} now?`;wr=[`Where ${lowS(s)} ${s.be} now?`,`Where ${lowS(s)} now?`,`Where ${WRONGBE[s.be][1]} ${lowS(s)} now?`,`${cap(s.be)} where ${lowS(s)} now?`]}
 return mcq({t:"whCorrect",label:"Choose the correct question",color:"var(--purple)",prompt:"Which question is correct?",correct:cor,wrong:wr,en:cor,ar:null,exp:"Question word + am/is/are + subject",expAr:"أداة الاستفهام ثم الفعل ثم الفاعل",key:"wc|"+cor})};
// ---- this / that / these / those + possessives
const OBJ2=[["book","books","📕"],["pen","pens","🖊️"],["bag","bags","👜"],["phone","phones","📱"],["key","keys","🔑"],["car","cars","🚗"],["chair","chairs","🪑"],["cat","cats","🐱"],["dog","dogs","🐶"],["laptop","laptops","💻"],["umbrella","umbrellas","☂️"],["notebook","notebooks","📓"],["house","houses","🏠"],["apple","apples","🍎"],["watch","watches","⌚"],["shoe","shoes","👟"],["friend","friends","🧑"],["ticket","tickets","🎫"]];
T.demo=()=>{const o=pick(OBJ2),near=rnd()<.5,many=rnd()<.5;const w=near?(many?"These":"This"):(many?"Those":"That");const own=pick(["my","your","our","his","her"]);
 const cue=`<span class="cue">${near?"👇 near":"👉 far"} · ${many?o[2]+o[2]+o[2]:o[2]}</span>`;
 return{t:"demo",label:"this · that · these · those",color:"var(--gold)",prompt:`${cue}<br><span class="blank">___</span> ${many?"are":"is"} ${own} ${many?o[1]:o[0]}.`,opts:["This","That","These","Those"],a:["This","That","These","Those"].indexOf(w),grid:2,en:`${w} ${many?"are":"is"} ${own} ${many?o[1]:o[0]}.`,ar:null,exp:"near: this (1) / these (many) · far: that (1) / those (many)",expAr:"قريب مفرد this · قريب جمع these · بعيد مفرد that · بعيد جمع those",key:"dm|"+w+o[0]+own}};
T.demoBe=()=>{const o=pick(OBJ2),w=pick(["This","That","These","Those"]);const many=w=="These"||w=="Those";const neg=rnd()<.3;const own=pick(["my","your","his","her","our","their"]);
 const opts=neg?["isn't","aren't"]:["is","are"];return{t:"demoBe",label:"is or are?",color:"var(--gold)",prompt:`${w} <span class="blank">___</span> ${own} ${many?o[1]:o[0]}.`,opts,a:many?1:0,grid:2,en:`${w} ${neg?(many?"aren't":"isn't"):(many?"are":"is")} ${own} ${many?o[1]:o[0]}.`,ar:null,exp:"this / that → is · these / those → are",expAr:"this و that مع is · these و those مع are",key:"db|"+w+own+o[0]+neg}};
T.demoIt=()=>{const o=pick(OBJ2),many=rnd()<.5,yes=rnd()<.5,w=many?pick(["these","those"]):pick(["this","that"]);const q=`${many?"Are":"Is"} ${w} your ${many?o[1]:o[0]}?`;
 const p=many?"they":"it";const tail=yes?(many?" are.":" is."):(many?" aren't.":" isn't.");
 return{t:"demoIt",label:"Short answer",color:"var(--gold)",prompt:`${q}<br>— ${yes?"Yes":"No"}, <span class="blank">___</span>${tail}`,opts:["it","they",w,many?"these":"this"].filter((x,i,a)=>a.indexOf(x)==i).slice(0,3),a:many?1:0,grid:3,en:`${q} ${yes?"Yes":"No"}, ${p}${tail}`,ar:null,exp:"this / that → it · these / those → they",expAr:"في الإجابة: this/that ← it · these/those ← they",key:"di|"+q+yes}};
const POSS_ITEMS=[["name","Sara"],["car","new"],["bag","black"],["teacher","from Russia"],["house","big"],["phone","new"],["family","in Syria"],["brother","a doctor"],["room","small"],["friend","from Iraq"]];
T.poss=()=>{const s=pick([...PRON,...NAMES,...NAMES]);const it=pick(POSS_ITEMS);const nm=s.kind=="n"?s.en:pick(NAMES).en;
 let intro;if(s.en=="I")intro="I am Omar.";else if(s.en=="You")intro="You are a new student.";else if(s.en=="He")intro="He is my friend.";else if(s.en=="She")intro="She is my classmate.";else if(s.en=="We")intro="We are students.";else if(s.en=="They")intro="They are my neighbors.";else intro=`This is ${s.en}.`;
 const corr=s.kind=="p"?POSS[s.en]:(s.g=="f"?"her":"his");const val=it[0]=="name"?(s.kind=="n"?s.en:s.en=="I"?"Omar":nm):it[1];
 const all=["my","your","his","her","our","their"];const wrong=all.filter(x=>x!=corr);wrong.push(s.kind=="p"?s.en.toLowerCase():(s.g=="f"?"she":"he"));
 const o=mcq({t:"poss",label:"my · your · his · her · our · their",color:"var(--green)",prompt:"",correct:cap(corr),wrong:wrong.map(cap),grid:2,en:"",ar:null,exp:"I → my · you → your · he → his · she → her · we → our · they → their",expAr:"I ← my · you ← your · he ← his · she ← her · we ← our · they ← their",key:""});
 o.prompt=`${intro}<br><span class="blank">___</span> ${it[0]} is ${val}.`;o.en=`${intro} ${cap(corr)} ${it[0]} is ${val}.`;o.key="ps|"+intro+it[0];return o};
T.apos=()=>{const s=pick(NAMES);const isIs=rnd()<.5;let x;
 if(isIs){const c=pick([...ADJ,...PLACE,...FROM]);x=`${s.en}'s ${compEn(s,c)}.`}else{const n=pick(["bag","car","phone","brother","sister","teacher","house","book"]);const adj=pick(["new","red","big","here","at home","from Iraq","a doctor","black","small"]);x=`${s.en}'s ${n} is ${adj}.`}
 return{t:"apos",label:"What does 's mean?",color:"var(--green)",prompt:x,opts:["'s = is","'s = belongs to (ملكية)"],a:isIs?0:1,en:x,ar:null,exp:isIs?`${s.en}'s = ${s.en} is`:`${s.en}'s … = the … of ${s.en}`,expAr:isIs?"هنا 's تعني is":"هنا 's تعني الملكية (حقيبة سارة)",key:"ap|"+x}};
// ---- there is / there are
const THINGS=[["bank","banks","بنك","بنوك","b"],["café","cafés","مقهى","مقاهٍ","b"],["chair","chairs","كرسي","كراسٍ","r"],["student","students","طالب","طلاب","c"],["book","books","كتاب","كتب","t"],["window","windows","نافذة","نوافذ","r"],["car","cars","سيارة","سيارات","s"],["park","parks","حديقة","حدائق","b"],["mosque","mosques","مسجد","مساجد","b"],["hospital","hospitals","مستشفى","مستشفيات","b"],["restaurant","restaurants","مطعم","مطاعم","b"],["computer","computers","حاسوب","حواسيب","r"],["table","tables","طاولة","طاولات","r"],["bed","beds","سرير","أسرّة","h"],["pharmacy","pharmacies","صيدلية","صيدليات","b"],["apple","apples","تفاحة","تفاح","f"],["egg","eggs","بيضة","بيض","f"],["bus stop","bus stops","موقف باص","مواقف باص","b"],["teacher","teachers","معلم","معلمين","c"],["picture","pictures","صورة","صور","r"],["supermarket","supermarkets","سوبرماركت","سوبرماركتات","b"],["pen","pens","قلم","أقلام","t"]];
const LOCS={b:[["near my house","قرب بيتي"],["on my street","في شارعي"],["near the university","قرب الجامعة"],["in Ümraniye","في أومرانيه"]],r:[["in my room","في غرفتي"],["in the classroom","في الصف"]],c:[["in the classroom","في الصف"],["in my class","في صفي"]],t:[["on the table","على الطاولة"],["in my bag","في حقيبتي"]],s:[["on my street","في شارعي"],["near my house","قرب بيتي"]],h:[["in the bedroom","في غرفة النوم"],["in my room","في غرفتي"]],f:[["in the fridge","في الثلاجة"],["on the table","على الطاولة"],["in the kitchen","في المطبخ"]]};
function thingSet(){const t=pick(THINGS),l=pick(LOCS[t[4]]);return[t,l]}
const THEXP="There is + one · There are + many",THAR="There is للمفرد · There are للجمع";
T.thereFill=()=>{const[t,l]=thingSet();const many=rnd()<.55;const n=2+Math.floor(rnd()*18);const np=many?(rnd()<.3?"many "+t[1]:n+" "+t[1]):AN(t[0])+" "+t[0];
 return{t:"thereFill",label:"There is / There are",color:"var(--blue)",prompt:`There <span class="blank">___</span> ${np} ${l[0]}.`,opts:["is","are"],a:many?1:0,grid:2,en:`There ${many?"are":"is"} ${np} ${l[0]}.`,ar:`يوجد ${many?np.startsWith("many")?"الكثير من "+t[3]:n+" "+t[3]:t[2]} ${l[1]}.`,exp:THEXP,expAr:THAR,key:"tf|"+np+l[0]}};
T.thereNeg=()=>{const[t,l]=thingSet();const many=rnd()<.5;const np=many?"any "+t[1]:AN(t[0])+" "+t[0];
 return{t:"thereNeg",label:"There isn't / There aren't",color:"var(--red)",prompt:`There <span class="blank">___</span> ${np} ${l[0]}.`,opts:["isn't","aren't","not","don't"],a:many?1:0,grid:2,en:`There ${many?"aren't":"isn't"} ${np} ${l[0]}.`,ar:`لا يوجد ${many?t[3]:t[2]} ${l[1]}.`,exp:"There isn't a … · There aren't any …",expAr:"النفي: There isn't (مفرد) · There aren't any (جمع)",key:"tn|"+np+l[0]}};
T.thereQ=()=>{const[t,l]=thingSet();const many=rnd()<.5;const np=many?"any "+t[1]:AN(t[0])+" "+t[0];
 return{t:"thereQ",label:"Is there / Are there?",color:"var(--blue)",prompt:`<span class="blank">___</span> there ${np} ${l[0]}?`,opts:["Is","Are","Do","Have"],a:many?1:0,grid:2,en:`${many?"Are":"Is"} there ${np} ${l[0]}?`,ar:`هل يوجد ${many?t[3]:t[2]} ${l[1]}؟`,exp:"Is there a …? · Are there any …?",expAr:"السؤال: Is there (مفرد) · Are there any (جمع)",key:"tq|"+np+l[0]}};
T.thereShort=()=>{const[t,l]=thingSet();const many=rnd()<.5,yes=rnd()<.5;const np=many?"any "+t[1]:AN(t[0])+" "+t[0];const q=`${many?"Are":"Is"} there ${np} ${l[0]}?`;
 const cor=yes?`Yes, there ${many?"are":"is"}.`:`No, there ${many?"aren't":"isn't"}.`;
 const wrong=yes?[`Yes, there ${many?"is":"are"}.`,`Yes, it is.`,`Yes, they are.`,`Yes, ${many?"are":"is"} there.`]:[`No, there ${many?"isn't":"aren't"}.`,`No, it isn't.`,`No, there not.`,`No, they aren't.`];
 return mcq({t:"thereShort",label:"Short answer",color:"var(--green)",prompt:`${q}<br><span class="mk ${yes?"mk-y":"mk-n"}">${yes?"✓ Yes":"✗ No"}</span>`,correct:cor,wrong,en:q+" "+cor,ar:`هل يوجد ${many?t[3]:t[2]} ${l[1]}؟ — ${yes?"نعم":"لا"}`,exp:"Yes, there is / are · No, there isn't / aren't",expAr:"نعيد there في الإجابة",key:"ts|"+q+yes})};
T.thereCorrect=()=>{const[t,l]=thingSet();const many=rnd()<.5;const n=2+Math.floor(rnd()*10);const cor=many?`There are ${n} ${t[1]} ${l[0]}.`:`There is ${AN(t[0])} ${t[0]} ${l[0]}.`;
 const wrong=many?[`There is ${n} ${t[1]} ${l[0]}.`,`There are ${n} ${t[0]} ${l[0]}.`,`${cap(l[0])} have ${n} ${t[1]}.`,`It is ${n} ${t[1]} ${l[0]}.`,`There ${n} ${t[1]} ${l[0]}.`]:[`There are ${AN(t[0])} ${t[0]} ${l[0]}.`,`There is ${t[0]} ${l[0]}.`,`${cap(l[0])} has ${AN(t[0])} ${t[0]}.`,`It is ${AN(t[0])} ${t[0]} ${l[0]}.`,`Is there ${AN(t[0])} ${t[0]} ${l[0]}.`];
 return mcq({t:"thereCorrect",label:"Choose the correct sentence",color:"var(--blue)",prompt:"Which sentence is correct?",correct:cor,wrong,en:cor,ar:`يوجد ${many?n+" "+t[3]:t[2]} ${l[1]}.`,exp:THEXP,expAr:THAR,key:"tc|"+cor})};
// ---- past: was / were
const PCOMP=()=>[...ADJ,...ADJ,...PLACE,...JOBS];
const TPAST=[["yesterday","أمس"],["last night","ليلة أمس"],["last week","الأسبوع الماضي"],["last year","السنة الماضية"],["two days ago","قبل يومين"],["this morning","هذا الصباح"],["on Monday","يوم الاثنين"],["in 2020","في 2020"],["last summer","الصيف الماضي"]];
const TNOW=[["now","الآن"],["today","اليوم"],["right now","الآن"],["at the moment","في هذه اللحظة"]];
const WAS={am:"was",is:"was",are:"were"};
const KANA={I:["كنتُ","لم أكن"],You:["كنتَ","لم تكن"],He:["كان","لم يكن"],She:["كانت","لم تكن"],We:["كنّا","لم نكن"],They:["كانوا","لم يكونوا"]};
function arPast(s,c,neg,tm){if(!s.ar||!c.acc)return null;const k=s.kind=="p"?s.en:(s.g=="f"?"She":s.g=="p"?"They":"He");const v=KANA[k][neg?1:0];return (s.kind=="p"?"":s.ar+" ")+v+" "+c.acc[s.g]+" "+tm[1]+"."}
function pastSent(s,c,neg,tm){return `${s.en} ${WAS[s.be]}${neg?"n't":""} ${compEn(s,c)} ${tm[0]}.`}
T.pastFill=()=>{const[s,c]=pickSC({subs:[...PERSON_SUBJ,...PAIRS],comps:PCOMP()});const mode=rnd()<.5;const tm=mode&&rnd()<.4?pick(TNOW):pick(TPAST);const isPast=TPAST.includes(tm);
 const right=isPast?WAS[s.be]:s.be;const opts=mode?[s.be,WAS[s.be]]:["was","were"];const tail=` ${compEn(s,c)} ${tm[0]}.`;
 return{t:"pastFill",label:mode?"Present or past?":"was or were?",color:"var(--purple)",prompt:`${s.en} <span class="blank">___</span>${tail}`,opts,a:opts.indexOf(right),grid:2,en:`${s.en} ${right}${tail}`,ar:isPast?arPast(s,c,false,tm):(arS(s,c,false)?arS(s,c,false)+" "+tm[1]+".":null),exp:isPast?`${tm[0]} = past → I/he/she/it was · you/we/they were`:`${tm[0]} = now → am / is / are`,expAr:isPast?"كلمة زمن ماضٍ ← was / were":"الآن ← am / is / are",key:"pf|"+s.en+tail+mode}};
T.pastNeg=()=>{const[s,c]=pickSC({comps:PCOMP()});const tm=pick(TPAST);const tail=` ${compEn(s,c)} ${tm[0]}.`;const cor=WAS[s.be]+"n't";
 return mcq({t:"pastNeg",label:"Past negative",color:"var(--red)",prompt:`${s.en} <span class="blank">___</span>${tail}`,correct:cor,wrong:[cor=="wasn't"?"weren't":"wasn't","didn't","not was",s.be=="am"?"amn't":s.be+"n't"],grid:2,en:s.en+" "+cor+tail,ar:arPast(s,c,true,tm),exp:"was not = wasn't · were not = weren't",expAr:"النفي في الماضي: wasn't / weren't",key:"pn|"+s.en+tail})};
T.pastQ=()=>{const[s,c]=pickSC({subs:QSUBJ,comps:PCOMP()});const tm=pick(TPAST);const W=cap(WAS[s.be]);const tail=` ${lowS(s)} ${compEn(s,c)} ${tm[0]}?`;
 return mcq({t:"pastQ",label:"Past question",color:"var(--blue)",prompt:`<span class="blank">___</span>${tail}`,correct:W,wrong:[W=="Was"?"Were":"Was","Did",BeCap[s.be]],grid:2,en:W+tail,ar:arPast(s,c,false,tm)?"هل "+arPast(s,c,false,tm).replace(/\.$/,"؟"):null,exp:"Was I / he / she / it …? · Were you / we / they …?",expAr:"السؤال في الماضي: Was / Were قبل الفاعل",key:"pq|"+tail})};
T.pastShort=()=>T.shortAns(true);
T.pastCorrect=()=>{const[s,c]=pickSC({comps:PCOMP()});const tm=pick(TPAST);const neg=rnd()<.3;const cor=pastSent(s,c,neg,tm);const comp=compEn(s,c);const w=WAS[s.be];const ww=w=="was"?"were":"was";
 return mcq({t:"pastCorrect",label:"Choose the correct sentence",color:"var(--purple)",prompt:"Which sentence is correct?",correct:cor,wrong:[`${s.en} ${ww}${neg?"n't":""} ${comp} ${tm[0]}.`,`${s.en} ${s.be}${neg?" not":""} ${comp} ${tm[0]}.`,neg?`${s.en} not ${w} ${comp} ${tm[0]}.`:`${s.en} ${comp} ${tm[0]}.`,neg?`${s.en} didn't ${comp} ${tm[0]}.`:`${s.en} ${w} be ${comp} ${tm[0]}.`],en:cor,ar:arPast(s,c,neg,tm),exp:`${tm[0]} → past: ${w}`,expAr:"مع كلمات الماضي نستخدم was / were",key:"pc|"+cor})};
// ---- common mistakes
const MIST_FIXED=BE_LEARN.find(l=>l.id=="l12").ex.map(([x,ar])=>{const m=x.match(/✗ (.+?) → ✓ (.+)$/);return{w:m[1],c:m[2].split(" / ")[0],ar}});
T.mistFixed=()=>{const m=pick(MIST_FIXED);const opts=shuf([m.c,m.w]);return{t:"mist",label:"Common mistake",color:"var(--rose)",prompt:"Which is correct?",opts,a:opts.indexOf(m.c),en:m.c,ar:null,exp:"✗ "+m.w+" → ✓ "+m.c,expAr:m.ar,key:"mf|"+m.c+rnd().toFixed(3)}};
T.mistAge=()=>{const s=pick([...PRON.slice(0,4),...NAMES]);const n=10+Math.floor(rnd()*60);const has=s.en=="I"||s.en=="You"?"have":"has";const cor=`${s.en} ${s.be} ${n} years old.`;
 return mcq({t:"mist",label:"Age",color:"var(--rose)",prompt:"Which is correct?",correct:cor,wrong:[`${s.en} ${has} ${n} years.`,`${s.en} ${has} ${n} years old.`,`${s.en} ${n} years old.`,`${s.en} ${WRONGBE[s.be][0]} ${n} years old.`],en:cor,ar:null,exp:"Age: be + number (+ years old)",expAr:"العمر مع be وليس have: I am 18",key:"ma|"+cor})};
T.mistArt=()=>{const s=pick([...PRON.slice(0,4),...NAMES,...NPS]);const j=pick(V_JOBS)[0];const a=AN(j);const cor=`${s.en} ${s.be} ${a} ${j}.`;
 return mcq({t:"mist",label:"a / an",color:"var(--rose)",prompt:"Which is correct?",correct:cor,wrong:[`${s.en} ${s.be} ${j}.`,`${s.en} ${s.be} ${a=="a"?"an":"a"} ${j}.`,`${s.en} ${a} ${j}.`,`${s.en} ${WRONGBE[s.be][0]} ${a} ${j}.`],en:cor,ar:null,exp:`Jobs need a / an → ${a} ${j}`,expAr:"المهنة تحتاج a أو an (an قبل a e i o u)",key:"mr|"+cor})};
T.mistFrom=()=>{const s=pick([...PRON,...NAMES]);const n=pick(NAT);const useNat=rnd()<.5;const cor=useNat?`${s.en} ${s.be} ${n[1]}.`:`${s.en} ${s.be} from ${n[0]}.`;
 return mcq({t:"mist",label:"Country or nationality?",color:"var(--rose)",prompt:"Which is correct?",correct:cor,wrong:useNat?[`${s.en} ${s.be} from ${n[1]}.`,`${s.en} ${s.be} ${n[0]}.`,`${s.en} ${n[1]}.`]:[`${s.en} ${s.be} from ${n[1]}.`,`${s.en} ${s.be} ${n[0]}.`,`${s.en} from ${n[0]}.`],en:cor,ar:null,exp:`from + country (${n[0]}) · be + nationality (${n[1]})`,expAr:"from + اسم الدولة · بدون from + الجنسية",key:"mn|"+cor})};
T.mistName=()=>{const s=pick([PRON[0],PRON[1],PRON[2],PRON[3],PRON[5]]);const P=cap(POSS[s.en]);const nm=pick(NAMES).en;const cor=`${P} name is ${nm}.`;
 return mcq({t:"mist",label:"Name",color:"var(--rose)",prompt:"Which is correct?",correct:cor,wrong:[`${P} name ${nm}.`,`${s.en=="I"?"Me":s.en} name is ${nm}.`,`${P} name are ${nm}.`,`${P} name's is ${nm}.`],en:cor,ar:null,exp:"my / your / his / her / their + name + is",expAr:"لا تنسَ is: My name is …",key:"mm|"+cor})};
