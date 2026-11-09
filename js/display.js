/* Orvanta display boot: applies the saved theme and text size before first paint (no flash for dark or large-text users) */
(function(){try{var s=(JSON.parse(localStorage.getItem('orvanta.v1')||'null')||{}).settings||{},r=document.documentElement;if(s.theme==='dark'||s.theme==='hc')r.dataset.theme=s.theme;var f={s:'93.75%',l:'118.75%'}[s.textSize];if(f)r.style.fontSize=f;}catch(e){}})();
