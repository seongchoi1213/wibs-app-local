import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, onSnapshot, query, orderBy, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
const INIT_USERS = [
  { id:"u00", name:"?¥Í≤Ω??, role:"Î∂Ä??,  jisa:"Î≥∏ÏÇ¨",      phone:"010-2110-7522", region:null,                   managerId:null,  joinDate:"" },
  { id:"u01", name:"?ÑÎ≥ëÏ§Ä", role:"Ï∞®Ïû•",  jisa:"Ï§ëÎ?ÏßÄ??,  phone:"010-2241-3646", region:"Ï§ëÎ?ÏßÄ??,              managerId:"u00", joinDate:"" },
  { id:"u02", name:"?ïÏú§??, role:"Ï∞®Ïû•",  jisa:"?òÎèÑÍ∂åÎÇ®Î∂Ä",phone:"010-4716-8114", region:"?òÎèÑÍ∂åÎÇ®Î∂Ä/?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",  managerId:"u00", joinDate:"" },
  { id:"u03", name:"ÍπÄ?†Ïö©", role:"Í≥ºÏû•",  jisa:"Ï§ëÎ?ÏßÄ??,  phone:"010-7173-5945", region:"Ï§ëÎ?ÏßÄ??,              managerId:"u01", joinDate:"" },
  { id:"u10", name:"ÏµúÏàúÎØ?, role:"Ï∞®Ïû•",  jisa:"?®Î?ÏßÄ??,  phone:"010-0000-8884", region:"Î∂Ä???ÄÍµ¨Í≤ΩÎ∂?,          managerId:"u00", joinDate:"2007-09-19" },
  { id:"u11", name:"ÍπÄ?±Í∂å", role:"Ï∞®Ïû•",  jisa:"?®Î?ÏßÄ??,  phone:"010-0000-7590", region:"Í≤ΩÎÇ®/?úÏ£º",             managerId:"u00", joinDate:"2010-07-10" },
  { id:"u12", name:"ÏµúÏÑ±",   role:"Í≥ºÏû•",  jisa:"?®Î?ÏßÄ??,  phone:"010-0000-9654", region:"?ÄÍµ¨Í≤ΩÎ∂?,              managerId:"u10", joinDate:"2013-07-15" },
  { id:"u13", name:"Î∞∞Ïû¨??, role:"Í≥ºÏû•",  jisa:"?®Î?ÏßÄ??,  phone:"010-0000-6756", region:"Í≤ΩÎÇ®",                 managerId:"u11", joinDate:"2013-12-15" },
  { id:"u14", name:"ÍπÄ?ÑÏòÅ", role:"Í≥ºÏû•",  jisa:"?®Î?ÏßÄ??,  phone:"010-0000-9088", region:"?úÏ£º",                 managerId:"u11", joinDate:"2013-11-18" },
  { id:"u20", name:"ÍπÄÍ∑úÏó∞", role:"?ÄÎ¶?,  jisa:"Ï§ëÎ?ÏßÄ??,  phone:"010-2023-2810", region:"Ï§ëÎ?ÏßÄ??,              managerId:"u03", joinDate:"" },
  { id:"u21", name:"?†Í∑º??, role:"?ÄÎ¶?,  jisa:"Ï§ëÎ?ÏßÄ??,  phone:"010-2858-6282", region:"Ï§ëÎ?ÏßÄ??,              managerId:"u03", joinDate:"" },
  { id:"u22", name:"?•Î¨∏??, role:"?ÄÎ¶?,  jisa:"Ï§ëÎ?ÏßÄ??,  phone:"010-7997-0383", region:"Ï§ëÎ?ÏßÄ??,              managerId:"u03", joinDate:"" },
  { id:"u23", name:"?•ÏÑ±Ïß?, role:"?ÄÎ¶?,  jisa:"Ï§ëÎ?ÏßÄ??,  phone:"010-7349-3988", region:"Ï§ëÎ?ÏßÄ??,              managerId:"u03", joinDate:"" },
  { id:"u24", name:"Ï∞®Ïú§Ï≤?, role:"?ÄÎ¶?,  jisa:"Ï§ëÎ?ÏßÄ??,  phone:"010-8624-3455", region:"Ï§ëÎ?ÏßÄ??,              managerId:"u03", joinDate:"" },
  { id:"u25", name:"?¥Ï¢ÖÎ™?, role:"Ï£ºÏûÑ",  jisa:"Ï§ëÎ?ÏßÄ??,  phone:"010-4179-8000", region:"Ï§ëÎ?ÏßÄ??,              managerId:"u03", joinDate:"" },
  { id:"u30", name:"ÍπÄ?ôÏú§", role:"?ÄÎ¶?,  jisa:"?òÎèÑÍ∂åÎÇ®Î∂Ä",phone:"010-3225-2228", region:"?òÎèÑÍ∂åÎÇ®Î∂Ä",             managerId:"u02", joinDate:"" },
  { id:"u31", name:"Î∞ïÏÉÅ??, role:"?ÄÎ¶?,  jisa:"?òÎèÑÍ∂åÎÇ®Î∂Ä",phone:"010-5480-4121", region:"?òÎèÑÍ∂åÎÇ®Î∂Ä",             managerId:"u02", joinDate:"" },
  { id:"u32", name:"Î∞ïÌõà??, role:"?ÄÎ¶?,  jisa:"?òÎèÑÍ∂åÎÇ®Î∂Ä",phone:"010-3835-7933", region:"?òÎèÑÍ∂åÎÇ®Î∂Ä",             managerId:"u02", joinDate:"" },
  { id:"u33", name:"?úÏÑù??, role:"?ÄÎ¶?,  jisa:"?òÎèÑÍ∂åÎÇ®Î∂Ä",phone:"010-2920-6394", region:"?òÎèÑÍ∂åÎÇ®Î∂Ä",             managerId:"u02", joinDate:"" },
  { id:"u34", name:"?©Ïñ∏Î™?, role:"?ÄÎ¶?,  jisa:"?òÎèÑÍ∂åÎÇ®Î∂Ä",phone:"010-2709-1026", region:"?òÎèÑÍ∂åÎÇ®Î∂Ä",             managerId:"u02", joinDate:"" },
  { id:"u40", name:"ÍπÄÏ§Ä??, role:"?ÄÎ¶?,  jisa:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",phone:"010-2060-6914", region:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",             managerId:"u02", joinDate:"" },
  { id:"u41", name:"Î∞ïÏ???, role:"?ÄÎ¶?,  jisa:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",phone:"010-3033-0323", region:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",             managerId:"u02", joinDate:"" },
  { id:"u42", name:"?àÎ≥ë??, role:"?ÄÎ¶?,  jisa:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",phone:"010-6285-6892", region:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",             managerId:"u02", joinDate:"" },
  { id:"u43", name:"?ëÌòïÏ£?, role:"?ÄÎ¶?,  jisa:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",phone:"010-3234-4175", region:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",             managerId:"u02", joinDate:"" },
  { id:"u44", name:"?¥Ïû¨ÎØ?, role:"?ÄÎ¶?,  jisa:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",phone:"010-7479-6437", region:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",             managerId:"u02", joinDate:"" },
  { id:"u45", name:"Í∞ïÎ™ÖÏß?, role:"Ï£ºÏûÑ",  jisa:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",phone:"010-5545-3670", region:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",             managerId:"u02", joinDate:"" },
  { id:"u46", name:"Í∞ïÌò∏??, role:"Ï£ºÏûÑ",  jisa:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",phone:"010-5923-2966", region:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",             managerId:"u02", joinDate:"" },
  { id:"u47", name:"?•Ìò∏??, role:"Ï£ºÏûÑ",  jisa:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",phone:"010-2083-3500", region:"?òÎèÑÍ∂åÎ∂ÅÎ∂Ä",             managerId:"u02", joinDate:"" },
  { id:"u50", name:"Íµ¨ÏÉÅ??, role:"?ÄÎ¶?,  jisa:"?®Î?ÏßÄ??,  phone:"010-0000-2045", region:"Î∂Ä??,                 managerId:"u10", joinDate:"2013-10-16" },
  { id:"u51", name:"ÏµúÏÑ±??, role:"?ÄÎ¶?,  jisa:"?®Î?ÏßÄ??,  phone:"010-0000-1555", region:"Î∂Ä??,                 managerId:"u10", joinDate:"2014-01-07" },
  { id:"u52", name:"?¥Ìòï??, role:"?ÄÎ¶?,  jisa:"?®Î?ÏßÄ??,  phone:"010-0000-2658", region:"?ÄÍµ¨Í≤ΩÎ∂?,              managerId:"u12", joinDate:"2013-07-01" },
  { id:"u53", name:"?¥ÏÑ†??, role:"?ÄÎ¶?,  jisa:"?®Î?ÏßÄ??,  phone:"010-0000-6333", region:"?ÄÍµ¨Í≤ΩÎ∂?,              managerId:"u12", joinDate:"2018-12-04" },
];

const REASONS  = ["Í∞úÏù∏?¨Ïú†","Î≥ëÍ?","Í≥µÍ?","Í∏∞Ì?"];
const ROLES    = ["Î∂Ä??,"Ï∞®Ïû•","Í≥ºÏû•","?ÄÎ¶?,"Ï£ºÏûÑ"];
const JISAS    = ["Î≥∏ÏÇ¨","?òÎèÑÍ∂åÎ∂ÅÎ∂Ä","?òÎèÑÍ∂åÎÇ®Î∂Ä","Ï§ëÎ?ÏßÄ??,"?®Î?ÏßÄ??];
const ADMIN    = { id:"admin", name:"admin", role:"Í∞úÎ∞ú??, pw:"admin@wibs", jisa:"?ÑÏ≤¥", phone:"", region:null, managerId:null, joinDate:"" };
const LOG_COL  = {AUTH:"#1565C0",APPLY:"#2E7D32",APPROVE:"#4CAF50",REJECT:"#E53935",EDIT:"#F57F17",ERROR:"#B71C1C"};

const getPw    = p => p.replace(/-/g,"").slice(-4);

function calcAnnual(d) {
  if (!d) return "-";
  const today = new Date("2026-05-06"), join = new Date(d);
  const months = (today.getFullYear()-join.getFullYear())*12 + today.getMonth()-join.getMonth();
  let y = today.getFullYear()-join.getFullYear();
  const a = new Date(join); a.setFullYear(today.getFullYear());
  if (today < a) y--;
  if (y < 1) return Math.min(Math.max(months,0), 11);
  return Math.min(15 + (y>=3 ? Math.floor((y-1)/2) : 0), 25);
}

function workedText(d) {
  if (!d) return "ÎØ∏ÏûÖ??;
  const today = new Date("2026-05-06"), join = new Date(d);
  let y = today.getFullYear()-join.getFullYear();
  const a = new Date(join); a.setFullYear(today.getFullYear());
  if (today < a) y--;
  const m = ((today.getFullYear()-join.getFullYear())*12 + today.getMonth()-join.getMonth()) % 12;
  return y > 0 ? `${y}??${m}Í∞úÏõî` : `${(today.getFullYear()-join.getFullYear())*12+today.getMonth()-join.getMonth()}Í∞úÏõî`;
}

function fmtDate(s) {
  if (!s) return "";
  const d = new Date(s);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,"0")}.${String(d.getDate()).padStart(2,"0")}(${["??,"??,"??,"??,"Î™?,"Í∏?,"??][d.getDay()]})`;
}

function initStep(user, users) {
  const mgr = users.find(u => u.id === user.managerId);
  if (!mgr) return "?ÑÎ£å";
  if (mgr.role === "Ï∞®Ïû•") return "Ï∞®Ïû•?πÏù∏?ÄÍ∏?;
  if (mgr.role === "Í≥ºÏû•") return "Í≥ºÏû•?πÏù∏?ÄÍ∏?;
  return "Ï∞®Ïû•?πÏù∏?ÄÍ∏?;
}

const AV_BG = ["#E8E8FF","#E1F5EE","#FFE8E8","#E6F1FB","#EAF3DE","#FFF3E0","#F3E5F5","#E0F7FA","#FCE4EC","#F9FBE7"];
const AV_FG = ["#5046A6","#085041","#C0392B","#0C447C","#27500A","#E65100","#6A1B9A","#006064","#880E4F","#558B2F"];

function Av({name, size=40}) {
  const i = name.charCodeAt(0) % AV_BG.length;
  return <div style={{width:size,height:size,borderRadius:"50%",background:AV_BG[i],color:AV_FG[i],display:"flex",alignItems:"center",justifyContent:"center",fontWeight:600,fontSize:size*0.36,flexShrink:0}}>{name[0]}</div>;
}

function StepBadge({step}) {
  const m = {"Í≥ºÏû•?πÏù∏?ÄÍ∏?:{bg:"#FFF8E1",color:"#F57F17"},"Ï∞®Ïû•?πÏù∏?ÄÍ∏?:{bg:"#E8F4FF",color:"#1565C0"},"?ÑÎ£å":{bg:"#E8F5E9",color:"#2E7D32"},"Î∞òÎ†§":{bg:"#FFF0F0",color:"#C62828"}};
  const s = m[step] || {bg:"#F5F5F5",color:"#999"};
  return <span style={{fontSize:11,padding:"3px 9px",borderRadius:20,background:s.bg,color:s.color,fontWeight:600,whiteSpace:"nowrap"}}>{step}</span>;
}

const PH  = {maxWidth:390,margin:"0 auto",fontFamily:"-apple-system,'Malgun Gothic',sans-serif",background:"#F7F7F9",minHeight:600,position:"relative"};
const TB  = {background:"#fff",padding:"16px 20px 12px",borderBottom:"1px solid #F0F0F0",display:"flex",alignItems:"center",justifyContent:"space-between"};
const BD  = {padding:"12px 16px 90px"};
const NB  = {position:"sticky",bottom:0,background:"#fff",borderTop:"1px solid #F0F0F0",display:"flex",padding:"8px 0 6px"};
const NB_ = a => ({flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,border:"none",background:"transparent",cursor:"pointer",color:a?"#5046A6":"#BBB",fontSize:10,fontWeight:a?600:400,padding:"4px 0"});
const SC  = {background:"#fff",borderRadius:16,marginBottom:10,overflow:"hidden"};
const RW  = last => ({padding:"14px 18px",display:"flex",alignItems:"center",gap:12,borderBottom:last?"none":"1px solid #F7F7F7"});
const INP = {width:"100%",padding:"12px 14px",border:"1.5px solid #EFEFEF",borderRadius:12,fontSize:14,background:"#FAFAFA",color:"#222",boxSizing:"border-box",outline:"none"};
const B1  = (c="#4285F4") => ({flex:1,padding:"13px",background:c,color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:600,cursor:"pointer"});
const B2  = (c="#E53935") => ({flex:1,padding:"13px",background:"#fff",color:c,border:`1.5px solid ${c}`,borderRadius:12,fontSize:14,fontWeight:600,cursor:"pointer"});
const SEL = {width:"100%",padding:"12px 14px",border:"1.5px solid #EFEFEF",borderRadius:12,fontSize:14,background:"#FAFAFA",color:"#222",boxSizing:"border-box"};
const XLBTN = {padding:"8px 14px",background:"#1a7a3c",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:500,cursor:"pointer"};

const IcoHome = () => <svg width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>;
const IcoPlus = () => <svg width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
const IcoList = () => <svg width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></svg>;
const IcoTeam = () => <svg width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.87"/></svg>;
const IcoBell = () => <svg width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
const IcoCog = () => <svg width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
const IcoChev = () => <svg width="15" height="15" fill="none" stroke="#CCC" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoX = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

export default function App() {
  const [users, setUsers]     = useState(INIT_USERS);
  const [reqs,  setReqs]      = useState([]);
  const [logs,  setLogs]      = useState([]);
  const [cu,    setCu]        = useState(null);
  const [loaded, setLoaded]   = useState(false);

  useEffect(() => {
    const qReqs = query(collection(db, "reqs"), orderBy("id", "desc"));
    const unsubReqs = onSnapshot(qReqs, (snap) => {
      setReqs(snap.docs.map(d => d.data()));
    });
    const unsubLogs = onSnapshot(collection(db, "logs"), (snap) => {
      setLogs(snap.docs.map(d => d.data()).sort((a,b) => b.time.localeCompare(a.time)));
    });
    setLoaded(true);
    return () => { unsubReqs(); unsubLogs(); };
  }, []);
 
  const [loginInput, setLoginInput] = useState({name:"", pw:""});
  const [loginErr,   setLoginErr]   = useState("");
  const [tab,   setTab]       = useState("home");
  const [modal, setModal]     = useState(null);
  const [editJoin, setEditJoin] = useState(null);
  const [form,  setForm]      = useState({from:"", to:"", reasonType:"Í∞úÏù∏?¨Ïú†", reasonCustom:""});
  const [doneMsg, setDoneMsg] = useState("");
  const [mgmtMode, setMgmtMode] = useState("list");
  const [selUser,  setSelUser]  = useState(null);
  const [newUser,  setNewUser]  = useState({name:"",role:"?ÄÎ¶?,jisa:"Ï§ëÎ?ÏßÄ??,phone:"010-",region:"",managerId:"",joinDate:""});

  const empById = id => users.find(x => x.id === id) || {};
  const usedDays = uid => reqs.filter(r => r.empId===uid && r.step==="?ÑÎ£å").reduce((s,r) => s+r.days, 0);

  function addLog(type, msg) {
    const log = {time: new Date().toLocaleTimeString("ko-KR"), type, msg};
    addDoc(collection(db, "logs"), log);
  }

  function myPending(u) {
    if (u.role === "Í≥ºÏû•") {
      const ids = users.filter(x => x.managerId===u.id).map(x => x.id);
      return reqs.filter(r => ids.includes(r.empId) && r.step==="Í≥ºÏû•?πÏù∏?ÄÍ∏?);
    }
    if (u.role === "Ï∞®Ïû•") {
      const myR = u.region ? u.region.split("/").map(s => s.trim()) : [];
      return reqs.filter(r => { const e=empById(r.empId); return myR.some(reg => e.region&&e.region.includes(reg)) && r.step==="Ï∞®Ïû•?πÏù∏?ÄÍ∏?; });
    }
    if (u.role === "Î∂Ä??) return reqs.filter(r => r.step==="Ï∞®Ïû•?πÏù∏?ÄÍ∏?);
    return [];
  }

  const [csvModal, setCsvModal] = useState(null);

  function exportExcel(data, filename) {
    const header = ["?¥Î¶Ñ","ÏßÅÍ∏â","ÏßÄ??,"ÏßÄ??,"?úÏûë??,"Ï¢ÖÎ£å??,"?ºÏàò","?¨Ïú†","?ÅÌÉú","Ï≤òÎ¶¨?¥Î†•"].join(",");
    const rows = data.map(r => {
      const e = empById(r.empId);
      const hist = r.history.map(h => `${h.actor}:${h.action}${h.reason?`(${h.reason})`:""}`).join(">");
      return [e.name,e.role,e.jisa,e.region||"",r.from,r.to,r.days,r.reason,r.step,hist]
        .map(v => `"${String(v).replace(/"/g,'""')}"`).join(",");
    });
    const csv = [header,...rows].join("\n");
    setCsvModal({filename, csv});
    addLog("EDIT", `?ëÏ? Ï∂úÎ†•: ${filename} (${data.length}Í±?`);
  }

  function tryLogin() {
    if (loginInput.name.trim()==="admin" && loginInput.pw.trim()==="admin@wibs") {
      addLog("AUTH","Í∞úÎ∞ú??Í≥ÑÏ†ï Î°úÍ∑∏??); setCu(ADMIN); setTab("home"); setLoginErr(""); return;
    }
    const found = users.find(u => u.name===loginInput.name.trim());
    if (!found) { addLog("ERROR",`Î°úÍ∑∏???§Ìå®: ${loginInput.name}`); setLoginErr("?¥Î¶Ñ???ïÏù∏?¥Ï£º?∏Ïöî."); return; }
    if (getPw(found.phone) !== loginInput.pw.trim()) { addLog("ERROR",`ÎπÑÎ?Î≤àÌò∏ Î∂àÏùºÏπ? ${found.name}`); setLoginErr("ÎπÑÎ?Î≤àÌò∏Í∞Ä ?Ä?∏Ïäµ?àÎã§."); return; }
    addLog("AUTH",`Î°úÍ∑∏?? ${found.name} (${found.role}/${found.jisa})`);
    setCu(found); setTab("home"); setLoginErr("");
  }

  function logout() {
    if (cu) addLog("AUTH",`Î°úÍ∑∏?ÑÏõÉ: ${cu.name}`);
    setCu(null); setLoginInput({name:"",pw:""}); setLoginErr(""); setModal(null);
  }

  function submitLeave() {
    const reason = form.reasonType==="Í∏∞Ì?" ? form.reasonCustom.trim() : form.reasonType;
    if (!form.from||!form.to||!reason) { setDoneMsg("Î™®Îì† ??™©???ÖÎ†•??Ï£ºÏÑ∏??"); return; }
    const days = Math.max(1, Math.round((new Date(form.to)-new Date(form.from))/86400000)+1);
    const step = initStep(cu, users);
    const newReq = {id:"r"+Date.now(), empId:cu.id, type:"?∞Ï∞®", from:form.from, to:form.to, days, reason, step, history:[]};
    addDoc(collection(db, "reqs"), newReq);
    addLog("APPLY", `?¥Í??†Ï≤≠: ${cu.name} / ${days}??/ ${reason} ??${step}`);
    setForm({from:"",to:"",reasonType:"Í∞úÏù∏?¨Ïú†",reasonCustom:""});
    setDoneMsg("?†Ï≤≠???ÑÎ£å?êÏñ¥??"); setTimeout(() => { setDoneMsg(""); setTab("home"); }, 1200);
  }

  async function handleApprove(req) {
    let updated;
    if (cu.role==="Í≥ºÏû•") { updated={...req,step:"Ï∞®Ïû•?πÏù∏?ÄÍ∏?,history:[...req.history,{actor:cu.name,action:"Í≥ºÏû•?πÏù∏"}]}; addLog("APPROVE",`Í≥ºÏû•?πÏù∏: ${cu.name}??{empById(req.empId).name}`); }
    else if (cu.role==="Ï∞®Ïû•") { updated={...req,step:"?ÑÎ£å",history:[...req.history,{actor:cu.name,action:"Ï∞®Ïû•?πÏù∏"}]}; addLog("APPROVE",`Ï∞®Ïû•?πÏù∏: ${cu.name}??{empById(req.empId).name}`); }
    else if (cu.role==="Î∂Ä??) { updated={...req,step:"?ÑÎ£å",history:[...req.history,{actor:cu.name,action:"Î∂Ä?•Ïäπ??}]}; addLog("APPROVE",`Î∂Ä?•Ïäπ?? ${cu.name}??{empById(req.empId).name}`); }
    const snap = await getDocs(query(collection(db,"reqs")));
    const docRef = snap.docs.find(d=>d.data().id===req.id);
    if (docRef) await updateDoc(doc(db,"reqs",docRef.id), updated);
    setModal(null);
  }

  async function handleReject(req, reason) {
    const updated = {...req,step:"Î∞òÎ†§",history:[...req.history,{actor:cu.name,action:"Î∞òÎ†§",reason}]};
    const snap = await getDocs(query(collection(db,"reqs")));
    const docRef = snap.docs.find(d=>d.data().id===req.id);
    if (docRef) await updateDoc(doc(db,"reqs",docRef.id), updated);
    addLog("REJECT",`Î∞òÎ†§: ${cu.name}??{empById(req.empId).name} / ${reason}`);
    setModal(null);
  }

  function saveJoin() {
    addLog("EDIT",`?ÖÏÇ¨???òÏ†ï: ${empById(editJoin.uid).name} ??${editJoin.val}`);
    setUsers(users.map(u => u.id===editJoin.uid ? {...u,joinDate:editJoin.val} : u));
    setEditJoin(null);
  }

  function addUser() {
    if (!newUser.name||!newUser.phone) return;
    addLog("EDIT",`?†Í∑úÏ∂îÍ?: ${newUser.name} (${newUser.role}/${newUser.jisa})`);
    setUsers([...users, {...newUser, id:"u"+Date.now()}]);
    setNewUser({name:"",role:"?ÄÎ¶?,jisa:"Ï§ëÎ?ÏßÄ??,phone:"010-",region:"",managerId:"",joinDate:""});
    setMgmtMode("list");
  }

  function removeUser(uid) { addLog("EDIT",`?¥ÏÇ¨: ${empById(uid).name}`); setUsers(users.filter(u=>u.id!==uid)); setSelUser(null); }
  function updateRole(uid, role) { addLog("EDIT",`ÏßÅÍ∏âÎ≥ÄÍ≤? ${empById(uid).name}??{role}`); setUsers(users.map(u=>u.id===uid?{...u,role}:u)); }
  function updateJisa(uid, jisa) { addLog("EDIT",`ÏßÄ?¨Î?Í≤? ${empById(uid).name}??{jisa}`); setUsers(users.map(u=>u.id===uid?{...u,jisa}:u)); }

  function CsvModal() {
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300}}>
        <div style={{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:390,paddingBottom:24}}>
          <div style={{background:"#1a7a3c",borderRadius:"20px 20px 0 0",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{color:"#fff",fontWeight:700,fontSize:15}}>?ì• {csvModal.filename}</div>
            <button onClick={()=>setCsvModal(null)} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><IcoX/></button>
          </div>
          <div style={{padding:"16px"}}>
            <div style={{fontSize:12,color:"#666",marginBottom:10}}>?ÑÎûò ?¥Ïö©???ÑÏ≤¥ ?†ÌÉù ??Î≥µÏÇ¨?òÏó¨ Î©îÎ™®?•Ïóê Î∂ôÏó¨?£Í≥† .csv ?åÏùºÎ°??Ä?•Ìïò?∏Ïöî.</div>
            <textarea readOnly value={csvModal.csv}
              style={{width:"100%",height:200,fontSize:11,fontFamily:"monospace",border:"1.5px solid #EFEFEF",borderRadius:10,padding:"10px",boxSizing:"border-box",resize:"none",background:"#FAFAFA",color:"#333"}}
              onClick={e=>e.target.select()}
            />
            <button onClick={()=>{ navigator.clipboard.writeText(csvModal.csv); }} style={{...B1("#1a7a3c"),borderRadius:12,marginTop:10}}>?ìã ?¥Î¶ΩÎ≥¥Îìú??Î≥µÏÇ¨</button>
          </div>
        </div>
      </div>
    );
  }
  function AnnualCard({user}) {
    const total=calcAnnual(user.joinDate), used=usedDays(user.id);
    const left = typeof total==="number" ? Math.max(total-used,0) : "-";
    return (
      <div style={{background:"rgba(255,255,255,0.15)",borderRadius:14,padding:"14px 16px",marginTop:12}}>
        <div style={{fontSize:11,opacity:0.8,marginBottom:8}}>?ìã ?∞Ï∞® ?ÑÌô© (Í∑ºÎ°úÍ∏∞Ï?Î≤?Í∏∞Ï?)</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,textAlign:"center"}}>
          {[["Ï¥?Í∞Ä??,typeof total==="number"?total+"??:"-"],["?åÏßÑ",typeof total==="number"?used+"??:"-"],["?îÏó¨",typeof left==="number"?left+"??:"-"]].map(([l,v])=>(
            <div key={l} style={{background:"rgba(255,255,255,0.18)",borderRadius:10,padding:"10px 4px"}}>
              <div style={{fontSize:10,opacity:0.85,marginBottom:4}}>{l}</div>
              <div style={{fontSize:18,fontWeight:700}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:11,opacity:0.6,marginTop:8,textAlign:"center"}}>
          {user.joinDate ? `?ÖÏÇ¨ ${user.joinDate} ¬∑ Í∑ºÏÜç ${workedText(user.joinDate)}` : "?ÖÏÇ¨??ÎØ∏ÏûÖ??}
        </div>
      </div>
    );
  }

  function ApproveModal({req}) {
    const e = empById(req.empId);
    const canReject  = cu.role==="Ï∞®Ïû•"||cu.role==="Î∂Ä??;
    const canApprove = (cu.role==="Í≥ºÏû•"&&req.step==="Í≥ºÏû•?πÏù∏?ÄÍ∏?)||(cu.role==="Ï∞®Ïû•"&&req.step==="Ï∞®Ïû•?πÏù∏?ÄÍ∏?)||(cu.role==="Î∂Ä??&&req.step==="Ï∞®Ïû•?πÏù∏?ÄÍ∏?);
    const [showR,setShowR] = useState(false);
    const [lr,setLr]       = useState("");
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200}}>
        <div style={{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:390,paddingBottom:24}}>
          <div style={{background:"#5046A6",borderRadius:"20px 20px 0 0",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:16}}>?¥Í? ?πÏù∏</div>
              <div style={{color:"rgba(255,255,255,0.7)",fontSize:12,marginTop:2}}>{req.step}</div>
            </div>
            <button onClick={()=>setModal(null)} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><IcoX/></button>
          </div>
          <div style={{padding:"0 16px"}}>
            <div style={{padding:"14px 4px 10px"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:"#F9F9F9",borderRadius:14}}>
                <Av name={e.name||"?"} size={42}/>
                <div>
                  <div style={{fontWeight:600,fontSize:15}}>{e.name} <span style={{fontSize:12,color:"#999",fontWeight:400}}>{e.role}</span></div>
                  <div style={{fontSize:12,color:"#999",marginTop:2}}>{e.jisa} ¬∑ {e.region}</div>
                </div>
              </div>
            </div>
            <div style={{background:"#F9F9F9",borderRadius:14,padding:"14px",marginBottom:12}}>
              <div style={{fontSize:28,fontWeight:700,color:"#333",textAlign:"center",padding:"6px 0"}}>{req.days} <span style={{fontSize:16,fontWeight:400}}>??/span></div>
              <div style={{fontSize:13,color:"#666",textAlign:"center",marginBottom:6}}>{fmtDate(req.from)}{req.from!==req.to?` ~ ${fmtDate(req.to)}`:""}</div>
              <div style={{fontSize:13,color:"#888",textAlign:"center"}}>?¨Ïú†: {req.reason}</div>
            </div>
            {req.history.length>0 && (
              <div style={{marginBottom:12}}>
                <div style={{fontSize:11,color:"#999",marginBottom:6}}>Ï≤òÎ¶¨ ?¥Î†•</div>
                {req.history.map((h,i)=>(
                  <div key={i} style={{fontSize:12,color:"#666",padding:"4px 0",borderBottom:"1px solid #F5F5F5",display:"flex",justifyContent:"space-between"}}>
                    <span>{h.actor} ¬∑ {h.action}</span>
                    {h.reason && <span style={{color:"#E53935"}}>{h.reason}</span>}
                  </div>
                ))}
              </div>
            )}
            {showR ? (
              <div>
                <input placeholder="Î∞òÎ†§ ?¨Ïú†" style={{...INP,marginBottom:10}} value={lr} onChange={e=>setLr(e.target.value)}/>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setShowR(false)} style={B2("#999")}>Ï∑®ÏÜå</button>
                  <button onClick={()=>{ if(lr.trim()) handleReject(req,lr); }} style={B2()}>Î∞òÎ†§ ?ïÏ†ï</button>
                </div>
              </div>
            ) : (
              <div style={{display:"flex",gap:10}}>
                {canReject  && <button onClick={()=>setShowR(true)} style={B2()}>Î∞òÎ†§</button>}
                {canApprove && <button onClick={()=>handleApprove(req)} style={B1()}>?πÏù∏</button>}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  function EditJoinModal() {
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:"0 24px"}}>
        <div style={{background:"#fff",borderRadius:20,padding:"24px",width:"100%",maxWidth:340}}>
          <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>?ÖÏÇ¨???òÏ†ï</div>
          <input type="date" style={{...INP,marginBottom:16}} value={editJoin.val} onChange={e=>setEditJoin({...editJoin,val:e.target.value})}/>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setEditJoin(null)} style={B2("#999")}>Ï∑®ÏÜå</button>
            <button onClick={saveJoin} style={B1()}>?Ä??/button>
          </div>
        </div>
      </div>
    );
  }

  function ApplyTab() {
    return (
      <div>
        <div style={{background:"#FFF8E1",borderRadius:14,padding:"12px 16px",marginBottom:12,display:"flex",gap:10,alignItems:"flex-start"}}>
          <span>?ì¢</span>
          <div style={{fontSize:13,color:"#7B5500",lineHeight:1.6}}>?∞Ï∞®?¥Í? ?†Ï≤≠?Ä Í∞ÄÍ∏âÏ†Å <strong>5????/strong>???†Ï≤≠?òÎèÑÎ°??òÏÑ∏??</div>
        </div>
        <div style={SC}>
          <div style={{padding:"16px"}}>
            <div style={{fontSize:12,color:"#999",marginBottom:8}}>Í∏∞Í∞Ñ</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
              <input type="date" style={INP} value={form.from} onChange={e=>setForm({...form,from:e.target.value})}/>
              <input type="date" style={INP} value={form.to}   onChange={e=>setForm({...form,to:e.target.value})}/>
            </div>
            <div style={{fontSize:12,color:"#999",marginBottom:8}}>?¨Ïú†</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:form.reasonType==="Í∏∞Ì?"?10:16}}>
              {REASONS.map(r=>(
                <button key={r} onClick={()=>setForm({...form,reasonType:r,reasonCustom:""})}
                  style={{padding:"12px 4px",border:form.reasonType===r?"2px solid #5046A6":"1.5px solid #EFEFEF",borderRadius:12,background:form.reasonType===r?"#F0EFFE":"#FAFAFA",cursor:"pointer",fontSize:13,fontWeight:form.reasonType===r?600:400,color:form.reasonType===r?"#5046A6":"#666"}}>{r}</button>
              ))}
            </div>
            {form.reasonType==="Í∏∞Ì?" && <input type="text" placeholder="ÏßÅÏ†ë ?ÖÎ†•" style={{...INP,marginBottom:16}} value={form.reasonCustom} onChange={e=>setForm({...form,reasonCustom:e.target.value})}/>}
            {doneMsg
              ? <div style={{textAlign:"center",padding:"13px",background:"#E8F4FF",borderRadius:12,color:"#2196F3",fontWeight:500,fontSize:14}}>{doneMsg}</div>
              : <button onClick={submitLeave} style={{...B1(),borderRadius:12}}>?†Ï≤≠?òÍ∏∞</button>
            }
          </div>
        </div>
      </div>
    );
  }

  // ?Ä?Ä Î°úÍ∑∏???Ä?Ä
  if (!cu) return (
    <div style={{...PH, padding:"36px 24px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{width:56,height:56,borderRadius:16,background:"#5046A6",margin:"0 auto 14px",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <div style={{fontSize:20,fontWeight:700,color:"#222"}}>?∞Ï∞® Í¥ÄÎ¶??úÏä§??/div>
        <div style={{fontSize:13,color:"#999",marginTop:4}}>?¥Î¶ÑÍ≥?ÎπÑÎ?Î≤àÌò∏(?¥Î?????4?êÎ¶¨)Î•??ÖÎ†•?òÏÑ∏??/div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <input placeholder="?¥Î¶Ñ" style={INP} value={loginInput.name} onChange={e=>setLoginInput({...loginInput,name:e.target.value})}/>
        <input placeholder="ÎπÑÎ?Î≤àÌò∏" type="password" style={INP} value={loginInput.pw} onChange={e=>setLoginInput({...loginInput,pw:e.target.value})} onKeyDown={e=>e.key==="Enter"&&tryLogin()}/>
        {loginErr && <div style={{fontSize:13,color:"#E53935",textAlign:"center"}}>{loginErr}</div>}
        <button onClick={tryLogin} style={{...B1(),borderRadius:12,marginTop:4}}>Î°úÍ∑∏??/button>
      </div>
    </div>
  );

  const myReqs = reqs.filter(r => r.empId===cu.id);
  const pend   = myPending(cu);

  // ?Ä?Ä ?ÄÎ¶?Ï£ºÏûÑ ?Ä?Ä
  if (cu.role==="?ÄÎ¶?||cu.role==="Ï£ºÏûÑ") {
    const mgrU    = empById(cu.managerId);
    const grandMgr = mgrU.role==="Í≥ºÏû•" ? empById(mgrU.managerId) : null;
    return (
      <div style={PH}>
        {modal && <ApproveModal req={modal.data}/>}
        <div style={TB}>
          <div style={{fontWeight:700,fontSize:16,color:"#222"}}>{tab==="home"?"??:tab==="apply"?"?¥Í? ?†Ï≤≠":"?†Ï≤≠ ?¥Ïó≠"}</div>
          <button onClick={logout} style={{background:"none",border:"none",fontSize:13,color:"#999",cursor:"pointer"}}>Î°úÍ∑∏?ÑÏõÉ</button>
        </div>
        <div style={BD}>
          {tab==="home" && (
            <div>
              <div style={{background:"#5046A6",borderRadius:20,padding:"20px",marginBottom:12,color:"#fff"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <Av name={cu.name} size={46}/>
                  <div>
                    <div style={{fontWeight:700,fontSize:16}}>{cu.name} <span style={{fontSize:12,fontWeight:400,opacity:0.8}}>{cu.role}</span></div>
                    <div style={{fontSize:12,opacity:0.7,marginTop:2}}>{cu.jisa} ¬∑ {cu.region}</div>
                  </div>
                </div>
                <AnnualCard user={cu}/>
                <div style={{marginTop:10,background:"rgba(255,255,255,0.12)",borderRadius:12,padding:"10px 14px"}}>
                  <div style={{fontSize:11,opacity:0.8}}>?πÏù∏ ?ºÏù∏</div>
                  <div style={{fontSize:13,fontWeight:500,marginTop:4}}>{cu.name} ??{mgrU.name} {mgrU.role}{grandMgr?` ??${grandMgr.name} Ï∞®Ïû•`:""}</div>
                </div>
              </div>
              <div style={{fontSize:12,color:"#999",marginBottom:6,paddingLeft:2}}>ÏµúÍ∑º ?†Ï≤≠</div>
              <div style={SC}>
                {myReqs.length===0 && <div style={{padding:"24px",textAlign:"center",color:"#BBB",fontSize:14}}>?†Ï≤≠ ?¥Ïó≠???ÜÏñ¥??/div>}
                {myReqs.slice(0,3).map((r,i)=>(
                  <div key={r.id} style={RW(i===Math.min(myReqs.length,3)-1)}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{r.type} ¬∑ {r.days}??¬∑ {r.reason}</div>
                      <div style={{fontSize:12,color:"#999",marginTop:2}}>{fmtDate(r.from)}</div>
                    </div>
                    <StepBadge step={r.step}/>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="apply" && <ApplyTab/>}
          {tab==="list" && (
            <div style={SC}>
              {myReqs.length===0 && <div style={{padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>?†Ï≤≠ ?¥Ïó≠???ÜÏñ¥??/div>}
              {myReqs.map((r,i)=>(
                <div key={r.id} style={{...RW(i===myReqs.length-1),flexDirection:"column",alignItems:"stretch",gap:6}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontWeight:600,fontSize:14,color:"#222"}}>{r.type} ¬∑ {r.days}??/div>
                    <StepBadge step={r.step}/>
                  </div>
                  <div style={{fontSize:12,color:"#999"}}>{fmtDate(r.from)}{r.from!==r.to?` ~ ${fmtDate(r.to)}`:""} ¬∑ {r.reason}</div>
                  {r.history.length>0 && r.history[r.history.length-1].reason && <div style={{fontSize:12,color:"#E53935"}}>Î∞òÎ†§: {r.history[r.history.length-1].reason}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={NB}>
          {[["home","??,<IcoHome/>],["apply","?†Ï≤≠",<IcoPlus/>],["list","?¥Ïó≠",<IcoList/>]].map(([k,l,ic])=>(
            <button key={k} onClick={()=>setTab(k)} style={NB_(tab===k)}>{ic}{l}</button>
          ))}
        </div>
      </div>
    );
  }

  // ?Ä?Ä Í≥ºÏû• ?Ä?Ä
  if (cu.role==="Í≥ºÏû•") {
    const myEmpIds = users.filter(x=>x.managerId===cu.id).map(x=>x.id);
    const teamReqs = reqs.filter(r=>myEmpIds.includes(r.empId));
    const mgrU     = empById(cu.managerId);
    return (
      <div style={PH}>
        {modal && <ApproveModal req={modal.data}/>}
        {editJoin && <EditJoinModal/>}
        <div style={TB}>
          <div style={{fontWeight:700,fontSize:16,color:"#222"}}>{tab==="home"?"??:tab==="apply"?"?¥Í? ?†Ï≤≠":tab==="list"?"?Ä ?¥Ïó≠":"?ÖÏÇ¨??Í¥ÄÎ¶?}</div>
          <button onClick={logout} style={{background:"none",border:"none",fontSize:13,color:"#999",cursor:"pointer"}}>Î°úÍ∑∏?ÑÏõÉ</button>
        </div>
        <div style={BD}>
          {tab==="home" && (
            <div>
              <div style={{background:"#5046A6",borderRadius:20,padding:"20px",marginBottom:12,color:"#fff"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <Av name={cu.name} size={46}/>
                  <div>
                    <div style={{fontWeight:700,fontSize:16}}>{cu.name} <span style={{fontSize:12,fontWeight:400,opacity:0.8}}>Í≥ºÏû•</span></div>
                    <div style={{fontSize:12,opacity:0.7,marginTop:2}}>{cu.jisa} ¬∑ {cu.region}</div>
                  </div>
                </div>
                <AnnualCard user={cu}/>
                <div style={{marginTop:10,background:"rgba(255,255,255,0.12)",borderRadius:12,padding:"10px 14px",display:"flex",justifyContent:"space-between"}}>
                  <div><div style={{fontSize:11,opacity:0.8}}>1Ï∞??πÏù∏ ?ÄÍ∏?/div><div style={{fontSize:22,fontWeight:700}}>{pend.length}Í±?/div></div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:11,opacity:0.8}}>Î≥¥Í≥† ?Ä??/div><div style={{fontSize:14,fontWeight:500,marginTop:4}}>{mgrU.name} Ï∞®Ïû•</div></div>
                </div>
              </div>
              <div style={{fontSize:12,color:"#999",marginBottom:6,paddingLeft:2}}>1Ï∞??πÏù∏ ?ÄÍ∏?/div>
              <div style={SC}>
                {pend.length===0 && <div style={{padding:"24px",textAlign:"center",color:"#BBB",fontSize:14}}>?ÄÍ∏??ÜÏùå</div>}
                {pend.map((r,i)=>(
                  <div key={r.id} onClick={()=>setModal({data:r})} style={{...RW(i===pend.length-1),cursor:"pointer"}}>
                    <Av name={empById(r.empId).name||"?"} size={36}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} ¬∑ {r.days}??/div>
                      <div style={{fontSize:12,color:"#999",marginTop:2}}>{fmtDate(r.from)} ¬∑ {r.reason}</div>
                    </div>
                    <IcoChev/>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="apply" && <ApplyTab/>}
          {tab==="list" && (
            <div style={SC}>
              {teamReqs.length===0 && <div style={{padding:"24px",textAlign:"center",color:"#BBB",fontSize:14}}>?¥Ïó≠???ÜÏñ¥??/div>}
              {teamReqs.map((r,i)=>(
                <div key={r.id} style={{...RW(i===teamReqs.length-1),flexDirection:"column",alignItems:"stretch",gap:6}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} ¬∑ {r.days}??/div>
                    <StepBadge step={r.step}/>
                  </div>
                  <div style={{fontSize:12,color:"#999"}}>{fmtDate(r.from)} ¬∑ {r.reason}</div>
                </div>
              ))}
            </div>
          )}
          {tab==="team" && (
            <div>
              <div style={{fontSize:12,color:"#999",marginBottom:8,paddingLeft:2}}>??ï¥???ÖÏÇ¨?ºÏùÑ ?ÖÎ†•?òÏÑ∏??/div>
              <div style={SC}>
                {users.filter(x=>x.managerId===cu.id).map((x,i,arr)=>(
                  <div key={x.id} onClick={()=>setEditJoin({uid:x.id,val:x.joinDate})} style={{...RW(i===arr.length-1),cursor:"pointer"}}>
                    <Av name={x.name} size={36}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{x.name} <span style={{fontSize:12,color:"#999"}}>{x.role}</span></div>
                      <div style={{fontSize:12,color:"#999",marginTop:2}}>{x.joinDate||"ÎØ∏ÏûÖ??}</div>
                    </div>
                    <div style={{fontSize:12,color:"#5046A6"}}>?òÏ†ï</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={NB}>
          {[["home","??,<IcoHome/>],["apply","?†Ï≤≠",<IcoPlus/>],["list","?Ä?¥Ïó≠",<IcoList/>],["team","?ÖÏÇ¨??,<IcoTeam/>]].map(([k,l,ic])=>(
            <button key={k} onClick={()=>setTab(k)} style={NB_(tab===k)}>{ic}{l}</button>
          ))}
        </div>
      </div>
    );
  }

  // ?Ä?Ä Ï∞®Ïû• ?Ä?Ä
  if (cu.role==="Ï∞®Ïû•") {
    const myR      = cu.region ? cu.region.split("/").map(s=>s.trim()) : [];
    const myEmpIds = users.filter(x=>myR.some(r=>x.region&&x.region.includes(r))).map(x=>x.id);
    const allR     = reqs.filter(r=>myEmpIds.includes(r.empId));
    return (
      <div style={PH}>
        {modal && <ApproveModal req={modal.data}/>}
        {editJoin && <EditJoinModal/>}
        {csvModal && <CsvModal/>}
        <div style={TB}>
          <div style={{fontWeight:700,fontSize:16,color:"#222"}}>{tab==="home"?"??:tab==="apply"?"?¥Í? ?†Ï≤≠":tab==="pending"?`?ÄÍ∏?${pend.length})`:tab==="list"?"?ÑÏ≤¥?¥Ïó≠":"?Ä?êÍ?Î¶?}</div>
          <button onClick={logout} style={{background:"none",border:"none",fontSize:13,color:"#999",cursor:"pointer"}}>Î°úÍ∑∏?ÑÏõÉ</button>
        </div>
        <div style={BD}>
          {tab==="home" && (
            <div>
              <div style={{background:"#5046A6",borderRadius:20,padding:"20px",marginBottom:12,color:"#fff"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <Av name={cu.name} size={46}/>
                  <div>
                    <div style={{fontWeight:700,fontSize:16}}>{cu.name} <span style={{fontSize:12,fontWeight:400,opacity:0.8}}>Ï∞®Ïû•</span></div>
                    <div style={{fontSize:12,opacity:0.7,marginTop:2}}>{cu.jisa} ¬∑ {cu.region}</div>
                  </div>
                </div>
                <AnnualCard user={cu}/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
                  {[["?πÏù∏ ?ÄÍ∏?,pend.length+"Í±?],["?¥Îãπ ?∏Ïõê",myEmpIds.length+"Î™?]].map(([l,v])=>(
                    <div key={l} style={{background:"rgba(255,255,255,0.12)",borderRadius:12,padding:"10px 14px"}}>
                      <div style={{fontSize:11,opacity:0.8}}>{l}</div>
                      <div style={{fontSize:20,fontWeight:700,marginTop:4}}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{fontSize:12,color:"#999",marginBottom:6,paddingLeft:2}}>?πÏù∏ ?ÄÍ∏?/div>
              <div style={SC}>
                {pend.length===0 && <div style={{padding:"24px",textAlign:"center",color:"#BBB",fontSize:14}}>?ÄÍ∏??ÜÏùå</div>}
                {pend.slice(0,3).map((r,i)=>(
                  <div key={r.id} onClick={()=>setModal({data:r})} style={{...RW(i===Math.min(pend.length,3)-1),cursor:"pointer"}}>
                    <Av name={empById(r.empId).name||"?"} size={36}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} ¬∑ {r.days}??/div>
                      <div style={{fontSize:12,color:"#999",marginTop:2}}>{fmtDate(r.from)} ¬∑ {r.reason}</div>
                    </div>
                    <IcoChev/>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="apply" && <ApplyTab/>}
          {tab==="pending" && (
            <div style={SC}>
              {pend.length===0 && <div style={{padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>?ÄÍ∏??ÜÏùå</div>}
              {pend.map((r,i)=>(
                <div key={r.id} onClick={()=>setModal({data:r})} style={{...RW(i===pend.length-1),cursor:"pointer"}}>
                  <Av name={empById(r.empId).name||"?"} size={38}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} ¬∑ {r.days}??/div>
                    <div style={{fontSize:12,color:"#999",marginTop:2}}>{empById(r.empId).region} ¬∑ {fmtDate(r.from)}</div>
                  </div>
                  <IcoChev/>
                </div>
              ))}
            </div>
          )}
          {tab==="list" && (
            <div>
              <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
                <button onClick={()=>exportExcel(allR,`?∞Ï∞®?¥Ïó≠_${cu.name}.csv`)} style={XLBTN}>?ì• ?ëÏ? ?Ä??/button>
              </div>
              <div style={SC}>
                {allR.length===0 && <div style={{padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>?¥Ïó≠ ?ÜÏùå</div>}
                {allR.map((r,i)=>(
                  <div key={r.id} style={{...RW(i===allR.length-1),flexDirection:"column",alignItems:"stretch",gap:6}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} ¬∑ {r.days}??/div>
                      <StepBadge step={r.step}/>
                    </div>
                    <div style={{fontSize:12,color:"#999"}}>{empById(r.empId).region} ¬∑ {fmtDate(r.from)} ¬∑ {r.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="team" && (
            <div>
              <div style={{fontSize:12,color:"#999",marginBottom:8,paddingLeft:2}}>??ï¥???ÖÏÇ¨?ºÏùÑ ?òÏ†ï?òÏÑ∏??/div>
              <div style={SC}>
                {users.filter(x=>myR.some(r=>x.region&&x.region.includes(r))&&x.role!=="Î∂Ä??).map((x,i,arr)=>(
                  <div key={x.id} onClick={()=>setEditJoin({uid:x.id,val:x.joinDate})} style={{...RW(i===arr.length-1),cursor:"pointer"}}>
                    <Av name={x.name} size={36}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{x.name} <span style={{fontSize:12,color:"#999"}}>{x.role}</span></div>
                      <div style={{fontSize:12,color:"#999",marginTop:2}}>{x.joinDate||"ÎØ∏ÏûÖ??} ¬∑ ?∞Ï∞® {calcAnnual(x.joinDate)}??/div>
                    </div>
                    <div style={{fontSize:12,color:"#5046A6"}}>?òÏ†ï</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={NB}>
          {[["home","??,<IcoHome/>],["apply","?†Ï≤≠",<IcoPlus/>],["pending","?ÄÍ∏?,<IcoBell/>],["list","?¥Ïó≠",<IcoList/>],["team","?Ä??,<IcoTeam/>]].map(([k,l,ic])=>(
            <button key={k} onClick={()=>setTab(k)} style={NB_(tab===k)}>{ic}{l}</button>
          ))}
        </div>
      </div>
    );
  }

  // ?Ä?Ä Î∂Ä???Ä?Ä
  if (cu.role==="Î∂Ä??) {
    const allPend = reqs.filter(r=>r.step==="Ï∞®Ïû•?πÏù∏?ÄÍ∏?);
    const allDone = reqs.filter(r=>r.step==="?ÑÎ£å"||r.step==="Î∞òÎ†§");
    return (
      <div style={PH}>
        {modal && <ApproveModal req={modal.data}/>}
        {editJoin && <EditJoinModal/>}
        {csvModal && <CsvModal/>}
        <div style={TB}>
          <div style={{fontWeight:700,fontSize:16,color:"#222"}}>{tab==="home"?"?ÑÏ≤¥ ?ÑÌô©":tab==="apply"?"?¥Í? ?†Ï≤≠":tab==="pending"?"ÏßÑÌñâ Ï§?:tab==="done"?"?ÑÎ£å/Î∞òÎ†§":"?∏Ïõê Í¥ÄÎ¶?}</div>
          <button onClick={logout} style={{background:"none",border:"none",fontSize:13,color:"#999",cursor:"pointer"}}>Î°úÍ∑∏?ÑÏõÉ</button>
        </div>
        <div style={BD}>
          {tab==="home" && (
            <div>
              <div style={{background:"#5046A6",borderRadius:20,padding:"20px",marginBottom:12,color:"#fff"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                  <Av name={cu.name} size={46}/>
                  <div>
                    <div style={{fontWeight:700,fontSize:16}}>{cu.name} <span style={{fontSize:12,fontWeight:400,opacity:0.8}}>Î∂Ä??/span></div>
                    <div style={{fontSize:12,opacity:0.7,marginTop:2}}>?ÑÍµ≠ ?ÑÏ≤¥ Í¥Ä??/div>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[["?ÑÏ≤¥",reqs.length],["?ÑÎ£å",reqs.filter(r=>r.step==="?ÑÎ£å").length],["Î∞òÎ†§",reqs.filter(r=>r.step==="Î∞òÎ†§").length]].map(([l,v])=>(
                    <div key={l} style={{background:"rgba(255,255,255,0.15)",borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
                      <div style={{fontSize:11,opacity:0.8}}>{l}</div>
                      <div style={{fontSize:22,fontWeight:700,marginTop:4}}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              {JISAS.filter(j=>j!=="Î≥∏ÏÇ¨").map(jisa=>{
                const jr = reqs.filter(r=>empById(r.empId).jisa===jisa);
                const w  = jr.filter(r=>r.step.includes("?ÄÍ∏?)).length;
                return (
                  <div key={jisa} style={{...SC,padding:"14px 18px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontWeight:600,fontSize:14,color:"#222"}}>{jisa}</div>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <span style={{fontSize:12,color:"#999"}}>?ÑÏ≤¥ {jr.length}Í±?/span>
                      {w>0 && <span style={{fontSize:12,color:"#F57F17",fontWeight:600}}>?ÄÍ∏?{w}Í±?/span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {tab==="apply" && <ApplyTab/>}
          {tab==="pending" && (
            <div style={SC}>
              {allPend.length===0 && <div style={{padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>ÏßÑÌñâ Ï§ëÏù∏ ?†Ï≤≠???ÜÏñ¥??/div>}
              {allPend.map((r,i)=>(
                <div key={r.id} onClick={()=>setModal({data:r})} style={{...RW(i===allPend.length-1),cursor:"pointer"}}>
                  <Av name={empById(r.empId).name||"?"} size={38}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} ¬∑ {r.days}??/div>
                    <div style={{fontSize:12,color:"#999",marginTop:2}}>{empById(r.empId).jisa} ¬∑ {fmtDate(r.from)}</div>
                  </div>
                  <StepBadge step={r.step}/>
                </div>
              ))}
            </div>
          )}
          {tab==="done" && (
            <div>
              <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
                <button onClick={()=>exportExcel(reqs,"?ÑÏ≤¥?∞Ï∞®?¥Ïó≠.csv")} style={XLBTN}>?ì• ?ÑÏ≤¥ ?ëÏ? ?Ä??/button>
              </div>
              <div style={SC}>
                {allDone.length===0 && <div style={{padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>?¥Ïó≠???ÜÏñ¥??/div>}
                {allDone.map((r,i)=>(
                  <div key={r.id} style={{...RW(i===allDone.length-1),flexDirection:"column",alignItems:"stretch",gap:6}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} ¬∑ {r.days}??/div>
                      <StepBadge step={r.step}/>
                    </div>
                    <div style={{fontSize:12,color:"#999"}}>{empById(r.empId).jisa} ¬∑ {fmtDate(r.from)} ¬∑ {r.reason}</div>
                    {r.history.map((h,j)=><div key={j} style={{fontSize:11,color:"#BBB"}}>{h.actor} ¬∑ {h.action}{h.reason?` ¬∑ ${h.reason}`:""}</div>)}
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="mgmt" && (
            <div>
              <div style={{display:"flex",gap:8,marginBottom:12}}>
                {[["list","?∏Ïõê Î™©Î°ù"],["add","?†Í∑ú Ï∂îÍ?"],["reset","Ï¥àÍ∏∞??]].map(([k,l])=>(
                  <button key={k} onClick={()=>{setMgmtMode(k);setSelUser(null);}} style={{flex:1,padding:"10px",border:mgmtMode===k?"2px solid #5046A6":"1.5px solid #EFEFEF",borderRadius:12,background:mgmtMode===k?"#F0EFFE":"#fff",color:mgmtMode===k?"#5046A6":"#666",cursor:"pointer",fontWeight:mgmtMode===k?600:400,fontSize:13}}>{l}</button>
                ))}
              </div>
              {mgmtMode==="reset" && (
                <div style={SC}>
                  <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:12}}>
                    <div style={{fontSize:14,color:"#444",lineHeight:1.6}}>?åÏä§???∞Ïù¥?∞Î? Ï¥àÍ∏∞?îÌï©?àÎã§.</div>
                    <button onClick={async()=>{ const snap=await getDocs(collection(db,"reqs")); snap.docs.forEach(d=>deleteDoc(doc(db,"reqs",d.id))); addLog("AUTH","[Î∂Ä?? ?†Ï≤≠?¥Ïó≠ Ï¥àÍ∏∞??);}} style={{width:"100%",padding:"14px",background:"#FFF0F0",border:"1.5px solid #E53935",borderRadius:12,color:"#E53935",fontSize:14,fontWeight:600,cursor:"pointer"}}>?ìã ?†Ï≤≠ ?¥Ïó≠ ?ÑÏ≤¥ Ï¥àÍ∏∞??/button>
                    <button onClick={async()=>{ const snap=await getDocs(collection(db,"logs")); snap.docs.forEach(d=>deleteDoc(doc(db,"logs",d.id)));}} style={{width:"100%",padding:"14px",background:"#FFF8E1",border:"1.5px solid #F57F17",borderRadius:12,color:"#F57F17",fontSize:14,fontWeight:600,cursor:"pointer"}}>?óí ?úÏä§??Î°úÍ∑∏ Ï¥àÍ∏∞??/button>
                    <button onClick={async()=>{ const r=await getDocs(collection(db,"reqs")); r.docs.forEach(d=>deleteDoc(doc(db,"reqs",d.id))); const l=await getDocs(collection(db,"logs")); l.docs.forEach(d=>deleteDoc(doc(db,"logs",d.id))); addLog("AUTH","[Î∂Ä?? ?ÑÏ≤¥ Ï¥àÍ∏∞??);}} style={{width:"100%",padding:"14px",background:"#222",border:"none",borderRadius:12,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer"}}>?†Ô∏è ?ÑÏ≤¥ Ï¥àÍ∏∞??(?†Ï≤≠+Î°úÍ∑∏)</button>
                    <div style={{fontSize:12,color:"#BBB",textAlign:"center"}}>???∏Ïõê ?∞Ïù¥?∞Îäî Ï¥àÍ∏∞?îÎêòÏßÄ ?äÏäµ?àÎã§.</div>
                  </div>
                </div>
              )}
              {mgmtMode==="list" && JISAS.map(jisa=>(
                <div key={jisa} style={{marginBottom:12}}>
                  <div style={{fontSize:12,color:"#999",marginBottom:6,paddingLeft:2}}>{jisa}</div>
                  <div style={SC}>
                    {users.filter(x=>x.jisa===jisa).map((x,i,arr)=>(
                      <div key={x.id} style={{...RW(i===arr.length-1),flexDirection:"column",alignItems:"stretch",gap:8}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <Av name={x.name} size={36}/>
                          <div style={{flex:1}}>
                            <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{x.name}</div>
                            <div style={{fontSize:12,color:"#999"}}>{x.role} ¬∑ {x.phone}</div>
                          </div>
                          <button onClick={()=>setSelUser(selUser===x.id?null:x.id)} style={{padding:"5px 12px",border:"1.5px solid #EFEFEF",borderRadius:8,background:"#fff",color:"#666",cursor:"pointer",fontSize:12}}>{selUser===x.id?"?´Í∏∞":"Í¥ÄÎ¶?}</button>
                        </div>
                        {selUser===x.id && (
                          <div style={{background:"#F9F9F9",borderRadius:12,padding:"12px"}}>
                            <div style={{fontSize:12,color:"#999",marginBottom:8}}>ÏßÅÍ∏â Î≥ÄÍ≤?/div>
                            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                              {ROLES.filter(r=>r!=="Î∂Ä??).map(r=>(
                                <button key={r} onClick={()=>updateRole(x.id,r)} style={{padding:"6px 14px",border:x.role===r?"2px solid #5046A6":"1.5px solid #EFEFEF",borderRadius:10,background:x.role===r?"#F0EFFE":"#fff",color:x.role===r?"#5046A6":"#666",cursor:"pointer",fontSize:12,fontWeight:x.role===r?600:400}}>{r}</button>
                              ))}
                            </div>
                            <div style={{fontSize:12,color:"#999",marginBottom:8}}>ÏßÄ??Î≥ÄÍ≤?/div>
                            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                              {JISAS.filter(j=>j!=="Î≥∏ÏÇ¨"||x.role==="Ï∞®Ïû•").map(j=>(
                                <button key={j} onClick={()=>updateJisa(x.id,j)} style={{padding:"6px 14px",border:x.jisa===j?"2px solid #5046A6":"1.5px solid #EFEFEF",borderRadius:10,background:x.jisa===j?"#F0EFFE":"#fff",color:x.jisa===j?"#5046A6":"#666",cursor:"pointer",fontSize:12,fontWeight:x.jisa===j?600:400}}>{j}</button>
                              ))}
                            </div>
                            <div style={{fontSize:12,color:"#999",marginBottom:6}}>?ÖÏÇ¨??/div>
                            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                              <div style={{flex:1,fontSize:13,color:"#444"}}>{x.joinDate||"ÎØ∏ÏûÖ??}</div>
                              <button onClick={()=>setEditJoin({uid:x.id,val:x.joinDate})} style={{padding:"6px 12px",border:"1.5px solid #5046A6",borderRadius:8,background:"#F0EFFE",color:"#5046A6",cursor:"pointer",fontSize:12}}>?òÏ†ï</button>
                            </div>
                            <button onClick={()=>removeUser(x.id)} style={{width:"100%",padding:"10px",border:"1.5px solid #E53935",borderRadius:10,background:"#FFF0F0",color:"#E53935",cursor:"pointer",fontSize:13,fontWeight:600}}>?¥ÏÇ¨ Ï≤òÎ¶¨ (?úÍ±∞)</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {mgmtMode==="add" && (
                <div style={SC}>
                  <div style={{padding:"16px",display:"flex",flexDirection:"column",gap:12}}>
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>?¥Î¶Ñ</div><input style={INP} placeholder="?¥Î¶Ñ" value={newUser.name} onChange={e=>setNewUser({...newUser,name:e.target.value})}/></div>
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>?¥Î???/div><input style={INP} placeholder="010-0000-0000" value={newUser.phone} onChange={e=>setNewUser({...newUser,phone:e.target.value})}/></div>
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>ÏßÅÍ∏â</div><select style={SEL} value={newUser.role} onChange={e=>setNewUser({...newUser,role:e.target.value})}>{ROLES.filter(r=>r!=="Î∂Ä??).map(r=><option key={r}>{r}</option>)}</select></div>
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>ÏßÄ??/div><select style={SEL} value={newUser.jisa} onChange={e=>setNewUser({...newUser,jisa:e.target.value})}>{JISAS.map(j=><option key={j}>{j}</option>)}</select></div>
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>ÏßÄ??/div><input style={INP} placeholder="?? Î∂Ä?? Í≤ΩÎÇ®" value={newUser.region} onChange={e=>setNewUser({...newUser,region:e.target.value})}/></div>
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>?ÅÏúÑ Í¥ÄÎ¶¨Ïûê</div>
                      <select style={SEL} value={newUser.managerId} onChange={e=>setNewUser({...newUser,managerId:e.target.value})}>
                        <option value="">?†ÌÉù</option>
                        {users.filter(u=>u.role==="Ï∞®Ïû•"||u.role==="Í≥ºÏû•").map(u=><option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                      </select>
                    </div>
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>?ÖÏÇ¨??/div><input type="date" style={INP} value={newUser.joinDate} onChange={e=>setNewUser({...newUser,joinDate:e.target.value})}/></div>
                    <button onClick={addUser} style={{...B1(),borderRadius:12}}>Ï∂îÍ??òÍ∏∞</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div style={NB}>
          {[["home","?ÑÌô©",<IcoHome/>],["apply","?†Ï≤≠",<IcoPlus/>],["pending","ÏßÑÌñâÏ§?,<IcoBell/>],["done","?ÑÎ£å",<IcoList/>],["mgmt","?∏ÏõêÍ¥ÄÎ¶?,<IcoCog/>]].map(([k,l,ic])=>(
            <button key={k} onClick={()=>setTab(k)} style={NB_(tab===k)}>{ic}{l}</button>
          ))}
        </div>
      </div>
    );
  }

  // ?Ä?Ä Í∞úÎ∞ú???Ä?Ä
  if (cu.role==="Í∞úÎ∞ú??) {
    return (
      <div style={PH}>
        <div style={TB}>
          <div style={{fontWeight:700,fontSize:16,color:"#222"}}>{tab==="home"?"?ÑÏ≤¥ ?ÑÌô©":tab==="users"?"?ÑÏ≤¥ ?∏Ïõê":tab==="reqs"?"?ÑÏ≤¥ ?†Ï≤≠":"?úÏä§??Î°úÍ∑∏"}</div>
          <button onClick={logout} style={{background:"none",border:"none",fontSize:13,color:"#999",cursor:"pointer"}}>Î°úÍ∑∏?ÑÏõÉ</button>
        </div>
        <div style={BD}>
          {tab==="home" && (
            <div>
              <div style={{background:"#222",borderRadius:20,padding:"20px",marginBottom:12,color:"#fff"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                  <div style={{width:46,height:46,borderRadius:"50%",background:"#444",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>?õ†</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:16}}>Í∞úÎ∞ú??Í≥ÑÏ†ï</div>
                    <div style={{fontSize:12,opacity:0.6,marginTop:2}}>?ÑÏ≤¥ ?∞Ïù¥???¥Îûå ?ÑÏö©</div>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[["?ÑÏ≤¥ ?∏Ïõê",users.length+"Î™?],["?ÑÏ≤¥ ?†Ï≤≠",reqs.length+"Í±?],["Î°úÍ∑∏",logs.length+"Í±?]].map(([l,v])=>(
                    <div key={l} style={{background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
                      <div style={{fontSize:11,opacity:0.7}}>{l}</div>
                      <div style={{fontSize:20,fontWeight:700,marginTop:4}}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              {JISAS.map(jisa=>{
                const ju = users.filter(u=>u.jisa===jisa).length;
                const jr = reqs.filter(r=>empById(r.empId).jisa===jisa);
                return (
                  <div key={jisa} style={{...SC,padding:"14px 18px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontWeight:600,fontSize:14,color:"#222"}}>{jisa}</div>
                    <div style={{display:"flex",gap:10}}>
                      <span style={{fontSize:12,color:"#999"}}>{ju}Î™?/span>
                      <span style={{fontSize:12,color:"#999"}}>?†Ï≤≠ {jr.length}Í±?/span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {tab==="users" && (
            <div>
              {["Î∂Ä??,"Ï∞®Ïû•","Í≥ºÏû•","?ÄÎ¶?,"Ï£ºÏûÑ"].map(role=>(
                <div key={role} style={{marginBottom:12}}>
                  <div style={{fontSize:12,color:"#999",marginBottom:6,paddingLeft:2}}>{role} ({users.filter(u=>u.role===role).length}Î™?</div>
                  <div style={SC}>
                    {users.filter(u=>u.role===role).map((u,i,arr)=>(
                      <div key={u.id} style={RW(i===arr.length-1)}>
                        <Av name={u.name} size={36}/>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{u.name}</div>
                          <div style={{fontSize:12,color:"#999"}}>{u.jisa} ¬∑ {u.region||"-"} ¬∑ {u.phone}</div>
                          <div style={{fontSize:11,color:"#BBB"}}>?ÖÏÇ¨: {u.joinDate||"ÎØ∏ÏûÖ??} ¬∑ ?∞Ï∞®: {calcAnnual(u.joinDate)}??/div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab==="reqs" && (
            <div style={SC}>
              {reqs.length===0 && <div style={{padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>?†Ï≤≠ ?¥Ïó≠???ÜÏñ¥??/div>}
              {reqs.map((r,i)=>(
                <div key={r.id} style={{...RW(i===reqs.length-1),flexDirection:"column",alignItems:"stretch",gap:6}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} ¬∑ {r.days}??/div>
                    <StepBadge step={r.step}/>
                  </div>
                  <div style={{fontSize:12,color:"#999"}}>{empById(r.empId).jisa} ¬∑ {fmtDate(r.from)} ¬∑ {r.reason}</div>
                  {r.history.map((h,j)=><div key={j} style={{fontSize:11,color:"#BBB"}}>{h.actor} ¬∑ {h.action}{h.reason?` ¬∑ ${h.reason}`:""}</div>)}
                </div>
              ))}
            </div>
          )}
          {tab==="logs" && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,paddingLeft:2}}>
                <div style={{fontSize:12,color:"#999"}}>ÏµúÍ∑º ?¥Î≤§??Î°úÍ∑∏ (ÏµúÎ? 100Í±?</div>
                <button onClick={()=>setLogs([])} style={{fontSize:12,color:"#E53935",border:"none",background:"none",cursor:"pointer"}}>?ÑÏ≤¥ ??†ú</button>
              </div>
              {logs.length===0 && <div style={{...SC,padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>Î°úÍ∑∏Í∞Ä ?ÜÏñ¥??/div>}
              <div style={SC}>
                {logs.map((l,i)=>(
                  <div key={i} style={{padding:"10px 16px",borderBottom:i<logs.length-1?"1px solid #F7F7F7":"none",display:"flex",gap:10,alignItems:"flex-start"}}>
                    <span style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:LOG_COL[l.type]||"#999",color:"#fff",fontWeight:700,flexShrink:0,marginTop:1}}>{l.type}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,color:"#222"}}>{l.msg}</div>
                      <div style={{fontSize:11,color:"#BBB",marginTop:2}}>{l.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={NB}>
          {[["home","?ÑÌô©",<IcoHome/>],["users","?∏Ïõê",<IcoTeam/>],["reqs","?†Ï≤≠",<IcoList/>],["logs","Î°úÍ∑∏",<IcoCog/>]].map(([k,l,ic])=>(
            <button key={k} onClick={()=>setTab(k)} style={NB_(tab===k)}>{ic}{l}</button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
