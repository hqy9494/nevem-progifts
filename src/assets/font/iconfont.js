(function(window){var svgSprite='<svg><symbol id="icon-jian" viewBox="0 0 1024 1024"><path d="M980.918297 554.852994 43.079656 554.852994c-23.657816 0-42.856064-19.197224-42.856064-42.8489 0-23.657816 19.198248-42.857087 42.856064-42.857087l937.838641 0c23.697725 0 42.85811 19.199271 42.85811 42.857087C1023.775384 535.655769 1004.616022 554.852994 980.918297 554.852994L980.918297 554.852994z"  ></path></symbol><symbol id="icon-quxiao" viewBox="0 0 1024 1024"><path d="M544.244622 512.068267l280.712533 280.689778c8.897422 8.874667 8.897422 23.278933 0 32.176356s-23.278933 8.897422-32.176356 0L512.068267 544.267378 232.516267 823.819378c-8.874667 8.874667-23.233422 8.874667-32.085333 0-8.851911-8.851911-8.851911-23.210667 0-32.062578l279.574756-279.574756L199.042844 231.2192c-8.897422-8.897422-8.897422-23.301689 0-32.176356 8.874667-8.897422 23.278933-8.897422 32.176356 0l280.962844 280.962844L792.189156 199.998578c8.851911-8.851911 23.210667-8.851911 32.039822 0 8.874667 8.851911 8.874667 23.233422 0 32.085333L544.244622 512.068267z"  ></path></symbol><symbol id="icon-tianjiajiahaowubiankuang" viewBox="0 0 1024 1024"><path d="M984.615 472.615h-433.23v-433.23C551.385 17.329 534.056 0 512 0s-39.385 17.329-39.385 39.385v433.23H39.385C17.329 472.615 0 489.944 0 512s17.329 39.385 39.385 39.385h433.23v433.23C472.615 1006.671 489.944 1024 512 1024s39.385-17.329 39.385-39.385v-433.23h433.23c22.056 0 39.385-17.329 39.385-39.385s-17.329-39.385-39.385-39.385z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)