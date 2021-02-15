(this["webpackJsonprock-paper-scissors"]=this["webpackJsonprock-paper-scissors"]||[]).push([[0],{118:function(e,t,n){},121:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),a=n(19),i=n.n(a),o=(n(78),n(6)),s=n(13),l=n(7),u=(n(79),n(1));var j=function(){return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(s.b,{activeClassName:"active",className:"item",to:"/play-with-friend",children:"Play With Friend"}),Object(u.jsx)(s.b,{activeClassName:"active",className:"item",to:"/play-with-stranger",children:"Play With Stranger"})]})},d=(n(85),[{key:"3",text:"3",value:"3"},{key:"5",text:"5",value:"5"}]);var b=function(e){for(var t=e.children,n=t.nav,c=t.selectDiv,r=[],a=0;a<d.length;a+=1)r.push(Object(u.jsx)("option",{value:d[a].value,children:d[a].text},d[a].key));return Object(u.jsxs)("div",{className:"ui menu top fixed nav",ref:n,children:[Object(u.jsx)(s.b,{activeClassName:"active",className:"header item",to:"/",children:"Rock Paper Scissors"}),Object(u.jsx)("span",{className:"show-for-large",children:Object(u.jsx)(j,{})}),Object(u.jsxs)("div",{className:"item",ref:c,children:["Max Score",Object(u.jsx)("select",{style:{padding:"5px 5px"},name:"max_score",className:"ui selection fluid dropdown",defaultValue:"3",children:r})]})]})};var f=function(e){var t=e.children.nav;return Object(u.jsx)("div",{className:"ui bottom fixed two item menu show-for-medium nav",ref:t,children:Object(u.jsx)(j,{})})},h=n(126),m=n(127),x=n(128),O=n(130),p=n(131),g=n(129),v=["Rock","Paper","Scissors"],y=[0,1,2,0],N={rock:0,paper:1,scissors:2},w={code:0,info:"Artificial intelligence (AI)"},S={code:1,info:"a Friend"},R={code:2,info:"a Random Stranger"},C=(n(86),n.p+"static/media/rock.b760d847.svg"),k=n.p+"static/media/paper.695b6c2a.svg",L=n.p+"static/media/scissors.75818e9e.svg",E=n(40),I="https://rock-paper-scissors-server-40.herokuapp.com",T="".concat(I,"/v1/play-with-friend"),D="".concat(I,"/v1/play-with-stranger"),W=Object(E.io)(T),Y=Object(E.io)(D,{forceNew:!0}),G=!1,F=null,P=null,A="",B="",M="",H=0,q=0,J=0;var _=function(e){var t=Object(l.g)().code,n=Object(c.useRef)(null),r=Object(c.useRef)(null),a=Object(c.useRef)([]),i=Object(c.useRef)(null),s=Object(c.useRef)(null),j=Object(c.useRef)((function(e){})),d=Object(c.useRef)((function(){})),b=Object(c.useRef)((function(e){})),f=Object(c.useRef)((function(e){})),R=Object(c.useState)(0),E=Object(o.a)(R,2),I=E[0],T=E[1],D=Object(c.useState)("0"),_=Object(o.a)(D,2),z=_[0],V=_[1],U=Object(c.useState)("0"),X=Object(o.a)(U,2),K=X[0],Q=X[1],Z=Object(c.useState)(!1),$=Object(o.a)(Z,2),ee=$[0],te=$[1],ne=Object(c.useState)(!1),ce=Object(o.a)(ne,2),re=ce[0],ae=ce[1],ie=Object(c.useState)(!1),oe=Object(o.a)(ie,2),se=oe[0],le=oe[1],ue=Object(c.useRef)("0"),je=Object(c.useRef)("0");ue.current=z,je.current=K;var de=e.children,be=de.container,fe=de.margin,he=de.playingInfo,me=de.selectDiv,xe=he===S?W:Y,Oe=Object(c.useRef)();Oe.current=xe;var pe,ge,ve,ye,Ne=he===S?"/play-with-friend":"/play-with-stranger",we=Object(c.useRef)();we.current=Ne;var Se=function(){return he===w},Re=function(){null!==i.current&&(pe=i.current.childNodes,ge=pe[1].childNodes,ve=ge[0],ye=ge[1])},Ce=function(){if(null!==i.current){G||Re(),G=!1,ve.textContent="Rock Paper Scissors",Se()?ye.textContent="Waiting for you .....":ye.textContent="Waiting for opponent .....";var e=document.createElement("i");e.className="circle notched loading icon",e.setAttribute("aria-hidden","true"),pe[0].replaceWith(e),a.current.map((function(e){return e.classList.remove("tranform-img"),e})),F=null,P=null}},ke=function(){ae(!0);var e=0;e&&clearTimeout(e),e=window.setTimeout((function(){ae(!1),clearTimeout(e)}),2e3)},Le=function(e){if(Re(),Ce(),e)if(Se()){if(V("0"),Q("0"),null===s.current)return;s.current.textContent="New Game"}else"New Game"===s.current.textContent?(B="Requesting opponent to start a new game",Oe.current.emit("new game",t),ae(!0)):"Play Again?"===s.current.textContent&&(B="Requesting opponent to play again",Oe.current.emit("play again",t),ae(!0));else{if(V("0"),Q("0"),null===s.current)return;s.current.textContent="New Game"}},Ee=function(e,t,n,c,r){Re(),G=!0;var a=document.createElement("i");a.setAttribute("aria-hidden","true");var i=0;i&&clearTimeout(i),c.toString()===H.toString()?(s.current.textContent="Play Again?","player"===r&&(ve.textContent="You Won!",ye.textContent="Yeeeeeeeeeeeee... ".concat(t),a.className="smile outline icon",pe[0].replaceWith(a)),"opponent"===r&&(ve.textContent="You Lost :-(",ye.textContent="oooh Noooooooo... ".concat(t),a.className="frown outline icon",pe[0].replaceWith(a))):(ve.textContent=t,ye.textContent=n,a.className="icon hand ".concat(e.toLocaleLowerCase()," outline"),pe[0].replaceWith(a),i=window.setTimeout((function(){Ce(),clearTimeout(i)}),4e3))},Ie=function(e,t){var n="Your opponent chose: ".concat(v[t]),c="";if(y[e]===y[t])Ee(v[t],n,c="The game is tied",0,"");else if(y[e]===y[t+1]){c="You won!";var r=parseInt(ue.current,10)+1;Ee(v[t],n,c,r,"player"),V(r.toString())}else{c="You lost :(";var a=parseInt(je.current,10)+1;Ee(v[t],n,c,a,"opponent"),Q(a.toString())}},Te=function(){Re(),null===F&&null!==P?ye.textContent="Waiting for you .....":null===P&&null!==F?ye.textContent="Waiting for opponent .....":null!==F&&null!==P&&Ie(F,P)},De=["opponent choice","change max score??","max score accepted","max score rejected","new game?","new game accepted","new game rejected","play again?","play again accepted","play again rejected"],We=function(){ae(!1),B="Your Opponent accepted",ke(),Le(!1)},Ye=function(){ae(!1),B="Your Opponent rejected",ke()};return b.current=function(e){e.on(De[0],(function(e){P=parseInt(e,10),Te()})),e.on(De[1],(function(e){M="max-score",J=e,A="You opponent is requesting to change max score from ".concat(H," to ").concat(e),te(!0)})),e.on(De[2],(function(){q=H,We()})),e.on(De[3],(function(){H=q,me.current.childNodes[1].value=q.toString(),Ye()})),e.on(De[4],(function(){M="new-game",A="You opponent wants to start a new game",te(!0)})),e.on(De[5],(function(){We()})),e.on(De[6],(function(){Ye()})),e.on(De[7],(function(){M="play-again",A="You opponent wants to play again",te(!0)})),e.on(De[8],(function(){We()}))},f.current=function(e){De.map((function(t){return e.off(t),""}))},j.current=function(e){if(null===F&&parseInt(ue.current,10)!==H&&parseInt(je.current,10)!==H){var n=e;if(a.current[n].classList.add("tranform-img"),Se()&&!G){var c=Math.floor(3*Math.random());Ie(n,c)}else G||(F=parseInt(e,10),Te(),Oe.current.emit("player choice",e,t))}},d.current=function(){var e=me.current.childNodes[1];e.disabled=!1,q=H=3,e.addEventListener("change",(function(e){H=e.target.value,Se()?Le(!1):(B="Requesting opponent to change max score from ".concat(q," to ").concat(H),Oe.current.emit("change max score?",H,t),ae(!0))}))},Object(c.useEffect)((function(){var e=n.current.clientHeight;return T(e),V("0"),Q("0"),d.current(),a.current.map((function(e){var t=e.getAttribute("data-choice");return e.addEventListener("click",(function(){j.current(t)})),e})),b.current(Oe.current),F=null,P=null,G=!1,function(){f.current(Oe.current)}}),[]),Object(u.jsxs)(h.a,{style:{marginTop:"".concat(fe+10,"px"),marginBottom:"".concat(fe+10,"px")},ref:be,children:[se&&Object(u.jsx)(l.a,{to:we.current}),Object(u.jsxs)(m.a,{children:[Object(u.jsx)(x.a,{}),Object(u.jsxs)(x.a,{lg:12,md:12,sm:12,xl:12,xs:12,children:[Object(u.jsxs)("div",{className:"scores",children:[Object(u.jsx)("h5",{children:"Scores"}),Object(u.jsxs)("div",{className:"ui buttons",style:{paddingTop:"25px"},children:[Object(u.jsx)("br",{}),Object(u.jsxs)("button",{ref:n,type:"button",className:"ui icon right labeled orange button button-y button-yo",children:[Object(u.jsx)("i",{"aria-hidden":"true",className:"icon",style:{lineHeight:"".concat(I,"px")},children:ue.current}),"You"]}),Object(u.jsxs)("button",{ref:r,type:"button",className:"ui icon left labeled orange button button-o button-yo",children:[Object(u.jsx)("i",{"aria-hidden":"true",className:"icon",style:{lineHeight:"".concat(I,"px")},children:je.current}),"Opponent"]})]})]}),Object(u.jsxs)(m.a,{children:[Object(u.jsx)(x.a,{}),Object(u.jsx)(x.a,{lg:12,md:12,sm:12,xl:12,xs:12,children:Object(u.jsx)("h5",{style:{textAlign:"center"},children:"Choose Your Weapon Of Destruction."})}),Object(u.jsx)(x.a,{})]}),Object(u.jsxs)(m.a,{className:"rps-container",style:{maxWidth:"550px",margin:"0 auto"},children:[Object(u.jsxs)(x.a,{lg:4,md:4,sm:4,xl:4,xs:4,className:"rps",children:[Object(u.jsx)("img",{ref:function(e){a.current[0]=e},src:C,alt:"rock","data-choice":N.rock}),Object(u.jsx)("p",{children:"Rock"})]}),Object(u.jsxs)(x.a,{lg:4,md:4,sm:4,xl:4,xs:4,className:"rps",children:[Object(u.jsx)("img",{ref:function(e){a.current[1]=e},src:k,alt:"paper","data-choice":N.paper}),Object(u.jsx)("p",{children:"Paper"})]}),Object(u.jsxs)(x.a,{lg:4,md:4,sm:4,xl:4,xs:4,className:"rps",children:[Object(u.jsx)("img",{ref:function(e){a.current[2]=e},src:L,alt:"scissors","data-choice":N.scissors}),Object(u.jsx)("p",{children:"Scissors"})]})]}),Object(u.jsxs)("div",{ref:i,className:"ui icon large message message-info",children:[Object(u.jsx)("i",{"aria-hidden":"true",className:"circle notched loading icon"}),Object(u.jsxs)("div",{className:"content",children:[Object(u.jsx)("div",{className:"header",children:"Rock Paper Scissors"}),Object(u.jsx)("p",{style:{color:"#000",fontWeight:"bold"},children:Se()?"Waiting for you .....":"Waiting for opponent ....."})]})]}),Object(u.jsx)("div",{className:"new-game ",children:Object(u.jsx)("button",{ref:s,onClick:function(){Le(!0)},className:"ui button orange",type:"button",children:"New Game"})}),Object(u.jsxs)(g.a,{size:"large",className:"playing-info",children:["You are playing with"," ".concat(he.info)]})]}),Object(u.jsx)(x.a,{})]}),Object(u.jsxs)(O.a,{show:ee,animation:!1,backdrop:"static",keyboard:!1,children:[Object(u.jsx)(O.a.Header,{children:Object(u.jsx)(O.a.Title,{children:"R.P.S"})}),Object(u.jsx)(O.a.Body,{children:A}),Object(u.jsxs)(O.a.Footer,{children:[Object(u.jsx)(p.a,{variant:"secondary",onClick:function(){"max-score"===M?Oe.current.emit("reject changing max score",t):"new-game"===M?Oe.current.emit("reject new game",t):"play-again"===M&&(Oe.current.emit("reject play again",t),le(!0)),te(!1)},children:"Reject"}),Object(u.jsx)(p.a,{variant:"primary",onClick:function(){"max-score"===M?(Oe.current.emit("accept changing max score",t),q=H=J,me.current.childNodes[1].value=H.toString()):"new-game"===M?Oe.current.emit("accept new game",t):"play-again"===M&&Oe.current.emit("accept play again",t),te(!1),Le(!1)},children:"Accept"})]})]}),Object(u.jsxs)(O.a,{show:re,animation:!1,backdrop:"static",keyboard:!1,children:[Object(u.jsx)(O.a.Header,{children:Object(u.jsx)(O.a.Title,{children:"R.P.S"})}),Object(u.jsx)(O.a.Body,{children:B})]})]})},z=n(62),V=(n(118),function(e,t,n,c){return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("p",{children:"Enter Game Code To Join a Game"}),Object(u.jsx)("div",{className:"ui input small",children:Object(u.jsx)("input",{ref:e,type:"text",placeholder:"Enter Game Code .....",maxLength:40,minLength:3})}),Object(u.jsx)("button",{ref:t,type:"button",className:"small ui orange button",onClick:function(){return n([e,t,c],"")},children:"Enter Game"}),Object(u.jsx)("p",{ref:c})]})}),U=function(e){return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h4",{className:"ui header",children:"Join Game"}),Object(u.jsxs)("select",{ref:e,style:{padding:"5px 5px"},name:"max_score_filter",className:"ui selection dropdown select-max-score",defaultValue:"all",children:[Object(u.jsx)("option",{value:"all",children:"All"},"all"),Object(u.jsx)("option",{value:"3",children:"3"},"3"),Object(u.jsx)("option",{value:"5",children:"5"},"5")]}),Object(u.jsx)("span",{style:{paddingLeft:"15px"},children:"Select Max Score"})]})},X=Object(u.jsx)("tr",{children:Object(u.jsx)("td",{colSpan:2,children:Object(u.jsx)("h5",{children:"Loading ....."})})}),K=Object(u.jsx)("tr",{children:Object(u.jsxs)("td",{colSpan:2,children:[Object(u.jsx)("h5",{children:"500 Internal Server Error"}),"Oops, something went wrong. Reconnecting .....",Object(u.jsx)("p",{children:"The server encountered an internal error or misconfiguration and was unable to complete your request"})]})}),Q=Object(u.jsx)("tr",{children:Object(u.jsxs)("td",{colSpan:2,children:[Object(u.jsx)("h6",{children:"No Games"}),"Create one?"]})}),Z="/play-with-friend",$="/play-with-stranger",ee="",te="",ne=!1;var ce=function(e){var t=e.children,n=t.playingInfo,r=t.selectDiv,a=Object(c.useRef)({code:-1,info:""});a.current=n;var i=Object(c.useRef)(null),s=Object(c.useRef)(null),j=Object(c.useRef)(null),d=Object(c.useRef)(null),b=Object(c.useRef)(null),f=Object(c.useRef)(null),h=Object(c.useRef)(null),m=Object(c.useRef)(null),x=Object(c.useRef)(""),O=Object(c.useRef)(0),p=Object(c.useRef)((function(){return!0})),g=Object(c.useRef)((function(e){})),v=Object(c.useRef)((function(){})),y=Object(c.useRef)((function(){})),N=Object(c.useState)(!0),w=Object(o.a)(N,2),C=w[0],k=w[1],L=Object(c.useState)(!1),E=Object(o.a)(L,2),I=E[0],T=E[1],D=Object(c.useState)(0),G=Object(o.a)(D,2),F=G[0],P=G[1],A=Object(c.useState)(!1),B=Object(o.a)(A,2),M=B[0],H=B[1],q=Object(c.useState)([]),J=Object(o.a)(q,2),_=J[0],ce=J[1],re=Object(c.useRef)(0);re.current=F;var ae=Object(c.useRef)([]);ae.current=_,p.current=function(){return n===S};var ie=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=e[0],c=e[1],r=e[2];n.current.parentElement.classList.add("disabled"),c.current.classList.add("disabled"),r.current.textContent="Loading .....";var a=n.current.value,i=a.replace(/\s/g,""),o=h.current.value;return i.length<3||i.length>40?(n.current.parentElement.classList.remove("disabled"),c.current.classList.remove("disabled"),void(r.current.textContent="Error! Name/ Code must be between 3 and 40 characters")):null!=t&&"-s-"===i.substr(i.length-3)?(ee="".concat($,"/").concat(i),void H(!0)):null!=t?(te=i,ee="".concat(Z,"/").concat(te),void H(!0)):p.current()?(n.current.parentElement.classList.remove("disabled"),c.current.classList.remove("disabled"),r.current.textContent="",(te=btoa(i)).length>5&&(te=te.slice(te.length-5,te.length)),W.emit("create friend room","".concat(o,"-max-score-").concat(a,"-rps-").concat(te,"-f-")),ee="".concat(Z,"/").concat(te,"-f-"),W.on("room already exists",(function(){r.current.textContent="err. Name already taken :-("})),void W.on("creating room",(function(){H(!0)}))):void(p.current()?(n.current.parentElement.classList.remove("disabled"),c.current.classList.remove("disabled"),r.current.textContent="Server Error! Try again"):(n.current.parentElement.classList.remove("disabled"),c.current.classList.remove("disabled"),r.current.textContent="",(te=btoa(i)).length>5&&(te=te.slice(te.length-5,te.length)),Y.emit("create stranger room","".concat(o,"-max-score-").concat(a,"-rps-").concat(te,"-s-")),ee="".concat($,"/").concat(te,"-s-"),Y.on("room already exists st",(function(){r.current.textContent="err. Name already taken :-("})),Y.on("creating stranger room",(function(){Y.emit("get rooms"),H(!0)}))))};g.current=function(e){ne=!0,e.on("connect",(function(){ne&&(T(!1),p.current()||P(0),k(!1))})),e.on("disconnect",(function(){ne&&(T(!0),k(!1))})),e.io.on("error",(function(){ne&&(T(!0),k(!1))})),e.connected&&(T(!1),k(!1))},y.current=function(){p.current()&&g.current(W)},v.current=function(){p.current()||(g.current(Y),Y.emit("get rooms"),Y.on("rooms map",(function(e){O.current=0,ce(e),P(e.length)})),x.current=m.current.value,m.current.addEventListener("change",(function(e){x.current=e.target.value;var t=Object(z.a)(ae.current);O.current=0,ce(t)})))};var oe=Object(u.jsx)(u.Fragment,{children:ae.current.map((function(e,t){var n=e[0],c=e[1].split("-max-score-")[0],r=e[1].split("-max-score-")[1];if("all"===x.current||c===x.current)return O.current=1,Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:r}),Object(u.jsx)("td",{children:"MAX SCORE: ".concat(c)}),Object(u.jsx)("td",{children:Object(u.jsx)("button",{type:"button",className:"ui mini orange button",onClick:function(){return function(e){ee="".concat($,"/").concat(e),H(!0)}(n)},children:"Join Game"})})]},t);0===O.current&&(re.current=0)}))});return Object(c.useEffect)((function(){return r.current.childNodes[1].disabled=!0,y.current(),v.current(),function(){!function(e){switch(e){case S:W.off("connect"),W.off("disconnect"),W.io.off("error"),W.off();break;case R:Y.off("connect"),Y.off("disconnect"),Y.io.off("error"),Y.off()}}(a.current),ne=!1}}),[r]),Object(u.jsxs)(u.Fragment,{children:[M?Object(u.jsx)(l.a,{push:!0,to:ee}):"",Object(u.jsxs)("div",{className:"ui center aligned basic segment join-game background",children:[Object(u.jsx)("p",{children:"Create A Game"}),Object(u.jsxs)("div",{style:{paddingBottom:"15px"},children:[Object(u.jsxs)("select",{ref:h,style:{padding:"5px 5px"},name:"select_max_score",className:"ui selection dropdown select-max-score",defaultValue:"3",children:[Object(u.jsx)("option",{value:"3",children:"3"},"3"),Object(u.jsx)("option",{value:"5",children:"5"},"5")]}),Object(u.jsx)("span",{style:{paddingLeft:"15px"},children:"Select Max Score"})]}),Object(u.jsx)("div",{className:"ui input small",children:Object(u.jsx)("input",{ref:i,type:"text",placeholder:"Enter Game Name .....",maxLength:40,minLength:3})}),Object(u.jsx)("button",{ref:s,type:"button",className:"small ui orange button",onClick:function(){return ie([i,s,j])},children:"Create Game"}),Object(u.jsx)("p",{ref:j}),Object(u.jsx)("div",{className:"ui horizontal divider",children:"Or"}),p.current()&&V(d,b,ie,f),!p.current()&&U(m)]}),Object(u.jsx)("div",{className:"games",children:Object(u.jsx)("table",{className:"table table-bordered",children:Object(u.jsxs)("tbody",{children:[C&&X,I&&K,!p.current()&&!C&&!I&&re.current<=0&&Q,!p.current()&&!C&&!I&&re.current>0&&oe]})})})]})};var re=function(e){var t=e.children,n=t.margin,c=t.selectDiv;return Object(u.jsx)(h.a,{style:{marginTop:"".concat(n+10,"px"),marginBottom:"".concat(n+10,"px")},children:Object(u.jsxs)(m.a,{children:[Object(u.jsx)(x.a,{}),Object(u.jsx)(x.a,{lg:12,md:12,sm:12,xl:12,xs:12,children:Object(u.jsx)(ce,{children:{playingInfo:S,selectDiv:c}})}),Object(u.jsx)(x.a,{})]})})};var ae=function(e){var t=e.children,n=t.margin,c=t.selectDiv;return Object(u.jsx)(h.a,{style:{marginTop:"".concat(n+10,"px"),marginBottom:"".concat(n+10,"px")},children:Object(u.jsxs)(m.a,{children:[Object(u.jsx)(x.a,{}),Object(u.jsx)(x.a,{lg:12,md:12,sm:12,xl:12,xs:12,children:Object(u.jsx)(ce,{children:{playingInfo:R,selectDiv:c}})}),Object(u.jsx)(x.a,{})]})})},ie=Object(u.jsx)("tr",{children:Object(u.jsx)("td",{colSpan:2,children:Object(u.jsx)("h5",{children:"Invalid Game Code/or Room is Full. 2 players only"})})}),oe={code:-1,info:""};var se=function(e){var t=Object(l.g)().code,n=Object(c.useRef)("");n.current=t;var r=e.children,a=r.container,i=r.margin,s=r.selectDiv,j=Object(c.useRef)(null),d=Object(c.useState)(!0),b=Object(o.a)(d,2),f=b[0],O=b[1],p=Object(c.useState)(!1),g=Object(o.a)(p,2),v=g[0],y=g[1],N=Object(c.useState)(!1),w=Object(o.a)(N,2),C=w[0],k=w[1],L=Object(c.useState)(!1),E=Object(o.a)(L,2),I=E[0],T=E[1],D=Object(c.useState)(!1),G=Object(o.a)(D,2),F=G[0],P=G[1],A=Object(c.useState)(!1),B=Object(o.a)(A,2),M=B[0],H=B[1],q=Object(c.useRef)((function(){})),J=Object(c.useRef)((function(e){})),z=function(e,t,n,c,r,a){O(e),y(t),k(n),T(c),P(r),H(a)},V=function(e){e.emit("does room exists",t),O(!0)};J.current=function(e){var t=!1;e.on("connect",(function(){z(!1,!1,!1,!1,!1,!1),t&&V(e)})),e.on("disconnect",(function(){t=!0,z(!1,!1,!0,!1,!1,!1)})),e.io.on("error",(function(){t=!0,z(!1,!1,!0,!1,!1,!1)})),e.connected&&(t=!1,z(!1,!1,!1,!1,!1,!1))};var U=function(e){J.current(e),V(e),e.on("room doesn't exist",(function(){z(!1,!0,!1,!1,!1,!1)})),e.on("room is full",(function(){z(!1,!0,!1,!1,!1,!1)})),e.on("wait for oppenent",(function(){z(!1,!1,!1,!1,!0,!1)})),e.on("start game",(function(e){z(!1,!1,!1,!0,!1,!1),s.current.childNodes[1].value=e.toString(),s.current.childNodes[1].disabled=!1})),e.on("player left",(function(){z(!1,!1,!1,!1,!1,!0),s.current.childNodes[1].disabled=!0}))};q.current=function(){var e=t.substr(t.length-3);"-f-"===e?(oe=S,U(W)):"-s-"===e?(oe=R,U(Y)):(O(!1),y(!0))};var Q=function(){j.current.select(),j.current.setSelectionRange(0,99999),document.execCommand("copy")},Z=Object(u.jsx)("tr",{children:Object(u.jsxs)("td",{colSpan:2,children:[Object(u.jsx)("p",{children:oe===R?"Waiting for connection or share the code":"Share the code with a friend"}),Object(u.jsxs)("div",{className:"ui action input",children:[Object(u.jsx)("input",{ref:j,type:"text",value:t,readOnly:!0}),Object(u.jsxs)("button",{type:"button",className:"ui teal right labeled icon button",onClick:Q,children:[Object(u.jsx)("i",{className:"copy icon"}),"Copy"]})]})]})}),$=Object(u.jsx)("tr",{children:Object(u.jsxs)("td",{colSpan:2,children:[Object(u.jsx)("p",{children:oe===R?"Your oppenent Left :-(. Waiting for connection or share the code":"Your oppenent Left :-(. Share code with friend"}),Object(u.jsxs)("div",{className:"ui action input",children:[Object(u.jsx)("input",{ref:j,type:"text",value:t,readOnly:!0}),Object(u.jsxs)("button",{type:"button",className:"ui teal right labeled icon button",onClick:Q,children:[Object(u.jsx)("i",{className:"copy icon"}),"Copy"]})]})]})}),ee=Object(u.jsx)(h.a,{style:{marginTop:"".concat(i+10,"px"),marginBottom:"".concat(i+10,"px")},children:Object(u.jsxs)(m.a,{children:[Object(u.jsx)(x.a,{}),Object(u.jsx)(x.a,{lg:12,md:12,sm:12,xl:12,xs:12,children:Object(u.jsx)("div",{className:"games",children:Object(u.jsx)("table",{className:"table table-bordered",children:Object(u.jsxs)("tbody",{children:[F&&Z,f&&X,v&&ie,C&&K,M&&$]})})})}),Object(u.jsx)(x.a,{})]})});return Object(c.useEffect)((function(){return q.current(),function(){!function(e){switch(e){case"-f-":W.off("connect"),W.off("disconnect"),W.io.off("error"),W.off();break;case"-s-":Y.off("connect"),Y.off("disconnect"),Y.io.off("error"),Y.off()}}(n.current.substr(n.current.length-3)),W.emit("player leaving"),Y.emit("player leaving")}}),[]),Object(u.jsx)(u.Fragment,{children:I?Object(u.jsx)(_,{children:{container:a,margin:i,playingInfo:oe,selectDiv:s}}):ee})},le=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:305,n=0;return function(){n&&clearTimeout(n),n=window.setTimeout(e,t)}},ue=w;var je=function(){var e=Object(c.useRef)(null),t=Object(c.useRef)(null),n=Object(c.useRef)(null),r=Object(c.useRef)(null),a=Object(c.useState)(0),i=Object(o.a)(a,2),j=i[0],d=i[1],h=function(){var t=e.current.clientHeight;d(t)};return Object(c.useEffect)((function(){return h(),window.addEventListener("resize",le(h)),function(){window.removeEventListener("resize",le(h))}}),[]),Object(u.jsxs)(s.a,{children:[Object(u.jsxs)("div",{children:[Object(u.jsx)(b,{children:{nav:e,selectDiv:r}}),Object(u.jsx)(f,{children:{nav:t,selectDiv:null}})]}),Object(u.jsxs)(l.d,{children:[Object(u.jsx)(l.b,{exact:!0,path:"/",children:Object(u.jsx)(_,{children:{container:n,margin:j,playingInfo:ue,selectDiv:r}})}),Object(u.jsx)(l.b,{exact:!0,path:"/play-with-friend",children:Object(u.jsx)(re,{children:{container:n,margin:j,playingInfo:ue,selectDiv:r}})}),Object(u.jsx)(l.b,{exact:!0,path:"/play-with-stranger",children:Object(u.jsx)(ae,{children:{container:n,margin:j,playingInfo:ue,selectDiv:r}})}),Object(u.jsx)(l.b,{exact:!0,path:"/play-with-friend/:code",children:Object(u.jsx)(se,{children:{container:n,margin:j,playingInfo:ue,selectDiv:r}})}),Object(u.jsx)(l.b,{exact:!0,path:"/play-with-stranger/:code",children:Object(u.jsx)(se,{children:{container:n,margin:j,playingInfo:ue,selectDiv:r}})})]}),Object(u.jsx)("div",{className:"error-div",children:"Use Screen of 320px and above"})]})},de=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,132)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))};n(119),n(120);i.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(je,{})}),document.getElementById("root")),de()},78:function(e,t,n){},79:function(e,t,n){},85:function(e,t,n){},86:function(e,t,n){}},[[121,1,2]]]);
//# sourceMappingURL=main.ac5b8bc0.chunk.js.map