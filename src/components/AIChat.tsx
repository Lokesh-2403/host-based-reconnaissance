import { useState, useEffect, useRef } from "react";

export default function AIChat() {

const [open,setOpen] = useState(false);
const [booting,setBooting] = useState(false);
const [message,setMessage] = useState("");
const [messages,setMessages] = useState<any[]>([]);
const [loading,setLoading] = useState(false);

const chatEndRef = useRef<any>(null);

useEffect(()=>{
chatEndRef.current?.scrollIntoView({behavior:"smooth"});
},[messages,loading]);

useEffect(()=>{

if(open){

setBooting(true);

setTimeout(()=>{
setBooting(false);
},1800);

}

},[open]);

const sendMessage = async () => {

if(!message.trim()) return;

const userMessage = {role:"user",text:message};

setMessages(prev=>[...prev,userMessage]);

setMessage("");
setLoading(true);

try{

const response = await fetch("/api/assistant",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message})
});

const data = await response.json();

typeAIResponse(data.reply);

}catch{

setMessages(prev=>[
...prev,
{role:"ai",text:"⚠️ AI assistant unavailable."}
]);

}

setLoading(false);

};

const typeAIResponse = (text:string) => {

let i=0;
let current="";

const interval=setInterval(()=>{

current+=text[i];

setMessages(prev=>{
const last = prev[prev.length-1];

if(last?.role==="ai_typing"){

const updated=[...prev];
updated[updated.length-1]={role:"ai_typing",text:current};
return updated;

}else{

return [...prev,{role:"ai_typing",text:current}];

}

});

i++;

if(i>=text.length){

clearInterval(interval);

setMessages(prev=>{
const updated=[...prev];
updated[updated.length-1]={role:"ai",text};
return updated;
});

}

},15);

};

const handleKeyPress = (e:any) => {
if(e.key==="Enter") sendMessage();
};

return(
<>

<style>{`

@keyframes float {
0%{transform:translateY(0px)}
50%{transform:translateY(-5px)}
100%{transform:translateY(0px)}
}

@keyframes scan {
0%{top:-100%}
100%{top:100%}
}

.logo{
animation:float 3s ease-in-out infinite;
position:relative;
}

.scanline{
position:absolute;
width:100%;
height:3px;
background:cyan;
opacity:0.6;
animation:scan 2.5s linear infinite;
}

`}</style>


{/* Floating AI Button */}

<div
onClick={()=>setOpen(!open)}
style={{
position:"fixed",
bottom:"25px",
right:"25px",
width:"70px",
height:"70px",
cursor:"pointer",
zIndex:9999
}}
>

<div className="logo">

<img
src="/ai-logo.png"
style={{
width:"70px",
filter:"drop-shadow(0 0 4px rgba(0,255,255,0.4))"
}}
/>

<div className="scanline"></div>

</div>

</div>


{/* Chat Window */}

{open && (

<div
style={{
position:"fixed",
bottom:"110px",
right:"25px",
width:"360px",
height:"460px",
background:"rgba(0,0,0,0.92)",
borderRadius:"18px",
border:"1px solid rgba(0,255,255,0.4)",
boxShadow:"0 0 10px rgba(0,255,255,0.15)",
display:"flex",
flexDirection:"column",
overflow:"hidden",
zIndex:9999
}}
>

{/* Header */}

<div
style={{
display:"flex",
alignItems:"center",
gap:"10px",
padding:"12px",
borderBottom:"1px solid rgba(0,255,255,0.3)"
}}
>

<img src="/ai-logo.png" style={{width:"26px"}} />

<span
style={{
color:"#06b6d4",
fontWeight:"bold",
letterSpacing:"1px"
}}
>
Cyber AI
</span>

</div>


{/* Boot Screen */}

{booting ? (

<div
style={{
flex:1,
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
color:"#06b6d4",
fontSize:"13px",
gap:"6px"
}}
>

<div>Initializing AI Core...</div>
<div>Loading Cyber Modules...</div>
<div>Scanning Portfolio...</div>
<div>System Ready</div>

</div>

) : (

<>

{/* Messages */}

<div
style={{
flex:1,
padding:"14px",
overflowY:"auto"
}}
>

{messages.map((msg,index)=>(

<div
key={index}
style={{
display:"flex",
justifyContent:
msg.role==="user"?"flex-end":"flex-start",
marginBottom:"10px"
}}
>

<div
style={{
background:
msg.role==="user"
?"linear-gradient(135deg,#06b6d4,#0891b2)"
:"#020617",
padding:"10px 14px",
borderRadius:"14px",
color:
msg.role==="user"
?"white"
:"#22d3ee",
fontSize:"14px",
maxWidth:"75%",
border:
msg.role==="user"
?"none"
:"1px solid rgba(0,255,255,0.3)"
}}
>

{msg.text}

</div>

</div>

))}

{loading && (
<p style={{color:"#06b6d4"}}>
Analyzing...
</p>
)}

<div ref={chatEndRef}></div>

</div>


{/* Input */}

<div
style={{
display:"flex",
borderTop:"1px solid rgba(0,255,255,0.3)"
}}
>

<input
value={message}
onChange={(e)=>setMessage(e.target.value)}
onKeyDown={handleKeyPress}
placeholder="Ask about Lokesh..."
style={{
flex:1,
padding:"12px",
background:"transparent",
color:"white",
border:"none",
outline:"none"
}}
/>

<button
onClick={sendMessage}
style={{
padding:"0 16px",
background:"#06b6d4",
border:"none",
cursor:"pointer",
color:"white",
fontSize:"18px"
}}
>
➤
</button>

</div>

</>

)}

</div>

)}

</>
);

}