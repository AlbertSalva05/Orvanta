/* Orvanta 1.5.0 app logic · generated from orvanta-v1.5.0.dc.html */
const STAGES=[
{label:'Warehouse processing',short:'Warehouse'},
{label:'Export customs declaration',short:'CN customs'},
{label:'International transit',short:'In transit'},
{label:'Arrived at Manila port',short:'PH port'},
{label:'Philippine customs clearance',short:'PH customs'},
{label:'Handed to J&T Express',short:'J&T handover'},
{label:'Out for delivery',short:'Out for delivery'},
{label:'Delivered',short:'Delivered'}];
const PLACE=['Consolidation warehouse','Export customs office','At sea, South China Sea','Manila International Container Terminal','Bureau of Customs, Port of Manila','J&T Express hub, Pasig'];
const CARRIERS=['YTO Express','SF Express','ZTO Express','Cainiao','J&T Express','Other'];
const KEY='orvanta.v1';
const SICON=['M3 10 12 4l9 6v10H3zM8 20v-6h8v6','M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5','M3 17c2 2 4 2 6 0s4-2 6 0 4 2 6 0M5 14l-1-5h16l-1 5M8 9V5h8v4','M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 8v13M5 13a7 7 0 0 0 14 0M8 12H5M19 12h-3','M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6zM9 12l2 2 4-4','M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4zM3.5 7.5 12 11.5l8.5-4M12 11.5v9','M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z','M3 11 12 4l9 7v9H3zM9 15l2 2 4-4'];
const TONES={neutral:{bg:'var(--sunk)',fg:'var(--ink-2)'},brand:{bg:'var(--brand-tint)',fg:'var(--brand-ink)'},ok:{bg:'var(--ok-tint)',fg:'var(--ok)'},bad:{bg:'var(--bad-tint)',fg:'var(--bad)'}};
const chain=(dates,notes)=>dates.map((at,i)=>({stage:i,at:at.length<11?at+'T10:00:00+08:00':at+':00+08:00',note:(notes&&notes[i])||'',source:'Sample data'}));
const OD={s1:'2026-10-01',s2:'2026-09-19',s3:'2026-09-11',s4:'2026-10-12',s5:'2026-09-23',s6:'2026-09-08',s7:'2026-09-24'};
function migrate(data){if(!data)return data;const out={};Object.keys(data).forEach(k=>{const w=data[k]||{shipments:[],items:[]};out[k]={...w,shipments:(w.shipments||[]).map(sh=>({...sh,orderDate:sh.orderDate||OD[sh.id]||'',events:(sh.events||[]).map(e=>e.source==='Carrier sync'?{...e,source:'Sample data'}:e)}))}});return out}
function seed(){
const shipments=[
{id:'s1',tracking:'YT2426815530712',carrier:'YTO Express',origin:'Guangzhou, CN',destination:'Quezon City, PH',orderRef:'TB-4402917735',stage:2,delayed:false,delayNote:'',eta:'2026-10-24',
events:chain(['2026-10-04T10:20','2026-10-07T15:05','2026-10-10T22:40'],['Received and weighed, 4.2 kg','Export declaration filed','Departed Nansha Port by sea'])},
{id:'s2',tracking:'SF1428837610293',carrier:'SF Express',origin:'Shenzhen, CN',destination:'Pasig, PH',orderRef:'1688-77310642',stage:4,delayed:true,delayNote:'Held for document check. Customs asked for the commercial invoice.',eta:'',
events:chain(['2026-09-22T11:00','2026-09-25T09:30','2026-09-27T18:10','2026-10-06T08:15','2026-10-08T13:30'],['Received and weighed, 2.1 kg','Export declaration filed','Departed Shekou Port by sea','Container unloaded','Held: commercial invoice requested'])},
{id:'s3',tracking:'JT6100293847562',carrier:'J&T Express',origin:'Yiwu, CN',destination:'Makati, PH',orderRef:'TB-4398120064',stage:7,delayed:false,delayNote:'',eta:'2026-10-09',
events:chain(['2026-09-15T14:00','2026-09-17T10:00','2026-09-19T20:30','2026-09-29T07:40','2026-10-02T16:00','2026-10-06T09:10','2026-10-09T08:05','2026-10-09T14:22'],['','','','','Released by customs','J&T waybill assigned','','Received at front desk'])},
{id:'s4',tracking:'ZTO738201946655',carrier:'ZTO Express',origin:'Guangzhou, CN',destination:'Cebu City, PH',orderRef:'',stage:0,delayed:false,delayNote:'',eta:'2026-11-02',
events:chain(['2026-10-14T16:48'],['Arrived at warehouse, waiting for consolidation'])},
{id:'s5',tracking:'YT2426815530988',carrier:'YTO Express',origin:'Guangzhou, CN',destination:'Quezon City, PH',orderRef:'TB-4401733920',stage:5,delayed:false,delayNote:'',eta:'2026-10-17',
events:chain(['2026-09-26T12:00','2026-09-29T09:00','2026-10-01T21:15','2026-10-09T06:30','2026-10-12T15:45','2026-10-14T10:25'],['','','','','Released by customs','J&T waybill 820117463392 assigned'])},
{id:'s6',tracking:'CNPH20260911044',carrier:'Cainiao',origin:'Hangzhou, CN',destination:'Taguig, PH',orderRef:'AE-8150034417',stage:7,delayed:false,delayNote:'',eta:'2026-09-30',
events:chain(['2026-09-11T09:00','2026-09-13T10:30','2026-09-15T19:00','2026-09-23T07:10','2026-09-25T14:00','2026-09-28T11:20','2026-09-30T08:30','2026-09-30T16:40'],['','','','','Released by customs','','','Received by recipient'])},
{id:'s7',tracking:'JT6100293850019',carrier:'J&T Express',origin:'Shenzhen, CN',destination:'Quezon City, PH',orderRef:'',stage:6,delayed:false,delayNote:'',eta:'2026-10-15',
events:chain(['2026-09-28T13:00','2026-09-30T10:00','2026-10-02T20:00','2026-10-08T07:00','2026-10-10T15:30','2026-10-13T09:40','2026-10-15T07:50'],['','','','','Released by customs','','Rider assigned'])}];
shipments.forEach(x=>{x.orderDate=OD[x.id]});
const I=(id,name,qty,cny,shipmentId,notes)=>({id,name,qty,cny,rate:null,shipmentId,notes:notes||''});
const items=[
I('i1','Stainless steel rice cooker inner pot, 5 L',2,68,'s1'),I('i2','Linen blackout curtains, 140 x 260 cm',2,89.5,'s1','Colour: oat'),I('i3','Bamboo drawer organisers, set of 6',1,39.9,'s1'),
I('i4','Mechanical keyboard, 87 keys, brown switches',1,329,'s2'),I('i5','Braided USB-C cables, 2 m',4,12.8,'s2'),
I('i6','Cotton bedsheet set, queen',1,158,'s3'),I('i7','Ceramic pour-over coffee dripper',1,45,'s3'),
I('i8','Folding aluminium step ladder, 3 steps',1,199,'s4'),I('i9','Silicone kitchen utensil set, 12 pieces',1,56.5,'s4'),
I('i10','Children\u2019s rain boots, size 28',2,35,'s5'),I('i11','LED desk lamp with clamp',1,118,'s5'),
I('i12','Wireless earbuds charging case',1,49.9,'s6'),
I('i13','Insulated lunch bags',3,22,'s7'),I('i14','Wall-mounted shoe rack, white',1,145,'s7'),
I('i15','Aluminium phone stand',1,19.9,null,'Seller ships next week')];
return {personal:{shipments,items},resale:{shipments:[],items:[]}};
}
const DEFAULT_SETTINGS={name:'',email:'',locale:'en-PH',tz:'Asia/Manila',primary:'PHP',rate:'7.95',theme:'light',sidebar:true,textSize:'m',notify:{milestones:true,customs:true,delays:true,email:false}};
const manilaIso=t=>new Date((t===undefined?Date.now():t)+8*36e5).toISOString().slice(0,10);
const blankAdd=cur=>({tracking:'',orderDate:manilaIso(),stage:'0',lines:[{name:'',qty:'1',price:'',cur:cur||'PHP'}]});
function parseHash(){
const h=(typeof location!=='undefined'?location.hash:'').replace(/^#\/?/,'');
const [a,b]=h.split('/');
if(!a) return {route:'overview',param:null};
if(['overview','dashboard','shipments','items','add','settings'].includes(a)) return {route:a,param:null};
if(a==='shipment'&&b) return {route:'shipment',param:decodeURIComponent(b)};
return {route:'notfound',param:h};
}
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
class Component extends DCLogic {
constructor(p){
super(p);
const saved=load();
this.state={ws:'personal',data:migrate(saved&&saved.data)||seed(),settings:Object.assign({},DEFAULT_SETTINGS,(saved&&saved.settings)||{}),
...parseHash(),q:'',statusFilter:'all',sort:'updated',page:1,itemStatus:'all',
add:blankAdd((Object.assign({},DEFAULT_SETTINGS,(saved&&saved.settings)||{})).primary),addErrors:null,up:null,upErr:null,odraft:null,odErr:null,dialog:null,draft:null,draftErrors:null,toast:'',override:null,drawer:false,anim:true,t:1,dashPeriod:'90',pipeSel:null,scrollP:0,scrollY:0,launch:0,dashCur:null,dashWeek:null,dashStatus:null,
w:typeof window!=='undefined'?window.innerWidth:1280};
this.searchRef=React.createRef();
}
componentDidMount(){
this.onHash=()=>{this.setState({...parseHash(),page:1,drawer:false});window.scrollTo(0,0);this.startAnim()};
this.onResize=()=>this.setState(s=>({w:window.innerWidth,drawer:window.innerWidth>=1024?false:s.drawer}));
this.onKey=e=>{if(e.key==='Escape'){if(this.state.dialog)this.closeDialog();else if(this.state.drawer)this.setState({drawer:false})}};
this.onScroll=()=>{if(this.sr)return;this.sr=requestAnimationFrame(()=>{this.sr=0;const max=document.documentElement.scrollHeight-window.innerHeight;this.setState({scrollY:window.scrollY,scrollP:max>0?Math.min(1,window.scrollY/max):0})})};
window.addEventListener('scroll',this.onScroll,{passive:true});
window.addEventListener('hashchange',this.onHash);window.addEventListener('resize',this.onResize);document.addEventListener('keydown',this.onKey);
this.applyDisplay();
this.startAnim();
}
componentWillUnmount(){window.removeEventListener('scroll',this.onScroll);cancelAnimationFrame(this.raf);window.removeEventListener('hashchange',this.onHash);window.removeEventListener('resize',this.onResize);document.removeEventListener('keydown',this.onKey)}
componentDidUpdate(){
const s=this.state,p=this._prev||{};
if(p.data!==s.data||p.settings!==s.settings){try{localStorage.setItem(KEY,JSON.stringify({ws:s.ws,data:s.data,settings:s.settings}))}catch(e){}}
if(p.settings!==s.settings)this.applyDisplay();
const dsChanged=this._prevDs!==undefined&&this._prevDs!==this.props.dataState;
this._prev={data:s.data,settings:s.settings};this._prevDs=this.props.dataState;
if(dsChanged&&s.override)this.setState({override:null});
}
startAnim(){
cancelAnimationFrame(this.raf);
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){this.setState({anim:true,t:1});return}
this.setState({anim:false,t:0});
let t0=null;
const step=now=>{if(t0===null)t0=now;const p=Math.min(1,(now-t0)/800);this.setState({anim:true,t:p});if(p<1)this.raf=requestAnimationFrame(step)};
this.raf=requestAnimationFrame(()=>{this.raf=requestAnimationFrame(step)});
}
applyDisplay(){
const st=this.state.settings,r=document.documentElement;
r.style.fontSize={s:'93.75%',m:'100%',l:'118.75%'}[st.textSize]||'100%';
if(st.theme==='hc'||st.theme==='dark')r.dataset.theme=st.theme;else delete r.dataset.theme;
}
toast(msg){clearTimeout(this.tt);this.setState({toast:msg});this.tt=setTimeout(()=>this.setState({toast:''}),3200)}
rate(){const r=parseFloat(this.state.settings.rate);return r>0?r:7.95}
fmt(){
const {locale,tz}=this.state.settings;
const dt=new Intl.DateTimeFormat(locale,{timeZone:tz,month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
const d=new Intl.DateTimeFormat(locale,{timeZone:tz,month:'short',day:'numeric',year:'numeric'});
const php=new Intl.NumberFormat(locale,{style:'currency',currency:'PHP'});
const cny=new Intl.NumberFormat(locale,{style:'currency',currency:'CNY'});
return {dt:x=>dt.format(new Date(x)),d:x=>x?d.format(new Date(x+'T12:00:00+08:00')):'Not given yet',php:x=>php.format(x),cny:x=>cny.format(x)};
}
wsData(){const eff=this.props.dataState==='empty'?{shipments:[],items:[]}:this.state.data[this.state.ws];return eff||{shipments:[],items:[]}}
setWsData(fn){this.setState(s=>({data:{...s.data,[s.ws]:fn(s.data[s.ws])}}))}
statusOf(sh){
if(!sh) return {label:'Not shipped yet',tone:TONES.neutral,key:'unshipped'};
if(sh.delayed) return {label:'Delayed, '+STAGES[sh.stage].short,tone:TONES.bad,key:'delayed'};
if(sh.stage===7) return {label:'Delivered',tone:TONES.ok,key:'delivered'};
return {label:STAGES[sh.stage].label,tone:sh.stage<2?TONES.neutral:TONES.brand,key:'active'};
}
orderDateOf(sh){return sh.orderDate||(sh.events[0]?manilaIso(new Date(sh.events[0].at).getTime()):manilaIso())}
bdays(a,b){const s=Date.parse(a+'T00:00:00Z'),e=Date.parse(b+'T00:00:00Z');let n=0;for(let t=s+864e5;t<=e;t+=864e5){const w=new Date(t).getUTCDay();if(w&&w!==6)n++}return n}
timing(sh){
const ev=sh.events.filter(e=>e.stage===sh.stage).pop();const since=ev?new Date(ev.at).getTime():Date.now();
const days=Math.max(0,Math.floor((Date.now()-since)/864e5));const done=sh.stage===7;
const bd=this.bdays(this.orderDateOf(sh),done&&ev?manilaIso(since):manilaIso());
return {days,bd,inStatus:days===0?'Today':days===1?'1 day':days+' days',bdLabel:bd===1?'1 business day':bd+' business days',
bdNote:done?'Order date to delivery, Mon to Fri':'Order date to today, Mon to Fri',since};
}
applyUpdate(id,k,at,note,delayed,delayNote){
this.setWsData(w=>({...w,shipments:w.shipments.map(sh=>{if(sh.id!==id)return sh;
let events=sh.events;
if(k!==sh.stage)events=sh.events.filter(e=>e.stage<k).concat([{stage:k,at,note,source:'Manual update'}]);
else if(note&&events.length)events=events.map((e,i)=>i===events.length-1?{...e,note}:e);
const dl=delayed&&k!==7;
return {...sh,stage:k,events,delayed:dl,delayNote:dl?(delayNote||'On hold'):''};})}));
}
lastAt(sh){return sh.events.length?sh.events[sh.events.length-1].at:''}
itemRate(it){return it.rate>0?it.rate:this.rate()}
closeDialog=()=>this.setState({dialog:null,draft:null,draftErrors:null})
openItem(it,shipmentId){
const r2=x=>String(Math.round(x*100)/100);
this.setState({dialog:'item',draftErrors:null,draft:it?{id:it.id,name:it.name,qty:String(it.qty),cur:it.priceCur||'CNY',cny:it.priceCur==='PHP'?r2(it.price):r2(it.cny),rate:it.rate?String(it.rate):'',shipmentId:it.shipmentId||'',notes:it.notes||''}
:{id:null,name:'',qty:'1',cur:this.state.settings.primary,cny:'',rate:'',shipmentId:shipmentId||'',notes:''}});
}
validateDraft(d){
const e={};
if(!d.name.trim())e.name='Describe the product so you can recognise it later.';else if(d.name.length>160)e.name='Keep it under 160 characters.';
if(!/^\d+$/.test(d.qty)||+d.qty<1)e.qty='Use a whole number, 1 or more.';
if(!(parseFloat(d.cny)>0))e.cny='Enter the unit price, above 0.';
if(d.rate!==''&&!(parseFloat(d.rate)>0))e.rate='Leave empty for the default rate, or enter a number above 0.';
return e;
}
validTracking(t,existing,selfId){
if(!t)return 'Enter the tracking number from your seller or forwarder.';
if(!/^[A-Za-z0-9-]{8,30}$/.test(t))return 'Use 8 to 30 letters, numbers or dashes. Spaces are removed for you.';
if(existing.some(s=>s.id!==selfId&&s.tracking.toUpperCase()===t.toUpperCase()))return 'You already have an order with this tracking number.';
return '';
}
validDate(d){if(!d)return 'Choose the day you placed the order.';if(d>manilaIso())return 'The order date can\u2019t be in the future.';return ''}
validateAdd(a,existing){
const e={lines:{}};const t=a.tracking.replace(/\s+/g,'');
const te=this.validTracking(t,existing);if(te)e.tracking=te;
const de=this.validDate(a.orderDate);if(de)e.orderDate=de;
a.lines.forEach((l,i)=>{const le={};if(l.name||l.price){if(!l.name.trim())le.name=1;if(!/^\d+$/.test(l.qty)||+l.qty<1)le.qty=1;if(!(parseFloat(l.price)>0))le.price=1}if(Object.keys(le).length)e.lines[i]=le});
if(!Object.keys(e.lines).length)delete e.lines;
return e;
}
renderVals(){
const s=this.state,f=this.fmt(),rate=this.rate();
const ds=s.override||this.props.dataState||'live';
const isWide=s.w>=1024;
const wsd=this.wsData();
const ships=wsd.shipments,items=wsd.items;
const byId={};ships.forEach(x=>byId[x.id]=x);
const qq=s.q.trim().toLowerCase().replace(/\s+/g,'');
const go=h=>()=>{location.hash=h};
const activeKey=s.route==='shipment'?'shipments':s.route;
const ease=1-Math.pow(1-s.t,3);
const IC={overview:'M4 4h7v7H4zM13 4h7v4h-7zM13 11h7v9h-7zM4 14h7v6H4z',dashboard:'M4 20h16M7 16v-5M12 16V6M17 16v-8',shipments:'M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4zM3.5 7.5 12 11.5l8.5-4M12 11.5v9',items:'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01',add:'M12 5v14M5 12h14',settings:'M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4',money:'M3 7h18v10H3zM12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM6.5 10v4M17.5 10v4',check:'M5 12.5l4.5 4.5L19 7.5',alert:'M12 4 2.5 20h19zM12 10v4M12 17h.01',convert:'M7 4v16M3.5 16.5 7 20l3.5-3.5M17 20V4M13.5 7.5 17 4l3.5 3.5'};
const navItem=(k,label,badge,badgeSr)=>{const on=k===activeKey;return {href:'#/'+k,label,icon:IC[k],aria:on?'page':undefined,bg:on?'var(--brand-tint)':'transparent',fg:on?'var(--brand-ink)':'var(--ink-2)',mark:on?'var(--accent)':'transparent',hasBadge:!!badge,badge:String(badge||''),badgeSr:badgeSr||'',badgeBg:on?'var(--brand)':'var(--sunk)',badgeFg:on?'var(--on-brand)':'var(--ink-2)'}};
const activeShips=ships.filter(x=>x.stage<7).length;
const navGroups=[{label:'Track',items:[navItem('overview','Overview'),navItem('dashboard','Dashboard'),navItem('shipments','Shipments',activeShips,activeShips+' in progress'),navItem('items','Products',items.length,items.length+' products')]},{label:'Manage',items:[navItem('add','Add order'),navItem('settings','Settings')]}];
const shipView=sh=>{const st=this.statusOf(sh);const tm=this.timing(sh);const inS=sh.stage===7?'Delivered':tm.inStatus;return {id:sh.id,icon:SICON[sh.stage],href:'#/shipment/'+encodeURIComponent(sh.id),tracking:sh.tracking,status:st.label,tone:st.tone,updated:sh.events.length?f.dt(this.lastAt(sh)):'No updates yet',ordered:f.d(this.orderDateOf(sh)),inStatus:inS,bdays:tm.bdLabel,timing:(sh.stage===7?'Delivered after ':inS+' in this status · ')+tm.bdLabel}};
const matchQ=sh=>!qq||sh.tracking.toLowerCase().includes(qq)||(sh.orderRef||'').toLowerCase().replace(/\s+/g,'').includes(qq)||items.some(it=>it.shipmentId===sh.id&&it.name.toLowerCase().replace(/\s+/g,'').includes(qq));
let list=ships.filter(sh=>matchQ(sh)&&(s.statusFilter==='all'||this.statusOf(sh).key===s.statusFilter));
const sorters={updated:(a,b)=>this.lastAt(b).localeCompare(this.lastAt(a)),eta:(a,b)=>this.orderDateOf(a).localeCompare(this.orderDateOf(b)),stage:(a,b)=>b.stage-a.stage};
list=[...list].sort(sorters[s.sort]);
const per=5,pageCount=Math.max(1,Math.ceil(list.length/per)),page=Math.min(s.page,pageCount);
const pageShipments=list.slice((page-1)*per,page*per).map(shipView);
const pages=Array.from({length:pageCount},(_,i)=>{const n=i+1,on=n===page;return {n,aria:on?'page':undefined,aria_label:'Page '+n,bg:on?'var(--ink)':'var(--surface)',fg:on?'var(--bg)':'var(--ink)',go:()=>this.setState({page:n})}});
const route=STAGES.map((st,i)=>{const count=ships.filter(x=>x.stage===i).length;const delayed=ships.some(x=>x.stage===i&&x.delayed);return {delay:(120+i*70)+'ms',short:st.short,count,countColor:count?(delayed?'var(--bad)':'var(--ink)'):'var(--ink-2)',fill:count?(delayed?'var(--bad)':'var(--accent)'):'var(--surface)',border:count?(delayed?'var(--bad)':'var(--accent)'):'var(--line-strong)'}});
const totals=items.reduce((a,it)=>{const c=it.qty*it.cny;a.cny+=c;a.php+=c*this.itemRate(it);a.qty+=it.qty;return a},{cny:0,php:0,qty:0});
const deliveredItems=items.filter(it=>byId[it.shipmentId]&&byId[it.shipmentId].stage===7).reduce((a,it)=>a+it.qty,0);
const delayedShips=ships.filter(x=>x.delayed);
const spend=[{label:'Spend in PHP',value:f.php(totals.php*ease),color:'var(--ink)'},{label:'Spend in CNY',value:f.cny(totals.cny*ease),color:'var(--ink)'}];
if(s.settings.primary==='CNY')spend.reverse();
const cnt=v=>String(Math.round(v*ease));
const metrics=[...spend,{label:'Items bought',value:cnt(totals.qty),color:'var(--ink)'},{label:'Active shipments',value:cnt(activeShips),color:'var(--ink)'},{label:'Items delivered',value:cnt(deliveredItems),color:'var(--ink)'},{label:'Delayed shipments',value:cnt(delayedShips.length),color:delayedShips.length?'var(--bad)':'var(--ink)'}];
const recent=ships.flatMap(sh=>sh.events.map(e=>({sh,e}))).sort((a,b)=>b.e.at.localeCompare(a.e.at)).slice(0,6).map(({sh,e})=>({href:'#/shipment/'+sh.id,icon:SICON[e.stage],label:STAGES[e.stage].label,tracking:sh.tracking,note:e.note||e.source,when:f.dt(e.at)}));
const unshipped=items.filter(it=>!it.shipmentId);
let d={tracking:'',tone:TONES.neutral,timeline:[],costs:[],items:[]};let detailMissing=false;let curSh=null,upCur=null;const nowLocal=()=>new Date(Date.now()+8*36e5).toISOString().slice(0,16);
if(s.route==='shipment'){
const sh=byId[s.param];
if(!sh)detailMissing=true;
else{
const st=this.statusOf(sh);const its=items.filter(it=>it.shipmentId===sh.id);
const sc=its.reduce((a,it)=>{const c=it.qty*it.cny;a.cny+=c;a.php+=c*this.itemRate(it);return a},{cny:0,php:0});
const costs=[{label:'Products ('+its.length+')',value:its.reduce((a,b)=>a+b.qty,0)+' items'},{label:'Total in CNY',value:f.cny(sc.cny)},{label:'Total in PHP',value:f.php(sc.php)}];
if(s.settings.primary==='CNY'){}else{const t=costs[1];costs[1]=costs[2];costs[2]=t}
const timeline=STAGES.map((stg,i)=>{
const ev=sh.events.find(e=>e.stage===i);const done=i<sh.stage||(i===sh.stage&&sh.stage===7);const cur=i===sh.stage&&sh.stage!==7;
const curBad=cur&&sh.delayed;
return {icon:SICON[i],iconColor:cur?(curBad?'var(--bad)':'var(--accent)'):(ev?'var(--brand-ink)':'var(--line-strong)'),label:stg.label,tag:cur?(curBad?'Held here':'Current'):'',meta:ev?f.dt(ev.at)+' · '+ev.source:(i<sh.stage?'No update recorded':'Pending'),note:ev?ev.note:'',
size:cur?'0.875rem':'0.625rem',fill:cur?(curBad?'var(--bad)':'var(--accent)'):done?'var(--ink)':'var(--surface)',border:cur?(curBad?'var(--bad)':'var(--accent)'):done?'var(--ink)':'var(--line-strong)',
line:i===7?'transparent':(i<sh.stage?'var(--ink)':'var(--line)'),weight:cur?'700':'500',color:ev?'var(--ink)':'var(--ink-2)'};
});
curSh=sh;const tm=this.timing(sh);const iq=its.reduce((a,b)=>a+b.qty,0);
upCur=s.up&&s.up.forId===sh.id?s.up:{forId:sh.id,stage:String(sh.stage),at:nowLocal(),note:'',delayed:!!sh.delayed,delayNote:sh.delayNote||''};
d={tracking:sh.tracking,orderDate:f.d(this.orderDateOf(sh)),inStatus:sh.stage===7?'Delivered':tm.inStatus,inStatusNote:sh.stage===7?f.dt(new Date(tm.since).toISOString()):'Since '+f.dt(new Date(tm.since).toISOString()),bdays:tm.bdLabel,bdNote:tm.bdNote,itemCount:iq===1?'1 item':iq+' items',
hasNext:sh.stage<7,nextLabel:sh.stage<7?STAGES[sh.stage+1].short:'',status:st.label,tone:st.tone,
delayed:!!sh.delayed,delayNote:sh.delayNote,stageShort:STAGES[sh.stage].short,timeline,costs,firstScan:sh.events.length?f.dt(sh.events[0].at):'None',updated:sh.events.length?f.dt(this.lastAt(sh)):'None',
noItems:!its.length,items:its.map(it=>({name:it.name,qty:it.qty,unit:f.cny(it.cny),php:f.php(it.qty*it.cny*this.itemRate(it)),edit:()=>this.openItem(it),editLabel:'Edit '+it.name}))};
}
}
const itemList=items.filter(it=>{
const sh=byId[it.shipmentId];
if(qq&&!(it.name.toLowerCase().replace(/\s+/g,'').includes(qq)||(sh&&sh.tracking.toLowerCase().includes(qq))))return false;
return s.itemStatus==='all'||this.statusOf(sh).key===s.itemStatus;
});
const itemRows=itemList.map(it=>{const sh=byId[it.shipmentId];const st=this.statusOf(sh);const sub=it.qty*it.cny;
return {name:it.name,qty:it.qty,unit:f.cny(it.cny),sub:f.cny(sub),php:f.php(sub*this.itemRate(it)),hasShip:!!sh,noShip:!sh,tracking:sh?sh.tracking:'',href:sh?'#/shipment/'+sh.id:'',status:st.label,tone:st.tone,edit:()=>this.openItem(it),editLabel:'Edit '+it.name}});
const it2=itemList.reduce((a,it)=>{const c=it.qty*it.cny;a.cny+=c;a.php+=c*this.itemRate(it);a.qty+=it.qty;return a},{cny:0,php:0,qty:0});
const noItemsAtAll=!items.length;
const ae=s.addErrors||{};const errF=(k,help)=>({[k+'Invalid']:ae[k]?'true':undefined,[k+'Border']:ae[k]?'var(--bad)':'var(--line-strong)',[k+'Color']:ae[k]?'var(--bad)':'var(--ink-2)',[k+'Msg']:ae[k]||help});
const addErr={...errF('tracking','Spaces are removed. We check you don\u2019t already have it.'),...errF('orderDate','Business days are counted from this date.')};
const addLines=s.add.lines.map((l,i)=>{const le=(ae.lines||{})[i]||{};const p=parseFloat(l.price),q=+l.qty||0,okP=p>0,isP=l.cur==='PHP';
const fC=isP?f.php:f.cny,fO=isP?f.cny:f.php,cv=x=>isP?x/rate:x*rate;const bad=Object.keys(le).length;
return {i,name:l.name,qty:l.qty,price:l.price,cur:l.cur,priceId:'ln-price-'+i,convId:'ln-conv-'+i,nameInvalid:le.name?'true':undefined,qtyInvalid:le.qty?'true':undefined,priceInvalid:le.price?'true':undefined,
nameBorder:le.name?'var(--bad)':'var(--line-strong)',qtyBorder:le.qty?'var(--bad)':'var(--line-strong)',priceBorder:le.price?'var(--bad)':'var(--line-strong)',
conv:okP?fC(p)+' \u2248 '+fO(cv(p))+' per unit':'Shows the '+(isP?'CNY':'PHP')+' amount as you type',convColor:okP?'var(--brand-ink)':'var(--ink-2)',
msg:bad?'Add a name, a whole-number quantity and a price above 0.':(okP&&q?'Line total '+fC(p*q)+' \u2248 '+fO(cv(p*q)):'Leave empty to add products later.'),msgColor:bad?'var(--bad)':'var(--ink-2)',
remove:()=>this.setState(st=>({add:{...st.add,lines:st.add.lines.length>1?st.add.lines.filter((_,j)=>j!==i):[{name:'',qty:'1',price:'',cur:l.cur}]}})),removeLabel:'Remove product '+(i+1)}});
const errCount=['tracking','orderDate'].filter(k=>ae[k]).length+Object.keys(ae.lines||{}).length;
const dr=s.draft||{name:'',qty:'',cur:'CNY',cny:'',rate:'',shipmentId:'',notes:''};const de=s.draftErrors||{};
const dErr={};['name','qty','cny','rate'].forEach(k=>{dErr[k]=de[k]||'';dErr[k+'Invalid']=de[k]?'true':undefined;dErr[k+'Border']=de[k]?'var(--bad)':'var(--line-strong)'});
if(!de.rate)dErr.rate='Empty uses the default';
const dSub=(+dr.qty||0)*(parseFloat(dr.cny)||0);const dRate=parseFloat(dr.rate)>0?parseFloat(dr.rate):rate;
const rateOk=parseFloat(s.settings.rate)>0;
const sset=(k,v)=>this.setState(st=>({settings:{...st.settings,[k]:v}}));
const opt=(cur,val,label,k)=>{const on=cur===val;return {label,on:on?'true':'false',bg:on?'var(--ink)':'var(--surface)',fg:on?'var(--bg)':'var(--ink)',border:on?'var(--ink)':'var(--line-strong)',pick:()=>sset(k,val)}};
const n=s.settings.notify;
const notifyDef=[['milestones','Delivery milestones','Port arrival, J&T handover, out for delivery and delivered'],['customs','Customs events','Declarations filed, holds and releases on both sides'],['delays','Delays and exceptions','Anything that stops a parcel for more than 24 hours'],['email','Also send by email','Uses the email in your profile']];
const PH=[['In China',0,2],['Crossing',2,4],['PH customs',4,5],['Last mile',5,8]];
const pipe=STAGES.map((st,i)=>{const here=ships.filter(x=>x.stage===i);const c=here.length;const bad=here.some(x=>x.delayed);const on=s.pipeSel===i;
return {short:st.short,count:String(Math.round(c*ease)),unit:c===1?'shipment':'shipments',bad,empty:!c,on:on?'true':'false',delay:(120+i*70)+'ms',
aria:st.label+': '+c+(c===1?' shipment':' shipments')+(bad?', delayed':'')+(on?'. Selected':''),
bg:on?'var(--brand-tint)':'transparent',ring:on?'var(--brand)':'transparent',cursor:c?'pointer':'default',
countColor:c?(bad?'var(--bad)':'var(--ink)'):'var(--line-strong)',fill:c?(bad?'var(--bad)':'var(--accent)'):'var(--surface)',border:c?(bad?'var(--bad)':'var(--accent)'):'var(--line-strong)',
pick:()=>this.setState(x=>({pipeSel:x.pipeSel===i?null:i}))}});
const phases=PH.map(([label,a,b])=>({label,span:'span '+(b-a)}));
const phasesNarrow=PH.map(([label,a,b])=>({label,stages:pipe.slice(a,b)}));
const whatOf=sh=>{const its=items.filter(it=>it.shipmentId===sh.id);return its.length?its[0].name+(its.length>1?' + '+(its.length-1)+' more':''):'No products linked yet'};
const pSel=s.pipeSel;
const pRows=(pSel===null?ships.filter(x=>x.stage<7).sort((a,b)=>b.stage-a.stage||this.orderDateOf(a).localeCompare(this.orderDateOf(b))):ships.filter(x=>x.stage===pSel)).slice(0,5);
const pipeList=pRows.map((sh,i)=>{const v=shipView(sh);return {...v,what:whatOf(sh),carrier:'Ordered '+v.ordered+' · '+v.bdays,eta:sh.stage===7?'Delivered':v.inStatus+' in status',delay:(i*50)+'ms'}});
const pipeTitle=pSel===null?'Arriving next':(pRows.length+(pRows.length===1?' shipment':' shipments')+' at: '+STAGES[pSel].label);
const prim=s.settings.primary==='CNY';
const notShippedQty=unshipped.reduce((a,it)=>a+it.qty,0);
const sum={spendMain:prim?f.cny(totals.cny*ease):f.php(totals.php*ease),spendAlt:prim?f.php(totals.php):f.cny(totals.cny),
delivered:String(Math.round(deliveredItems*ease)),bought:String(totals.qty),meter:(s.anim&&totals.qty?deliveredItems/totals.qty*100:0)+'%',
itemsSub:(totals.qty-deliveredItems-notShippedQty)+' on the way'+(notShippedQty?', '+notShippedQty+' not shipped yet':''),
active:String(Math.round(activeShips*ease)),
shipSub:(delayedShips.length?delayedShips.length+' delayed · ':'')+ships.filter(x=>x.stage===7).length+' delivered',
shipBorder:delayedShips.length?'var(--bad)':'var(--line)',
shipHref:delayedShips.length?'#/shipment/'+delayedShips[0].id:'#/shipments',
shipLink:delayedShips.length?'Fix the delayed shipment':'See all shipments',shipLinkColor:delayedShips.length?'var(--bad)':'var(--brand-ink)'};
const DAY=864e5,now=Date.now();
const per2=s.dashPeriod;const dcur=s.dashCur||s.settings.primary;
const pShips=ships.filter(sh=>per2==='all'||!sh.events.length||(now-new Date(sh.events[0].at).getTime())<=(+per2)*DAY);
const conv=it=>{const c=it.qty*it.cny;return dcur==='CNY'?c:c*this.itemRate(it)};
const shipSpend=sh=>items.filter(it=>it.shipmentId===sh.id).reduce((a,it)=>a+conv(it),0);
const money=dcur==='CNY'?f.cny:f.php;
const money0=new Intl.NumberFormat(s.settings.locale,{style:'currency',currency:dcur,maximumFractionDigits:0});
const weekOf=sh=>{const dd=new Date(new Date(sh.events[0].at).getTime()+8*36e5);const dow=(dd.getUTCDay()+6)%7;return Date.UTC(dd.getUTCFullYear(),dd.getUTCMonth(),dd.getUTCDate()-dow)};
const GROUPS=[['preparing','Preparing in China','#7a7d78'],['transit','In transit','#1d5c57'],['customs','At PH customs','#c96a1b'],['lastmile','With J&T','#3f7d77'],['delivered','Delivered','#2b6534'],['delayed','Delayed','#9b2f1d']];
const groupOf=sh=>sh.delayed?'delayed':sh.stage===7?'delivered':sh.stage>=5?'lastmile':sh.stage===4?'customs':sh.stage>=2?'transit':'preparing';
const wkFmt=new Intl.DateTimeFormat(s.settings.locale,{timeZone:'UTC',month:'short',day:'numeric'});
const wkShips=pShips.filter(sh=>sh.events.length);
const wkMap={};wkShips.forEach(sh=>{const k=weekOf(sh);wkMap[k]=(wkMap[k]||0)+shipSpend(sh)});
const wkKeys=Object.keys(wkMap).map(Number);const weeks=[];
if(wkKeys.length){for(let k=Math.min(...wkKeys);k<=Math.max(...wkKeys);k+=7*DAY)weeks.push(k)}
const wkMax=Math.max(1,...weeks.map(k=>wkMap[k]||0));
const bars=weeks.map((k,i)=>{const v=wkMap[k]||0;const on=s.dashWeek===k;const some=s.dashWeek!==null;
return {label:wkFmt.format(new Date(k)),valueLabel:v?money0.format(v):'0',on:on?'true':'false',aria:'Week of '+wkFmt.format(new Date(k))+': '+money(v)+(on?'. Selected, select again to clear':'. Select to filter'),
height:'calc((100% - 1.5rem) * '+(s.anim?(v/wkMax).toFixed(3):0)+')',width:(s.anim?v/wkMax*100:0)+'%',fill:on?'var(--accent)':'var(--brand)',opacity:some&&!on?'0.4':'1',delay:(i*70)+'ms',
pick:()=>this.setState(st=>({dashWeek:st.dashWeek===k?null:k}))}});
const counts={};pShips.forEach(sh=>{const g=groupOf(sh);counts[g]=(counts[g]||0)+1});
const mix=GROUPS.map(([key,label,color])=>{const c=counts[key]||0;const on=s.dashStatus===key;const some=s.dashStatus!==null;
return {key,label,color,count:c,width:(s.anim&&pShips.length?(c/pShips.length*100):0)+'%',on:on?'true':'false',empty:!c,opacity:!c?'0.5':(some&&!on?'0.45':'1'),
bg:on?'var(--brand-tint)':'var(--surface)',border:on?'var(--brand)':'var(--line)',pick:()=>this.setState(st=>({dashStatus:st.dashStatus===key?null:key}))}});
const LEGS=['Warehouse to CN customs','CN customs to departure','Sea or air crossing','Port to PH customs','PH customs to J&T','J&T to out for delivery','Out for delivery to door'];
const legs=LEGS.map((label,i)=>{const ds2=pShips.map(sh=>{const a=sh.events.find(e=>e.stage===i),b=sh.events.find(e=>e.stage===i+1);return a&&b?(new Date(b.at)-new Date(a.at))/DAY:null}).filter(x=>x!==null);
return {label,n:ds2.length,avg:ds2.length?ds2.reduce((x,y)=>x+y,0)/ds2.length:null}}).filter(l=>l.n);
const legMax=Math.max(0.1,...legs.map(l=>l.avg));const slow=legs.reduce((a,l)=>!a||l.avg>a.avg?l:a,null);
const legRows=legs.map((l,i)=>({label:l.label,value:l.avg<1?Math.round(l.avg*24)+' h':l.avg.toFixed(1)+' days',width:(s.anim?l.avg/legMax*100:0)+'%',slowest:l===slow,color:l===slow?'var(--accent)':'var(--brand)',delay:(i*60)+'ms'}));
const carMap={};pShips.forEach(sh=>{const c=carMap[sh.carrier]||(carMap[sh.carrier]={name:sh.carrier,n:0,v:0});c.n++;c.v+=shipSpend(sh)});
const cars=Object.values(carMap).sort((a,b)=>b.v-a.v);const carMax=Math.max(1,...cars.map(c=>c.v));
const view=pShips.filter(sh=>(s.dashWeek===null||(sh.events.length&&weekOf(sh)===s.dashWeek))&&(s.dashStatus===null||groupOf(sh)===s.dashStatus)).sort((a,b)=>this.lastAt(b).localeCompare(this.lastAt(a)));
const pItems=items.filter(it=>pShips.some(sh=>sh.id===it.shipmentId));
const pQty=pItems.reduce((a,it)=>a+it.qty,0);const pDel=pItems.filter(it=>byId[it.shipmentId].stage===7).reduce((a,it)=>a+it.qty,0);
const pSpend=pShips.reduce((a,sh)=>a+shipSpend(sh),0);
const pActive=pShips.filter(sh=>sh.stage<7);const pDelayed=pShips.filter(sh=>sh.delayed);
const todayIso=new Date(now+8*36e5).toISOString().slice(0,10);
const nextEta=pActive.map(sh=>sh.eta).filter(e=>e&&e>=todayIso).sort()[0];
const delPct=pQty?Math.round(pDel/pQty*100):0;
const tone=k=>({ok:['var(--ok-tint)','var(--ok)'],bad:['var(--bad-tint)','var(--bad)'],brand:['var(--brand-tint)','var(--brand-ink)'],neutral:['var(--sunk)','var(--ink-2)']}[k]);
const kpi=(o,t,ic)=>({...o,icon:IC[ic],iconBg:tone(t)[0],iconFg:tone(t)[1],badgeBg:tone(o.badgeTone||'neutral')[0],badgeFg:tone(o.badgeTone||'neutral')[1]});
const kpis=[
kpi({eyebrow:'Total spend',badge:dcur,value:money(pSpend*ease),sub:pItems.length+' products in '+pShips.length+' shipments',delay:'60ms'},'brand','money'),
kpi({eyebrow:'Delivered',badge:Math.round(delPct*ease)+'%',badgeTone:'ok',value:Math.round(pDel*ease)+' of '+pQty+' items',sub:'Items that reached your door',hasMeter:true,meter:(s.anim?delPct:0)+'%',delay:'120ms'},'ok','check'),
kpi({eyebrow:'In progress',badge:'Open',value:String(Math.round(pActive.length*ease)),sub:pActive.length?'Average '+Math.round(pActive.reduce((a,x)=>a+this.timing(x).bd,0)/pActive.length)+' business days since order':'Nothing in progress',delay:'180ms'},'neutral','shipments'),
kpi({eyebrow:'Needs attention',badge:pDelayed.length?'Action needed':'All clear',badgeTone:pDelayed.length?'bad':'ok',value:String(Math.round(pDelayed.length*ease)),sub:pDelayed.length?pDelayed.map(x=>'Held at '+STAGES[x.stage].short).join(', '):'No holds or delays in this period',delay:'240ms'},pDelayed.length?'bad':'ok','alert')];
const popt=(cur,val,label,k)=>{const on=cur===val;return {label,on:on?'true':'false',bg:on?'var(--ink)':'transparent',fg:on?'var(--bg)':'var(--ink)',pick:()=>this.setState({[k]:val,dashWeek:k==='dashPeriod'?null:s.dashWeek})}};
const chips=[];
if(s.dashWeek!==null)chips.push({label:'Week of '+wkFmt.format(new Date(s.dashWeek)),aria:'Clear week filter',clear:()=>this.setState({dashWeek:null})});
if(s.dashStatus!==null)chips.push({label:GROUPS.find(g=>g[0]===s.dashStatus)[1],aria:'Clear status filter',clear:()=>this.setState({dashStatus:null})});
const dashV={
periodLabel:{'30':'Last 30 days','90':'Last 90 days','all':'All time'}[per2],
periodOpts:[popt(per2,'30','30 days','dashPeriod'),popt(per2,'90','90 days','dashPeriod'),popt(per2,'all','All','dashPeriod')],
curOpts:[popt(dcur,'PHP','PHP','dashCur'),popt(dcur,'CNY','CNY','dashCur')],
kpis,bars,spendHeadline:money(pSpend)+' across '+weeks.length+(weeks.length===1?' week':' weeks'),
mix,mixBar:mix.filter(m=>m.count),mixHeadline:pShips.length+(pShips.length===1?' shipment':' shipments')+' in this period',
legs:legRows,legHeadline:slow?slow.label+' takes longest':'Not enough scans yet',legNote:'Worked out from carrier scan times on your shipments. More shipments make it more reliable.',
carriers:cars.map(c=>({name:c.name,spend:money(c.v),count:c.n+(c.n===1?' shipment':' shipments'),width:(s.anim?c.v/carMax*100:0)+'%'})),
carrierHeadline:cars.length?cars[0].name+' carries the most value':'No carriers yet',
chips,viewHeadline:view.length+(view.length===1?' shipment':' shipments')+(chips.length?' match':' in this period'),viewEmpty:!view.length,
clearAll:()=>this.setState({dashWeek:null,dashStatus:null}),
view:view.map((sh,i)=>({...shipView(sh),spend:money(shipSpend(sh)),delay:(i*50)+'ms'}))};
const theme=s.settings.theme==='standard'?'light':s.settings.theme;const sideOn=s.settings.sidebar!==false;
const remPx=16*({s:0.9375,m:1,l:1.1875}[s.settings.textSize]||1);const cRem=(s.w-(isWide&&sideOn?16.5*remPx:0))/remPx;
const jH=cRem>=66;
const JPH=[['Step 1','In China',0,2],['Step 2','Crossing',2,4],['Step 3','PH customs',4,5],['Step 4','Last mile',5,7]];
const jPhases=JPH.map(([step,label,a,b],pi)=>{const here=ships.filter(x=>x.stage>=a&&x.stage<b);const c=here.length;const bad=here.some(x=>x.delayed);
return {step,label,count:String(Math.round(c*ease)),unit:c===1?'shipment':'shipments',countColor:c?(bad?'var(--bad)':'var(--ink)'):'var(--line-strong)',stages:pipe.slice(a,b),groupLabel:label+' checkpoints',
cardBorder:bad?'var(--bad)':'var(--line)',lineColor:c?'var(--brand)':'var(--line)',lineTf:s.anim?'scaleX(1)':'scaleX(0)',
nodeFill:c?(bad?'var(--bad)':'var(--accent)'):'var(--surface)',nodeBorder:c?(bad?'var(--bad)':'var(--accent)'):'var(--line-strong)',delay:(100+pi*80)+'ms',nodeDelay:(300+pi*120)+'ms'}});
const delivN=ships.filter(x=>x.stage===7).length,onWay=ships.filter(x=>x.stage<7).length,dOn=s.pipeSel===7;
const journey={phases:jPhases,horizontal:jH,vertical:!jH,cols:jH?'repeat(4,minmax(0,1fr)) minmax(9rem,0.75fr)':'minmax(0,1fr)',gap:jH?'0.75rem':'1.25rem',railPad:jH?'0':'1.75rem',
done:{count:String(Math.round(delivN*ease)),sub:deliveredItems+(deliveredItems===1?' item':' items')+' reached the door',on:dOn?'true':'false',empty:!delivN,ring:dOn?'var(--ok)':'transparent',
aria:'Delivered: '+delivN+' shipments'+(dOn?'. Selected':''),pick:()=>this.setState(x=>({pipeSel:x.pipeSel===7?null:7}))},
summary:[{label:onWay+' on the way',bg:'var(--brand-tint)',fg:'var(--brand-ink)'},...(delayedShips.length?[{label:delayedShips.length+' needs attention',bg:'var(--bad-tint)',fg:'var(--bad)'}]:[]),{label:delivN+' delivered',bg:'var(--ok-tint)',fg:'var(--ok)'}]};
const tzLabel={'Asia/Manila':'Manila (UTC+8)','Asia/Shanghai':'Shanghai (UTC+8)','UTC':'UTC'}[s.settings.tz];
const showPage=ds!=='loading'&&ds!=='error';
const routeKey=detailMissing?'notfound':s.route;
return {
isWide,notWide:!isWide,navGroups,journey,pipeWide:cRem>=60,pipeNarrow:cRem<60,showSync:cRem>=66,barsVertical:cRem>=34,barsHorizontal:cRem<34,mainPad:s.w<640?'1.5rem 1rem 3rem':'2rem 2rem 4rem',headPadX:s.w<640?'1rem':'1.5rem',pipe,phases,phasesNarrow,pipeList,pipeTitle,pipeHasSel:pSel!==null,pipeClear:()=>this.setState({pipeSel:null}),sum,dash:dashV,
side:isWide?{pos:'fixed',tf:sideOn?'none':'translateX(-100%)',vis:sideOn?'visible':'hidden',shadow:'none'}:{pos:'fixed',tf:s.drawer?'none':'translateX(-100%)',vis:s.drawer?'visible':'hidden',shadow:s.drawer?'0 1rem 3rem rgba(20,22,21,0.25)':'none'},
drawerOpen:!isWide&&s.drawer,drawerAria:s.drawer?'true':'false',
openDrawer:()=>{if(isWide)sset('sidebar',true);else this.setState({drawer:true})},
hideSide:()=>{if(isWide)sset('sidebar',false);else this.setState({drawer:false})},
sideHidden:!isWide||!sideOn,contentMl:isWide&&sideOn?'16.5rem':'0',
openLabel:isWide?'Show sidebar':'Open menu',hideLabel:isWide?'Hide sidebar':'Close menu',hideIcon:isWide?'M4 4h16v16H4zM9 4v16M15.5 9.5 13 12l2.5 2.5':'M6 6l12 12M18 6 6 18',
isDark:theme==='dark',notDark:theme!=='dark',logoSrc:theme==='dark'?'assets/icons/icn_symbol_reversed_01.svg':'assets/icons/icn_symbol_color_01.svg',logoMono:theme==='dark'?'assets/icons/icn_symbol_white_01.svg':'assets/icons/icn_symbol_black_01.svg',
themeBtn:theme==='dark'?{label:'Switch to light mode',icon:'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'}:{label:'Switch to dark mode',icon:'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z'},
toggleTheme:()=>sset('theme',theme==='dark'?'light':'dark'),closeDrawer:()=>{if(this.state.drawer)this.setState({drawer:false})},
sideAlert:delayedShips.length?{href:'#/shipment/'+delayedShips[0].id,title:delayedShips.length===1?'1 shipment delayed':delayedShips.length+' shipments delayed',body:'Held at '+STAGES[delayedShips[0].stage].short+'. '+delayedShips[0].tracking}:{href:'#/shipments',title:'',body:''},
syncLabel:ds==='offline'?'Offline, showing saved data':'Synced '+(recent.length?recent[0].when:''),syncDot:ds==='offline'?'var(--warn)':'var(--ok)',
toTop:()=>{this.setState(x=>({launch:x.launch+1}));window.scrollTo({top:0,behavior:'smooth'});const m=document.getElementById('main');if(m){m.setAttribute('tabindex','-1');m.focus({preventScroll:true})}},
top:(()=>{const p=s.scrollP,show=s.scrollY>320;const a=(-90+360*p)*Math.PI/180;const cx=28+23*Math.cos(a),cy=28+23*Math.sin(a);
return {opacity:show?'1':'0',tf:show?'none':'translateY(1rem) scale(0.85)',pe:show?'auto':'none',tab:show?0:-1,hidden:show?undefined:'true',
aria:'Back to top, '+Math.round(p*100)+'% down the page',offset:(144.51*(1-p)).toFixed(2),
dx:(cx-3.5).toFixed(2),dy:(cy-3.5).toFixed(2),drot:'rotate(45 '+cx.toFixed(2)+' '+cy.toFixed(2)+')',
launchKey:'l'+s.launch,anim:s.launch?'orv-launch 520ms cubic-bezier(.2,.7,.2,1)':'none'}})(),
q:s.q,setQ:e=>this.setState({q:e.target.value,page:1}),searchRef:this.searchRef,
submitSearch:e=>{e.preventDefault();if(s.route!=='shipments'&&s.route!=='items')location.hash='#/shipments'},
focusSearch:()=>{this.searchRef.current&&this.searchRef.current.focus()},
offline:ds==='offline',lastSync:recent.length?recent[0].when:'earlier',isLoading:ds==='loading',isError:ds==='error',showPage,skeleton:[1,2,3,4],
retry:()=>{this.setState({override:'loading'});setTimeout(()=>{this.setState({override:'live'});this.toast('Tracking data is up to date')},900)},
r:{dashboard:routeKey==='dashboard',overview:routeKey==='overview',shipments:routeKey==='shipments',shipment:routeKey==='shipment',items:routeKey==='items',add:routeKey==='add',settings:routeKey==='settings',notfound:routeKey==='notfound'},
todayLabel:new Intl.DateTimeFormat(s.settings.locale,{timeZone:s.settings.tz,weekday:'long',month:'long',day:'numeric'}).format(new Date()),
isEmpty:!ships.length,hasData:!!ships.length,route,metrics,recent,
delayed:delayedShips.map(x=>({href:'#/shipment/'+x.id,tracking:x.tracking,stage:STAGES[x.stage].short,note:x.delayNote})),hasDelayed:!!delayedShips.length,noDelayed:!delayedShips.length,
hasUnshipped:!!unshipped.length,unshippedLabel:unshipped.length===1?'1 product is not linked to a shipment yet.':unshipped.length+' products are not linked to a shipment yet.',
newItem:()=>this.openItem(null),
statusFilter:s.statusFilter,setStatusFilter:e=>this.setState({statusFilter:e.target.value,page:1}),sort:s.sort,setSort:e=>this.setState({sort:e.target.value}),
listSummary:ships.length?(list.length?'Showing '+((page-1)*per+1)+' to '+Math.min(page*per,list.length)+' of '+list.length+(list.length!==ships.length?' matching':'')+' shipments':'0 of '+ships.length+' shipments match'):'',
filteredEmpty:!!ships.length&&!list.length,shipCount:ships.length,clearFilters:()=>this.setState({q:'',statusFilter:'all',page:1}),
showShipTable:cRem>=56&&!!list.length,showShipCards:cRem<56&&!!list.length,pageShipments,pages,showPager:pageCount>1,atFirst:page<=1,atLast:page>=pageCount,
prevPage:()=>this.setState({page:Math.max(1,page-1)}),nextPage:()=>this.setState({page:Math.min(pageCount,page+1)}),
d,tzLabel,
copyTracking:()=>{const t=d.tracking;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>this.toast('Copied '+t),()=>this.toast('Copy failed. Select the number and copy it manually.'))},
newItemHere:()=>this.openItem(null,s.param),
rateLabel:String(rate),itemStatus:s.itemStatus,setItemStatus:e=>this.setState({itemStatus:e.target.value}),itemRows,
itemTotals:{count:it2.qty===1?'1 item':it2.qty+' items',qty:it2.qty,cny:f.cny(it2.cny),php:f.php(it2.php)},
itemsEmpty:!itemList.length,showItemTable:cRem>=70&&!!itemList.length,showItemCards:cRem<70&&!!itemList.length,
itemsEmptyTitle:noItemsAtAll?'No products yet':'No products match these filters',
itemsEmptyBody:noItemsAtAll?'Products come from your orders. Add an order with its items and Orvanta works out the PHP cost of each one.':'Try a shorter search or show all statuses.',
itemsEmptyCta:noItemsAtAll?'Add order':'Clear filters',itemsEmptyAction:noItemsAtAll?()=>{location.hash='#/add'}:()=>this.setState({q:'',itemStatus:'all'}),
todayIso:manilaIso(),
up:upCur?(()=>{const late=s.upErr;const k=+upCur.stage;const same=curSh&&k===curSh.stage;
return {...upCur,max:nowLocal(),atInvalid:late?'true':undefined,atBorder:late?'var(--bad)':'var(--line-strong)',atColor:late?'var(--bad)':'var(--ink-2)',atMsg:late||'Manila time. Defaults to now.',
summary:curSh?(same?(upCur.delayed!==!!curSh.delayed?(upCur.delayed?'Will mark this order as delayed.':'Will clear the delay.'):'Status stays: '+STAGES[k].label+'.'):(k<curSh.stage?'Moves back to: ':'Moves to: ')+STAGES[k].label+'. Days in status restart.'):''}})():{},
setUp:e=>{const t=e.target;const v=t.type==='checkbox'?t.checked:t.value;this.setState({up:{...upCur,[t.name]:v},upErr:null})},
saveStatus:e=>{e.preventDefault();if(!curSh||!upCur)return;const k=+upCur.stage;
const atMs=upCur.at?new Date(upCur.at+':00+08:00').getTime():Date.now();
if(!isFinite(atMs)){this.setState({upErr:'Enter a valid date and time.'});return}
if(atMs>Date.now()+6e4){this.setState({upErr:'The date can\u2019t be in the future.'});return}
if(atMs<Date.parse(this.orderDateOf(curSh)+'T00:00:00+08:00')){this.setState({upErr:'The date can\u2019t be before the order date.'});return}
this.applyUpdate(curSh.id,k,new Date(atMs).toISOString(),upCur.note.trim(),!!upCur.delayed,(upCur.delayNote||'').trim());
this.setState({up:null,upErr:null});this.toast(k===curSh.stage?'Order updated':'Status set to: '+STAGES[k].label);},
quickStage:curSh?String(curSh.stage):'0',
quickSet:e=>{if(!curSh)return;const k=+e.target.value;if(k===curSh.stage)return;this.applyUpdate(curSh.id,k,new Date().toISOString(),'',k===7?false:!!curSh.delayed,curSh.delayNote||'');this.setState({up:null,upErr:null});this.toast('Status set to: '+STAGES[k].label)},
quickNext:()=>{if(!curSh||curSh.stage>=7)return;const k=curSh.stage+1;this.applyUpdate(curSh.id,k,new Date().toISOString(),'',false,'');this.setState({up:null,upErr:null});this.toast('Moved to: '+STAGES[k].label)},
askDeleteOrder:()=>this.setState({dialog:'delOrder'}),
doDeleteOrder:()=>{if(!curSh)return;const id=curSh.id,t=curSh.tracking;this.setWsData(w=>({shipments:w.shipments.filter(x=>x.id!==id),items:w.items.filter(x=>x.shipmentId!==id)}));this.setState({dialog:null,up:null});location.hash='#/shipments';this.toast('Order '+t+' deleted')},
openOrderEdit:()=>{if(curSh)this.setState({dialog:'order',odraft:{tracking:curSh.tracking,orderDate:this.orderDateOf(curSh)},odErr:null})},
od:(()=>{const o=s.odraft||{tracking:'',orderDate:''},er=s.odErr||{};return {...o,trackingErr:er.tracking||'',trackingInvalid:er.tracking?'true':undefined,trackingBorder:er.tracking?'var(--bad)':'var(--line-strong)',
dateInvalid:er.date?'true':undefined,dateBorder:er.date?'var(--bad)':'var(--line-strong)',dateColor:er.date?'var(--bad)':'var(--ink-2)',dateMsg:er.date||'Business days are counted from this date.'}})(),
setOd:e=>{const {name,value}=e.target;this.setState(st=>({odraft:{...st.odraft,[name]:value}}))},
saveOrder:e=>{e.preventDefault();if(!curSh||!s.odraft)return;const t=s.odraft.tracking.replace(/\s+/g,'').toUpperCase();
const er={};const te=this.validTracking(t,ships,curSh.id);if(te)er.tracking=te;const de=this.validDate(s.odraft.orderDate);if(de)er.date=de;
if(Object.keys(er).length){this.setState({odErr:er});return}
const id=curSh.id,od=s.odraft.orderDate;this.setWsData(w=>({...w,shipments:w.shipments.map(x=>x.id===id?{...x,tracking:t,orderDate:od}:x)}));this.setState({dialog:null,odraft:null});this.toast('Order details saved')},
askClear:()=>this.setState({dialog:'clear'}),askClearShips:()=>this.setState({dialog:'clearShips'}),
shipCountLabel:ships.length===1?'1 shipment':ships.length+' shipments',itemCountLabel:items.length===1?'1 product':items.length+' products',
doClearShips:()=>{this.setState(st=>{const w=st.data[st.ws];return {data:{...st.data,[st.ws]:{shipments:[],items:w.items.map(it=>({...it,shipmentId:null}))}},dialog:null,up:null}});if(s.route==='shipment')location.hash='#/shipments';this.toast('All shipments deleted. Products kept.')},clearCount:ships.length===1?'1 order':ships.length+' orders',
doClear:()=>{this.setState(st=>({data:{...st.data,[st.ws]:{shipments:[],items:[]}},dialog:null,up:null}));location.hash='#/overview';this.toast('All orders deleted')},
add:s.add,stageOptions:STAGES.map((x,i)=>({value:String(i),label:x.label})),addErr,addLines,
addHasErrors:errCount>0,addErrorSummary:errCount===1?'1 field needs fixing before you can save.':errCount+' fields need fixing before you can save.',
setAddField:e=>{const {name,value}=e.target;this.setState(st=>({add:{...st.add,[name]:value}}))},
setLine:e=>{const i=+e.target.dataset.index,k=e.target.dataset.field,v=e.target.value;this.setState(st=>({add:{...st.add,lines:st.add.lines.map((l,j)=>j===i?{...l,[k]:v}:l)}}))},
addLine:()=>this.setState(st=>({add:{...st.add,lines:[...st.add.lines,{name:'',qty:'1',price:'',cur:st.add.lines[st.add.lines.length-1].cur}]}})),
submitAdd:e=>{e.preventDefault();const a=s.add;const err=this.validateAdd(a,ships);
if(Object.keys(err).length){this.setState({addErrors:err});window.scrollTo(0,0);return}
const id='s'+Date.now().toString(36);const stage=+a.stage;const now=new Date().toISOString();
const sh={id,tracking:a.tracking.replace(/\s+/g,'').toUpperCase(),carrier:'',origin:'',destination:'',orderRef:'',orderDate:a.orderDate,stage,delayed:false,delayNote:'',eta:'',
events:[{stage,at:now,note:'Order added',source:'Manual update'}]};
const newItems=a.lines.filter(l=>l.name.trim()).map((l,i)=>{const p=parseFloat(l.price);return {id:id+'i'+i,name:l.name.trim(),qty:+l.qty,cny:l.cur==='PHP'?p/rate:p,rate:l.cur==='PHP'?rate:null,priceCur:l.cur,price:p,shipmentId:id,notes:''}});
this.setWsData(w=>({shipments:[sh,...w.shipments],items:[...w.items,...newItems]}));
this.setState({add:blankAdd(s.settings.primary),addErrors:null});location.hash='#/shipment/'+id;this.toast('Order '+sh.tracking+' saved');},
settings:s.settings,
setSetting:e=>sset(e.target.name,e.target.value),
rateInvalid:rateOk?undefined:'true',rateBorder:rateOk?'var(--line-strong)':'var(--bad)',rateMsgColor:rateOk?'var(--ink-2)':'var(--bad)',
rateMsg:rateOk?'Enter the rate from your bank or e-wallet. Products with their own rate keep it.':'Enter a number above 0. Totals use 7.95 until you fix this.',
themeOpts:[opt(theme,'light','Light','theme'),opt(theme,'dark','Dark','theme'),opt(theme,'hc','High contrast','theme')],
sizeOpts:[opt(s.settings.textSize,'s','Small','textSize'),opt(s.settings.textSize,'m','Default','textSize'),opt(s.settings.textSize,'l','Large','textSize')],
notifyOpts:notifyDef.map(([k,label,hint])=>({label,hint,on:!!n[k],toggle:()=>this.setState(st=>({settings:{...st.settings,notify:{...st.settings.notify,[k]:!st.settings.notify[k]}}}))})),
askReset:()=>this.setState({dialog:'reset'}),
doReset:()=>{try{localStorage.removeItem(KEY)}catch(e){}this.setState({data:seed(),settings:{...DEFAULT_SETTINGS},ws:'personal',dialog:null,up:null});this.toast('Device data deleted. Sample data restored.')},
nfTitle:detailMissing?'We can\u2019t find that shipment':'This page doesn\u2019t exist',
nfBody:detailMissing?'It may have been deleted. Search for the tracking number to check.':'The link may be out of date. Your shipments and products are all still here.',
dialogOpen:!!s.dialog,dlg:{item:s.dialog==='item',reset:s.dialog==='reset',clear:s.dialog==='clear',clearShips:s.dialog==='clearShips',delOrder:s.dialog==='delOrder',order:s.dialog==='order'},closeDialog:this.closeDialog,
backdropClose:e=>{if(e.target===e.currentTarget)this.closeDialog()},
draft:dr,dErr,draftIsEdit:!!dr.id,itemDlgTitle:dr.id?'Edit product':'Add product',
draftCalc:(()=>{const isP=dr.cur==='PHP',fC=isP?f.php:f.cny,fO=isP?f.cny:f.php;return {cny:dSub?(dr.qty+' × '+fC(parseFloat(dr.cny)||0)+' = '+fC(dSub)):'Enter quantity and price',php:dSub?'\u2248 '+fO(isP?dSub/dRate:dSub*dRate):''}})(),
shipOptions:[{value:'',label:'Not shipped yet'},...ships.map(x=>({value:x.id,label:x.tracking+' · '+x.destination.split(',')[0]}))],
setDraft:e=>{const {name,value}=e.target;this.setState(st=>({draft:{...st.draft,[name]:value}}))},
saveItem:e=>{e.preventDefault();const err=this.validateDraft(dr);if(Object.keys(err).length){this.setState({draftErrors:err});return}
const amt=parseFloat(dr.cny),own=parseFloat(dr.rate)>0?parseFloat(dr.rate):null,useR=own||rate,isP=dr.cur==='PHP';
const it={id:dr.id||'i'+Date.now().toString(36),name:dr.name.trim(),qty:+dr.qty,cny:isP?amt/useR:amt,rate:isP?useR:own,priceCur:dr.cur,price:amt,shipmentId:dr.shipmentId||null,notes:dr.notes};
this.setWsData(w=>({...w,items:dr.id?w.items.map(x=>x.id===dr.id?it:x):[...w.items,it]}));this.closeDialog();this.toast(dr.id?'Product updated':'Product added');},
deleteItem:()=>{this.setWsData(w=>({...w,items:w.items.filter(x=>x.id!==dr.id)}));this.closeDialog();this.toast('Product deleted')},
hasToast:!!s.toast,toast:s.toast
};
}
}
DCLite.mount(document.getElementById("app"),Component,window.DC_TPL,{"dataState":"live"});
