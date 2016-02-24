var CodeMirrorConfig=window.CodeMirrorConfig||{},CodeMirror=function(){function n(a,b){for(var c in b)a.hasOwnProperty(c)||(a[c]=b[c])}function t(a,b){for(var c=0;c<a.length;c++)b(a[c])}function q(a){return document.createElementNS&&null!==document.documentElement.namespaceURI?document.createElementNS("http://www.w3.org/1999/xhtml",a):document.createElement(a)}function v(a,b){var c=q("div"),d=q("div");c.style.position="absolute";c.style.height="100%";if(c.style.setExpression)try{c.style.setExpression("height",
"this.previousSibling.offsetHeight + 'px'")}catch(g){}c.style.top="0px";c.style.left="0px";c.style.overflow="hidden";a.appendChild(c);d.className="CodeMirror-line-numbers";c.appendChild(d);d.innerHTML="<div>"+b+"</div>";return c}function w(a){"string"==typeof a.parserfile&&(a.parserfile=[a.parserfile]);"string"==typeof a.basefiles&&(a.basefiles=[a.basefiles]);"string"==typeof a.stylesheet&&(a.stylesheet=[a.stylesheet]);var b=' spellcheck="'+(a.disableSpellcheck?"false":"true")+'"',c=['<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html'+
b+"><head>"];c.push('<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"/>');var d=a.noScriptCaching?"?nocache="+(new Date).getTime().toString(16):"";t(a.stylesheet,function(a){c.push('<link rel="stylesheet" type="text/css" href="'+a+d+'"/>')});t(a.basefiles.concat(a.parserfile),function(b){/^https?:/.test(b)||(b=a.path+b);c.push('<script type="text/javascript" src="'+b+d+'">\x3c/script>')});c.push('</head><body style="border-width: 0;" class="editbox"'+b+"></body></html>");return c.join("")}
function k(a,b){this.options=b=b||{};n(b,CodeMirrorConfig);b.dumbTabs?b.tabMode="spaces":b.normalTab&&(b.tabMode="default");b.cursorActivity&&(b.onCursorActivity=b.cursorActivity);var c=this.frame=q("iframe");b.iframeClass&&(c.className=b.iframeClass);b.iframeId&&(c.id=b.iframeId);c.frameBorder=0;c.style.border="0";c.style.width="100%";c.style.height="100%";c.style.display="block";var d=this.wrapping=q("div");d.style.position="relative";d.className="CodeMirror-wrapping";d.style.width=b.width;d.style.height=
"dynamic"==b.height?b.minHeight+"px":b.height;var g=this.textareaHack=q("textarea");d.appendChild(g);g.style.position="absolute";g.style.left="-10000px";g.style.width="10px";g.tabIndex=1E5;c.CodeMirror=this;b.domain&&z?(this.html=w(b),c.src="javascript:(function(){document.open();"+(b.domain?'document.domain="'+b.domain+'";':"")+"document.write(window.frameElement.CodeMirror.html);document.close();})()"):c.src="javascript:;";a.appendChild?a.appendChild(d):a(d);d.appendChild(c);b.lineNumbers&&(this.lineNumbers=
v(d,b.firstLineNumber));this.win=c.contentWindow;b.domain&&z||(this.win.document.open(),this.win.document.write(w(b)),this.win.document.close())}n(CodeMirrorConfig,{stylesheet:[],path:"",parserfile:[],basefiles:"util.js stringstream.js select.js undo.js editor.js tokenize.js".split(" "),iframeId:null,iframeClass:null,passDelay:200,passTime:50,lineNumberDelay:200,lineNumberTime:50,continuousScanning:!1,saveFunction:null,onLoad:null,onChange:null,undoDepth:50,undoDelay:800,disableSpellcheck:!0,textWrapping:!0,
readOnly:!1,width:"",height:"300px",minHeight:100,autoMatchParens:!1,markParen:null,unmarkParen:null,parserConfig:null,tabMode:"indent",enterMode:"indent",electricChars:!0,reindentOnLoad:!1,activeTokens:null,onCursorActivity:null,lineNumbers:!1,firstLineNumber:1,onLineNumberClick:null,indentUnit:2,domain:null,noScriptCaching:!1,incrementalLoading:!1});var z=document.selection&&window.ActiveXObject&&/MSIE/.test(navigator.userAgent);k.prototype={init:function(){this.options.initCallback&&this.options.initCallback(this);
if(this.options.onLoad)this.options.onLoad(this);this.options.lineNumbers&&this.activateLineNumbers();this.options.reindentOnLoad&&this.reindent();"dynamic"==this.options.height&&this.setDynamicHeight()},getCode:function(){return this.editor.getCode()},setCode:function(a){this.editor.importCode(a)},canHighlight:function(){return!0},highlightSql:function(a,b,c){return this.win.highlightSql(a,b,c)},getSelection:function(){this.focusIfIE();return this.editor.selectedText()},reindent:function(){this.editor.reindent()},
reindentSelection:function(){this.focusIfIE();this.editor.reindentSelection(null)},focusIfIE:function(){this.win.select.ie_selection&&document.activeElement!=this.frame&&this.focus()},focus:function(){this.win.focus();this.editor.selectionSnapshot&&this.win.select.setBookmark(this.win.document.body,this.editor.selectionSnapshot)},replaceSelection:function(a){this.focus();this.editor.replaceSelection(a);return!0},replaceChars:function(a,b,c){this.editor.replaceChars(a,b,c)},getSearchCursor:function(a,
b,c){return this.editor.getSearchCursor(a,b,c)},undo:function(){this.editor.history.undo()},redo:function(){this.editor.history.redo()},historySize:function(){return this.editor.history.historySize()},clearHistory:function(){this.editor.history.clear()},grabKeys:function(a,b){this.editor.grabKeys(a,b)},ungrabKeys:function(){this.editor.ungrabKeys()},setParser:function(a,b){this.editor.setParser(a,b)},setSpellcheck:function(a){this.win.document.body.spellcheck=a},setStylesheet:function(a){"string"===
typeof a&&(a=[a]);for(var b={},c={},d=this.win.document.getElementsByTagName("link"),g=0,f;f=d[g];g++)if(-1!==f.rel.indexOf("stylesheet"))for(var e=0;e<a.length;e++){var h=a[e];f.href.substring(f.href.length-h.length)===h&&(b[f.href]=!0,c[h]=!0)}for(g=0;f=d[g];g++)-1!==f.rel.indexOf("stylesheet")&&(f.disabled=!(f.href in b));for(e=0;e<a.length;e++)h=a[e],h in c||(f=this.win.document.createElement("link"),f.rel="stylesheet",f.type="text/css",f.href=h,this.win.document.getElementsByTagName("head")[0].appendChild(f))},
setTextWrapping:function(a){a!=this.options.textWrapping&&(this.win.document.body.style.whiteSpace=a?"":"nowrap",this.options.textWrapping=a,this.lineNumbers&&(this.setLineNumbers(!1),this.setLineNumbers(!0)))},setIndentUnit:function(a){this.win.indentUnit=a},setUndoDepth:function(a){this.editor.history.maxDepth=a},setTabMode:function(a){this.options.tabMode=a},setEnterMode:function(a){this.options.enterMode=a},setLineNumbers:function(a){a&&!this.lineNumbers?(this.lineNumbers=v(this.wrapping,this.options.firstLineNumber),
this.activateLineNumbers()):!a&&this.lineNumbers&&(this.wrapping.removeChild(this.lineNumbers),this.wrapping.style.paddingLeft="",this.lineNumbers=null)},cursorPosition:function(a){this.focusIfIE();return this.editor.cursorPosition(a)},firstLine:function(){return this.editor.firstLine()},lastLine:function(){return this.editor.lastLine()},nextLine:function(a){return this.editor.nextLine(a)},prevLine:function(a){return this.editor.prevLine(a)},lineContent:function(a){return this.editor.lineContent(a)},
setLineContent:function(a,b){this.editor.setLineContent(a,b)},removeLine:function(a){this.editor.removeLine(a)},insertIntoLine:function(a,b,c){this.editor.insertIntoLine(a,b,c)},selectLines:function(a,b,c,d){this.win.focus();this.editor.selectLines(a,b,c,d)},nthLine:function(a){for(var b=this.firstLine();1<a&&!1!==b;a--)b=this.nextLine(b);return b},lineNumber:function(a){for(var b=0;!1!==a;)b++,a=this.prevLine(a);return b},jumpToLine:function(a){"number"==typeof a&&(a=this.nthLine(a));this.selectLines(a,
0);this.win.focus()},currentLine:function(){return this.lineNumber(this.cursorLine())},cursorLine:function(){return this.cursorPosition().line},cursorCoords:function(a){return this.editor.cursorCoords(a)},activateLineNumbers:function(){function a(){if(0!=f.offsetWidth){for(var a=f;a.parentNode;a=a.parentNode);if(l.parentNode&&a==document&&e.Editor)l.offsetWidth!=k&&(k=l.offsetWidth,f.parentNode.style.paddingLeft=k+"px");else{try{y()}catch(b){}clearInterval(n)}}}function b(){l.scrollTop=x.scrollTop||
h.documentElement.scrollTop||0}function c(a){var b=p.firstChild.offsetHeight;if(0!=b)for(var c=50+Math.max(x.offsetHeight,Math.max(f.offsetHeight,x.scrollHeight||0)),b=Math.ceil(c/b),c=p.childNodes.length;c<=b;c++){var d=q("div");d.appendChild(document.createTextNode(a?String(c+m.options.firstLineNumber):"\u00a0"));p.appendChild(d)}}function d(){function a(){c(!0);b()}m.updateNumbers=a;var d=e.addEventHandler(e,"scroll",b,!0),f=e.addEventHandler(e,"resize",a,!0);y=function(){d();f();m.updateNumbers==
a&&(m.updateNumbers=null)};a()}function g(){function a(b,c){k||(k=p.appendChild(q("div")));t&&t(k,c,b);r.push(k);r.push(b);u=k.offsetHeight+k.offsetTop;k=k.nextSibling}function d(){for(var a=0;a<r.length;a+=2)r[a].innerHTML=r[a+1];r=[]}function f(){if(p.parentNode&&p.parentNode==m.lineNumbers){for(var c=(new Date).getTime()+m.options.lineNumberTime;h;){for(a(n++,h.previousSibling);h&&!e.isBR(h);h=h.nextSibling)for(var g=h.offsetTop+h.offsetHeight;p.offsetHeight&&g-3>u;){var l=u;a("&nbsp;");if(u<=
l)break}h&&(h=h.nextSibling);if((new Date).getTime()>c){d();s=setTimeout(f,m.options.lineNumberDelay);return}}for(;k;)a(n++);d();b()}}function g(a){b();c(a);h=x.firstChild;k=p.firstChild;u=0;n=m.options.firstLineNumber;f()}function l(){s&&clearTimeout(s);m.editor.allClean()?g():s=setTimeout(l,200)}var h,k,n,u,r=[],t=m.options.styleNumbers;g(!0);var s=null;m.updateNumbers=l;var v=e.addEventHandler(e,"scroll",b,!0),w=e.addEventHandler(e,"resize",l,!0);y=function(){s&&clearTimeout(s);m.updateNumbers==
l&&(m.updateNumbers=null);v();w()}}var f=this.frame,e=f.contentWindow,h=e.document,x=h.body,l=this.lineNumbers,p=l.firstChild,m=this,k=null;l.onclick=function(a){var b=m.options.onLineNumberClick;if(b){a=(a||window.event).target||(a||window.event).srcElement;var c=a==l?NaN:Number(a.innerHTML);isNaN(c)||b(c,a)}};var y=function(){};a();var n=setInterval(a,500);(this.options.textWrapping||this.options.styleNumbers?g:d)()},setDynamicHeight:function(){function a(){for(var a=0,c=g.lastChild,e;c&&d.isBR(c);)c.hackBR||
a++,c=c.previousSibling;c?(f=c.offsetHeight,e=c.offsetTop+(1+a)*f):f&&(e=a*f);e&&(b.wrapping.style.height=Math.max(h+e,b.options.minHeight)+"px")}var b=this,c=b.options.onCursorActivity,d=b.win,g=d.document.body,f=null,e=null,h=2*b.frame.offsetTop;g.style.overflowY="hidden";d.document.documentElement.style.overflowY="hidden";this.frame.scrolling="no";setTimeout(a,300);b.options.onCursorActivity=function(b){c&&c(b);clearTimeout(e);e=setTimeout(a,100)}}};k.InvalidLineHandle={toString:function(){return"CodeMirror.InvalidLineHandle"}};
k.replace=function(a){"string"==typeof a&&(a=document.getElementById(a));return function(b){a.parentNode.replaceChild(b,a)}};k.fromTextArea=function(a,b){function c(){a.value=e.getCode()}"string"==typeof a&&(a=document.getElementById(a));b=b||{};a.style.width&&null==b.width&&(b.width=a.style.width);a.style.height&&null==b.height&&(b.height=a.style.height);null==b.content&&(b.content=a.value);if(a.form){var d=function(){c();a.form.submit=g;a.form.submit();a.form.submit=d};"function"==typeof a.form.addEventListener?
a.form.addEventListener("submit",c,!1):a.form.attachEvent("onsubmit",c);var g=a.form.submit;try{a.form.submit=d}catch(f){}}a.style.display="none";var e=new k(function(b){a.nextSibling?a.parentNode.insertBefore(b,a.nextSibling):a.parentNode.appendChild(b)},b);e.save=c;e.toTextArea=function(){c();a.parentNode.removeChild(e.wrapping);a.style.display="";if(a.form){try{a.form.submit=g}catch(b){}"function"==typeof a.form.removeEventListener?a.form.removeEventListener("submit",c,!1):a.form.detachEvent("onsubmit",
c)}};return e};k.isProbablySupported=function(){var a;return window.opera?9.52<=Number(window.opera.version()):/Apple Computer, Inc/.test(navigator.vendor)&&(a=navigator.userAgent.match(/Version\/(\d+(?:\.\d+)?)\./))?3<=Number(a[1]):document.selection&&window.ActiveXObject&&(a=navigator.userAgent.match(/MSIE (\d+(?:\.\d*)?)\b/))?6<=Number(a[1]):(a=navigator.userAgent.match(/gecko\/(\d{8})/i))?20050901<=Number(a[1]):(a=navigator.userAgent.match(/AppleWebKit\/(\d+)/))?525<=Number(a[1]):null};return k}();