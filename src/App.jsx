import { useState, useRef, useEffect } from "react";

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


function LearnCard({tabs}){
  const keys=Object.keys(tabs);
  const [active,setActive]=useState(keys[0]);
  const icons={"Суть":"🔍","Аналогия":"💡","На интервью":"🎯","Зачем":"❓","Как работает":"⚙","Ошибки":"⚠"};
  return(
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden",marginBottom:16}}>
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`}}>
        {keys.map(k=>(<button key={k} onClick={()=>setActive(k)} style={{flex:1,padding:"9px 8px",background:active===k?C.bg:"transparent",border:"none",borderBottom:active===k?`2px solid ${C.accent}`:"2px solid transparent",color:active===k?C.accent:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer",transition:"all 0.15s",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><span>{icons[k]||"·"}</span>{k}</button>))}
      </div>
      <div style={{padding:"16px 18px",fontSize:13,color:C.text,lineHeight:1.9,minHeight:80}}>
        {typeof tabs[active]==="string"
          ? <div dangerouslySetInnerHTML={{__html:tabs[active]}}/>
          : tabs[active]}
      </div>
    </div>
  );
}

function Section({title,tag,children,defaultOpen=true}){
  const [open,setOpen]=useState(defaultOpen);
  return(
    <div style={{marginBottom:20,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",background:C.surface,border:"none",padding:"13px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",color:C.text,fontFamily:"monospace",fontSize:13,fontWeight:700,borderBottom:open?`1px solid ${C.border}`:"none"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {tag&&<span style={{fontSize:10,color:C.muted,background:C.dim,padding:"2px 6px",borderRadius:4}}>{tag}</span>}
          {title}
        </div>
        <span style={{color:C.muted,fontSize:18,transform:open?"rotate(90deg)":"none",transition:"transform 0.2s",display:"inline-block"}}>›</span>
      </button>
      {open&&<div style={{padding:20,background:C.bg}}>{children}</div>}
    </div>
  );
}

function Code({children,lang="hlsl"}){
  const lines=children.trim().split("\n");
  return(
    <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",marginTop:8}}>
      <div style={{background:C.surface,padding:"5px 14px",borderBottom:`1px solid ${C.border}`,fontFamily:"monospace",fontSize:10,color:C.muted,letterSpacing:2}}>{lang.toUpperCase()}</div>
      <div style={{padding:"14px 16px",overflowX:"auto"}}>
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
      <div style={{fontSize:12,color:C.muted,lineHeight:1.8}}>{children}</div>
    </div>
  );
}

// ══ MODULE 1 — LINEAR ALGEBRA ══════════════════════════════════════════════
function DotProductViz(){
  const canvasRef=useRef(null);
  const [angle,setAngle]=useState(45);
  const rad=(angle*Math.PI)/180,dot=Math.cos(rad);
  const dotLabel=()=>{
    if(angle===0)return{text:"Параллельны (max)",col:C.green};
    if(angle===90)return{text:"Перпендикулярны",col:C.yellow};
    if(angle===180)return{text:"Противоположны",col:C.orange};
    if(angle<90)return{text:"Острый угол → свет попадает",col:C.accent};
    return{text:"Тупой угол → поверхность от света",col:C.muted};
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
          <div style={{color:C.muted,fontSize:10,marginBottom:6}}>ФОРМУЛА</div>
          <div><span style={{color:C.orange}}>A</span> · <span style={{color:C.accent}}>B</span> = |A||B|·<span style={{color:C.green}}>cos(θ)</span></div>
          <div style={{color:C.muted,marginTop:4,fontSize:11}}>= Ax·Bx + Ay·By + Az·Bz</div>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8,letterSpacing:1}}>ПРИМЕНЕНИЕ</div>
          {[{label:"Fresnel",desc:"dot(N,V) → свечение краёв",col:C.purple},{label:"Lambert",desc:"dot(N,L) → диффузный свет",col:C.yellow},{label:"Backface",desc:"dot(N,V) < 0 → задняя грань",col:C.muted}].map(({label,desc,col})=>(
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
          {showTBN?"▼ скрыть TBN":"▶ показать TBN-матрицу"}
        </button>
      </div>
      <div style={{flex:1,minWidth:200,display:"flex",flexDirection:"column",gap:12}}>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",fontFamily:"monospace",fontSize:12,lineHeight:2,color:C.text}}>
          <div style={{color:C.muted,fontSize:10,marginBottom:4}}>ФОРМУЛА</div>
          <div>A × B = (</div>
          <div style={{paddingLeft:12}}><span style={{color:C.orange}}>Ay·Bz - Az·By</span>,</div>
          <div style={{paddingLeft:12}}><span style={{color:C.accent}}>Az·Bx - Ax·Bz</span>,</div>
          <div style={{paddingLeft:12}}><span style={{color:C.green}}>Ax·By - Ay·Bx</span></div>
          <div>)</div>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>КЛЮЧЕВЫЕ СВОЙСТВА</div>
          {[{icon:"⊥",text:"Результат перпендикулярен обоим векторам",col:C.green},{icon:"≠",text:"A×B ≠ B×A — порядок меняет направление",col:C.orange},{icon:"□",text:"Длина = площадь параллелограмма A и B",col:C.accent}].map(({icon,text,col})=>(<div key={icon} style={{display:"flex",gap:8,marginBottom:8,alignItems:"flex-start"}}><span style={{color:col,fontFamily:"monospace",fontSize:14,flexShrink:0}}>{icon}</span><span style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{text}</span></div>))}
        </div>
      </div>
    </div>
  );
}

function SphereMaskViz(){
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
          <div style={{color:C.muted,fontSize:10,marginBottom:4}}>ФОРМУЛА (знать наизусть)</div>
          <div><span style={{color:C.green}}>result</span> = <span style={{color:C.orange}}>1</span> - <span style={{color:C.accent}}>saturate</span>(</div>
          <div style={{paddingLeft:12}}>( <span style={{color:C.green}}>length(A - B)</span> - Radius )</div>
          <div style={{paddingLeft:12}}>/ Hardness</div>
          <div>)</div>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",fontSize:12,lineHeight:1.8}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>ЧТО ДЕЛАЕТ КАЖДАЯ ЧАСТЬ</div>
          {[{part:"length(A-B)",desc:"расстояние от точки до центра",col:C.green},{part:"- Radius",desc:"внутри R → отрицательно, снаружи → положительно",col:C.accent},{part:"/ Hardness",desc:"размывает край (больше = мягче)",col:C.orange},{part:"saturate",desc:"клампит результат в [0, 1]",col:C.purple},{part:"1 - ...",desc:"инверт: внутри = 1, снаружи = 0",col:C.text}].map(({part,desc,col})=>(<div key={part} style={{display:"flex",gap:8,marginBottom:6}}><code style={{color:col,fontSize:11,background:col+"18",padding:"1px 5px",borderRadius:3,flexShrink:0,whiteSpace:"nowrap"}}>{part}</code><span style={{color:C.muted,fontSize:11}}>{desc}</span></div>))}
        </div>
      </div>
    </div>
  );
}

function CoordSpaces(){
  const spaces=[
    {name:"Model Space",short:"MS",col:C.orange,matrix:"× M",desc:"Вершины в координатах объекта (pivot = 0,0,0).",detail:"Так хранится меш в памяти. Позиции не зависят от положения объекта в мире."},
    {name:"World Space",short:"WS",col:C.yellow,matrix:"× V",desc:"После Model matrix. Все объекты в единой системе координат.",detail:"Model Matrix = TRS трансформация объекта. Позволяет размещать объекты в мире."},
    {name:"View Space",short:"VS",col:C.accent,matrix:"× P",desc:"Камера в начале координат, смотрит по -Z.",detail:"View Matrix = обратная трансформация камеры. Весь мир «едет» к камере."},
    {name:"Clip Space",short:"CS",col:C.green,matrix:"÷ w",desc:"После Projection matrix. Frustum culling здесь.",detail:"Projection matrix задаёт перспективу (frustum). Координаты в [-w, w]."},
    {name:"NDC",short:"NDC",col:C.purple,matrix:"Viewport",desc:"После деления на w. Диапазон [-1, 1] по всем осям.",detail:"Normalized Device Coordinates. Одинаковы для всех GPU."},
    {name:"Screen Space",short:"SCR",col:C.pink,matrix:"—",desc:"Пиксели на экране. Здесь работает pixel shader.",detail:"SV_Position в HLSL — это уже screen space."},
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
          <div style={{flex:1}}><div style={{color:spaces[active].col,fontFamily:"monospace",fontWeight:700,fontSize:16,marginBottom:4}}>{spaces[active].name}</div><div style={{color:C.text,fontSize:13,marginBottom:8}}>{spaces[active].desc}</div><div style={{color:C.muted,fontSize:12,lineHeight:1.6}}>{spaces[active].detail}</div>{spaces[active].matrix!=="—"&&<div style={{marginTop:10,display:"inline-block",background:"#111827",padding:"4px 10px",borderRadius:4,fontFamily:"monospace",fontSize:11,color:spaces[active].col}}>Следующий шаг: {spaces[active].matrix}</div>}</div>
        </div>
      </div>
    </div>
  );
}


function VectorBasics(){
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
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8,letterSpacing:1}}>ВЫЧИСЛЕНИЯ</div>
          {[
            {label:"Длина |A|",formula:`√(${vx}²+${vy}²)`,result:mag,col:C.orange},
            {label:"Нормализация A/|A|",formula:`(${vx}/${mag}, ${vy}/${mag})`,result:`(${nx}, ${ny})`,col:C.yellow},
            {label:"Проекция A→B",formula:`(A·B)/|B|`,result:proj.toFixed(3),col:C.green},
          ].map(({label,formula,result,col})=>(<div key={label} style={{marginBottom:10}}><div style={{fontSize:11,color:C.muted,marginBottom:2}}>{label}</div><div style={{fontFamily:"monospace",fontSize:11,color:C.dim,marginBottom:2}}>{formula}</div><div style={{fontFamily:"monospace",fontSize:13,color:col,fontWeight:700}}>= {result}</div></div>))}
        </div>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",fontSize:12,lineHeight:1.9}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>КЛЮЧЕВЫЕ ФОРМУЛЫ</div>
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
  const matrices={trs:{label:"TRS (combined)",m:T,col:C.accent,note:"T×R×S — порядок: Scale первым (правая часть применяется первой)"},translation:{label:"Translation",m:T,col:C.orange,note:"Смещение хранится в последнем столбце (column-major)"},rotation:{label:"Rotation Y",m:R,col:C.accent,note:"cos/sin на диагонали и антидиагонали. Нормаль к оси вращения"},scale:{label:"Scale X",m:S,col:C.green,note:"Масштаб на главной диагонали. Non-uniform scale ломает нормали"},identity:{label:"Identity",m:Identity,col:C.muted,note:"Нейтральный элемент умножения. M×I = M"}};
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
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>УМНОЖЕНИЕ МАТРИЦ</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.9}}>
            <div><span style={{color:C.red}}>НЕ коммутативно:</span> A×B ≠ B×A</div>
            <div><span style={{color:C.green}}>TRS порядок:</span> T × R × S</div>
            <div style={{fontSize:11,color:C.dim}}>Правая матрица применяется первой:</div>
            <div style={{fontFamily:"monospace",fontSize:11,color:C.text}}>v' = T×R×S × v</div>
            <div style={{fontSize:11,color:C.dim}}>→ сначала Scale, потом Rotate, потом Translate</div>
          </div>
        </div>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>ВАЖНЫЕ СВОЙСТВА</div>
          {[{t:"Обратная (Inverse)",d:"M × M⁻¹ = I. View Matrix = Inverse(Camera Transform)",c:C.accent},{t:"Транспонированная (Transpose)",d:"Строки↔Столбцы. Для ортогональных матриц: M⁻¹ = Mᵀ",c:C.yellow},{t:"Нормали: InvTranspose",d:"При non-uniform scale нормали искажаются. Нужна (M⁻¹)ᵀ",c:C.orange},{t:"Determinant = 0",d:"Матрица необратима — объект сплющен в плоскость",c:C.red}].map(({t,d,c})=>(<div key={t} style={{marginBottom:9}}><div style={{fontFamily:"monospace",fontSize:10,color:c}}>{t}</div><div style={{fontSize:11,color:C.muted}}>{d}</div></div>))}
        </div>
      </div>
    </div>
  );
}

function QuaternionExplainer(){
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
        <text x={110} y={100} textAnchor="middle" fill={C.red} fontSize={9} fontFamily="monospace">2 оси совпали</text>
        <text x={110} y={114} textAnchor="middle" fill={C.muted} fontSize={9} fontFamily="monospace">потеряна степень свободы</text>
      </>}
    </svg>
  );

  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <div>
        <GimbalViz/>
        <button onClick={()=>setShowGimbal(!showGimbal)} style={{marginTop:10,width:220,padding:"6px 0",background:showGimbal?C.red+"22":"transparent",border:`1px solid ${showGimbal?C.red:C.border}`,borderRadius:6,color:showGimbal?C.red:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{showGimbal?"▼ скрыть gimbal lock":"▶ показать gimbal lock"}</button>
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
          {[{prop:"Хранение",euler:"3 числа (pitch,yaw,roll)",quat:"4 числа (x,y,z,w)",bad:false},{prop:"Gimbal Lock",euler:"Да — при 90° теряется ось",quat:"Нет",bad:true},{prop:"Интерполяция",euler:"Lerp → артефакты",quat:"Slerp → правильно",bad:true},{prop:"Понятность",euler:"Интуитивно",quat:"Сложнее читать",bad:false},{prop:"В движке",euler:"Для UI/редактора",quat:"Внутри для вычислений",bad:false}].map(({prop,euler,quat,bad})=>(<div key={prop} style={{marginBottom:8,display:"grid",gridTemplateColumns:"90px 1fr 1fr",gap:6,fontSize:11}}><span style={{color:C.dim}}>{prop}</span><span style={{color:bad?C.red:C.muted}}>{euler}</span><span style={{color:bad?C.green:C.muted}}>{quat}</span></div>))}
        </div>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>SLERP vs LERP</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.8}}>
            <span style={{color:C.red}}>Lerp</span> кватернионов даёт неравномерную скорость вращения — объект «ускоряется» в середине.<br/>
            <span style={{color:C.green}}>Slerp</span> (Spherical Linear Interpolation) — интерполяция по дуге сферы. Равномерная скорость.<br/>
            <div style={{fontFamily:"monospace",fontSize:11,marginTop:6,color:C.text}}>q = slerp(q1, q2, t)</div>
            <div style={{fontSize:11,marginTop:4}}>Используй Slerp для анимации поворотов.</div>
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
        {[["reflect","Reflect вектор"],["plane","Уравнение плоскости"]].map(([k,l])=>(<button key={k} onClick={()=>setTab(k)} style={{background:tab===k?C.accent+"22":"transparent",border:`1px solid ${tab===k?C.accent:C.border}`,borderRadius:6,padding:"6px 12px",color:tab===k?C.accent:C.muted,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{l}</button>))}
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
              <text x={4} y={cy-4} fill={C.muted} fontSize={9} fontFamily="monospace">поверхность</text>
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
              <div style={{color:C.muted,fontSize:10,marginBottom:4}}>ФОРМУЛА</div>
              <div><span style={{color:C.green}}>R</span> = <span style={{color:C.orange}}>I</span> - 2·<span style={{color:C.accent}}>dot(I,N)</span>·<span style={{color:C.accent}}>N</span></div>
              <div style={{color:C.dim,fontSize:11}}>I должен быть нормализован</div>
              <div style={{marginTop:8,color:C.text}}>R = ({rx}, {ry2})</div>
            </div>
            <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px",fontSize:12,lineHeight:1.8}}>
              <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>ПРИМЕНЕНИЕ</div>
              {[{t:"Specular reflections",d:"reflect(viewDir, normal) → направление для cubemap sample"},
                {t:"Mirror surfaces",d:"Идеальное зеркало — reflect от нормали поверхности"},
                {t:"HLSL built-in",d:"reflect(I,N) — встроенная функция, одна инструкция GPU"}].map(({t,d})=>(<div key={t} style={{marginBottom:7}}><span style={{fontFamily:"monospace",fontSize:10,color:C.green}}>{t}</span><div style={{fontSize:11,color:C.muted}}>{d}</div></div>))}
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
              <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>ПРИМЕНЕНИЕ</div>
              {[{t:"Frustum Culling",d:"6 плоскостей frustum. Объект снаружи если dist < 0 для любой плоскости",c:C.accent},{t:"Clipping",d:"GPU clips треугольники по 6 плоскостям clip space",c:C.orange},{t:"Reflection plane",d:"Вода — отражение относительно плоскости поверхности",c:C.green},{t:"Portal rendering",d:"Портал = плоскость. Рендерим что за ней отдельно",c:C.purple}].map(({t,d,c})=>(<div key={t} style={{marginBottom:8}}><span style={{fontFamily:"monospace",fontSize:10,color:c}}>{t}</span><div style={{fontSize:11,color:C.muted}}>{d}</div></div>))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══ MODULE 2 — GPU vs CPU ══════════════════════════════════════════════════
function CoreDiagram(){
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
        <div style={{marginTop:8,fontFamily:"monospace",fontSize:11,color:C.orange}}>4–32 мощных ядра</div>
        <div style={{fontSize:11,color:C.muted,marginTop:2}}>Высокая частота, большой кэш,<br/>сложная логика управления</div>
      </div>
      <div style={{flex:1}}>
        <div style={{fontFamily:"monospace",fontSize:11,color:C.muted,marginBottom:8,letterSpacing:2}}>GPU</div>
        <svg width={"100%"} height={220} viewBox="0 0 400 220" style={{border:`1px solid ${C.border}`,borderRadius:8,background:C.bg,display:"block"}}>
          <rect x={4} y={4} width={392} height={212} rx={4} fill={C.surface} stroke={C.border} strokeWidth={1}/>
          <rect x={12} y={196} width={376} height={14} rx={2} fill={C.purple+"22"} stroke={C.purple+"44"} strokeWidth={1}/>
          <text x={200} y={207} textAnchor="middle" fill={C.purple} fontSize={8} fontFamily="monospace">VRAM Bus (wide bandwidth)</text>
          {gpuCores.map((c,i)=>(<g key={i} onMouseEnter={()=>setHover("gpu"+i)} onMouseLeave={()=>setHover(null)} style={{cursor:"pointer"}}><rect x={c.x} y={c.y} width={c.w} height={c.h} rx={2} fill={hover==="gpu"+i?C.accent+"55":C.accent+"20"} stroke={C.accent+(hover==="gpu"+i?"":"33")} strokeWidth={0.5}/>{hover==="gpu"+i&&<text x={c.x+c.w/2} y={c.y+11} textAnchor="middle" fill={C.accent} fontSize={6} fontFamily="monospace">SP</text>}</g>))}
          <text x={200} y={190} textAnchor="middle" fill={C.accent} fontSize={9} fontFamily="monospace">180+ Streaming Multiprocessors · тысячи Shader Processors</text>
        </svg>
        <div style={{marginTop:8,fontFamily:"monospace",fontSize:11,color:C.accent}}>1000+ маленьких ядер</div>
        <div style={{fontSize:11,color:C.muted,marginTop:2}}>Низкая частота, минимальный кэш,<br/>простая логика — но тысячи штук</div>
      </div>
    </div>
  );
}

function GPUPipeline(){
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
        {[{label:"Разрешение (%)",val:resScale,set:setResScale,min:25,max:200,col:C.accent,hint:"GPU-нагрузка растёт квадратично"},{label:"Draw Calls",val:drawCalls,set:setDrawCalls,min:1,max:100,col:C.orange,hint:"CPU-нагрузка"},{label:"Poly Count (%)",val:polyCount,set:setPolyCount,min:1,max:100,col:C.green,hint:"VS нагрузка на GPU"}].map(({label,val,set,min,max,col,hint})=>(<div key={label} style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:"monospace",fontSize:11,color:C.muted}}>{label}</span><span style={{fontFamily:"monospace",fontSize:11,color:col}}>{val}</span></div><input type="range" min={min} max={max} value={val} onChange={e=>set(Number(e.target.value))} style={{width:"100%",accentColor:col}}/><div style={{fontSize:10,color:C.dim,marginTop:2}}>{hint}</div></div>))}
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
  const [batched,setBatched]=useState(false);
  const objs=12,calls=batched?1:objs;
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <div style={{flex:1,minWidth:260}}>
        <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:10,letterSpacing:2}}>СЦЕНА ({objs} объектов)</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:12}}>
          {Array.from({length:objs},(_,i)=>i).map(i=>(<div key={i} style={{height:44,borderRadius:6,background:batched?C.green+"22":C.orange+"15",border:`1px solid ${batched?C.green+"55":C.orange+"33"}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:9,color:batched?C.green:C.orange,transition:"all 0.3s"}}>{batched?"batch":"obj "+i}</div>))}
        </div>
        <button onClick={()=>setBatched(!batched)} style={{width:"100%",padding:"8px 0",background:batched?C.green+"20":C.orange+"15",border:`1px solid ${batched?C.green:C.orange}`,borderRadius:6,color:batched?C.green:C.orange,fontFamily:"monospace",fontSize:11,cursor:"pointer"}}>{batched?"▼ Разбить (no batching)":"▲ Объединить (batching)"}</button>
      </div>
      <div style={{flex:1,minWidth:220}}>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 18px",marginBottom:12}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:4}}>DRAW CALLS</div>
          <div style={{fontFamily:"monospace",fontSize:40,fontWeight:700,color:batched?C.green:C.orange,transition:"color 0.3s"}}>{calls}</div>
          <div style={{fontSize:12,color:C.muted,marginTop:4}}>{batched?"Один вызов → GPU рисует всё":"Каждый объект = отдельный вызов"}</div>
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
  const types=[
    {t:"float",bits:"32",prec:"~7 знаков",use:"Позиции, нормали, любые расчёты",col:C.orange},
    {t:"float2/3/4",bits:"32×N",prec:"Вектор",use:"UV, RGB, позиции, нормали",col:C.orange},
    {t:"half",bits:"16",prec:"~3 знака",use:"Цвета, UV — экономия bandwidth",col:C.yellow},
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
  const fns=[
    {name:"dot(A,B)",ret:"float",desc:"Скалярное произведение. Основа lighting и Fresnel.",cat:"math"},
    {name:"cross(A,B)",ret:"float3",desc:"Векторное произведение. Нормали граней, TBN.",cat:"math"},
    {name:"normalize(V)",ret:"floatN",desc:"Нормализует вектор до единичной длины.",cat:"math"},
    {name:"length(V)",ret:"float",desc:"Длина вектора. Используй в Sphere Mask.",cat:"math"},
    {name:"reflect(I,N)",ret:"floatN",desc:"Вектор отражения для зеркал и specular.",cat:"math"},
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
            <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{desc}</div>
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
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>КАК РАБОТАЕТ</div>
          {["Normal map хранит векторы в Tangent Space (RGB → XYZ, [0,1] → [-1,1])","TBN матрица из Tangent (T), Bitangent (B), Normal (N)","Вектор из normal map × TBN → World Space нормаль","World нормаль используется для lighting вместо геометрической"].map((t,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:7}}><span style={{color:C.accent,fontFamily:"monospace",flexShrink:0}}>{i+1}.</span><span style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{t}</span></div>))}
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
  const [active,setActive]=useState(0);
  const buffers=[
    {name:"GBufferA",label:"World Normal",col:C.accent,
     desc:"RGB: нормаль поверхности в World Space после normal mapping. Alpha: shading model ID (Unlit=0, Default Lit=1, Subsurface=2...).",
     why:"Нужна для Lighting Pass — без нормали не посчитать diffuse/specular."},
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
  const stages=[
    {short:"DEPTH",name:"Depth PrePass (Early-Z)",col:C.muted,
     desc:"Рисует только depth, без цвета. Это позволяет Lighting Pass пропускать скрытые пиксели (Early-Z rejection). Опциональный, но важен для сложных сцен.",
     note:"Без PrePass GPU запускает pixel shader и только потом делает depth test — wasteful."},
    {short:"BASE",name:"Base Pass",col:C.orange,
     desc:"Записывает данные о поверхности в G-Buffer: нормали, albedo, roughness, metallic. Шейдеры материалов выполняются здесь. Освещение НЕ считается.",
     note:"В этом смысл deferred: разделить geometry pass и lighting pass."},
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
          <span style={{color:stages[active].col,fontFamily:"monospace",fontSize:10}}>NOTE › </span>{stages[active].note}
        </div>
      </div>
    </div>
  );
}

function DeferredVsForward(){
  const rows=[
    {prop:"Lights",def:"N×M дорого → N отдельных passes",fwd:"Per-object, дорого при N lights"},
    {prop:"Transparency",def:"Отдельный forward pass",fwd:"Нативно"},
    {prop:"MSAA",def:"Дорого/невозможно",fwd:"Нативно"},
    {prop:"Memory",def:"Дорого (G-Buffer = ~100+ MB)",fwd:"Дёшево"},
    {prop:"Mobile",def:"Плохо (bandwidth)",fwd:"Стандарт для mobile"},
    {prop:"Materials",def:"Неограниченно (все в G-Buffer)",fwd:"Дорого при многих материалах"},
    {prop:"UE5 default",def:"✓ Да",fwd:"Только для мобильных проектов"},
  ];
  return(
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"separate",borderSpacing:2,minWidth:400}}>
        <thead><tr>
          <th style={{background:C.surface,border:`1px solid ${C.border}`,padding:"8px 12px",textAlign:"left",fontFamily:"monospace",fontSize:10,color:C.muted}}>Параметр</th>
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
  const [tab,setTab]=useState("lumen");
  const items={
    lumen:{col:C.accent,title:"Lumen — Global Illumination",sections:[
      {label:"ЧТО ТАКОЕ",text:"Полностью динамическая система Global Illumination и отражений. Работает без запечённых лайтмапов. Свет обновляется в реальном времени при изменении геометрии и источников."},
      {label:"КАК РАБОТАЕТ",text:"Software Ray Tracing: трассирует лучи по Distance Fields и Surface Cache — не по треугольникам. Hardware Ray Tracing: трассирует по реальной геометрии, точнее, но дороже. Результат — indirect lighting и отражения."},
      {label:"ОГРАНИЧЕНИЯ",text:"Не работает на мобильных платформах. Заметная задержка при резких изменениях освещения. Masked/translucent материалы не отражают свет корректно. Performance cost значительный (≈2-4ms на ПК)."},
      {label:"НАСТРОЙКА В UE5",text:"Project Settings → Rendering → Global Illumination → Lumen. В PostProcessVolume: Lumen Global Illumination, Lumen Reflections. r.Lumen.Reflections.Allow 1."},
    ]},
    nanite:{col:C.green,title:"Nanite — Virtualized Geometry",sections:[
      {label:"ЧТО ТАКОЕ",text:"Система виртуализированной микрополигональной геометрии. Позволяет использовать модели с миллионами полигонов без ручной настройки LOD. GPU рендерит только видимые кластеры треугольников."},
      {label:"КАК РАБОТАЕТ",text:"Меш делится на иерархические кластеры (clusters). GPU выбирает нужный уровень детализации для каждого кластера в реальном времени на основе экранного размера. Невидимые кластеры полностью пропускаются."},
      {label:"ОГРАНИЧЕНИЯ",text:"НЕ работает с: Masked/Translucent материалами (только Opaque), World Position Offset (WPO движение в шейдере — в UE5.1+ частично поддерживается), Deformable meshes, Skeletal meshes. Не для mobile."},
      {label:"КОГДА ИСПОЛЬЗОВАТЬ",text:"Архитектура, environment props, скалы, деревья (Static Mesh). НЕ для персонажей, флагов, анимированных объектов. Включается в Static Mesh Editor → Enable Nanite."},
    ]},
    vsm:{col:C.purple,title:"Virtual Shadow Maps",sections:[
      {label:"ЧТО ТАКОЕ",text:"Система теней для Nanite-объектов. Традиционные shadow maps не работают с Nanite — VSM решает это через виртуализацию: хранится только видимая часть shadow map."},
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
  const [tool,setTool]=useState("stat");
  const tools={
    stat:{col:C.accent,label:"stat GPU / stat Unit",items:[
      {cmd:"stat GPU",desc:"Показывает время каждого GPU pass в ms. Ключевой инструмент."},
      {cmd:"stat Unit",desc:"CPU/GPU/Frame/Game time. Сразу видно что является bottleneck."},
      {cmd:"stat SceneRendering",desc:"Draw calls, primitives, mesh draw calls по категориям."},
      {cmd:"stat RHI",desc:"RHI draw calls, triangles, dispatch calls."},
      {cmd:"r.ScreenPercentage 50",desc:"Снизить разрешение — если FPS вырос, значит GPU-bound."},
      {cmd:"profilegpu",desc:"Один подробный кадр GPU профайлинга с деревом passes."},
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
          <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{desc}</div>
        </div>))}
      </div>
    </div>
  );
}

function LODViz(){
  const [screenPct,setScreenPct]=useState(15);
  const lodLevels=[
    {lod:0,threshold:100,label:"LOD 0",desc:"Оригинал. Близко к камере.",col:C.green},
    {lod:1,threshold:50,label:"LOD 1",desc:"~50% полигонов.",col:C.accent},
    {lod:2,threshold:15,label:"LOD 2",desc:"~25% полигонов.",col:C.yellow},
    {lod:3,threshold:5,label:"LOD 3",desc:"~10% полигонов.",col:C.orange},
    {lod:4,threshold:1,label:"Culled",desc:"Объект скрыт.",col:C.red},
  ];
  const activeLod=lodLevels.findIndex((l,i)=>screenPct>=l.threshold||(i===lodLevels.length-1))||0;
  const currentLod=lodLevels.filter(l=>screenPct>=l.threshold).pop()||lodLevels[lodLevels.length-1];
  return(
    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
      <div style={{flex:1,minWidth:220}}>
        <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:4}}>РАЗМЕР ОБЪЕКТА НА ЭКРАНЕ</div>
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
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>НАСТРОЙКА В UE5</div>
          {["Static Mesh Editor → LOD Settings","Screen Size — значение от 0.0 до 1.0 (не %)","Auto LOD generation: Reduction Settings → % triangles","HISM автоматически управляет LOD для instanced meshes","Nanite заменяет ручной LOD для statc meshes"].map(t=>(<div key={t} style={{fontSize:11,color:C.muted,marginBottom:5}}>› {t}</div>))}
        </div>
      </div>
    </div>
  );
}

function InstancingViz(){
  const [mode,setMode]=useState("ism");
  const modes={
    none:{col:C.red,label:"Без instancing",draws:200,desc:"Каждый mesh = отдельный draw call. 200 деревьев = 200 draw calls. CPU bottleneck."},
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
  const items=[
    {title:"Texture Streaming",col:C.accent,
     points:["UE5 загружает mip-уровни по мере приближения камеры","r.Streaming.PoolSize — размер пула в MB (default 1000)","Stat TextureGroup показывает использование по группам","Texture Group определяет приоритет стриминга (World, Character, UI...)"]},
    {title:"Форматы и компрессия",col:C.orange,
     points:["BC1 (DXT1): RGB без альфы, 4bpp. Diffuse без прозрачности","BC3 (DXT5): RGBA, 8bpp. Diffuse с альфой, normal maps (вариант)","BC5: RG, 8bpp. Оптимально для normal maps (только RG хранятся)","BC7: высокое качество RGBA, 8bpp. Для сложных материалов","ASTC: мобильные платформы, гибкий ratio"]},
    {title:"Mip Maps",col:C.green,
     points:["Всегда включай mip maps для world textures (экономит bandwidth)","LOD Bias — сдвигает начальный mip (положительный = меньше)","Mip Gen Settings: Sharpen для detail maps, Blur для smooth masks","Без mips: aliasing вдали + GPU читает полный mip0 даже для далёких пикселей"]},
    {title:"Бюджет и оптимизация",col:C.purple,
     points:["VRAM budget на консолях: 4-8 GB, держи текстуры в пределах","Texture Streaming Pool Overflow — критичный варнинг в логах","Size: 4K только для hero assets, 2K стандарт, 1K для мелкого","Stat Memory показывает общее использование текстур"]},
  ];
  return(
    <div style={{display:"grid",gap:12}}>
      {items.map(({title,col,points})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:10}}>{title}</div>
        {points.map(p=>(<div key={p} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:col,flexShrink:0,fontSize:12}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{p}</span></div>))}
      </div>))}
    </div>
  );
}

function OverdrawSection(){
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
          {[{t:"Depth PrePass",d:"PS не запускается для скрытых пикселей",c:C.green},{t:"Front-to-back",d:"Opaque: ближние первыми, z-test убивает дальние",c:C.accent},{t:"Frustum/Occlusion Culling",d:"Не отправлять скрытую геометрию",c:C.yellow},{t:"Упрощение particles",d:"Минимизировать слои прозрачности",c:C.orange}].map(({t,d,c})=>(<div key={t} style={{marginBottom:8}}><span style={{fontFamily:"monospace",fontSize:10,color:c}}>{t}</span><div style={{fontSize:11,color:C.muted}}>{d}</div></div>))}
        </div>
      </div>
    </div>
  );
}


// ══ MODULE 6 — PIPELINE / TOOLS + MAYA ═══════════════════════════════════
function PythonAPIRef(){
  const [section,setSection]=useState("core");
  const sections={
    core:{col:C.accent,label:"Core API",items:[
      {cmd:"import unreal",desc:"Импорт основного модуля. Работает в UE Python консоли и скриптах."},
      {cmd:"unreal.EditorAssetLibrary",desc:"Основной класс для работы с ассетами: load, save, rename, duplicate, delete."},
      {cmd:"unreal.AssetRegistryHelpers",desc:"Поиск ассетов по фильтрам — тип, путь, теги. Быстрее чем load каждого."},
      {cmd:"unreal.EditorLevelLibrary",desc:"Работа с уровнем: spawn actors, get all actors, get selected actors."},
      {cmd:"unreal.EditorUtilityLibrary",desc:"Утилиты для Editor: get selected assets, get selected actors."},
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
        {cur.items.map(({cmd,desc})=>(<div key={cmd} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px"}}><div style={{fontFamily:"monospace",fontSize:12,color:cur.col,marginBottom:4}}>{cmd}</div><div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{desc}</div></div>))}
      </div>
    </div>
  );
}

function PythonExamples(){
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
  const items=[
    {title:"Что такое EUW",col:C.accent,points:["Editor Utility Widget — Blueprint-виджет, запускается внутри редактора как панель","Создаётся: Content Browser → Blueprint Class → EditorUtilityWidget","Запуск: ПКМ на EUW → Run Editor Utility Widget","Может вызывать Python скрипты через Execute Python Script node"]},
    {title:"Типовые инструменты для TA",col:C.orange,points:["Asset Browser с кастомными фильтрами и batch операциями","LOD Manager — массовая настройка LOD для группы мешей","Material Switcher — замена материалов по паттерну","Texture Audit — отчёт по превышению бюджета","Scene Cleaner — поиск и удаление orphaned ассетов"]},
    {title:"Blueprint → Python коммуникация",col:C.green,points:["Execute Python Script (node) — запуск строки или файла .py","unreal.PythonScriptLibrary.execute_python_command(str)","Данные передаются через Editor Properties или Metadata tags","Для сложной логики: Python делает тяжёлую работу, EUW — UI"]},
    {title:"Commandlets (headless режим)",col:C.purple,points:["UE4Editor-Cmd.exe <project> -run=<CommandletName>","Для CI/CD: автоматическая валидация при коммите","ResavePackages — пересохранение ассетов без открытия редактора","Кастомный Commandlet: наследуется от UCommandlet в C++","Запуск Python headless: -ExecutePythonScript=script.py"]},
  ];
  return(
    <div style={{display:"grid",gap:10}}>
      {items.map(({title,col,points})=>(<div key={title} style={{background:col+"12",border:`1px solid ${col}33`,borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:10}}>{title}</div>
        {points.map(p=>(<div key={p} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{p}</span></div>))}
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
        {cur.items.map(({cmd,desc})=>(<div key={cmd} style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px"}}><div style={{fontFamily:"monospace",fontSize:12,color:cur.col,marginBottom:4}}>{cmd}</div><div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{desc}</div></div>))}
      </div>
    </div>
  );
}

function BlueprintTATools(){
  const items=[
    {title:"Debug визуализация в рантайме",col:C.accent,points:[
      "Draw Debug Sphere / Box / Line — рисует примитивы прямо в viewport",
      "Print String — вывод значений без открытия дебаггера",
      "Draw Debug Arrow — направление векторов (нормали, velocity)",
      "Полезно для проверки логики без C++ дебаггера",
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
        {points.map(p=>(<div key={p} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{p}</span></div>))}
      </div>))}
    </div>
  );
}


// ══ MODULE: MATERIALS ════════════════════════════════════════════════════════
function PBRPlayground(){
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
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:12,letterSpacing:1}}>PBR ПАРАМЕТРЫ</div>
          {[{label:"Metallic",val:metallic,set:setMetallic,col:C.yellow,desc:metallic<0.1?"Диэлектрик: диффуз цветной, блик белый":metallic>0.9?"Металл: нет диффуза, блик цветной (альбедо)":"Переход (не используй в PBR — только 0 или 1)"},{label:"Roughness",val:roughness,set:setRoughness,col:C.orange,desc:roughness<0.2?"Зеркальный — очень острый блик":roughness>0.7?"Матовый — широкий блик, нет отражений":"Полуглянцевый"}].map(({label,val,set,col,desc})=>(<div key={label} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontFamily:"monospace",fontSize:11,color:col}}>{label}</span><span style={{fontFamily:"monospace",fontSize:11,color:col}}>{val.toFixed(2)}</span></div><input type="range" min={0} max={1} step={0.01} value={val} onChange={e=>set(Number(e.target.value))} style={{width:"100%",accentColor:col,marginBottom:4}}/><div style={{fontSize:11,color:C.muted}}>{desc}</div></div>))}
        </div>
        <div style={{background:"#111827",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 14px"}}>
          <div style={{fontFamily:"monospace",fontSize:10,color:C.muted,marginBottom:8}}>PBR ПРИНЦИПЫ</div>
          {[{t:"Energy Conservation",d:"Объект не может отражать больше света чем получает. Сумма диффуза и спекуляра ≤ 1"},
            {t:"Metallic workflow",d:"Metallic=0: диэлектрик (дерево,камень,кожа). Metallic=1: металл (железо,золото). Промежуточных значений нет в природе"},
            {t:"Fresnel (F0)",d:"Все поверхности отражают под острым углом. F0 для диэлектриков ≈ 0.04, для металлов = Albedo"}].map(({t,d})=>(<div key={t} style={{marginBottom:8}}><span style={{fontFamily:"monospace",fontSize:10,color:C.purple}}>{t}</span><div style={{fontSize:11,color:C.muted,marginTop:2}}>{d}</div></div>))}
        </div>
      </div>
    </div>
  );
}

function MaterialGraph(){
  const concepts=[
    {title:"Как Material Graph компилируется в HLSL",col:C.accent,points:["Каждый нод = одна или несколько HLSL операций","Multiply нод → float4 result = A * B","Texture Sample → Tex.Sample(Sampler, UV)","UE компилирует граф в HLSL при сохранении материала","Можно посмотреть HLSL: Material Editor → HLSL код (правый клик)"]},
    {title:"Material Instances",col:C.orange,points:["Instance наследует граф родителя, меняет только параметры","Scalar, Vector, Texture параметры — дёшевый runtime override","Dynamic Material Instance (DMI) — изменение параметров в рантайме","SetVectorParameterValue / SetScalarParameterValue из Blueprint/C++","Нет перекомпиляции шейдера при смене параметров — это ключевое"]},
    {title:"Material Functions",col:C.green,points:["Переиспользуемые subgraph — как функции в программировании","Пример: Triplanar Mapping как Material Function — подключаешь везде","FunctionInput/FunctionOutput ноды определяют интерфейс","Изменение функции обновляет все материалы которые её используют","Engine контентовая папка: готовые функции (MF_*)"]},
    {title:"Vertex Shader в Material Graph",col:C.purple,points:["World Position Offset (WPO) — смещение вершин в VS","Используется для: ветра деревьев, воды, одежды, разрушений","WPO не работает с Nanite (в UE5.0), частично в UE5.1+","Vertex Normal Offset — деформация нормалей в VS","Custom HLSL нод — вставка кода напрямую в шейдер"]},
  ];
  return(
    <div style={{display:"grid",gap:10}}>
      {concepts.map(({title,col,points})=>(<div key={title} style={{background:col+"10",border:`1px solid ${col}33`,borderRadius:8,padding:"14px 16px"}}>
        <div style={{fontFamily:"monospace",fontSize:11,color:col,fontWeight:700,marginBottom:10}}>{title}</div>
        {points.map(p=>(<div key={p} style={{display:"flex",gap:8,marginBottom:6}}><span style={{color:col,flexShrink:0}}>›</span><span style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{p}</span></div>))}
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
          <div style={{fontSize:12,color:C.muted,lineHeight:1.6,marginBottom:code?8:0}}>{d}</div>
          {code&&<Code lang="hlsl">{code}</Code>}
        </div>))}
      </div>
    </div>
  );
}

// ══ MODULE: MOCK INTERVIEW ══════════════════════════════════════════════════
function MockInterview(){
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
  ];

  const [idx,setIdx]=useState(0);
  const [revealed,setRevealed]=useState(false);
  const [filter,setFilter]=useState("all");
  const [score,setScore]=useState({good:0,bad:0});

  const tags=["all","linalg","gpu","rendering","hlsl","optimization"];
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
        <div style={{fontSize:15,color:C.text,lineHeight:1.6,fontWeight:500}}>{cur.q}</div>
      </div>

      {!revealed?(
        <button onClick={()=>setRevealed(true)} style={{width:"100%",padding:"12px 0",background:C.accent+"18",border:`1px solid ${C.accent}55`,borderRadius:8,color:C.accent,fontFamily:"monospace",fontSize:12,cursor:"pointer"}}>
          🎯 Показать ответ
        </button>
      ):(
        <div>
          <div style={{background:"#111827",border:`1px solid ${C.green}44`,borderRadius:8,padding:"16px 18px",marginBottom:12,fontSize:13,color:C.text,lineHeight:1.8}}>
            {cur.a}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>next(true)} style={{flex:1,padding:"10px 0",background:C.green+"18",border:`1px solid ${C.green}55`,borderRadius:8,color:C.green,fontFamily:"monospace",fontSize:12,cursor:"pointer"}}>✓ Знал</button>
            <button onClick={()=>next(false)} style={{flex:1,padding:"10px 0",background:C.red+"18",border:`1px solid ${C.red}55`,borderRadius:8,color:C.red,fontFamily:"monospace",fontSize:12,cursor:"pointer"}}>✗ Не знал</button>
            <button onClick={()=>next(undefined)} style={{padding:"10px 16px",background:"transparent",border:`1px solid ${C.border}`,borderRadius:8,color:C.muted,fontFamily:"monospace",fontSize:12,cursor:"pointer"}}>→</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ══ TABS & APP ═════════════════════════════════════════════════════════════
const TABS=[
  {id:"linalg",label:"Линейная алгебра",icon:"∇",ready:true},
  {id:"gpu",label:"GPU vs CPU",icon:"⬡",ready:true},
  {id:"hlsl",label:"HLSL",icon:"{}",ready:true},
  {id:"rendering",label:"UE5 Rendering",icon:"◈",ready:true},
  {id:"optimization",label:"Оптимизация",icon:"⚡",ready:true},
  {id:"materials",label:"Материалы",icon:"◎",ready:true},
  {id:"lighting",label:"Освещение",icon:"☀",ready:true},
  {id:"pipeline",label:"Pipeline/Tools",icon:"⚙",ready:true},
  {id:"maya",label:"Maya / Max",icon:"🐍",ready:true},
  {id:"mock",label:"Mock Interview",icon:"🎯",ready:true},
];

export default function App(){
  const [active,setActive]=useState("linalg");
  useEffect(()=>{
    const s=document.createElement("style");
    s.textContent=`.tab-scroll::-webkit-scrollbar{display:none}`;
    document.head.appendChild(s);
  },[]);
  return(
    <div style={{background:C.bg,minHeight:"100vh",color:C.text,fontFamily:"'JetBrains Mono','Courier New',monospace"}}>
      <div style={{background:C.surface,position:"sticky",top:0,zIndex:100,borderBottom:`1px solid ${C.border}`}}>
        <div style={{padding:"10px 16px",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:28,height:28,background:C.accent+"18",border:`1px solid ${C.accent}44`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:C.accent,fontSize:16,flexShrink:0}}>∇</div>
          <div><div style={{fontWeight:700,fontSize:12,letterSpacing:3}}>TECH ART</div><div style={{color:C.muted,fontSize:9,letterSpacing:2}}>INTERVIEW PREP · 4A / PCF</div></div>
        </div>
        <div className="tab-scroll" style={{display:"flex",gap:4,overflowX:"auto",flexWrap:"nowrap",scrollbarWidth:"none",msOverflowStyle:"none",padding:"0 12px 10px"}}>
          {TABS.map(tab=>(<button key={tab.id} onClick={()=>tab.ready&&setActive(tab.id)} style={{background:active===tab.id?C.accent+"18":"transparent",border:`1px solid ${active===tab.id?C.accent+"55":C.border}`,borderRadius:6,padding:"6px 13px",flexShrink:0,color:active===tab.id?C.accent:tab.ready?C.muted:C.dim,fontSize:11,fontFamily:"inherit",cursor:tab.ready?"pointer":"default",display:"flex",alignItems:"center",gap:5,opacity:tab.ready?1:0.4,whiteSpace:"nowrap"}}><span>{tab.icon}</span>{tab.label}{!tab.ready&&<span style={{fontSize:9,color:C.dim}}>·soon</span>}</button>))}
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 32px"}}>

        {active==="linalg"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.accent,letterSpacing:3,marginBottom:4}}>МОДУЛЬ 01 · ПРИОРИТЕТ #1</div><h1 style={{fontSize:28,fontWeight:700,margin:0}}>Линейная алгебра</h1><p style={{color:C.muted,fontSize:12,marginTop:6}}>Базис для шейдеров и любого разговора о графике на интервью.</p></div>
          <Section title="Dot Product — Скалярное произведение" tag="∫ math">
              <LearnCard tabs={{
                "Суть":"Dot product берёт два вектора и возвращает <b style='color:#00c8ff'>одно число</b> — «насколько сильно они смотрят в одну сторону». Результат зависит от угла между ними: максимален когда векторы параллельны, равен нулю когда перпендикулярны.",
                "Аналогия":"Представь фонарик (вектор L) и поверхность (вектор N). Если фонарик светит прямо на поверхность — dot = 1, максимальный свет. Если под углом 90° — dot = 0, поверхность не освещена. Именно так работает Lambert lighting в каждом шейдере.",
                "На интервью":`dot(A,B) = |A||B|·cos(θ) — при нормализованных векторах это просто cos угла между ними. Применения: Lambert diffuse — dot(N,L); Fresnel — dot(N,V); определение «смотрит ли нормаль на камеру» — dot(N,V) < 0 значит backface.`
              }}/>
              <DotProductViz/>
            </Section>
          <Section title="Cross Product — Векторное произведение" tag="∫ math">
              <LearnCard tabs={{
                "Суть":"Cross product берёт два вектора и возвращает <b style='color:#3dff90'>третий вектор</b>, перпендикулярный обоим. Длина результата равна площади параллелограмма, построенного на входных векторах.",
                "Аналогия":"Положи две ручки на стол под углом — cross product это вектор, торчащий перпендикулярно вверх из точки их пересечения. Именно так GPU вычисляет нормаль грани: берёт два ребра треугольника и делает cross — получает вектор, перпендикулярный поверхности.",
                "На интервью":`Формула: A×B = (Ay·Bz-Az·By, Az·Bx-Ax·Bz, Ax·By-Ay·Bx). Главное: порядок важен — A×B = -(B×A). Применения: нормаль грани из двух рёбер; Bitangent в TBN-матрице: B = cross(N,T); определение ориентации треугольника (CW vs CCW).`
              }}/>
              <CrossProductViz/>
            </Section>
          <Section title="Sphere Mask — знать формулу наизусть" tag="★ hot">
              <LearnCard tabs={{
                "Суть":"Sphere Mask — функция которая возвращает 1 внутри сферы вокруг точки B и 0 снаружи. Hardness контролирует плавность края. Это универсальный инструмент для proximity-эффектов в шейдерах.",
                "Аналогия":"Представь капля воды падает на песок. В точке падения (центр B) — мокрый (1.0). Чем дальше от центра — тем суше (→0). Radius — радиус мокрого пятна, Hardness — насколько резко переход от мокрого к сухому.",
                "На интервью":`result = 1 - saturate((length(A-B) - Radius) / Hardness). Разбор: length(A-B) — расстояние до центра; минус Radius делает значение отрицательным внутри сферы; деление на Hardness размывает край; saturate клампит в [0,1]; 1-x инвертирует — внутри=1. Применение: следы на снегу, proximity blend материалов.`
              }}/>
              <SphereMaskViz/>
            </Section>
          <Section title="Векторы — длина, нормализация, проекция" tag="∫ math">
              <LearnCard tabs={{
                "Суть":"Вектор — направление и величина. Длина (magnitude) — насколько далеко. Нормализованный вектор — только направление, длина = 1. Проекция A на B — насколько A «идёт» в направлении B.",
                "Аналогия":"Нормализация как стрелка компаса — не важно насколько она длинная, важно куда показывает. Dot product = длина проекции. Represent(A→B) = (A·B / |B|²) · B — это тень от A на прямую B.",
                "На интервью":`|V| = sqrt(x²+y²+z²). normalize(V) = V/|V| — все lighting расчёты требуют нормализованных векторов, иначе масштаб ломает dot product. Проекция A на B: scalar = dot(A, normalize(B)); vector = scalar * normalize(B). Используется в Gram-Schmidt для TBN.`
              }}/>
              <VectorBasics/>
            </Section>
            <Section title="Матрицы — умножение, TRS, Inverse, Transpose" tag="∫ math">
              <LearnCard tabs={{
                "Суть":"Матрица — оператор трансформации пространства. Умножение матрицы на вектор = применение трансформации к точке. TRS матрица кодирует Translation, Rotation, Scale в одной операции.",
                "Аналогия":"Матрица как инструкция оригами: 'сложи вот так'. Умножение матриц = последовательность инструкций. Порядок важен: сначала сложи, потом разрежь ≠ сначала разрежь, потом сложи.",
                "На интервью":`TRS порядок: T×R×S (Scale применяется первым, Translation последним). Умножение НЕ коммутативно: A×B ≠ B×A. Inverse: View Matrix = Inverse(Camera TRS). InvTranspose для нормалей при non-uniform scale. Column-major в GLSL/HLSL: последний столбец = translation.`
              }}/>
              <MatrixViz/>
            </Section>
            <Section title="Quaternions — Gimbal Lock, Slerp" tag="∫ math">
              <LearnCard tabs={{
                "Суть":"Quaternion — альтернатива Euler углам для хранения вращений. Решает Gimbal Lock и обеспечивает правильную интерполяцию. Внутри движки всегда используют quaternions, Euler только в UI.",
                "Аналогия":"Euler углы — три отдельных поворота (как голова, плечо, кисть). Если голова повернулась на 90°, плечо и кисть могут оказаться на одной оси — Gimbal Lock. Quaternion поворачивает сразу вокруг одной произвольной оси без этой проблемы.",
                "На интервью":`q = w + xi + yj + zk, где w=cos(θ/2), xyz=axis·sin(θ/2). Единичный кватернион: |q|=1. Slerp для анимации — интерполяция по дуге сферы, равномерная скорость. Lerp кватернионов даёт неравномерную скорость. В UE5: FQuat, FRotator (Euler) для UI.`
              }}/>
              <QuaternionExplainer/>
            </Section>
            <Section title="Reflect вектор · Уравнение плоскости" tag="∫ math">
              <LearnCard tabs={{
                "Суть":"reflect(I,N) — отражённый вектор от поверхности с нормалью N. Уравнение плоскости Ax+By+Cz+D=0 позволяет определить по какую сторону плоскости находится точка и как далеко.",
                "Зачем":"Reflect — основа specular отражений, mirror surfaces, SSR (Screen Space Reflections). Уравнение плоскости — основа frustum culling (6 плоскостей frustum), portal rendering, clip planes.",
                "На интервью":`reflect(I,N) = I - 2·dot(I,N)·N. Derive: компонента I вдоль N = dot(I,N)·N, компонента перпендикулярная = I - dot(I,N)·N. Отражение: убрать компоненту вдоль N и добавить обратную. Frustum culling: точка за плоскостью если dot(Normal,Point)+D < 0.`
              }}/>
              <ReflectAndPlane/>
            </Section>
            <Section title="Пространства координат — Model → Screen" tag="pipeline">
              <LearnCard tabs={{
                "Зачем":"Зачем столько пространств? Каждая операция удобна в своём контексте. Меш хранится в Model Space — удобно для редактора. Физика и освещение работают в World Space — всё в одной системе. View Space удобен для culling — всё относительно камеры. Clip Space нужен GPU для растеризации.",
                "Аналогия":"Ты в городе (World Space). На карте города твой дом (Model Space — координаты относительно дома). GPS навигатор показывает относительно тебя (View Space). Экран телефона — проекция (Clip/Screen Space). Разные системы координат для разных задач — но всё это про одну точку.",
                "На интервью":`Model→World: умножаем на Model Matrix (TRS). World→View: умножаем на View Matrix (обратная трансформация камеры). View→Clip: умножаем на Projection Matrix. Clip→NDC: делим на w (перспективное деление). NDC→Screen: Viewport transform. Vertex shader обязан вывести позицию в Clip Space через SV_Position.`
              }}/>
              <CoordSpaces/>
            </Section>
        </>)}

        {active==="gpu"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.orange,letterSpacing:3,marginBottom:4}}>МОДУЛЬ 02 · ПРИОРИТЕТ #2</div><h1 style={{fontSize:28,fontWeight:700,margin:0}}>GPU vs CPU</h1><p style={{color:C.muted,fontSize:12,marginTop:6}}>Архитектура, пайплайн, узкие места.</p></div>
          <Section title="Архитектура: CPU vs GPU" tag="arch">
              <LearnCard tabs={{
                "Суть":"CPU оптимизирован для <b style='color:#ff7a45'>последовательного</b> выполнения сложных инструкций — большой кэш, предсказание ветвлений, out-of-order execution. GPU оптимизирован для <b style='color:#00c8ff'>параллельного</b> выполнения простых операций над огромным количеством данных одновременно.",
                "Аналогия":"CPU — 8 профессоров, каждый решает сложную задачу. GPU — 10 000 студентов, каждый считает простое уравнение. Рендеринг — это 'посчитай цвет для каждого из 2 миллионов пикселей'. Студенты справятся быстрее, даже если каждый медленнее профессора.",
                "На интервью":`GPU использует SIMT (Single Instruction Multiple Threads) — один шейдер выполняется на тысячах потоков одновременно, каждый обрабатывает свой пиксель или вершину. Это работает потому что шейдеры не имеют зависимостей между потоками. GPU не заменяет CPU: игровая логика последовательна — physics solver, AI, Blueprint — всё это цепочки зависимых вычислений.`
              }}/>
              <CoreDiagram/><InfoBox label="КЛЮЧЕВОЕ ОТЛИЧИЕ" color={C.orange}><strong style={{color:C.text}}>CPU</strong> — несколько мощных ядер, большой кэш, сложная логика управления. Для последовательного кода с ветвлениями.<br/><strong style={{color:C.text}}>GPU</strong> — тысячи простых ядер. Каждое слабее CPU-ядра, но все параллельны. Идеален для применения одного кода к миллионам пикселей одновременно.<br/><br/><span style={{color:C.yellow}}>GPU не заменяет CPU:</span> игровая логика последовательна — следующий кадр зависит от результата предыдущего.</InfoBox></Section>
          <Section title="GPU Rendering Pipeline" tag="pipeline">
              <LearnCard tabs={{
                "Суть":"Рендеринг — это конвейер (pipeline): данные входят с одной стороны (вершины из буфера), выходят с другой (пиксели на экране). Каждый этап выполняет свою задачу и передаёт результат следующему. Некоторые этапы программируемые (шейдеры), некоторые — фиксированная логика GPU.",
                "Зачем":"Конвейерная архитектура позволяет GPU обрабатывать несколько кадров одновременно: пока Vertex Shader обрабатывает треугольники кадра N, Rasterizer работает с кадром N-1. Как заводской конвейер — каждая станция всегда занята.",
                "На интервью":`Этапы: Input Assembly (читает вершины) → Vertex Shader (трансформирует позиции, программируемый) → Rasterization (интерполирует атрибуты на пиксели, fixed) → Pixel Shader (вычисляет цвет, программируемый) → Output Merger (depth test, blending, fixed). VS обязательно выводит SV_Position в clip space. PS выводит float4 цвет через SV_Target.`
              }}/>
              <GPUPipeline/>
            </Section>
          <Section title="CPU-bound vs GPU-bound — как диагностировать" tag="profiling">
              <LearnCard tabs={{
                "Суть":"Frame time = max(CPU time, GPU time). Если CPU работает 20ms, а GPU 8ms — CPU-bound, GPU простаивает. Оптимизировать нужно <b style='color:#ff7a45'>то, что дольше</b> — ускорение другого не даст прироста FPS.",
                "Аналогия":"Ресторан: повар (GPU) готовит блюда. Официант (CPU) принимает заказы и передаёт на кухню. Если официант медленный — повар простаивает (CPU-bound). Если блюда сложные и повар не успевает — официант ждёт (GPU-bound). Ускорять нужно узкое место.",
                "На интервью":`Диагностика: stat Unit в UE5 — смотри GPU ms vs CPU ms. Быстрый тест: снизь разрешение вдвое (r.ScreenPercentage 50). Если FPS вырос значительно — GPU-bound (меньше пикселей = меньше PS работы). Если FPS не изменился — CPU-bound (GPU и так простаивал). В RenderDoc: длинные passes = GPU-bound. В Unreal Insights: длинные CPU threads = CPU-bound.`
              }}/>
              <BoundnessViz/>
            </Section>
          <Section title="Draw Calls — что это и как сократить" tag="★ hot">
              <LearnCard tabs={{
                "Суть":"Draw call — команда CPU к GPU: «нарисуй этот меш с этим материалом». Проблема не в самом рисовании — а в <b style='color:#ff7a45'>overhead на подготовку</b>: смена шейдеров, bind текстур, обновление constant buffers. Каждый вызов = остановка CPU для синхронизации с GPU.",
                "Зачем":"На mobile лимит ~500-2000 draw calls/frame. На десктопе ~5000-15000. Превысишь — CPU не успевает за GPU, фреймрейт падает. Это CPU-bound сценарий — GPU простаивает пока CPU готовит следующий draw call.",
                "На интервью":`Батчинг: объединить меши с одинаковым материалом в один — 1 draw call вместо N. Instancing (ISM/HISM): 1000 одинаковых деревьев = 1 draw call с массивом трансформаций. Атласинг: несколько текстур в одну → меньше смен material state. Nanite в UE5 обходит проблему иначе: работает через indirect draws и culling на GPU.`
              }}/>
              <DrawCallExplainer/>
            </Section>
        </>)}

        {active==="hlsl"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.purple,letterSpacing:3,marginBottom:4}}>МОДУЛЬ 03 · ПРИОРИТЕТ #3</div><h1 style={{fontSize:28,fontWeight:700,margin:0}}>HLSL</h1><p style={{color:C.muted,fontSize:12,marginTop:6}}>Типы, операции, структура шейдеров.</p></div>
          <Section title="Типы данных и Swizzle" tag="types">
              <LearnCard tabs={{
                "Суть":"HLSL — строго типизированный язык. float — 32-битное число с плавающей точкой. half — 16-битное (меньше точность, но в 2 раза быстрее на мобильных GPU и меньше bandwidth). Swizzle — способ перегруппировать компоненты вектора без копирования.",
                "Зачем":"half vs float: на мобильных GPU (Adreno, Mali) half выполняется в 2x быстрее. На десктопе разница минимальна. Правило: используй float для позиций и нормалей (нужна точность), half для цветов и UV (точности достаточно). Swizzle — не просто синтаксический сахар, это zero-cost операция на GPU.",
                "На интервью":`float4 col = tex.Sample(s,uv); col.rgb — это три компонента без копирования. col.bgr — переставляет каналы. col.rrrr — дублирует R в float4. Это работает потому что HLSL компилятор транслирует swizzle в native GPU инструкции без overhead. bool в шейдерах дорогой — GPU не любит ветвления (if/else заставляет все потоки в warp ждать).`
              }}/>
              <DataTypes/>
            </Section>
          <Section title="Встроенные функции — шпаргалка" tag="intrinsics">
              <LearnCard tabs={{
                "Суть":"HLSL intrinsics — функции, встроенные в компилятор. Они транслируются в одну-две нативные GPU инструкции. Это не функции с overhead вызова — это почти бесплатные операции на уровне железа.",
                "Аналогия":"dot(), normalize(), lerp() — это как +, -, * для GPU. Они существуют в аппаратуре как отдельные блоки (ALU операции). Поэтому dot(A,B) быстрее чем Ax*Bx + Ay*By + Az*Bz — компилятор знает это и использует одну инструкцию.",
                "На интервью":`saturate(x) — эквивалент clamp(x,0,1) но быстрее: компилятор знает диапазон и оптимизирует. smoothstep(0,1,x) — S-кривая: медленный старт, быстрая середина, медленный конец. Используй вместо lerp когда нужен плавный переход. step(edge,x) — аппаратный if без ветвления: возвращает 0 или 1.`
              }}/>
              <Intrinsics/>
            </Section>
          <Section title="Vertex Shader — анатомия" tag="vs"><Code lang="hlsl">{`struct VSInput { float3 Position:POSITION; float3 Normal:NORMAL; float4 Tangent:TANGENT; float2 UV:TEXCOORD0; };
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
          <Section title="Pixel Shader — анатомия" tag="ps"><Code lang="hlsl">{`Texture2D AlbedoTex:register(t0); Texture2D NormalTex:register(t1);
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
          <Section title="UV-трансформации" tag="uv"><UVDemo/></Section>
          <Section title="Normal Mapping и TBN-матрица" tag="normal map">
              <LearnCard tabs={{
                "Зачем":"Normal map позволяет добавить визуальную детализацию без увеличения полигонов. Плоский квад с нормал-мэпом выглядит как детализированная поверхность. Но нормали в текстуре хранятся в Tangent Space — локальной системе координат поверхности. Их нужно перевести в World Space для расчёта освещения.",
                "Суть":"TBN матрица — система координат на поверхности меша. T (Tangent) — вдоль UV.x, B (Bitangent) — вдоль UV.y, N (Normal) — перпендикуляр поверхности. Нормаль из normal map умножается на TBN и попадает в World Space где считается освещение.",
                "На интервью":`Normal map хранит вектора в tangent space: синеватый цвет (0.5, 0.5, 1.0) = вектор (0,0,1) = «прямо перпендикулярно поверхности». Цветные области — отклонения нормали. Для перевода в world space: строим TBN матрицу в шейдере из tangent/bitangent/normal вершины, затем worldN = mul(tangentN, TBN). Bitangent = cross(N,T) с учётом знака из W-компоненты tangent.`
              }}/>
              <NormalMappingExplainer/>
            </Section>
        </>)}

        {active==="rendering"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.accent,letterSpacing:3,marginBottom:4}}>МОДУЛЬ 04 · ПРИОРИТЕТ #4</div><h1 style={{fontSize:28,fontWeight:700,margin:0}}>UE5 Rendering</h1><p style={{color:C.muted,fontSize:12,marginTop:6}}>Deferred pipeline, G-Buffer, Lumen, Nanite, VSM.</p></div>
          <Section title="Deferred vs Forward Rendering" tag="theory">
              <LearnCard tabs={{
                "Суть":"Forward: для каждого объекта сразу считаем все источники света. N объектов × M источников = N×M проходов. Deferred: сначала рендерим геометрию в G-Buffer (только данные поверхности), потом освещение отдельно. N + M проходов вместо N×M.",
                "Зачем":"При 100 объектах и 20 источниках света: Forward = 2000 проходов, Deferred = 120. Поэтому все современные движки используют deferred для сложных сцен. Цена — G-Buffer занимает 100-200 MB VRAM и требует широкий bandwidth. Поэтому mobile обычно Forward.",
                "На интервью":`UE5 использует Deferred по умолчанию. Преимущество: N sources lights стоит N passes вне зависимости от количества материалов. Недостаток: прозрачность не работает нативно (нет depth write в G-Buffer), MSAA дорогой. Translucency в UE5 рендерится отдельным Forward проходом поверх deferred результата.`
              }}/>
              <DeferredVsForward/><InfoBox label="ПОЧЕМУ UE5 ИСПОЛЬЗУЕТ DEFERRED" color={C.orange}>Deferred отделяет рендеринг геометрии от расчёта освещения. N объектов + M источников света = N + M passes, а не N×M. Это критично для уровней с десятками динамических источников света.</InfoBox></Section>
          <Section title="G-Buffer — что хранится в каждом канале" tag="★ hot">
              <LearnCard tabs={{
                "Суть":"G-Buffer (Geometry Buffer) — набор render targets куда Base Pass записывает всё о поверхности: нормали, цвет, roughness, metallic. Lighting Pass потом читает эти данные и считает освещение для всего экрана за один проход.",
                "Зачем":"Без G-Buffer каждый источник света должен знать о каждом материале — O(N×M) complexity. С G-Buffer: материалы пишут в буфер один раз, источники света читают буфер — O(N+M). Это и есть суть deferred рендеринга.",
                "На интервью":`UE5 G-Buffer: GBufferA — World Normal (RGB) + Shading Model ID (A). GBufferB — Metallic, Specular, Roughness, Shadow flags. GBufferC — BaseColor (RGB) + IndirectIrradiance (A). Scene Depth — для реконструкции World Position: из depth + UV + InvViewProj получаем 3D позицию любого пикселя без хранения XYZ.`
              }}/>
              <GBufferViz/>
            </Section>
          <Section title="Render Passes в UE5 — порядок и назначение" tag="pipeline"><RenderPassesViz/></Section>
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
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.yellow,letterSpacing:3,marginBottom:4}}>МОДУЛЬ 05 · ПРИОРИТЕТ #5</div><h1 style={{fontSize:28,fontWeight:700,margin:0}}>Оптимизация UE5</h1><p style={{color:C.muted,fontSize:12,marginTop:6}}>Профайлинг, LOD, instancing, текстуры, overdraw.</p></div>
          <Section title="Инструменты профайлинга" tag="★ hot">
              <LearnCard tabs={{
                "Суть":"Профайлинг — это поиск узкого места. Нельзя оптимизировать вслепую. Правило: сначала измерь, потом оптимизируй. stat GPU показывает время каждого render pass в миллисекундах — сразу видно что тормозит.",
                "Зачем":"60 FPS = 16.6ms на кадр. 30 FPS = 33ms. Если Shadow Depth Pass занимает 8ms — это половина бюджета. RenderDoc позволяет зайти внутрь любого draw call и увидеть какой шейдер работал, какие текстуры были bound, сколько пикселей обработано.",
                "На интервью":`Workflow: stat Unit → понять CPU-bound или GPU-bound. Если GPU-bound → stat GPU → найти дорогой pass. profilegpu → детальное дерево passes одного кадра. RenderDoc → зайти внутрь конкретного draw call. Unreal Insights → для CPU-bound: видно какой Blueprint/код тормозит по функциям с точным временем.`
              }}/>
              <ProfilingTools/>
            </Section>
          <Section title="LOD System — Screen Size thresholds" tag="lod">
              <LearnCard tabs={{
                "Суть":"LOD (Level of Detail) — система автоматической замены высокополигональной модели на упрощённую при удалении от камеры. Ключевой параметр — Screen Size: какую долю экрана занимает объект (0.0 до 1.0).",
                "Зачем":"Камень вдали занимает 5×5 пикселей. Рендерить его с 50k полигонами бессмысленно — результат неотличим от 100 полигонов. LOD экономит vertex processing (VS runs) и пропускную способность памяти. HISM управляет LOD для тысяч инстансов автоматически.",
                "На интервью":`Screen Size в UE5 — не пиксели, а доля экрана от 0 до 1. LOD0 обычно 1.0→0.3, LOD1: 0.3→0.1, LOD2: 0.1→0.01, Culled: <0.01. Nanite заменяет ручной LOD для static meshes — автоматически выбирает нужную детализацию на GPU. Для skeletal meshes и dynamic objects LOD по-прежнему нужен вручную.`
              }}/>
              <LODViz/>
            </Section>
          <Section title="Instancing — ISM vs HISM vs Nanite" tag="instancing"><InstancingViz/></Section>
          <Section title="Текстуры — стриминг, форматы, бюджет" tag="textures">
              <LearnCard tabs={{
                "Суть":"Текстуры — самый большой потребитель VRAM. 4K текстура без компрессии = 64 MB. С BC7 компрессией = 8 MB. Texture streaming загружает только нужные mip-уровни — объекты вдали используют mip4 (маленький), близкие — mip0 (полный размер).",
                "Зачем":"GPU читает текстуры через texture cache. Если текстура не помещается в кэш — cache miss, GPU ждёт данных из VRAM (сотни циклов задержки). Mip maps снижают вероятность cache miss для далёких объектов. BC5 для normal maps вместо BC3 — хранит только RG, экономит 50% при том же качестве.",
                "На интервью":`Форматы: BC1 (DXT1) — RGB без альфы, 4 bpp. BC3 (DXT5) — RGBA, 8 bpp. BC5 — только RG, идеален для normal maps (Z восстанавливается в шейдере: z=sqrt(1-x²-y²)). BC7 — высококачественный RGBA. ASTC — мобильные. Texture streaming pool: r.Streaming.PoolSize. Overflow в логах — критичный сигнал, текстуры начнут загружаться в низком разрешении.`
              }}/>
              <TextureOptimization/>
            </Section>
          <Section title="Overdraw — fillrate bottleneck" tag="overdraw"><OverdrawSection/></Section>
        </>)}

        {active==="materials"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.purple,letterSpacing:3,marginBottom:4}}>МОДУЛЬ · МАТЕРИАЛЫ</div><h1 style={{fontSize:28,fontWeight:700,margin:0}}>Материалы и PBR</h1><p style={{color:C.muted,fontSize:12,marginTop:6}}>PBR теория, Material Graph, Instances, Functions, WPO.</p></div>
          <Section title="PBR Playground — интерактивный материал" tag="★ pbr">
            <LearnCard tabs={{"Суть":"PBR (Physically Based Rendering) — материалы основанные на физике. Два ключевых параметра: Metallic (металл или диэлектрик) и Roughness (гладкость поверхности). Всё остальное вытекает из физических уравнений.","Energy Conservation":"Поверхность не может излучать больше света чем получает. Если много diffuse — мало specular и наоборот. Metallic=1 убирает diffuse полностью — все фотоны уходят в specular (металл не рассеивает).","На интервью":"Metallic workflow: 0=диэлектрик (дерево, камень, кожа), 1=металл (золото, железо). Промежуточных значений нет в природе. F0 (base reflectance): диэлектрики ≈ 0.04 (4%), металлы = albedo color. Fresnel — всё отражает под острым углом (grazing angle)."}}/><PBRPlayground/></Section>
          <Section title="Material Graph и компиляция в HLSL" tag="material graph"><LearnCard tabs={{"Суть":"Material Graph в UE5 — визуальный редактор HLSL шейдеров. Каждый нод = операция. При сохранении UE компилирует граф в HLSL код который можно посмотреть через Window → HLSL Code.","Material Instance":"Instance наследует граф родителя и меняет только exposed параметры. Нет перекомпиляции шейдера — только обновление constant buffer. Dynamic Material Instance (DMI) позволяет менять параметры в рантайме из Blueprint.","На интервью":"Material Function = reusable subgraph. WPO (World Position Offset) = смещение вершин в Vertex Shader — ветер, вода, разрушения. Custom HLSL нод — вставка кода напрямую. Layered Materials: LandscapeLayerBlend нод для террейна."}}/><MaterialGraph/></Section>
        </>)}

        {active==="lighting"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.yellow,letterSpacing:3,marginBottom:4}}>МОДУЛЬ · ОСВЕЩЕНИЕ</div><h1 style={{fontSize:28,fontWeight:700,margin:0}}>Теория освещения</h1><p style={{color:C.muted,fontSize:12,marginTop:6}}>Direct lighting, GI, IBL, Spherical Harmonics, Shadow Maps, типы источников.</p></div>
          <Section title="Direct Lighting · Indirect · Типы источников · Тени" tag="lighting"><LearnCard tabs={{"Суть":"Освещение = Direct (прямой свет от источника) + Indirect (отражённый, GI). Direct считается аналитически (Lambert, PBR). Indirect — либо запечённый (lightmaps), либо динамический (Lumen, SSAO, IBL).","Spherical Harmonics":"SH — способ хранить low-frequency освещение с любого направления в нескольких коэффициентах. L1 SH = 4 числа, L2 = 9 чисел. Lumen использует SH для ambient GI. Sample в шейдере = одна dot product операция.","На интервью":"IBL: diffuse IBL = convolved cubemap (все направления смешаны). Specular IBL = mip уровни по roughness + BRDF LUT. Split-sum approximation в UE5. Shadow Maps: рендер сцены от источника → depth texture → сравнение при основном рендере."}}/><LightingTheory/></Section>
        </>)}

        {active==="mock"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.accent,letterSpacing:3,marginBottom:4}}>ТРЕНИРОВКА</div><h1 style={{fontSize:28,fontWeight:700,margin:0}}>Mock Interview</h1><p style={{color:C.muted,fontSize:12,marginTop:6}}>Вопросы как на реальном интервью. Отвечай вслух, потом смотри ответ.</p></div>
          <Section title="Вопросы — 4A Games / PCF уровень" tag="★ practice" defaultOpen={true}><MockInterview/></Section>
        </>)}

        {active==="pipeline"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.green,letterSpacing:3,marginBottom:4}}>МОДУЛЬ 06 · ПРИОРИТЕТ #6</div><h1 style={{fontSize:28,fontWeight:700,margin:0}}>Pipeline / Tools</h1><p style={{color:C.muted,fontSize:12,marginTop:6}}>Python в UE5, EUW, валидация ассетов, Commandlets, Blueprint как TA-инструмент.</p></div>
          <Section title="Python API — основные классы и методы" tag="★ ue5 python">
              <LearnCard tabs={{
                "Суть":"UE5 Python API — обёртка над C++ редактора. Работает в Editor (не в рантайме игры). Позволяет автоматизировать любые задачи: rename тысячи ассетов, проверить naming conventions, batch export, spawn акторов из CSV.",
                "Зачем":"TA пишет инструменты которые экономят время художников. Batch rename 500 текстур вручную = 2 часа. Python скрипт = 30 секунд. Asset validation при коммите через CI/CD = нет кривых ассетов в проекте. Это ключевая часть работы TA в больших командах.",
                "На интервью":`Основные классы: EditorAssetLibrary — load/save/rename/delete ассетов. AssetRegistryHelpers.get_asset_registry() → get_assets(filter) — поиск без загрузки в память (быстро). EditorLevelLibrary — spawn, get_all_level_actors. set_editor_property/get_editor_property — изменение любых настроек объекта. Запуск: Python консоль в редакторе или -ExecutePythonScript в headless режиме.`
              }}/>
              <PythonAPIRef/>
            </Section>
          <Section title="Практические примеры — готовые скрипты" tag="examples"><PythonExamples/></Section>
          <Section title="EUW · Blueprint инструменты · Commandlets" tag="tools"><EUWSection/></Section>
          <Section title="Blueprint как TA-инструмент" tag="bp"><BlueprintTATools/></Section>
        </>)}

        {active==="maya"&&(<>
          <div style={{marginBottom:24}}><div style={{fontSize:10,color:C.accent,letterSpacing:3,marginBottom:4}}>МОДУЛЬ 07 · НИЗКИЙ ПРИОРИТЕТ</div><h1 style={{fontSize:28,fontWeight:700,margin:0}}>Maya / 3ds Max</h1><p style={{color:C.muted,fontSize:12,marginTop:6}}>Python API — cmds vs PyMEL, основные операции. 3ds Max — pymxs.</p></div>
          <Section title="Maya Python — API справочник" tag="maya.cmds">
              <LearnCard tabs={{
                "Суть":"Maya Python API работает через модуль maya.cmds (прямые MEL команды) или PyMEL (объектно-ориентированная обёртка). cmds быстрее, PyMEL удобнее для сложной логики. Оба делают одно и то же — управляют сценой Maya.",
                "Аналогия":"cmds.getAttr('obj.tx') — как прямой вызов функции по имени. pm.PyNode('obj').tx.get() — как обращение к свойству объекта в ООП. Результат одинаковый, но PyMEL даёт autocomplete и методы объекта.",
                "На интервью":`cmds.ls(type='mesh') — список всех мешей. cmds.ls(selection=True) — выделенные объекты. Атрибуты: getAttr/setAttr. Экспорт FBX: cmds.file(path, exportSelected=True, type='FBX export', force=True). PyMEL: import pymel.core as pm — те же операции через объекты. pymxs для 3ds Max: import pymxs; rt = pymxs.runtime — аналог cmds для Max.`
              }}/>
              <MayaPythonRef/>
            </Section>
          <Section title="Создание UI в Maya" tag="ui"><Code lang="python">{`import maya.cmds as cmds

# Простое окно с кнопкой
def on_click(*args):
    selected = cmds.ls(selection=True)
    for obj in selected:
        name = cmds.getAttr(obj + ".longName") if cmds.attributeQuery("longName", node=obj, exists=True) else obj
        cmds.rename(obj, "SM_" + name)

win = cmds.window(title="TA Tool", widthHeight=(300, 150))
cmds.columnLayout(adjustableColumn=True, rowSpacing=8)
cmds.text(label="Добавляет префикс SM_ к выделенным мешам")
cmds.separator(height=10)
cmds.button(label="Add SM_ Prefix", command=on_click, backgroundColor=(0.2, 0.5, 0.3))
cmds.showWindow(win)

# Более современный подход — через Qt (PySide2):
# from PySide2 import QtWidgets
# Это позволяет создавать полноценные Qt виджеты`}</Code></Section>
          <Section title="Типичные задачи для TA в Maya" tag="tasks">
            <div style={{display:"grid",gap:8}}>
              {[
                {title:"Batch Export FBX",col:C.orange,code:`import maya.cmds as cmds, os
output_dir = "C:/export/"
meshes = cmds.ls(type='transform')
for mesh in meshes:
    cmds.select(mesh)
    path = os.path.join(output_dir, mesh + ".fbx")
    cmds.file(path, exportSelected=True,
              type='FBX export', force=True)
    print(f"Exported: {mesh}")`},
                {title:"Проверка нулевых трансформаций",col:C.green,code:`import maya.cmds as cmds
issues = []
for obj in cmds.ls(type='transform'):
    t = cmds.xform(obj, q=True, translation=True, ws=True)
    r = cmds.xform(obj, q=True, rotation=True, ws=True)
    s = cmds.xform(obj, q=True, scale=True, ws=True)
    if any(abs(v) > 0.001 for v in t):
        issues.append(f"{obj}: non-zero translation {t}")
    if s != [1.0, 1.0, 1.0]:
        issues.append(f"{obj}: non-unit scale {s}")
for i in issues: print(i)`},
              ].map(({title,col,code})=>(<div key={title}><div style={{fontFamily:"monospace",fontSize:11,color:col,marginBottom:6}}>{title}</div><Code lang="python">{code}</Code></div>))}
            </div>
          </Section>
        </>)}
      </div>
    </div>
  );
}
