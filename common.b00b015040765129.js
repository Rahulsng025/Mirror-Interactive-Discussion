(self.webpackChunkng=self.webpackChunkng||[]).push([[592],{3025:function(b,L){!function(o){"use strict";function l(t){var i,r,e_ABOVE="above",e_BELOW="below",e_CHARTJS_TOOLTIP="chartjs-tooltip",e_NO_TRANSFORM="no-transform",e_TOOLTIP_BODY="tooltip-body",e_TOOLTIP_BODY_ITEM="tooltip-body-item",e_TOOLTIP_BODY_ITEM_COLOR="tooltip-body-item-color",e_TOOLTIP_BODY_ITEM_LABEL="tooltip-body-item-label",e_TOOLTIP_BODY_ITEM_VALUE="tooltip-body-item-value",e_TOOLTIP_HEADER="tooltip-header",e_TOOLTIP_HEADER_ITEM="tooltip-header-item",n={DIV:"div",SPAN:"span",TOOLTIP:(this._chart.canvas.id||(i=function(){return(65536*(1+Math.random())|0).toString(16)},r="_canvas-"+(i()+i()),this._chart.canvas.id=r,r))+"-tooltip"},a=document.getElementById(n.TOOLTIP);if(a||((a=document.createElement("div")).id=n.TOOLTIP,a.className=e_CHARTJS_TOOLTIP,this._chart.canvas.parentNode.appendChild(a)),0!==t.opacity){if(a.classList.remove(e_ABOVE,e_BELOW,e_NO_TRANSFORM),a.classList.add(t.yAlign?t.yAlign:e_NO_TRANSFORM),t.body){var f=t.title||[],d=document.createElement(n.DIV);d.className=e_TOOLTIP_HEADER,f.forEach(function(s){var i=document.createElement(n.DIV);i.className=e_TOOLTIP_HEADER_ITEM,i.innerHTML=s,d.appendChild(i)});var v=document.createElement(n.DIV);v.className=e_TOOLTIP_BODY,t.body.map(function(s){return s.lines}).forEach(function(s,i){var r=document.createElement(n.DIV);r.className=e_TOOLTIP_BODY_ITEM;var u=t.labelColors[i],T=document.createElement(n.SPAN);if(T.className=e_TOOLTIP_BODY_ITEM_COLOR,T.style.backgroundColor=u.backgroundColor,r.appendChild(T),s[0].split(":").length>1){var O=document.createElement(n.SPAN);O.className=e_TOOLTIP_BODY_ITEM_LABEL,O.innerHTML=s[0].split(": ")[0],r.appendChild(O);var p=document.createElement(n.SPAN);p.className=e_TOOLTIP_BODY_ITEM_VALUE,p.innerHTML=s[0].split(": ").pop(),r.appendChild(p)}else{var E=document.createElement(n.SPAN);E.className=e_TOOLTIP_BODY_ITEM_VALUE,E.innerHTML=s[0],r.appendChild(E)}v.appendChild(r)}),a.innerHTML="",a.appendChild(d),a.appendChild(v)}var C=this._chart.canvas.getBoundingClientRect(),c=this._chart.canvas.offsetLeft+t.caretX,D=this._chart.canvas.offsetTop+t.caretY,_=t.width/2;c+_>C.width?c-=_:c<_&&(c+=_),a.style.opacity=1,a.style.left=c+"px",a.style.top=D+"px"}else a.style.opacity=0}var h=l;o.CustomTooltips=l,o.customTooltips=h,Object.defineProperty(o,"__esModule",{value:!0})}(L)}}]);