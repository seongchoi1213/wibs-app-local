import { useState } from "react";

const INIT_USERS = [
  { id:"u00", name:"이경수", role:"부장",  jisa:"본사",      phone:"010-2110-7522", region:null,                   managerId:null,  joinDate:"" },
  { id:"u01", name:"전병준", role:"차장",  jisa:"중부지사",  phone:"010-2241-3646", region:"중부지사",              managerId:"u00", joinDate:"" },
  { id:"u02", name:"정윤영", role:"차장",  jisa:"수도권남부",phone:"010-4716-8114", region:"수도권남부/수도권북부",  managerId:"u00", joinDate:"" },
  { id:"u03", name:"김선용", role:"과장",  jisa:"중부지사",  phone:"010-7173-5945", region:"중부지사",              managerId:"u01", joinDate:"" },
  { id:"u10", name:"최순민", role:"차장",  jisa:"남부지사",  phone:"010-0000-8884", region:"부산/대구경북",          managerId:"u00", joinDate:"2007-09-19" },
  { id:"u11", name:"김성권", role:"차장",  jisa:"남부지사",  phone:"010-0000-7590", region:"경남/제주",             managerId:"u00", joinDate:"2010-07-10" },
  { id:"u12", name:"최성",   role:"과장",  jisa:"남부지사",  phone:"010-0000-9654", region:"대구경북",              managerId:"u10", joinDate:"2013-07-15" },
  { id:"u13", name:"배재열", role:"과장",  jisa:"남부지사",  phone:"010-0000-6756", region:"경남",                 managerId:"u11", joinDate:"2013-12-15" },
  { id:"u14", name:"김도영", role:"과장",  jisa:"남부지사",  phone:"010-0000-9088", region:"제주",                 managerId:"u11", joinDate:"2013-11-18" },
  { id:"u20", name:"김규연", role:"대리",  jisa:"중부지사",  phone:"010-2023-2810", region:"중부지사",              managerId:"u03", joinDate:"" },
  { id:"u21", name:"유근우", role:"대리",  jisa:"중부지사",  phone:"010-2858-6282", region:"중부지사",              managerId:"u03", joinDate:"" },
  { id:"u22", name:"장문석", role:"대리",  jisa:"중부지사",  phone:"010-7997-0383", region:"중부지사",              managerId:"u03", joinDate:"" },
  { id:"u23", name:"장성진", role:"대리",  jisa:"중부지사",  phone:"010-7349-3988", region:"중부지사",              managerId:"u03", joinDate:"" },
  { id:"u24", name:"차윤철", role:"대리",  jisa:"중부지사",  phone:"010-8624-3455", region:"중부지사",              managerId:"u03", joinDate:"" },
  { id:"u25", name:"이종명", role:"주임",  jisa:"중부지사",  phone:"010-4179-8000", region:"중부지사",              managerId:"u03", joinDate:"" },
  { id:"u30", name:"김동윤", role:"대리",  jisa:"수도권남부",phone:"010-3225-2228", region:"수도권남부",             managerId:"u02", joinDate:"" },
  { id:"u31", name:"박상혁", role:"대리",  jisa:"수도권남부",phone:"010-5480-4121", region:"수도권남부",             managerId:"u02", joinDate:"" },
  { id:"u32", name:"박훈희", role:"대리",  jisa:"수도권남부",phone:"010-3835-7933", region:"수도권남부",             managerId:"u02", joinDate:"" },
  { id:"u33", name:"서석현", role:"대리",  jisa:"수도권남부",phone:"010-2920-6394", region:"수도권남부",             managerId:"u02", joinDate:"" },
  { id:"u34", name:"황언모", role:"대리",  jisa:"수도권남부",phone:"010-2709-1026", region:"수도권남부",             managerId:"u02", joinDate:"" },
  { id:"u40", name:"김준연", role:"대리",  jisa:"수도권북부",phone:"010-2060-6914", region:"수도권북부",             managerId:"u02", joinDate:"" },
  { id:"u41", name:"박지영", role:"대리",  jisa:"수도권북부",phone:"010-3033-0323", region:"수도권북부",             managerId:"u02", joinDate:"" },
  { id:"u42", name:"안병욱", role:"대리",  jisa:"수도권북부",phone:"010-6285-6892", region:"수도권북부",             managerId:"u02", joinDate:"" },
  { id:"u43", name:"양형주", role:"대리",  jisa:"수도권북부",phone:"010-3234-4175", region:"수도권북부",             managerId:"u02", joinDate:"" },
  { id:"u44", name:"이재민", role:"대리",  jisa:"수도권북부",phone:"010-7479-6437", region:"수도권북부",             managerId:"u02", joinDate:"" },
  { id:"u45", name:"강명진", role:"주임",  jisa:"수도권북부",phone:"010-5545-3670", region:"수도권북부",             managerId:"u02", joinDate:"" },
  { id:"u46", name:"강호연", role:"주임",  jisa:"수도권북부",phone:"010-5923-2966", region:"수도권북부",             managerId:"u02", joinDate:"" },
  { id:"u47", name:"장호섭", role:"주임",  jisa:"수도권북부",phone:"010-2083-3500", region:"수도권북부",             managerId:"u02", joinDate:"" },
  { id:"u50", name:"구상회", role:"대리",  jisa:"남부지사",  phone:"010-0000-2045", region:"부산",                 managerId:"u10", joinDate:"2013-10-16" },
  { id:"u51", name:"최성일", role:"대리",  jisa:"남부지사",  phone:"010-0000-1555", region:"부산",                 managerId:"u10", joinDate:"2014-01-07" },
  { id:"u52", name:"이형탁", role:"대리",  jisa:"남부지사",  phone:"010-0000-2658", region:"대구경북",              managerId:"u12", joinDate:"2013-07-01" },
  { id:"u53", name:"이선우", role:"대리",  jisa:"남부지사",  phone:"010-0000-6333", region:"대구경북",              managerId:"u12", joinDate:"2018-12-04" },
];

const REASONS  = ["개인사유","병가","공가","기타"];
const ROLES    = ["부장","차장","과장","대리","주임"];
const JISAS    = ["본사","수도권북부","수도권남부","중부지사","남부지사"];
const ADMIN    = { id:"admin", name:"admin", role:"개발자", pw:"admin@wibs", jisa:"전체", phone:"", region:null, managerId:null, joinDate:"" };
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
  if (!d) return "미입력";
  const today = new Date("2026-05-06"), join = new Date(d);
  let y = today.getFullYear()-join.getFullYear();
  const a = new Date(join); a.setFullYear(today.getFullYear());
  if (today < a) y--;
  const m = ((today.getFullYear()-join.getFullYear())*12 + today.getMonth()-join.getMonth()) % 12;
  return y > 0 ? `${y}년 ${m}개월` : `${(today.getFullYear()-join.getFullYear())*12+today.getMonth()-join.getMonth()}개월`;
}

function fmtDate(s) {
  if (!s) return "";
  const d = new Date(s);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,"0")}.${String(d.getDate()).padStart(2,"0")}(${["일","월","화","수","목","금","토"][d.getDay()]})`;
}

function initStep(user, users) {
  const mgr = users.find(u => u.id === user.managerId);
  if (!mgr) return "완료";
  if (mgr.role === "차장") return "차장승인대기";
  if (mgr.role === "과장") return "과장승인대기";
  return "차장승인대기";
}

const AV_BG = ["#E8E8FF","#E1F5EE","#FFE8E8","#E6F1FB","#EAF3DE","#FFF3E0","#F3E5F5","#E0F7FA","#FCE4EC","#F9FBE7"];
const AV_FG = ["#5046A6","#085041","#C0392B","#0C447C","#27500A","#E65100","#6A1B9A","#006064","#880E4F","#558B2F"];

function Av({name, size=40}) {
  const i = name.charCodeAt(0) % AV_BG.length;
  return <div style={{width:size,height:size,borderRadius:"50%",background:AV_BG[i],color:AV_FG[i],display:"flex",alignItems:"center",justifyContent:"center",fontWeight:600,fontSize:size*0.36,flexShrink:0}}>{name[0]}</div>;
}

function StepBadge({step}) {
  const m = {"과장승인대기":{bg:"#FFF8E1",color:"#F57F17"},"차장승인대기":{bg:"#E8F4FF",color:"#1565C0"},"완료":{bg:"#E8F5E9",color:"#2E7D32"},"반려":{bg:"#FFF0F0",color:"#C62828"}};
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
  const [loginInput, setLoginInput] = useState({name:"", pw:""});
  const [loginErr,   setLoginErr]   = useState("");
  const [tab,   setTab]       = useState("home");
  const [modal, setModal]     = useState(null);
  const [editJoin, setEditJoin] = useState(null);
  const [form,  setForm]      = useState({from:"", to:"", reasonType:"개인사유", reasonCustom:""});
  const [doneMsg, setDoneMsg] = useState("");
  const [mgmtMode, setMgmtMode] = useState("list");
  const [selUser,  setSelUser]  = useState(null);
  const [newUser,  setNewUser]  = useState({name:"",role:"대리",jisa:"중부지사",phone:"010-",region:"",managerId:"",joinDate:""});

  const empById = id => users.find(x => x.id === id) || {};
  const usedDays = uid => reqs.filter(r => r.empId===uid && r.step==="완료").reduce((s,r) => s+r.days, 0);

  function addLog(type, msg) {
    setLogs(prev => [{time: new Date().toLocaleTimeString("ko-KR"), type, msg}, ...prev].slice(0,100));
  }

  function myPending(u) {
    if (u.role === "과장") {
      const ids = users.filter(x => x.managerId===u.id).map(x => x.id);
      return reqs.filter(r => ids.includes(r.empId) && r.step==="과장승인대기");
    }
    if (u.role === "차장") {
      const myR = u.region ? u.region.split("/").map(s => s.trim()) : [];
      return reqs.filter(r => { const e=empById(r.empId); return myR.some(reg => e.region&&e.region.includes(reg)) && r.step==="차장승인대기"; });
    }
    if (u.role === "부장") return reqs.filter(r => r.step==="차장승인대기");
    return [];
  }

  const [csvModal, setCsvModal] = useState(null);

  function exportExcel(data, filename) {
    const header = ["이름","직급","지사","지역","시작일","종료일","일수","사유","상태","처리이력"].join(",");
    const rows = data.map(r => {
      const e = empById(r.empId);
      const hist = r.history.map(h => `${h.actor}:${h.action}${h.reason?`(${h.reason})`:""}`).join(">");
      return [e.name,e.role,e.jisa,e.region||"",r.from,r.to,r.days,r.reason,r.step,hist]
        .map(v => `"${String(v).replace(/"/g,'""')}"`).join(",");
    });
    const csv = [header,...rows].join("\n");
    setCsvModal({filename, csv});
    addLog("EDIT", `엑셀 출력: ${filename} (${data.length}건)`);
  }

  function tryLogin() {
    if (loginInput.name.trim()==="admin" && loginInput.pw.trim()==="admin@wibs") {
      addLog("AUTH","개발자 계정 로그인"); setCu(ADMIN); setTab("home"); setLoginErr(""); return;
    }
    const found = users.find(u => u.name===loginInput.name.trim());
    if (!found) { addLog("ERROR",`로그인 실패: ${loginInput.name}`); setLoginErr("이름을 확인해주세요."); return; }
    if (getPw(found.phone) !== loginInput.pw.trim()) { addLog("ERROR",`비밀번호 불일치: ${found.name}`); setLoginErr("비밀번호가 틀렸습니다."); return; }
    addLog("AUTH",`로그인: ${found.name} (${found.role}/${found.jisa})`);
    setCu(found); setTab("home"); setLoginErr("");
  }

  function logout() {
    if (cu) addLog("AUTH",`로그아웃: ${cu.name}`);
    setCu(null); setLoginInput({name:"",pw:""}); setLoginErr(""); setModal(null);
  }

  function submitLeave() {
    const reason = form.reasonType==="기타" ? form.reasonCustom.trim() : form.reasonType;
    if (!form.from||!form.to||!reason) { setDoneMsg("모든 항목을 입력해 주세요."); return; }
    const days = Math.max(1, Math.round((new Date(form.to)-new Date(form.from))/86400000)+1);
    const step = initStep(cu, users);
    setReqs([{id:"r"+Date.now(), empId:cu.id, type:"연차", from:form.from, to:form.to, days, reason, step, history:[]}, ...reqs]);
    addLog("APPLY", `휴가신청: ${cu.name} / ${days}일 / ${reason} → ${step}`);
    setForm({from:"",to:"",reasonType:"개인사유",reasonCustom:""});
    setDoneMsg("신청이 완료됐어요!"); setTimeout(() => { setDoneMsg(""); setTab("home"); }, 1200);
  }

  function handleApprove(req) {
    if (cu.role==="과장") { setReqs(reqs.map(r => r.id===req.id ? {...r,step:"차장승인대기",history:[...r.history,{actor:cu.name,action:"과장승인"}]} : r)); addLog("APPROVE",`과장승인: ${cu.name}→${empById(req.empId).name}`); }
    else if (cu.role==="차장") { setReqs(reqs.map(r => r.id===req.id ? {...r,step:"완료",history:[...r.history,{actor:cu.name,action:"차장승인"}]} : r)); addLog("APPROVE",`차장승인: ${cu.name}→${empById(req.empId).name}`); }
    else if (cu.role==="부장") { setReqs(reqs.map(r => r.id===req.id ? {...r,step:"완료",history:[...r.history,{actor:cu.name,action:"부장승인"}]} : r)); addLog("APPROVE",`부장승인: ${cu.name}→${empById(req.empId).name}`); }
    setModal(null);
  }

  function handleReject(req, reason) {
    setReqs(reqs.map(r => r.id===req.id ? {...r,step:"반려",history:[...r.history,{actor:cu.name,action:"반려",reason}]} : r));
    addLog("REJECT",`반려: ${cu.name}→${empById(req.empId).name} / ${reason}`);
    setModal(null);
  }

  function saveJoin() {
    addLog("EDIT",`입사일 수정: ${empById(editJoin.uid).name} → ${editJoin.val}`);
    setUsers(users.map(u => u.id===editJoin.uid ? {...u,joinDate:editJoin.val} : u));
    setEditJoin(null);
  }

  function addUser() {
    if (!newUser.name||!newUser.phone) return;
    addLog("EDIT",`신규추가: ${newUser.name} (${newUser.role}/${newUser.jisa})`);
    setUsers([...users, {...newUser, id:"u"+Date.now()}]);
    setNewUser({name:"",role:"대리",jisa:"중부지사",phone:"010-",region:"",managerId:"",joinDate:""});
    setMgmtMode("list");
  }

  function removeUser(uid) { addLog("EDIT",`퇴사: ${empById(uid).name}`); setUsers(users.filter(u=>u.id!==uid)); setSelUser(null); }
  function updateRole(uid, role) { addLog("EDIT",`직급변경: ${empById(uid).name}→${role}`); setUsers(users.map(u=>u.id===uid?{...u,role}:u)); }
  function updateJisa(uid, jisa) { addLog("EDIT",`지사변경: ${empById(uid).name}→${jisa}`); setUsers(users.map(u=>u.id===uid?{...u,jisa}:u)); }

  function CsvModal() {
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300}}>
        <div style={{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:390,paddingBottom:24}}>
          <div style={{background:"#1a7a3c",borderRadius:"20px 20px 0 0",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{color:"#fff",fontWeight:700,fontSize:15}}>📥 {csvModal.filename}</div>
            <button onClick={()=>setCsvModal(null)} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff"}}><IcoX/></button>
          </div>
          <div style={{padding:"16px"}}>
            <div style={{fontSize:12,color:"#666",marginBottom:10}}>아래 내용을 전체 선택 후 복사하여 메모장에 붙여넣고 .csv 파일로 저장하세요.</div>
            <textarea readOnly value={csvModal.csv}
              style={{width:"100%",height:200,fontSize:11,fontFamily:"monospace",border:"1.5px solid #EFEFEF",borderRadius:10,padding:"10px",boxSizing:"border-box",resize:"none",background:"#FAFAFA",color:"#333"}}
              onClick={e=>e.target.select()}
            />
            <button onClick={()=>{ navigator.clipboard.writeText(csvModal.csv); }} style={{...B1("#1a7a3c"),borderRadius:12,marginTop:10}}>📋 클립보드에 복사</button>
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
        <div style={{fontSize:11,opacity:0.8,marginBottom:8}}>📋 연차 현황 (근로기준법 기준)</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,textAlign:"center"}}>
          {[["총 가용",typeof total==="number"?total+"일":"-"],["소진",typeof total==="number"?used+"일":"-"],["잔여",typeof left==="number"?left+"일":"-"]].map(([l,v])=>(
            <div key={l} style={{background:"rgba(255,255,255,0.18)",borderRadius:10,padding:"10px 4px"}}>
              <div style={{fontSize:10,opacity:0.85,marginBottom:4}}>{l}</div>
              <div style={{fontSize:18,fontWeight:700}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:11,opacity:0.6,marginTop:8,textAlign:"center"}}>
          {user.joinDate ? `입사 ${user.joinDate} · 근속 ${workedText(user.joinDate)}` : "입사일 미입력"}
        </div>
      </div>
    );
  }

  function ApproveModal({req}) {
    const e = empById(req.empId);
    const canReject  = cu.role==="차장"||cu.role==="부장";
    const canApprove = (cu.role==="과장"&&req.step==="과장승인대기")||(cu.role==="차장"&&req.step==="차장승인대기")||(cu.role==="부장"&&req.step==="차장승인대기");
    const [showR,setShowR] = useState(false);
    const [lr,setLr]       = useState("");
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200}}>
        <div style={{background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:390,paddingBottom:24}}>
          <div style={{background:"#5046A6",borderRadius:"20px 20px 0 0",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:16}}>휴가 승인</div>
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
                  <div style={{fontSize:12,color:"#999",marginTop:2}}>{e.jisa} · {e.region}</div>
                </div>
              </div>
            </div>
            <div style={{background:"#F9F9F9",borderRadius:14,padding:"14px",marginBottom:12}}>
              <div style={{fontSize:28,fontWeight:700,color:"#333",textAlign:"center",padding:"6px 0"}}>{req.days} <span style={{fontSize:16,fontWeight:400}}>일</span></div>
              <div style={{fontSize:13,color:"#666",textAlign:"center",marginBottom:6}}>{fmtDate(req.from)}{req.from!==req.to?` ~ ${fmtDate(req.to)}`:""}</div>
              <div style={{fontSize:13,color:"#888",textAlign:"center"}}>사유: {req.reason}</div>
            </div>
            {req.history.length>0 && (
              <div style={{marginBottom:12}}>
                <div style={{fontSize:11,color:"#999",marginBottom:6}}>처리 이력</div>
                {req.history.map((h,i)=>(
                  <div key={i} style={{fontSize:12,color:"#666",padding:"4px 0",borderBottom:"1px solid #F5F5F5",display:"flex",justifyContent:"space-between"}}>
                    <span>{h.actor} · {h.action}</span>
                    {h.reason && <span style={{color:"#E53935"}}>{h.reason}</span>}
                  </div>
                ))}
              </div>
            )}
            {showR ? (
              <div>
                <input placeholder="반려 사유" style={{...INP,marginBottom:10}} value={lr} onChange={e=>setLr(e.target.value)}/>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setShowR(false)} style={B2("#999")}>취소</button>
                  <button onClick={()=>{ if(lr.trim()) handleReject(req,lr); }} style={B2()}>반려 확정</button>
                </div>
              </div>
            ) : (
              <div style={{display:"flex",gap:10}}>
                {canReject  && <button onClick={()=>setShowR(true)} style={B2()}>반려</button>}
                {canApprove && <button onClick={()=>handleApprove(req)} style={B1()}>승인</button>}
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
          <div style={{fontWeight:700,fontSize:16,marginBottom:16}}>입사일 수정</div>
          <input type="date" style={{...INP,marginBottom:16}} value={editJoin.val} onChange={e=>setEditJoin({...editJoin,val:e.target.value})}/>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setEditJoin(null)} style={B2("#999")}>취소</button>
            <button onClick={saveJoin} style={B1()}>저장</button>
          </div>
        </div>
      </div>
    );
  }

  function ApplyTab() {
    return (
      <div>
        <div style={{background:"#FFF8E1",borderRadius:14,padding:"12px 16px",marginBottom:12,display:"flex",gap:10,alignItems:"flex-start"}}>
          <span>📢</span>
          <div style={{fontSize:13,color:"#7B5500",lineHeight:1.6}}>연차휴가 신청은 가급적 <strong>5일 전</strong>에 신청하도록 하세요.</div>
        </div>
        <div style={SC}>
          <div style={{padding:"16px"}}>
            <div style={{fontSize:12,color:"#999",marginBottom:8}}>기간</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
              <input type="date" style={INP} value={form.from} onChange={e=>setForm({...form,from:e.target.value})}/>
              <input type="date" style={INP} value={form.to}   onChange={e=>setForm({...form,to:e.target.value})}/>
            </div>
            <div style={{fontSize:12,color:"#999",marginBottom:8}}>사유</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:form.reasonType==="기타"?10:16}}>
              {REASONS.map(r=>(
                <button key={r} onClick={()=>setForm({...form,reasonType:r,reasonCustom:""})}
                  style={{padding:"12px 4px",border:form.reasonType===r?"2px solid #5046A6":"1.5px solid #EFEFEF",borderRadius:12,background:form.reasonType===r?"#F0EFFE":"#FAFAFA",cursor:"pointer",fontSize:13,fontWeight:form.reasonType===r?600:400,color:form.reasonType===r?"#5046A6":"#666"}}>{r}</button>
              ))}
            </div>
            {form.reasonType==="기타" && <input type="text" placeholder="직접 입력" style={{...INP,marginBottom:16}} value={form.reasonCustom} onChange={e=>setForm({...form,reasonCustom:e.target.value})}/>}
            {doneMsg
              ? <div style={{textAlign:"center",padding:"13px",background:"#E8F4FF",borderRadius:12,color:"#2196F3",fontWeight:500,fontSize:14}}>{doneMsg}</div>
              : <button onClick={submitLeave} style={{...B1(),borderRadius:12}}>신청하기</button>
            }
          </div>
        </div>
      </div>
    );
  }

  // ── 로그인 ──
  if (!cu) return (
    <div style={{...PH, padding:"36px 24px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{width:56,height:56,borderRadius:16,background:"#5046A6",margin:"0 auto 14px",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <div style={{fontSize:20,fontWeight:700,color:"#222"}}>연차 관리 시스템</div>
        <div style={{fontSize:13,color:"#999",marginTop:4}}>이름과 비밀번호(휴대폰 뒷 4자리)를 입력하세요</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        <input placeholder="이름" style={INP} value={loginInput.name} onChange={e=>setLoginInput({...loginInput,name:e.target.value})}/>
        <input placeholder="비밀번호" type="password" style={INP} value={loginInput.pw} onChange={e=>setLoginInput({...loginInput,pw:e.target.value})} onKeyDown={e=>e.key==="Enter"&&tryLogin()}/>
        {loginErr && <div style={{fontSize:13,color:"#E53935",textAlign:"center"}}>{loginErr}</div>}
        <button onClick={tryLogin} style={{...B1(),borderRadius:12,marginTop:4}}>로그인</button>
      </div>
    </div>
  );

  const myReqs = reqs.filter(r => r.empId===cu.id);
  const pend   = myPending(cu);

  // ── 대리/주임 ──
  if (cu.role==="대리"||cu.role==="주임") {
    const mgrU    = empById(cu.managerId);
    const grandMgr = mgrU.role==="과장" ? empById(mgrU.managerId) : null;
    return (
      <div style={PH}>
        {modal && <ApproveModal req={modal.data}/>}
        <div style={TB}>
          <div style={{fontWeight:700,fontSize:16,color:"#222"}}>{tab==="home"?"홈":tab==="apply"?"휴가 신청":"신청 내역"}</div>
          <button onClick={logout} style={{background:"none",border:"none",fontSize:13,color:"#999",cursor:"pointer"}}>로그아웃</button>
        </div>
        <div style={BD}>
          {tab==="home" && (
            <div>
              <div style={{background:"#5046A6",borderRadius:20,padding:"20px",marginBottom:12,color:"#fff"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <Av name={cu.name} size={46}/>
                  <div>
                    <div style={{fontWeight:700,fontSize:16}}>{cu.name} <span style={{fontSize:12,fontWeight:400,opacity:0.8}}>{cu.role}</span></div>
                    <div style={{fontSize:12,opacity:0.7,marginTop:2}}>{cu.jisa} · {cu.region}</div>
                  </div>
                </div>
                <AnnualCard user={cu}/>
                <div style={{marginTop:10,background:"rgba(255,255,255,0.12)",borderRadius:12,padding:"10px 14px"}}>
                  <div style={{fontSize:11,opacity:0.8}}>승인 라인</div>
                  <div style={{fontSize:13,fontWeight:500,marginTop:4}}>{cu.name} → {mgrU.name} {mgrU.role}{grandMgr?` → ${grandMgr.name} 차장`:""}</div>
                </div>
              </div>
              <div style={{fontSize:12,color:"#999",marginBottom:6,paddingLeft:2}}>최근 신청</div>
              <div style={SC}>
                {myReqs.length===0 && <div style={{padding:"24px",textAlign:"center",color:"#BBB",fontSize:14}}>신청 내역이 없어요</div>}
                {myReqs.slice(0,3).map((r,i)=>(
                  <div key={r.id} style={RW(i===Math.min(myReqs.length,3)-1)}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{r.type} · {r.days}일 · {r.reason}</div>
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
              {myReqs.length===0 && <div style={{padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>신청 내역이 없어요</div>}
              {myReqs.map((r,i)=>(
                <div key={r.id} style={{...RW(i===myReqs.length-1),flexDirection:"column",alignItems:"stretch",gap:6}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontWeight:600,fontSize:14,color:"#222"}}>{r.type} · {r.days}일</div>
                    <StepBadge step={r.step}/>
                  </div>
                  <div style={{fontSize:12,color:"#999"}}>{fmtDate(r.from)}{r.from!==r.to?` ~ ${fmtDate(r.to)}`:""} · {r.reason}</div>
                  {r.history.length>0 && r.history[r.history.length-1].reason && <div style={{fontSize:12,color:"#E53935"}}>반려: {r.history[r.history.length-1].reason}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={NB}>
          {[["home","홈",<IcoHome/>],["apply","신청",<IcoPlus/>],["list","내역",<IcoList/>]].map(([k,l,ic])=>(
            <button key={k} onClick={()=>setTab(k)} style={NB_(tab===k)}>{ic}{l}</button>
          ))}
        </div>
      </div>
    );
  }

  // ── 과장 ──
  if (cu.role==="과장") {
    const myEmpIds = users.filter(x=>x.managerId===cu.id).map(x=>x.id);
    const teamReqs = reqs.filter(r=>myEmpIds.includes(r.empId));
    const mgrU     = empById(cu.managerId);
    return (
      <div style={PH}>
        {modal && <ApproveModal req={modal.data}/>}
        {editJoin && <EditJoinModal/>}
        <div style={TB}>
          <div style={{fontWeight:700,fontSize:16,color:"#222"}}>{tab==="home"?"홈":tab==="apply"?"휴가 신청":tab==="list"?"팀 내역":"입사일 관리"}</div>
          <button onClick={logout} style={{background:"none",border:"none",fontSize:13,color:"#999",cursor:"pointer"}}>로그아웃</button>
        </div>
        <div style={BD}>
          {tab==="home" && (
            <div>
              <div style={{background:"#5046A6",borderRadius:20,padding:"20px",marginBottom:12,color:"#fff"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <Av name={cu.name} size={46}/>
                  <div>
                    <div style={{fontWeight:700,fontSize:16}}>{cu.name} <span style={{fontSize:12,fontWeight:400,opacity:0.8}}>과장</span></div>
                    <div style={{fontSize:12,opacity:0.7,marginTop:2}}>{cu.jisa} · {cu.region}</div>
                  </div>
                </div>
                <AnnualCard user={cu}/>
                <div style={{marginTop:10,background:"rgba(255,255,255,0.12)",borderRadius:12,padding:"10px 14px",display:"flex",justifyContent:"space-between"}}>
                  <div><div style={{fontSize:11,opacity:0.8}}>1차 승인 대기</div><div style={{fontSize:22,fontWeight:700}}>{pend.length}건</div></div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:11,opacity:0.8}}>보고 대상</div><div style={{fontSize:14,fontWeight:500,marginTop:4}}>{mgrU.name} 차장</div></div>
                </div>
              </div>
              <div style={{fontSize:12,color:"#999",marginBottom:6,paddingLeft:2}}>1차 승인 대기</div>
              <div style={SC}>
                {pend.length===0 && <div style={{padding:"24px",textAlign:"center",color:"#BBB",fontSize:14}}>대기 없음</div>}
                {pend.map((r,i)=>(
                  <div key={r.id} onClick={()=>setModal({data:r})} style={{...RW(i===pend.length-1),cursor:"pointer"}}>
                    <Av name={empById(r.empId).name||"?"} size={36}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} · {r.days}일</div>
                      <div style={{fontSize:12,color:"#999",marginTop:2}}>{fmtDate(r.from)} · {r.reason}</div>
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
              {teamReqs.length===0 && <div style={{padding:"24px",textAlign:"center",color:"#BBB",fontSize:14}}>내역이 없어요</div>}
              {teamReqs.map((r,i)=>(
                <div key={r.id} style={{...RW(i===teamReqs.length-1),flexDirection:"column",alignItems:"stretch",gap:6}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} · {r.days}일</div>
                    <StepBadge step={r.step}/>
                  </div>
                  <div style={{fontSize:12,color:"#999"}}>{fmtDate(r.from)} · {r.reason}</div>
                </div>
              ))}
            </div>
          )}
          {tab==="team" && (
            <div>
              <div style={{fontSize:12,color:"#999",marginBottom:8,paddingLeft:2}}>탭해서 입사일을 입력하세요</div>
              <div style={SC}>
                {users.filter(x=>x.managerId===cu.id).map((x,i,arr)=>(
                  <div key={x.id} onClick={()=>setEditJoin({uid:x.id,val:x.joinDate})} style={{...RW(i===arr.length-1),cursor:"pointer"}}>
                    <Av name={x.name} size={36}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{x.name} <span style={{fontSize:12,color:"#999"}}>{x.role}</span></div>
                      <div style={{fontSize:12,color:"#999",marginTop:2}}>{x.joinDate||"미입력"}</div>
                    </div>
                    <div style={{fontSize:12,color:"#5046A6"}}>수정</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={NB}>
          {[["home","홈",<IcoHome/>],["apply","신청",<IcoPlus/>],["list","팀내역",<IcoList/>],["team","입사일",<IcoTeam/>]].map(([k,l,ic])=>(
            <button key={k} onClick={()=>setTab(k)} style={NB_(tab===k)}>{ic}{l}</button>
          ))}
        </div>
      </div>
    );
  }

  // ── 차장 ──
  if (cu.role==="차장") {
    const myR      = cu.region ? cu.region.split("/").map(s=>s.trim()) : [];
    const myEmpIds = users.filter(x=>myR.some(r=>x.region&&x.region.includes(r))).map(x=>x.id);
    const allR     = reqs.filter(r=>myEmpIds.includes(r.empId));
    return (
      <div style={PH}>
        {modal && <ApproveModal req={modal.data}/>}
        {editJoin && <EditJoinModal/>}
        {csvModal && <CsvModal/>}
        <div style={TB}>
          <div style={{fontWeight:700,fontSize:16,color:"#222"}}>{tab==="home"?"홈":tab==="apply"?"휴가 신청":tab==="pending"?`대기(${pend.length})`:tab==="list"?"전체내역":"팀원관리"}</div>
          <button onClick={logout} style={{background:"none",border:"none",fontSize:13,color:"#999",cursor:"pointer"}}>로그아웃</button>
        </div>
        <div style={BD}>
          {tab==="home" && (
            <div>
              <div style={{background:"#5046A6",borderRadius:20,padding:"20px",marginBottom:12,color:"#fff"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <Av name={cu.name} size={46}/>
                  <div>
                    <div style={{fontWeight:700,fontSize:16}}>{cu.name} <span style={{fontSize:12,fontWeight:400,opacity:0.8}}>차장</span></div>
                    <div style={{fontSize:12,opacity:0.7,marginTop:2}}>{cu.jisa} · {cu.region}</div>
                  </div>
                </div>
                <AnnualCard user={cu}/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
                  {[["승인 대기",pend.length+"건"],["담당 인원",myEmpIds.length+"명"]].map(([l,v])=>(
                    <div key={l} style={{background:"rgba(255,255,255,0.12)",borderRadius:12,padding:"10px 14px"}}>
                      <div style={{fontSize:11,opacity:0.8}}>{l}</div>
                      <div style={{fontSize:20,fontWeight:700,marginTop:4}}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{fontSize:12,color:"#999",marginBottom:6,paddingLeft:2}}>승인 대기</div>
              <div style={SC}>
                {pend.length===0 && <div style={{padding:"24px",textAlign:"center",color:"#BBB",fontSize:14}}>대기 없음</div>}
                {pend.slice(0,3).map((r,i)=>(
                  <div key={r.id} onClick={()=>setModal({data:r})} style={{...RW(i===Math.min(pend.length,3)-1),cursor:"pointer"}}>
                    <Av name={empById(r.empId).name||"?"} size={36}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} · {r.days}일</div>
                      <div style={{fontSize:12,color:"#999",marginTop:2}}>{fmtDate(r.from)} · {r.reason}</div>
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
              {pend.length===0 && <div style={{padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>대기 없음</div>}
              {pend.map((r,i)=>(
                <div key={r.id} onClick={()=>setModal({data:r})} style={{...RW(i===pend.length-1),cursor:"pointer"}}>
                  <Av name={empById(r.empId).name||"?"} size={38}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} · {r.days}일</div>
                    <div style={{fontSize:12,color:"#999",marginTop:2}}>{empById(r.empId).region} · {fmtDate(r.from)}</div>
                  </div>
                  <IcoChev/>
                </div>
              ))}
            </div>
          )}
          {tab==="list" && (
            <div>
              <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
                <button onClick={()=>exportExcel(allR,`연차내역_${cu.name}.csv`)} style={XLBTN}>📥 엑셀 저장</button>
              </div>
              <div style={SC}>
                {allR.length===0 && <div style={{padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>내역 없음</div>}
                {allR.map((r,i)=>(
                  <div key={r.id} style={{...RW(i===allR.length-1),flexDirection:"column",alignItems:"stretch",gap:6}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} · {r.days}일</div>
                      <StepBadge step={r.step}/>
                    </div>
                    <div style={{fontSize:12,color:"#999"}}>{empById(r.empId).region} · {fmtDate(r.from)} · {r.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="team" && (
            <div>
              <div style={{fontSize:12,color:"#999",marginBottom:8,paddingLeft:2}}>탭해서 입사일을 수정하세요</div>
              <div style={SC}>
                {users.filter(x=>myR.some(r=>x.region&&x.region.includes(r))&&x.role!=="부장").map((x,i,arr)=>(
                  <div key={x.id} onClick={()=>setEditJoin({uid:x.id,val:x.joinDate})} style={{...RW(i===arr.length-1),cursor:"pointer"}}>
                    <Av name={x.name} size={36}/>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{x.name} <span style={{fontSize:12,color:"#999"}}>{x.role}</span></div>
                      <div style={{fontSize:12,color:"#999",marginTop:2}}>{x.joinDate||"미입력"} · 연차 {calcAnnual(x.joinDate)}일</div>
                    </div>
                    <div style={{fontSize:12,color:"#5046A6"}}>수정</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={NB}>
          {[["home","홈",<IcoHome/>],["apply","신청",<IcoPlus/>],["pending","대기",<IcoBell/>],["list","내역",<IcoList/>],["team","팀원",<IcoTeam/>]].map(([k,l,ic])=>(
            <button key={k} onClick={()=>setTab(k)} style={NB_(tab===k)}>{ic}{l}</button>
          ))}
        </div>
      </div>
    );
  }

  // ── 부장 ──
  if (cu.role==="부장") {
    const allPend = reqs.filter(r=>r.step==="차장승인대기");
    const allDone = reqs.filter(r=>r.step==="완료"||r.step==="반려");
    return (
      <div style={PH}>
        {modal && <ApproveModal req={modal.data}/>}
        {editJoin && <EditJoinModal/>}
        {csvModal && <CsvModal/>}
        <div style={TB}>
          <div style={{fontWeight:700,fontSize:16,color:"#222"}}>{tab==="home"?"전체 현황":tab==="apply"?"휴가 신청":tab==="pending"?"진행 중":tab==="done"?"완료/반려":"인원 관리"}</div>
          <button onClick={logout} style={{background:"none",border:"none",fontSize:13,color:"#999",cursor:"pointer"}}>로그아웃</button>
        </div>
        <div style={BD}>
          {tab==="home" && (
            <div>
              <div style={{background:"#5046A6",borderRadius:20,padding:"20px",marginBottom:12,color:"#fff"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                  <Av name={cu.name} size={46}/>
                  <div>
                    <div style={{fontWeight:700,fontSize:16}}>{cu.name} <span style={{fontSize:12,fontWeight:400,opacity:0.8}}>부장</span></div>
                    <div style={{fontSize:12,opacity:0.7,marginTop:2}}>전국 전체 관할</div>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[["전체",reqs.length],["완료",reqs.filter(r=>r.step==="완료").length],["반려",reqs.filter(r=>r.step==="반려").length]].map(([l,v])=>(
                    <div key={l} style={{background:"rgba(255,255,255,0.15)",borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
                      <div style={{fontSize:11,opacity:0.8}}>{l}</div>
                      <div style={{fontSize:22,fontWeight:700,marginTop:4}}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              {JISAS.filter(j=>j!=="본사").map(jisa=>{
                const jr = reqs.filter(r=>empById(r.empId).jisa===jisa);
                const w  = jr.filter(r=>r.step.includes("대기")).length;
                return (
                  <div key={jisa} style={{...SC,padding:"14px 18px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontWeight:600,fontSize:14,color:"#222"}}>{jisa}</div>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <span style={{fontSize:12,color:"#999"}}>전체 {jr.length}건</span>
                      {w>0 && <span style={{fontSize:12,color:"#F57F17",fontWeight:600}}>대기 {w}건</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {tab==="apply" && <ApplyTab/>}
          {tab==="pending" && (
            <div style={SC}>
              {allPend.length===0 && <div style={{padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>진행 중인 신청이 없어요</div>}
              {allPend.map((r,i)=>(
                <div key={r.id} onClick={()=>setModal({data:r})} style={{...RW(i===allPend.length-1),cursor:"pointer"}}>
                  <Av name={empById(r.empId).name||"?"} size={38}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} · {r.days}일</div>
                    <div style={{fontSize:12,color:"#999",marginTop:2}}>{empById(r.empId).jisa} · {fmtDate(r.from)}</div>
                  </div>
                  <StepBadge step={r.step}/>
                </div>
              ))}
            </div>
          )}
          {tab==="done" && (
            <div>
              <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}>
                <button onClick={()=>exportExcel(reqs,"전체연차내역.csv")} style={XLBTN}>📥 전체 엑셀 저장</button>
              </div>
              <div style={SC}>
                {allDone.length===0 && <div style={{padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>내역이 없어요</div>}
                {allDone.map((r,i)=>(
                  <div key={r.id} style={{...RW(i===allDone.length-1),flexDirection:"column",alignItems:"stretch",gap:6}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                      <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} · {r.days}일</div>
                      <StepBadge step={r.step}/>
                    </div>
                    <div style={{fontSize:12,color:"#999"}}>{empById(r.empId).jisa} · {fmtDate(r.from)} · {r.reason}</div>
                    {r.history.map((h,j)=><div key={j} style={{fontSize:11,color:"#BBB"}}>{h.actor} · {h.action}{h.reason?` · ${h.reason}`:""}</div>)}
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab==="mgmt" && (
            <div>
              <div style={{display:"flex",gap:8,marginBottom:12}}>
                {[["list","인원 목록"],["add","신규 추가"],["reset","초기화"]].map(([k,l])=>(
                  <button key={k} onClick={()=>{setMgmtMode(k);setSelUser(null);}} style={{flex:1,padding:"10px",border:mgmtMode===k?"2px solid #5046A6":"1.5px solid #EFEFEF",borderRadius:12,background:mgmtMode===k?"#F0EFFE":"#fff",color:mgmtMode===k?"#5046A6":"#666",cursor:"pointer",fontWeight:mgmtMode===k?600:400,fontSize:13}}>{l}</button>
                ))}
              </div>
              {mgmtMode==="reset" && (
                <div style={SC}>
                  <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:12}}>
                    <div style={{fontSize:14,color:"#444",lineHeight:1.6}}>테스트 데이터를 초기화합니다.</div>
                    <button onClick={()=>{setReqs([]); addLog("AUTH","[부장] 신청내역 초기화");}} style={{width:"100%",padding:"14px",background:"#FFF0F0",border:"1.5px solid #E53935",borderRadius:12,color:"#E53935",fontSize:14,fontWeight:600,cursor:"pointer"}}>📋 신청 내역 전체 초기화</button>
                    <button onClick={()=>setLogs([])} style={{width:"100%",padding:"14px",background:"#FFF8E1",border:"1.5px solid #F57F17",borderRadius:12,color:"#F57F17",fontSize:14,fontWeight:600,cursor:"pointer"}}>🗒 시스템 로그 초기화</button>
                    <button onClick={()=>{setReqs([]); setLogs([]); addLog("AUTH","[부장] 전체 초기화");}} style={{width:"100%",padding:"14px",background:"#222",border:"none",borderRadius:12,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer"}}>⚠️ 전체 초기화 (신청+로그)</button>
                    <div style={{fontSize:12,color:"#BBB",textAlign:"center"}}>※ 인원 데이터는 초기화되지 않습니다.</div>
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
                            <div style={{fontSize:12,color:"#999"}}>{x.role} · {x.phone}</div>
                          </div>
                          <button onClick={()=>setSelUser(selUser===x.id?null:x.id)} style={{padding:"5px 12px",border:"1.5px solid #EFEFEF",borderRadius:8,background:"#fff",color:"#666",cursor:"pointer",fontSize:12}}>{selUser===x.id?"닫기":"관리"}</button>
                        </div>
                        {selUser===x.id && (
                          <div style={{background:"#F9F9F9",borderRadius:12,padding:"12px"}}>
                            <div style={{fontSize:12,color:"#999",marginBottom:8}}>직급 변경</div>
                            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                              {ROLES.filter(r=>r!=="부장").map(r=>(
                                <button key={r} onClick={()=>updateRole(x.id,r)} style={{padding:"6px 14px",border:x.role===r?"2px solid #5046A6":"1.5px solid #EFEFEF",borderRadius:10,background:x.role===r?"#F0EFFE":"#fff",color:x.role===r?"#5046A6":"#666",cursor:"pointer",fontSize:12,fontWeight:x.role===r?600:400}}>{r}</button>
                              ))}
                            </div>
                            <div style={{fontSize:12,color:"#999",marginBottom:8}}>지사 변경</div>
                            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                              {JISAS.filter(j=>j!=="본사"||x.role==="차장").map(j=>(
                                <button key={j} onClick={()=>updateJisa(x.id,j)} style={{padding:"6px 14px",border:x.jisa===j?"2px solid #5046A6":"1.5px solid #EFEFEF",borderRadius:10,background:x.jisa===j?"#F0EFFE":"#fff",color:x.jisa===j?"#5046A6":"#666",cursor:"pointer",fontSize:12,fontWeight:x.jisa===j?600:400}}>{j}</button>
                              ))}
                            </div>
                            <div style={{fontSize:12,color:"#999",marginBottom:6}}>입사일</div>
                            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                              <div style={{flex:1,fontSize:13,color:"#444"}}>{x.joinDate||"미입력"}</div>
                              <button onClick={()=>setEditJoin({uid:x.id,val:x.joinDate})} style={{padding:"6px 12px",border:"1.5px solid #5046A6",borderRadius:8,background:"#F0EFFE",color:"#5046A6",cursor:"pointer",fontSize:12}}>수정</button>
                            </div>
                            <button onClick={()=>removeUser(x.id)} style={{width:"100%",padding:"10px",border:"1.5px solid #E53935",borderRadius:10,background:"#FFF0F0",color:"#E53935",cursor:"pointer",fontSize:13,fontWeight:600}}>퇴사 처리 (제거)</button>
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
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>이름</div><input style={INP} placeholder="이름" value={newUser.name} onChange={e=>setNewUser({...newUser,name:e.target.value})}/></div>
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>휴대폰</div><input style={INP} placeholder="010-0000-0000" value={newUser.phone} onChange={e=>setNewUser({...newUser,phone:e.target.value})}/></div>
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>직급</div><select style={SEL} value={newUser.role} onChange={e=>setNewUser({...newUser,role:e.target.value})}>{ROLES.filter(r=>r!=="부장").map(r=><option key={r}>{r}</option>)}</select></div>
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>지사</div><select style={SEL} value={newUser.jisa} onChange={e=>setNewUser({...newUser,jisa:e.target.value})}>{JISAS.map(j=><option key={j}>{j}</option>)}</select></div>
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>지역</div><input style={INP} placeholder="예: 부산, 경남" value={newUser.region} onChange={e=>setNewUser({...newUser,region:e.target.value})}/></div>
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>상위 관리자</div>
                      <select style={SEL} value={newUser.managerId} onChange={e=>setNewUser({...newUser,managerId:e.target.value})}>
                        <option value="">선택</option>
                        {users.filter(u=>u.role==="차장"||u.role==="과장").map(u=><option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
                      </select>
                    </div>
                    <div><div style={{fontSize:12,color:"#999",marginBottom:6}}>입사일</div><input type="date" style={INP} value={newUser.joinDate} onChange={e=>setNewUser({...newUser,joinDate:e.target.value})}/></div>
                    <button onClick={addUser} style={{...B1(),borderRadius:12}}>추가하기</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div style={NB}>
          {[["home","현황",<IcoHome/>],["apply","신청",<IcoPlus/>],["pending","진행중",<IcoBell/>],["done","완료",<IcoList/>],["mgmt","인원관리",<IcoCog/>]].map(([k,l,ic])=>(
            <button key={k} onClick={()=>setTab(k)} style={NB_(tab===k)}>{ic}{l}</button>
          ))}
        </div>
      </div>
    );
  }

  // ── 개발자 ──
  if (cu.role==="개발자") {
    return (
      <div style={PH}>
        <div style={TB}>
          <div style={{fontWeight:700,fontSize:16,color:"#222"}}>{tab==="home"?"전체 현황":tab==="users"?"전체 인원":tab==="reqs"?"전체 신청":"시스템 로그"}</div>
          <button onClick={logout} style={{background:"none",border:"none",fontSize:13,color:"#999",cursor:"pointer"}}>로그아웃</button>
        </div>
        <div style={BD}>
          {tab==="home" && (
            <div>
              <div style={{background:"#222",borderRadius:20,padding:"20px",marginBottom:12,color:"#fff"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
                  <div style={{width:46,height:46,borderRadius:"50%",background:"#444",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🛠</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:16}}>개발자 계정</div>
                    <div style={{fontSize:12,opacity:0.6,marginTop:2}}>전체 데이터 열람 전용</div>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  {[["전체 인원",users.length+"명"],["전체 신청",reqs.length+"건"],["로그",logs.length+"건"]].map(([l,v])=>(
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
                      <span style={{fontSize:12,color:"#999"}}>{ju}명</span>
                      <span style={{fontSize:12,color:"#999"}}>신청 {jr.length}건</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {tab==="users" && (
            <div>
              {["부장","차장","과장","대리","주임"].map(role=>(
                <div key={role} style={{marginBottom:12}}>
                  <div style={{fontSize:12,color:"#999",marginBottom:6,paddingLeft:2}}>{role} ({users.filter(u=>u.role===role).length}명)</div>
                  <div style={SC}>
                    {users.filter(u=>u.role===role).map((u,i,arr)=>(
                      <div key={u.id} style={RW(i===arr.length-1)}>
                        <Av name={u.name} size={36}/>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{u.name}</div>
                          <div style={{fontSize:12,color:"#999"}}>{u.jisa} · {u.region||"-"} · {u.phone}</div>
                          <div style={{fontSize:11,color:"#BBB"}}>입사: {u.joinDate||"미입력"} · 연차: {calcAnnual(u.joinDate)}일</div>
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
              {reqs.length===0 && <div style={{padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>신청 내역이 없어요</div>}
              {reqs.map((r,i)=>(
                <div key={r.id} style={{...RW(i===reqs.length-1),flexDirection:"column",alignItems:"stretch",gap:6}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div style={{fontWeight:500,fontSize:14,color:"#222"}}>{empById(r.empId).name} · {r.days}일</div>
                    <StepBadge step={r.step}/>
                  </div>
                  <div style={{fontSize:12,color:"#999"}}>{empById(r.empId).jisa} · {fmtDate(r.from)} · {r.reason}</div>
                  {r.history.map((h,j)=><div key={j} style={{fontSize:11,color:"#BBB"}}>{h.actor} · {h.action}{h.reason?` · ${h.reason}`:""}</div>)}
                </div>
              ))}
            </div>
          )}
          {tab==="logs" && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,paddingLeft:2}}>
                <div style={{fontSize:12,color:"#999"}}>최근 이벤트 로그 (최대 100건)</div>
                <button onClick={()=>setLogs([])} style={{fontSize:12,color:"#E53935",border:"none",background:"none",cursor:"pointer"}}>전체 삭제</button>
              </div>
              {logs.length===0 && <div style={{...SC,padding:"32px",textAlign:"center",color:"#BBB",fontSize:14}}>로그가 없어요</div>}
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
          {[["home","현황",<IcoHome/>],["users","인원",<IcoTeam/>],["reqs","신청",<IcoList/>],["logs","로그",<IcoCog/>]].map(([k,l,ic])=>(
            <button key={k} onClick={()=>setTab(k)} style={NB_(tab===k)}>{ic}{l}</button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
