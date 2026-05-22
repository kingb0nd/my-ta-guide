import { useState, useRef, useEffect, createContext, useContext } from "react";



const LangCtx = createContext('ru');
const useLang = () => useContext(LangCtx);

const T = {
  ru: {
    appTitle: "TECH ART",
    appSub: "ПОДГОТОВКА К ИНТЕРВЬЮ",
    suit: "Суть", analogy: "Аналогия", interview: "На интервью",
    why: "Зачем", howWorks: "Как работает", mistakes: "Ошибки",
    showAnswer: "🎯 Показать ответ / Show Answer",
    knew: "✓ Знал / Knew it", didntKnow: "✗ Не знал / Didn't know",
    inDev: "Модуль в разработке",
    tabs: {
      linalg:"Линейная алгебра", gpu:"GPU vs CPU", hlsl:"HLSL",
      rendering:"UE5 Rendering", optimization:"Оптимизация",
      materials:"Материалы", lighting:"Освещение",
      cpp:"C++ в Unreal",
      ui:"UMG / UI Tech",
      vertex:"Вертекс и Анимация", effects:"Эффекты",
      pipeline:"Pipeline/Tools", maya:"Maya / Max", mock:"Mock Interview",
    },
    mods: {
      linalg:"МОДУЛЬ 01", gpu:"МОДУЛЬ 02", hlsl:"МОДУЛЬ 03",
      rendering:"МОДУЛЬ 04", optimization:"МОДУЛЬ 05",
      materials:"МОДУЛЬ 06", lighting:"МОДУЛЬ 07",
      cpp:"МОДУЛЬ — C++",
      ui:"МОДУЛЬ — UI",
      vertex:"МОДУЛЬ 08", effects:"МОДУЛЬ 09",
      pipeline:"МОДУЛЬ 10", maya:"МОДУЛЬ 11", mock:"ТРЕНИРОВКА",
    },
    modDesc: {
      linalg:"Базис для шейдеров и любого разговора о графике на интервью.",
      gpu:"Архитектура, пайплайн, узкие места.",
      hlsl:"Типы, операции, структура шейдеров.",
      rendering:"Deferred pipeline, G-Buffer, Lumen, Nanite, VSM.",
      optimization:"Профайлинг, LOD, instancing, текстуры, overdraw.",
      materials:"PBR теория, Material Graph, Instances, Functions, WPO.",
      lighting:"Direct lighting, GI, IBL, Spherical Harmonics, тени.",
      cpp:"UObject система, макросы, архитектура проекта, GC, делегаты, паттерны.",
      ui:"UMG/Slate, MVVM, Invalidation, Retainer, ListView, материалы в UI, оптимизация.",
      cpp:"UObject system, macros, project architecture, GC, delegates, patterns.",
      ui:"UMG/Slate, MVVM, Invalidation, Retainer, ListView, UI materials, optimization.",
      vertex:"WPO, Vertex Color, VAT, Skeletal Mesh, Morph Targets.",
      effects:"Post-Process материалы, Niagara, Render Targets.",
      pipeline:"Python, EUW, FBX, Коллизии, Лайтмапы, CVars.",
      maya:"Python API — cmds vs PyMEL, основные операции.",
      mock:"Вопросы как на реальном интервью. Отвечай вслух, потом смотри ответ.",
    },
  },
  en: {
    appTitle: "TECH ART",
    appSub: "INTERVIEW PREP",
    suit: "Core Idea", analogy: "Analogy", interview: "In Interview",
    why: "Why", howWorks: "How It Works", mistakes: "Common Mistakes",
    showAnswer: "🎯 Show Answer",
    knew: "✓ Knew it", didntKnow: "✗ Didn't know",
    inDev: "Module in development",
    tabs: {
      linalg:"Linear Algebra", gpu:"GPU vs CPU", hlsl:"HLSL",
      rendering:"UE5 Rendering", optimization:"Optimization",
      materials:"Materials", lighting:"Lighting",
      cpp:"C++ in Unreal",
      ui:"UMG / UI Tech",
      vertex:"Vertex & Animation", effects:"Effects",
      pipeline:"Pipeline/Tools", maya:"Maya / Max", mock:"Mock Interview",
    },
    mods: {
      linalg:"MODULE 01", gpu:"MODULE 02", hlsl:"MODULE 03",
      rendering:"MODULE 04", optimization:"MODULE 05",
      materials:"MODULE 06", lighting:"MODULE 07",
      cpp:"MODULE — C++",
      ui:"MODULE — UI",
      vertex:"MODULE 08", effects:"MODULE 09",
      pipeline:"MODULE 10", maya:"MODULE 11", mock:"PRACTICE",
    },
    modDesc: {
      linalg:"Foundation for shaders and any graphics discussion in interviews.",
      gpu:"Architecture, pipeline, bottlenecks.",
      hlsl:"Types, operations, shader structure.",
      rendering:"Deferred pipeline, G-Buffer, Lumen, Nanite, VSM.",
      optimization:"Profiling, LOD, instancing, textures, overdraw.",
      materials:"PBR theory, Material Graph, Instances, Functions, WPO.",
      lighting:"Direct lighting, GI, IBL, Spherical Harmonics, shadows.",
      cpp:"UObject система, макросы, архитектура проекта, GC, делегаты, паттерны.",
      ui:"UMG/Slate, MVVM, Invalidation, Retainer, ListView, материалы в UI, оптимизация.",
      cpp:"UObject system, macros, project architecture, GC, delegates, patterns.",
      ui:"UMG/Slate, MVVM, Invalidation, Retainer, ListView, UI materials, optimization.",
      vertex:"WPO, Vertex Color, VAT, Skeletal Mesh, Morph Targets.",
      effects:"Post-Process materials, Niagara, Render Targets.",
      pipeline:"Python, EUW, FBX, Collisions, Lightmaps, CVars.",
      maya:"Python API — cmds vs PyMEL, basic operations.",
      mock:"Real interview questions. Answer aloud, then check the answer.",
    },
  },
};

const C = {
  bg:"#0d1117",surface:"#161b28",card:"#1e2438",border:"#2d3550",
  accent:"#00c8ff",orange:"#ff7a45",green:"#3dff90",purple:"#c084fc",
  pink:"#ff5fa3",yellow:"#ffd04a",red:"#ff5566",
  text:"#e8edf8",muted:"#8494b8",dim:"#2e3a55",
};

function drawArrow(ctx,x1,y1,x2,y2,color,label){
  const a=Math.atan2(y2-y1,x2-x1),h=10;
  ctx.strokeStyle=color;ctx.lineWidth=2.5;
  ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  ctx.fillStyle=color;ctx.beginPath();
  ctx.moveTo(x2,y2);
  ctx.lineTo(x2-h*Math.cos(a-0.4),y2-h*Math.sin(a-0.4));
  ctx.lineTo(x2-h*Math.cos(a+0.4),y2-h*Math.sin(a+0.4));
  ctx.closePath();ctx.fill();
  if(label){ctx.font="bold 13px monospace";ctx.fillStyle=color;ctx.fillText(label,x2+8,y2-4);}
}
function drawGrid(ctx,w,h){
  ctx.strokeStyle="#1a1d26";ctx.lineWidth=1;
  for(let x=0;x<=w;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
  for(let y=0;y<=h;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
  ctx.strokeStyle="#2a2e3a";
  ctx.beginPath();ctx.moveTo(0,h/2);ctx.lineTo(w,h/2);ctx.stroke();
  ctx.beginPath();ctx.moveTo(w/2,0);ctx.lineTo(w/2,h);ctx.stroke();
}


function LearnCard({tabs, tabsEn}){
  const lang=useLang();
  const activeTabs = (lang==='en' && tabsEn) ? tabsEn : tabs;
  const keys=Object.keys(activeTabs);
  const [activeKey,setActiveKey]=useState(keys[0]);
  // Always use a valid key — reset when lang changes
  const active = activeTabs[activeKey] !== undefined ? activeKey : keys[0];
  useEffect(()=>setActiveKey(Object.keys((lang==='en'&&tabsEn)?tabsEn:tabs)[0]),[lang,tabs,tabsEn]);
  const icons={"Суть":"🔍","Аналогия":"💡","На интервью":"🎯","Зачем":"❓","Как работает":"⚙","Ошибки":"⚠","Core Idea":"🔍","Analogy":"💡","In Interview":"🎯","Why":"❓","How It Works":"⚙","Common Mistakes":"⚠"};
  return(
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden",marginBottom:16}}>
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,flexWrap:"wrap"}}>
        {keys.map(k=>(<button key={k} onClick={()=>setActiveKey(k)} style={{flex:1,minWidth:80,padding:"9px 8px",background:active===k?C.bg:"transparent",border:"none",borderBottom:active===k?`2px solid ${C.accent}`:"2px solid transparent",color:active===k?C.accent:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer",transition:"all 0.15s",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><span>{icons[k]||"·"}</span>{k}</button>))}
      </div>
      <div style={{padding:"16px 18px",fontSize:14,color:C.text,lineHeight:1.8,minHeight:80,fontFamily:"system-ui,-apple-system,sans-serif"}}>
        {typeof activeTabs[active]==="string"
          ? <div dangerouslySetInnerHTML={{__html:activeTabs[active]}}/>
          : activeTabs[active]}
      </div>
    </div>
  );
}

function Section({title,tag,children,defaultOpen=true}){
  const [open,setOpen]=useState(defaultOpen);
  return(
    <div style={{marginBottom:20,border:`1px solid ${C.border}`,borderRadius:10}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",background:C.surface,border:"none",padding:"13px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",color:C.text,fontFamily:"monospace",fontSize:13,fontWeight:700,borderBottom:open?`1px solid ${C.border}`:"none",borderRadius:open?"10px 10px 0 0":"10px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {tag&&<span style={{fontSize:10,color:C.muted,background:C.dim,padding:"2px 6px",borderRadius:4}}>{tag}</span>}
          {title}
        </div>
        <span style={{color:C.muted,fontSize:18,transform:open?"rotate(90deg)":"none",transition:"transform 0.2s",display:"inline-block"}}>›</span>
      </button>
      {open&&<div style={{padding:20,background:C.bg,borderRadius:"0 0 10px 10px",overflowX:"auto"}}>{children}</div>}
    </div>
  );
}

function Code({children,lang="hlsl"}){
  const lines=children.trim().split("\n");
  return(
    <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",marginTop:8}}>
      <div style={{background:C.surface,padding:"5px 14px",borderBottom:`1px solid ${C.border}`,fontFamily:"monospace",fontSize:10,color:C.muted,letterSpacing:2}}>{lang.toUpperCase()}</div>
      <div style={{padding:"14px 16px",overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
        {lines.map((line,i)=>{
          const colored=line
            .replace(/(\/\/.*)/g,`<span style="color:${C.muted}">$1</span>`)
            .replace(/\b(float[234]?|half[234]?|int|bool|void|struct|return|SamplerState|Texture2D|cbuffer|register|in|out|inout)\b/g,`<span style="color:${C.purple}">$1</span>`)
            .replace(/\b(dot|cross|normalize|lerp|saturate|step|smoothstep|length|reflect|pow|abs|frac|floor|ceil|clamp|mul|tex2D|Sample|SampleLevel)\b/g,`<span style="color:${C.accent}">$1</span>`)
            .replace(/\b(SV_Position|SV_Target|POSITION|NORMAL|TEXCOORD\d*|TANGENT|COLOR)\b/g,`<span style="color:${C.yellow}">$1</span>`)
            .replace(/\b(\d+\.\d+|\d+)\b/g,`<span style="color:${C.orange}">$1</span>`);
          return(<div key={i} style={{display:"flex",gap:12,minHeight:20}}><span style={{color:C.dim,fontFamily:"monospace",fontSize:12,minWidth:20,textAlign:"right",userSelect:"none"}}>{i+1}</span><span style={{fontFamily:"monospace",fontSize:12,color:C.text,lineHeight:1.7,whiteSpace:"pre"}} dangerouslySetInnerHTML={{__html:colored}}/></div>);
        })}
      </div>
    </div>
  );
}

function InfoBox({label,color=C.accent,children}){
  return(
    <div style={{background:color+"12",border:`1px solid ${color}33`,borderRadius:8,padding:"12px 14px",marginTop:12}}>
      {label&&<div style={{fontFamily:"monospace",fontSize:10,color,letterSpacing:2,marginBottom:6}}>{label}</div>}
      <div style={{fontSize:13,color:C.muted,lineHeight:1.8,fontFamily:"system-ui,-apple-system,sans-serif"}}>{children}</div>
    </div>
  );
}

// ══ MODULE 1 — LINEAR ALGEBRA ══════════════════════════════════════════════
function DotProductViz(){
  const lang=useLang();
  const canvasRef=useRef(null);
  const [angle,setAngle]=useState(45);
  const rad=(angle*Math.PI)/180,dot=Math.cos(rad);
  const dotLabel=()=>{
    if(angle===0)return{text:lang==='ru'?"Параллельны (max)":"Parallel (max)",col:C.green};
    if(angle===90)return{text:lang==='ru'?"Перпендикулярны":"Perpendicular",col:C.yellow};
    if(angle===180)return{text:lang==='ru'?"Противоположны":"Opposite",col:C.orange};
    if(angle<90)return{text:lang==='ru'?"Острый угол → свет попадает":"Acute angle → light hits",col:C.accent};
    return{text:lang==='ru'?"Тупой угол → поверхность от света":"Obtuse angle → surface away from light",col:C.muted};
  };
  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext("2d"),W=220,H=220,cx=W/2,cy=H/2,len=82;
    ctx.clearRect(0,0,W,H);drawGrid(ctx,W,H);
    const ax=cx+len,ay=cy,bx=cx+len*Math.cos(-rad),by=cy+len*Math.sin(-rad);
    ctx.strokeStyle=C.green+"55";ctx.lineWidth=1.5;
    ctx.beginPath();ctx.arc(cx,cy,28,-rad,0);ctx.stroke();
    const midA=-rad/2;
    ctx.fillStyle=C.green;ctx.font="11px monospace";
    ctx.fillText(`${angle}°`,cx+34*Math.cos(midA)-4,cy+34*Math.sin(midA)+4);
    const projX=cx+dot*len;
    ctx.setLineDash([4,4]);ctx.strokeStyle="#ffffff18";ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(projX,cy);ctx.stroke();ctx.setLineDash([]);
    ctx.beginPath();ctx.arc(projX,cy,5,0,Math.PI*2);ctx.fillStyle=C.accent+"88";ctx.fill();
    drawArrow(ctx,cx,cy,ax,ay,C.accent,"A");
    drawArrow(ctx,cx,cy,bx,by,C.orange,"B");
    ctx.beginPath();ctx.arc(cx,cy,3.5,0,Math.PI*2);ctx.fillStyle="#ffffff44";ctx.fill();
  },[angle,rad,dot]);
  const{text,col}=dotLabel();
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap",alignItems:"flex-start"}}>
      <div>
        <canvas ref={canvasRef} width={220} height={220} style={{borderRadius:8,border:`1px solid ${C.border}`,display:"block",background:C.bg}}/>
        <div style={{marginTop:10}}>
          <div style={{fontFamily:"monospace",fontSize:11,color:C.muted,marginBottom:4}}>θ = {angle}°</div>
          <input type="range" min={0} max={180} value={angle} onChange={e=>setAngle(Number(e.target.value))} style={{width:220,accentColor:C.accent}}/>
        </div>
      </div>
      <div style={{flex:1,minWidth:200,display:"flex",flexDirection:"column",gap:12}}>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 18px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:4,letterSpacing:1}}>DOT PRODUCT</div>
          <div style={{fontFamily:"monospace",fontSize:36,fontWeight:700,color:C.accent}}>{dot.toFixed(3)}</div>
          <div style={{fontSize:12,color:col,marginTop:4}}>{text}</div>
        </div>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",fontFamily:"monospace",fontSize:12,lineHeight:1.9,color:C.text}}>
          <div style={{color:C.muted,fontSize:10,marginBottom:6}}>{lang==='ru'?"ФОРМУЛА":"FORMULA"}</div>
          <div><span style={{color:C.orange}}>A</span> · <span style={{color:C.accent}}>B</span> = |A||B|·<span style={{color:C.green}}>cos(θ)</span></div>
          <div style={{color:C.muted,marginTop:4,fontSize:11}}>= Ax·Bx + Ay·By + Az·Bz</div>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8,letterSpacing:1}}>{lang==='ru'?"ПРИМЕНЕНИЕ":"APPLICATION"}</div>
          {[{label:"Fresnel",desc:lang==='ru'?"dot(N,V) → свечение краёв":"dot(N,V) → rim glow",col:C.purple},{label:"Lambert",desc:lang==='ru'?"dot(N,L) → диффузный свет":"dot(N,L) → diffuse light",col:C.yellow},{label:"Backface",desc:lang==='ru'?"dot(N,V) < 0 → задняя грань":"dot(N,V) < 0 → backface",col:C.muted}].map(({label,desc,col})=>(
            <div key={label} style={{display:"flex",gap:8,marginBottom:6,alignItems:"center"}}>
              <span style={{fontFamily:"monospace",fontSize:10,color:col,background:col+"18",padding:"2px 6px",borderRadius:4,flexShrink:0}}>{label}</span>
              <span style={{fontSize:12,color:C.muted}}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CrossProductViz(){
  const lang=useLang();
  const [showTBN,setShowTBN]=useState(false);
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap",alignItems:"flex-start"}}>
      <div>
        <svg width={220} height={220} style={{border:`1px solid ${C.border}`,borderRadius:8,background:C.bg,display:"block"}}>
          <defs>{[["arA",C.orange],["arB",C.accent],["arC",C.green],["arT",C.yellow],["arBT",C.purple]].map(([id,col])=>(<marker key={id} id={id} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill={col}/></marker>))}</defs>
          {[...Array(12)].map((_,i)=>(<g key={i}><line x1={i*20} y1={0} x2={i*20} y2={220} stroke="#1a1d26" strokeWidth={1}/><line x1={0} y1={i*20} x2={220} y2={i*20} stroke="#1a1d26" strokeWidth={1}/></g>))}
          <ellipse cx={100} cy={160} rx={70} ry={20} fill="none" stroke="#2a2e3a" strokeWidth={1} strokeDasharray="4,4"/>
          <line x1={100} y1={160} x2={185} y2={160} stroke={C.orange} strokeWidth={2.5} markerEnd="url(#arA)"/>
          <text x={190} y={165} fill={C.orange} fontSize={13} fontFamily="monospace" fontWeight="bold">A</text>
          <line x1={100} y1={160} x2={140} y2={80} stroke={C.accent} strokeWidth={2.5} markerEnd="url(#arB)"/>
          <text x={144} y={76} fill={C.accent} fontSize={13} fontFamily="monospace" fontWeight="bold">B</text>
          <line x1={100} y1={160} x2={100} y2={42} stroke={C.green} strokeWidth={2.5} strokeDasharray={showTBN?"none":"6,3"} markerEnd="url(#arC)"/>
          <text x={106} y={38} fill={C.green} fontSize={10} fontFamily="monospace" fontWeight="bold">A×B</text>
          {showTBN&&(<><line x1={100} y1={160} x2={170} y2={130} stroke={C.yellow} strokeWidth={1.5} markerEnd="url(#arT)"/><text x={172} y={126} fill={C.yellow} fontSize={10} fontFamily="monospace">T</text><line x1={100} y1={160} x2={55} y2={120} stroke={C.purple} strokeWidth={1.5} markerEnd="url(#arBT)"/><text x={30} y={118} fill={C.purple} fontSize={10} fontFamily="monospace">B(T)</text></>)}
          <rect x={100} y={150} width={10} height={10} fill="none" stroke="#ffffff22" strokeWidth={1}/>
          <circle cx={100} cy={160} r={4} fill="#ffffff33"/>
        </svg>
        <button onClick={()=>setShowTBN(!showTBN)} style={{marginTop:10,width:220,padding:"6px 0",background:showTBN?C.purple+"22":"transparent",border:`1px solid ${showTBN?C.purple:C.border}`,borderRadius:6,color:showTBN?C.purple:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>
          {showTBN?lang==='ru'?"▼ скрыть TBN":"▼ hide TBN":lang==='ru'?"▶ показать TBN-матрицу":"▶ show TBN matrix"}
        </button>
      </div>
      <div style={{flex:1,minWidth:200,display:"flex",flexDirection:"column",gap:12}}>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",fontFamily:"monospace",fontSize:12,lineHeight:2,color:C.text}}>
          <div style={{color:C.muted,fontSize:10,marginBottom:4}}>{lang==='ru'?"ФОРМУЛА":"FORMULA"}</div>
          <div>A × B = (</div>
          <div style={{paddingLeft:12}}><span style={{color:C.orange}}>Ay·Bz - Az·By</span>,</div>
          <div style={{paddingLeft:12}}><span style={{color:C.accent}}>Az·Bx - Ax·Bz</span>,</div>
          <div style={{paddingLeft:12}}><span style={{color:C.green}}>Ax·By - Ay·Bx</span></div>
          <div>)</div>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>{lang==='ru'?"КЛЮЧЕВЫЕ СВОЙСТВА":"KEY PROPERTIES"}</div>
          {[{icon:"⊥",text:lang==='ru'?"Результат перпендикулярен обоим векторам":"Result is perpendicular to both vectors",col:C.green},{icon:"≠",text:lang==='ru'?"A×B ≠ B×A — порядок меняет направление":"A×B ≠ B×A — order reverses direction",col:C.orange},{icon:"□",text:lang==='ru'?"Длина = площадь параллелограмма A и B":"Length = area of the parallelogram of A and B",col:C.accent}].map(({icon,text,col})=>(<div key={icon} style={{display:"flex",gap:8,marginBottom:8,alignItems:"flex-start"}}><span style={{color:col,fontFamily:"monospace",fontSize:14,flexShrink:0}}>{icon}</span><span style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{text}</span></div>))}
        </div>
      </div>
    </div>
  );
}

function SphereMaskViz(){
  const lang=useLang();
  const [radius,setRadius]=useState(55);
  const [hardness,setHardness]=useState(25);
  const cx=110,cy=110,clampedSoft=Math.min(radius+hardness,105);
  const px=cx+92,py=cy-25;
  const dist=Math.sqrt((px-cx)**2+(py-cy)**2);
  const val=Math.max(0,Math.min(1,1-(dist-radius)/hardness));
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap",alignItems:"flex-start"}}>
      <div>
        <svg width={220} height={220} style={{border:`1px solid ${C.border}`,borderRadius:8,background:C.bg,display:"block"}}>
          <defs>
            <radialGradient id="smG" cx="50%" cy="50%" r="50%"><stop offset={`${(radius/105)*100}%`} stopColor={C.green} stopOpacity="0.35"/><stop offset={`${(clampedSoft/105)*100}%`} stopColor={C.green} stopOpacity="0.0"/></radialGradient>
            <radialGradient id="smF" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={C.green} stopOpacity="0.12"/><stop offset={`${(radius/105)*100}%`} stopColor={C.green} stopOpacity="0.10"/><stop offset="100%" stopColor={C.green} stopOpacity="0"/></radialGradient>
          </defs>
          {[...Array(12)].map((_,i)=>(<g key={i}><line x1={i*20} y1={0} x2={i*20} y2={220} stroke="#1a1d26" strokeWidth={1}/><line x1={0} y1={i*20} x2={220} y2={i*20} stroke="#1a1d26" strokeWidth={1}/></g>))}
          <circle cx={cx} cy={cy} r={clampedSoft} fill="url(#smG)"/>
          <circle cx={cx} cy={cy} r={radius} fill="url(#smF)"/>
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke={C.green} strokeWidth={1.5} strokeDasharray="5,3" opacity={0.7}/>
          <circle cx={cx} cy={cy} r={clampedSoft} fill="none" stroke={C.green} strokeWidth={1} strokeDasharray="2,5" opacity={0.3}/>
          <line x1={cx} y1={cy} x2={cx+radius} y2={cy} stroke={C.accent} strokeWidth={1.5}/>
          <text x={cx+6} y={cy-6} fill={C.accent} fontSize={10} fontFamily="monospace">R</text>
          <line x1={cx+radius} y1={cy} x2={cx+clampedSoft} y2={cy} stroke={C.orange} strokeWidth={1.5} strokeDasharray="3,2"/>
          <text x={cx+radius+4} y={cy+14} fill={C.orange} fontSize={10} fontFamily="monospace">H</text>
          <circle cx={cx} cy={cy} r={4} fill="#ffffff55"/>
          <circle cx={px} cy={py} r={6} fill={C.orange} opacity={0.9}/>
          <text x={px+8} y={py-4} fill={C.orange} fontSize={11} fontFamily="monospace" fontWeight="bold">A</text>
          <rect x={px+6} y={py+4} width={36} height={16} rx={3} fill={C.orange+"22"}/>
          <text x={px+10} y={py+15} fill={C.orange} fontSize={9} fontFamily="monospace">{val.toFixed(2)}</text>
        </svg>
        <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:8}}>
          <label style={{fontFamily:"monospace",fontSize:11,color:C.muted}}>Radius: <span style={{color:C.accent}}>{radius}</span><input type="range" min={10} max={90} value={radius} onChange={e=>setRadius(Number(e.target.value))} style={{width:220,accentColor:C.accent,display:"block",marginTop:2}}/></label>
          <label style={{fontFamily:"monospace",fontSize:11,color:C.muted}}>Hardness: <span style={{color:C.orange}}>{hardness}</span><input type="range" min={1} max={50} value={hardness} onChange={e=>setHardness(Number(e.target.value))} style={{width:220,accentColor:C.orange,display:"block",marginTop:2}}/></label>
        </div>
      </div>
      <div style={{flex:1,minWidth:200,display:"flex",flexDirection:"column",gap:12}}>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",fontFamily:"monospace",fontSize:12,lineHeight:2.1,color:C.text}}>
          <div style={{color:C.muted,fontSize:10,marginBottom:4}}>{lang==='ru'?"ФОРМУЛА (знать наизусть)":"FORMULA (know by heart)"}</div>
          <div><span style={{color:C.green}}>result</span> = <span style={{color:C.orange}}>1</span> - <span style={{color:C.accent}}>saturate</span>(</div>
          <div style={{paddingLeft:12}}>( <span style={{color:C.green}}>length(A - B)</span> - Radius )</div>
          <div style={{paddingLeft:12}}>/ Hardness</div>
          <div>)</div>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",fontSize:12,lineHeight:1.8}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>{lang==='ru'?"ЧТО ДЕЛАЕТ КАЖДАЯ ЧАСТЬ":"WHAT EACH PART DOES"}</div>
          {[{part:"length(A-B)",desc:lang==='ru'?"расстояние от точки до центра":"distance from point to center",col:C.green},{part:"- Radius",desc:lang==='ru'?"внутри R → отрицательно, снаружи → положительно":"inside R → negative, outside → positive",col:C.accent},{part:"/ Hardness",desc:lang==='ru'?"размывает край (больше = мягче)":"softens edge (higher = softer)",col:C.orange},{part:"saturate",desc:lang==='ru'?"клампит результат в [0, 1]":"clamps result to [0, 1]",col:C.purple},{part:"1 - ...",desc:lang==='ru'?"инверт: внутри = 1, снаружи = 0":"invert: inside=1, outside=0",col:C.text}].map(({part,desc,col})=>(<div key={part} style={{display:"flex",gap:8,marginBottom:6}}><code style={{color:col,fontSize:11,background:col+"18",padding:"1px 5px",borderRadius:3,flexShrink:0,whiteSpace:"nowrap"}}>{part}</code><span style={{color:C.muted,fontSize:11}}>{desc}</span></div>))}
        </div>
      </div>
    </div>
  );
}

function CoordSpaces(){
  const lang=useLang();
  const spaces=[
    {name:"Model Space",short:"MS",col:C.orange,matrix:"× M",desc:"Вершины в координатах объекта (pivot = 0,0,0).",detail:"Так хранится меш в памяти. Позиции не зависят от положения объекта в мире."},
    {name:"World Space",short:"WS",col:C.yellow,matrix:"× V",desc:"После Model matrix. Все объекты в единой системе координат.",detail:"Model Matrix = TRS трансформация объекта. Позволяет размещать объекты в мире."},
    {name:"View Space",short:"VS",col:C.accent,matrix:"× P",desc:lang==='ru'?"Камера в начале координат, смотрит по -Z.":"Camera at origin, looking along -Z.",detail:"View Matrix = обратная трансформация камеры. Весь мир «едет» к камере."},
    {name:"Clip Space",short:"CS",col:C.green,matrix:"÷ w",desc:lang==='ru'?"После Projection matrix. Frustum culling здесь.":"After Projection matrix. Frustum culling happens here.",detail:"Projection matrix задаёт перспективу (frustum). Координаты в [-w, w]."},
    {name:"NDC",short:"NDC",col:C.purple,matrix:"Viewport",desc:lang==='ru'?"После деления на w. Диапазон [-1, 1] по всем осям.":"After dividing by w. Range [-1, 1] on all axes.",detail:"Normalized Device Coordinates. Одинаковы для всех GPU."},
    {name:"Screen Space",short:"SCR",col:C.pink,matrix:"—",desc:lang==='ru'?"Пиксели на экране. Здесь работает pixel shader.":"Pixels on screen. Pixel shader works here.",detail:"SV_Position в HLSL — это уже screen space."},
  ];
  const [active,setActive]=useState(0);
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",gap:0,marginBottom:20}}>
        {spaces.map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center"}}><button onClick={()=>setActive(i)} style={{background:active===i?s.col+"20":"transparent",border:`1px solid ${active===i?s.col:C.border}`,borderRadius:6,padding:"6px 10px",color:active===i?s.col:C.muted,fontFamily:"monospace",fontSize:10,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"}}>{s.short}</button>{i<spaces.length-1&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",margin:"0 2px"}}><span style={{color:C.dim,fontSize:10,fontFamily:"monospace"}}>{s.matrix}</span><span style={{color:C.dim,fontSize:14}}>›</span></div>}</div>))}
      </div>
      <div style={{background:C.card,border:`1px solid ${spaces[active].col}33`,borderRadius:10,padding:20}}>
        <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
          <div style={{width:56,height:56,borderRadius:8,flexShrink:0,background:spaces[active].col+"18",border:`2px solid ${spaces[active].col}66`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:12,fontWeight:700,color:spaces[active].col,textAlign:"center"}}>{active}<br/><span style={{fontSize:9}}>{spaces[active].short}</span></div>
          <div style={{flex:1}}><div style={{color:spaces[active].col,fontFamily:"monospace",fontWeight:700,fontSize:16,marginBottom:4}}>{spaces[active].name}</div><div style={{color:C.text,fontSize:13,marginBottom:8}}>{spaces[active].desc}</div><div style={{color:C.muted,fontSize:12,lineHeight:1.6}}>{spaces[active].detail}</div>{spaces[active].matrix!=="—"&&<div style={{marginTop:10,display:"inline-block",background:"#111827",padding:"4px 10px",borderRadius:4,fontFamily:"monospace",fontSize:11,color:spaces[active].col}}>{lang==='ru'?"Следующий шаг: ":"Next step: "}{spaces[active].matrix}</div>}</div>
        </div>
      </div>
    </div>
  );
}


function VectorBasics(){
  const lang=useLang();
  const [vx,setVx]=useState(3);
  const [vy,setVy]=useState(4);
  const [bx,setBx]=useState(5);
  const [by,setBy]=useState(2);
  const mag=Math.sqrt(vx*vx+vy*vy).toFixed(3);
  const nx=(vx/Math.sqrt(vx*vx+vy*vy)).toFixed(3);
  const ny=(vy/Math.sqrt(vx*vx+vy*vy)).toFixed(3);
  const dot2=vx*bx+vy*by;
  const magB=Math.sqrt(bx*bx+by*by);
  const proj=dot2/magB;
  const projX=(proj*(bx/magB)).toFixed(2);
  const projY=(proj*(by/magB)).toFixed(2);
  const W=260,H=200,cx=40,cy=160,scale=16;
  const ax2=cx+vx*scale,ay2=cy-vy*scale;
  const bx2=cx+bx*scale,by2=cy-by*scale;
  const pxCoord=cx+parseFloat(projX)*scale,pyCoord=cy-parseFloat(projY)*scale;
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <div>
        <svg width={W} height={H} style={{border:`1px solid ${C.border}`,borderRadius:8,background:C.bg,display:"block"}}>
          <defs>
            <marker id="vbA" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill={C.orange}/></marker>
            <marker id="vbB" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill={C.accent}/></marker>
            <marker id="vbP" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill={C.green}/></marker>
          </defs>
          {[...Array(12)].map((_,i)=>(<g key={i}><line x1={i*20} y1={0} x2={i*20} y2={H} stroke="#1a1d26" strokeWidth={1}/><line x1={0} y1={i*20} x2={W} y2={i*20} stroke="#1a1d26" strokeWidth={1}/></g>))}
          <line x1={cx} y1={0} x2={cx} y2={H} stroke="#2a2e3a" strokeWidth={1}/>
          <line x1={0} y1={cy} x2={W} y2={cy} stroke="#2a2e3a" strokeWidth={1}/>
          {/* Projection dashed */}
          <line x1={ax2} y1={ay2} x2={pxCoord} y2={pyCoord} stroke="#ffffff15" strokeWidth={1} strokeDasharray="4,4"/>
          <line x1={pxCoord} y1={pyCoord} x2={cx} y2={cy} stroke={C.green} strokeWidth={2} markerEnd="url(#vbP)"/>
          {/* Vectors */}
          <line x1={cx} y1={cy} x2={ax2} y2={ay2} stroke={C.orange} strokeWidth={2.5} markerEnd="url(#vbA)"/>
          <text x={ax2+5} y={ay2-4} fill={C.orange} fontSize={12} fontFamily="monospace" fontWeight="bold">A</text>
          <line x1={cx} y1={cy} x2={bx2} y2={by2} stroke={C.accent} strokeWidth={2.5} markerEnd="url(#vbB)"/>
          <text x={bx2+5} y={by2-4} fill={C.accent} fontSize={12} fontFamily="monospace" fontWeight="bold">B</text>
          <circle cx={pxCoord} cy={pyCoord} r={4} fill={C.green} opacity={0.8}/>
          <text x={pxCoord+5} y={pyCoord-5} fill={C.green} fontSize={9} fontFamily="monospace">proj</text>
          <circle cx={cx} cy={cy} r={3} fill="#ffffff55"/>
        </svg>
        <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:6}}>
          {[{label:"A.x",val:vx,set:setVx,col:C.orange},{label:"A.y",val:vy,set:setVy,col:C.orange},{label:"B.x",val:bx,set:setBx,col:C.accent},{label:"B.y",val:by,set:setBy,col:C.accent}].map(({label,val,set,col})=>(<label key={label} style={{fontFamily:"monospace",fontSize:11,color:C.muted,display:"flex",alignItems:"center",gap:8}}><span style={{minWidth:30,color:col}}>{label}</span><input type="range" min={-8} max={8} value={val} onChange={e=>set(Number(e.target.value))} style={{flex:1,accentColor:col}}/><span style={{minWidth:20,color:col}}>{val}</span></label>))}
        </div>
      </div>
      <div style={{flex:1,minWidth:200,display:"flex",flexDirection:"column",gap:10}}>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8,letterSpacing:1}}>{lang==='ru'?"ВЫЧИСЛЕНИЯ":"CALCULATIONS"}</div>
          {[
            {label:lang==='ru'?"Длина |A|":"Length |A|",formula:`√(${vx}²+${vy}²)`,result:mag,col:C.orange},
            {label:lang==='ru'?"Нормализация A/|A|":"Normalize A/|A|",formula:`(${vx}/${mag}, ${vy}/${mag})`,result:`(${nx}, ${ny})`,col:C.yellow},
            {label:lang==='ru'?"Проекция A→B":"Projection A→B",formula:`(A·B)/|B|`,result:proj.toFixed(3),col:C.green},
          ].map(({label,formula,result,col})=>(<div key={label} style={{marginBottom:10}}><div style={{fontSize:11,color:C.muted,marginBottom:2}}>{label}</div><div style={{fontFamily:"monospace",fontSize:11,color:C.dim,marginBottom:2}}>{formula}</div><div style={{fontFamily:"monospace",fontSize:13,color:col,fontWeight:700}}>= {result}</div></div>))}
        </div>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",fontSize:12,lineHeight:1.9}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>{lang==='ru'?"КЛЮЧЕВЫЕ ФОРМУЛЫ":"KEY FORMULAS"}</div>
          <div style={{color:C.text}}><span style={{color:C.orange}}>|V|</span> = √(x²+y²+z²) <span style={{color:C.muted,fontSize:11}}>— длина</span></div>
          <div style={{color:C.text}}><span style={{color:C.yellow}}>normalize(V)</span> = V / |V| <span style={{color:C.muted,fontSize:11}}>— единичный</span></div>
          <div style={{color:C.text}}><span style={{color:C.green}}>proj(A→B)</span> = (A·B/|B|²)·B <span style={{color:C.muted,fontSize:11}}>— вектор</span></div>
          <div style={{color:C.text}}><span style={{color:C.purple}}>reflect(I,N)</span> = I - 2·dot(I,N)·N</div>
        </div>
      </div>
    </div>
  );
}

function MatrixViz(){
  const lang=useLang();
  const [mode,setMode]=useState("trs");
  const [tx,setTx]=useState(1);
  const [ry,setRy]=useState(30);
  const [sx,setSx]=useState(1.5);

  const rad=ry*Math.PI/180;
  const cos=Math.cos(rad).toFixed(2);
  const sin=Math.sin(rad).toFixed(2);
  const nsin=(-Math.sin(rad)).toFixed(2);

  const Identity=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
  const T=[[1,0,0,tx],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
  const R=[[cos,0,nsin,0],[0,1,0,0],[sin,0,cos,0],[0,0,0,1]];
  const S=[[sx,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
  const matrices={trs:{label:"TRS (combined)",m:T,col:C.accent,note:lang==='ru'?"T×R×S — порядок: Scale первым (правая часть применяется первой)":"T×R×S — order: Scale first (right side applied first)"},translation:{label:"Translation",m:T,col:C.orange,note:lang==='ru'?"Смещение хранится в последнем столбце (column-major)":"Offset stored in the last column (column-major)"},rotation:{label:"Rotation Y",m:R,col:C.accent,note:lang==='ru'?"cos/sin на диагонали и антидиагонали. Нормаль к оси вращения":"cos/sin on diagonal and anti-diagonal. Normal to rotation axis"},scale:{label:"Scale X",m:S,col:C.green,note:lang==='ru'?"Масштаб на главной диагонали. Non-uniform scale ломает нормали":"Scale on main diagonal. Non-uniform scale breaks normals"},identity:{label:"Identity",m:Identity,col:C.muted,note:lang==='ru'?"Нейтральный элемент умножения. M×I = M":"Multiplicative identity. M×I = M"}};
  const cur=matrices[mode];

  const CL=["#ff7a45","#ffd04a","#3dff90","#00c8ff"];
  const cellCol=(r,c)=>{
    if(mode==="translation"&&c===3&&r<3)return C.orange;
    if(mode==="rotation"&&((r===0&&c===0)||(r===0&&c===2)||(r===2&&c===0)||(r===2&&c===2)))return C.accent;
    if(mode==="scale"&&r===c&&r<3)return C.green;
    if(mode==="identity"&&r===c)return C.yellow;
    return C.muted;
  };

  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <div>
        <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
          {Object.entries(matrices).map(([k,v])=>(<button key={k} onClick={()=>setMode(k)} style={{background:mode===k?v.col+"22":"transparent",border:`1px solid ${mode===k?v.col:C.border}`,borderRadius:6,padding:"5px 10px",color:mode===k?v.col:C.muted,fontFamily:"monospace",fontSize:10,cursor:"pointer"}}>{v.label}</button>))}
        </div>
        <table style={{borderCollapse:"separate",borderSpacing:3,marginBottom:10}}>
          <tbody>{cur.m.map((row,r)=>(<tr key={r}>{row.map((val,c)=>(<td key={c} style={{width:52,height:34,textAlign:"center",fontFamily:"monospace",fontSize:12,background:"#111827",borderRadius:4,color:cellCol(r,c),border:`1px solid ${C.border}`,transition:"all 0.2s"}}>{val}</td>))}</tr>))}</tbody>
        </table>
        <div style={{fontSize:11,color:C.muted,background:cur.col+"12",border:`1px solid ${cur.col}33`,borderRadius:6,padding:"8px 12px"}}>{cur.note}</div>
        {(mode==="trs"||mode==="translation"||mode==="rotation"||mode==="scale")&&(
          <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:6}}>
            <label style={{fontFamily:"monospace",fontSize:11,color:C.muted,display:"flex",gap:8,alignItems:"center"}}><span style={{color:C.orange,minWidth:60}}>Translate X</span><input type="range" min={-5} max={5} value={tx} onChange={e=>setTx(Number(e.target.value))} style={{flex:1,accentColor:C.orange}}/><span style={{color:C.orange,minWidth:20}}>{tx}</span></label>
            <label style={{fontFamily:"monospace",fontSize:11,color:C.muted,display:"flex",gap:8,alignItems:"center"}}><span style={{color:C.accent,minWidth:60}}>Rotation Y</span><input type="range" min={0} max={360} value={ry} onChange={e=>setRy(Number(e.target.value))} style={{flex:1,accentColor:C.accent}}/><span style={{color:C.accent,minWidth:30}}>{ry}°</span></label>
            <label style={{fontFamily:"monospace",fontSize:11,color:C.muted,display:"flex",gap:8,alignItems:"center"}}><span style={{color:C.green,minWidth:60}}>Scale X</span><input type="range" min={0.1} max={3} step={0.1} value={sx} onChange={e=>setSx(Number(e.target.value))} style={{flex:1,accentColor:C.green}}/><span style={{color:C.green,minWidth:30}}>{sx}</span></label>
          </div>
        )}
      </div>
      <div style={{flex:1,minWidth:200,display:"flex",flexDirection:"column",gap:10}}>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>{lang==='ru'?"УМНОЖЕНИЕ МАТРИЦ":"MATRIX MULTIPLICATION"}</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.9}}>
            <div><span style={{color:C.red}}>{lang==='ru'?"НЕ коммутативно:":"NOT commutative:"}</span> A×B ≠ B×A</div>
            <div><span style={{color:C.green}}>{lang==='ru'?"TRS порядок:":"TRS order:"}</span> T × R × S</div>
            <div style={{fontSize:11,color:C.dim}}>{lang==='ru'?"Правая матрица применяется первой:":"Right matrix applied first:"}</div>
            <div style={{fontFamily:"monospace",fontSize:11,color:C.text}}>v' = T×R×S × v</div>
            <div style={{fontSize:11,color:C.dim}}>{lang==='ru'?"→ Scale → Rotate → Translate (right to left)":"→ Scale → Rotate → Translate (right to left)"}</div>
          </div>
        </div>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>{lang==='ru'?"ВАЖНЫЕ СВОЙСТВА":"KEY PROPERTIES"}</div>
          {[{t:lang==='ru'?"Обратная (Inverse)":"Inverse",d:lang==='ru'?"M × M⁻¹ = I. View Matrix = Inverse(Camera Transform)":"M × M⁻¹ = I. View Matrix = Inverse(Camera Transform)",c:C.accent},{t:lang==='ru'?"Транспонированная (Transpose)":"Transpose",d:lang==='ru'?"Строки↔Столбцы. Для ортогональных матриц: M⁻¹ = Mᵀ":"Rows↔Columns. For orthogonal matrices: M⁻¹ = Mᵀ",c:C.yellow},{t:lang==='ru'?"Нормали: InvTranspose":"Normals: InvTranspose",d:lang==='ru'?"При non-uniform scale нормали искажаются. Нужна (M⁻¹)ᵀ":"Non-uniform scale distorts normals. Need (M⁻¹)ᵀ",c:C.orange},{t:"Determinant = 0",d:lang==='ru'?"Матрица необратима — объект сплющен в плоскость":"Matrix is non-invertible — object flattened to a plane",c:C.red}].map(({t,d,c})=>(<div key={t} style={{marginBottom:9}}><div style={{fontFamily:"monospace",fontSize:10,color:c}}>{t}</div><div style={{fontSize:11,color:C.muted}}>{d}</div></div>))}
        </div>
      </div>
    </div>
  );
}

function QuaternionExplainer(){
  const lang=useLang();
  const [angle,setAngle]=useState(0);
  const [showGimbal,setShowGimbal]=useState(false);
  const rad=angle*Math.PI/180;
  const qw=Math.cos(rad/2).toFixed(3);
  const qy=Math.sin(rad/2).toFixed(3);

  const GimbalViz=()=>(
    <svg width={220} height={180} style={{border:`1px solid ${C.border}`,borderRadius:8,background:C.bg,display:"block"}}>
      {[...Array(11)].map((_,i)=>(<g key={i}><line x1={i*20} y1={0} x2={i*20} y2={180} stroke="#1a1d26" strokeWidth={1}/><line x1={0} y1={i*20} x2={220} y2={i*20} stroke="#1a1d26" strokeWidth={1}/></g>))}
      {/* Outer ring (Yaw) */}
      <ellipse cx={110} cy={90} rx={90} ry={30} fill="none" stroke={C.orange} strokeWidth={2} opacity={0.7}/>
      <text x={202} y={94} fill={C.orange} fontSize={9} fontFamily="monospace">Yaw Y</text>
      {/* Middle ring (Pitch) */}
      <ellipse cx={110} cy={90} rx={60} ry={75} fill="none" stroke={C.accent} strokeWidth={2} opacity={0.7}/>
      <text x={172} y={94} fill={C.accent} fontSize={9} fontFamily="monospace">Pitch X</text>
      {/* Inner ring (Roll) */}
      <ellipse cx={110} cy={90} rx={30} ry={75} fill="none" stroke={C.green} strokeWidth={2} opacity={0.7}/>
      <text x={142} y={94} fill={C.green} fontSize={9} fontFamily="monospace">Roll Z</text>
      {/* Lock indicator */}
      {showGimbal&&<>
        <rect x={40} y={60} width={140} height={60} rx={6} fill={C.red+"22"} stroke={C.red+"66"} strokeWidth={1}/>
        <text x={110} y={84} textAnchor="middle" fill={C.red} fontSize={11} fontFamily="monospace" fontWeight="bold">GIMBAL LOCK</text>
        <text x={110} y={100} textAnchor="middle" fill={C.red} fontSize={9} fontFamily="monospace">{lang==='ru'?"2 оси совпали":"2 axes aligned"}</text>
        <text x={110} y={114} textAnchor="middle" fill={C.muted} fontSize={9} fontFamily="monospace">{lang==='ru'?"потеряна степень свободы":"degree of freedom lost"}</text>
      </>}
    </svg>
  );

  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <div>
        <GimbalViz/>
        <button onClick={()=>setShowGimbal(!showGimbal)} style={{marginTop:10,width:220,padding:"6px 0",background:showGimbal?C.red+"22":"transparent",border:`1px solid ${showGimbal?C.red:C.border}`,borderRadius:6,color:showGimbal?C.red:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{showGimbal?(lang==='ru'?"▼ скрыть gimbal lock":"▼ hide gimbal lock"):(lang==='ru'?"▶ показать gimbal lock":"▶ show gimbal lock")}</button>
        <div style={{marginTop:12}}>
          <div style={{fontFamily:"monospace",fontSize:11,color:C.muted,marginBottom:4}}>Угол поворота Y: {angle}°</div>
          <input type="range" min={0} max={360} value={angle} onChange={e=>setAngle(Number(e.target.value))} style={{width:220,accentColor:C.purple}}/>
          <div style={{marginTop:8,background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",fontFamily:"monospace",fontSize:11}}>
            <div style={{color:C.muted,fontSize:10,marginBottom:6}}>QUATERNION (rotation Y {angle}°)</div>
            <div style={{color:C.text}}>w = <span style={{color:C.purple}}>{qw}</span></div>
            <div style={{color:C.text}}>x = <span style={{color:C.muted}}>0</span>, y = <span style={{color:C.purple}}>{qy}</span>, z = <span style={{color:C.muted}}>0</span></div>
            <div style={{color:C.dim,fontSize:10,marginTop:6}}>w=cos(θ/2), axis·sin(θ/2)</div>
          </div>
        </div>
      </div>
      <div style={{flex:1,minWidth:220,display:"flex",flexDirection:"column",gap:10}}>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>EULER vs QUATERNION</div>
          {[{prop:lang==='ru'?"Хранение":"Storage",euler:lang==='ru'?"3 числа (pitch,yaw,roll)":"3 numbers (pitch,yaw,roll)",quat:lang==='ru'?"4 числа (x,y,z,w)":"4 numbers (x,y,z,w)",bad:false},{prop:"Gimbal Lock",euler:lang==='ru'?"Да — при 90° теряется ось":"Yes — axis lost at 90°",quat:"Нет",bad:true},{prop:lang==='ru'?"Интерполяция":"Interpolation",euler:lang==='ru'?"Lerp → артефакты":"Lerp → artifacts",quat:lang==='ru'?"Slerp → правильно":"Slerp → correct",bad:true},{prop:lang==='ru'?"Понятность":"Readability",euler:lang==='ru'?"Интуитивно":"Intuitive",quat:lang==='ru'?"Сложнее читать":"Harder to read",bad:false},{prop:lang==='ru'?"В движке":"In engine",euler:lang==='ru'?"Для UI/редактора":"For UI/editor",quat:lang==='ru'?"Внутри для вычислений":"Internal computations",bad:false}].map(({prop,euler,quat,bad})=>(<div key={prop} style={{marginBottom:8,borderBottom:`1px solid ${C.dim}`,paddingBottom:8}}><div style={{fontSize:10,color:C.dim,fontFamily:"monospace",marginBottom:4}}>{prop}</div><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><span style={{fontSize:11,color:bad?C.red:C.muted,background:C.dim,padding:"2px 8px",borderRadius:4}}>Euler: {euler}</span><span style={{fontSize:11,color:bad?C.green:C.muted,background:C.dim,padding:"2px 8px",borderRadius:4}}>Quat: {quat}</span></div></div>))}
        </div>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>{lang==='ru'?"SLERP vs LERP":"SLERP vs LERP"}</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.8}}>
            <span style={{color:C.red}}>Lerp</span> {lang==='ru'?"кватернионов даёт неравномерную скорость вращения — объект «ускоряется» в середине.":"of quaternions gives non-uniform rotation speed — object accelerates in the middle."}<br/>
            <span style={{color:C.green}}>Slerp</span> (Spherical Linear Interpolation) — {lang==='ru'?"интерполяция по дуге сферы. Равномерная скорость.":"arc interpolation on a sphere. Uniform speed."}<br/>
            <div style={{fontFamily:"monospace",fontSize:11,marginTop:6,color:C.text}}>q = slerp(q1, q2, t)</div>
            <div style={{fontSize:11,marginTop:4}}>{lang==='ru'?"Используй Slerp для анимации поворотов.":"Use Slerp for rotation animation."}</div>
          </div>
        </div>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>ЧТО ТАКОЕ QUATERNION</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.8}}>
            q = w + xi + yj + zk<br/>
            <span style={{color:C.text}}>w</span> = cos(θ/2) — «сколько не повёрнуто»<br/>
            <span style={{color:C.text}}>xyz</span> = axis · sin(θ/2) — ось вращения × синус<br/>
            <span style={{color:C.dim,fontSize:11}}>Единичный кватернион: |q| = 1. Обратный: q⁻¹ = (w,-x,-y,-z)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReflectAndPlane(){
  const lang=useLang();
  const [tab,setTab]=useState("reflect");
  const [ix,setIx]=useState(-1);
  const [iy,setIy]=useState(2);
  const nx2=0,ny2=-1;
  const dot2=ix*nx2+iy*ny2;
  const rx=(ix-2*dot2*nx2).toFixed(2);
  const ry2=(iy-2*dot2*ny2).toFixed(2);
  const W=220,H=200,cx=110,cy=140,scale=28;
  const iex=cx+ix*scale,iey=cy-iy*scale;
  const rex=cx+parseFloat(rx)*scale,rey=cy-parseFloat(ry2)*scale;
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:14}}>
        {[["reflect",lang==='ru'?"Reflect вектор":"Reflect Vector"],["plane",lang==='ru'?"Уравнение плоскости":"Plane Equation"]].map(([k,l])=>(<button key={k} onClick={()=>setTab(k)} style={{background:tab===k?C.accent+"22":"transparent",border:`1px solid ${tab===k?C.accent:C.border}`,borderRadius:6,padding:"6px 12px",color:tab===k?C.accent:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{l}</button>))}
      </div>
      {tab==="reflect"&&(
        <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
          <div>
            <svg width={W} height={H} style={{border:`1px solid ${C.border}`,borderRadius:8,background:C.bg,display:"block"}}>
              <defs>
                <marker id="rfI" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill={C.orange}/></marker>
                <marker id="rfR" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill={C.green}/></marker>
                <marker id="rfN" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill={C.accent}/></marker>
              </defs>
              {[...Array(11)].map((_,i)=>(<g key={i}><line x1={i*20} y1={0} x2={i*20} y2={H} stroke="#1a1d26" strokeWidth={1}/><line x1={0} y1={i*20} x2={W} y2={i*20} stroke="#1a1d26" strokeWidth={1}/></g>))}
              {/* Surface */}
              <line x1={0} y1={cy} x2={W} y2={cy} stroke={C.border} strokeWidth={2}/>
              <text x={4} y={cy-4} fill={C.muted} fontSize={9} fontFamily="monospace">{lang==='ru'?"поверхность":"surface"}</text>
              {/* Normal */}
              <line x1={cx} y1={cy} x2={cx} y2={cy-55} stroke={C.accent} strokeWidth={2} markerEnd="url(#rfN)"/>
              <text x={cx+4} y={cy-58} fill={C.accent} fontSize={11} fontFamily="monospace" fontWeight="bold">N</text>
              {/* Incident */}
              <line x1={iex} y1={iey} x2={cx} y2={cy} stroke={C.orange} strokeWidth={2.5} markerEnd="url(#rfI)"/>
              <text x={iex-14} y={iey-4} fill={C.orange} fontSize={11} fontFamily="monospace" fontWeight="bold">I</text>
              {/* Reflect */}
              <line x1={cx} y1={cy} x2={rex} y2={rey} stroke={C.green} strokeWidth={2.5} markerEnd="url(#rfR)"/>
              <text x={rex+4} y={rey-4} fill={C.green} fontSize={11} fontFamily="monospace" fontWeight="bold">R</text>
              <circle cx={cx} cy={cy} r={3} fill="#ffffff55"/>
            </svg>
            <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:6}}>
              <label style={{fontFamily:"monospace",fontSize:11,color:C.muted,display:"flex",gap:8,alignItems:"center"}}><span style={{color:C.orange,minWidth:30}}>I.x</span><input type="range" min={-4} max={4} value={ix} onChange={e=>setIx(Number(e.target.value))} style={{flex:1,accentColor:C.orange}}/><span style={{color:C.orange}}>{ix}</span></label>
              <label style={{fontFamily:"monospace",fontSize:11,color:C.muted,display:"flex",gap:8,alignItems:"center"}}><span style={{color:C.orange,minWidth:30}}>I.y</span><input type="range" min={0} max={4} value={iy} onChange={e=>setIy(Number(e.target.value))} style={{flex:1,accentColor:C.orange}}/><span style={{color:C.orange}}>{iy}</span></label>
            </div>
          </div>
          <div style={{flex:1,minWidth:200,display:"flex",flexDirection:"column",gap:10}}>
            <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",fontFamily:"monospace",fontSize:12,lineHeight:2}}>
              <div style={{color:C.muted,fontSize:10,marginBottom:4}}>{lang==='ru'?"ФОРМУЛА":"FORMULA"}</div>
              <div><span style={{color:C.green}}>R</span> = <span style={{color:C.orange}}>I</span> - 2·<span style={{color:C.accent}}>dot(I,N)</span>·<span style={{color:C.accent}}>N</span></div>
              <div style={{color:C.dim,fontSize:11}}>I должен быть нормализован</div>
              <div style={{marginTop:8,color:C.text}}>R = ({rx}, {ry2})</div>
            </div>
            <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",fontSize:12,lineHeight:1.8}}>
              <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>{lang==='ru'?"ПРИМЕНЕНИЕ":"APPLICATION"}</div>
              {[{t:"Specular reflections",d:lang==='ru'?"reflect(viewDir, normal) → направление для cubemap sample":"reflect(viewDir, normal) → direction for cubemap sample"},
                {t:"Mirror surfaces",d:lang==='ru'?"Идеальное зеркало — reflect от нормали поверхности":"Perfect mirror — reflect off surface normal"},
                {t:"HLSL built-in",d:lang==='ru'?"reflect(I,N) — встроенная функция, одна инструкция GPU":"reflect(I,N) — built-in function, one GPU instruction"}].map(({t,d})=>(<div key={t} style={{marginBottom:7}}><span style={{fontFamily:"monospace",fontSize:10,color:C.green}}>{t}</span><div style={{fontSize:11,color:C.muted}}>{d}</div></div>))}
            </div>
          </div>
        </div>
      )}
      {tab==="plane"&&(
        <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:220,display:"flex",flexDirection:"column",gap:10}}>
            <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 16px",fontFamily:"monospace",fontSize:12,lineHeight:2.1}}>
              <div style={{color:C.muted,fontSize:10,marginBottom:6}}>УРАВНЕНИЕ ПЛОСКОСТИ</div>
              <div><span style={{color:C.orange}}>A</span>x + <span style={{color:C.accent}}>B</span>y + <span style={{color:C.green}}>C</span>z + D = 0</div>
              <div style={{color:C.dim,fontSize:11}}>где (A,B,C) = нормаль плоскости</div>
              <div style={{marginTop:8}}><span style={{color:C.yellow}}>D</span> = -dot(Normal, PointOnPlane)</div>
            </div>
            <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
              <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>ЗНАКОВОЕ РАССТОЯНИЕ</div>
              <div style={{fontFamily:"monospace",fontSize:12,color:C.text,lineHeight:2}}>
                <div>dist = <span style={{color:C.accent}}>dot(Normal, Point)</span> + D</div>
                <div style={{fontSize:11,color:C.muted,marginTop:4}}>dist {'>'} 0 → точка перед плоскостью</div>
                <div style={{fontSize:11,color:C.muted}}>dist {'<'} 0 → за плоскостью</div>
                <div style={{fontSize:11,color:C.muted}}>dist = 0 → на плоскости</div>
              </div>
            </div>
            <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
              <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>{lang==='ru'?"ПРИМЕНЕНИЕ":"APPLICATION"}</div>
              {[{t:"Frustum Culling",d:lang==='ru'?"6 плоскостей frustum. Объект снаружи если dist < 0 для любой плоскости":"6 frustum planes. Object outside if dist < 0 for any plane",c:C.accent},{t:"Clipping",d:lang==='ru'?"GPU clips треугольники по 6 плоскостям clip space":"GPU clips triangles against 6 clip space planes",c:C.orange},{t:"Reflection plane",d:lang==='ru'?"Вода — отражение относительно плоскости поверхности":"Water — reflection relative to surface plane",c:C.green},{t:"Portal rendering",d:lang==='ru'?"Портал = плоскость. Рендерим что за ней отдельно":"Portal = plane. Render what's behind it separately",c:C.purple}].map(({t,d,c})=>(<div key={t} style={{marginBottom:8}}><span style={{fontFamily:"monospace",fontSize:10,color:c}}>{t}</span><div style={{fontSize:11,color:C.muted}}>{d}</div></div>))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══ MODULE 2 — GPU vs CPU ══════════════════════════════════════════════════
function CoreDiagram(){
  const lang=useLang();
  const [hover,setHover]=useState(null);
  const cpuCores=[{x:30,y:40,w:70,h:70},{x:120,y:40,w:70,h:70},{x:30,y:130,w:70,h:70},{x:120,y:130,w:70,h:70}];
  const gpuCores=[];
  for(let r=0;r<10;r++)for(let c=0;c<18;c++)gpuCores.push({x:8+c*21,y:8+r*19,w:18,h:16});
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <div>
        <div style={{fontFamily:"monospace",fontSize:11,color:C.muted,marginBottom:8,letterSpacing:2}}>CPU</div>
        <svg width={220} height={220} style={{border:`1px solid ${C.border}`,borderRadius:8,background:C.bg,display:"block"}}>
          <rect x={8} y={8} width={204} height={204} rx={4} fill={C.surface} stroke={C.border} strokeWidth={1}/>
          <rect x={18} y={18} width={184} height={16} rx={2} fill={C.accent+"22"} stroke={C.accent+"44"} strokeWidth={1}/>
          <text x={110} y={30} textAnchor="middle" fill={C.accent} fontSize={9} fontFamily="monospace">L3 Cache</text>
          <rect x={18} y={196} width={184} height={8} rx={2} fill={C.purple+"22"} stroke={C.purple+"44"} strokeWidth={1}/>
          {cpuCores.map((c,i)=>(<g key={i} onMouseEnter={()=>setHover("cpu"+i)} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer"}}><rect x={c.x} y={c.y} width={c.w} height={c.h} rx={4} fill={hover==="cpu"+i?C.orange+"30":C.orange+"15"} stroke={C.orange+(hover==="cpu"+i?"":"44")} strokeWidth={1}/><text x={c.x+c.w/2} y={c.y+16} textAnchor="middle" fill={C.orange} fontSize={9} fontFamily="monospace">CORE {i}</text><rect x={c.x+6} y={c.y+22} width={c.w-12} height={10} rx={2} fill={C.yellow+"25"} stroke={C.yellow+"44"} strokeWidth={1}/><text x={c.x+c.w/2} y={c.y+31} textAnchor="middle" fill={C.yellow} fontSize={8} fontFamily="monospace">L1/L2</text><rect x={c.x+6} y={c.y+36} width={c.w-12} height={12} rx={2} fill={C.green+"20"} stroke={C.green+"44"} strokeWidth={1}/><text x={c.x+c.w/2} y={c.y+46} textAnchor="middle" fill={C.green} fontSize={8} fontFamily="monospace">ALU+FPU</text><rect x={c.x+6} y={c.y+52} width={c.w-12} height={10} rx={2} fill={C.muted+"20"} stroke={C.muted+"44"} strokeWidth={1}/><text x={c.x+c.w/2} y={c.y+61} textAnchor="middle" fill={C.muted} fontSize={8} fontFamily="monospace">Regs</text></g>))}
        </svg>
        <div style={{marginTop:8,fontFamily:"monospace",fontSize:11,color:C.orange}}>{lang==='ru'?"4–32 мощных ядра":"4–32 powerful cores"}</div>
        <div style={{fontSize:11,color:C.muted,marginTop:2}}>{lang==='ru'?"Высокая частота, большой кэш, сложная логика":"High clock, large cache, complex control logic"}</div>
      </div>
      <div style={{flex:1}}>
        <div style={{fontFamily:"monospace",fontSize:11,color:C.muted,marginBottom:8,letterSpacing:2}}>GPU</div>
        <svg width={"100%"} height={220} viewBox="0 0 400 220" style={{border:`1px solid ${C.border}`,borderRadius:8,background:C.bg,display:"block"}}>
          <rect x={4} y={4} width={392} height={212} rx={4} fill={C.surface} stroke={C.border} strokeWidth={1}/>
          <rect x={12} y={196} width={376} height={14} rx={2} fill={C.purple+"22"} stroke={C.purple+"44"} strokeWidth={1}/>
          <text x={200} y={207} textAnchor="middle" fill={C.purple} fontSize={8} fontFamily="monospace">VRAM Bus (wide bandwidth)</text>
          {gpuCores.map((c,i)=>(<g key={i} onMouseEnter={()=>setHover("gpu"+i)} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer"}}><rect x={c.x} y={c.y} width={c.w} height={c.h} rx={2} fill={hover==="gpu"+i?C.accent+"55":C.accent+"20"} stroke={C.accent+(hover==="gpu"+i?"":"33")} strokeWidth={0.5}/>{hover==="gpu"+i&&<text x={c.x+c.w/2} y={c.y+11} textAnchor="middle" fill={C.accent} fontSize={6} fontFamily="monospace">SP</text>}</g>))}
          <text x={200} y={190} textAnchor="middle" fill={C.accent} fontSize={9} fontFamily="monospace">{lang==='ru'?"180+ Streaming Multiprocessors · тысячи Shader Processors":"180+ Streaming Multiprocessors · thousands of Shader Processors"}</text>
        </svg>
        <div style={{marginTop:8,fontFamily:"monospace",fontSize:11,color:C.accent}}>{lang==='ru'?"1000+ маленьких ядер":"1000+ small cores"}</div>
        <div style={{fontSize:11,color:C.muted,marginTop:2}}>{lang==='ru'?"Низкая частота, минимальный кэш":"Low clock, minimal cache — but thousands"}</div>
      </div>
    </div>
  );
}

function GPUPipeline(){
  const lang=useLang();
  const stages=[
    {name:"Input Assembly",short:"IA",col:C.muted,desc:"Читает вершины и индексы из буферов. Формирует примитивы (треугольники). Не программируется.",code:null},
    {name:"Vertex Shader",short:"VS",col:C.orange,desc:"Запускается PER VERTEX. Трансформирует позиции: Model→World→View→Clip. Обязательный этап.",code:`struct VSInput { float3 Position:POSITION; float3 Normal:NORMAL; float2 UV:TEXCOORD0; };
struct VSOutput { float4 ClipPos:SV_Position; float3 WorldNormal:TEXCOORD0; float2 UV:TEXCOORD1; };
VSOutput main(VSInput IN) {
    VSOutput OUT;
    float4 worldPos = mul(ModelMatrix, float4(IN.Position, 1.0));
    OUT.ClipPos     = mul(ViewProjMatrix, worldPos);
    OUT.WorldNormal = mul((float3x3)InvTranspModel, IN.Normal);
    OUT.UV = IN.UV;
    return OUT;
}`},
    {name:"Rasterization",short:"RAST",col:C.yellow,desc:"Интерполирует атрибуты вершин на пиксели треугольника. Генерирует фрагменты. Делает GPU, не программируется.",code:null},
    {name:"Pixel Shader",short:"PS",col:C.accent,desc:"Запускается PER PIXEL. Вычисляет финальный цвет. Здесь вся работа: текстуры, освещение, эффекты.",code:`float4 main(PSInput IN) : SV_Target {
    float3 N = normalize(IN.WorldNormal);
    float3 L = normalize(LightDir);
    float3 V = normalize(CameraPos - IN.WorldPos);
    float3 H = normalize(L + V);
    float diffuse = saturate(dot(N, L));
    float spec    = pow(saturate(dot(N, H)), 64.0);
    float fresnel = pow(1.0 - saturate(dot(N, V)), 3.0);
    float3 albedo = AlbedoTex.Sample(Samp, IN.UV).rgb;
    return float4(albedo * diffuse + spec + fresnel * RimColor, 1.0);
}`},
    {name:"Output Merger",short:"OM",col:C.green,desc:"Depth test (z-buffer), stencil test, alpha blending. Пишет результат в render target. Не программируется.",code:null},
  ];
  const [active,setActive]=useState(1);
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
        {stages.map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center",flexShrink:0}}><button onClick={()=>setActive(i)} style={{background:active===i?s.col+"22":"transparent",border:`1px solid ${active===i?s.col:C.border}`,borderRadius:6,padding:"7px 12px",color:active===i?s.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.15s"}}>{s.short}</button>{i<stages.length-1&&<span style={{color:C.dim,fontSize:20,margin:"0 4px"}}>→</span>}</div>))}
      </div>
      <div style={{background:C.card,border:`1px solid ${stages[active].col}44`,borderRadius:10,padding:20}}>
        <div style={{color:stages[active].col,fontFamily:"monospace",fontWeight:700,fontSize:15,marginBottom:8}}>{stages[active].name}</div>
        <div style={{color:C.text,fontSize:13,lineHeight:1.7,marginBottom:stages[active].code?12:0}}>{stages[active].desc}</div>
        {stages[active].code&&<Code lang="hlsl">{stages[active].code}</Code>}
      </div>
    </div>
  );
}

function BoundnessViz(){
  const lang=useLang();
  const [resScale,setResScale]=useState(100);
  const [drawCalls,setDrawCalls]=useState(50);
  const [polyCount,setPolyCount]=useState(50);
  const gpuLoad=Math.min(100,(resScale*0.5+polyCount*0.3+drawCalls*0.1)*0.9);
  const cpuLoad=Math.min(100,(drawCalls*1.2+polyCount*0.1));
  const isGPUBound=gpuLoad>cpuLoad;
  const bottleneck=isGPUBound?C.accent:C.orange;
  const Bar=({label,val,col})=>(<div style={{marginBottom:14}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:"monospace",fontSize:11,color:C.muted}}>{label}</span><span style={{fontFamily:"monospace",fontSize:11,color:col}}>{val.toFixed(0)}%</span></div><div style={{height:14,background:C.dim,borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",width:`${val}%`,background:col,borderRadius:4,transition:"width 0.3s",boxShadow:val>85?`0 0 8px ${col}`:"none"}}/></div></div>);
  return(
    <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
      <div style={{flex:1,minWidth:220}}>
        <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:12,letterSpacing:2}}>ПАРАМЕТРЫ СЦЕНЫ</div>
        {[{label:"Разрешение (%)",val:resScale,set:setResScale,min:25,max:200,col:C.accent,hint:lang==='ru'?"GPU-нагрузка растёт квадратично":"GPU load grows quadratically"},{label:"Draw Calls",val:drawCalls,set:setDrawCalls,min:1,max:100,col:C.orange,hint:lang==='ru'?"CPU-нагрузка":"CPU load"},{label:"Poly Count (%)",val:polyCount,set:setPolyCount,min:1,max:100,col:C.green,hint:lang==='ru'?"VS нагрузка на GPU":"VS load on GPU"}].map(({label,val,set,min,max,col,hint})=>(<div key={label} style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:"monospace",fontSize:11,color:C.muted}}>{label}</span><span style={{fontFamily:"monospace",fontSize:11,color:col}}>{val}</span></div><input type="range" min={min} max={max} value={val} onChange={e=>set(Number(e.target.value))} style={{width:"100%",accentColor:col}}/><div style={{fontSize:10,color:C.dim,marginTop:2}}>{hint}</div></div>))}
      </div>
      <div style={{flex:1,minWidth:220}}>
        <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:12,letterSpacing:2}}>НАГРУЗКА</div>
        <Bar label="GPU Load" val={gpuLoad} col={C.accent}/>
        <Bar label="CPU Load" val={cpuLoad} col={C.orange}/>
        <div style={{background:bottleneck+"18",border:`1px solid ${bottleneck}44`,borderRadius:8,padding:"12px 14px",marginTop:8}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:bottleneck,marginBottom:4}}>УЗКОЕ МЕСТО</div>
          <div style={{fontSize:14,fontWeight:700,color:bottleneck}}>{isGPUBound?"GPU-bound":"CPU-bound"}</div>
          <div style={{fontSize:12,color:C.muted,marginTop:4}}>{isGPUBound?"↓ Разрешение → FPS растёт? Значит GPU-bound.":"↓ Draw Calls / упрости логику → FPS растёт? CPU-bound."}</div>
        </div>
        <div style={{marginTop:12,background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:6}}>КАК ОПРЕДЕЛИТЬ В ПРОФАЙЛЕРЕ</div>
          {[{t:"GPU-bound",d:"GPU frame time > CPU. Длинные GPU passes в RenderDoc.",c:C.accent},{t:"CPU-bound",d:"CPU frame time > GPU. GPU idle. stat GPU показывает низкую загрузку.",c:C.orange}].map(({t,d,c})=>(<div key={t} style={{marginBottom:8}}><span style={{fontFamily:"monospace",fontSize:10,color:c}}>{t}</span><div style={{fontSize:11,color:C.muted}}>{d}</div></div>))}
        </div>
      </div>
    </div>
  );
}

function DrawCallExplainer(){
  const lang=useLang();
  const [batched,setBatched]=useState(false);
  const objs=12,calls=batched?1:objs;
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <div style={{flex:1,minWidth:260}}>
        <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:10,letterSpacing:2}}>СЦЕНА ({objs} объектов)</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:12}}>
          {Array.from({length:objs},(_,i)=>i).map(i=>(<div key={i} style={{height:44,borderRadius:6,background:batched?C.green+"22":C.orange+"15",border:`1px solid ${batched?C.green+"55":C.orange+"33"}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:9,color:batched?C.green:C.orange,transition:"all 0.3s"}}>{batched?"batch":"obj "+i}</div>))}
        </div>
        <button onClick={()=>setBatched(!batched)} style={{width:"100%",padding:"8px 0",background:batched?C.green+"20":C.orange+"15",border:`1px solid ${batched?C.green:C.orange}`,borderRadius:6,color:batched?C.green:C.orange,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{batched?(lang==='ru'?"▼ Разбить":"▼ Split apart"):(lang==='ru'?"▲ Объединить":"▲ Merge")}</button>
      </div>
      <div style={{flex:1,minWidth:220}}>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 18px",marginBottom:12}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:4}}>DRAW CALLS</div>
          <div style={{fontFamily:"monospace",fontSize:40,fontWeight:700,color:batched?C.green:C.orange,transition:"color 0.3s"}}>{calls}</div>
          <div style={{fontSize:12,color:C.muted,marginTop:4}}>{batched?(lang==='ru'?"Один вызов → GPU рисует всё":"One call → GPU draws everything"):(lang==='ru'?"Каждый объект = отдельный вызов":"Each object = a separate call")}</div>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>КАК СОКРАТИТЬ</div>
          {[{t:"Batching",d:"Merge static meshes в один draw call",c:C.green},{t:"Instancing (ISM/HISM)",d:"Тысячи копий = 1 draw call",c:C.accent},{t:"Atlasing",d:"Один material на много объектов",c:C.yellow},{t:"Nanite (UE5)",d:"Полностью обходит draw call limit",c:C.purple}].map(({t,d,c})=>(<div key={t} style={{marginBottom:7}}><span style={{fontFamily:"monospace",fontSize:10,color:c}}>{t}</span><div style={{fontSize:11,color:C.muted}}>{d}</div></div>))}
        </div>
      </div>
    </div>
  );
}

// ══ MODULE 3 — HLSL ════════════════════════════════════════════════════════
function DataTypes(){
  const lang=useLang();
  const types=[
    {t:"float",bits:"32",prec:lang==='ru'?"~7 знаков":"~7 significant digits",use:lang==='ru'?"Позиции, нормали, любые расчёты":"Positions, normals, any calculation",col:C.orange},
    {t:"float2/3/4",bits:"32×N",prec:"Вектор",use:lang==='ru'?"UV, RGB, позиции, нормали":"UV, RGB, positions, normals",col:C.orange},
    {t:"half",bits:"16",prec:lang==='ru'?"~3 знака":"~3 significant digits",use:"Цвета, UV — экономия bandwidth",col:C.yellow},
    {t:"half4",bits:"16×4",prec:"Вектор",use:"Цвета в mobile шейдерах",col:C.yellow},
    {t:"int / uint",bits:"32",prec:"Целые",use:"Счётчики, индексы, флаги",col:C.purple},
    {t:"bool",bits:"1/32",prec:"true/false",use:"Условия (ветвления дорого на GPU!)",col:C.muted},
  ];
  return(
    <div>
      <div style={{display:"grid",gap:6,marginBottom:12}}>
        {types.map(({t,bits,prec,use,col})=>(<div key={t} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px"}}>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}>
            <span style={{fontFamily:"monospace",fontSize:13,color:col,fontWeight:700}}>{t}</span>
            <span style={{fontFamily:"monospace",fontSize:10,color:C.muted,background:C.dim,padding:"1px 6px",borderRadius:3}}>{bits} bit</span>
            <span style={{fontFamily:"monospace",fontSize:10,color:C.accent,background:C.accent+"15",padding:"1px 6px",borderRadius:3}}>{prec}</span>
          </div>
          <div style={{fontSize:12,color:C.muted}}>{use}</div>
        </div>))}
      </div>
      <div style={{background:C.accent+"12",border:`1px solid ${C.accent}33`,borderRadius:8,padding:"12px 14px"}}>
        <div style={{fontFamily:"monospace",fontSize:10,color:C.accent,letterSpacing:2,marginBottom:6}}>SWIZZLE ОПЕРАЦИИ</div>
        <div style={{fontFamily:"monospace",fontSize:12,lineHeight:2,color:C.text}}>
          <span style={{color:C.orange}}>float4 v = float4(1,2,3,4);</span><br/>
          <span style={{color:C.accent}}>v.xyz</span> → float3(1,2,3)&nbsp;&nbsp;
          <span style={{color:C.accent}}>v.yx</span> → float2(2,1)&nbsp;&nbsp;
          <span style={{color:C.accent}}>v.xxxx</span> → float4(1,1,1,1)<br/>
          <span style={{color:C.green}}>// rgba и xyzw взаимозаменяемы: v.r == v.x</span>
        </div>
      </div>
    </div>
  );
}

function Intrinsics(){
  const lang=useLang();
  const fns=[
    {name:"dot(A,B)",ret:"float",desc:lang==='ru'?"Скалярное произведение. Основа lighting и Fresnel.":"Dot product. Core of lighting and Fresnel.",cat:"math"},
    {name:"cross(A,B)",ret:"float3",desc:lang==='ru'?"Векторное произведение. Нормали граней, TBN.":"Cross product. Face normals, TBN.",cat:"math"},
    {name:"normalize(V)",ret:"floatN",desc:lang==='ru'?"Нормализует вектор до единичной длины.":"Normalizes vector to unit length.",cat:"math"},
    {name:"length(V)",ret:"float",desc:lang==='ru'?"Длина вектора. Используй в Sphere Mask.":"Vector length. Use in Sphere Mask.",cat:"math"},
    {name:"reflect(I,N)",ret:"floatN",desc:lang==='ru'?"Вектор отражения для зеркал и specular.":"Reflection vector for mirrors and specular.",cat:"math"},
    {name:"pow(x,n)",ret:"floatN",desc:"Степень. pow(spec,32) — контроль глянца.",cat:"math"},
    {name:"abs(x)",ret:"floatN",desc:"Абсолютное значение.",cat:"math"},
    {name:"frac(x)",ret:"floatN",desc:"Дробная часть. Тайлинг, паттерны.",cat:"math"},
    {name:"floor/ceil(x)",ret:"floatN",desc:"Округление вниз/вверх.",cat:"math"},
    {name:"lerp(A,B,t)",ret:"floatN",desc:"Линейная интерполяция. Blend материалов.",cat:"blend"},
    {name:"saturate(x)",ret:"floatN",desc:"Клампит в [0,1]. Эквивалент clamp(x,0,1).",cat:"blend"},
    {name:"step(edge,x)",ret:"floatN",desc:"0 если x < edge, иначе 1. Резкий переход.",cat:"blend"},
    {name:"smoothstep(e0,e1,x)",ret:"floatN",desc:"Плавный S-переход между 0 и 1.",cat:"blend"},
    {name:"clamp(x,mn,mx)",ret:"floatN",desc:"Ограничивает значение диапазоном [mn,mx].",cat:"blend"},
    {name:"mul(M,V)",ret:"floatN",desc:"Умножение матрицы на вектор. Трансформации.",cat:"matrix"},
    {name:"transpose(M)",ret:"floatNxN",desc:"Транспонирование матрицы.",cat:"matrix"},
    {name:"Tex.Sample(S,UV)",ret:"float4",desc:"Семплирование текстуры в pixel shader.",cat:"texture"},
    {name:"Tex.SampleLevel(S,UV,mip)",ret:"float4",desc:"Явный mip. Нужен в VS, CS — нет ddx/ddy.",cat:"texture"},
  ];
  const [cat,setCat]=useState("all");
  const cats=["all","math","blend","matrix","texture"];
  const filtered=cat==="all"?fns:fns.filter(f=>f.cat===cat);
  const catCol={math:C.orange,blend:C.green,matrix:C.purple,texture:C.accent,all:C.muted};
  return(
    <div>
      <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
        {cats.map(c=>(<button key={c} onClick={()=>setCat(c)} style={{background:cat===c?catCol[c]+"22":"transparent",border:`1px solid ${cat===c?catCol[c]:C.border}`,borderRadius:6,padding:"5px 12px",color:cat===c?catCol[c]:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{c}</button>))}
      </div>
      <div style={{display:"grid",gap:6}}>
        {filtered.map(({name,ret,desc,cat:fc})=>(
          <div key={name} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px"}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:5,flexWrap:"wrap"}}>
              <span style={{fontFamily:"monospace",fontSize:12,color:catCol[fc],whiteSpace:"nowrap"}}>{name}</span>
              <span style={{fontFamily:"monospace",fontSize:10,color:C.purple,background:C.purple+"15",padding:"1px 6px",borderRadius:3,whiteSpace:"nowrap"}}>{ret}</span>
            </div>
            <div style={{fontSize:13,color:C.muted,lineHeight:1.6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UVDemo(){
  const canvasRef=useRef(null);
  const [tileX,setTileX]=useState(2);
  const [tileY,setTileY]=useState(2);
  const [offsetX,setOffsetX]=useState(0);
  const [offsetY,setOffsetY]=useState(0);
  const [rot,setRot]=useState(0);
  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext("2d"),W=220,H=220;
    ctx.clearRect(0,0,W,H);ctx.fillStyle=C.bg;ctx.fillRect(0,0,W,H);
    const rad=rot*Math.PI/180,cos=Math.cos(rad),sin=Math.sin(rad);
    for(let px=0;px<W;px+=2){for(let py=0;py<H;py+=2){
      let u=px/W,v=py/H;
      u-=0.5;v-=0.5;
      const ru=u*cos-v*sin,rv=u*sin+v*cos;
      u=((ru+0.5)*tileX+offsetX%1+1)%1;
      v=((rv+0.5)*tileY+offsetY%1+1)%1;
      const cx2=Math.floor(u*8),cy2=Math.floor(v*8);
      ctx.fillStyle=(cx2+cy2)%2===0?"#1a3a1a":"#0a1a0a";ctx.fillRect(px,py,2,2);
      if(Math.abs((u*8)%1)<0.05||Math.abs((v*8)%1)<0.05){ctx.fillStyle=C.green+"44";ctx.fillRect(px,py,2,2);}
    }}
    ctx.strokeStyle=C.border;ctx.lineWidth=1;ctx.strokeRect(0,0,W,H);
  },[tileX,tileY,offsetX,offsetY,rot]);
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap",alignItems:"flex-start"}}>
      <div>
        <canvas ref={canvasRef} width={220} height={220} style={{borderRadius:8,border:`1px solid ${C.border}`,display:"block"}}/>
        <div style={{marginTop:8,fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"center"}}>UV preview (checkerboard)</div>
      </div>
      <div style={{flex:1,minWidth:220}}>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
          {[{label:"Tile X",val:tileX,set:setTileX,min:0.5,max:8,step:0.5,col:C.orange},{label:"Tile Y",val:tileY,set:setTileY,min:0.5,max:8,step:0.5,col:C.orange},{label:"Offset X",val:offsetX,set:setOffsetX,min:-1,max:1,step:0.05,col:C.accent},{label:"Offset Y",val:offsetY,set:setOffsetY,min:-1,max:1,step:0.05,col:C.accent},{label:"Rotation °",val:rot,set:setRot,min:0,max:360,step:5,col:C.green}].map(({label,val,set,min,max,step,col})=>(<label key={label} style={{fontFamily:"monospace",fontSize:11,color:C.muted}}>{label}: <span style={{color:col}}>{parseFloat(val).toFixed(2)}</span><input type="range" min={min} max={max} step={step} value={val} onChange={e=>set(Number(e.target.value))} style={{width:"100%",accentColor:col,display:"block",marginTop:2}}/></label>))}
        </div>
        <Code lang="hlsl">{`// Тайлинг + Offset
uv = uv * float2(TileX, TileY)
   + float2(OffsetX, OffsetY);

// Вращение вокруг центра (0.5, 0.5)
uv -= 0.5;
float s = sin(Angle); float c = cos(Angle);
uv = float2(uv.x*c - uv.y*s,
            uv.x*s + uv.y*c);
uv += 0.5;`}</Code>
      </div>
    </div>
  );
}

function NormalMappingExplainer(){
  const lang=useLang();
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <svg width={220} height={200} style={{border:`1px solid ${C.border}`,borderRadius:8,background:C.bg,display:"block",flexShrink:0}}>
        <defs>{[["nmN",C.green],["nmT",C.yellow],["nmB",C.purple],["nmPN",C.green+"99"]].map(([id,col])=>(<marker key={id} id={id} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill={col}/></marker>))}</defs>
        {[...Array(11)].map((_,i)=>(<g key={i}><line x1={i*20} y1={0} x2={i*20} y2={200} stroke="#1a1d26" strokeWidth={1}/><line x1={0} y1={i*20} x2={220} y2={i*20} stroke="#1a1d26" strokeWidth={1}/></g>))}
        <rect x={20} y={145} width={180} height={28} rx={3} fill={C.surface} stroke={C.border} strokeWidth={1}/>
        <text x={110} y={163} textAnchor="middle" fill={C.muted} fontSize={9} fontFamily="monospace">surface (world space)</text>
        <line x1={110} y1={145} x2={110} y2={55} stroke={C.green} strokeWidth={2} markerEnd="url(#nmN)"/>
        <text x={116} y={52} fill={C.green} fontSize={11} fontFamily="monospace" fontWeight="bold">N</text>
        <line x1={110} y1={145} x2={152} y2={78} stroke={C.green+"88"} strokeWidth={1.5} strokeDasharray="4,3" markerEnd="url(#nmPN)"/>
        <text x={156} y={76} fill={C.green+"88"} fontSize={10} fontFamily="monospace">N'</text>
        <line x1={110} y1={145} x2={185} y2={145} stroke={C.yellow} strokeWidth={2} markerEnd="url(#nmT)"/>
        <text x={188} y={143} fill={C.yellow} fontSize={11} fontFamily="monospace" fontWeight="bold">T</text>
        <line x1={110} y1={145} x2={40} y2={125} stroke={C.purple} strokeWidth={2} markerEnd="url(#nmB)"/>
        <text x={26} y={123} fill={C.purple} fontSize={11} fontFamily="monospace" fontWeight="bold">B</text>
        <rect x={18} y={12} width={52} height={46} rx={4} fill="#4a6aff22" stroke="#4a6aff55" strokeWidth={1}/>
        <text x={44} y={30} textAnchor="middle" fill="#4a6aff" fontSize={8} fontFamily="monospace">normal</text>
        <text x={44} y={42} textAnchor="middle" fill="#4a6aff" fontSize={8} fontFamily="monospace">map</text>
        <text x={44} y={52} textAnchor="middle" fill="#4a6aff" fontSize={8} fontFamily="monospace">RGB→XYZ</text>
        <line x1={70} y1={35} x2={95} y2={115} stroke="#4a6aff44" strokeWidth={1} strokeDasharray="3,3"/>
        <circle cx={110} cy={145} r={3} fill="#ffffff44"/>
      </svg>
      <div style={{flex:1,minWidth:220,display:"flex",flexDirection:"column",gap:12}}>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>{lang==='ru'?"КАК РАБОТАЕТ":"HOW IT WORKS"}</div>
          {["Normal map хранит векторы в Tangent Space (RGB → XYZ, [0,1] → [-1,1])",lang==='ru'?"TBN матрица из Tangent (T), Bitangent (B), Normal (N)":"TBN matrix from Tangent (T), Bitangent (B), Normal (N)",lang==='ru'?"Вектор из normal map × TBN → World Space нормаль":"Vector from normal map × TBN → World Space normal",lang==='ru'?"World нормаль используется для lighting вместо геометрической":"World normal used for lighting instead of geometric"].map((t,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:7}}><span style={{color:C.accent,fontFamily:"monospace",flexShrink:0}}>{i+1}.</span><span style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{t}</span></div>))}
        </div>
        <Code lang="hlsl">{`float3 raw = NormalTex.Sample(S, uv).rgb;
float3 tN  = raw * 2.0 - 1.0; // [0,1]→[-1,1]

float3 T = normalize(WorldTangent);
float3 N = normalize(WorldNormal);
T = normalize(T - dot(T,N)*N); // Gram-Schmidt
float3 B = cross(N, T);
float3x3 TBN = float3x3(T, B, N);

float3 worldN = mul(tN, TBN);`}</Code>
      </div>
    </div>
  );
}

// ══ MODULE 4 — UE5 RENDERING ══════════════════════════════════════════════
function GBufferViz(){
  const lang=useLang();
  const [active,setActive]=useState(0);
  const buffers=[
    {name:"GBufferA",label:"World Normal",col:C.accent,
     desc:"RGB: нормаль поверхности в World Space после normal mapping. Alpha: shading model ID (Unlit=0, Default Lit=1, Subsurface=2...).",
     why:lang==='ru'?"Нужна для Lighting Pass — без нормали не посчитать diffuse/specular.":"Needed for Lighting Pass — can't compute diffuse/specular without normals."},
    {name:"GBufferB",label:"Metallic · Specular · Roughness",col:C.yellow,
     desc:"R: Metallic (0=диэлектрик, 1=металл). G: Specular (отражательная способность, обычно 0.5). B: Roughness. A: тени/AO флаги.",
     why:"PBR параметры для Lighting Pass. Одна текстура вместо трёх экономит bandwidth."},
    {name:"GBufferC",label:"Base Color",col:C.orange,
     desc:"RGB: Albedo — диффузный цвет. Alpha: Indirect irradiance или AO (зависит от версии движка).",
     why:"Диффузный цвет нужен при финальном сборе света: finalColor = albedo * irradiance."},
    {name:"GBufferD",label:"Custom Data",col:C.purple,
     desc:"Данные зависят от shading model. Subsurface: цвет рассеяния. Hair: анизотропия. Eye: iris mask.",
     why:"Расширяет базовый PBR для специализированных материалов без увеличения других буферов."},
    {name:"Scene Depth",label:"Depth Buffer",col:C.green,
     desc:"32-bit float глубина каждого пикселя. Используется для реконструкции world position, shadow comparisons, SSAO, DoF.",
     why:"Из depth + uv + InvViewProj можно восстановить world position — ключевой трюк deferred."},
  ];
  return(
    <div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
        {buffers.map((b,i)=>(<button key={i} onClick={()=>setActive(i)} style={{background:active===i?b.col+"22":"transparent",border:`1px solid ${active===i?b.col:C.border}`,borderRadius:6,padding:"6px 12px",color:active===i?b.col:C.muted,fontFamily:"monospace",fontSize:10,cursor:"pointer",whiteSpace:"nowrap"}}>{b.name}</button>))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:16,alignItems:"start"}}>
        <div style={{width:100,height:100,borderRadius:8,background:buffers[active].col+"22",border:`2px solid ${buffers[active].col}55`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <div style={{textAlign:"center"}}><div style={{fontFamily:"monospace",fontSize:10,color:buffers[active].col,fontWeight:700}}>{buffers[active].name}</div><div style={{fontSize:9,color:C.muted,marginTop:4}}>{buffers[active].label}</div></div>
        </div>
        <div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",marginBottom:8}}>
            <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:6}}>СОДЕРЖИМОЕ</div>
            <div style={{fontSize:12,color:C.text,lineHeight:1.7}}>{buffers[active].desc}</div>
          </div>
          <div style={{background:buffers[active].col+"12",border:`1px solid ${buffers[active].col}33`,borderRadius:8,padding:"12px 14px"}}>
            <div style={{fontFamily:"monospace",fontSize:10,color:buffers[active].col,marginBottom:4}}>ЗАЧЕМ НУЖЕН</div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>{buffers[active].why}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderPassesViz(){
  const lang=useLang();
  const stages=[
    {short:"DEPTH",name:"Depth PrePass (Early-Z)",col:C.muted,
     desc:"Рисует только depth, без цвета. Это позволяет Lighting Pass пропускать скрытые пиксели (Early-Z rejection). Опциональный, но важен для сложных сцен.",
     note:"Без PrePass GPU запускает pixel shader и только потом делает depth test — wasteful."},
    {short:"BASE",name:"Base Pass",col:C.orange,
     desc:"Записывает данные о поверхности в G-Buffer: нормали, albedo, roughness, metallic. Шейдеры материалов выполняются здесь. Освещение НЕ считается.",
     note:lang==='ru'?"В этом смысл deferred: разделить geometry pass и lighting pass.":"This is the point of deferred: separate geometry pass from lighting pass."},
    {short:"LIGHT",name:"Lighting Pass",col:C.yellow,
     desc:"Читает G-Buffer, запускает все источники света. Каждый свет = screenspace quad или sphere. Считает diffuse, specular, shadows для всей сцены за один проход.",
     note:"Ключевое преимущество deferred: N lights = N passes, не N×M materials×lights."},
    {short:"LUMEN",name:"Lumen GI / Reflection",col:C.accent,
     desc:"Global illumination и отражения от Lumen. Software ray tracing по distance fields или Hardware RT. Добавляет indirect light и отражения.",
     note:"Lumen работает после Lighting Pass, дополняя его indirect освещением."},
    {short:"TRANS",name:"Translucency",col:C.purple,
     desc:"Прозрачные объекты рендерятся отдельно в Forward режиме (sorted back-to-front). G-Buffer для них не используется — нет depth write.",
     note:"Это основная причина почему Nanite не работает с transparent материалами."},
    {short:"POST",name:"Post-Process",col:C.green,
     desc:"Bloom, Tone Mapping, DoF, Motion Blur, Chromatic Aberration, SSAO, TAA, упскейл (TSR/DLSS). Всё работает в screen space поверх готового кадра.",
     note:"Post-process дешёвый относительно geometry, но цепочка может быть длинной."},
  ];
  const [active,setActive]=useState(1);
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
        {stages.map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center",flexShrink:0}}><button onClick={()=>setActive(i)} style={{background:active===i?s.col+"22":"transparent",border:`1px solid ${active===i?s.col:C.border}`,borderRadius:6,padding:"7px 11px",color:active===i?s.col:C.muted,fontFamily:"monospace",fontSize:10,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.15s"}}>{s.short}</button>{i<stages.length-1&&<span style={{color:C.dim,fontSize:18,margin:"0 3px"}}>→</span>}</div>))}
      </div>
      <div style={{background:C.card,border:`1px solid ${stages[active].col}44`,borderRadius:10,padding:20}}>
        <div style={{color:stages[active].col,fontFamily:"monospace",fontWeight:700,fontSize:15,marginBottom:8}}>{stages[active].name}</div>
        <div style={{color:C.text,fontSize:13,lineHeight:1.7,marginBottom:10}}>{stages[active].desc}</div>
        <div style={{background:stages[active].col+"12",border:`1px solid ${stages[active].col}33`,borderRadius:6,padding:"8px 12px",fontSize:12,color:C.muted}}>
          <span style={{color:stages[active].col,fontFamily:"monospace",fontSize:10}}>{lang==='ru'?"NOTE › ":"NOTE › "}</span>{stages[active].note}
        </div>
      </div>
    </div>
  );
}

function DeferredVsForward(){
  const lang=useLang();
  const rows=[
    {prop:"Lights",def:lang==='ru'?"N×M дорого → N отдельных passes":"N×M expensive → N separate passes",fwd:lang==='ru'?"Per-object, дорого при N lights":"Per-object, expensive with N lights"},
    {prop:"Transparency",def:lang==='ru'?"Отдельный forward pass":"Separate forward pass",fwd:lang==='ru'?"Нативно":"Native"},
    {prop:"MSAA",def:lang==='ru'?"Дорого/невозможно":"Expensive/not possible",fwd:lang==='ru'?"Нативно":"Native"},
    {prop:"Memory",def:lang==='ru'?"Дорого (G-Buffer = ~100+ MB)":"Expensive (G-Buffer = ~100+ MB)",fwd:lang==='ru'?"Дёшево":"Cheap"},
    {prop:"Mobile",def:lang==='ru'?"Плохо (bandwidth)":"Poor (bandwidth)",fwd:lang==='ru'?"Стандарт для mobile":"Standard for mobile"},
    {prop:"Materials",def:lang==='ru'?"Неограниченно (все в G-Buffer)":"Unlimited (all in G-Buffer)",fwd:lang==='ru'?"Дорого при многих материалах":"Expensive with many materials"},
    {prop:"UE5 default",def:lang==='ru'?"✓ Да":"✓ Yes",fwd:lang==='ru'?"Только для мобильных проектов":"Mobile projects only"},
  ];
  return(
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"separate",borderSpacing:2,minWidth:400}}>
        <thead><tr>
          <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 12px",textAlign:"left",fontFamily:"monospace",fontSize:10,color:C.muted}}>{lang==='ru'?"Параметр":"Parameter"}</th>
          <th style={{background:C.orange+"18",border:`1px solid ${C.orange}44`,padding:"8px 12px",textAlign:"left",fontFamily:"monospace",fontSize:10,color:C.orange}}>Deferred (UE5)</th>
          <th style={{background:C.accent+"18",border:`1px solid ${C.accent}44`,padding:"8px 12px",textAlign:"left",fontFamily:"monospace",fontSize:10,color:C.accent}}>Forward</th>
        </tr></thead>
        <tbody>{rows.map(({prop,def,fwd})=>(<tr key={prop}>
          <td style={{background:"#111827",border:`1px solid ${C.border}`,padding:"8px 12px",fontFamily:"monospace",fontSize:11,color:C.muted}}>{prop}</td>
          <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 12px",fontSize:12,color:C.text}}>{def}</td>
          <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 12px",fontSize:12,color:C.text}}>{fwd}</td>
        </tr>))}</tbody>
      </table>
    </div>
  );
}

function LumenNaniteVSM(){
  const lang=useLang();
  const [tab,setTab]=useState("lumen");
  const items={
    lumen:{col:C.accent,title:"Lumen — Global Illumination",sections:[
      {label:lang==='ru'?"ЧТО ТАКОЕ":"WHAT IS",text:lang==='ru'?"Полностью динамическая система Global Illumination и отражений. Работает без запечённых лайтмапов. Свет обновляется в реальном времени при изменении геометрии и источников.":"Fully dynamic Global Illumination and reflections system. Works without baked lightmaps. Light updates in real time when geometry or sources change."},
      {label:"КАК РАБОТАЕТ",text:lang==='ru'?"Software Ray Tracing: трассирует лучи по Distance Fields и Surface Cache — не по треугольникам. Hardware Ray Tracing: трассирует по реальной геометрии, точнее, но дороже. Результат — indirect lighting и отражения.":"Software Ray Tracing: traces rays through Distance Fields and Surface Cache, not triangles. Hardware Ray Tracing: real geometry, more accurate, more expensive. Result — indirect lighting and reflections."},
      {label:"ОГРАНИЧЕНИЯ",text:lang==='ru'?"Не работает на мобильных платформах. Заметная задержка при резких изменениях освещения. Masked/translucent материалы не отражают свет корректно. Performance cost значительный (≈2-4ms на ПК).":"Doesn't work on mobile. Noticeable latency on sudden lighting changes. Masked/translucent materials don't reflect correctly. Significant performance cost (≈2-4ms on PC)."},
      {label:lang==='ru'?"НАСТРОЙКА В UE5":"SETUP IN UE5",text:"Project Settings → Rendering → Global Illumination → Lumen. В PostProcessVolume: Lumen Global Illumination, Lumen Reflections. r.Lumen.Reflections.Allow 1."},
    ]},
    nanite:{col:C.green,title:"Nanite — Virtualized Geometry",sections:[
      {label:lang==='ru'?"ЧТО ТАКОЕ":"WHAT IS",text:lang==='ru'?"Система виртуализированной микрополигональной геометрии. Позволяет использовать модели с миллионами полигонов без ручной настройки LOD. GPU рендерит только видимые кластеры треугольников.":"Virtualized micropolygon geometry system. Allows millions-of-polygon models without manual LOD. GPU renders only visible triangle clusters."},
      {label:"КАК РАБОТАЕТ",text:lang==='ru'?"Меш делится на иерархические кластеры (clusters). GPU выбирает нужный уровень детализации для каждого кластера в реальном времени на основе экранного размера. Невидимые кластеры полностью пропускаются.":"Mesh divided into hierarchical clusters. GPU selects detail level per cluster in real time based on screen size. Invisible clusters fully skipped."},
      {label:"ОГРАНИЧЕНИЯ",text:lang==='ru'?"НЕ работает с: Masked/Translucent материалами (только Opaque), World Position Offset (WPO движение в шейдере — в UE5.1+ частично поддерживается), Deformable meshes, Skeletal meshes. Не для mobile.":"Does NOT work with: Masked/Translucent materials (Opaque only), World Position Offset (WPO shader movement — partial UE5.1+ support), Deformable/Skeletal meshes. Not for mobile."},
      {label:lang==='ru'?"КОГДА ИСПОЛЬЗОВАТЬ":"WHEN TO USE",text:lang==='ru'?"Архитектура, environment props, скалы, деревья (Static Mesh). НЕ для персонажей, флагов, анимированных объектов. Включается в Static Mesh Editor → Enable Nanite.":"Architecture, environment props, rocks, trees (Static Mesh). NOT for characters, flags, animated objects. Enable in Static Mesh Editor → Enable Nanite."},
    ]},
    vsm:{col:C.purple,title:"Virtual Shadow Maps",sections:[
      {label:lang==='ru'?"ЧТО ТАКОЕ":"WHAT IS",text:lang==='ru'?"Система теней для Nanite-объектов. Традиционные shadow maps не работают с Nanite — VSM решает это через виртуализацию: хранится только видимая часть shadow map.":"Shadow system for Nanite objects. Traditional shadow maps don't work with Nanite — VSM solves this via virtualization: only visible shadow map portions stored."},
      {label:"КАК РАБОТАЕТ",text:"Shadow map разбивается на страницы (pages). Только страницы, видимые камере, рендерятся и хранятся в памяти. Это позволяет иметь очень высокое разрешение теней (16K+) без огромных затрат VRAM."},
      {label:"ОГРАНИЧЕНИЯ",text:"Может мерцать на динамических объектах. Cache invalidation при движении объектов дорогой. Требует достаточно VRAM для страниц. Не идеален для быстро движущихся источников света."},
      {label:"НАСТРОЙКА",text:"Включается автоматически с Lumen. r.Shadow.Virtual.Enable 1. Shadow bias важен — Virtual Shadow Map Bias в Light настройках."},
    ]},
  };
  const cur=items[tab];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:16}}>
        {Object.entries(items).map(([key,val])=>(<button key={key} onClick={()=>setTab(key)} style={{background:tab===key?val.col+"22":"transparent",border:`1px solid ${tab===key?val.col:C.border}`,borderRadius:6,padding:"6px 14px",color:tab===key?val.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{key.toUpperCase()}</button>))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {cur.sections.map(({label,text})=>(<div key={label} style={{background:cur.col+"10",border:`1px solid ${cur.col}22`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:cur.col,marginBottom:6,letterSpacing:1}}>{label}</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.7}}>{text}</div>
        </div>))}
      </div>
    </div>
  );
}

// ══ MODULE 5 — UE5 OPTIMIZATION ═══════════════════════════════════════════
function ProfilingTools(){
  const lang=useLang();
  const [tool,setTool]=useState("stat");
  const tools={
    stat:{col:C.accent,label:"stat GPU / stat Unit",items:[
      {cmd:"stat GPU",desc:lang==='ru'?"Показывает время каждого GPU pass в ms. Ключевой инструмент.":"Shows time per GPU pass in ms. Key profiling tool."},
      {cmd:"stat Unit",desc:lang==='ru'?"CPU/GPU/Frame/Game time. Сразу видно что является bottleneck.":"CPU/GPU/Frame/Game time. Instantly shows what's the bottleneck."},
      {cmd:"stat SceneRendering",desc:lang==='ru'?"Draw calls, primitives, mesh draw calls по категориям.":"Draw calls, primitives, mesh draw calls by category."},
      {cmd:"stat RHI",desc:"RHI draw calls, triangles, dispatch calls."},
      {cmd:"r.ScreenPercentage 50",desc:lang==='ru'?"Снизить разрешение — если FPS вырос, значит GPU-bound.":"Lower resolution — if FPS increases, it's GPU-bound."},
      {cmd:"profilegpu",desc:lang==='ru'?"Один подробный кадр GPU профайлинга с деревом passes.":"One detailed GPU profiling frame with pass tree."},
    ]},
    insights:{col:C.orange,label:"Unreal Insights",items:[
      {cmd:"Trace",desc:"Запись сессии: CPU threads, GPU timeline, memory, frames."},
      {cmd:"CPU Track",desc:"Видно какой Blueprint/код тормозит на CPU по функциям."},
      {cmd:"GPU Track",desc:"Все render passes с точным временем выполнения."},
      {cmd:"Memory Track",desc:"VRAM и RAM allocation по ассетам."},
      {cmd:"Frame Analysis",desc:"Сравнение кадров, поиск hitches и spike'ов."},
    ]},
    renderdoc:{col:C.green,label:"RenderDoc",items:[
      {cmd:"Capture Frame",desc:"Снимок одного кадра с полным GPU состоянием."},
      {cmd:"Event Browser",desc:"Все draw calls, compute dispatches в хронологии."},
      {cmd:"Pipeline State",desc:"Активные шейдеры, render targets, depth buffer."},
      {cmd:"Texture Viewer",desc:"Просмотр G-Buffer каналов, shadow maps, любых RT."},
      {cmd:"Shader Debug",desc:"Пошаговая отладка vertex/pixel shader (на Vulkan/DX12)."},
      {cmd:"Timing",desc:"Время каждого draw call. Поиск самых дорогих операций."},
    ]},
  };
  const cur=tools[tool];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:16,flexWrap:"wrap"}}>
        {Object.entries(tools).map(([key,val])=>(<button key={key} onClick={()=>setTool(key)} style={{background:tool===key?val.col+"22":"transparent",border:`1px solid ${tool===key?val.col:C.border}`,borderRadius:6,padding:"6px 14px",color:tool===key?val.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{val.label}</button>))}
      </div>
      <div style={{display:"grid",gap:6}}>
        {cur.items.map(({cmd,desc})=>(<div key={cmd} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:12,color:cur.col,marginBottom:4}}>{cmd}</div>
          <div style={{fontSize:13,color:C.muted,lineHeight:1.6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{desc}</div>
        </div>))}
      </div>
    </div>
  );
}

function LODViz(){
  const lang=useLang();
  const [screenPct,setScreenPct]=useState(15);
  const lodLevels=[
    {lod:0,threshold:100,label:"LOD 0",desc:lang==='ru'?"Оригинал. Близко к камере.":"Original. Close to camera.",col:C.green},
    {lod:1,threshold:50,label:"LOD 1",desc:lang==='ru'?"~50% полигонов.":"~50% polygons.",col:C.accent},
    {lod:2,threshold:15,label:"LOD 2",desc:lang==='ru'?"~25% полигонов.":"~25% polygons.",col:C.yellow},
    {lod:3,threshold:5,label:"LOD 3",desc:lang==='ru'?"~10% полигонов.":"~10% polygons.",col:C.orange},
    {lod:4,threshold:1,label:"Culled",desc:lang==='ru'?"Объект скрыт.":"Object hidden.",col:C.red},
  ];
  const activeLod=lodLevels.findIndex((l,i)=>screenPct>=l.threshold||(i===lodLevels.length-1))||0;
  const currentLod=lodLevels.filter(l=>screenPct>=l.threshold).pop()||lodLevels[lodLevels.length-1];
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <div style={{flex:1,minWidth:220}}>
        <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:4}}>{lang==='ru'?"РАЗМЕР ОБЪЕКТА НА ЭКРАНЕ":"OBJECT SCREEN SIZE"}</div>
        <div style={{fontFamily:"monospace",fontSize:32,fontWeight:700,color:currentLod.col,marginBottom:8}}>{screenPct}%</div>
        <input type="range" min={0} max={100} value={screenPct} onChange={e=>setScreenPct(Number(e.target.value))} style={{width:"100%",accentColor:currentLod.col,marginBottom:16}}/>
        <div style={{background:currentLod.col+"18",border:`1px solid ${currentLod.col}44`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:12,color:currentLod.col,fontWeight:700}}>{currentLod.label}</div>
          <div style={{fontSize:12,color:C.muted,marginTop:4}}>{currentLod.desc}</div>
        </div>
      </div>
      <div style={{flex:1,minWidth:220}}>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
          {lodLevels.map(l=>(<div key={l.lod} style={{background:screenPct>=l.threshold?l.col+"18":C.dim+"40",border:`1px solid ${screenPct>=l.threshold?l.col+"44":C.border}`,borderRadius:6,padding:"8px 12px",transition:"all 0.2s"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:"monospace",fontSize:11,color:screenPct>=l.threshold?l.col:C.dim}}>{l.label}</span><span style={{fontFamily:"monospace",fontSize:10,color:C.muted}}>≥{l.threshold}%</span></div>
          </div>))}
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>{lang==='ru'?"НАСТРОЙКА В UE5":"SETUP IN UE5"}</div>
          {["Static Mesh Editor → LOD Settings","Screen Size — значение от 0.0 до 1.0 (не %)","Auto LOD generation: Reduction Settings → % triangles","HISM автоматически управляет LOD для instanced meshes","Nanite заменяет ручной LOD для statc meshes"].map(t=>(<div key={t} style={{fontSize:11,color:C.muted,marginBottom:5}}>› {t}</div>))}
        </div>
      </div>
    </div>
  );
}

function InstancingViz(){
  const lang=useLang();
  const [mode,setMode]=useState("ism");
  const modes={
    none:{col:C.red,label:lang==='ru'?lang==='ru'?"Без instancing":"Without instancing":"Without Instancing",draws:200,desc:"Каждый mesh = отдельный draw call. 200 деревьев = 200 draw calls. CPU bottleneck."},
    ism:{col:C.yellow,label:"ISM",draws:1,desc:"Instanced Static Mesh. Все копии = 1 draw call. Но все видны всегда — нет culling per-instance."},
    hism:{col:C.green,label:"HISM",draws:"1-5",desc:"Hierarchical ISM. Draw call + автоматический culling + LOD per-instance. Оптимальный вариант для foliage, толпы."},
  };
  const cur=modes[mode];
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <div style={{flex:1,minWidth:220}}>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
          {Object.entries(modes).map(([key,val])=>(<button key={key} onClick={()=>setMode(key)} style={{background:mode===key?val.col+"22":"transparent",border:`1px solid ${mode===key?val.col:C.border}`,borderRadius:8,padding:"10px 14px",color:mode===key?val.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer",textAlign:"left"}}>
            <div style={{fontWeight:700,marginBottom:2}}>{val.label}</div>
            <div style={{fontSize:10,color:mode===key?val.col:C.dim}}>Draw calls: {val.draws}</div>
          </button>))}
        </div>
      </div>
      <div style={{flex:1,minWidth:220}}>
        <div style={{background:cur.col+"15",border:`1px solid ${cur.col}44`,borderRadius:8,padding:"14px 16px",marginBottom:12}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:cur.col,marginBottom:8,letterSpacing:1}}>DRAW CALLS</div>
          <div style={{fontFamily:"monospace",fontSize:48,fontWeight:700,color:cur.col}}>{cur.draws}</div>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",marginBottom:10}}>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.7}}>{cur.desc}</div>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>КОГДА ПРИМЕНЯТЬ</div>
          {[{t:"ISM",d:"Статичные объекты без culling нужды (колонны, плитка)",c:C.yellow},{t:"HISM",d:"Foliage, деревья, камни — всё что много и в большом мире",c:C.green},{t:"Nanite",d:"Если поддерживается — заменяет HISM для opaque static meshes",c:C.accent}].map(({t,d,c})=>(<div key={t} style={{marginBottom:8}}><span style={{fontFamily:"monospace",fontSize:10,color:c}}>{t}:</span><span style={{fontSize:11,color:C.muted,marginLeft:6}}>{d}</span></div>))}
        </div>
      </div>
    </div>
  );
}

function TextureOptimization(){
  const lang=useLang();
  const items=[
    {title:"Texture Streaming",col:C.accent,
     points:[lang==='ru'?"UE5 загружает mip-уровни по мере приближения камеры":"UE5 loads mip levels as camera approaches",lang==='ru'?"r.Streaming.PoolSize — размер пула в MB (default 1000)":"r.Streaming.PoolSize — pool size in MB (default 1000)",lang==='ru'?"Stat TextureGroup показывает использование по группам":"Stat TextureGroup shows usage per group","Texture Group определяет приоритет стриминга (World, Character, UI...)"]},
    {title:lang==='ru'?"Форматы и компрессия":"Formats and compression",col:C.orange,
     points:["BC1 (DXT1): RGB без альфы, 4bpp. Diffuse без прозрачности","BC3 (DXT5): RGBA, 8bpp. Diffuse с альфой, normal maps (вариант)","BC5: RG, 8bpp. Оптимально для normal maps (только RG хранятся)","BC7: высокое качество RGBA, 8bpp. Для сложных материалов","ASTC: мобильные платформы, гибкий ratio"]},
    {title:lang==='ru'?"Mip Maps":"Mip Maps",col:C.green,
     points:["Всегда включай mip maps для world textures (экономит bandwidth)","LOD Bias — сдвигает начальный mip (положительный = меньше)","Mip Gen Settings: Sharpen для detail maps, Blur для smooth masks","Без mips: aliasing вдали + GPU читает полный mip0 даже для далёких пикселей"]},
    {title:"Бюджет и оптимизация",col:C.purple,
     points:["VRAM budget на консолях: 4-8 GB, держи текстуры в пределах","Texture Streaming Pool Overflow — критичный варнинг в логах","Size: 4K только для hero assets, 2K стандарт, 1K для мелкого","Stat Memory показывает общее использование текстур"]},
  ];
  return(
    <div style={{display:"grid",gap:12}}>
      {items.map(({title,col,points})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:10}}>{title}</div>
        {points.map(p=>(<div key={p} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:col,flexShrink:0,fontSize:12}}>›</span><span style={{fontSize:13,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{p}</span></div>))}
      </div>))}
    </div>
  );
}

function OverdrawSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <svg width={220} height={180} style={{border:`1px solid ${C.border}`,borderRadius:8,background:C.bg,display:"block",flexShrink:0}}>
        <rect x={10} y={10} width={200} height={160} rx={4} fill={C.dim} stroke={C.border} strokeWidth={1}/>
        <text x={110} y={36} textAnchor="middle" fill={C.muted} fontSize={9} fontFamily="monospace">background (1×)</text>
        <rect x={30} y={30} width={160} height={120} rx={4} fill={C.accent+"22"} stroke={C.accent+"44"} strokeWidth={1}/>
        <text x={110} y={56} textAnchor="middle" fill={C.accent} fontSize={9} fontFamily="monospace">object 2 (2×)</text>
        <rect x={60} y={55} width={100} height={80} rx={4} fill={C.orange+"33"} stroke={C.orange+"66"} strokeWidth={1}/>
        <text x={110} y={92} textAnchor="middle" fill={C.orange} fontSize={11} fontFamily="monospace" fontWeight="bold">3× overdraw</text>
        <text x={22} y={175} fill={C.muted} fontSize={8} fontFamily="monospace">1×</text>
        <text x={50} y={175} fill={C.accent} fontSize={8} fontFamily="monospace">2×</text>
        <text x={80} y={175} fill={C.orange} fontSize={8} fontFamily="monospace">3× overdraw</text>
      </svg>
      <div style={{flex:1,minWidth:200}}>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",marginBottom:10}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:6}}>ЧТО ТАКОЕ OVERDRAW</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.7}}>Pixel shader запускается <span style={{color:C.orange}}>несколько раз</span> для одного пикселя. Результат предыдущего прохода выбрасывается. Критично для particle систем и прозрачности.</div>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>КАК СНИЗИТЬ</div>
          {[{t:"Depth PrePass",d:lang==='ru'?"PS не запускается для скрытых пикселей":"PS doesn't run for hidden pixels",c:C.green},{t:"Front-to-back",d:lang==='ru'?"Opaque: ближние первыми, z-test убивает дальние":"Opaque: front-to-back, z-test kills far pixels",c:C.accent},{t:"Frustum/Occlusion Culling",d:lang==='ru'?"Не отправлять скрытую геометрию":"Don't submit hidden geometry",c:C.yellow},{t:"Упрощение particles",d:"Минимизировать слои прозрачности",c:C.orange}].map(({t,d,c})=>(<div key={t} style={{marginBottom:8}}><span style={{fontFamily:"monospace",fontSize:10,color:c}}>{t}</span><div style={{fontSize:11,color:C.muted}}>{d}</div></div>))}
        </div>
      </div>
    </div>
  );
}


// ══ MODULE 6 — PIPELINE / TOOLS + MAYA ═══════════════════════════════════
function PythonAPIRef(){
  const lang=useLang();
  const [section,setSection]=useState("core");
  const sections={
    core:{col:C.accent,label:"Core API",items:[
      {cmd:"import unreal",desc:lang==='ru'?"Импорт основного модуля. Работает в UE Python консоли и скриптах.":"Import main module. Works in UE Python console and scripts."},
      {cmd:"unreal.EditorAssetLibrary",desc:"Основной класс для работы с ассетами: load, save, rename, duplicate, delete."},
      {cmd:"unreal.AssetRegistryHelpers",desc:"Поиск ассетов по фильтрам — тип, путь, теги. Быстрее чем load каждого."},
      {cmd:"unreal.EditorLevelLibrary",desc:"Работа с уровнем: spawn actors, get all actors, get selected actors."},
      {cmd:"unreal.EditorUtilityLibrary",desc:lang==='ru'?"Утилиты для Editor: get selected assets, get selected actors.":"Editor utilities: get selected assets, get selected actors."},
      {cmd:"unreal.SystemLibrary",desc:"Print string, is valid, timer functions и общие утилиты."},
    ]},
    assets:{col:C.orange,label:"Ассеты",items:[
      {cmd:"load_asset('/Game/Path/Asset')",desc:"Загружает ассет в память. Возвращает объект ассета."},
      {cmd:"find_asset_data('/Game/Path')",desc:"Находит AssetData без загрузки в память — быстро."},
      {cmd:"list_assets('/Game/Folder', recursive=True)",desc:"Список всех ассетов в папке. recursive=True — с подпапками."},
      {cmd:"rename_asset(src, dst)",desc:"Переименовывает ассет. Обновляет все ссылки (redirect)."},
      {cmd:"save_asset('/Game/Path/Asset')",desc:"Сохраняет ассет на диск."},
      {cmd:"does_asset_exist('/Game/Path')",desc:"Проверяет существование ассета без загрузки."},
    ]},
    actors:{col:C.green,label:"Акторы",items:[
      {cmd:"get_all_level_actors()",desc:"Возвращает список всех акторов на текущем уровне."},
      {cmd:"get_selected_level_actors()",desc:"Только выделенные акторы в редакторе."},
      {cmd:"spawn_actor_from_class(cls, loc, rot)",desc:"Спавнит актора указанного класса на уровне."},
      {cmd:"actor.get_actor_location()",desc:"Возвращает FVector позиции актора."},
      {cmd:"actor.set_actor_location(vec, sweep, teleport)",desc:"Устанавливает позицию актора."},
      {cmd:"actor.get_component_by_class(cls)",desc:"Получить компонент актора по классу."},
    ]},
    props:{col:C.purple,label:"Свойства",items:[
      {cmd:"obj.get_editor_property('name')",desc:"Читает editor-exposed свойство объекта по имени."},
      {cmd:"obj.set_editor_property('name', val)",desc:"Устанавливает свойство. Основной способ изменить настройки ассета."},
      {cmd:"unreal.EditorAssetLibrary.get_metadata_tag(asset, tag)",desc:"Читает metadata тег ассета (custom теги для пайплайна)."},
      {cmd:"unreal.EditorAssetLibrary.set_metadata_tag(asset, tag, val)",desc:"Устанавливает metadata тег — для naming conventions, статусов."},
    ]},
  };
  const cur=sections[section];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:16,flexWrap:"wrap"}}>
        {Object.entries(sections).map(([key,val])=>(<button key={key} onClick={()=>setSection(key)} style={{background:section===key?val.col+"22":"transparent",border:`1px solid ${section===key?val.col:C.border}`,borderRadius:6,padding:"5px 12px",color:section===key?val.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{val.label}</button>))}
      </div>
      <div style={{display:"grid",gap:6}}>
        {cur.items.map(({cmd,desc})=>(<div key={cmd} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px"}}><div style={{fontFamily:"monospace",fontSize:12,color:cur.col,marginBottom:4}}>{cmd}</div><div style={{fontSize:13,color:C.muted,lineHeight:1.6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{desc}</div></div>))}
      </div>
    </div>
  );
}

function PythonExamples(){
  const lang=useLang();
  const [ex,setEx]=useState(0);
  const examples=[
    {title:"Batch Rename Assets",col:C.accent,code:`import unreal

# Найти все Static Mesh в папке
reg = unreal.AssetRegistryHelpers.get_asset_registry()
filter = unreal.ARFilter(
    package_paths=["/Game/Props"],
    recursive_paths=True,
    class_names=["StaticMesh"]
)
assets = reg.get_assets(filter)

# Переименовать: добавить префикс SM_
for asset_data in assets:
    path = str(asset_data.package_name)
    name = str(asset_data.asset_name)
    if not name.startswith("SM_"):
        new_path = path.replace(name, "SM_" + name)
        unreal.EditorAssetLibrary.rename_asset(path, new_path)
        print(f"Renamed: {name} → SM_{name}")`},
    {title:"Asset Validation (naming check)",col:C.orange,code:`import unreal

PREFIXES = {
    "StaticMesh":    "SM_",
    "SkeletalMesh":  "SK_",
    "Texture2D":     "T_",
    "Material":      "M_",
    "Blueprint":     "BP_",
}

reg = unreal.AssetRegistryHelpers.get_asset_registry()
all_assets = reg.get_all_assets()

errors = []
for asset_data in all_assets:
    cls  = str(asset_data.asset_class)
    name = str(asset_data.asset_name)
    expected = PREFIXES.get(cls)
    if expected and not name.startswith(expected):
        errors.append(f"[{cls}] {name} → должен начинаться с {expected}")

for e in errors:
    unreal.log_warning(e)`},
    {title:"Spawn actors from CSV",col:C.green,code:`import unreal, csv

# CSV: name, x, y, z, mesh_path
with open("C:/props.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        loc = unreal.Vector(
            float(row["x"]),
            float(row["y"]),
            float(row["z"])
        )
        mesh = unreal.EditorAssetLibrary.load_asset(row["mesh_path"])
        actor = unreal.EditorLevelLibrary.spawn_actor_from_class(
            unreal.StaticMeshActor, loc
        )
        comp = actor.get_component_by_class(unreal.StaticMeshComponent)
        comp.set_editor_property("static_mesh", mesh)
        actor.set_actor_label(row["name"])`},
  ];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
        {examples.map((e,i)=>(<button key={i} onClick={()=>setEx(i)} style={{background:ex===i?e.col+"22":"transparent",border:`1px solid ${ex===i?e.col:C.border}`,borderRadius:6,padding:"6px 12px",color:ex===i?e.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{e.title}</button>))}
      </div>
      <Code lang="python">{examples[ex].code}</Code>
    </div>
  );
}

function EUWSection(){
  const lang=useLang();
  const items=[
    {title:lang==='ru'?"Что такое EUW":"What is EUW",col:C.accent,points:[lang==='ru'?"Editor Utility Widget — Blueprint-виджет, запускается внутри редактора как панель":"Editor Utility Widget — Blueprint widget running inside the editor as a panel",lang==='ru'?"Создаётся: Content Browser → Blueprint Class → EditorUtilityWidget":"Create: Content Browser → Blueprint Class → EditorUtilityWidget",lang==='ru'?"Запуск: ПКМ на EUW → Run Editor Utility Widget":"Launch: RMB on EUW → Run Editor Utility Widget",lang==='ru'?"Может вызывать Python скрипты через Execute Python Script node":"Can call Python scripts via Execute Python Script node"]},
    {title:lang==='ru'?"Типовые инструменты для TA":"Typical TA Tools",col:C.orange,points:["Asset Browser с кастомными фильтрами и batch операциями","LOD Manager — массовая настройка LOD для группы мешей","Material Switcher — замена материалов по паттерну","Texture Audit — отчёт по превышению бюджета","Scene Cleaner — поиск и удаление orphaned ассетов"]},
    {title:lang==='ru'?"Blueprint → Python коммуникация":"Blueprint → Python communication",col:C.green,points:["Execute Python Script (node) — запуск строки или файла .py","unreal.PythonScriptLibrary.execute_python_command(str)","Данные передаются через Editor Properties или Metadata tags","Для сложной логики: Python делает тяжёлую работу, EUW — UI"]},
    {title:"Commandlets (headless режим)",col:C.purple,points:["UE4Editor-Cmd.exe <project> -run=<CommandletName>","Для CI/CD: автоматическая валидация при коммите","ResavePackages — пересохранение ассетов без открытия редактора","Кастомный Commandlet: наследуется от UCommandlet в C++","Запуск Python headless: -ExecutePythonScript=script.py"]},
  ];
  return(
    <div style={{display:"grid",gap:10}}>
      {items.map(({title,col,points})=>(<div key={title} style={{background:col+"12",border:`1px solid ${col}33`,borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:10}}>{title}</div>
        {points.map(p=>(<div key={p} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:13,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{p}</span></div>))}
      </div>))}
    </div>
  );
}

function MayaPythonRef(){
  const [tab,setTab]=useState("cmds");
  const tabs={
    cmds:{col:C.accent,label:"maya.cmds",items:[
      {cmd:"cmds.ls(type='mesh')",desc:"Список всех mesh-нод в сцене. type= фильтрует по типу."},
      {cmd:"cmds.ls(selection=True)",desc:"Выделенные объекты. Основной способ получить текущий контекст."},
      {cmd:"cmds.select('pCube1')",desc:"Выбрать объект по имени."},
      {cmd:"cmds.rename('old', 'new')",desc:"Переименовать ноду."},
      {cmd:"cmds.duplicate(rr=True)",desc:"Дублировать с сохранением иерархии (returnRoots)."},
      {cmd:"cmds.delete('obj')",desc:"Удалить объект или компонент."},
      {cmd:"cmds.getAttr('obj.tx')",desc:"Получить значение атрибута. tx=translate X."},
      {cmd:"cmds.setAttr('obj.tx', 5.0)",desc:"Установить значение атрибута."},
      {cmd:"cmds.file(path, exportSelected=True, type='FBX')",desc:"Экспорт FBX. type= определяет формат."},
      {cmd:"cmds.polyCube(w=1, h=1, d=1)",desc:"Создать куб. Аналогично для других примитивов."},
    ]},
    pymel:{col:C.orange,label:"PyMEL",items:[
      {cmd:"import pymel.core as pm",desc:"Импорт PyMEL. Объектно-ориентированная обёртка над cmds."},
      {cmd:"pm.ls(type='mesh')",desc:"Аналог cmds.ls, но возвращает PyNode объекты."},
      {cmd:"node = pm.PyNode('pCube1')",desc:"Получить PyNode по имени — объект с методами."},
      {cmd:"node.tx.get()",desc:"Получить значение через атрибут объекта (чище чем getAttr)."},
      {cmd:"node.tx.set(5.0)",desc:"Установить значение через атрибут объекта."},
      {cmd:"node.listConnections()",desc:"Список всех соединений ноды. Удобно для анализа графа."},
    ]},
    diff:{col:C.green,label:"cmds vs PyMEL",items:[
      {cmd:"Скорость",desc:"cmds быстрее — прямые вызовы MEL команд без overhead."},
      {cmd:"Удобство",desc:"PyMEL удобнее для сложной логики — ООП, autocomplete, методы."},
      {cmd:"Возврат строк",desc:"cmds возвращает строки (имена нод). PyMEL — объекты PyNode."},
      {cmd:"Когда cmds",desc:"Простые скрипты, batch операции, скорость важна."},
      {cmd:"Когда PyMEL",desc:"Сложные инструменты, работа с иерархией, анализ графа."},
      {cmd:"pymxs (3ds Max)",desc:"Аналог PyMEL для 3ds Max. import pymxs; rt=pymxs.runtime."},
    ]},
  };
  const cur=tabs[tab];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
        {Object.entries(tabs).map(([key,val])=>(<button key={key} onClick={()=>setTab(key)} style={{background:tab===key?val.col+"22":"transparent",border:`1px solid ${tab===key?val.col:C.border}`,borderRadius:6,padding:"5px 12px",color:tab===key?val.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{val.label}</button>))}
      </div>
      <div style={{display:"grid",gap:6}}>
        {cur.items.map(({cmd,desc})=>(<div key={cmd} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px"}}><div style={{fontFamily:"monospace",fontSize:12,color:cur.col,marginBottom:4}}>{cmd}</div><div style={{fontSize:13,color:C.muted,lineHeight:1.6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{desc}</div></div>))}
      </div>
    </div>
  );
}

function BlueprintTATools(){
  const lang=useLang();
  const items=[
    {title:lang==='ru'?"Debug визуализация в рантайме":"Debug visualization at runtime",col:C.accent,points:[
      lang==='ru'?"Draw Debug Sphere / Box / Line — рисует примитивы прямо в viewport":"Draw Debug Sphere / Box / Line — draws primitives directly in viewport",
      lang==='ru'?"Print String — вывод значений без открытия дебаггера":"Print String — output values without opening debugger",
      lang==='ru'?"Draw Debug Arrow — направление векторов (нормали, velocity)":"Draw Debug Arrow — vector direction (normals, velocity)",
      lang==='ru'?"Полезно для проверки логики без C++ дебаггера":"Useful for logic verification without C++ debugger",
    ]},
    {title:"Blueprint как прототип инструмента",col:C.orange,points:[
      "Actor с Editor Script Component — запускается в Editor, не в Play",
      "Construction Script — логика при изменении параметров в редакторе",
      "Button (на актора) → вызов Python через Execute Python Script",
      "Быстрый прототип → потом перенести в Python или C++ если нужно",
    ]},
    {title:"Data Assets и конфиги",col:C.green,points:[
      "Data Asset — ScriptableObject-аналог в UE. Хранит данные без логики",
      "Primary Data Asset — для Asset Manager, поддерживает Async Load",
      "DataTable — таблица структур (CSV-подобно). Удобно для balance data",
      "Asset Registry — поиск любых ассетов по тегам и классам в рантайме",
    ]},
  ];
  return(
    <div style={{display:"grid",gap:10}}>
      {items.map(({title,col,points})=>(<div key={title} style={{background:col+"12",border:`1px solid ${col}33`,borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:10}}>{title}</div>
        {points.map(p=>(<div key={p} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:13,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{p}</span></div>))}
      </div>))}
    </div>
  );
}


// ══ MODULE: MATERIALS ════════════════════════════════════════════════════════
function PBRPlayground(){
  const lang=useLang();
  const [metallic,setMetallic]=useState(0.0);
  const [roughness,setRoughness]=useState(0.5);
  const [r,setR]=useState(180);
  const [g,setG]=useState(100);
  const [b,setB]=useState(60);
  const albedo=`rgb(${r},${g},${b})`;
  const spec=metallic>0.5?albedo:"rgb(200,200,200)";
  const gloss=1-roughness;
  const specSize=Math.max(4,gloss*gloss*80);
  const rimStr=Math.max(0,1-roughness)*0.6;
  const diffStr=1-metallic*0.7;
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <svg width={220} height={220} style={{border:`1px solid ${C.border}`,borderRadius:8,background:"#050810",display:"block"}}>
          <defs>
            <radialGradient id="pbr_diff" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor={albedo} stopOpacity={diffStr}/>
              <stop offset="70%" stopColor={albedo} stopOpacity={diffStr*0.3}/>
              <stop offset="100%" stopColor={albedo} stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="pbr_spec" cx="38%" cy="33%" r={`${specSize}%`}>
              <stop offset="0%" stopColor={spec} stopOpacity={gloss*gloss*0.95}/>
              <stop offset="100%" stopColor={spec} stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="pbr_rim" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#000000" stopOpacity="0"/>
              <stop offset="85%" stopColor={spec} stopOpacity={rimStr*0.5}/>
              <stop offset="100%" stopColor={spec} stopOpacity={rimStr}/>
            </radialGradient>
            <radialGradient id="pbr_amb" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={albedo} stopOpacity="0.04"/>
              <stop offset="100%" stopColor={albedo} stopOpacity="0.01"/>
            </radialGradient>
          </defs>
          <circle cx={110} cy={110} r={95} fill="#111318"/>
          <circle cx={110} cy={110} r={95} fill="url(#pbr_amb)"/>
          <circle cx={110} cy={110} r={95} fill="url(#pbr_diff)"/>
          <circle cx={110} cy={110} r={95} fill="url(#pbr_spec)"/>
          <circle cx={110} cy={110} r={95} fill="url(#pbr_rim)"/>
          <circle cx={110} cy={110} r={95} fill="none" stroke={C.border} strokeWidth={1}/>
          <text x={110} y={218} textAnchor="middle" fill={C.dim} fontSize={9} fontFamily="monospace">PBR sphere preview</text>
        </svg>
        <div style={{display:"flex",gap:6}}>
          {["r","g","b"].map((ch,i)=>{
            const vals=[r,g,b],sets=[setR,setG,setB];
            const cols=["#ff4455","#39ff8a","#00c8ff"];
            return(<label key={ch} style={{flex:1,fontFamily:"monospace",fontSize:9,color:cols[i],display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>{ch.toUpperCase()}<input type="range" min={0} max={255} value={vals[i]} onChange={e=>sets[i](Number(e.target.value))} style={{width:"100%",accentColor:cols[i]}}/>{vals[i]}</label>);
          })}
        </div>
      </div>
      <div style={{flex:1,minWidth:200,display:"flex",flexDirection:"column",gap:10}}>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:12,letterSpacing:1}}>{lang==='ru'?"PBR ПАРАМЕТРЫ":"PBR PARAMETERS"}</div>
          {[{label:"Metallic",val:metallic,set:setMetallic,col:C.yellow,desc:metallic<0.1?lang==='ru'?"Диэлектрик: диффуз цветной, блик белый":"Dielectric: colored diffuse, white specular":metallic>0.9?lang==='ru'?"Металл: нет диффуза, блик цветной (альбедо)":"Metal: no diffuse, colored specular (albedo)":lang==='ru'?"Переход (не используй в PBR — только 0 или 1)":"Transition (don't use in PBR — only 0 or 1)"},{label:"Roughness",val:roughness,set:setRoughness,col:C.orange,desc:roughness<0.2?lang==='ru'?"Зеркальный — очень острый блик":"Mirror — very sharp highlight":roughness>0.7?lang==='ru'?"Матовый — широкий блик, нет отражений":"Matte — wide highlight, no reflections":lang==='ru'?"Полуглянцевый":"Semi-glossy"}].map(({label,val,set,col,desc})=>(<div key={label} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:"monospace",fontSize:11,color:col}}>{label}</span><span style={{fontFamily:"monospace",fontSize:11,color:col}}>{val.toFixed(2)}</span></div><input type="range" min={0} max={1} step={0.01} value={val} onChange={e=>set(Number(e.target.value))} style={{width:"100%",accentColor:col,marginBottom:4}}/><div style={{fontSize:11,color:C.muted}}>{desc}</div></div>))}
        </div>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>{lang==='ru'?"PBR ПРИНЦИПЫ":"PBR PRINCIPLES"}</div>
          {[{t:"Energy Conservation",d:lang==='ru'?"Объект не может отражать больше света чем получает. Сумма диффуза и спекуляра ≤ 1":"Object can't reflect more light than it receives. Diffuse + specular ≤ 1"},
            {t:lang==='ru'?"Metallic workflow":"Metallic workflow",d:"Metallic=0: диэлектрик (дерево,камень,кожа). Metallic=1: металл (железо,золото). Промежуточных значений нет в природе"},
            {t:lang==='ru'?"Fresnel (F0)":"Fresnel (F0)",d:lang==='ru'?"Все поверхности отражают под острым углом. F0 для диэлектриков ≈ 0.04, для металлов = Albedo":"All surfaces reflect at grazing angles. F0 for dielectrics ≈ 0.04, for metals = Albedo"}].map(({t,d})=>(<div key={t} style={{marginBottom:8}}><span style={{fontFamily:"monospace",fontSize:10,color:C.purple}}>{t}</span><div style={{fontSize:11,color:C.muted,marginTop:2}}>{d}</div></div>))}
        </div>
      </div>
    </div>
  );
}

function MaterialGraph(){
  const lang=useLang();
  const concepts=[
    {title:lang==='ru'?"Как Material Graph компилируется в HLSL":"How Material Graph compiles to HLSL",col:C.accent,points:[lang==='ru'?"Каждый нод = одна или несколько HLSL операций":"Each node = one or more HLSL operations",lang==='ru'?"Multiply нод → float4 result = A * B":"Multiply node → float4 result = A * B","Texture Sample → Tex.Sample(Sampler, UV)",lang==='ru'?"UE компилирует граф в HLSL при сохранении материала":"UE compiles the graph to HLSL on save",lang==='ru'?"Можно посмотреть HLSL: Material Editor → HLSL код (правый клик)":"View HLSL: Material Editor → HLSL code (right-click)"]},
    {title:lang==='ru'?"Material Instances":"Material Instances",col:C.orange,points:[lang==='ru'?"Instance наследует граф родителя, меняет только параметры":"Instance inherits parent's graph, only changes parameters",lang==='ru'?"Scalar, Vector, Texture параметры — дёшевый runtime override":"Scalar, Vector, Texture parameters — cheap runtime override",lang==='ru'?"Dynamic Material Instance (DMI) — изменение параметров в рантайме":"Dynamic Material Instance (DMI) — change parameters at runtime",lang==='ru'?"SetVectorParameterValue / SetScalarParameterValue из Blueprint/C++":"SetVectorParameterValue / SetScalarParameterValue from Blueprint/C++",lang==='ru'?"Нет перекомпиляции шейдера при смене параметров — это ключевое":"No shader recompilation when changing parameters — this is key"]},
    {title:lang==='ru'?"Material Functions":"Material Functions",col:C.green,points:[lang==='ru'?"Переиспользуемые subgraph — как функции в программировании":"Reusable subgraph — like functions in programming",lang==='ru'?"Пример: Triplanar Mapping как Material Function — подключаешь везде":"Example: Triplanar Mapping as Material Function — use anywhere",lang==='ru'?"FunctionInput/FunctionOutput ноды определяют интерфейс":"FunctionInput/FunctionOutput nodes define the interface",lang==='ru'?"Изменение функции обновляет все материалы которые её используют":"Changing the function updates all materials that use it",lang==='ru'?"Engine контентовая папка: готовые функции (MF_*)":"Engine content folder: ready-made functions (MF_*)"]},
    {title:lang==='ru'?"Vertex Shader в Material Graph":"Vertex Shader in Material Graph",col:C.purple,points:[lang==='ru'?"World Position Offset (WPO) — смещение вершин в VS":"World Position Offset (WPO) — vertex displacement in VS",lang==='ru'?"Используется для: ветра деревьев, воды, одежды, разрушений":"Used for: tree wind, water, cloth, destruction",lang==='ru'?"WPO не работает с Nanite (в UE5.0), частично в UE5.1+":"WPO doesn't work with Nanite (UE5.0), partially in UE5.1+",lang==='ru'?"Vertex Normal Offset — деформация нормалей в VS":"Vertex Normal Offset — normal deformation in VS",lang==='ru'?"Custom HLSL нод — вставка кода напрямую в шейдер":"Custom HLSL node — insert code directly into shader"]},
  ];
  return(
    <div style={{display:"grid",gap:10}}>
      {concepts.map(({title,col,points})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:10}}>{title}</div>
        {points.map(p=>(<div key={p} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:13,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{p}</span></div>))}
      </div>))}
    </div>
  );
}

// ══ MODULE: LIGHTING ════════════════════════════════════════════════════════
function LightingTheory(){
  const [tab,setTab]=useState("direct");
  const tabs={
    direct:{col:C.yellow,label:"Direct Lighting",content:[
      {t:"Lambert Diffuse",d:"dot(N,L) — самая фундаментальная модель. Поверхность, перпендикулярная свету, получает максимум. Физически корректна для rough поверхностей.",code:"float diffuse = saturate(dot(N, L));"},
      {t:"Blinn-Phong Specular",d:"Halfway вектор H = normalize(L+V). Блик = pow(dot(N,H), shininess). Не PBR, но быстро и предсказуемо.",code:"float3 H = normalize(L+V);\nfloat spec = pow(saturate(dot(N,H)), 64.0);"},
      {t:"PBR Lighting (Cook-Torrance)",d:"F·D·G / (4·dot(N,V)·dot(N,L)). F=Fresnel, D=NDF (распределение микрограней), G=Shadowing. UE5 использует GGX для D.",code:"// Упрощённо:\nfloat3 F = FresnelSchlick(F0, dot(H,V));\nfloat D = GGX(roughness, dot(N,H));\nfloat G = SmithG(roughness, N, V, L);"},
    ]},
    indirect:{col:C.accent,label:"Indirect / GI",content:[
      {t:"Ambient (простейший)",d:"Константный цвет со всех направлений. Нефизично но дёшево. float3 ambient = AmbientColor * albedo;",code:"float3 color = albedo * diffuse + albedo * 0.1; // ambient hack"},
      {t:"Spherical Harmonics (SH)",d:"Аппроксимация environment lighting через коэффициенты. L1 SH = 4 коэффициента, L2 = 9. Lumen использует SH для low-frequency GI. Очень быстро на GPU.",code:"// SH lookup в шейдере:\nfloat3 irradiance = SampleSH(worldNormal);\nfloat3 color = albedo * irradiance;"},
      {t:"IBL (Image Based Lighting)",d:"Cubemap окружения как источник света. DiffuseIBL — convolved cubemap (blurred). SpecularIBL — mip-уровни для roughness. Split-sum approximation в UE5.",code:"float3 specIBL = EnvMap.SampleLevel(S, reflectDir,\n    roughness * MAX_REFLECTION_LOD).rgb;"},
    ]},
    shadows:{col:C.orange,label:"Тени",content:[
      {t:"Shadow Maps",d:"Рендерим сцену с позиции источника, пишем только depth. При основном рендере сравниваем depth пикселя с shadow map — если пиксель дальше, он в тени.",code:"float shadowDepth = ShadowMap.Sample(S, shadowUV).r;\nfloat inShadow = pixelDepth > shadowDepth + bias ? 0.0 : 1.0;"},
      {t:"Cascaded Shadow Maps (CSM)",d:"Несколько shadow map с разным охватом: ближняя высокое разрешение, дальняя низкое. UE5 использует 4 каскада по умолчанию.",code:"// Выбор каскада по расстоянию от камеры:\nint cascade = pixelDepth < Split0 ? 0 :\n              pixelDepth < Split1 ? 1 : 2;"},
      {t:"PCF / PCSS",d:"PCF (Percentage Closer Filtering) — сглаживание теней sampling по соседним пикселям. PCSS — мягкие тени с penumbra в зависимости от расстояния до caster.",code:"// PCF: среднее нескольких samples\nfloat shadow = 0.0;\nfor(int i=0; i<9; i++)\n  shadow += ShadowMap.Sample(S, uv+offset[i]).r > d;"},
    ]},
    types:{col:C.green,label:"Типы источников",content:[
      {t:"Directional Light",d:"Бесконечно далёкий источник (солнце). Параллельные лучи, одна shadow map. 1 directional = 1 CSM. Главный источник в outdoor сценах.",code:"// Direction одинакова для всех пикселей сцены\nfloat3 L = -LightDirection; // нормализованный"},
      {t:"Point Light",d:"Свет во все стороны из точки. Falloff по расстоянию: 1/d² физически, но UE5 использует smoothstep для ограничения радиуса. Тень = cubemap shadow map.",code:"float dist = length(LightPos - WorldPos);\nfloat attenuation = 1.0 / (dist * dist);\nattenuation *= saturate(1 - dist/Radius);"},
      {t:"Spot Light",d:"Конус света. Дополнительно к point light: angle falloff через dot между L и SpotDir. Inner/Outer angle = резкость края.",code:"float spotAngle = dot(-L, SpotDirection);\nfloat spot = smoothstep(OuterAngle, InnerAngle, spotAngle);"},
      {t:"Rect Light (Area Light)",d:"Прямоугольный источник — флуоресцентная лампа, окно. Более реалистичные блики. Дороже point/spot. В UE5 через LTC (Linearly Transformed Cosines).",code:"// Приближение через nearest point on rect:\nfloat3 L = NearestPointOnRect(WorldPos, RectPos, RectRight, RectUp);"},
    ]},
  };
  const cur=tabs[tab];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:16,flexWrap:"wrap"}}>
        {Object.entries(tabs).map(([k,v])=>(<button key={k} onClick={()=>setTab(k)} style={{background:tab===k?v.col+"22":"transparent",border:`1px solid ${tab===k?v.col:C.border}`,borderRadius:6,padding:"6px 12px",color:tab===k?v.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{v.label}</button>))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {cur.content.map(({t,d,code})=>(<div key={t} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:12,color:cur.col,fontWeight:700,marginBottom:6}}>{t}</div>
          <div style={{fontSize:13,color:C.muted,lineHeight:1.7,marginBottom:code?8:0,fontFamily:"system-ui,-apple-system,sans-serif"}}>{d}</div>
          {code&&<Code lang="hlsl">{code}</Code>}
        </div>))}
      </div>
    </div>
  );
}

// ══ MODULE: MOCK INTERVIEW ══════════════════════════════════════════════════
function MockInterview(){
  const lang=useLang();
  const qs=[
    {q:"Что такое dot product? Как используется в шейдерах?",a:"dot(A,B) = |A||B|·cos(θ). При нормализованных векторах = cos угла. Применения: Lambert diffuse = saturate(dot(N,L)); Fresnel = pow(1-dot(N,V), 3); backface check = dot(N,V) < 0.",tag:"linalg",diff:"basic"},
    {q:"Напишите формулу Sphere Mask. Объясните каждую часть.",a:"result = 1 - saturate((length(A-B) - Radius) / Hardness). length(A-B) — расстояние до центра. Минус Radius: внутри = отрицательно. Деление на Hardness — мягкость края. saturate — клампит в [0,1]. 1-x — инверт чтобы внутри=1.",tag:"linalg",diff:"hot"},
    {q:"Чем отличается CPU от GPU архитектурно? Почему GPU не заменяет CPU?",a:"CPU: мало мощных ядер, большой кэш, branch prediction, out-of-order. GPU: тысячи простых ядер, SIMT — один шейдер на все потоки. GPU не заменяет CPU: игровая логика последовательна (physics, AI, Blueprint) — следующий кадр зависит от предыдущего.",tag:"gpu",diff:"basic"},
    {q:"Что такое draw call и почему он дорогой?",a:"Draw call — команда CPU→GPU: рисуй этот меш. Дорого не рисование, а overhead: смена state (шейдеры, текстуры, буферы), синхронизация CPU-GPU. Решения: batching (объединить меши), instancing (ISM/HISM — 1 call для тысяч копий), atlasing, Nanite.",tag:"gpu",diff:"hot"},
    {q:"Как определить CPU-bound или GPU-bound? Как диагностировать?",a:"stat Unit в UE5: смотри GPU ms vs CPU ms. Быстрый тест: r.ScreenPercentage 50 — если FPS вырос, GPU-bound (меньше пикселей = меньше PS работы). Если нет — CPU-bound. RenderDoc для анализа GPU passes, Unreal Insights для CPU threads.",tag:"gpu",diff:"basic"},
    {q:"Что хранится в G-Buffer? Зачем он нужен?",a:"GBufferA: World Normal + Shading Model. GBufferB: Metallic, Specular, Roughness. GBufferC: BaseColor. SceneDepth: для реконструкции WorldPos. Нужен для deferred рендеринга: разделить geometry pass и lighting pass — O(N+M) вместо O(N×M) для N объектов и M источников.",tag:"rendering",diff:"hot"},
    {q:"В чём разница Deferred vs Forward рендеринга?",a:"Forward: каждый объект сразу со всеми источниками — O(N×M). Deferred: сначала G-Buffer (только геометрия), потом lighting отдельно — O(N+M). UE5 по умолчанию Deferred. Forward лучше для mobile (меньше bandwidth) и для прозрачности.",tag:"rendering",diff:"basic"},
    {q:"Что такое Nanite и какие у него ограничения?",a:"Nanite — виртуализированная геометрия. GPU автоматически выбирает нужный уровень детализации на уровне кластеров треугольников. Ограничения: только Opaque материалы (не masked/translucent), нет skeletal mesh, нет WPO (в UE5.0). Заменяет ручной LOD для static meshes.",tag:"rendering",diff:"basic"},
    {q:"Как трансформируются нормали и почему нельзя использовать ту же матрицу?",a:"При non-uniform scale (1,1,2) обычная матрица искажает нормаль — она перестаёт быть перпендикулярной поверхности. Нужна транспонированная обратная: (M⁻¹)ᵀ. Для uniform scale и pure rotation — обычная матрица работает. В UE5 InverseTransposeModel в cbuffer.",tag:"linalg",diff:"advanced"},
    {q:"Что такое Quaternion и зачем он нужен?",a:"q = (w, x, y, z) где w=cos(θ/2), xyz=axis·sin(θ/2). Решает Gimbal Lock — проблему Euler углов когда две оси совпадают и теряется степень свободы. Slerp (Spherical Lerp) даёт равномерную интерполяцию по дуге. Euler углы используются только для UI редактора.",tag:"linalg",diff:"advanced"},
    {q:"Объясните пайплайн координатных пространств Model→Screen",a:"Model Space (вершины объекта) × Model Matrix → World Space × View Matrix → View Space × Projection Matrix → Clip Space ÷ w → NDC [-1,1] → Viewport Transform → Screen Space. VS обязан вывести SV_Position в Clip Space. Из Depth + UV + InvViewProj восстанавливается World Position.",tag:"rendering",diff:"advanced"},
    {q:"Что такое overdraw и как с ним бороться?",a:"Overdraw — pixel shader запускается несколько раз для одного пикселя (перекрывающиеся объекты). Fillrate bottleneck. Решения: Depth PrePass (Early-Z rejection — PS не запускается для скрытых пикселей), front-to-back sorting для opaque, frustum/occlusion culling, минимизировать слои прозрачности.",tag:"optimization",diff:"basic"},
    {q:"Как работает Normal Mapping? Что такое TBN матрица?",a:"Normal map хранит нормали в Tangent Space (RGB→XYZ, синий≈(0,0,1)=перпендикуляр). TBN матрица: T(Tangent)=вдоль UV.x, B(Bitangent)=cross(N,T), N=нормаль. tangentN из текстуры × TBN = World Space нормаль для lighting. Bitangent реконструируем в шейдере: не храним отдельно.",tag:"hlsl",diff:"advanced"},
    {q:"Что такое WPO и какие у него ограничения?",a:"World Position Offset — смещение вершин в Vertex Shader через Material Graph. Применения: ветер для листвы, волны воды, разрушения. Ограничения: не работает с Nanite (UE5.0), не обновляет коллизию, тень не соответствует смещённому мешу.",tag:"vertex",diff:"basic"},
    {q:"Что такое Vertex Animation Textures (VAT)?",a:"VAT — техника запекания симуляции (физика, ткань) в текстуру. Каждый пиксель = позиция вершины в определённый кадр. В шейдере читаем SampleLevel(posTexture, float2(vertexID/numVerts, frame/numFrames), 0). Преимущество: тысячи анимированных объектов за 1 draw call на GPU. Ограничение: нет blending между анимациями, нет интерактивной физики.",tag:"vertex",diff:"advanced"},
    {q:"Как работает Custom Depth/Stencil для outline эффекта?",a:"1. Включаем Render Custom Depth на нужных мешах. 2. Custom Stencil Value = ID объекта (0-255). 3. В Post-Process материале: читаем SceneTexture:CustomDepth и сравниваем с SceneDepth. 4. Dilate маску (проверяем соседние пиксели). 5. outline = dilated - original = только граница. 6. Красим в нужный цвет.",tag:"effects",diff:"advanced"},
    {q:"CPU vs GPU Emitter в Niagara — когда что использовать?",a:"CPU emitter: меньше частиц (~10K), нужна коллизия с физикой, данные из Blueprint. GPU emitter: миллионы частиц, дождь/снег/пыль, нет сложной коллизии. GPU emitter дешевле по CPU overhead, но spawn управляется только CPU-side. Кастомный HLSL через Scratch Pad Module работает в обоих режимах.",tag:"effects",diff:"basic"},
    {q:"Как назвать collision mesh для автоматического импорта в UE5?",a:"UCX_MeshName — convex hull (основной тип). UBX_ — box, USP_ — sphere, UCP_ — capsule. MeshName должен совпадать с именем Static Mesh. Несколько коллизий: UCX_MeshName_01, UCX_MeshName_02. Convex hull только для выпуклых форм — вогнутость = несколько UCX объектов.",tag:"pipeline",diff:"basic"},
    {q:"Что такое UV Channel 2 и зачем он нужен?",a:"Channel 1 (index 1) — lightmap UV. Требования: все острова в [0,1]×[0,1], без наложений (overlapping), зазор 2px при целевом разрешении. Channel 0 — текстурные UV (тайлинг разрешён). Generate Lightmap UVs в UE5 автоматически, но для hero assets лучше вручную. Разрешение: 64-512 в зависимости от размера объекта.",tag:"pipeline",diff:"basic"},
    {q:"Чем Hard Reference отличается от Soft Reference в UE5?",a:"Hard ref (TObjectPtr): загружается вместе с owner классом — если BP ссылается на большую текстуру hard ref, текстура грузится всегда. Soft ref (TSoftObjectPtr): хранит только путь, загружается явно через Async Load. Использовать soft refs для опциональных ассетов, DLC контента, больших текстур которые не нужны сразу. Hard refs могут создавать circular dependencies.",tag:"pipeline",diff:"advanced"},
    {q:"Что такое Render Target и паттерн ping-pong?",a:"Render Target — текстура куда GPU рендерит напрямую. Ping-pong: 2 RT (A и B), кадр 1: читаем A → пишем B, кадр 2: читаем B → пишем A. Используется для симуляций в шейдере: вода, огонь, снег. GPU читает предыдущий кадр и вычисляет следующее состояние без CPU. Применение в UE5: Draw Material to Render Target ноды, или Blueprint.",tag:"effects",diff:"advanced"},
    {q:"Какие naming conventions для коллизий в FBX?",a:"UCX_MeshName — convex hull. Несколько: UCX_MeshName_01, UCX_MeshName_02. UBX_ box, USP_ sphere. Имя после префикса ДОЛЖНО совпадать с именем Static Mesh. Коллизионные меши экспортируются вместе с мешем в одном FBX. В UE5 при импорте: Import via FBX → коллизия подтягивается автоматически.",tag:"pipeline",diff:"basic"},
    {q:"Как работают Event Dispatcher vs Blueprint Interface?",a:"Event Dispatcher: объект публикует событие, любой подписчик реагирует. Broadcast — всем подписчикам. Нет прямых ссылок. Blueprint Interface: контракт — если класс реализует интерфейс, можно вызвать метод без Cast. Interface лучше когда нужен return value. ED лучше для notify системы. Оба решают проблему hard reference через Cast To.",tag:"pipeline",diff:"advanced"},

    {q:"Что делает макрос UCLASS() и зачем он нужен?",a:"UCLASS регистрирует класс в системе рефлексии UE (Unreal Header Tool). Позволяет: GC управлять памятью объекта, Blueprint видеть класс, сериализации работать, CDO (Class Default Object) создаваться. Без UCLASS — класс не участвует в системе UE. GENERATED_BODY() вставляет сгенерированный UHT код.",tag:"cpp",diff:"basic"},
    {q:"Зачем нужен UPROPERTY() и что будет если его не поставить?",a:"UPROPERTY регистрирует переменную в GC графе. Без UPROPERTY на указатель UObject: GC не знает о ссылке и может собрать объект → dangling pointer → краш. Также UPROPERTY: сериализация (SaveGame), репликация (Replicated), видимость в Blueprint (BlueprintReadWrite), отображение в Details (EditAnywhere).",tag:"cpp",diff:"basic"},
    {q:"Чем TObjectPtr отличается от raw T* указателя?",a:"TObjectPtr<T> — умный указатель для UPROPERTY в UE5. В Debug режиме проверяет валидность при разыменовании. GC-aware: может быть обнулён при сборе объекта. Raw T* без UPROPERTY — GC не отслеживает, объект может быть собран пока мы держим указатель → краш. TWeakObjectPtr — слабый, не держит объект, проверяй IsValid().",tag:"cpp",diff:"advanced"},
    {q:"Объясни структуру папок в UE5 проекте: Source, Plugins, Config",a:"Source/ — C++ код. Source/ProjectName/ — primary game module с Build.cs. Организуй по фичам (Characters/, UI/, Abilities/). Plugins/ — модульные расширения, каждый со своим Source/. Config/ — .ini файлы (DefaultEngine, DefaultGame, DefaultInput). Binaries/, Intermediate/, Saved/ — в .gitignore (генерируются). .uproject — дескриптор проекта с версией движка и модулями.",tag:"cpp",diff:"basic"},
    {q:"Что такое Build.cs и какие зависимости туда добавляют?",a:"Build.cs — C# файл описывающий зависимости модуля. PublicDependencyModuleNames: модули видны зависимым модулям (Core, CoreUObject, Engine, InputCore). PrivateDependencyModuleNames: только внутри (Slate, UMG, AIModule). Добавление модуля в Build.cs = разрешение использовать его API. Без нужного модуля — ошибка линковки или компиляции.",tag:"cpp",diff:"basic"},
    {q:"Чем отличается Multicast делегат от обычного? Когда какой использовать?",a:"Обычный (DECLARE_DELEGATE): один подписчик, может возвращать значение. Multicast (DECLARE_MULTICAST_DELEGATE): N подписчиков, только void. Dynamic (DECLARE_DYNAMIC_MULTICAST_DELEGATE): UPROPERTY-compatible, Blueprint виден как BlueprintAssignable, требует UFUNCTION у подписчика. Правило: для событий (OnDeath, OnDamage) — Multicast. Для callback одному — обычный. Для Blueprint — Dynamic Multicast.",tag:"cpp",diff:"advanced"},
    {q:"Объясни иерархию GameMode, GameState, PlayerState, GameInstance",a:"GameMode: правила игры (КАК играть), только сервер. GameState: состояние всей игры (таймер, счёт), реплицируется всем. PlayerState: данные одного игрока (HP, ник), реплицируется, сохраняется при respawn. GameInstance: живёт всю сессию, не сбрасывается при LoadLevel (настройки, сохранения). PlayerController: ввод → команды Pawn. Доступ: GetWorld()->GetAuthGameMode().",tag:"cpp",diff:"basic"},
    {q:"Как правильно организовать компоненты в Actor?",a:"Actor = контейнер компонентов. Каждый компонент = одна отвечаемость. HealthComponent (HP, damage, death), InventoryComponent, WeaponComponent — не пихай всё в Character. UPROPERTY(VisibleAnywhere) TObjectPtr<UHealthComponent> HealthComp. Инициализация в конструкторе: HealthComp = CreateDefaultSubobject<UHealthComponent>(TEXT('HealthComp')). DataAsset для конфигурации — не хардкодь цифры в C++.",tag:"cpp",diff:"advanced"},

    {q:"Чем UMG отличается от Slate? Когда использовать Slate?",a:"UMG — визуальный редактор виджетов, компилируется в Slate SWidget. Slate — нативный C++ UI фреймворк, только код. Использовать Slate: кастомный Editor инструмент (SWindow, SDetailsView), компоненты которых нет в UMG. UMG::TakeWidget() возвращает SWidget — можно получить Slate виджет любого UMG элемента.",tag:"ui",diff:"basic"},
    {q:"Опиши жизненный цикл виджета в UMG.",a:"PreConstruct (Design Time, editor preview) → NativeConstruct (при создании, аналог BeginPlay, подписка на делегаты) → NativeTick (каждый кадр, только если bCanEverTick=true) → NativePaint (кастомная отрисовка) → NativeDestruct (очистка, ВСЕГДА RemoveAll делегаты). Частая ошибка: подписался в Construct, не отписался в Destruct = утечка памяти.",tag:"ui",diff:"basic"},
    {q:"Что такое MVVM и зачем он нужен в UE5?",a:"Model-View-ViewModel: Model (данные, PlayerState), ViewModel (трансформированные данные с FieldNotify), View (виджет, только отображение). UE5 MVVM плагин: UMVVMViewModelBase, UPROPERTY(FieldNotify) — автоматически уведомляет View при изменении через UE_MVVM_BROADCAST_FIELD_VALUE_CHANGED. Преимущество: слабая связность — виджет не знает об игровой логике.",tag:"ui",diff:"advanced"},
    {q:"Что такое Retainer Box? Когда использовать, какие минусы?",a:"Retainer Box рендерит детей в Render Target, потом показывает RT как один quad с опциональным Material. RenderOnPhase: каждые N кадров. RenderOnInvalidation: только при изменении. Когда: дорогое статичное поддерево, blur эффект через Material, minimap. Минусы: дополнительный VRAM, текст нечёткий (субпиксель теряется), если контент меняется часто — двойная работа.",tag:"ui",diff:"advanced"},
    {q:"Чем ListView лучше ScrollBox для длинных списков?",a:"ScrollBox создаёт ВСЕ виджеты сразу: 1000 элементов = 1000 виджетов в памяти. ListView виртуализирует: создаёт только видимые (~15-20), переиспользует при скролле через IUserObjectListEntry::NativeOnListItemObjectSet(). Правило: > 30-50 элементов → всегда ListView/TileView. ScrollBox подходит только для небольших статичных списков.",tag:"ui",diff:"basic"},
    {q:"Что такое Invalidation в UMG? Какие типы бывают?",a:"Invalidation = пометить виджет как 'нужно перерисовать'. Типы: Layout (дорого, изменился размер, пересчёт всего дерева), Paint (дешевле, только визуал), Volatility (перерисовка каждый кадр). Invalidation Box кэширует поддерево в RT. Частые ошибки: SetText/SetBrush каждый кадр без проверки изменений, создание виджетов в Tick.",tag:"ui",diff:"advanced"},
    {q:"Как применить Material/шейдер к UI виджету в UMG?",a:"Material Domain должен быть User Interface (не Surface). Применяется к Brush виджета (SlateBrush → Material) или к Retainer Box. Доступно: Time, SceneColor (ограниченно), Texture Samples, Custom параметры. Недоступно: World Position, GBuffer, нормали. Для blur: Retainer Box + Material с Gaussian blur + RenderOnPhase.",tag:"ui",diff:"basic"},
    {q:"Как сделать desaturation конкретного UI элемента?",a:"В Material виджета: добавить Scalar Parameter (DesatAmount). Desaturation нод: Input=Texture, Fraction=DesatAmount. В Blueprint: GetBrushResourceAsDynamicMaterial → SetScalarParameterValue('DesatAmount', 1.0). Или через Material Instance Parameter Collection если нужно глобально. Для outline: Retainer Box + Material → читать CustomStencil.",tag:"ui",diff:"advanced"},
    {q:"Как правильно организовать подписку на события в UMG?",a:"Подписка в NativeConstruct, отписка в NativeDestruct. AddUObject(this, &UMyWidget::Callback) — автоматически проверяет валидность UObject. RemoveAll(this) в Destruct. НЕ использовать лямбды с сильными ссылками. Где хранить данные: PlayerState (per-player), GameState (game-wide), GameInstance (persistent), MVVM ViewModel (UI-ready трансформированные данные).",tag:"ui",diff:"advanced"},
    {q:"Что такое stat SlateUI и Widget Reflector?",a:"stat SlateUI: консольная команда, показывает общее время Slate рендеринга (PrePass=layout, Paint=draw). Первый шаг диагностики UI. Widget Reflector: Window → Widget Reflector в редакторе. Клик на любой виджет → показывает класс, время рисования, invalidation. Быстро найти самый дорогой виджет. stat SlateVerbose — разбивка по классам.",tag:"ui",diff:"basic"},


  ];

  const [idx,setIdx]=useState(0);
  const [revealed,setRevealed]=useState(false);
  const [filter,setFilter]=useState("all");
  const [score,setScore]=useState({good:0,bad:0});

  const tags=["all","linalg","gpu","rendering","hlsl","optimization","vertex","effects","pipeline","ui","cpp"];
  const diffs={basic:C.green,hot:C.orange,advanced:C.purple};
  const filtered=filter==="all"?qs:qs.filter(q=>q.tag===filter);
  const cur=filtered[idx%filtered.length];

  const next=(good)=>{
    if(good!==undefined)setScore(s=>({...s,[good?"good":"bad"]:s[good?"good":"bad"]+1}));
    setRevealed(false);
    setIdx(i=>(i+1)%filtered.length);
  };

  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
        {tags.map(t=>(<button key={t} onClick={()=>{setFilter(t);setIdx(0);setRevealed(false);}} style={{background:filter===t?C.accent+"22":"transparent",border:`1px solid ${filter===t?C.accent:C.border}`,borderRadius:6,padding:"5px 10px",color:filter===t?C.accent:C.muted,fontFamily:"monospace",fontSize:10,cursor:"pointer"}}>{t}</button>))}
        <div style={{marginLeft:"auto",display:"flex",gap:10,alignItems:"center"}}>
          <span style={{fontFamily:"monospace",fontSize:11,color:C.green}}>✓ {score.good}</span>
          <span style={{fontFamily:"monospace",fontSize:11,color:C.red}}>✗ {score.bad}</span>
          <button onClick={()=>setScore({good:0,bad:0})} style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:4,padding:"3px 8px",color:C.muted,fontFamily:"monospace",fontSize:10,cursor:"pointer"}}>reset</button>
        </div>
      </div>

      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:20,marginBottom:12,minHeight:100}}>
        <div style={{display:"flex",gap:8,marginBottom:12,alignItems:"center"}}>
          <span style={{fontFamily:"monospace",fontSize:9,color:diffs[cur.diff],background:diffs[cur.diff]+"20",padding:"2px 8px",borderRadius:4}}>{cur.diff}</span>
          <span style={{fontFamily:"monospace",fontSize:9,color:C.muted,background:C.dim,padding:"2px 8px",borderRadius:4}}>{cur.tag}</span>
          <span style={{fontFamily:"monospace",fontSize:10,color:C.dim,marginLeft:"auto"}}>{(idx%filtered.length)+1}/{filtered.length}</span>
        </div>
        <div style={{fontSize:16,color:C.text,lineHeight:1.6,fontWeight:600,fontFamily:"system-ui,-apple-system,sans-serif"}}>{cur.q}</div>
      </div>

      {!revealed?(
        <button onClick={()=>setRevealed(true)} style={{width:"100%",padding:"12px 0",background:C.accent+"18",border:`1px solid ${C.accent}55`,borderRadius:8,color:C.accent,fontFamily:"monospace",fontSize:12,cursor:"pointer"}}>
          {lang==='ru'?lang==='ru'?"🎯 Показать ответ":"🎯 Show Answer":"🎯 Show Answer"}
        </button>
      ):(
        <div>
          <div style={{background:"#111827",border:`1px solid ${C.green}44`,borderRadius:8,padding:"16px 18px",marginBottom:12,fontSize:14,color:C.text,lineHeight:1.8,fontFamily:"system-ui,-apple-system,sans-serif"}}>
            {cur.a}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>next(true)} style={{flex:1,padding:"10px 0",background:C.green+"18",border:`1px solid ${C.green}55`,borderRadius:8,color:C.green,fontFamily:"monospace",fontSize:12,cursor:"pointer"}}>{lang==="ru"?"✓ Знал":"✓ Knew it"}</button>
            <button onClick={()=>next(false)} style={{flex:1,padding:"10px 0",background:C.red+"18",border:`1px solid ${C.red}55`,borderRadius:8,color:C.red,fontFamily:"monospace",fontSize:12,cursor:"pointer"}}>{lang==="ru"?"✗ Не знал":"✗ Didn't know"}</button>
            <button onClick={()=>next(undefined)} style={{padding:"10px 16px",background:"transparent",border:`1px solid ${C.border}`,borderRadius:8,color:C.muted,fontFamily:"monospace",fontSize:12,cursor:"pointer"}}>→</button>
          </div>
        </div>
      )}
    </div>
  );
}


// ══ MODULE 8 — VERTEX & ANIMATION ═══════════════════════════════════════════
function WPOSection(){
  const lang=useLang();
  const txt={
    ru:{title:"World Position Offset (WPO)",uses:["Ветер для деревьев и растений — синусоидальное смещение по UV","Вода — волны через WPO на plane","Разрушение — анимация разлёта фрагментов","Дыхание персонажа в idle — subtle chest movement","Флаги, ткань — физикоподобная симуляция в шейдере"],limits:["НЕ работает с Nanite (UE5.0), частично UE5.1+","Не обновляет collision — физика не знает о смещении","Дорого если много вершин и сложный шейдер","Влияет на shadow rendering — тень не соответствует мешу"]},
    en:{title:"World Position Offset (WPO)",uses:["Wind for trees and plants — sinusoidal offset by UV","Water — waves via WPO on a plane","Destruction — fragment fly-apart animation","Character idle breathing — subtle chest movement","Flags, cloth — physics-like simulation in shader"],limits:["Does NOT work with Nanite (UE5.0), partial in UE5.1+","Doesn't update collision — physics unaware of offset","Expensive with many vertices and complex shader","Affects shadow rendering — shadow won't match mesh"]},
  };
  const t=txt[lang];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <Code lang="hlsl">{`// WPO — ветер для листвы (упрощённо)
// В Material Graph: подключить в World Position Offset
float2 uv = TexCoord;                          // UV меша
float time = Time;                             // глобальное время

// Волнообразное смещение в XY плоскости
float wave = sin(uv.x * 6.28 + time * 2.0)
           * cos(uv.y * 6.28 + time * 1.5);

// Маска — нижние вершины не двигаются (корни)
float mask = VertexColor.r;                    // R-канал = маска WPO

float3 offset = float3(wave * 5.0 * mask,
                        wave * 2.0 * mask,
                        0.0);
// Подключить offset → World Position Offset вход Material`}</Code>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <div style={{background:C.green+"12",border:`1px solid ${C.green}33`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.green,marginBottom:8}}>USE CASES</div>
          {t.uses.map(u=>(<div key={u} style={{display:"flex",gap:6,marginBottom:6}}><span style={{color:C.green,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{u}</span></div>))}
        </div>
        <div style={{background:C.red+"12",border:`1px solid ${C.red}33`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.red,marginBottom:8}}>{lang==='ru'?"ОГРАНИЧЕНИЯ":"LIMITATIONS"}</div>
          {t.limits.map(l=>(<div key={l} style={{display:"flex",gap:6,marginBottom:6}}><span style={{color:C.red,flexShrink:0}}>⚠</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{l}</span></div>))}
        </div>
      </div>
    </div>
  );
}

function VertexColorSection(){
  const lang=useLang();
  const channels={
    R:{col:"#ff4455",label:"R",ru:"Маска WPO — какие вершины двигаются (листья=1, корни=0)",en:"WPO mask — which vertices move (leaves=1, roots=0)"},
    G:{col:"#39ff8a",label:"G",ru:"Ambient Occlusion запечённый — затемнение в складках",en:"Baked Ambient Occlusion — darkening in crevices"},
    B:{col:"#00c8ff",label:"B",ru:"Blend маска — смешение текстур (трава/земля на террейне)",en:"Blend mask — texture blending (grass/dirt on terrain)"},
    A:{col:"#b57bff",label:"A",ru:"Произвольные данные — roughness вариация, wet mask",en:"Custom data — roughness variation, wet mask"},
  };
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
        <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:10,letterSpacing:1}}>{lang==='ru'?"ЧТО ХРАНИТСЯ В КАНАЛАХ":"WHAT'S STORED IN CHANNELS"}</div>
        {Object.entries(channels).map(([k,{col,label,ru,en}])=>(<div key={k} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
          <div style={{width:32,height:32,background:col+"33",border:`2px solid ${col}`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:12,color:col,fontWeight:700,flexShrink:0}}>{label}</div>
          <div><div style={{fontFamily:"monospace",fontSize:11,color:col,marginBottom:2}}>{lang==='ru'?ru:en}</div></div>
        </div>))}
      </div>
      <Code lang="hlsl">{`// Чтение Vertex Color в шейдере (HLSL / UE Material)
float wpoMask  = VertexColor.r;  // 0=корень, 1=листва
float ao       = VertexColor.g;  // запечённый AO
float blendMsk = VertexColor.b;  // маска смешения текстур

// Blend двух текстур по vertex color
float3 texA = Texture2DSample(TexGrass, Samp, uv).rgb;
float3 texB = Texture2DSample(TexDirt,  Samp, uv).rgb;
float3 result = lerp(texA, texB, blendMsk);

// Применить AO
result *= lerp(1.0, ao, AOStrength);`}</Code>
      <div style={{background:C.yellow+"12",border:`1px solid ${C.yellow}33`,borderRadius:8,padding:"12px 14px",fontSize:12,color:C.muted}}>
        <span style={{color:C.yellow,fontFamily:"monospace",fontSize:10}}>{lang==='ru'?"РАБОЧИЙ ПРОЦЕСС":"WORKFLOW"} › </span>
        {lang==='ru'?"Запекается в DCC (Maya/Houdini) или рисуется в Mesh Paint Mode в UE5. Хранится в меше, нет затрат на память (в отличие от текстуры). 4 канала × 8 бит на вершину.":"Baked in DCC (Maya/Houdini) or painted in UE5 Mesh Paint Mode. Stored in mesh, no memory overhead (unlike textures). 4 channels × 8 bits per vertex."}
      </div>
    </div>
  );
}

function VATSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
        <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>{lang==='ru'?"КАК РАБОТАЕТ":"HOW IT WORKS"}</div>
        {(lang==='ru'?["Симуляция запускается в Houdini/Maya (ткань, физика, разрушение)","Каждый кадр: позиция каждой вершины пишется в пиксель текстуры","Текстура: X=вершина, Y=кадр анимации","В шейдере: читаем позицию из текстуры, добавляем к базовому мешу","Результат: тысячи объектов с уникальной анимацией за 1 draw call"]:
          ["Simulation runs in Houdini/Maya (cloth, physics, destruction)","Each frame: every vertex position written to a texture pixel","Texture: X=vertex, Y=animation frame","In shader: read position from texture, add to base mesh","Result: thousands of objects with unique animation in 1 draw call"]).map(s=>(<div key={s} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:C.accent,flexShrink:0,fontFamily:"monospace"}}>›</span><span style={{fontSize:13,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{s}</span></div>))}
      </div>
      <Code lang="hlsl">{`// VAT Vertex Shader (упрощённо)
// posTexture: текстура с запечёнными позициями
// frame: текущий кадр (0..numFrames)
// vertexID: индекс вершины

float u = (vertexID + 0.5) / numVertices;  // X = вершина
float v = (frame    + 0.5) / numFrames;    // Y = кадр

// Читаем позицию из текстуры
// ВАЖНО: SampleLevel, т.к. в VS нет ddx/ddy
float3 animPos = posTexture.SampleLevel(Samp,
                   float2(u, v), 0).xyz;

// Добавляем к базовой позиции (rest pose)
float3 finalPos = IN.Position + animPos;
OUT.ClipPos = mul(ViewProjMatrix, float4(finalPos, 1.0));`}</Code>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <div style={{background:C.green+"12",border:`1px solid ${C.green}33`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.green,marginBottom:6}}>{lang==='ru'?"ПРЕИМУЩЕСТВА":"ADVANTAGES"}</div>
          {(lang==='ru'?["1 draw call для тысяч объектов","GPU-driven — нет CPU overhead","Совместим с Nanite (статический меш)","Детерминированная анимация"]:["1 draw call for thousands of objects","GPU-driven — no CPU overhead","Compatible with Nanite (static mesh)","Deterministic animation"]).map(s=>(<div key={s} style={{fontSize:11,color:C.muted,marginBottom:4}}>› {s}</div>))}
        </div>
        <div style={{background:C.red+"12",border:`1px solid ${C.red}33`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.red,marginBottom:6}}>{lang==='ru'?"ОГРАНИЧЕНИЯ":"LIMITATIONS"}</div>
          {(lang==='ru'?["Нет blending между анимациями","Нет ragdoll/интерактивной физики","Большие текстуры (float16/32)","Фиксированное количество вершин"]:["No blending between animations","No ragdoll/interactive physics","Large textures (float16/32)","Fixed vertex count"]).map(s=>(<div key={s} style={{fontSize:11,color:C.muted,marginBottom:4}}>› {s}</div>))}
        </div>
      </div>
    </div>
  );
}

function SkeletalMeshSection(){
  const lang=useLang();
  const limits=[
    {param:lang==='ru'?"Костей (Mobile)":"Bones (Mobile)",val:"75",col:C.green},
    {param:lang==='ru'?"Костей (Desktop)":"Bones (Desktop)",val:"256",col:C.accent},
    {param:lang==='ru'?"Влияний на вершину":"Influences/vertex",val:"4",col:C.yellow},
    {param:lang==='ru'?"UV каналов":"UV channels",val:"4",col:C.orange},
    {param:lang==='ru'?"Морф-таргетов":"Morph targets",val:"∞*",col:C.purple},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"separate",borderSpacing:2,minWidth:300}}>
          <thead><tr>
            <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 12px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>{lang==='ru'?"Параметр":"Parameter"}</th>
            <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 12px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>{lang==='ru'?"Лимит":"Limit"}</th>
          </tr></thead>
          <tbody>{limits.map(({param,val,col})=>(<tr key={param}>
            <td style={{background:"#111827",border:`1px solid ${C.border}`,padding:"8px 12px",fontSize:12,color:C.text}}>{param}</td>
            <td style={{background:"#111827",border:`1px solid ${C.border}`,padding:"8px 12px",fontFamily:"monospace",fontSize:13,color:col,fontWeight:700}}>{val}</td>
          </tr>))}</tbody>
        </table>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {[{title:lang==='ru'?"LOD для Skeletal Mesh":"LOD for Skeletal Mesh",col:C.accent,items:lang==='ru'?["LOD0: full rig, все кости, все морфы","LOD1: убрать вспомогательные кости (twist, corrective)","LOD2-3: только основные деформирующие кости","Merge section — объединить несколько материалов в один"]:["LOD0: full rig, all bones, all morphs","LOD1: remove helper bones (twist, corrective)","LOD2-3: only main deforming bones","Merge section — combine multiple materials into one"]},
          {title:lang==='ru'?"Physics Asset (PhAT)":"Physics Asset (PhAT)",col:C.orange,items:lang==='ru'?["Набор коллизионных примитивов на кости для ragdoll/cloth","Capsule на каждую конечность — не triangle mesh","Constraint между костями — ограничение угла поворота","Collision profile — какие каналы участвуют в коллизии"]:["Set of collision primitives per bone for ragdoll/cloth","Capsule per limb — not triangle mesh","Constraint between bones — angle rotation limit","Collision profile — which channels participate in collision"]},
          {title:lang==='ru'?"Morph Targets":"Morph Targets",col:C.green,items:lang==='ru'?["Дельта-смещение вершин от базовой позы","Используется для: фациальная анимация, корректоры деформации","BlendShape в Maya/Houdini = Morph Target в UE5","Дорого если много таргетов на LOD0 — оптимизируй LOD"]:["Delta vertex offset from base pose","Used for: facial animation, deformation correctives","BlendShape in Maya/Houdini = Morph Target in UE5","Expensive with many targets on LOD0 — optimize per LOD"]},
        ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:8}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
      </div>
    </div>
  );
}

// ══ MODULE 9 — EFFECTS ═══════════════════════════════════════════════════════
function PostProcessSection(){
  const lang=useLang();
  const [tab,setTab]=useState("basics");
  const tabs={
    basics:{col:C.accent,label:lang==='ru'?"Основы":"Basics",content:lang==='ru'?[
      {t:"Что такое PP материал",d:"Материал применяется к финальному изображению кадра в screen space. Не знает о 3D геометрии — работает только с пикселями. Подключается через Post Process Volume или Camera компонент."},
      {t:"Blendable Location",d:"Before Tonemapping: HDR данные, можно менять освещение. After Tonemapping: LDR, финальный цвет. Replacing Tonemapper: полная замена тонмаппера."},
      {t:"SceneTexture нод",d:"Читает G-Buffer данные в PP шейдере. SceneColor — финальный цвет. SceneDepth — глубина. WorldNormal — нормали из G-Buffer. PostProcessInput0 — предыдущий pass."},
    ]:[
      {t:"What is a PP Material",d:"Material applied to the final frame image in screen space. Knows nothing of 3D geometry — works only with pixels. Connected via Post Process Volume or Camera component."},
      {t:"Blendable Location",d:"Before Tonemapping: HDR data, can modify lighting. After Tonemapping: LDR, final color. Replacing Tonemapper: full tonemapper replacement."},
      {t:"SceneTexture node",d:"Reads G-Buffer data in PP shader. SceneColor — final color. SceneDepth — depth. WorldNormal — normals from G-Buffer. PostProcessInput0 — previous pass."},
    ]},
    customdepth:{col:C.orange,label:"Custom Depth",content:lang==='ru'?[
      {t:"Custom Depth",d:"Отдельный depth pass для выбранных мешей. Включается в настройках Static/Skeletal Mesh компонента: Rendering → Render Custom Depth Pass."},
      {t:"Custom Stencil",d:"8-битное значение (0-255) которое можно задать каждому объекту. В PP материале: SceneTexture:CustomStencil → маска для эффектов."},
      {t:"Outline эффект",d:"Classic техника: рендерим custom depth объекта → в PP расширяем маску (dilate) → вычитаем оригинал → получаем outline пиксели → красим в нужный цвет."},
    ]:[
      {t:"Custom Depth",d:"Separate depth pass for selected meshes. Enabled in Static/Skeletal Mesh component settings: Rendering → Render Custom Depth Pass."},
      {t:"Custom Stencil",d:"8-bit value (0-255) assignable to each object. In PP material: SceneTexture:CustomStencil → mask for effects."},
      {t:"Outline effect",d:"Classic technique: render custom depth of object → dilate mask in PP → subtract original → get outline pixels → color them."},
    ]},
    sseffects:{col:C.green,label:"Screen Space",content:lang==='ru'?[
      {t:"SSAO (Screen Space AO)",d:"Ambient Occlusion в screen space. Семплирует глубину вокруг пикселя — если соседи близко, добавляет затемнение. Дёшево, но артефакты на краях экрана."},
      {t:"SSR (Screen Space Reflections)",d:"Трассирует лучи по depth buffer в screen space. Дёшево для flat поверхностей. Артефакты: отражения пропадают если объект за краем экрана."},
      {t:"TAA (Temporal AA)",d:"Jitter камеры + blend с предыдущими кадрами. Устраняет алиасинг, добавляет ghosting при быстром движении. UE5 использует TSR (Temporal Super Resolution) вместо TAA."},
    ]:[
      {t:"SSAO (Screen Space AO)",d:"Ambient Occlusion in screen space. Samples depth around pixel — if neighbors are close, darkens it. Cheap, but artifacts at screen edges."},
      {t:"SSR (Screen Space Reflections)",d:"Traces rays through depth buffer in screen space. Cheap for flat surfaces. Artifacts: reflections disappear when object goes off-screen."},
      {t:"TAA (Temporal AA)",d:"Camera jitter + blend with previous frames. Eliminates aliasing, adds ghosting on fast movement. UE5 uses TSR (Temporal Super Resolution) instead of TAA."},
    ]},
  };
  const cur=tabs[tab];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
        {Object.entries(tabs).map(([k,v])=>(<button key={k} onClick={()=>setTab(k)} style={{background:tab===k?v.col+"22":"transparent",border:`1px solid ${tab===k?v.col:C.border}`,borderRadius:6,padding:"6px 12px",color:tab===k?v.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{v.label}</button>))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {cur.content.map(({t,d})=>(<div key={t} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:12,color:cur.col,fontWeight:700,marginBottom:6}}>{t}</div><div style={{fontSize:13,color:C.muted,lineHeight:1.7,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{d}</div></div>))}
      </div>
      <Code lang="hlsl">{`// PP материал: outline через Custom Depth
// SceneTexture:CustomDepth — глубина выделенного объекта
// SceneTexture:SceneDepth  — глубина сцены

float customD = SceneTexture(CustomDepth, UV);
float sceneD  = SceneTexture(SceneDepth,  UV);

// Объект "виден" если его custom depth == scene depth
float isMesh = abs(customD - sceneD) < 0.001;

// Dilate: проверить соседние пиксели
float outline = 0;
float2 px = 1.0 / ScreenSize;
for(int x=-2; x<=2; x++) for(int y=-2; y<=2; y++) {
  float cd = SceneTexture(CustomDepth, UV + float2(x,y)*px);
  float sd = SceneTexture(SceneDepth,  UV + float2(x,y)*px);
  outline = max(outline, abs(cd-sd) < 0.001 ? 1.0 : 0.0);
}
float rim = outline * (1.0 - isMesh); // только граница
return lerp(SceneColor, OutlineColor, rim);`}</Code>
    </div>
  );
}

function NiagaraSection(){
  const lang=useLang();
  const comparison=[
    {prop:lang==='ru'?"Где работает":"Where it runs",cpu:lang==='ru'?"CPU thread":"CPU thread",gpu:lang==='ru'?"GPU compute shader":"GPU compute shader"},
    {prop:lang==='ru'?"Количество частиц":"Particle count",cpu:"~10K",gpu:"~1M+"},
    {prop:lang==='ru'?"Чтение данных сцены":"Read scene data",cpu:lang==='ru'?"Легко (Blueprint, C++)":"Easy (Blueprint, C++)",gpu:lang==='ru'?"Ограничено":"Limited"},
    {prop:lang==='ru'?"Collision":"Collision",cpu:lang==='ru'?"Полная поддержка":"Full support",gpu:"Depth buffer only"},
    {prop:lang==='ru'?"Spawn из Blueprint":"Spawn from Blueprint",cpu:"✓",gpu:lang==='ru'?"Только CPU spawn":"CPU spawn only"},
    {prop:lang==='ru'?"Custom HLSL":"Custom HLSL",cpu:"✓",gpu:"✓"},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"separate",borderSpacing:2,minWidth:360}}>
          <thead><tr>
            <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>{lang==='ru'?"Параметр":"Parameter"}</th>
            <th style={{background:C.orange+"18",border:`1px solid ${C.orange}44`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.orange,textAlign:"left"}}>CPU</th>
            <th style={{background:C.accent+"18",border:`1px solid ${C.accent}44`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.accent,textAlign:"left"}}>GPU</th>
          </tr></thead>
          <tbody>{comparison.map(({prop,cpu,gpu})=>(<tr key={prop}>
            <td style={{background:"#111827",border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.muted}}>{prop}</td>
            <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.orange}}>{cpu}</td>
            <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.accent}}>{gpu}</td>
          </tr>))}</tbody>
        </table>
      </div>
      <div style={{display:"grid",gap:8}}>
        {[{title:lang==='ru'?"Архитектура Niagara":"Niagara Architecture",col:C.accent,items:lang==='ru'?["System — контейнер, управляет Emitter'ами","Emitter — источник частиц, определяет поведение","Module — нода с HLSL кодом, добавляется в стек","Parameter — данные которые передаются между модулями","Scratch Pad — кастомный модуль с HLSL прямо в редакторе"]:["System — container, manages Emitters","Emitter — particle source, defines behavior","Module — node with HLSL code, added to stack","Parameter — data passed between modules","Scratch Pad — custom module with HLSL directly in editor"]},
          {title:lang==='ru'?"Когда GPU Emitter":"When to Use GPU Emitter",col:C.green,items:lang==='ru'?["Больше ~5000 частиц одновременно","Большое количество одинаковых систем на уровне","Не нужна коллизия с физическими объектами","Пример: дождь, снег, пыль, массовые взрывы"]:["More than ~5000 simultaneous particles","Large number of identical systems on level","No collision with physics objects needed","Examples: rain, snow, dust, mass explosions"]},
          {title:lang==='ru'?"Custom HLSL в Niagara":"Custom HLSL in Niagara",col:C.purple,items:lang==='ru'?["Scratch Pad Module: полный доступ к HLSL","Map Get/Set — чтение/запись параметров системы","Simulate: запускается каждый тик для каждой частицы","Spawn: запускается при создании частицы","Можно семплировать текстуры, читать буферы"]:["Scratch Pad Module: full HLSL access","Map Get/Set — read/write system parameters","Simulate: runs every tick per particle","Spawn: runs on particle creation","Can sample textures, read buffers"]},
        ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:8}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
      </div>
    </div>
  );
}

function RenderTargetSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"grid",gap:8}}>
        {[{title:lang==='ru'?"Что такое Render Target":"What is a Render Target",col:C.accent,items:lang==='ru'?["Текстура в которую GPU может рендерить напрямую","Обычная Texture2D которая создаётся в рантайме","Поддерживает любой формат: RGBA8, RGBA16f, R32f","Может быть Material Parameter — читается в шейдере"]:["A texture GPU can render into directly","Regular Texture2D created at runtime","Supports any format: RGBA8, RGBA16f, R32f","Can be a Material Parameter — readable in shader"]},
          {title:lang==='ru'?"Use Cases":"Use Cases",col:C.green,items:lang==='ru'?["Fluid simulation — писать и читать RT попеременно (ping-pong)","Minimap — рендерить сцену сверху в текстуру","Procedural textures — генерировать паттерны в runtime","Portal rendering — камера портала рендерит в RT → материал","Baking — записать информацию о сцене в текстуру"]:["Fluid simulation — write and read RT alternately (ping-pong)","Minimap — render scene from above into texture","Procedural textures — generate patterns at runtime","Portal rendering — portal camera renders to RT → material","Baking — record scene information into texture"]},
          {title:lang==='ru'?"Ping-Pong паттерн":"Ping-Pong Pattern",col:C.orange,items:lang==='ru'?["2 Render Target: A и B","Кадр 1: читаем A, пишем в B (B = simulate(A))","Кадр 2: читаем B, пишем в A (A = simulate(B))","Используется для: вода, огонь, снег — физика в шейдере","Дёшево: GPU читает и пишет текстуры без CPU"]:["2 Render Targets: A and B","Frame 1: read A, write to B (B = simulate(A))","Frame 2: read B, write to A (A = simulate(B))","Used for: water, fire, snow — physics in shader","Cheap: GPU reads and writes textures without CPU"]},
        ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:8}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
      </div>
    </div>
  );
}

// ══ PIPELINE EXTRAS ═══════════════════════════════════════════════════════════
function FBXImportSection(){
  const lang=useLang();
  const settings=[
    {key:"Collision",ru:"UCX_MeshName — convex collision. UBX_ — box, USP_ — sphere. Без префикса — нет коллизии.",en:"UCX_MeshName — convex collision. UBX_ — box, USP_ — sphere. No prefix — no collision.",col:C.orange},
    {key:"Smoothing Groups",ru:"Определяют hard/soft edges. Без них — нормали неправильные. Экспортируй из Maya с Smooth Mesh.",en:"Determine hard/soft edges. Without them — wrong normals. Export from Maya with Smooth Mesh.",col:C.accent},
    {key:"Pivot Point",ru:"Origin меша = pivot в UE5. Центри pivot в DCC перед экспортом или используй Set Pivot в UE.",en:"Mesh origin = pivot in UE5. Center pivot in DCC before export or use Set Pivot in UE.",col:C.green},
    {key:"Units",ru:"UE5 использует сантиметры. Maya по умолчанию — сантиметры. 3ds Max — дюймы (нужен Scale Factor).",en:"UE5 uses centimeters. Maya default — centimeters. 3ds Max — inches (needs Scale Factor).",col:C.yellow},
    {key:"LOD",ru:"Суффикс _LOD0, _LOD1 — автоматический импорт LOD. Или Import Mesh LODs в настройках.",en:"Suffix _LOD0, _LOD1 — automatic LOD import. Or Import Mesh LODs in settings.",col:C.purple},
    {key:"Sockets",ru:"SOCKET_Name — импортируется как Socket. Используется для attach оружия, эффектов.",en:"SOCKET_Name — imports as Socket. Used for weapon/effect attachment.",col:C.pink},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {settings.map(({key,ru,en,col})=>(<div key={key} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
        <div style={{fontFamily:"monospace",fontSize:12,color:col,fontWeight:700,marginBottom:5}}>{key}</div>
        <div style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word"}}>{lang==='ru'?ru:en}</div>
      </div>))}
    </div>
  );
}

function CollisionSection(){
  const lang=useLang();
  const prefixes=[
    {prefix:"UCX_",shape:lang==='ru'?"Convex hull (выпуклая оболочка)":"Convex hull",use:lang==='ru'?"Большинство объектов — стены, мебель, пропсы":"Most objects — walls, furniture, props",col:C.orange},
    {prefix:"UBX_",shape:lang==='ru'?"Box (коробка)":"Box",use:lang==='ru'?"Простые прямоугольные объекты":"Simple rectangular objects",col:C.accent},
    {prefix:"USP_",shape:lang==='ru'?"Sphere (сфера)":"Sphere",use:lang==='ru'?"Круглые объекты — шары, кнопки":"Round objects — balls, buttons",col:C.green},
    {prefix:"UCP_",shape:lang==='ru'?"Capsule (капсула)":"Capsule",use:lang==='ru'?"Персонажи, столбы":"Characters, pillars",col:C.yellow},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {prefixes.map(({prefix,shape,use,col})=>(<div key={prefix} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"10px 14px",display:"flex",gap:12,alignItems:"flex-start"}}>
          <div style={{fontFamily:"monospace",fontSize:13,color:col,fontWeight:700,flexShrink:0,minWidth:60}}>{prefix}</div>
          <div><div style={{fontSize:12,color:C.text,marginBottom:2}}>{shape}</div><div style={{fontSize:11,color:C.muted,wordBreak:"break-word"}}>{use}</div></div>
        </div>))}
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
        <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>{lang==='ru'?"КЛЮЧЕВЫЕ ПРАВИЛА":"KEY RULES"}</div>
        {(lang==='ru'?["Имя: UCX_MeshName (где MeshName = имя Static Mesh)","Можно несколько: UCX_MeshName_01, UCX_MeshName_02","Convex hull — только выпуклые формы. Вогнутость = сделай несколько UCX","Complex collision: Use Complex As Simple — дорого, только для мелких объектов","Collision channels: настрой Object Type и Response для каждого меша"]:["Name: UCX_MeshName (MeshName = Static Mesh name)","Multiple allowed: UCX_MeshName_01, UCX_MeshName_02","Convex hull — convex shapes only. Concave = use multiple UCX","Complex collision: Use Complex As Simple — expensive, small objects only","Collision channels: set Object Type and Response per mesh"]).map(s=>(<div key={s} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:C.orange,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{s}</span></div>))}
      </div>
    </div>
  );
}

function LightmapSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"grid",gap:8}}>
        {[{title:lang==='ru'?"UV Channel 2 — правила":"UV Channel 2 — Rules",col:C.accent,items:lang==='ru'?["Channel 0: текстурные UV (тайлинг разрешён)","Channel 1: lightmap UV (0-1 диапазон, БЕЗ наложения)","Все острова должны быть в квадрате [0,1]×[0,1]","Между островами зазор минимум 2px при нужном разрешении","Generate Lightmap UVs в UE5 — автоматически, но не идеально"]:["Channel 0: texture UVs (tiling allowed)","Channel 1: lightmap UV (0-1 range, NO overlapping)","All islands must be in [0,1]×[0,1] square","Minimum 2px gap between islands at target resolution","Generate Lightmap UVs in UE5 — automatic but not perfect"]},
          {title:lang==='ru'?"Разрешение лайтмап":"Lightmap Resolution",col:C.orange,items:lang==='ru'?["Малые пропсы: 32-64","Средние объекты (стены, мебель): 128-256","Большие поверхности (пол, потолок): 256-512","Exterior здания: 512-1024","Правило: 1 тексель ~ 2-5 см реального пространства"]:["Small props: 32-64","Medium objects (walls, furniture): 128-256","Large surfaces (floor, ceiling): 256-512","Building exterior: 512-1024","Rule: 1 texel ~ 2-5 cm real world space"]},
          {title:lang==='ru'?"Lumen vs Лайтмапы":"Lumen vs Lightmaps",col:C.green,items:lang==='ru'?["Лайтмапы: запечённые, только статический свет, нет VRAM в рантайме","Lumen: динамический, реальное время, требует performance","Мобильные проекты: лайтмапы (нет Lumen на mobile)","Console/PC AAA: Lumen заменяет лайтмапы","Гибрид: статический свет через лайтмапы + Lumen для dynamic"]:["Lightmaps: baked, static light only, no VRAM at runtime","Lumen: dynamic, real-time, requires performance","Mobile: lightmaps (no Lumen on mobile)","Console/PC AAA: Lumen replaces lightmaps","Hybrid: static light via lightmaps + Lumen for dynamic"]},
        ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:8}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
      </div>
    </div>
  );
}

function HardSoftRefsSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"separate",borderSpacing:2,minWidth:320}}>
          <thead><tr>
            <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>{lang==='ru'?"Тип":"Type"}</th>
            <th style={{background:C.orange+"18",border:`1px solid ${C.orange}44`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.orange,textAlign:"left"}}>{lang==='ru'?"Hard Reference":"Hard Reference"}</th>
            <th style={{background:C.green+"18",border:`1px solid ${C.green}44`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.green,textAlign:"left"}}>{lang==='ru'?"Soft Reference":"Soft Reference"}</th>
          </tr></thead>
          <tbody>{[
            {prop:lang==='ru'?"Загрузка":"Loading",hard:lang==='ru'?"При загрузке owner":"With owner load",soft:lang==='ru'?"Явная/Async":"Explicit/Async"},
            {prop:"UE5 тип",hard:"TObjectPtr<>",soft:"TSoftObjectPtr<>"},
            {prop:lang==='ru'?"Память":"Memory",hard:lang==='ru'?"Сразу в RAM":"Immediately in RAM",soft:lang==='ru'?"По требованию":"On demand"},
            {prop:lang==='ru'?"Circular deps":"Circular deps",hard:lang==='ru'?"Проблема":"Problem",soft:lang==='ru'?"Решает":"Solves"},
            {prop:lang==='ru'?"Использование":"Use case",hard:lang==='ru'?"Всегда нужен":"Always needed",soft:lang==='ru'?"Опционально":"Optional"},
          ].map(({prop,hard,soft})=>(<tr key={prop}>
            <td style={{background:"#111827",border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.muted}}>{prop}</td>
            <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.orange}}>{hard}</td>
            <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.green}}>{soft}</td>
          </tr>))}</tbody>
        </table>
      </div>
      <Code lang="python">{`// Hard Reference — загружается вместе с классом
// Если BP_Enemy ссылается на T_BigTexture hard ref —
// текстура грузится ВСЕГДА при загрузке BP_Enemy
UPROPERTY()
TObjectPtr<UTexture2D> AlwaysLoadedTexture;

// Soft Reference — только путь, не загружает
// Загрузить явно:
UPROPERTY()
TSoftObjectPtr<UTexture2D> OptionalTexture;

void LoadAsync() {
    FStreamableManager& Manager = UAssetManager::GetStreamableManager();
    Manager.RequestAsyncLoad(OptionalTexture.ToSoftObjectPath(),
        FStreamableDelegate::CreateUObject(this,
            &AMyActor::OnTextureLoaded));
}`}</Code>
    </div>
  );
}

function CVarsSection(){
  const lang=useLang();
  const [cat,setCat]=useState("rendering");
  const cvars={
    rendering:{col:C.accent,label:lang==='ru'?"Рендеринг":"Rendering",items:[
      {cmd:"r.ScreenPercentage 50",d:lang==='ru'?"Снизить разрешение рендера до 50%. Тест GPU-bound vs CPU-bound.":"Reduce render resolution to 50%. Test GPU-bound vs CPU-bound."},
      {cmd:"r.VSync 0",d:lang==='ru'?"Выключить VSync для измерения реального FPS.":"Disable VSync to measure real FPS."},
      {cmd:"r.Shadow.MaxResolution 1024",d:lang==='ru'?"Максимальное разрешение shadow map.":"Maximum shadow map resolution."},
      {cmd:"r.Lumen.Reflections.Allow 0",d:lang==='ru'?"Выключить Lumen reflections для профайлинга.":"Disable Lumen reflections for profiling."},
      {cmd:"r.Nanite 0",d:lang==='ru'?"Выключить Nanite — используется обычный LOD.":"Disable Nanite — use regular LOD."},
      {cmd:"r.HZBOcclusion 1",d:lang==='ru'?"Иерархический Z-buffer occlusion culling.":"Hierarchical Z-buffer occlusion culling."},
    ]},
    debug:{col:C.orange,label:"Debug",items:[
      {cmd:"stat GPU",d:lang==='ru'?"Время каждого GPU pass в ms.":"Time per GPU pass in ms."},
      {cmd:"stat Unit",d:lang==='ru'?"CPU/GPU/Frame/Game time — основной профайлинг.":"CPU/GPU/Frame/Game time — main profiling."},
      {cmd:"profilegpu",d:lang==='ru'?"Один детальный кадр GPU профайлинга.":"One detailed GPU profiling frame."},
      {cmd:"ShowFlag.Wireframe 1",d:lang==='ru'?"Wireframe режим — видно полигоны.":"Wireframe mode — see polygons."},
      {cmd:"r.VisualizeOccludedPrimitives 1",d:lang==='ru'?"Подсветить culled объекты.":"Highlight culled objects."},
      {cmd:"vis r.VisualizeTexture 0",d:lang==='ru'?"Визуализировать render target #0.":"Visualize render target #0."},
    ]},
    quality:{col:C.green,label:lang==='ru'?"Качество":"Quality",items:[
      {cmd:"sg.ShadowQuality 3",d:lang==='ru'?"Качество теней 0-3. 0=выкл, 3=максимум.":"Shadow quality 0-3. 0=off, 3=max."},
      {cmd:"sg.TextureQuality 3",d:lang==='ru'?"Качество текстур 0-3.":"Texture quality 0-3."},
      {cmd:"sg.PostProcessQuality 3",d:lang==='ru'?"Качество пост-процесса 0-3.":"Post-process quality 0-3."},
      {cmd:"r.MaxAnisotropy 16",d:lang==='ru'?"Максимальная анизотропная фильтрация.":"Maximum anisotropic filtering."},
      {cmd:"r.Streaming.PoolSize 2000",d:lang==='ru'?"Размер пула стриминга текстур в MB.":"Texture streaming pool size in MB."},
    ]},
  };
  const cur=cvars[cat];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
        {Object.entries(cvars).map(([k,v])=>(<button key={k} onClick={()=>setCat(k)} style={{background:cat===k?v.col+"22":"transparent",border:`1px solid ${cat===k?v.col:C.border}`,borderRadius:6,padding:"5px 12px",color:cat===k?v.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{v.label}</button>))}
      </div>
      <div style={{display:"grid",gap:6}}>
        {cur.items.map(({cmd,d})=>(<div key={cmd} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:12,color:cur.col,marginBottom:4}}>{cmd}</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.5,wordBreak:"break-word"}}>{d}</div>
        </div>))}
      </div>
    </div>
  );
}

function BlueprintPatternsSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {[{title:lang==='ru'?"Event Dispatcher":"Event Dispatcher",col:C.accent,items:lang==='ru'?["Объект публикует событие, другие подписываются","Нет прямых ссылок между объектами — слабая связность","Пример: Pickup публикует OnCollected → UI обновляет счётчик","В C++: FSimpleMulticastDelegate, TMulticastDelegate","Разница с Blueprint Interface: ED — broadcast всем, Interface — конкретному объекту"]:["Object broadcasts event, others subscribe","No direct references between objects — loose coupling","Example: Pickup broadcasts OnCollected → UI updates counter","In C++: FSimpleMulticastDelegate, TMulticastDelegate","Difference from Blueprint Interface: ED — broadcast to all, Interface — to specific object"]},
        {title:lang==='ru'?"Blueprint Interface":"Blueprint Interface",col:C.orange,items:lang==='ru'?["Контракт: объект реализует интерфейс = можно вызвать метод без cast","Нет зависимости от конкретного класса — полиморфизм","Пример: IInteractable → Player вызывает Interact() на любом объекте","В C++: UINTERFACE(MinimalAPI)","Лучше Event Dispatcher когда нужен return value или конкретный объект"]:["Contract: object implements interface = can call method without cast","No dependency on specific class — polymorphism","Example: IInteractable → Player calls Interact() on any object","In C++: UINTERFACE(MinimalAPI)","Better than Event Dispatcher when return value or specific object needed"]},
        {title:lang==='ru'?"Casting и его цена":"Casting and Its Cost",col:C.red,items:lang==='ru'?["Cast To создаёт hard reference — загружает класс в память","Много Cast To в tick = CPU overhead каждый кадр","Альтернативы: Interface (нет hard ref), Event Dispatcher","Soft Cast: не загружает класс — проверяет тип без зависимости","Правило: если Cast в Tick — переделай на Interface или делегат"]:["Cast To creates hard reference — loads class into memory","Many Cast To in tick = CPU overhead every frame","Alternatives: Interface (no hard ref), Event Dispatcher","Soft Cast: doesn't load class — checks type without dependency","Rule: if Cast is in Tick — refactor to Interface or delegate"]},
        {title:lang==='ru'?"Game Subsystems":"Game Subsystems",col:C.green,items:lang==='ru'?["UGameInstanceSubsystem — живёт пока жив GameInstance","UWorldSubsystem — живёт пока жив World (уровень)","ULocalPlayerSubsystem — для каждого игрока отдельно","Не нужен GameMode/GameInstance для доступа — GetSubsystem<T>()","Идеально для глобальных менеджеров без Singleton паттерна"]:["UGameInstanceSubsystem — lives as long as GameInstance","UWorldSubsystem — lives as long as World (level)","ULocalPlayerSubsystem — separate per player","No need for GameMode/GameInstance access — GetSubsystem<T>()","Ideal for global managers without Singleton pattern"]},
      ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"14px 16px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:10}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:13,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
    </div>
  );
}



// ══ MODULE: C++ IN UNREAL ════════════════════════════════════════════════════

function UObjectSystemSection(){
  const lang=useLang();
  const [tab,setTab]=useState("macros");
  const tabs={
    macros:{col:C.orange,label:"Макросы / Macros",items:lang==='ru'?[
      {t:"UCLASS()",d:"Регистрирует класс в системе рефлексии UE. Обязателен для всех UObject наследников. Позволяет Blueprint видеть класс, GC управлять памятью, сериализации работать."},
      {t:"UPROPERTY()",d:"Регистрирует переменную в рефлексии. Спецификаторы: BlueprintReadWrite, EditAnywhere, Replicated, SaveGame. Без UPROPERTY — GC не знает о указателе и может собрать объект."},
      {t:"UFUNCTION()",d:"Регистрирует функцию. BlueprintCallable — вызов из BP. BlueprintImplementableEvent — реализация в BP. BlueprintNativeEvent — реализация в C++ с возможностью override в BP."},
      {t:"USTRUCT()",d:"Регистрирует структуру. Лёгче UObject — нет GC, нет наследования от UObject. Используй для данных без логики: FInventoryItem, FWeaponStats."},
      {t:"UENUM()",d:"Регистрирует enum. BlueprintType — виден в BP. Используй UENUM(BlueprintType) + enum class EMyState : uint8 для Blueprint."},
    ]:[
      {t:"UCLASS()",d:"Registers class in UE reflection system. Required for all UObject descendants. Allows Blueprint to see the class, GC to manage memory, serialization to work."},
      {t:"UPROPERTY()",d:"Registers variable in reflection. Specifiers: BlueprintReadWrite, EditAnywhere, Replicated, SaveGame. Without UPROPERTY — GC doesn't know about pointer and may collect the object."},
      {t:"UFUNCTION()",d:"Registers function. BlueprintCallable — callable from BP. BlueprintImplementableEvent — implemented in BP. BlueprintNativeEvent — C++ impl with BP override capability."},
      {t:"USTRUCT()",d:"Registers struct. Lighter than UObject — no GC, no UObject inheritance. Use for data without logic: FInventoryItem, FWeaponStats."},
      {t:"UENUM()",d:"Registers enum. BlueprintType — visible in BP. Use UENUM(BlueprintType) + enum class EMyState : uint8 for Blueprint."},
    ]},
    uht:{col:C.accent,label:"UHT & .generated.h",items:lang==='ru'?[
      {t:"Unreal Header Tool (UHT)",d:"Парсит .h файлы перед компиляцией. Генерирует .generated.h с кодом рефлексии. Без GENERATED_BODY() в классе — UHT не обработает файл."},
      {t:"#include \"MyClass.generated.h\"",d:"ПОСЛЕДНИЙ include в любом UE заголовке. UHT генерирует этот файл. Порядок важен — этот include всегда последний."},
      {t:"GENERATED_BODY()",d:"Вставляет сгенерированный UHT код: конструктор, StaticClass(), рефлексия. Обязательно в каждом UCLASS и USTRUCT. Без него — ошибка компиляции."},
      {t:"Naming Conventions",d:"U — UObject (UMyObject), A — Actor (AMyActor), F — Struct (FMyStruct), E — Enum (EMyState), I — Interface (IMyInterface), T — Template (TArray). Нарушение = предупреждения компилятора."},
    ]:[
      {t:"Unreal Header Tool (UHT)",d:"Parses .h files before compilation. Generates .generated.h with reflection code. Without GENERATED_BODY() in class — UHT won't process the file."},
      {t:"#include \"MyClass.generated.h\"",d:"LAST include in any UE header. UHT generates this file. Order matters — this include is always last."},
      {t:"GENERATED_BODY()",d:"Inserts UHT-generated code: constructor, StaticClass(), reflection. Required in every UCLASS and USTRUCT. Without it — compile error."},
      {t:"Naming Conventions",d:"U — UObject (UMyObject), A — Actor (AMyActor), F — Struct (FMyStruct), E — Enum (EMyState), I — Interface (IMyInterface), T — Template (TArray). Violations = compiler warnings."},
    ]},
    specifiers:{col:C.green,label:lang==='ru'?"Спецификаторы":"Specifiers",items:lang==='ru'?[
      {t:"EditAnywhere",d:"Редактировать в Details панели где угодно: на ассете и на экземпляре в уровне."},
      {t:"EditDefaultsOnly",d:"Только в классе-ассете, не на экземпляре. Для геймплейных данных которые не должны различаться между экземплярами."},
      {t:"VisibleAnywhere",d:"Видно в Details но не редактируется. Для read-only информации."},
      {t:"BlueprintReadWrite",d:"Чтение и запись из Blueprint. Нужен EditAnywhere или VisibleAnywhere для видимости в Details."},
      {t:"Replicated",d:"Переменная реплицируется в Multiplayer. Нужна функция GetLifetimeReplicatedProps()."},
      {t:"Category",d:"Category=\"Combat|Damage\" — группировка в Details панели. Вложенность через |."},
    ]:[
      {t:"EditAnywhere",d:"Edit in Details panel anywhere: on asset and on level instance."},
      {t:"EditDefaultsOnly",d:"Only on class asset, not instance. For gameplay data that shouldn't differ between instances."},
      {t:"VisibleAnywhere",d:"Visible in Details but not editable. For read-only information."},
      {t:"BlueprintReadWrite",d:"Read and write from Blueprint. Needs EditAnywhere or VisibleAnywhere for Details visibility."},
      {t:"Replicated",d:"Variable replicates in Multiplayer. Requires GetLifetimeReplicatedProps() function."},
      {t:"Category",d:"Category=\"Combat|Damage\" — grouping in Details panel. Nesting via |."},
    ]},
  };
  const cur=tabs[tab];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
        {Object.entries(tabs).map(([k,v])=>(<button key={k} onClick={()=>setTab(k)} style={{background:tab===k?v.col+"22":"transparent",border:`1px solid ${tab===k?v.col:C.border}`,borderRadius:6,padding:"5px 12px",color:tab===k?v.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{v.label}</button>))}
      </div>
      <div style={{display:"grid",gap:6,marginBottom:12}}>
        {cur.items.map(({t,d})=>(<div key={t} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px"}}><div style={{fontFamily:"monospace",fontSize:12,color:cur.col,fontWeight:700,marginBottom:4}}>{t}</div><div style={{fontSize:13,color:C.muted,lineHeight:1.7,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{d}</div></div>))}
      </div>
      <Code lang="cpp">{`// Типичный UE5 .h файл — анатомия
#pragma once
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "MyActor.generated.h"   // ← ВСЕГДА последний include

UCLASS(BlueprintType, Blueprintable)  // ← Регистрация в UHT
class MYGAME_API AMyActor : public AActor {
  GENERATED_BODY()  // ← Вставляет сгенерированный код UHT
public:
  AMyActor();

  // Редактировать в редакторе + Blueprint read/write
  UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Combat")
  float Damage = 10.0f;

  // Вызывать из Blueprint
  UFUNCTION(BlueprintCallable, Category="Combat")
  void ApplyDamage(AActor* Target);

  // Реализовать в Blueprint (событие)
  UFUNCTION(BlueprintImplementableEvent)
  void OnDamageApplied(AActor* Target, float Amount);

protected:
  virtual void BeginPlay() override;

private:
  // Без UPROPERTY — GC не отслеживает → потенциальная утечка!
  UPROPERTY()
  TObjectPtr<UStaticMeshComponent> MeshComp;
};`}</Code>
    </div>
  );
}

function ProjectArchitectureSection(){
  const lang=useLang();
  const [view,setView]=useState("folders");
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
        {[["folders",lang==='ru'?"Структура папок":"Folder Structure",C.accent],["modules",lang==='ru'?"Модули":"Modules",C.orange],["buildcs","Build.cs",C.green],["naming",lang==='ru'?"Соглашения":"Naming",C.purple]].map(([k,l,col])=>(<button key={k} onClick={()=>setView(k)} style={{background:view===k?col+"22":"transparent",border:`1px solid ${view===k?col:C.border}`,borderRadius:6,padding:"5px 12px",color:view===k?col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{l}</button>))}
      </div>
      {view==="folders"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <Code lang="bash">{`ProjectName/
├── Source/
│   ├── ProjectName/           # Основной игровой модуль
│   │   ├── ProjectName.Build.cs   # Зависимости модуля
│   │   ├── ProjectName.h          # Модуль header
│   │   ├── ProjectName.cpp        # Модуль startup
│   │   │
│   │   ├── Characters/        # По фичам, не по типам файлов!
│   │   │   ├── MyCharacter.h
│   │   │   └── MyCharacter.cpp
│   │   ├── UI/
│   │   │   ├── HUD/
│   │   │   └── Widgets/
│   │   ├── Abilities/         # GAS Abilities
│   │   ├── Items/
│   │   └── Core/              # GameMode, GameState, PlayerController
│   │
│   ├── ProjectNameEditor/     # Editor-only модуль (инструменты TA)
│   │   └── ProjectNameEditor.Build.cs
│   │
│   └── ProjectNameTests/      # Unit тесты
│
├── Plugins/
│   └── MyPlugin/
│       └── Source/            # Плагин имеет свою Source структуру
│
├── Content/                   # Ассеты (не редактируй вручную!)
├── Config/                    # .ini конфиги
│   ├── DefaultEngine.ini
│   ├── DefaultGame.ini
│   └── DefaultInput.ini
├── Saved/                     # Логи, скриншоты, автосохранения (gitignore!)
├── Intermediate/              # Генерируемые файлы (gitignore!)
├── Binaries/                  # Скомпилированные .dll (gitignore!)
└── ProjectName.uproject       # Дескриптор проекта`}</Code>
          <div style={{background:C.yellow+"12",border:`1px solid ${C.yellow}33`,borderRadius:8,padding:"12px 14px",fontSize:12,color:C.muted}}>
            <span style={{color:C.yellow,fontFamily:"monospace",fontSize:10}}>{lang==='ru'?"ПРИНЦИП ОРГАНИЗАЦИИ":"ORGANIZATION PRINCIPLE"} › </span>
            {lang==='ru'?"Организуй по функциональности (Characters, Weapons, UI), не по типу файлов (Headers, Sources). Так проще находить всё связанное с одной фичей.":"Organize by feature (Characters, Weapons, UI), not file type (Headers, Sources). Makes it easier to find everything related to one feature."}
          </div>
        </div>
      )}
      {view==="modules"&&(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{display:"grid",gap:8}}>
            {[{title:lang==='ru'?"Что такое Модуль":"What is a Module",col:C.accent,items:lang==='ru'?["Единица компиляции в UE5 — отдельная .dll или статическая библиотека","Каждый плагин = минимум 1 модуль. Проект = минимум 1 модуль (Primary)","Модуль объявляется в .Build.cs — зависимости, include paths, defines","IMPLEMENT_MODULE(FMyModule, MyModule) в .cpp — точка входа","PublicDependencyModules: видны включающим модулям. PrivateDependency: только внутри."]:["Compilation unit in UE5 — separate .dll or static library","Each plugin = at least 1 module. Project = at least 1 module (Primary)","Module declared in .Build.cs — dependencies, include paths, defines","IMPLEMENT_MODULE(FMyModule, MyModule) in .cpp — entry point","PublicDependencyModules: visible to dependent modules. PrivateDependency: internal only."]},
              {title:lang==='ru'?"Типы Модулей":"Module Types",col:C.orange,items:lang==='ru'?["Runtime: работает в игре и редакторе (основной игровой код)","Editor: только в редакторе, не шиппится с игрой (инструменты TA)","Developer: утилиты для dev билдов","UncookedOnly: только для некукнутых билдов","ThirdParty: внешние библиотеки (.lib, .dll обёртки)"]:["Runtime: runs in game and editor (main game code)","Editor: editor-only, not shipped with game (TA tools)","Developer: utilities for dev builds","UncookedOnly: uncooked builds only","ThirdParty: external libraries (.lib, .dll wrappers)"]},
            ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:8}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
          </div>
        </div>
      )}
      {view==="buildcs"&&(
        <Code lang="cpp">{`// ProjectName.Build.cs — зависимости модуля
using UnrealBuildTool;

public class ProjectName : ModuleRules {
  public ProjectName(ReadOnlyTargetRules Target) : base(Target) {

    // Нужно для IWYU (Include What You Use) — быстрая компиляция
    PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

    // Всегда нужны для игрового кода
    PublicDependencyModuleNames.AddRange(new string[] {
      "Core",           // Базовые типы UE: TArray, FString, etc.
      "CoreUObject",    // UObject система
      "Engine",         // AActor, UActorComponent, etc.
      "InputCore",      // FKey, EKeys
    });

    // Нужны нам, но не нашим зависимым модулям
    PrivateDependencyModuleNames.AddRange(new string[] {
      "Slate",          // Slate UI фреймворк
      "SlateCore",
      "UMG",            // UMG виджеты
      "GameplayAbilities", // GAS
      "EnhancedInput",  // Enhanced Input System
      "AIModule",       // AI
      "NavigationSystem",
    });

    // Только в редакторе (инструменты, дебаг)
    if (Target.bBuildEditor) {
      PrivateDependencyModuleNames.Add("UnrealEd");
    }
  }
}`}</Code>
      )}
      {view==="naming"&&(
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"separate",borderSpacing:2,minWidth:340}}>
            <thead><tr>
              <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>{lang==='ru'?"Префикс":"Prefix"}</th>
              <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>{lang==='ru'?"Что означает":"What it means"}</th>
              <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>{lang==='ru'?"Пример":"Example"}</th>
            </tr></thead>
            <tbody>{[
              {p:"U",t:lang==='ru'?"UObject-наследник":"UObject descendant",e:"UStaticMesh, UMaterial"},
              {p:"A",t:lang==='ru'?"Actor-наследник":"Actor descendant",e:"ACharacter, AGameMode"},
              {p:"F",t:lang==='ru'?"Struct / обычный класс":"Struct / plain class",e:"FVector, FHitResult"},
              {p:"E",t:"Enum",e:"EMovementMode, EBlendMode"},
              {p:"I",t:"Interface",e:"IInteractable, IDamageable"},
              {p:"T",t:lang==='ru'?"Template":"Template",e:"TArray, TMap, TSharedPtr"},
              {p:"G",t:lang==='ru'?"Глобальная переменная":"Global variable",e:"GEngine, GWorld"},
              {p:"b",t:"bool",e:"bIsAlive, bCanJump"},
            ].map(({p,t,e})=>(<tr key={p}>
              <td style={{background:"#111827",border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:13,color:C.orange,fontWeight:700}}>{p}*</td>
              <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:12,color:C.text}}>{t}</td>
              <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:11,color:C.muted}}>{e}</td>
            </tr>))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function UObjectHierarchySection(){
  const lang=useLang();
  const [active,setActive]=useState("actor");
  const classes={
    uobject:{col:C.muted,label:"UObject",items:[
      {name:"UObject",desc:lang==='ru'?"Базовый класс всего в UE5. GC, рефлексия, сериализация. Нет Transform.":"Base class of everything in UE5. GC, reflection, serialization. No Transform."},
      {name:"UActorComponent",desc:lang==='ru'?"Компонент без Transform. Логика без позиции: HealthComponent, InventoryComponent.":"Component without Transform. Logic without position: HealthComponent, InventoryComponent."},
      {name:"USceneComponent",desc:lang==='ru'?"Компонент с Transform. Root любого Actor. Можно прикреплять.":"Component with Transform. Root of any Actor. Can be attached."},
      {name:"USubsystem",desc:lang==='ru'?"Менеджер-синглтон без Singleton паттерна. GetSubsystem<T>(). Типы: GameInstance, World, LocalPlayer.":"Manager-singleton without Singleton pattern. GetSubsystem<T>(). Types: GameInstance, World, LocalPlayer."},
    ]},
    actor:{col:C.orange,label:"AActor",items:[
      {name:"AActor",desc:lang==='ru'?"Объект в мире с Transform. Содержит компоненты. BeginPlay, Tick, EndPlay.":"World object with Transform. Contains components. BeginPlay, Tick, EndPlay."},
      {name:"APawn",desc:lang==='ru'?"Actor которым управляет Player или AI Controller. Имеет Controller.":"Actor controlled by Player or AI Controller. Has a Controller."},
      {name:"ACharacter",desc:lang==='ru'?"Pawn с CharacterMovementComponent. Ходьба, прыжок, плавание. Основа для персонажей.":"Pawn with CharacterMovementComponent. Walk, jump, swim. Basis for characters."},
      {name:"AController",desc:lang==='ru'?"Управляет Pawn. Владеет PlayerState. APlayerController: игрок. AAIController: AI.":"Controls Pawn. Owns PlayerState. APlayerController: player. AAIController: AI."},
    ]},
    framework:{col:C.accent,label:lang==='ru'?"Фреймворк":"Framework",items:[
      {name:"AGameModeBase",desc:lang==='ru'?"Правила игры. Существует только на сервере. SpawnDefaultPawnFor, RestartPlayer. Определяет класс Pawn, PlayerController, HUD.":"Game rules. Exists on server only. SpawnDefaultPawnFor, RestartPlayer. Defines Pawn, PlayerController, HUD classes."},
      {name:"AGameStateBase",desc:lang==='ru'?"Состояние игры для всех игроков. Реплицируется. TimerRemaining, TeamScores. Читается клиентами.":"Game state for all players. Replicated. TimerRemaining, TeamScores. Read by clients."},
      {name:"APlayerState",desc:lang==='ru'?"Состояние конкретного игрока. Реплицируется. PlayerName, Score, Ping. Сохраняется при смерти (respawn).":"Specific player state. Replicated. PlayerName, Score, Ping. Persists on respawn."},
      {name:"UGameInstance",desc:lang==='ru'?"Живёт всю сессию, не сбрасывается при LoadLevel. Настройки, сохранения, сетевое соединение.":"Lives the whole session, not reset on LoadLevel. Settings, saves, network connection."},
    ]},
  };
  const cur=classes[active];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
        {Object.entries(classes).map(([k,v])=>(<button key={k} onClick={()=>setActive(k)} style={{background:active===k?v.col+"22":"transparent",border:`1px solid ${active===k?v.col:C.border}`,borderRadius:6,padding:"5px 12px",color:active===k?v.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{v.label}</button>))}
      </div>
      <div style={{display:"grid",gap:6,marginBottom:12}}>
        {cur.items.map(({name,desc})=>(<div key={name} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px"}}><div style={{fontFamily:"monospace",fontSize:12,color:cur.col,fontWeight:700,marginBottom:4}}>{name}</div><div style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word"}}>{desc}</div></div>))}
      </div>
      <Code lang="cpp">{`// Быстрая шпаргалка: кто за что отвечает
// GameMode:      Правила. КАК играть. Только сервер.
// GameState:     Состояние ВСЕЙ игры. Все клиенты видят.
// PlayerState:   Состояние ОДНОГО игрока. Реплицируется.
// PlayerController: Ввод игрока → команды Pawn.
// Pawn/Character: Физическое тело в мире.
// GameInstance:  Данные между уровнями. Настройки, lobby.

// Доступ к фреймворку из любого Actor:
AGameModeBase* GM = GetWorld()->GetAuthGameMode();
AMyGameState* GS = GetWorld()->GetGameState<AMyGameState>();
APlayerController* PC = GetWorld()->GetFirstPlayerController();
UGameInstance* GI = GetGameInstance();
AMyPlayerState* PS = GetPlayerState<AMyPlayerState>(); // из Pawn`}</Code>
    </div>
  );
}

function GarbageCollectionSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"grid",gap:8}}>
        {[{title:lang==='ru'?"Как работает GC в UE5":"How GC Works in UE5",col:C.accent,items:lang==='ru'?["GC отслеживает UObject графы через UPROPERTY указатели","Если на UObject нет ни одного UPROPERTY ссылающегося — он собирается","GC запускается периодически (настраиваемо в ini)","Не используй raw UObject указатели без UPROPERTY — краш или zombie object","AddToRoot() — защитить от GC. RemoveFromRoot() — снять защиту."]:["GC tracks UObject graphs via UPROPERTY pointers","If no UPROPERTY references a UObject — it gets collected","GC runs periodically (configurable in ini)","Don't use raw UObject pointers without UPROPERTY — crash or zombie object","AddToRoot() — protect from GC. RemoveFromRoot() — remove protection."]},
          {title:lang==='ru'?"Типы указателей":"Pointer Types",col:C.orange,items:lang==='ru'?["TObjectPtr<T>: UPROPERTY-aware умный указатель (UE5). Основная замена сырых указателей в UPROPERTY.","TWeakObjectPtr<T>: слабый указатель, не держит объект. IsValid() перед use. Для опциональных ссылок.","TSharedPtr<T>: shared_ptr для НЕ-UObject (чистые C++ классы). Ref counting.","TUniquePtr<T>: unique_ptr для non-UObject. RAII.","Raw T*: только для UObject в UPROPERTY или временных локальных переменных."]:["TObjectPtr<T>: UPROPERTY-aware smart pointer (UE5). Main replacement for raw pointers in UPROPERTY.","TWeakObjectPtr<T>: weak pointer, doesn't hold object. IsValid() before use. For optional references.","TSharedPtr<T>: shared_ptr for NON-UObject (pure C++ classes). Ref counting.","TUniquePtr<T>: unique_ptr for non-UObject. RAII.","Raw T*: only for UObject in UPROPERTY or temporary local variables."]},
        ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:8}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
      </div>
      <Code lang="cpp">{`// Правильное использование указателей UE5
class AMyActor : public AActor {
  // ✓ TObjectPtr в UPROPERTY — GC отслеживает
  UPROPERTY()
  TObjectPtr<UStaticMeshComponent> MeshComp;

  // ✓ Слабый указатель — не держит, проверяй IsValid()
  UPROPERTY()
  TWeakObjectPtr<APlayerController> OwningPC;

  // ✓ SharedPtr для чистого C++ класса (не UObject)
  TSharedPtr<FMyData> SharedData;

  // ✗ ОПАСНО: GC не видит, может собрать!
  UStaticMeshComponent* UnsafeRawPtr;

  void SafeUse() {
    // Всегда проверяй слабый указатель
    if (OwningPC.IsValid()) {
      OwningPC->ClientTravel("NewMap", ETravelType::TRAVEL_Absolute);
    }
    // TObjectPtr разыменовывается как обычный указатель
    if (MeshComp) {
      MeshComp->SetVisibility(true);
    }
  }
};`}</Code>
    </div>
  );
}

function DelegatesSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"separate",borderSpacing:2,minWidth:380}}>
          <thead><tr>
            <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>{lang==='ru'?"Тип":"Type"}</th>
            <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>{lang==='ru'?"Подписчиков":"Subscribers"}</th>
            <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>{lang==='ru'?"Return value":"Return value"}</th>
            <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>{lang==='ru'?"Когда":"When"}</th>
          </tr></thead>
          <tbody>{[
            {t:"DECLARE_DELEGATE",subs:"1",ret:"✓",when:lang==='ru'?"Callback одному":"One-to-one callback"},
            {t:"DECLARE_MULTICAST_DELEGATE",subs:"N",ret:"✗",when:lang==='ru'?"Notify многим":"Notify many"},
            {t:"DECLARE_DYNAMIC_DELEGATE",subs:"1",ret:"✓",when:lang==='ru'?"UPROPERTY (BP видит)":"UPROPERTY (BP visible)"},
            {t:"DECLARE_DYNAMIC_MULTICAST_DELEGATE",subs:"N",ret:"✗",when:lang==='ru'?"BlueprintAssignable":"BlueprintAssignable"},
          ].map(({t,subs,ret,when})=>(<tr key={t}>
            <td style={{background:"#111827",border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.orange}}>{t}</td>
            <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.text,textAlign:"center"}}>{subs}</td>
            <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:ret==="✓"?C.green:C.muted,textAlign:"center"}}>{ret}</td>
            <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.muted,wordBreak:"break-word"}}>{when}</td>
          </tr>))}</tbody>
        </table>
      </div>
      <Code lang="cpp">{`// Объявление делегатов
DECLARE_DELEGATE_OneParam(FOnDamaged, float);           // 1 подписчик, return void
DECLARE_MULTICAST_DELEGATE_TwoParams(FOnKilled, AActor*, AActor*); // N подписчиков
// Для Blueprint (BlueprintAssignable):
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnHealthChanged, float, NewHealth);

class AMyCharacter : public ACharacter {
public:
  // Dynamic Multicast — виден в Blueprint как событие
  UPROPERTY(BlueprintAssignable)
  FOnHealthChanged OnHealthChanged;

  FOnKilled OnKilled; // Multicast — только C++

  void TakeDamage(float Amount) {
    Health -= Amount;
    OnHealthChanged.Broadcast(Health); // Уведомить всех подписчиков
    if (Health <= 0) OnKilled.Broadcast(this, nullptr);
  }
};

// Подписка в другом классе:
void UHealthWidget::NativeConstruct() {
  if (AMyCharacter* Char = Cast<AMyCharacter>(GetOwningPawn())) {
    // AddDynamic для Dynamic делегатов (UFUNCTION требуется!)
    Char->OnHealthChanged.AddDynamic(this, &UHealthWidget::UpdateHealth);
  }
}
// UFUNCTION обязателен для AddDynamic!
UFUNCTION()
void UHealthWidget::UpdateHealth(float NewHealth) { /* ... */ }`}</Code>
    </div>
  );
}

function CodeNavigationSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"grid",gap:8}}>
        {[{title:lang==='ru'?"Как читать незнакомый UE5 класс":"How to Read Unknown UE5 Class",col:C.accent,items:lang==='ru'?["Начни с .h файла — там весь публичный интерфейс","Ищи UPROPERTY с EditAnywhere/BlueprintReadWrite — это настраиваемые данные","Ищи UFUNCTION с BlueprintCallable — это API для использования","virtual функции — точки расширения (override в дочернем классе)","Ищи комментарии // TODO, // HACK, // NOTE — подсказки оригинального кода"]:["Start with .h file — all public interface is there","Find UPROPERTY with EditAnywhere/BlueprintReadWrite — configurable data","Find UFUNCTION with BlueprintCallable — usable API","virtual functions — extension points (override in child class)","Look for // TODO, // HACK, // NOTE comments — hints from original code"]},
          {title:lang==='ru'?"Поиск в исходниках UE5":"Searching in UE5 Sources",col:C.orange,items:lang==='ru'?["Engine/Source/ — исходники движка. Установить через Epic Launcher → Engine → Options","Ctrl+T (Rider) / Ctrl+, (VS) — Go to File. Быстрый переход к классу","F12 / Ctrl+Click — Go to Definition. Переход к объявлению","Shift+F12 — Find All References. Где используется символ","Grep по Engine/Source/: grep -r 'UFUNCTION' --include='*.h' | grep 'BlueprintCallable'"]:["Engine/Source/ — engine sources. Install via Epic Launcher → Engine → Options","Ctrl+T (Rider) / Ctrl+, (VS) — Go to File. Quick class navigation","F12 / Ctrl+Click — Go to Definition. Jump to declaration","Shift+F12 — Find All References. Where symbol is used","Grep through Engine/Source/: grep -r 'UFUNCTION' --include='*.h' | grep 'BlueprintCallable'"]},
          {title:lang==='ru'?"Рекомендуемая IDE: JetBrains Rider":"Recommended IDE: JetBrains Rider",col:C.green,items:lang==='ru'?["Лучшая поддержка UE5 специфики (понимает UCLASS, UPROPERTY)","Live Coding: компиляция без перезапуска редактора (Ctrl+Alt+F11)","UE Insights интеграция, отладчик лучше чем в VS","Индексирует весь Engine/Source — переходы работают везде","ReSharper UE: анализ кода специфичный для UE паттернов"]:["Best UE5-specific support (understands UCLASS, UPROPERTY)","Live Coding: compile without editor restart (Ctrl+Alt+F11)","UE Insights integration, better debugger than VS","Indexes all Engine/Source — navigation works everywhere","ReSharper UE: code analysis specific to UE patterns"]},
          {title:lang==='ru'?"Практические советы":"Practical Tips",col:C.purple,items:lang==='ru'?["Читай Lyra Starter Game — официальный пример архитектуры","Engine/Source/Runtime/GameFramework/ — исходники базовых классов","Ctrl+P в Rider — поиск по символу в проекте и Engine","UE_LOG(LogTemp, Warning, TEXT(\"%s\"), *VarName) — быстрый debug print","Print Screen в runtime: GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Green, TEXT(\"msg\"))"]:["Read Lyra Starter Game — official architecture example","Engine/Source/Runtime/GameFramework/ — base class sources","Ctrl+P in Rider — symbol search in project and Engine","UE_LOG(LogTemp, Warning, TEXT(\"%s\"), *VarName) — quick debug print","Runtime print: GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Green, TEXT(\"msg\"))"]},
        ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:8}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
      </div>
    </div>
  );
}

function CommonCppPatterns(){
  const lang=useLang();
  const [ex,setEx]=useState(0);
  const examples=[
    {title:lang==='ru'?"Actor + Component паттерн":"Actor + Component Pattern",col:C.orange,code:`// Правильная декомпозиция: Actor как контейнер компонентов
// НЕ пихай всё в один огромный ACharacter!

// HealthComponent.h — отдельная отвечаемость
UCLASS(ClassGroup=(Custom), meta=(BlueprintSpawnableComponent))
class UHealthComponent : public UActorComponent {
  GENERATED_BODY()
public:
  UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category="Health")
  float MaxHealth = 100.f;

  UPROPERTY(BlueprintAssignable)
  FOnHealthChanged OnHealthChanged;

  UFUNCTION(BlueprintCallable)
  void ApplyDamage(float Amount, AActor* Instigator);

  UFUNCTION(BlueprintPure)
  float GetHealthPercent() const { return CurrentHealth / MaxHealth; }
private:
  float CurrentHealth;
};

// В Character: просто ссылается на компонент
UPROPERTY(VisibleAnywhere)
TObjectPtr<UHealthComponent> HealthComp;`},
    {title:lang==='ru'?"Interface паттерн":"Interface Pattern",col:C.accent,code:`// IDamageable.h — контракт без жёсткой зависимости
UINTERFACE(MinimalAPI, BlueprintType)
class UDamageable : public UInterface { GENERATED_BODY() };

class IDamageable {
  GENERATED_BODY()
public:
  // Функция для реализации в C++
  virtual void TakeDamage_Interface(float Amount) = 0;
  // Функция для реализации в Blueprint
  UFUNCTION(BlueprintImplementableEvent)
  void OnDamaged(float Amount);
};

// Использование — без Cast, без жёсткой зависимости:
void AProjectile::OnHit(AActor* HitActor) {
  if (HitActor->Implements<UDamageable>()) {
    IDamageable::Execute_OnDamaged(HitActor, DamageAmount);
    // или для C++ pure virtual:
    // Cast<IDamageable>(HitActor)->TakeDamage_Interface(DamageAmount);
  }
}`},
    {title:"GameSubsystem",col:C.green,code:`// Глобальный менеджер без Singleton антипаттерна
UCLASS()
class UInventorySubsystem : public UGameInstanceSubsystem {
  GENERATED_BODY()
public:
  // Инициализация при старте GameInstance
  virtual void Initialize(FSubsystemCollectionBase& Collection) override;
  virtual void Deinitialize() override;

  UFUNCTION(BlueprintCallable)
  bool AddItem(FName ItemID, int32 Count = 1);

  UFUNCTION(BlueprintPure)
  int32 GetItemCount(FName ItemID) const;

private:
  TMap<FName, int32> Inventory;
};

// Доступ из любого места (нет FindObject, нет Singleton):
UInventorySubsystem* Inv = GetGameInstance()
    ->GetSubsystem<UInventorySubsystem>();
Inv->AddItem("Sword", 1);`},
    {title:lang==='ru'?"DataAsset для конфигурации":"DataAsset for Configuration",col:C.purple,code:`// Данные без логики в DataAsset
// Не хардкоди цифры в C++!
UCLASS(BlueprintType)
class UWeaponData : public UPrimaryDataAsset {
  GENERATED_BODY()
public:
  UPROPERTY(EditDefaultsOnly, BlueprintReadOnly)
  float Damage = 25.f;

  UPROPERTY(EditDefaultsOnly, BlueprintReadOnly)
  float FireRate = 0.5f;

  UPROPERTY(EditDefaultsOnly, BlueprintReadOnly)
  int32 MaxAmmo = 30;

  UPROPERTY(EditDefaultsOnly, BlueprintReadOnly)
  TObjectPtr<UStaticMesh> WeaponMesh;

  UPROPERTY(EditDefaultsOnly, BlueprintReadOnly)
  TObjectPtr<USoundBase> FireSound;
};

// В Weapon Actor: ссылка на DataAsset
UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category="Config")
TObjectPtr<UWeaponData> WeaponConfig;

// Использование:
float dmg = WeaponConfig->Damage;`},
  ];
  const cur=examples[ex];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
        {examples.map((e,i)=>(<button key={i} onClick={()=>setEx(i)} style={{background:ex===i?e.col+"22":"transparent",border:`1px solid ${ex===i?e.col:C.border}`,borderRadius:6,padding:"5px 10px",color:ex===i?e.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{e.title}</button>))}
      </div>
      <Code lang="cpp">{cur.code}</Code>
    </div>
  );
}

// ══ MODULE: UMG / UI TECH ════════════════════════════════════════════════════
function UMGvsSlate(){
  const lang=useLang();
  const rows=[
    {prop:lang==='ru'?"Язык":"Language",umg:"Blueprint + C++",slate:"C++ only"},
    {prop:lang==='ru'?"Где используется":"Where used",umg:lang==='ru'?"Игровой UI":"Game UI",slate:lang==='ru'?"Editor, плагины":"Editor, plugins"},
    {prop:lang==='ru'?"Дизайн":"Design",umg:lang==='ru'?"Visual designer":"Visual designer",slate:lang==='ru'?"Только код":"Code only"},
    {prop:lang==='ru'?"Производительность":"Performance",umg:lang==='ru'?"Чуть медленнее":"Slightly slower",slate:lang==='ru'?"Нативная":"Native"},
    {prop:lang==='ru'?"Hot Reload":"Hot Reload",umg:"✓",slate:"✗"},
    {prop:lang==='ru'?"Binding":"Binding",umg:lang==='ru'?"Blueprint/MVVM":"Blueprint/MVVM",slate:lang==='ru'?"Delegates, Attributes":"Delegates, Attributes"},
    {prop:lang==='ru'?"UE5 MVVM":"UE5 MVVM",umg:"✓",slate:"✗ (ручная реализация)"},
  ];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"separate",borderSpacing:2,minWidth:340}}>
          <thead><tr>
            <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>{lang==='ru'?"Параметр":"Parameter"}</th>
            <th style={{background:C.orange+"18",border:`1px solid ${C.orange}44`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.orange,textAlign:"left"}}>UMG</th>
            <th style={{background:C.accent+"18",border:`1px solid ${C.accent}44`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.accent,textAlign:"left"}}>Slate</th>
          </tr></thead>
          <tbody>{rows.map(({prop,umg,slate})=>(<tr key={prop}>
            <td style={{background:"#111827",border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.muted}}>{prop}</td>
            <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.orange,wordBreak:"break-word"}}>{umg}</td>
            <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.accent,wordBreak:"break-word"}}>{slate}</td>
          </tr>))}</tbody>
        </table>
      </div>
      <div style={{display:"grid",gap:8}}>
        {[{title:lang==='ru'?"Когда использовать Slate":"When to Use Slate",col:C.accent,items:lang==='ru'?["Custom Editor Window — инструменты TA, панели редактора","Производительно-критичные компоненты (ScrollBox с тысячами строк)","Компоненты которых нет в UMG (SPropertyEditor, SDetailsView)","Плагины которые должны работать без UMG модуля"]:["Custom Editor Window — TA tools, editor panels","Performance-critical components (ScrollBox with thousands of rows)","Components not available in UMG (SPropertyEditor, SDetailsView)","Plugins that must work without the UMG module"]},
          {title:lang==='ru'?"UMG под капотом":"UMG Under the Hood",col:C.orange,items:lang==='ru'?["UMG Widget компилируется в Slate SWidget","UUserWidget::TakeWidget() возвращает TSharedRef<SWidget>","Каждый UMG виджет имеет Native Slate аналог (UButton → SButton)","Можно получить Slate виджет: MyButton->GetCachedWidget()","Blueprint bindings = Slate Attributes с делегатами"]:["UMG Widget compiles to Slate SWidget","UUserWidget::TakeWidget() returns TSharedRef<SWidget>","Each UMG widget has a native Slate equivalent (UButton → SButton)","Get Slate widget: MyButton->GetCachedWidget()","Blueprint bindings = Slate Attributes with delegates"]},
        ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:8}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
      </div>
    </div>
  );
}

function WidgetLifecycle(){
  const lang=useLang();
  const stages=[
    {name:"PreConstruct",col:C.muted,ru:"Вызывается в Design Time (редакторе). Настройка preview данных. NativePreConstruct() в C++.",en:"Called in Design Time (editor). Set up preview data. NativePreConstruct() in C++."},
    {name:"Construct",col:C.green,ru:"Первый вызов при создании виджета. Инициализация: bind events, setup data. Аналог BeginPlay. NativeConstruct() в C++.",en:"First call when widget is created. Initialization: bind events, setup data. Like BeginPlay. NativeConstruct() in C++."},
    {name:"NativeTick",col:C.yellow,ru:"Каждый кадр. ДОРОГО если много виджетов. Избегай — используй события и делегаты. Включается через bCanEverTick=true.",en:"Every frame. EXPENSIVE with many widgets. Avoid — use events and delegates instead. Enable via bCanEverTick=true."},
    {name:"OnPaint",col:C.accent,ru:"Низкоуровневый рендеринг. Override для кастомной отрисовки (линии, дуги). FPaintContext: DrawLine, DrawBox, DrawText.",en:"Low-level rendering. Override for custom drawing (lines, arcs). FPaintContext: DrawLine, DrawBox, DrawText."},
    {name:"NativeTick (Anim)",col:C.orange,ru:"UWidgetAnimation::Tick — анимации виджетов. Отдельно от NativeTick компонента.",en:"UWidgetAnimation::Tick — widget animations. Separate from component NativeTick."},
    {name:"Destruct",col:C.red,ru:"При удалении виджета. Отписаться от делегатов, очистить таймеры. Утечки памяти — частая ошибка здесь. NativeDestruct() в C++.",en:"When widget is removed. Unsubscribe from delegates, clear timers. Memory leaks — common mistake here. NativeDestruct() in C++."},
  ];
  const [active,setActive]=useState(1);
  return(
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:16}}>
        {stages.map((s,i)=>(<button key={i} onClick={()=>setActive(i)} style={{background:active===i?s.col+"22":"transparent",border:`1px solid ${active===i?s.col:C.border}`,borderRadius:6,padding:"8px 14px",color:active===i?s.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:10}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:active===i?s.col:C.dim,flexShrink:0,display:"inline-block"}}/>
          {s.name}
          {i===2&&<span style={{fontSize:9,color:C.red,background:C.red+"20",padding:"1px 5px",borderRadius:3}}>EXPENSIVE</span>}
        </button>))}
      </div>
      <div style={{background:C.card,border:`1px solid ${stages[active].col}44`,borderRadius:10,padding:16,fontSize:12,color:C.text,lineHeight:1.8}}>
        {lang==='ru'?stages[active].ru:stages[active].en}
      </div>
      <Code lang="cpp">{`// C++ Widget lifecycle
UCLASS()
class UMyWidget : public UUserWidget {
  GENERATED_BODY()
protected:
  // Equivalent of BeginPlay
  virtual void NativeConstruct() override;
  // Called every frame (enable in constructor: bCanEverTick = true)
  virtual void NativeTick(const FGeometry& Geometry, float DeltaTime) override;
  // Custom drawing
  virtual int32 NativePaint(const FPaintArgs& Args, const FGeometry& Geo,
      const FSlateRect& Rect, FSlateWindowElementList& List,
      int32 Layer, const FWidgetStyle& Style, bool ParentEnabled) const override;
  // Cleanup — ALWAYS unsubscribe delegates here!
  virtual void NativeDestruct() override;
};`}</Code>
    </div>
  );
}

function MVVMSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"grid",gap:8}}>
        {[{title:lang==='ru'?"Model — данные":"Model — Data",col:C.orange,items:lang==='ru'?["Источник данных: GameState, PlayerState, DataAsset","Не знает о View — чистые данные","Примеры: int32 Health, float Ammo, TArray<FItem> Inventory","Обновляется игровой логикой, не UI"]:["Data source: GameState, PlayerState, DataAsset","Doesn't know about View — pure data","Examples: int32 Health, float Ammo, TArray<FItem> Inventory","Updated by game logic, not UI"]},
          {title:lang==='ru'?"ViewModel — адаптер":"ViewModel — Adapter",col:C.accent,items:lang==='ru'?["Трансформирует данные для отображения","FieldNotify: уведомляет View об изменениях","Пример: Health% → ProgressBar 0..1, Color (низкий=красный)","UMVVMViewModelBase базовый класс в UE5","Не зависит от виджетов — можно тестировать отдельно"]:["Transforms data for display","FieldNotify: notifies View of changes","Example: Health% → ProgressBar 0..1, Color (low=red)","UMVVMViewModelBase base class in UE5","Independent of widgets — can test separately"]},
          {title:lang==='ru'?"View — виджет":"View — Widget",col:C.green,items:lang==='ru'?["Подписывается на ViewModel изменения","Только отображение — никакой логики","UMG Binding: Bind → ViewModel → PropertyName","One-Way: VM → View (только чтение)","Two-Way: VM ↔ View (InputField например)"]:["Subscribes to ViewModel changes","Display only — no business logic","UMG Binding: Bind → ViewModel → PropertyName","One-Way: VM → View (read only)","Two-Way: VM ↔ View (InputField for example)"]},
        ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:8}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
      </div>
      <Code lang="cpp">{`// UE5 MVVM ViewModel пример
UCLASS(BlueprintType)
class UHealthViewModel : public UMVVMViewModelBase {
  GENERATED_BODY()
public:
  // FieldNotify автоматически уведомляет View при изменении
  UPROPERTY(FieldNotify, BlueprintReadWrite)
  float HealthPercent = 1.0f;

  UPROPERTY(FieldNotify, BlueprintReadWrite)
  FLinearColor HealthColor = FLinearColor::Green;

  // Вызывается из игровой логики
  void UpdateHealth(float Current, float Max) {
    HealthPercent = Current / Max;
    HealthColor = HealthPercent < 0.3f
      ? FLinearColor::Red : FLinearColor::Green;
    // FieldNotify автоматически триггерит обновление всех привязанных View
    UE_MVVM_BROADCAST_FIELD_VALUE_CHANGED(HealthPercent);
    UE_MVVM_BROADCAST_FIELD_VALUE_CHANGED(HealthColor);
  }
};`}</Code>
    </div>
  );
}

function InvalidationSection(){
  const lang=useLang();
  const types=[
    {name:"Layout",col:C.orange,ru:"Размер или позиция виджета изменились. Пересчёт всего дерева layout. Самый дорогой тип.",en:"Widget size or position changed. Recalculate entire layout tree. Most expensive type."},
    {name:"Paint",col:C.yellow,ru:"Только визуальное изменение (цвет, текстура). Layout не пересчитывается. Дешевле Layout.",en:"Visual change only (color, texture). Layout not recalculated. Cheaper than Layout."},
    {name:"Volatility",col:C.accent,ru:"Виджет volatile — перерисовывается каждый кадр. Используй только если данные меняются каждый тик.",en:"Widget is volatile — redraws every frame. Use only if data changes every tick."},
    {name:"ChildOrder",col:C.purple,ru:"Изменился порядок дочерних виджетов. Требует полного rebuild поддерева.",en:"Child widget order changed. Requires full subtree rebuild."},
  ];
  const [active,setActive]=useState(0);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>
        {types.map((t,i)=>(<button key={i} onClick={()=>setActive(i)} style={{background:active===i?t.col+"22":"transparent",border:`1px solid ${active===i?t.col:C.border}`,borderRadius:6,padding:"5px 12px",color:active===i?t.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{t.name}</button>))}
      </div>
      <div style={{background:C.card,border:`1px solid ${types[active].col}44`,borderRadius:8,padding:"12px 14px",fontSize:12,color:C.text,lineHeight:1.7}}>{lang==='ru'?types[active].ru:types[active].en}</div>
      <div style={{display:"grid",gap:8}}>
        {[{title:"Invalidation Box",col:C.green,items:lang==='ru'?["Кэширует поддерево виджетов до явной инвалидации","Содержимое рендерится в Render Target, переиспользуется","Эффективно для: статичные панели, инвентарь который редко меняется","Использование: обернуть дорогие виджеты в Invalidation Panel","В C++: SInvalidationPanel, IsEnabled = true в Project Settings → Widget"]:["Caches widget subtree until explicitly invalidated","Content rendered to Render Target, reused","Effective for: static panels, inventory that rarely changes","Usage: wrap expensive widgets in Invalidation Panel","In C++: SInvalidationPanel, enable in Project Settings → Widget"]},
          {title:lang==='ru'?"Что вызывает ненужную инвалидацию":"What Causes Unnecessary Invalidation",col:C.red,items:lang==='ru'?["SetText каждый кадр даже если текст не изменился","Binding к функции которая возвращает новый объект каждый кадр","Изменение Visibility виджета внутри Invalidation Box","SetColorAndOpacity на каждый Tick (используй Volatility вместо)","Добавление/удаление детей в Tick"]:["SetText every frame even if text hasn't changed","Binding to a function that returns a new object every frame","Changing Visibility of widget inside Invalidation Box","SetColorAndOpacity every Tick (use Volatility instead)","Adding/removing children in Tick"]},
        ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:8}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
      </div>
    </div>
  );
}

function RetainerSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"grid",gap:10}}>
        {[{title:lang==='ru'?"Что такое Retainer Box":"What is a Retainer Box",col:C.accent,items:lang==='ru'?["UMG виджет-контейнер который рендерит детей в Render Target","RT переиспользуется каждый кадр если содержимое не изменилось","Можно применить Material к захваченному изображению (blur, color grading)","RenderOnPhase: рендер раз в N кадров (например каждые 3 кадра)","RenderOnInvalidation: рендер только когда что-то изменилось"]:["UMG container widget that renders children to Render Target","RT reused each frame if content hasn't changed","Can apply Material to the captured image (blur, color grading)","RenderOnPhase: render every N frames (e.g., every 3 frames)","RenderOnInvalidation: render only when something changed"]},
          {title:lang==='ru'?"Когда использовать":"When to Use",col:C.green,items:lang==='ru'?["Дорогое поддерево виджетов которое редко обновляется","Применение шейдеров к части UI (blur фона, grayscale неактивного элемента)","Minimap который обновляется раз в несколько кадров","Инвентарь с многими иконками (дорогие texture samplers)","НЕЛЬЗЯ: часто обновляемый контент (HP bar каждый кадр = дороже)"]:["Expensive widget subtree that rarely updates","Applying shaders to UI parts (background blur, grayscale inactive element)","Minimap that updates every few frames","Inventory with many icons (expensive texture samplers)","DON'T: frequently updating content (HP bar every frame = more expensive)"]},
          {title:lang==='ru'?"Минусы Retainer Box":"Retainer Box Downsides",col:C.red,items:lang==='ru'?["Дополнительный Render Target = VRAM overhead","Если контент часто меняется — двойная работа (рендер RT + рендер RT на экран)","Текст внутри Retainer может быть нечётким (субпиксельный рендеринг теряется)","Depth stencil UI трюки не работают внутри Retainer","Input события работают правильно но с задержкой визуального отклика"]:["Additional Render Target = VRAM overhead","If content changes often — double work (render RT + render RT to screen)","Text inside Retainer may be blurry (sub-pixel rendering lost)","Depth stencil UI tricks don't work inside Retainer","Input events work correctly but with visual feedback delay"]},
        ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:8}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
      </div>
      <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
        <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:10,letterSpacing:1}}>{lang==='ru'?"RETAINER vs RENDER TARGET":"RETAINER vs RENDER TARGET"}</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"separate",borderSpacing:2,minWidth:300}}>
            <thead><tr>
              <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"6px 10px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>&nbsp;</th>
              <th style={{background:C.orange+"18",border:`1px solid ${C.orange}44`,padding:"6px 10px",fontFamily:"monospace",fontSize:10,color:C.orange,textAlign:"left"}}>Retainer</th>
              <th style={{background:C.accent+"18",border:`1px solid ${C.accent}44`,padding:"6px 10px",fontFamily:"monospace",fontSize:10,color:C.accent,textAlign:"left"}}>Render Target</th>
            </tr></thead>
            <tbody>{(lang==='ru'?[
              {p:"Управление",r:"Автоматическое",rt:"Ручное"},
              {p:"Обновление",r:"По инвалидации/фазе",rt:"Явный вызов"},
              {p:"Контроль",r:"Меньше",rt:"Полный"},
              {p:"Сложность",r:"Простой",rt:"Требует BP/C++"},
              {p:"Flex использование",r:"Только в UMG дереве",rt:"Везде (материалы, 3D)"},
            ]:[
              {p:"Management",r:"Automatic",rt:"Manual"},
              {p:"Update",r:"On invalidation/phase",rt:"Explicit call"},
              {p:"Control",r:"Less",rt:"Full"},
              {p:"Complexity",r:"Simple",rt:"Requires BP/C++"},
              {p:"Flexibility",r:"UMG tree only",rt:"Everywhere (materials, 3D)"},
            ]).map(({p,r,rt})=>(<tr key={p}>
              <td style={{background:"#0d1117",border:`1px solid ${C.border}`,padding:"6px 10px",fontSize:11,color:C.muted}}>{p}</td>
              <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"6px 10px",fontSize:11,color:C.orange}}>{r}</td>
              <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"6px 10px",fontSize:11,color:C.accent}}>{rt}</td>
            </tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UIOptimizationSection(){
  const lang=useLang();
  const [tab,setTab]=useState("causes");
  const tabs={
    causes:{col:C.red,label:lang==='ru'?"Причины лагов":"Lag Causes",items:lang==='ru'?[
      {t:"Tick в каждом виджете",d:"Каждый виджет с bCanEverTick=true добавляет накладные расходы. Даже пустой Tick стоит CPU времени при 100+ виджетах."},
      {t:"Избыточная инвалидация",d:"SetText/SetBrush каждый кадр даже без изменений. Blueprint binding к дорогой функции вызывается каждый Tick."},
      {t:"Draw calls UI",d:"Каждый уникальный Material, каждый разрыв батча = отдельный draw call. Text rendering дорог (font atlas). Много маленьких виджетов > один большой."},
      {t:"ScrollBox с тысячами элементов",d:"ScrollBox создаёт ВСЕ виджеты сразу. 1000 элементов = 1000 созданных виджетов. Используй ListView (виртуализация)."},
      {t:"Сложные шейдеры в UI",d:"UI рендерится поверх всего. Дорогой шейдер на полноэкранном виджете = полный экран пикселей через дорогой PS."},
    ]:[
      {t:"Tick in every widget",d:"Every widget with bCanEverTick=true adds overhead. Even empty Tick costs CPU time with 100+ widgets."},
      {t:"Excessive invalidation",d:"SetText/SetBrush every frame even without changes. Blueprint binding to expensive function called every Tick."},
      {t:"UI draw calls",d:"Each unique Material, each batch break = separate draw call. Text rendering is expensive (font atlas). Many small widgets > one large."},
      {t:"ScrollBox with thousands of items",d:"ScrollBox creates ALL widgets at once. 1000 items = 1000 created widgets. Use ListView (virtualization)."},
      {t:"Complex shaders in UI",d:"UI renders on top of everything. Expensive shader on fullscreen widget = full screen pixels through expensive PS."},
    ]},
    tools:{col:C.accent,label:lang==='ru'?"Инструменты":"Tools",items:lang==='ru'?[
      {t:"stat SlateUI",d:"Общее время Slate рендеринга. SlatePrepass (layout), SlatePaint (draw). Первый показатель для диагностики UI проблем."},
      {t:"Widget Reflector",d:"Window → Widget Reflector. Клик на любой виджет → показывает класс, размер, положение, время рисования. Найти самый дорогой виджет за секунды."},
      {t:"stat SlateVerbose",d:"Детальная статистика: отдельно каждый тип виджета. Видно какой класс занимает больше всего времени."},
      {t:"Unreal Insights → UI",d:"UI Thread в Insights. Точное время каждого виджета по кадрам. Найти spike в конкретной операции."},
      {t:"r.DumpBatches",d:"Дамп текущего батчинга UI. Видно сколько draw calls, почему батч разрывается."},
    ]:[
      {t:"stat SlateUI",d:"Overall Slate render time. SlatePrepass (layout), SlatePaint (draw). First metric for diagnosing UI issues."},
      {t:"Widget Reflector",d:"Window → Widget Reflector. Click any widget → shows class, size, position, draw time. Find most expensive widget in seconds."},
      {t:"stat SlateVerbose",d:"Detailed stats: each widget type separately. See which class takes the most time."},
      {t:"Unreal Insights → UI",d:"UI Thread in Insights. Exact time per widget per frame. Find spikes in specific operations."},
      {t:"r.DumpBatches",d:"Dump current UI batching. See how many draw calls, why batches break."},
    ]},
    fixes:{col:C.green,label:lang==='ru'?"Решения":"Fixes",items:lang==='ru'?[
      {t:"Заменить ScrollBox → ListView",d:"ListView создаёт виджеты только для видимых элементов. 10000 элементов = ~20 виджетов в памяти. Обязательно для списков 50+."},
      {t:"Убрать Tick → делегаты",d:"Вместо проверки в Tick — подписаться на изменение. OnHealthChanged.AddDynamic → обновить виджет. Ноль накладных расходов между изменениями."},
      {t:"Invalidation Panel",d:"Обернуть редко меняющееся дерево. Cache subtree. Перерисовка только при явной инвалидации."},
      {t:"Merge материалов",d:"Один Material с параметрами > несколько Materials. Атлас текстур иконок > отдельные текстуры. Batching."},
      {t:"Retainer для дорогих шейдеров",d:"Дорогой blur или эффект → Retainer Box с RenderOnPhase каждые 2-3 кадра. Качество ≈ то же, стоимость в 2-3 раза ниже."},
    ]:[
      {t:"Replace ScrollBox → ListView",d:"ListView creates widgets only for visible items. 10000 items = ~20 widgets in memory. Required for 50+ item lists."},
      {t:"Remove Tick → delegates",d:"Instead of checking in Tick — subscribe to change. OnHealthChanged.AddDynamic → update widget. Zero overhead between changes."},
      {t:"Invalidation Panel",d:"Wrap rarely-changing tree. Cache subtree. Redraws only on explicit invalidation."},
      {t:"Merge materials",d:"One Material with parameters > multiple Materials. Icon texture atlas > separate textures. Batching."},
      {t:"Retainer for expensive shaders",d:"Expensive blur or effect → Retainer Box with RenderOnPhase every 2-3 frames. Quality ≈ same, cost 2-3x lower."},
    ]},
  };
  const cur=tabs[tab];
  return(
    <div>
      <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>
        {Object.entries(tabs).map(([k,v])=>(<button key={k} onClick={()=>setTab(k)} style={{background:tab===k?v.col+"22":"transparent",border:`1px solid ${tab===k?v.col:C.border}`,borderRadius:6,padding:"6px 12px",color:tab===k?v.col:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{v.label}</button>))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {cur.items.map(({t,d})=>(<div key={t} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:12,color:cur.col,fontWeight:700,marginBottom:5}}>{t}</div><div style={{fontSize:13,color:C.muted,lineHeight:1.7,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{d}</div></div>))}
      </div>
    </div>
  );
}

function UIShaderSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"grid",gap:8}}>
        {[{title:lang==='ru'?"Material Domain: User Interface":"Material Domain: User Interface",col:C.accent,items:lang==='ru'?["Специальный domain для UI материалов (не Surface!)","Доступно: Time, SceneColor (limited), Texture Samples, Custom параметры","НЕ доступно: World Position, Scene Depth, нормали от меша","Output: Final Color (нет GBuffer, нет Lighting)","Применяется: к Brush в виджете, к Retainer Box материалу"]:["Special domain for UI materials (not Surface!)","Available: Time, SceneColor (limited), Texture Samples, Custom params","NOT available: World Position, Scene Depth, mesh normals","Output: Final Color (no GBuffer, no Lighting)","Applied to: Brush in widget, Retainer Box material"]},
          {title:lang==='ru'?"Use Cases — Шейдеры в UI":"Use Cases — Shaders in UI",col:C.orange,items:lang==='ru'?["Анимированный фон HUD: Time → sine wave → color shift","Progress bar с кастомным шейдером (glow по краю, градиент)","Blur эффект через Retainer Box + Material с Gaussian blur","Desaturation конкретного элемента через параметр материала","Outline вокруг выбранного объекта инвентаря"]:["Animated HUD background: Time → sine wave → color shift","Progress bar with custom shader (edge glow, gradient)","Blur effect via Retainer Box + Material with Gaussian blur","Desaturation of specific element via material parameter","Outline around selected inventory object"]},
          {title:lang==='ru'?"Оптимизация UI шейдеров":"UI Shader Optimization",col:C.green,items:lang==='ru'?["Texture Samples дороги — минимизируй количество сэмплов","Half precision (half4) вместо float4 на мобильных","Избегай discard/clip в UI шейдерах — overdraw в UI и так есть","Константы вместо вычислений: sin/cos = таблица заранее","Retainer с RenderOnPhase снижает частоту выполнения шейдера"]:["Texture Samples expensive — minimize sample count","Half precision (half4) instead of float4 on mobile","Avoid discard/clip in UI shaders — UI already has overdraw","Constants instead of calculations: sin/cos = precomputed table","Retainer with RenderOnPhase reduces shader execution frequency"]},
        ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:8}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
      </div>
      <Code lang="hlsl">{`// UI Material — анимированный прогресс бар
// Material Domain: User Interface

float progress = ProgressParam; // 0..1 scalar parameter
float2 uv = GetUV();           // UV виджета

// Glow по краю прогресса
float edge = abs(uv.x - progress);
float glow = exp(-edge * 20.0);  // мягкий glow
float3 barColor = lerp(BaseColor, GlowColor, glow * step(uv.x, progress));

// Pulse анимация
float pulse = sin(Time * 3.0) * 0.1 + 0.9;
barColor *= (uv.x < progress) ? pulse : 0.3;

return float4(barColor, 1.0);`}</Code>
    </div>
  );
}

function ListVirtualizationSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"separate",borderSpacing:2,minWidth:320}}>
          <thead><tr>
            <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.muted,textAlign:"left"}}>&nbsp;</th>
            <th style={{background:C.red+"18",border:`1px solid ${C.red}44`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.red,textAlign:"left"}}>ScrollBox</th>
            <th style={{background:C.green+"18",border:`1px solid ${C.green}44`,padding:"8px 10px",fontFamily:"monospace",fontSize:10,color:C.green,textAlign:"left"}}>ListView / TileView</th>
          </tr></thead>
          <tbody>{(lang==='ru'?[
            {p:"Виджетов в памяти",scroll:"ВСЕ элементы",list:"Только видимые (~20)"},
            {p:"100 элементов",scroll:"100 виджетов",list:"~15-20 виджетов"},
            {p:"10000 элементов",scroll:"10000 (лаг)",list:"~20 (нормально)"},
            {p:"Обновление",scroll:"Любой виджет",list:"Через IUserObjectListEntry"},
            {p:"Когда использовать",scroll:"< 20-30 элементов",list:"> 30 элементов"},
          ]:[
            {p:"Widgets in memory",scroll:"ALL items",list:"Visible only (~20)"},
            {p:"100 items",scroll:"100 widgets",list:"~15-20 widgets"},
            {p:"10000 items",scroll:"10000 (lag)",list:"~20 (fine)"},
            {p:"Update",scroll:"Any widget",list:"Via IUserObjectListEntry"},
            {p:"When to use",scroll:"< 20-30 items",list:"> 30 items"},
          ]).map(({p,scroll,list})=>(<tr key={p}>
            <td style={{background:"#111827",border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.muted}}>{p}</td>
            <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.red,wordBreak:"break-word"}}>{scroll}</td>
            <td style={{background:C.bg,border:`1px solid ${C.border}`,padding:"8px 10px",fontSize:11,color:C.green,wordBreak:"break-word"}}>{list}</td>
          </tr>))}</tbody>
        </table>
      </div>
      <Code lang="cpp">{`// ListView — правильная реализация
// 1. Entry Widget: реализуй интерфейс IUserObjectListEntry
UCLASS()
class UInventoryEntryWidget : public UUserWidget,
                              public IUserObjectListEntry {
  GENERATED_BODY()
  // Вызывается когда виджет переиспользуется для нового элемента
  virtual void NativeOnListItemObjectSet(UObject* ListItemObject) override {
    if (UInventoryItem* Item = Cast<UInventoryItem>(ListItemObject)) {
      ItemName->SetText(Item->GetName());
      ItemIcon->SetBrushFromTexture(Item->GetIcon());
    }
  }
};

// 2. Заполнение ListView (не создаёт виджеты — только данные)
void UInventoryWidget::PopulateList(TArray<UInventoryItem*> Items) {
  MyListView->ClearListItems();
  for (UInventoryItem* Item : Items)
    MyListView->AddItem(Item); // ListView сам создаст/переиспользует Entry
}`}</Code>
    </div>
  );
}

function UIEventPatternsSection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"grid",gap:8}}>
        {[{title:lang==='ru'?"Правильная подписка и отписка":"Proper Subscribe and Unsubscribe",col:C.green,items:lang==='ru'?["Подписывайся в NativeConstruct, отписывайся в NativeDestruct","Утечки памяти: забыл RemoveFromParent + не очистил делегаты","Weak pointer в делегатах: AddUObject(this, ...) автоматически проверяет валидность","Broadcast на уничтоженный объект = краш без WeakPtr"]:["Subscribe in NativeConstruct, unsubscribe in NativeDestruct","Memory leaks: forgot RemoveFromParent + didn't clear delegates","Weak pointer in delegates: AddUObject(this, ...) auto-checks validity","Broadcast on destroyed object = crash without WeakPtr"]},
          {title:lang==='ru'?"Где хранить данные для UI":"Where to Store UI Data",col:C.orange,items:lang==='ru'?["PlayerState: данные конкретного игрока (HP, Score) — доступны в Multiplayer","GameState: данные всей игры (таймер раунда, счёт команд)","GameInstance: данные сессии (настройки, сохранения) — не сбрасываются при LoadLevel","MVVM ViewModel: трансформированные данные готовые для отображения","НЕ в виджете: виджет может быть уничтожен и пересоздан"]:["PlayerState: per-player data (HP, Score) — available in Multiplayer","GameState: game-wide data (round timer, team scores)","GameInstance: session data (settings, saves) — not reset on LoadLevel","MVVM ViewModel: transformed data ready for display","NOT in widget: widget can be destroyed and recreated"]},
        ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"12px 14px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:8}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:6,marginBottom:5}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
      </div>
      <Code lang="cpp">{`// Правильный паттерн подписки в C++
void UMyWidget::NativeConstruct() {
  Super::NativeConstruct();
  // Безопасная подписка: UObject delegte автоматически инвалидируется
  if (AMyPlayerState* PS = GetOwningPlayerState<AMyPlayerState>()) {
    PS->OnHealthChanged.AddUObject(this, &UMyWidget::OnHealthUpdated);
    PS->OnAmmoChanged.AddUObject(this, &UMyWidget::OnAmmoUpdated);
  }
}

void UMyWidget::NativeDestruct() {
  // ВСЕГДА отписываться!
  if (AMyPlayerState* PS = GetOwningPlayerState<AMyPlayerState>()) {
    PS->OnHealthChanged.RemoveAll(this);
    PS->OnAmmoChanged.RemoveAll(this);
  }
  Super::NativeDestruct();
}`}</Code>
    </div>
  );
}

function CommonUISection(){
  const lang=useLang();
  return(
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {[{title:lang==='ru'?"Что такое Common UI":"What is Common UI",col:C.accent,items:lang==='ru'?["Плагин Epic для создания мультиплатформенного UI (PC/Console/Mobile)","Решает: маршрутизация ввода, стек активных виджетов, action bar","Пример в Lyra: всё меню построено на Common UI","Ключевой принцип: виджеты активируются/деактивируются через стек"]:["Epic plugin for multiplatform UI (PC/Console/Mobile)","Solves: input routing, active widget stack, action bar","Example in Lyra: entire menu built on Common UI","Key concept: widgets activated/deactivated through a stack"]},
        {title:lang==='ru'?"Ключевые компоненты":"Key Components",col:C.orange,items:lang==='ru'?["CommonActivatableWidget: виджет который можно активировать/деактивировать","CommonUI Action Bar: отображает доступные actions (A=Confirm, B=Back)","CommonButtonBase: кнопка с поддержкой gamepad focus","Input Actions: маппинг действий на кнопки без хардкода","CommonVisibilityAnimations: анимации появления/исчезновения"]:["CommonActivatableWidget: widget that can be activated/deactivated","CommonUI Action Bar: shows available actions (A=Confirm, B=Back)","CommonButtonBase: button with gamepad focus support","Input Actions: mapping actions to buttons without hardcoding","CommonVisibilityAnimations: show/hide animations"]},
        {title:lang==='ru'?"Widget Component — 3D UI":"Widget Component — 3D UI",col:C.purple,items:lang==='ru'?["Компонент актора который рендерит UMG виджет в 3D мире","Render Target под капотом: виджет рендерится в RT → quad в 3D","Space: World (в 3D пространстве), Screen (поверх как HUD)","Billboarding: всегда повёрнут к камере","Интерактивный: поддерживает mouse/touch collision в 3D"]:["Actor component that renders UMG widget in 3D world","Render Target under the hood: widget renders to RT → 3D quad","Space: World (in 3D space), Screen (overlay like HUD)","Billboarding: always faces camera","Interactive: supports mouse/touch collision in 3D"]},
        {title:lang==='ru'?"High Contrast Mode":"High Contrast Mode",col:C.yellow,items:lang==='ru'?["Accessibility функция для слабовидящих пользователей","При включении: высококонтрастные цвета, жирные границы","В UMG: виджеты могут override GetCurrentHighContrastSettings()","Project Settings → Engine → Accessibility → High Contrast","Тест: всегда проверяй что UI читается в High Contrast режиме"]:["Accessibility feature for visually impaired users","When enabled: high-contrast colors, thick borders","In UMG: widgets can override GetCurrentHighContrastSettings()","Project Settings → Engine → Accessibility → High Contrast","Test: always verify UI is readable in High Contrast mode"]},
      ].map(({title,col,items})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"14px 16px"}}><div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:10}}>{title}</div>{items.map(i=>(<div key={i} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:13,color:C.muted,lineHeight:1.6,wordBreak:"break-word",fontFamily:"system-ui,-apple-system,sans-serif"}}>{i}</span></div>))}</div>))}
    </div>
  );
}

// ══ TABS & APP ═════════════════════════════════════════════════════════════
const TABS=[
  {id:"linalg",icon:"∇",ready:true},
  {id:"gpu",icon:"⬡",ready:true},
  {id:"hlsl",icon:"{}",ready:true},
  {id:"rendering",icon:"◈",ready:true},
  {id:"optimization",icon:"⚡",ready:true},
  {id:"materials",icon:"◎",ready:true},
  {id:"lighting",icon:"☀",ready:true},
  {id:"vertex",icon:"⟨v⟩",ready:true},
  {id:"effects",icon:"✦",ready:true},
  {id:"pipeline",icon:"⚙",ready:true},
  {id:"maya",icon:"🐍",ready:true},
  {id:"cpp",icon:"{}",ready:true},
  {id:"ui",icon:"⬜",ready:true},
  {id:"mock",icon:"🎯",ready:true},
];

export default function App(){
  const [active,setActive]=useState("linalg");
  const [lang,setLang]=useState("ru");
  useEffect(()=>{
    const s=document.createElement("style");
    s.textContent=`.tab-scroll::-webkit-scrollbar{display:none}`;
    document.head.appendChild(s);
  },[]);
  return(
    <LangCtx.Provider value={lang}><div style={{background:C.bg,minHeight:"100vh",color:C.text,fontFamily:"system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <div style={{background:C.surface,position:"sticky",top:0,zIndex:100,borderBottom:`1px solid ${C.border}`}}>
        <div style={{padding:"10px 16px",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:28,height:28,background:C.accent+"18",border:`1px solid ${C.accent}44`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:C.accent,fontSize:16,flexShrink:0}}>∇</div>
          <div style={{flex:1}}><div style={{fontWeight:700,fontSize:12,letterSpacing:3}}>{T[lang].appTitle}</div><div style={{color:C.muted,fontSize:9,letterSpacing:2}}>{T[lang].appSub}</div></div>
        <button onClick={()=>setLang(l=>l==='ru'?'en':'ru')} style={{background:C.dim,border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 10px",color:C.accent,fontFamily:"monospace",fontSize:11,cursor:"pointer",flexShrink:0}}>{lang==='ru'?'EN':'RU'}</button>
        </div>
        <div className="tab-scroll" style={{display:"flex",gap:4,overflowX:"auto",flexWrap:"nowrap",scrollbarWidth:"none",msOverflowStyle:"none",padding:"0 12px 10px"}}>
          {TABS.map(tab=>(<button key={tab.id} onClick={()=>tab.ready&&setActive(tab.id)} style={{background:active===tab.id?C.accent+"18":"transparent",border:`1px solid ${active===tab.id?C.accent+"55":C.border}`,borderRadius:6,padding:"6px 13px",flexShrink:0,color:active===tab.id?C.accent:tab.ready?C.muted:C.dim,fontSize:11,fontFamily:"inherit",cursor:tab.ready?"pointer":"default",display:"flex",alignItems:"center",gap:5,opacity:tab.ready?1:0.4,whiteSpace:"nowrap"}}><span>{tab.icon}</span>{T[lang].tabs[tab.id]||tab.id}{!tab.ready&&<span style={{fontSize:9,color:C.dim}}>·soon</span>}</button>))}
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 32px"}}>

        {active==="linalg"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.accent,letterSpacing:3,marginBottom:4}}>{T[lang].mods.linalg} · {lang==='ru'?"ПРИОРИТЕТ 1":"PRIORITY 1"}</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>{T[lang].tabs.linalg}</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{T[lang].modDesc.linalg}</p></div>
          <Section title={lang==='ru'?"Dot Product — Скалярное произведение":"Dot Product — Scalar Product"} tag="∫ math">
              <LearnCard tabs={{
                "Суть":"Dot product берёт два вектора и возвращает <b style='color:#00c8ff'>одно число</b> — «насколько сильно они смотрят в одну сторону». Результат зависит от угла между ними: максимален когда векторы параллельны, равен нулю когда перпендикулярны.",
                "Аналогия":"Представь фонарик (вектор L) и поверхность (вектор N). Если фонарик светит прямо на поверхность — dot = 1, максимальный свет. Если под углом 90° — dot = 0, поверхность не освещена. Именно так работает Lambert lighting в каждом шейдере.",
                "На интервью":`dot(A,B) = |A||B|·cos(θ) — при нормализованных векторах это просто cos угла между ними. Применения: Lambert diffuse — dot(N,L); Fresnel — dot(N,V); определение «смотрит ли нормаль на камеру» — dot(N,V) < 0 значит backface.`
              }}
              tabsEn={{"Core Idea":"Dot product takes two vectors and returns <b style='color:#00c8ff'>a single number</b> — how strongly they point in the same direction. Max when parallel, zero when perpendicular.","Analogy":"Think of a flashlight (L) and surface (N). Straight on = dot 1, max light. At 90° = dot 0, unlit. This is how <b style='color:#ff7a45'>Lambert lighting</b> works in every shader.","In Interview":"dot(A,B) = |A||B|·cos(θ). With normalized vectors = cosine of angle. Lambert: dot(N,L). <b style='color:#c084fc'>Fresnel</b>: dot(N,V). Backface: dot(N,V) < 0 = facing away."}}/>
              <DotProductViz/>
            </Section>
          <Section title={lang==='ru'?"Cross Product — Векторное произведение":"Cross Product — Vector Product"} tag="∫ math">
              <LearnCard tabs={{
                "Суть":"Cross product берёт два вектора и возвращает <b style='color:#3dff90'>третий вектор</b>, перпендикулярный обоим. Длина результата равна площади параллелограмма, построенного на входных векторах.",
                "Аналогия":"Положи две ручки на стол под углом — cross product это вектор, торчащий перпендикулярно вверх из точки их пересечения. Именно так GPU вычисляет нормаль грани: берёт два ребра треугольника и делает cross — получает вектор, перпендикулярный поверхности.",
                "На интервью":`Формула: A×B = (Ay·Bz-Az·By, Az·Bx-Ax·Bz, Ax·By-Ay·Bx). Главное: порядок важен — A×B = -(B×A). Применения: нормаль грани из двух рёбер; Bitangent в TBN-матрице: B = cross(N,T); определение ориентации треугольника (CW vs CCW).`
              }}
              tabsEn={{"Core Idea":"Cross product takes two vectors and returns <b style='color:#3dff90'>a third vector</b> perpendicular to both. Its length = area of their parallelogram.","Analogy":"Lay two pens at an angle — cross product points straight up from their crossing. How GPU computes face normals: two triangle edges, cross → perpendicular vector.","In Interview":"A×B = (Ay·Bz-Az·By, Az·Bx-Ax·Bz, Ax·By-Ay·Bx). Order matters: A×B = -(B×A). Uses: face normals, TBN Bitangent: B = cross(N,T), triangle winding."}}/>
              <CrossProductViz/>
            </Section>
          <Section title={lang==='ru'?"Sphere Mask — знать формулу наизусть":"Sphere Mask — Know the Formula by Heart"} tag="★ hot">
              <LearnCard tabs={{
                "Суть":"Sphere Mask — функция которая возвращает 1 внутри сферы вокруг точки B и 0 снаружи. Hardness контролирует плавность края. Это универсальный инструмент для proximity-эффектов в шейдерах.",
                "Аналогия":"Представь капля воды падает на песок. В точке падения (центр B) — мокрый (1.0). Чем дальше от центра — тем суше (→0). Radius — радиус мокрого пятна, Hardness — насколько резко переход от мокрого к сухому.",
                "На интервью":`result = 1 - saturate((length(A-B) - Radius) / Hardness). Разбор: length(A-B) — расстояние до центра; минус Radius делает значение отрицательным внутри сферы; деление на Hardness размывает край; saturate клампит в [0,1]; 1-x инвертирует — внутри=1. Применение: следы на снегу, proximity blend материалов.`
              }}
              tabsEn={{"Core Idea":"Sphere Mask returns 1 inside a sphere around B, 0 outside. <b style='color:#ff7a45'>Hardness</b> controls edge softness. Universal proximity effect in shaders.","Analogy":"Water drop on sand: at impact point = wet (1.0). Further away = drier (→0). Radius = wet spot size. Hardness = sharpness of the transition.","In Interview":"result = 1 - saturate((length(A-B) - Radius) / Hardness). -Radius makes inside negative. /Hardness softens edge. saturate clamps [0,1]. 1-x inverts: inside=1. Use: snow trails, proximity blend."}}/>
              <SphereMaskViz/>
            </Section>
          <Section title={lang==='ru'?"Векторы — длина, нормализация, проекция":"Vectors — Length, Normalize, Projection"} tag="∫ math">
              <LearnCard tabs={{
                "Суть":"Вектор — направление и величина. Длина (magnitude) — насколько далеко. Нормализованный вектор — только направление, длина = 1. Проекция A на B — насколько A «идёт» в направлении B.",
                "Аналогия":"Нормализация как стрелка компаса — не важно насколько она длинная, важно куда показывает. Dot product = длина проекции. Represent(A→B) = (A·B / |B|²) · B — это тень от A на прямую B.",
                "На интервью":`|V| = sqrt(x²+y²+z²). normalize(V) = V/|V| — все lighting расчёты требуют нормализованных векторов, иначе масштаб ломает dot product. Проекция A на B: scalar = dot(A, normalize(B)); vector = scalar * normalize(B). Используется в Gram-Schmidt для TBN.`
              }}
              tabsEn={{"Core Idea":"A vector has direction and magnitude. Normalized = direction only, length=1. Projection of A onto B = how much A goes in direction of B.","Analogy":"Normalization is a compass needle — only direction matters. Dot product = scalar projection. Project(A→B) = (A·B/|B|²)·B = shadow of A onto line B.","In Interview":"|V| = sqrt(x²+y²+z²). normalize(V)=V/|V|. All lighting needs normalized vectors — otherwise scale corrupts dot product. Project A→B: scalar=dot(A,normalize(B)); vector=scalar*normalize(B)."}}/>
              <VectorBasics/>
            </Section>
            <Section title={lang==='ru'?"Матрицы — умножение, TRS, Inverse, Transpose":"Matrices — Multiplication, TRS, Inverse, Transpose"} tag="∫ math">
              <LearnCard tabs={{
                "Суть":"Матрица — оператор трансформации пространства. Умножение матрицы на вектор = применение трансформации к точке. TRS матрица кодирует Translation, Rotation, Scale в одной операции.",
                "Аналогия":"Матрица как инструкция оригами: 'сложи вот так'. Умножение матриц = последовательность инструкций. Порядок важен: сначала сложи, потом разрежь ≠ сначала разрежь, потом сложи.",
                "На интервью":`TRS порядок: T×R×S (Scale применяется первым, Translation последним). Умножение НЕ коммутативно: A×B ≠ B×A. Inverse: View Matrix = Inverse(Camera TRS). InvTranspose для нормалей при non-uniform scale. Column-major в GLSL/HLSL: последний столбец = translation.`
              }}
              tabsEn={{"Core Idea":"A matrix is a transformation operator. Matrix × vector = apply transformation. TRS matrix encodes Translation, Rotation, Scale in one operation.","Analogy":"Matrix = origami instructions. Multiplication = sequence of steps. Order matters: fold-then-cut ≠ cut-then-fold.","In Interview":"TRS: T×R×S (Scale first, Translation last). <b style='color:#ff5566'>NOT commutative</b>: A×B ≠ B×A. View Matrix = Inverse(Camera TRS). InvTranspose for normals under non-uniform scale."}}/>
              <MatrixViz/>
            </Section>
            <Section title="Quaternions — Gimbal Lock, Slerp" tag="∫ math">
              <LearnCard tabs={{
                "Суть":"Quaternion — альтернатива Euler углам для хранения вращений. Решает Gimbal Lock и обеспечивает правильную интерполяцию. Внутри движки всегда используют quaternions, Euler только в UI.",
                "Аналогия":"Euler углы — три отдельных поворота (как голова, плечо, кисть). Если голова повернулась на 90°, плечо и кисть могут оказаться на одной оси — Gimbal Lock. Quaternion поворачивает сразу вокруг одной произвольной оси без этой проблемы.",
                "На интервью":`q = w + xi + yj + zk, где w=cos(θ/2), xyz=axis·sin(θ/2). Единичный кватернион: |q|=1. Slerp для анимации — интерполяция по дуге сферы, равномерная скорость. Lerp кватернионов даёт неравномерную скорость. В UE5: FQuat, FRotator (Euler) для UI.`
              }}
              tabsEn={{"Core Idea":"Quaternion is an alternative to Euler angles. Solves Gimbal Lock, gives correct interpolation. Engines always use quaternions internally; Euler only in editor UI.","Analogy":"Euler = 3 separate rotations. Head at 90° → shoulder and wrist on same axis = <b style='color:#ff5566'>Gimbal Lock</b>. Quaternion rotates around one arbitrary axis — no problem.","In Interview":"q=w+xi+yj+zk, w=cos(θ/2), xyz=axis·sin(θ/2). |q|=1 unit quaternion. <b style='color:#3dff90'>Slerp</b> = uniform arc interpolation. Lerp = non-uniform speed. UE5: FQuat internal, FRotator in editor."}}/>
              <QuaternionExplainer/>
            </Section>
            <Section title={lang==='ru'?"Reflect вектор · Уравнение плоскости":"Reflect Vector · Plane Equation"} tag="∫ math">
              <LearnCard tabs={{
                "Суть":"reflect(I,N) — отражённый вектор от поверхности с нормалью N. Уравнение плоскости Ax+By+Cz+D=0 позволяет определить по какую сторону плоскости находится точка и как далеко.",
                "Зачем":"Reflect — основа specular отражений, mirror surfaces, SSR (Screen Space Reflections). Уравнение плоскости — основа frustum culling (6 плоскостей frustum), portal rendering, clip planes.",
                "На интервью":`reflect(I,N) = I - 2·dot(I,N)·N. Derive: компонента I вдоль N = dot(I,N)·N, компонента перпендикулярная = I - dot(I,N)·N. Отражение: убрать компоненту вдоль N и добавить обратную. Frustum culling: точка за плоскостью если dot(Normal,Point)+D < 0.`
              }}
              tabsEn={{"Core Idea":"reflect(I,N) = reflected vector off surface with normal N. Plane equation Ax+By+Cz+D=0 determines which side a point is on and how far.","Why":"Reflect = basis of specular, mirrors, SSR. Plane equation = basis of frustum culling (6 planes), portal rendering, clip planes.","In Interview":"reflect(I,N) = I - 2·dot(I,N)·N. Along-N = dot(I,N)·N; perp = I minus that; reflect = flip along-N part. Frustum: point behind plane if dot(Normal,Point)+D < 0."}}/>
              <ReflectAndPlane/>
            </Section>
            <Section title={lang==='ru'?"Пространства координат — Model → Screen":"Coordinate Spaces — Model → Screen"} tag="pipeline">
              <LearnCard tabs={{
                "Зачем":"Зачем столько пространств? Каждая операция удобна в своём контексте. Меш хранится в Model Space — удобно для редактора. Физика и освещение работают в World Space — всё в одной системе. View Space удобен для culling — всё относительно камеры. Clip Space нужен GPU для растеризации.",
                "Аналогия":"Ты в городе (World Space). На карте города твой дом (Model Space — координаты относительно дома). GPS навигатор показывает относительно тебя (View Space). Экран телефона — проекция (Clip/Screen Space). Разные системы координат для разных задач — но всё это про одну точку.",
                "На интервью":`Model→World: умножаем на Model Matrix (TRS). World→View: умножаем на View Matrix (обратная трансформация камеры). View→Clip: умножаем на Projection Matrix. Clip→NDC: делим на w (перспективное деление). NDC→Screen: Viewport transform. Vertex shader обязан вывести позицию в Clip Space через SV_Position.`
              }}
              tabsEn={{"Why":"Each operation is convenient in its own space. Mesh in Model Space (editor). Physics/lighting in World Space (unified). View Space (camera-relative). Clip Space (GPU rasterization).","Analogy":"You're in a city (World Space). House on a map = Model Space. GPS = View Space. Phone screen = Clip Space. Different systems for different tasks, all describing the same point.","In Interview":"Model→World: × Model Matrix. World→View: × View Matrix (inverse camera). View→Clip: × Projection Matrix. Clip→NDC: ÷ w. NDC→Screen: Viewport. VS must output SV_Position in Clip Space."}}/>
              <CoordSpaces/>
            </Section>
        </>)}

        {active==="gpu"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.orange,letterSpacing:3,marginBottom:4}}>{T[lang].mods.gpu}</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>{T[lang].tabs.gpu}</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{T[lang].modDesc.gpu}</p></div>
          <Section title={lang==='ru'?"Архитектура: CPU vs GPU":"Architecture: CPU vs GPU"} tag="arch">
              <LearnCard tabs={{
                "Суть":"CPU оптимизирован для <b style='color:#ff7a45'>последовательного</b> выполнения сложных инструкций — большой кэш, предсказание ветвлений, out-of-order execution. GPU оптимизирован для <b style='color:#00c8ff'>параллельного</b> выполнения простых операций над огромным количеством данных одновременно.",
                "Аналогия":"CPU — 8 профессоров, каждый решает сложную задачу. GPU — 10 000 студентов, каждый считает простое уравнение. Рендеринг — это 'посчитай цвет для каждого из 2 миллионов пикселей'. Студенты справятся быстрее, даже если каждый медленнее профессора.",
                "На интервью":`GPU использует SIMT (Single Instruction Multiple Threads) — один шейдер выполняется на тысячах потоков одновременно, каждый обрабатывает свой пиксель или вершину. Это работает потому что шейдеры не имеют зависимостей между потоками. GPU не заменяет CPU: игровая логика последовательна — physics solver, AI, Blueprint — всё это цепочки зависимых вычислений.`
              }}/>
              <CoreDiagram/><InfoBox label={lang==='ru'?"КЛЮЧЕВОЕ ОТЛИЧИЕ":"KEY DIFFERENCE"} color={C.orange}>{lang==='ru'?<><strong style={{color:C.text}}>CPU</strong> — несколько мощных ядер, большой кэш, сложная логика управления. Для последовательного кода с ветвлениями.<br/><strong style={{color:C.text}}>GPU</strong> — тысячи простых ядер. Каждое слабее CPU-ядра, но все параллельны.<br/><br/><span style={{color:C.yellow}}>GPU не заменяет CPU:</span> игровая логика последовательна.</>:<><strong style={{color:C.text}}>CPU</strong> — few powerful cores, large cache, complex control logic. Optimized for sequential code with branches.<br/><strong style={{color:C.text}}>GPU</strong> — thousands of simple cores. Each weaker than CPU, but all parallel. Ideal for applying one shader to millions of pixels.<br/><br/><span style={{color:C.yellow}}>GPU doesn't replace CPU:</span> game logic is sequential — next frame depends on previous result.</>}</InfoBox></Section>
          <Section title="GPU Rendering Pipeline" tag="pipeline">
              <LearnCard tabs={{
                "Суть":"Рендеринг — это конвейер (pipeline): данные входят с одной стороны (вершины из буфера), выходят с другой (пиксели на экране). Каждый этап выполняет свою задачу и передаёт результат следующему. Некоторые этапы программируемые (шейдеры), некоторые — фиксированная логика GPU.",
                "Зачем":"Конвейерная архитектура позволяет GPU обрабатывать несколько кадров одновременно: пока Vertex Shader обрабатывает треугольники кадра N, Rasterizer работает с кадром N-1. Как заводской конвейер — каждая станция всегда занята.",
                "На интервью":`Этапы: Input Assembly (читает вершины) → Vertex Shader (трансформирует позиции, программируемый) → Rasterization (интерполирует атрибуты на пиксели, fixed) → Pixel Shader (вычисляет цвет, программируемый) → Output Merger (depth test, blending, fixed). VS обязательно выводит SV_Position в clip space. PS выводит float4 цвет через SV_Target.`
              }}
              tabsEn={{"Core Idea":"Rendering is a pipeline: vertices in, pixels out. Each stage does its job and passes forward. Some programmable (shaders), some fixed GPU logic.","Why":"Pipeline lets GPU process multiple frames simultaneously: VS works on frame N while Rasterizer handles N-1. Like a factory — every station always busy.","In Interview":"IA → <b style='color:#ff7a45'>VS</b> (programmable) → Rasterization (fixed) → <b style='color:#00c8ff'>PS</b> (programmable) → Output Merger (fixed). VS must output SV_Position in clip space."}}/>
              <GPUPipeline/>
            </Section>
          <Section title={lang==='ru'?"CPU-bound vs GPU-bound — как диагностировать":"CPU-bound vs GPU-bound — How to Diagnose"} tag="profiling">
              <LearnCard tabs={{
                "Суть":"Frame time = max(CPU time, GPU time). Если CPU работает 20ms, а GPU 8ms — CPU-bound, GPU простаивает. Оптимизировать нужно <b style='color:#ff7a45'>то, что дольше</b> — ускорение другого не даст прироста FPS.",
                "Аналогия":"Ресторан: повар (GPU) готовит блюда. Официант (CPU) принимает заказы и передаёт на кухню. Если официант медленный — повар простаивает (CPU-bound). Если блюда сложные и повар не успевает — официант ждёт (GPU-bound). Ускорять нужно узкое место.",
                "На интервью":`Диагностика: stat Unit в UE5 — смотри GPU ms vs CPU ms. Быстрый тест: снизь разрешение вдвое (r.ScreenPercentage 50). Если FPS вырос значительно — GPU-bound (меньше пикселей = меньше PS работы). Если FPS не изменился — CPU-bound (GPU и так простаивал). В RenderDoc: длинные passes = GPU-bound. В Unreal Insights: длинные CPU threads = CPU-bound.`
              }}
              tabsEn={{"Core Idea":"Frame time = max(CPU, GPU). If CPU=20ms, GPU=8ms → <b style='color:#ff7a45'>CPU-bound</b>, GPU idles. <b style='color:#ff7a45'>Optimize whichever is slower</b> — fixing the other gives zero FPS gain.","Analogy":"Restaurant: cook (GPU) prepares, waiter (CPU) takes orders. Slow waiter → cook idles (CPU-bound). Complex dishes → waiter waits (GPU-bound). Fix the bottleneck.","In Interview":"stat Unit: GPU ms vs CPU ms. r.ScreenPercentage 50: FPS up = <b style='color:#00c8ff'>GPU-bound</b>. Unchanged = CPU-bound. RenderDoc: long passes = GPU-bound. Unreal Insights: long CPU = CPU-bound."}}/>
              <BoundnessViz/>
            </Section>
          <Section title={lang==='ru'?"Draw Calls — что это и как сократить":"Draw Calls — What & How to Reduce"} tag="★ hot">
              <LearnCard tabs={{
                "Суть":"Draw call — команда CPU к GPU: «нарисуй этот меш с этим материалом». Проблема не в самом рисовании — а в <b style='color:#ff7a45'>overhead на подготовку</b>: смена шейдеров, bind текстур, обновление constant buffers. Каждый вызов = остановка CPU для синхронизации с GPU.",
                "Зачем":"На mobile лимит ~500-2000 draw calls/frame. На десктопе ~5000-15000. Превысишь — CPU не успевает за GPU, фреймрейт падает. Это CPU-bound сценарий — GPU простаивает пока CPU готовит следующий draw call.",
                "На интервью":`Батчинг: объединить меши с одинаковым материалом в один — 1 draw call вместо N. Instancing (ISM/HISM): 1000 одинаковых деревьев = 1 draw call с массивом трансформаций. Атласинг: несколько текстур в одну → меньше смен material state. Nanite в UE5 обходит проблему иначе: работает через indirect draws и culling на GPU.`
              }}
              tabsEn={{"Core Idea":"Draw call = CPU command to GPU: draw this mesh. Problem is not drawing — it's the <b style='color:#ff7a45'>preparation overhead</b>: shader swap, texture bind, constant buffer update.","Why":"Mobile: ~500-2000 calls/frame. Desktop: ~5000-15000. Exceed it = CPU can't feed GPU, FPS drops — GPU-idle CPU-bound scenario.","In Interview":"Batching: same-material meshes → 1 call. Instancing (ISM/HISM): 1000 trees = 1 call with transform array. Atlasing: fewer state changes. Nanite bypasses via GPU indirect draws."}}/>
              <DrawCallExplainer/>
            </Section>
        </>)}

        {active==="hlsl"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.purple,letterSpacing:3,marginBottom:4}}>{T[lang].mods.hlsl}</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>{T[lang].tabs.hlsl}</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{T[lang].modDesc.hlsl}</p></div>
          <Section title={lang==='ru'?"Типы данных и Swizzle":"Data Types & Swizzle"} tag="types">
              <LearnCard tabs={{
                "Суть":"HLSL — строго типизированный язык. float — 32-битное число с плавающей точкой. half — 16-битное (меньше точность, но в 2 раза быстрее на мобильных GPU и меньше bandwidth). Swizzle — способ перегруппировать компоненты вектора без копирования.",
                "Зачем":"half vs float: на мобильных GPU (Adreno, Mali) half выполняется в 2x быстрее. На десктопе разница минимальна. Правило: используй float для позиций и нормалей (нужна точность), half для цветов и UV (точности достаточно). Swizzle — не просто синтаксический сахар, это zero-cost операция на GPU.",
                "На интервью":`float4 col = tex.Sample(s,uv); col.rgb — это три компонента без копирования. col.bgr — переставляет каналы. col.rrrr — дублирует R в float4. Это работает потому что HLSL компилятор транслирует swizzle в native GPU инструкции без overhead. bool в шейдерах дорогой — GPU не любит ветвления (if/else заставляет все потоки в warp ждать).`
              }}
              tabsEn={{"Core Idea":"HLSL is strongly typed. float = 32-bit. <b style='color:#ffc234'>half</b> = 16-bit (2x faster on mobile, lower bandwidth). Swizzle = regroup components without copying.","Why":"half vs float: mobile GPUs run half 2x faster. Use float for positions/normals, half for colors/UV. Swizzle is zero-cost — native GPU instructions.","In Interview":"col.rgb = 3 components, no copy. col.bgr reorders. col.rrrr duplicates R. bool is expensive — GPU dislikes branching (if/else stalls entire warp)."}}/>
              <DataTypes/>
            </Section>
          <Section title={lang==='ru'?"Встроенные функции — шпаргалка":"Built-in Functions — Cheat Sheet"} tag="intrinsics">
              <LearnCard tabs={{
                "Суть":"HLSL intrinsics — функции, встроенные в компилятор. Они транслируются в одну-две нативные GPU инструкции. Это не функции с overhead вызова — это почти бесплатные операции на уровне железа.",
                "Аналогия":"dot(), normalize(), lerp() — это как +, -, * для GPU. Они существуют в аппаратуре как отдельные блоки (ALU операции). Поэтому dot(A,B) быстрее чем Ax*Bx + Ay*By + Az*Bz — компилятор знает это и использует одну инструкцию.",
                "На интервью":`saturate(x) — эквивалент clamp(x,0,1) но быстрее: компилятор знает диапазон и оптимизирует. smoothstep(0,1,x) — S-кривая: медленный старт, быстрая середина, медленный конец. Используй вместо lerp когда нужен плавный переход. step(edge,x) — аппаратный if без ветвления: возвращает 0 или 1.`
              }}
              tabsEn={{"Core Idea":"HLSL intrinsics are compiler built-ins translating to 1-2 native GPU instructions — hardware ALU operations, nearly free.","Analogy":"dot(), normalize(), lerp() are +,-,* for GPU — dedicated hardware units. dot(A,B) faster than Ax*Bx+Ay*By+Az*Bz: compiler uses a single instruction.","In Interview":"saturate(x) = fast clamp(x,0,1). smoothstep = S-curve (slow-fast-slow). step(edge,x) = hardware if without branching: returns 0 or 1."}}/>
              <Intrinsics/>
            </Section>
          <Section title={lang==='ru'?"Vertex Shader — анатомия":"Vertex Shader — Anatomy"} tag="vs"><Code lang="hlsl">{`struct VSInput { float3 Position:POSITION; float3 Normal:NORMAL; float4 Tangent:TANGENT; float2 UV:TEXCOORD0; };
struct VSOutput { float4 ClipPos:SV_Position; float3 WorldPos:TEXCOORD0; float3 WorldNormal:TEXCOORD1; float2 UV:TEXCOORD2; };
cbuffer PerObject : register(b0) { float4x4 ModelMatrix; float4x4 ViewProjMatrix; float4x4 InvTransposeModel; };
VSOutput main(VSInput IN) {
    VSOutput OUT;
    float4 worldPos   = mul(ModelMatrix, float4(IN.Position, 1.0));
    OUT.ClipPos       = mul(ViewProjMatrix, worldPos);
    OUT.WorldPos      = worldPos.xyz;
    // InvTranspose нужна для non-uniform scale:
    OUT.WorldNormal   = normalize(mul((float3x3)InvTransposeModel, IN.Normal));
    OUT.UV = IN.UV;
    return OUT;
}`}</Code></Section>
          <Section title={lang==='ru'?"Pixel Shader — анатомия":"Pixel Shader — Anatomy"} tag="ps"><Code lang="hlsl">{`Texture2D AlbedoTex:register(t0); Texture2D NormalTex:register(t1);
SamplerState Samp:register(s0);
cbuffer PerFrame:register(b1) { float3 LightDir; float3 CameraPos; float3 LightColor; };
float4 main(PSInput IN) : SV_Target {
    float3 albedo = AlbedoTex.Sample(Samp, IN.UV).rgb;
    float3 N = normalize(IN.WorldNormal);
    float3 L = normalize(LightDir);
    float3 V = normalize(CameraPos - IN.WorldPos);
    float3 H = normalize(L + V);              // halfway для Blinn-Phong
    float diffuse = saturate(dot(N, L));       // Lambert
    float spec    = pow(saturate(dot(N,H)), 64.0); // Blinn-Phong
    float fresnel = pow(1.0 - saturate(dot(N,V)), 3.0); // Schlick
    float3 color  = albedo * diffuse * LightColor + spec + fresnel * float3(0.1,0.2,0.4);
    return float4(color, 1.0);
}`}</Code></Section>
          <Section title={lang==='ru'?"UV-трансформации":"UV Transformations"} tag="uv"><UVDemo/></Section>
          <Section title={lang==='ru'?"Normal Mapping и TBN-матрица":"Normal Mapping & TBN Matrix"} tag="normal map">
              <LearnCard tabs={{
                "Зачем":"Normal map позволяет добавить визуальную детализацию без увеличения полигонов. Плоский квад с нормал-мэпом выглядит как детализированная поверхность. Но нормали в текстуре хранятся в Tangent Space — локальной системе координат поверхности. Их нужно перевести в World Space для расчёта освещения.",
                "Суть":"TBN матрица — система координат на поверхности меша. T (Tangent) — вдоль UV.x, B (Bitangent) — вдоль UV.y, N (Normal) — перпендикуляр поверхности. Нормаль из normal map умножается на TBN и попадает в World Space где считается освещение.",
                "На интервью":`Normal map хранит вектора в tangent space: синеватый цвет (0.5, 0.5, 1.0) = вектор (0,0,1) = «прямо перпендикулярно поверхности». Цветные области — отклонения нормали. Для перевода в world space: строим TBN матрицу в шейдере из tangent/bitangent/normal вершины, затем worldN = mul(tangentN, TBN). Bitangent = cross(N,T) с учётом знака из W-компоненты tangent.`
              }}
              tabsEn={{"Why":"Normal map adds visual detail without more polygons. Normals stored in <b style='color:#ffc234'>Tangent Space</b> must be converted to World Space for lighting.","Core Idea":"TBN matrix = surface coordinate system. T=along UV.x, B=along UV.y, N=perpendicular. Texture normal × TBN = World Space normal.","In Interview":"Bluish (0.5,0.5,1.0) = (0,0,1) = straight perpendicular. Build TBN from vertex tangent/bitangent/normal. worldN=mul(tangentN,TBN). Bitangent=cross(N,T) with W-component sign."}}/>
              <NormalMappingExplainer/>
            </Section>
        </>)}

        {active==="rendering"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.accent,letterSpacing:3,marginBottom:4}}>{T[lang].mods.rendering}</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>{T[lang].tabs.rendering}</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{T[lang].modDesc.rendering}</p></div>
          <Section title="Deferred vs Forward Rendering" tag="theory">
              <LearnCard tabs={{
                "Суть":"Forward: для каждого объекта сразу считаем все источники света. N объектов × M источников = N×M проходов. Deferred: сначала рендерим геометрию в G-Buffer (только данные поверхности), потом освещение отдельно. N + M проходов вместо N×M.",
                "Зачем":"При 100 объектах и 20 источниках света: Forward = 2000 проходов, Deferred = 120. Поэтому все современные движки используют deferred для сложных сцен. Цена — G-Buffer занимает 100-200 MB VRAM и требует широкий bandwidth. Поэтому mobile обычно Forward.",
                "На интервью":`UE5 использует Deferred по умолчанию. Преимущество: N sources lights стоит N passes вне зависимости от количества материалов. Недостаток: прозрачность не работает нативно (нет depth write в G-Buffer), MSAA дорогой. Translucency в UE5 рендерится отдельным Forward проходом поверх deferred результата.`
              }}/>
              <DeferredVsForward/><InfoBox label={lang==='ru'?"ПОЧЕМУ UE5 ИСПОЛЬЗУЕТ DEFERRED":"WHY UE5 USES DEFERRED"} color={C.orange}>{lang==='ru'?"Deferred отделяет рендеринг геометрии от расчёта освещения. N объектов + M источников = N + M passes, а не N×M. Критично для уровней с десятками динамических источников.":"Deferred separates geometry rendering from lighting calculation. N objects + M lights = N+M passes, not N×M. Critical for levels with dozens of dynamic light sources."}</InfoBox></Section>
          <Section title={lang==='ru'?"G-Buffer — что хранится в каждом канале":"G-Buffer — What's in Each Channel"} tag="★ hot">
              <LearnCard tabs={{
                "Суть":"G-Buffer (Geometry Buffer) — набор render targets куда Base Pass записывает всё о поверхности: нормали, цвет, roughness, metallic. Lighting Pass потом читает эти данные и считает освещение для всего экрана за один проход.",
                "Зачем":"Без G-Buffer каждый источник света должен знать о каждом материале — O(N×M) complexity. С G-Buffer: материалы пишут в буфер один раз, источники света читают буфер — O(N+M). Это и есть суть deferred рендеринга.",
                "На интервью":`UE5 G-Buffer: GBufferA — World Normal (RGB) + Shading Model ID (A). GBufferB — Metallic, Specular, Roughness, Shadow flags. GBufferC — BaseColor (RGB) + IndirectIrradiance (A). Scene Depth — для реконструкции World Position: из depth + UV + InvViewProj получаем 3D позицию любого пикселя без хранения XYZ.`
              }}/>
              <GBufferViz/>
            </Section>
          <Section title={lang==='ru'?"Render Passes в UE5 — порядок и назначение":"Render Passes in UE5 — Order & Purpose"} tag="pipeline"><RenderPassesViz/></Section>
          <Section title="Lumen · Nanite · Virtual Shadow Maps" tag="★ ue5">
              <LearnCard tabs={{
                "Суть":"Три главные технологии UE5. Nanite — виртуализированная геометрия (бесконечные полигоны). Lumen — полностью динамическое GI и отражения. VSM — виртуализированные тени для Nanite-объектов. Вместе они меняют пайплайн: меньше ручной работы с LOD и лайтмапами.",
                "Зачем":"До UE5: TA тратил время на настройку LOD каждого меша, запекание лайтмап (часы на ферме), настройку shadow cascades. С Nanite+Lumen: LOD автоматический, GI динамическое, тени через VSM. TA фокусируется на материалах и оптимизации по-новому.",
                "На интервью":`Nanite ограничения: только Opaque материалы, нет skeletal mesh, нет WPO (в UE5.0, частично в 5.1+). Lumen ограничения: нет мобильных платформ, задержка при резких изменениях освещения, ~2-4ms cost. VSM нужен потому что traditional shadow maps не работают с Nanite — слишком много треугольников для shadow render. VSM виртуализирует shadow map как страницы — рендерится только видимая часть.`
              }}/>
              <LumenNaniteVSM/>
            </Section>
        </>)}

        {active==="optimization"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.yellow,letterSpacing:3,marginBottom:4}}>{T[lang].mods.optimization}</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>{T[lang].tabs.optimization}</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{T[lang].modDesc.optimization}</p></div>
          <Section title={lang==='ru'?"Инструменты профайлинга":"Profiling Tools"} tag="★ hot">
              <LearnCard tabs={{
                "Суть":"Профайлинг — это поиск узкого места. Нельзя оптимизировать вслепую. Правило: сначала измерь, потом оптимизируй. stat GPU показывает время каждого render pass в миллисекундах — сразу видно что тормозит.",
                "Зачем":"60 FPS = 16.6ms на кадр. 30 FPS = 33ms. Если Shadow Depth Pass занимает 8ms — это половина бюджета. RenderDoc позволяет зайти внутрь любого draw call и увидеть какой шейдер работал, какие текстуры были bound, сколько пикселей обработано.",
                "На интервью":`Workflow: stat Unit → понять CPU-bound или GPU-bound. Если GPU-bound → stat GPU → найти дорогой pass. profilegpu → детальное дерево passes одного кадра. RenderDoc → зайти внутрь конкретного draw call. Unreal Insights → для CPU-bound: видно какой Blueprint/код тормозит по функциям с точным временем.`
              }}/>
              <ProfilingTools/>
            </Section>
          <Section title={lang==='ru'?"LOD System — Screen Size thresholds":"LOD System — Screen Size Thresholds"} tag="lod">
              <LearnCard tabs={{
                "Суть":"LOD (Level of Detail) — система автоматической замены высокополигональной модели на упрощённую при удалении от камеры. Ключевой параметр — Screen Size: какую долю экрана занимает объект (0.0 до 1.0).",
                "Зачем":"Камень вдали занимает 5×5 пикселей. Рендерить его с 50k полигонами бессмысленно — результат неотличим от 100 полигонов. LOD экономит vertex processing (VS runs) и пропускную способность памяти. HISM управляет LOD для тысяч инстансов автоматически.",
                "На интервью":`Screen Size в UE5 — не пиксели, а доля экрана от 0 до 1. LOD0 обычно 1.0→0.3, LOD1: 0.3→0.1, LOD2: 0.1→0.01, Culled: <0.01. Nanite заменяет ручной LOD для static meshes — автоматически выбирает нужную детализацию на GPU. Для skeletal meshes и dynamic objects LOD по-прежнему нужен вручную.`
              }}/>
              <LODViz/>
            </Section>
          <Section title="Instancing — ISM vs HISM vs Nanite" tag="instancing"><InstancingViz/></Section>
          <Section title={lang==='ru'?"Текстуры — стриминг, форматы, бюджет":"Textures — Streaming, Formats, Budget"} tag="textures">
              <LearnCard tabs={{
                "Суть":"Текстуры — самый большой потребитель VRAM. 4K текстура без компрессии = 64 MB. С BC7 компрессией = 8 MB. Texture streaming загружает только нужные mip-уровни — объекты вдали используют mip4 (маленький), близкие — mip0 (полный размер).",
                "Зачем":"GPU читает текстуры через texture cache. Если текстура не помещается в кэш — cache miss, GPU ждёт данных из VRAM (сотни циклов задержки). Mip maps снижают вероятность cache miss для далёких объектов. BC5 для normal maps вместо BC3 — хранит только RG, экономит 50% при том же качестве.",
                "На интервью":`Форматы: BC1 (DXT1) — RGB без альфы, 4 bpp. BC3 (DXT5) — RGBA, 8 bpp. BC5 — только RG, идеален для normal maps (Z восстанавливается в шейдере: z=sqrt(1-x²-y²)). BC7 — высококачественный RGBA. ASTC — мобильные. Texture streaming pool: r.Streaming.PoolSize. Overflow в логах — критичный сигнал, текстуры начнут загружаться в низком разрешении.`
              }}/>
              <TextureOptimization/>
            </Section>
          <Section title={lang==='ru'?"Overdraw — fillrate bottleneck":"Overdraw — Fillrate Bottleneck"} tag="overdraw"><OverdrawSection/></Section>
        </>)}

        {active==="materials"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.purple,letterSpacing:3,marginBottom:4}}>МОДУЛЬ · МАТЕРИАЛЫ</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>Материалы и PBR</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>PBR теория, Material Graph, Instances, Functions, WPO.</p></div>
          <Section title={lang==='ru'?"PBR Playground — интерактивный материал":"PBR Playground — Interactive Material"} tag="★ pbr">
            <LearnCard tabs={{"Суть":"PBR (Physically Based Rendering) — материалы основанные на физике. Два ключевых параметра: Metallic (металл или диэлектрик) и Roughness (гладкость поверхности). Всё остальное вытекает из физических уравнений.","Energy Conservation":"Поверхность не может излучать больше света чем получает. Если много diffuse — мало specular и наоборот. Metallic=1 убирает diffuse полностью — все фотоны уходят в specular (металл не рассеивает).","На интервью":"Metallic workflow: 0=диэлектрик (дерево, камень, кожа), 1=металл (золото, железо). Промежуточных значений нет в природе. F0 (base reflectance): диэлектрики ≈ 0.04 (4%), металлы = albedo color. Fresnel — всё отражает под острым углом (grazing angle)."}}/><PBRPlayground/></Section>
          <Section title={lang==='ru'?"Material Graph и компиляция в HLSL":"Material Graph & Compilation to HLSL"} tag="material graph"><LearnCard tabs={{"Суть":"Material Graph в UE5 — визуальный редактор HLSL шейдеров. Каждый нод = операция. При сохранении UE компилирует граф в HLSL код который можно посмотреть через Window → HLSL Code.","Material Instance":"Instance наследует граф родителя и меняет только exposed параметры. Нет перекомпиляции шейдера — только обновление constant buffer. Dynamic Material Instance (DMI) позволяет менять параметры в рантайме из Blueprint.","На интервью":"Material Function = reusable subgraph. WPO (World Position Offset) = смещение вершин в Vertex Shader — ветер, вода, разрушения. Custom HLSL нод — вставка кода напрямую. Layered Materials: LandscapeLayerBlend нод для террейна."}}/><MaterialGraph/></Section>
        </>)}

        {active==="lighting"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.yellow,letterSpacing:3,marginBottom:4}}>МОДУЛЬ · ОСВЕЩЕНИЕ</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>Теория освещения</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>Direct lighting, GI, IBL, Spherical Harmonics, Shadow Maps, типы источников.</p></div>
          <Section title={lang==='ru'?"Direct Lighting · Indirect · Типы источников · Тени":"Direct · Indirect · Light Types · Shadows"} tag="lighting"><LearnCard tabs={{"Суть":"Освещение = Direct (прямой свет от источника) + Indirect (отражённый, GI). Direct считается аналитически (Lambert, PBR). Indirect — либо запечённый (lightmaps), либо динамический (Lumen, SSAO, IBL).","Spherical Harmonics":"SH — способ хранить low-frequency освещение с любого направления в нескольких коэффициентах. L1 SH = 4 числа, L2 = 9 чисел. Lumen использует SH для ambient GI. Sample в шейдере = одна dot product операция.","На интервью":"IBL: diffuse IBL = convolved cubemap (все направления смешаны). Specular IBL = mip уровни по roughness + BRDF LUT. Split-sum approximation в UE5. Shadow Maps: рендер сцены от источника → depth texture → сравнение при основном рендере."}}/><LightingTheory/></Section>
        </>)}

        
        
        
        {active==="cpp"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.orange,letterSpacing:3,marginBottom:4}}>{T[lang].mods.cpp||"МОДУЛЬ — C++"}</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>{T[lang].tabs.cpp||"C++ в Unreal"}</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{T[lang].modDesc.cpp||"UObject система, макросы, архитектура проекта, GC, делегаты, паттерны чтения кода."}</p></div>
          <Section title={lang==='ru'?"UObject Система — макросы и рефлексия":"UObject System — Macros & Reflection"} tag="★ core">
            <LearnCard tabs={{"Суть":"UE5 C++ строится вокруг системы рефлексии — способности кода описывать сам себя. Макросы UCLASS/UPROPERTY/UFUNCTION обрабатываются Unreal Header Tool (UHT) и генерируют C++ код рефлексии. Это основа Blueprint, GC, сериализации, редактора.","Аналогия":"Без рефлексии: ты пишешь функцию — только ты знаешь что она существует. С рефлексией (UFUNCTION): движок знает о функции, может показать её в Blueprint, вызвать по строке имени, сериализовать. UCLASS — это как заполнить анкету о своём классе для движка.","На интервью":"UHT (Unreal Header Tool) парсит .h перед компиляцией → генерирует .generated.h. GENERATED_BODY() вставляет этот код. Порядок: #include MyClass.generated.h ВСЕГДА последний. Naming: U=UObject, A=Actor, F=Struct, E=Enum, I=Interface, T=Template, b=bool."}}
            tabsEn={{"Core Idea":"UE5 C++ is built around reflection — code's ability to describe itself. UCLASS/<b style='color:#ff7a45'>UPROPERTY</b>/UFUNCTION macros are processed by UHT and generate reflection C++ code. Foundation of Blueprint, GC, serialization, editor.","Analogy":"Without reflection: you write a function — only you know it exists. With reflection (UFUNCTION): engine knows about it, can show in Blueprint, call by name string, serialize. UCLASS — like filling out a form about your class for the engine.","In Interview":"UHT (<b style='color:#00c8ff'>Unreal Header Tool</b>) parses .h before compile → generates .generated.h. GENERATED_BODY() inserts this code. Order: #include MyClass.generated.h <b style='color:#ff5566'>ALWAYS last</b>. Naming: U=UObject, A=Actor, F=Struct, E=Enum, I=Interface, T=Template, b=bool."}}/>
            <UObjectSystemSection/>
          </Section>
          <Section title={lang==='ru'?"Архитектура проекта — Source, Modules, Build.cs":"Project Architecture — Source, Modules, Build.cs"} tag="★ architecture">
            <LearnCard tabs={{"Суть":"UE5 проект состоит из Модулей. Каждый модуль = независимая единица компиляции с явными зависимостями в Build.cs. Primary Game Module — основной. Editor Module — только для редактора, не шиппится. Plugins — независимые пакеты с собственными модулями.","Зачем":"Модули ускоряют компиляцию (изменение в одном модуле не компилирует весь проект), обеспечивают изоляцию (Editor код не попадает в шипованную игру), позволяют переиспользование (плагин между проектами).","На интервью":"Source/ProjectName/ProjectName.Build.cs: PublicDependencyModuleNames (Core, CoreUObject, Engine) и PrivateDependencyModuleNames (UMG, Slate). Добавить модуль = добавить строку в Build.cs. Editor-only: if(Target.bBuildEditor) { PrivateDependency.Add(UnrealEd); }."}}
            tabsEn={{"Core Idea":"UE5 project consists of Modules. Each module = independent compilation unit with explicit dependencies in Build.cs. Primary Game Module — main. Editor Module — editor-only, not shipped. Plugins — independent packages with own modules.","Why":"Modules speed up compilation (change in one module doesn't recompile whole project), ensure isolation (editor code doesn't ship with game), allow reuse (plugin across projects).","In Interview":"Source/ProjectName/ProjectName.Build.cs: PublicDependencyModuleNames (Core, CoreUObject, Engine) and PrivateDependencyModuleNames (UMG, Slate). Add module = add line to Build.cs. Editor-only: if(Target.bBuildEditor) { PrivateDependency.Add(UnrealEd); }."}}/>
            <ProjectArchitectureSection/>
          </Section>
          <Section title={lang==='ru'?"Иерархия классов — кто за что отвечает":"Class Hierarchy — Who Does What"} tag="★ hierarchy">
            <LearnCard tabs={{"Суть":"UObject — база всего. AActor — объект в мире. ACharacter — персонаж. GameMode — правила, только сервер. GameState — состояние игры для всех. PlayerState — данные одного игрока. GameInstance — данные сессии. Знание кто за что — ключ к чтению любого UE5 кода.","Аналогия":"GameMode = режиссёр (правила съёмки). GameState = доска объявлений (все видят). PlayerState = карточка актёра (данные конкретного). PlayerController = рация между актёром и режиссёром. Character = сам актёр. GameInstance = продюсер (над всем, всегда жив).","На интервью":"Доступ: GetWorld()->GetAuthGameMode() (только сервер), GetGameState<T>() (все), GetPlayerState<T>() (из Pawn). GameInstance: GetGameInstance(). Subsystem вместо Singleton: GetGameInstance()->GetSubsystem<T>(). GameMode не реплицируется — данные для всех храни в GameState."}}
            tabsEn={{"Core Idea":"UObject — base of everything. AActor — world object. ACharacter — character. GameMode — rules, <b style='color:#ff7a45'>server only</b>. GameState — game state for everyone. PlayerState — one player's data. GameInstance — session data. Knowing who does what is key to reading any UE5 code.","Analogy":"GameMode = director (filming rules). GameState = notice board (everyone sees). PlayerState = actor's card (specific data). PlayerController = walkie-talkie between actor and director. Character = actor themselves. GameInstance = producer (over everything, always alive).","In Interview":"Access: GetWorld()->GetAuthGameMode() (<b style='color:#ff7a45'>server only</b>), GetGameState<T>() (all), GetPlayerState<T>() (from Pawn). GameInstance: GetGameInstance(). Subsystem instead of Singleton: GetGameInstance()->GetSubsystem<T>(). GameMode not replicated — store data for all in GameState."}}/>
            <UObjectHierarchySection/>
          </Section>
          <Section title={lang==='ru'?"Garbage Collection и умные указатели":"Garbage Collection & Smart Pointers"} tag="gc">
            <LearnCard tabs={{"Суть":"UE5 GC отслеживает UObject через граф UPROPERTY указателей. Если на объект нет ни одного UPROPERTY — GC собирает. Для non-UObject классов: TSharedPtr/TUniquePtr (аналоги std::shared_ptr/unique_ptr). TWeakObjectPtr — слабый указатель на UObject без предотвращения сборки.","Ошибки":"Типичные краши: raw UObject* без UPROPERTY → GC собрал → dangling pointer. Не проверил IsValid() у TWeakObjectPtr → объект уже собран. Circular UPROPERTY ссылки → объекты не собираются (утечка). Удалил UObject через delete вместо MarkPendingKill.","На интервью":"TObjectPtr<T> в UPROPERTY — основной тип. TWeakObjectPtr<T> — слабый, проверяй IsValid(). Без UPROPERTY на UObject* — GC не видит. AddToRoot() защищает от GC (например глобальные менеджеры). ConditionalBeginDestroy() или MarkPendingKill() для явного удаления."}}
            tabsEn={{"Core Idea":"UE5 GC tracks UObject through <b style='color:#ff7a45'>UPROPERTY</b> pointer graph. If no <b style='color:#ff7a45'>UPROPERTY</b> references object — GC collects it. For non-UObject classes: TSharedPtr/TUniquePtr (like std::shared_ptr/unique_ptr). TWeakObjectPtr — weak pointer to UObject without preventing collection.","Mistakes":"Typical <b style='color:#ff5566'>crash</b>es: raw UObject* without <b style='color:#ff7a45'>UPROPERTY</b> → GC collected → <b style='color:#ff5566'>dangling pointer</b>. Didn't check <b style='color:#ffc234'>IsValid()</b> on TWeakObjectPtr → object already collected. Circular <b style='color:#ff7a45'>UPROPERTY</b> refs → objects not collected (leak). Deleted UObject via delete instead of MarkPendingKill.","In Interview":"TObjectPtr<T> in <b style='color:#ff7a45'>UPROPERTY</b> — primary type. TWeakObjectPtr<T> — weak, check <b style='color:#ffc234'>IsValid()</b>. Without <b style='color:#ff7a45'>UPROPERTY</b> on UObject* — GC doesn't see it. AddToRoot() protects from GC (e.g., global managers). ConditionalBeginDestroy() or MarkPendingKill() for explicit deletion."}}/>
            <GarbageCollectionSection/>
          </Section>
          <Section title={lang==='ru'?"Делегаты — события и callbacks":"Delegates — Events & Callbacks"} tag="delegates">
            <LearnCard tabs={{"Суть":"Делегаты — типобезопасные функциональные указатели. Multicast делегат = список подписчиков. Dynamic = UPROPERTY-compatible (Blueprint видит). DECLARE_DYNAMIC_MULTICAST_DELEGATE = BlueprintAssignable событие в Blueprint.","Зачем":"Делегаты решают проблему loose coupling: HealthComponent не знает о HealthWidget. Он просто бродкастит OnHealthChanged, кто подписан — тот реагирует. Никаких прямых зависимостей, никаких Cast между несвязанными системами.","На интервью":"AddDynamic требует UFUNCTION у подписчика. RemoveAll(this) в Destruct — обязательно. Для Blueprint-visible событий: DECLARE_DYNAMIC_MULTICAST_DELEGATE + UPROPERTY(BlueprintAssignable). Для pure C++: DECLARE_MULTICAST_DELEGATE + AddUObject(this, &Handler). AddUObject автоматически проверяет валидность UObject."}}
            tabsEn={{"Core Idea":"Delegates — type-safe function pointers. Multicast delegate = subscriber list. Dynamic = <b style='color:#ff7a45'>UPROPERTY</b>-compatible (Blueprint sees). DECLARE_DYNAMIC_MULTICAST_DELEGATE = <b style='color:#c084fc'>BlueprintAssignable</b> event in Blueprint.","Why":"Delegates solve loose coupling: HealthComponent doesn't know about HealthWidget. It just broadcasts OnHealthChanged, whoever subscribed reacts. No direct dependencies, no Cast between unrelated systems.","In Interview":"AddDynamic requires UFUNCTION on subscriber. <b style='color:#ff5566'>RemoveAll(this)</b> in Destruct — <b style='color:#ff5566'>mandatory</b>. For Blueprint-visible events: DECLARE_DYNAMIC_MULTICAST_DELEGATE + <b style='color:#ff7a45'>UPROPERTY</b>(<b style='color:#c084fc'>BlueprintAssignable</b>). For pure C++: DECLARE_MULTICAST_DELEGATE + AddUObject(this, &Handler). AddUObject automatically checks UObject validity."}}/>
            <DelegatesSection/>
          </Section>
          <Section title={lang==='ru'?"Как читать UE5 C++ код":"How to Read UE5 C++ Code"} tag="navigation">
            <LearnCard tabs={{"Суть":"Чтение чужого UE5 кода: начни с .h файла (контракт, интерфейс), ищи UPROPERTY с EditAnywhere (настройки), UFUNCTION BlueprintCallable (API), virtual функции (точки расширения). Engine/Source/ — все исходники движка, читай как документацию.","Инструменты":"Rider (рекомендуется): Ctrl+T — Go to Class, F12 — Go to Definition, Shift+F12 — Find Usages. Установи Engine Source через Epic Launcher → Engine → Options → Editor Symbols. Lyra Starter Game — официальный пример правильной архитектуры.","На интервью":"Как найти что делает ACharacter::Jump(): F12 → GameFramework/Character.h, потом Character.cpp. Как найти все использования: Shift+F12. Grep по Engine/Source: grep -r 'FunctionName' --include='*.h'. UE_LOG для отладки. GEngine->AddOnScreenDebugMessage для runtime print."}}
            tabsEn={{"Core Idea":"Reading unfamiliar UE5 code: start with .h file (contract, interface), find <b style='color:#ff7a45'>UPROPERTY</b> with EditAnywhere (settings), UFUNCTION BlueprintCallable (API), virtual functions (extension points). <b style='color:#ffc234'>Engine/Source/</b> — all engine sources, read like documentation.","Tools":"Rider (recommended): Ctrl+T — Go to Class, F12 — Go to Definition, Shift+F12 — Find Usages. Install Engine Source via Epic Launcher → Engine → Options → Editor Symbols. <b style='color:#00c8ff'>Lyra Starter Game</b> — official correct architecture example.","In Interview":"Find what ACharacter::Jump() does: F12 → GameFramework/Character.h, then Character.cpp. Find all usages: Shift+F12. Grep through Engine/Source: grep -r 'FunctionName' --include='*.h'. UE_LOG for debugging. GEngine->AddOnScreenDebugMessage for runtime print."}}/>
            <CodeNavigationSection/>
          </Section>
          <Section title={lang==='ru'?"Паттерны кода — Actor/Component, Interface, Subsystem, DataAsset":"Code Patterns — Actor/Component, Interface, Subsystem, DataAsset"} tag="patterns">
            <LearnCard tabs={{"Суть":"4 паттерна которые решают 80% задач архитектуры UE5: Actor+Component (декомпозиция), Interface (полиморфизм без зависимостей), Subsystem (глобальный менеджер), DataAsset (конфигурация без хардкода). Lyra Starter Game использует все четыре.","Зачем":"Без этих паттернов: монолитный ACharacter на 5000 строк, Cast() везде, хардкод цифр, Singleton-ы. С паттернами: каждый компонент < 300 строк, нет прямых зависимостей, дизайнер меняет баланс в DataAsset без программиста.","На интервью":"Component > Inheritance: AbilityComponent + HealthComponent + InventoryComponent лучше чем ABigCharacter. Interface для взаимодействия без Cast. Subsystem вместо Singleton (GetSubsystem<T>() безопасно, нет глобального состояния). DataAsset: наследуй от UPrimaryDataAsset для Asset Manager integration."}}
            tabsEn={{"Core Idea":"4 patterns solving 80% of UE5 architecture tasks: Actor+Component (decomposition), Interface (polymorphism without dependencies), Subsystem (global manager), DataAsset (config without hardcoding). <b style='color:#00c8ff'>Lyra Starter Game</b> uses all four.","Why":"Without patterns: monolithic ACharacter with 5000 lines, Cast() everywhere, hardcoded numbers, Singletons. With patterns: each component < 300 lines, <b style='color:#3dff90'>no direct dependencies</b>, designer changes balance in DataAsset <b style='color:#3dff90'>without programmer</b>.","In Interview":"<b style='color:#3dff90'>Component > Inheritance</b>: AbilityComponent + HealthComponent + InventoryComponent better than ABigCharacter. Interface for interaction without Cast. Subsystem instead of Singleton (GetSubsystem<T>() safe, <b style='color:#3dff90'>no global state</b>). DataAsset: inherit from UPrimaryDataAsset for Asset Manager integration."}}/>
            <CommonCppPatterns/>
          </Section>
        </>)}

        {active==="ui"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.purple,letterSpacing:3,marginBottom:4}}>{T[lang].mods.ui||"МОДУЛЬ — UI"}</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>{T[lang].tabs.ui||"UMG / UI Tech"}</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{T[lang].modDesc.ui||"UMG, Slate, MVVM, Invalidation, Retainer, List Virtualization, материалы."}</p></div>
          <Section title={lang==='ru'?"UMG vs Slate — архитектура и выбор":"UMG vs Slate — Architecture & Choice"} tag="architecture">
            <LearnCard tabs={{"Суть":"UMG (Unreal Motion Graphics) — визуальный редактор виджетов на основе Slate. Slate — нативный C++ UI фреймворк движка. UMG компилируется в Slate виджеты. Для игрового UI — UMG. Для кастомных Editor инструментов — Slate.","Аналогия":"UMG как Material Graph — визуально и удобно. Slate как HLSL — полный контроль но только код. Под капотом и то и другое одинаково: Material Graph компилируется в HLSL, UMG компилируется в Slate.","На интервью":"UMG Widget → TakeWidget() → SWidget (Slate). UButton внутри — SButton. Когда использовать Slate: кастомный Editor инструмент, SDetailView для property editing, компоненты которых нет в UMG. UMG bindings = Slate Attributes с делегатами под капотом."}}
            tabsEn={{"Core Idea":"UMG (Unreal Motion Graphics) — visual widget editor based on Slate. Slate — native C++ UI framework. UMG compiles to Slate widgets. Game UI → UMG. Custom Editor tools → Slate.","Analogy":"UMG like Material Graph — visual and convenient. Slate like HLSL — full control but code only. Under the hood both are the same: Material Graph compiles to HLSL, UMG compiles to Slate.","In Interview":"UMG Widget → TakeWidget() → SWidget (Slate). UButton inside — SButton. When to use Slate: custom Editor tool, SDetailView for property editing, components not in UMG. UMG bindings = Slate Attributes with delegates."}}/>
            <UMGvsSlate/>
          </Section>
          <Section title={lang==='ru'?"Widget Lifecycle — жизненный цикл виджета":"Widget Lifecycle"} tag="★ lifecycle">
            <LearnCard tabs={{"Суть":"Виджет проходит: PreConstruct (editor preview) → Construct (init) → Tick (per frame, если включён) → OnPaint (draw) → Destruct (cleanup). Каждый этап имеет C++ override и Blueprint аналог.","Ошибки":"Частые ошибки: подписка на делегат в Construct без отписки в Destruct = утечка памяти. Логика в Tick без проверки изменений = ненужные обновления. Тяжёлые операции в OnPaint = лаг каждый кадр.","На интервью":"NativeConstruct/Destruct — аналоги BeginPlay/EndPlay. bCanEverTick=true включает NativeTick — ДОРОГО при многих виджетах. OnPaint для кастомной отрисовки (линии, дуги, debug). Всегда очищай делегаты в NativeDestruct."}}
            tabsEn={{"Core Idea":"Widget goes through: PreConstruct (editor preview) → Construct (init) → Tick (per frame, if enabled) → OnPaint (draw) → Destruct (cleanup). Each stage has C++ override and Blueprint equivalent.","Mistakes":"Common mistakes: subscribing to delegate in Construct without unsubscribing in Destruct = memory leak. Logic in Tick without change check = unnecessary updates. Heavy operations in OnPaint = lag every frame.","In Interview":"NativeConstruct/Destruct — like BeginPlay/EndPlay. bCanEverTick=true enables NativeTick — <b style='color:#ff5566'>EXPENSIVE</b> with many widgets. OnPaint for custom drawing (lines, arcs, debug). <b style='color:#3dff90'>Always</b> clear delegates in NativeDestruct."}}/>
            <WidgetLifecycle/>
          </Section>
          <Section title={lang==='ru'?"MVVM — архитектурный паттерн":"MVVM — Architectural Pattern"} tag="★ mvvm">
            <LearnCard tabs={{"Суть":"MVVM разделяет: Model (данные игры), ViewModel (трансформированные данные для UI), View (виджет). ViewModel уведомляет View через FieldNotify. View не знает об игровой логике — только отображает.","Зачем":"Без MVVM: виджет напрямую обращается к PlayerState, GameMode, GameInstance — тесная связь. С MVVM: виджет подписан на ViewModel, ViewModel подписан на игровую логику. Замени PlayerState — виджет не изменится.","На интервью":"UE5 MVVM плагин: UMVVMViewModelBase базовый класс. UPROPERTY(FieldNotify) — свойство которое уведомляет View при изменении. UE_MVVM_BROADCAST_FIELD_VALUE_CHANGED(PropName). Binding в UMG: Bind → ViewModel → PropertyName. One-Way (VM→View) или Two-Way (VM↔View)."}}
            tabsEn={{"Core Idea":"MVVM separates: Model (game data), ViewModel (transformed data for UI), View (widget). ViewModel notifies View via <b style='color:#00c8ff'>FieldNotify</b>. View doesn't know about game logic — only displays.","Why":"Without MVVM: widget directly accesses PlayerState, GameMode, GameInstance — tight coupling. With MVVM: widget subscribes to ViewModel, ViewModel subscribes to game logic. Replace PlayerState — widget unchanged.","In Interview":"UE5 MVVM plugin: UMVVMViewModelBase base class. <b style='color:#ff7a45'>UPROPERTY</b>(<b style='color:#00c8ff'>FieldNotify</b>) — property that notifies View on change. UE_MVVM_BROADCAST_FIELD_VALUE_CHANGED(PropName). Binding in UMG: Bind → ViewModel → PropertyName. One-Way (VM→View) or Two-Way (VM↔View)."}}/>
            <MVVMSection/>
          </Section>
          <Section title={lang==='ru'?"Invalidation — система перерисовки":"Invalidation — Redraw System"} tag="invalidation">
            <LearnCard tabs={{"Суть":"UMG не перерисовывает все виджеты каждый кадр. Виджет помечается как 'dirty' → в следующем кадре перерисовывается. Invalidation Box кэширует поддерево: рендерит в RT, переиспользует до явной инвалидации.","Зачем":"Перерисовка дорогая. Layout recalculation = пересчёт позиции каждого виджета в дереве. Если 100 виджетов инвалидируются каждый кадр — 100 layout пересчётов. Invalidation Box = рендерим один раз, используем много раз.","На интервью":"Типы инвалидации: Layout (дороже, меняется размер), Paint (дешевле, меняется цвет). Volatile виджет = перерисовывается каждый кадр. Частые ошибки: SetText в Tick без проверки изменения. SetBrush каждый кадр. Избегай создания/удаления виджетов в Tick."}}
            tabsEn={{"Core Idea":"UMG doesn't redraw all widgets every frame. Widget marked as 'dirty' → redrawn next frame. Invalidation Box caches subtree: renders to RT, reuses until explicitly invalidated.","Why":"Redrawing is expensive. <b style='color:#ff7a45'>Layout</b> recalculation = recalculate every widget's position in the tree. If 100 widgets invalidate every frame — 100 layout recalculations. Invalidation Box = render once, use many times.","In Interview":"Invalidation types: <b style='color:#ff7a45'>Layout</b> (expensive, size changes), Paint (<b style='color:#3dff90'>cheaper</b>, color changes). Volatile widget = redraws every frame. Common mistakes: SetText in Tick without change check. SetBrush every frame. Avoid creating/removing widgets in Tick."}}/>
            <InvalidationSection/>
          </Section>
          <Section title={lang==='ru'?"Retainer Box — кэш рендера":"Retainer Box — Render Cache"} tag="★ retainer">
            <LearnCard tabs={{"Суть":"Retainer Box рендерит своих детей в Render Target, потом рисует этот RT как один quad с опциональным Material. Экономит время на повторном рендеринге если содержимое не изменилось.","Аналогия":"Retainer как screenshot части экрана: делаешь снимок, показываешь снимок пока ничего не изменилось, обновляешь снимок при изменении. Один тяжёлый рендер вместо повторения каждый кадр.","На интервью":"RenderOnPhase(N): рендерить каждые N кадров — не каждый кадр. RenderOnInvalidation: только при изменении. Минусы: дополнительный VRAM, текст может быть нечётким, работает хуже для часто меняющегося контента. Retainer vs Render Target: Retainer = авто-управление в UMG дереве, RT = ручной контроль везде."}}
            tabsEn={{"Core Idea":"Retainer Box renders its children to a Render Target, then draws that RT as a single quad with optional Material. Saves time on repeated rendering if content hasn't changed.","Analogy":"Retainer like a screenshot of part of the screen: take snapshot, show snapshot while nothing changes, update snapshot on change. One heavy render instead of repeating every frame.","In Interview":"<b style='color:#00c8ff'>RenderOnPhase</b>(N): render every N frames — not every frame. <b style='color:#3dff90'>RenderOnInvalidation</b>: only on change. Downsides: extra VRAM, text may be blurry, worse for frequently changing content. Retainer vs Render Target: Retainer = auto-managed in UMG tree, RT = manual control everywhere."}}/>
            <RetainerSection/>
          </Section>
          <Section title="List Virtualization — ListView vs ScrollBox" tag="★ perf">
            <LearnCard tabs={{"Суть":"ScrollBox создаёт ВСЕ виджеты — 1000 элементов = 1000 виджетов в памяти. ListView создаёт только видимые — ~15-20 виджетов независимо от размера списка. Виджеты переиспользуются при скролле.","Зачем":"Каждый виджет = память + Construct/Destruct вызовы + потенциальный Tick. 1000 виджетов в ScrollBox = 1000 × overhead. ListView recycling: при скролле старый виджет получает новые данные вместо удаления и создания нового.","На интервью":"ListView требует IUserObjectListEntry интерфейс. NativeOnListItemObjectSet() вызывается когда виджет получает новый объект данных. ClearListItems() + AddItem() для обновления. TileView = ListView для сеток. Правило: > 30 элементов → ListView."}}
            tabsEn={{"Core Idea":"ScrollBox creates <b style='color:#ff5566'>ALL widgets</b> — 1000 items = 1000 widgets in memory. ListView creates <b style='color:#3dff90'>only visible</b> — ~15-20 widgets regardless of list size. Widgets are recycled on scroll.","Why":"Each widget = memory + Construct/Destruct calls + potential Tick. 1000 widgets in ScrollBox = 1000 × <b style='color:#ff7a45'>overhead</b>. ListView recycling: on scroll, old widget receives new data instead of destroy + create.","In Interview":"ListView requires IUserObjectListEntry interface. NativeOnListItemObjectSet() called when widget receives new data object. ClearListItems() + AddItem() for updates. TileView = ListView for grids. Rule: > 30 items → ListView."}}/>
            <ListVirtualizationSection/>
          </Section>
          <Section title={lang==='ru'?"Материалы в UI — шейдеры для UMG":"Materials in UI — UMG Shaders"} tag="shaders">
            <LearnCard tabs={{"Суть":"UI Material = Material с Domain: User Interface. Применяется к Brush виджета или к Retainer Box. Может читать параметры виджета, Time, SceneColor (ограниченно). НЕ имеет доступа к World Position, GBuffer, нормалям меша.","Зачем":"Шейдеры в UI позволяют: анимированные фоны без Blueprint Tick, кастомные progress bar с glow, blur эффекты через Retainer, десатурация/highlight конкретного элемента, gradient overlays.","На интервью":"Domain: User Interface — обязательно. Outline вокруг объекта инвентаря: Custom Stencil на Icon виджет → PP Material читает Stencil → рисует outline. Desaturation: MaterialParameter → Desaturation нод в Material → SetScalarParameterValue из BP. Дорогой шейдер в UI = применяй Retainer."}}
            tabsEn={{"Core Idea":"UI Material = Material with Domain: User Interface. Applied to widget Brush or Retainer Box. Can read widget parameters, Time, SceneColor (limited). NO access to World Position, GBuffer, mesh normals.","Why":"Shaders in UI enable: animated backgrounds without Blueprint Tick, custom progress bars with glow, blur via Retainer, desaturation/highlight of specific element, gradient overlays.","In Interview":"Domain: User Interface — <b style='color:#ff7a45'>required</b>. Outline around inventory object: Custom Stencil on Icon widget → PP Material reads Stencil → draws outline. Desaturation: MaterialParameter → Desaturation node in Material → SetScalarParameterValue from BP. Expensive shader in UI → use Retainer."}}/>
            <UIShaderSection/>
          </Section>
          <Section title={lang==='ru'?"Оптимизация UI — причины лагов, инструменты, решения":"UI Optimization — Lag Causes, Tools, Fixes"} tag="★ optimization">
            <LearnCard tabs={{"Суть":"UI лагает по 5 причинам: Tick в каждом виджете, избыточная инвалидация, слишком много draw calls, ScrollBox с тысячами элементов, дорогие шейдеры на большой площади. Диагностика: stat SlateUI → Widget Reflector → Unreal Insights.","Процесс":"1. stat SlateUI — найти общее время. 2. Widget Reflector — найти виджет-виновник. 3. stat SlateVerbose — разбить по классам. 4. Unreal Insights — детально по кадрам. 5. r.DumpBatches — анализ draw calls. Исправить найденное.","На интервью":"Топ оптимизаций: Tick → делегаты, ScrollBox → ListView, Invalidation Panel, merge материалов, Retainer с RenderOnPhase. Виджет Reflector — первый инструмент. stat SlateUI — в консоли. Widget Tick дешевле чем OnPaint каждый кадр — но лучше ни то ни другое."}}
            tabsEn={{"Core Idea":"UI lags from 5 reasons: Tick in every widget, excessive invalidation, too many draw calls, ScrollBox with <b style='color:#00c8ff'>thousands</b> of items, expensive shaders on large area. Diagnose: <b style='color:#00c8ff'>stat SlateUI</b> → <b style='color:#ffc234'>Widget Reflector</b> → Unreal Insights.","Process":"1. <b style='color:#00c8ff'>stat SlateUI</b> — find total time. 2. <b style='color:#ffc234'>Widget Reflector</b> — find offending widget. 3. stat SlateVerbose — break down by class. 4. Unreal Insights — detailed per frame. 5. r.DumpBatches — draw call analysis. Fix what you find.","In Interview":"Top optimizations: Tick → delegates, ScrollBox → ListView, Invalidation Panel, merge materials, Retainer with <b style='color:#00c8ff'>RenderOnPhase</b>. <b style='color:#ffc234'>Widget Reflector</b> — first tool. <b style='color:#00c8ff'>stat SlateUI</b> — in console. Widget Tick <b style='color:#3dff90'>cheaper</b> than OnPaint every frame — but neither is best."}}/>
            <UIOptimizationSection/>
          </Section>
          <Section title={lang==='ru'?"Паттерны событий · Данные для UI · Common UI · High Contrast":"Event Patterns · UI Data · Common UI · High Contrast"} tag="patterns">
            <UIEventPatternsSection/>
            <div style={{marginTop:16}}><CommonUISection/></div>
          </Section>
        </>)}

        {active==="vertex"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.green,letterSpacing:3,marginBottom:4}}>{T[lang].mods.vertex}</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>{T[lang].tabs.vertex}</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{T[lang].modDesc.vertex}</p></div>
          <Section title="World Position Offset (WPO)" tag="vs shader">
            <LearnCard tabs={{"Суть":"WPO — смещение вершин в Vertex Shader прямо в Material Graph. Без C++, без Blueprint. GPU двигает геометрию до растеризации. Результат: анимированные объекты без Skeletal Mesh и без CPU overhead.","Аналогия":"Обычный меш — статичная бумага. WPO — бумага которую трясёт ветер: форма меняется, но это тот же лист. Шейдер двигает каждую вершину по математической функции от времени и UV.","На интервью":"WPO подключается в World Position Offset вход Base Material. Использует Time (глобальное) и VertexColor.r как маску (корни дерева не двигаются). Ограничения: нет Nanite в UE5.0, collision не обновляется, тени ломаются."}}
            tabsEn={{"Core Idea":"WPO — vertex displacement in Vertex Shader directly in Material Graph. No C++, no Blueprint. GPU moves geometry before rasterization. Result: animated objects without Skeletal Mesh and CPU <b style='color:#ff7a45'>overhead</b>.","Analogy":"Regular mesh — static paper. WPO — paper blown by wind: shape changes but it's the same sheet. Shader moves each vertex by a math function of time and UV.","In Interview":"WPO connects to World Position Offset input of Base Material. Uses Time (global) and VertexColor.r as mask (tree roots don't move). Limits: no Nanite in UE5.0, collision not updated, shadows break."}}/>
            <WPOSection/>
          </Section>
          <Section title={lang==='ru'?"Vertex Color — 4 канала данных":"Vertex Color — 4 Data Channels"} tag="vertex data">
            <LearnCard tabs={{"Суть":"Vertex Color — 4 канала (RGBA) данных на каждую вершину. Хранится в меше, бесплатно по памяти. Запекается в DCC или рисуется в UE5 Mesh Paint. Читается в шейдере как обычная float4.","Зачем":"Vertex Color — универсальный носитель данных для шейдеров. Вместо 4 отдельных текстур-масок = один массив float4 уже в меше. Нет texture sample, нет UV lookup — просто интерполированное значение с вершины.","На интервью":"R: WPO маска (листья=1, корни=0). G: запечённый AO. B: blend между текстурами. A: произвольные данные. В HLSL: VertexColor.rgba. В UE5 Material Graph: Vertex Color нод. Запекается: Maya Vertex Color, Houdini Paint, UE Mesh Paint Mode."}}
            tabsEn={{"Core Idea":"Vertex Color — 4 channels (RGBA) of data per vertex. Stored in mesh, free memory. Baked in DCC or painted in UE5 Mesh Paint. Read in shader like regular float4.","Why":"Vertex Color — universal data carrier for shaders. Instead of 4 separate mask textures = one float4 array already in the mesh. No texture sample, no UV lookup — just interpolated per-vertex value.","In Interview":"R: WPO mask (leaves=1, roots=0). G: baked AO. B: texture blend. A: custom data. In HLSL: VertexColor.rgba. In UE5 Material Graph: Vertex Color node. Baked in: Maya Vertex Color, Houdini Paint, UE Mesh Paint Mode."}}/>
            <VertexColorSection/>
          </Section>
          <Section title="Vertex Animation Textures (VAT)" tag="advanced">
            <LearnCard tabs={{"Суть":"VAT — запечённая физическая симуляция в текстуру. Каждый пиксель хранит смещение вершины в конкретный кадр. Воспроизводится в Vertex Shader — GPU-driven, без CPU, без Skeletal Mesh.","Аналогия":"Представь зипрованный видеофайл разрушения здания. Каждый кадр — снимок положения каждого кирпича. Текстура = этот видеофайл, шейдер = плеер, кирпичи = вершины меша.","На интервью":"Текстура: X=вершина, Y=кадр. SampleLevel(posTex, float2(vertID/numVerts, frame/numFrames), 0) — в VS нет ddx/ddy. Преимущество: тысячи объектов за 1 draw call. Используется для: разрушения, ткань под ветром, толпа. Ограничение: нет blending анимаций, фиксированный vertex count."}}
            tabsEn={{"Core Idea":"VAT — baked physics simulation into a texture. Each pixel stores vertex offset at a specific frame. Played back in Vertex Shader — GPU-driven, no CPU, no Skeletal Mesh.","Analogy":"Think of a zipped video of a building collapsing. Each frame — a snapshot of every brick's position. Texture = that video file, shader = player, bricks = mesh vertices.","In Interview":"Texture: X=vertex, Y=frame. SampleLevel(posTex, float2(vertID/numVerts, frame/numFrames), 0) — VS has no ddx/ddy. Advantage: <b style='color:#00c8ff'>thousands</b> of objects in <b style='color:#3dff90'>1 draw call</b>. Used for: destruction, cloth in wind, crowds. Limit: no animation blending, fixed vertex count."}}/>
            <VATSection/>
          </Section>
          <Section title={lang==='ru'?"Skeletal Mesh — оптимизация и ограничения":"Skeletal Mesh — Optimization & Limits"} tag="skeletal">
            <LearnCard tabs={{"Суть":"Skeletal Mesh = Static Mesh + Skeleton (иерархия костей) + Skinning (привязка вершин к костям). CPU/GPU вычисляет финальную позицию каждой вершины = skinned position = base + blend(bones × weights).","Зачем":"Лимиты на кости существуют потому что skinning = умножение матриц per вершина per кость. 4 influences per vertex = 4 матричных умножения. На мобиле — строже из-за bandwidth и ALU.","На интервью":"LOD0: полный rig. LOD1-2: убираем twist/corrective кости. LOD3+: только major deformers. Physics Asset (PhAT) = collision примитивы на кости для ragdoll. Morph Target = BlendShape в Maya, дельта-позиции вершин."}}
            tabsEn={{"Core Idea":"Skeletal Mesh = Static Mesh + Skeleton (bone hierarchy) + Skinning (vertex-to-bone binding). CPU/GPU computes final vertex position = skinned = base + blend(bones × weights).","Why":"Bone limits exist because skinning = matrix multiplication per vertex per bone. 4 influences per vertex = 4 matrix multiplications. Stricter on mobile due to bandwidth and ALU.","In Interview":"LOD0: full rig. LOD1-2: remove twist/corrective bones. LOD3+: only major deformers. Physics Asset (PhAT) = collision primitives per bone for ragdoll. Morph Target = BlendShape in Maya, delta vertex positions."}}/>
            <SkeletalMeshSection/>
          </Section>
        </>)}


        {active==="effects"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.purple,letterSpacing:3,marginBottom:4}}>{T[lang].mods.effects}</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>{T[lang].tabs.effects}</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{T[lang].modDesc.effects}</p></div>
          <Section title={lang==='ru'?"Post-Process материалы и Screen Space эффекты":"Post-Process Materials & Screen Space Effects"} tag="★ pp">
            <LearnCard tabs={{"Суть":"Post-Process материал работает с финальным изображением в screen space. Читает G-Buffer (нормали, глубину, цвет) через SceneTexture ноды. Применяется через PostProcessVolume или Camera компонент в разных точках пайплайна.","Custom Depth":"Custom Depth — отдельный depth pass для выбранных объектов. Custom Stencil — 8-бит ID объекта. Комбинация позволяет создавать outline, highlight, X-ray без изменения материалов самих объектов.","На интервью":"Blendable Location: Before Tonemapping (HDR), After Tonemapping (LDR, финальный цвет). Outline алгоритм: render custom depth → dilate маска → subtract original → rim пиксели. SceneTexture:PostProcessInput0 — предыдущий PP pass для цепочки эффектов."}}
            tabsEn={{"Core Idea":"Post-Process material works on the final image in screen space. Reads G-Buffer (normals, depth, color) via SceneTexture nodes. Applied via PostProcessVolume or Camera component at various pipeline points.","Custom Depth":"Custom Depth — separate depth pass for selected objects. Custom Stencil — 8-bit object ID. Combination enables outline, highlight, X-ray without changing objects' own materials.","In Interview":"Blendable Location: Before Tonemapping (HDR), After Tonemapping (LDR, final color). Outline algorithm: render custom depth → dilate mask → subtract original → rim pixels. SceneTexture:PostProcessInput0 — previous PP pass for effect chains."}}/>
            <PostProcessSection/>
          </Section>
          <Section title="Niagara — CPU vs GPU Emitter" tag="★ niagara">
            <LearnCard tabs={{"Суть":"Niagara — система частиц UE5. CPU emitter: полный доступ к данным сцены, коллизия с физикой, ~10K частиц. GPU emitter: миллионы частиц, compute shader, нет сложной коллизии. Scratch Pad = кастомный HLSL модуль прямо в редакторе.","Аналогия":"CPU emitter как режиссёр: знает всё о сцене, принимает умные решения, но медленный. GPU emitter как массовка: тысячи людей которые делают простое движение одновременно, быстро но без индивидуальности.","На интервью":"System > Emitter > Module. Module = HLSL код в стеке. Spawn: один раз при рождении. Update: каждый тик. GPU emitter: spawn CPU-side, simulate GPU-side. ScratchPad Module: Map Get/Set параметры, полный HLSL доступ."}}
            tabsEn={{"Core Idea":"Niagara — UE5 particle system. CPU emitter: full scene data access, physics collision, ~10K particles. GPU emitter: millions of particles, compute shader, no complex collision. Scratch Pad = custom HLSL module directly in editor.","Analogy":"CPU emitter like a director: knows everything about the scene, makes smart decisions, but slow. GPU emitter like extras: <b style='color:#00c8ff'>thousands</b> of people doing simple movement simultaneously, fast but no individuality.","In Interview":"System > Emitter > Module. Module = HLSL code in stack. Spawn: once at birth. Update: every tick. GPU emitter: spawn CPU-side, simulate GPU-side. ScratchPad Module: Map Get/Set parameters, full HLSL access."}}/>
            <NiagaraSection/>
          </Section>
          <Section title={lang==='ru'?"Render Targets — процедурные текстуры и симуляции":"Render Targets — Procedural Textures & Simulations"} tag="rt">
            <LearnCard tabs={{"Суть":"Render Target — текстура куда GPU рендерит напрямую. Может быть входом материала в следующем кадре. Ping-pong паттерн: два RT переключаются — один читается, другой пишется, каждый кадр меняются ролями.","Аналогия":"Render Target как доска в классе: на ней пишут (GPU рендерит), потом эту доску фотографируют (используют как текстуру), потом снова пишут поверх. Ping-pong: две доски — пока на одной пишут, с другой читают фото.","На интервью":"Создаётся: Content Browser → Render Target. В Blueprint: Draw Material To Render Target (или через SceneCapture2D). Используется как TextureParameter в материале. Разрешение и формат выбираешь под задачу: R32f для depth симуляций, RGBA8 для цвета."}}
            tabsEn={{"Core Idea":"Render Target — texture GPU renders into directly. Can be a material input in the next frame. Ping-pong pattern: two RTs alternate — one read, one written, roles swap each frame.","Analogy":"Render Target like a classroom chalkboard: GPU writes on it, then it's photographed (used as texture), then written over again. Ping-pong: two boards — while one is being written, reading from the photo of the other.","In Interview":"Create: Content Browser → Render Target. In Blueprint: Draw Material To Render Target (or via SceneCapture2D). Used as TextureParameter in material. Choose resolution and format per task: R32f for depth simulations, RGBA8 for color."}}/>
            <RenderTargetSection/>
          </Section>
        </>)}

        {active==="mock"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.accent,letterSpacing:3,marginBottom:4}}>{T[lang].mods.mock}</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>{T[lang].tabs.mock}</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>{T[lang].modDesc.mock}</p></div>
          <Section title={lang==='ru'?"Вопросы — Game Studio уровень":"Questions — Advanced Level"} tag="★ practice" defaultOpen={true}><MockInterview/></Section>
        </>)}

        {active==="pipeline"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.green,letterSpacing:3,marginBottom:4}}>МОДУЛЬ 06 · ПРИОРИТЕТ #6</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>Pipeline / Tools</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>Python в UE5, EUW, валидация ассетов, Commandlets, Blueprint как TA-инструмент.</p></div>
          <Section title={lang==='ru'?"Python API — основные классы и методы":"Python API — Key Classes & Methods"} tag="★ ue5 python">
              <LearnCard tabs={{
                "Суть":"UE5 Python API — обёртка над C++ редактора. Работает в Editor (не в рантайме игры). Позволяет автоматизировать любые задачи: rename тысячи ассетов, проверить naming conventions, batch export, spawn акторов из CSV.",
                "Зачем":"TA пишет инструменты которые экономят время художников. Batch rename 500 текстур вручную = 2 часа. Python скрипт = 30 секунд. Asset validation при коммите через CI/CD = нет кривых ассетов в проекте. Это ключевая часть работы TA в больших командах.",
                "На интервью":`Основные классы: EditorAssetLibrary — load/save/rename/delete ассетов. AssetRegistryHelpers.get_asset_registry() → get_assets(filter) — поиск без загрузки в память (быстро). EditorLevelLibrary — spawn, get_all_level_actors. set_editor_property/get_editor_property — изменение любых настроек объекта. Запуск: Python консоль в редакторе или -ExecutePythonScript в headless режиме.`
              }}/>
              <PythonAPIRef/>
            </Section>
          <Section title={lang==='ru'?"Практические примеры — готовые скрипты":"Practical Examples — Ready-to-Use Scripts"} tag="examples"><PythonExamples/></Section>
          <Section title={lang==='ru'?"EUW · Blueprint инструменты · Commandlets":"EUW · Blueprint Tools · Commandlets"} tag="tools"><EUWSection/></Section>
          <Section title={lang==='ru'?"Blueprint как TA-инструмент":"Blueprint as TA Tool"} tag="bp"><BlueprintTATools/></Section>
        </>)}

        {active==="maya"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.accent,letterSpacing:3,marginBottom:4}}>МОДУЛЬ 07 · НИЗКИЙ ПРИОРИТЕТ</div><h1 style={{fontSize:28,fontWeight:700,margin:0,fontFamily:"system-ui,-apple-system,sans-serif",letterSpacing:-0.5}}>Maya / 3ds Max</h1><p style={{color:C.muted,fontSize:13,marginTop:6,fontFamily:"system-ui,-apple-system,sans-serif"}}>Python API — cmds vs PyMEL, основные операции. 3ds Max — pymxs.</p></div>
          <Section title={lang==='ru'?"Maya Python — API справочник":"Maya Python — API Reference"} tag="maya.cmds">
              <LearnCard tabs={{
                "Суть":"Maya Python API работает через модуль maya.cmds (прямые MEL команды) или PyMEL (объектно-ориентированная обёртка). cmds быстрее, PyMEL удобнее для сложной логики. Оба делают одно и то же — управляют сценой Maya.",
                "Аналогия":"cmds.getAttr('obj.tx') — как прямой вызов функции по имени. pm.PyNode('obj').tx.get() — как обращение к свойству объекта в ООП. Результат одинаковый, но PyMEL даёт autocomplete и методы объекта.",
                "На интервью":`cmds.ls(type='mesh') — список всех мешей. cmds.ls(selection=True) — выделенные объекты. Атрибуты: getAttr/setAttr. Экспорт FBX: cmds.file(path, exportSelected=True, type='FBX export', force=True). PyMEL: import pymel.core as pm — те же операции через объекты. pymxs для 3ds Max: import pymxs; rt = pymxs.runtime — аналог cmds для Max.`
              }}/>
              <MayaPythonRef/>
            </Section>
          <Section title={lang==='ru'?"Создание UI в Maya":"Creating UI in Maya"} tag="ui"><Code lang="python">{`import maya.cmds as cmds

# Простое окно с кнопкой
def on_click(*args):
    selected = cmds.ls(selection=True)
    for obj in selected:
        name = cmds.getAttr(obj + ".longName") if cmds.attributeQuery("longName", node=obj, exists=True) else obj
        cmds.rename(obj, "SM_" + name)

win = cmds.window(title="TA Tool", widthHeight=(300, 150))
cmds.columnLayout(adjustableColumn=True, rowSpacing=8)
cmds.text(label={lang==='ru'?"Добавляет префикс SM_ к выделенным мешам":"Adds SM_ prefix to selected meshes"})
cmds.separator(height=10)
cmds.button(label="Add SM_ Prefix", command=on_click, backgroundColor=(0.2, 0.5, 0.3))
cmds.showWindow(win)

# Более современный подход — через Qt (PySide2):
# from PySide2 import QtWidgets
# Это позволяет создавать полноценные Qt виджеты`}</Code></Section>
          <Section title={lang==='ru'?"Типичные задачи для TA в Maya":"Typical TA Tasks in Maya"} tag="tasks">
            <div style={{display:"grid",gap:8}}>
              {[
                {title:lang==='ru'?"Batch Export FBX":"Batch Export FBX",col:C.orange,code:`import maya.cmds as cmds, os
output_dir = "C:/export/"
meshes = cmds.ls(type='transform')
for mesh in meshes:
    cmds.select(mesh)
    path = os.path.join(output_dir, mesh + ".fbx")
    cmds.file(path, exportSelected=True,
              type='FBX export', force=True)
    print("Exported: " + mesh)`},
                {title:lang==='ru'?"Проверка нулевых трансформаций":"Check Zero Transforms",col:C.green,code:`import maya.cmds as cmds
issues = []
for obj in cmds.ls(type='transform'):
    t = cmds.xform(obj, q=True, translation=True, ws=True)
    r = cmds.xform(obj, q=True, rotation=True, ws=True)
    s = cmds.xform(obj, q=True, scale=True, ws=True)
    if any(abs(v) > 0.001 for v in t):
        issues.append(obj + ": non-zero translation")
    if s != [1.0, 1.0, 1.0]:
        issues.append(obj + ": non-unit scale")
for i in issues: print(i)`},
              ].map(({title,col,code})=>(<div key={title}><div style={{fontFamily:"monospace",fontSize:11,color:col,marginBottom:6}}>{title}</div><Code lang="python">{code}</Code></div>))}
            </div>
          </Section>
        </>)}
      </div>
    </div>
    </LangCtx.Provider>
  );
}
