/* dc-lite: dependency-free renderer for Design Component templates (replaces React + runtime).
Template: {{ path }} holes, <sc-for list as>, <sc-if value> (or <template sc-for> / <template sc-if> inside tables and selects), on* events, ref, value/checked props.
Static styles live in css/app.css (classes); only live values are set inline. */
(function () {
'use strict';
var SVG = 'http://www.w3.org/2000/svg';
var HOLE = /\{\{\s*([\s\S]+?)\s*\}\}/g, WHOLE = /^\s*\{\{\s*([\s\S]+?)\s*\}\}\s*$/;
var EV = { onclick: 'click', onchange: 'change', oninput: 'input', onsubmit: 'submit', onkeydown: 'keydown', onkeyup: 'keyup', onmousedown: 'mousedown', onmouseup: 'mouseup', onmouseenter: 'mouseenter', onmouseleave: 'mouseleave', onmousemove: 'mousemove', onfocus: 'focusin', onblur: 'focusout', onpointerdown: 'pointerdown', onpointerup: 'pointerup', onpointerenter: 'pointerenter', onpointerleave: 'pointerleave', onpointermove: 'pointermove', onpointercancel: 'pointercancel', ontransitionend: 'transitionend', onanimationend: 'animationend', onscroll: 'scroll', onwheel: 'wheel', onload: 'load', onerror: 'error', ontouchstart: 'touchstart', ontouchend: 'touchend', oncontextmenu: 'contextmenu', ondoubleclick: 'dblclick' };
var BOOL = { disabled: 1, hidden: 1, checked: 1, selected: 1, readonly: 1, required: 1, multiple: 1, autofocus: 1, open: 1, inert: 1, novalidate: 1, muted: 1, playsinline: 1, autoplay: 1, loop: 1, controls: 1, allowfullscreen: 1 };
var PROP = { value: 1, checked: 1, selected: 1, muted: 1, indeterminate: 1 };
var UNITLESS = { opacity: 1, zIndex: 1, flex: 1, flexGrow: 1, flexShrink: 1, fontWeight: 1, lineHeight: 1, order: 1, zoom: 1, scale: 1 };
// ---- expressions (same rules as the design runtime) ----
function resolve(v, src) {
var e = String(src).trim(); if (!e) return undefined;
if (e[0] === '(' && e[e.length - 1] === ')' && wraps(e)) return resolve(v, e.slice(1, -1));
var m = /^(.*?[^=!])\s*(===|!==|==|!=)\s*(.+)$/.exec(e);
if (m) { var a = resolve(v, m[1]), b = resolve(v, m[3]); return m[2] === '===' ? a === b : m[2] === '!==' ? a !== b : m[2] === '==' ? a == b : a != b; }
if (e[0] === '!') return !resolve(v, e.slice(1));
if (e === 'true') return true; if (e === 'false') return false; if (e === 'null') return null; if (e === 'undefined') return undefined;
if (/^-?\d+(\.\d+)?$/.test(e)) return Number(e);
if (e.length > 1 && (e[0] === '"' || e[0] === "'") && e[e.length - 1] === e[0]) return e.slice(1, -1);
var parts = e.replace(/\[(\d+)\]/g, '.$1').split('.'), cur = v;
for (var i = 0; i < parts.length; i++) { if (cur == null) return undefined; cur = cur[parts[i]]; }
return cur;
}
function wraps(e) { var d = 0; for (var i = 0; i < e.length - 1; i++) { if (e[i] === '(') d++; else if (e[i] === ')') { d--; if (d === 0) return false; } } return true; }
function parse(s) {
var w = WHOLE.exec(s); if (w && w[1].indexOf('}}') < 0) return { w: w[1] };
var out = [], last = 0, m; HOLE.lastIndex = 0;
while ((m = HOLE.exec(s))) { if (m.index > last) out.push(s.slice(last, m.index)); out.push({ e: m[1] }); last = HOLE.lastIndex; }
if (last < s.length) out.push(s.slice(last));
return { p: out };
}
function ev(x, sc) {
if (x.w !== undefined) return resolve(sc, x.w);
var s = ''; for (var i = 0; i < x.p.length; i++) { var q = x.p[i]; if (typeof q === 'string') s += q; else { var r = resolve(sc, q.e); if (r != null && r !== false) s += r; } }
return s;
}
var has = function (s) { return s.indexOf('{{') >= 0; };
// ---- compile template DOM -> descriptors ----
function compile(node) {
var out = [];
for (var n = node.firstChild; n; n = n.nextSibling) {
if (n.nodeType === 3) { var t = n.data; if (!t) continue; out.push(has(t) ? { k: 'tx', x: parse(t) } : { k: 'st', t: t }); }
else if (n.nodeType === 1) out.push(cEl(n));
}
return out;
}
function cEl(n) {
var tag = n.localName;
if (tag === 'template' && n.hasAttribute('sc-for')) return { k: 'for', l: parse(n.getAttribute('list') || ''), as: n.getAttribute('as') || 'item', c: compile(n.content) };
if (tag === 'template' && n.hasAttribute('sc-if')) return { k: 'if', v: parse(n.getAttribute('value') || ''), c: compile(n.content) };
if (tag === 'sc-for') return { k: 'for', l: parse(n.getAttribute('list') || ''), as: n.getAttribute('as') || 'item', c: compile(n) };
if (tag === 'sc-if') return { k: 'if', v: parse(n.getAttribute('value') || ''), c: compile(tag === 'template' ? n.content : n) };
var o = { k: 'el', tag: tag, ns: n.namespaceURI === SVG ? SVG : null, st: [], dy: [], ev: [], ref: null, sty: null, c: compile(tag === 'template' ? n.content : n) };
for (var i = 0; i < n.attributes.length; i++) {
var a = n.attributes[i], k = a.name, v = a.value;
if (k.indexOf('hint-') === 0 || k === 'key') continue;
if (k === 'ref') { o.ref = parse(v); continue; }
if (EV[k]) { var type = EV[k]; if (k === 'onchange') { var ty = (n.getAttribute('type') || '').toLowerCase(); type = (tag === 'select' || ty === 'checkbox' || ty === 'radio' || ty === 'file') ? 'change' : 'input'; } o.ev.push([type, parse(v)]); continue; }
if (k === 'style' && has(v)) { o.sty = cssParts(v); continue; }
if (has(v)) o.dy.push([k, parse(v)]); else o.st.push([k, v]);
}
return o;
}
function cssParts(s) {
var w = WHOLE.exec(s); if (w) return { w: { w: w[1] } };
var out = [], d = '', depth = 0, q = 0;
for (var i = 0; i < s.length; i++) { var ch = s[i];
if (s.substr(i, 2) === '{{') depth++; if (s.substr(i, 2) === '}}') depth--;
if (ch === '(' && !depth) q++; if (ch === ')' && !depth) q--;
if (ch === ';' && !depth && !q) { push(d); d = ''; } else d += ch; }
push(d);
function push(x) { var c = x.indexOf(':'); if (c < 0) return; var p = x.slice(0, c).trim(), v = x.slice(c + 1).trim(); if (p) out.push([p, parse(v)]); }
return { d: out };
}
// ---- instances ----
var refQ = [], focusQ = [], STATIC = false; // STATIC: prerender writes the authored style text (not browser-normalised values)
function setRef(r, el) { if (!r) return; if (typeof r === 'function') r(el); else if (typeof r === 'object') r.current = el; }
function mk(c, sc, svg) {
if (c.k === 'st') { var tn = document.createTextNode(c.t); return { n: function () { return [tn]; }, up: noop, rm: function () { tn.remove(); } }; }
if (c.k === 'tx') return mkText(c, sc);
if (c.k === 'for') return mkFor(c, sc, svg);
if (c.k === 'if') return mkIf(c, sc, svg);
return mkEl(c, sc, svg);
}
function noop() {}
function group(cs, sc, svg) { var a = []; for (var i = 0; i < cs.length; i++) a.push(mk(cs[i], sc, svg)); return a; }
function nodesOf(list) { var f = []; for (var i = 0; i < list.length; i++) f.push.apply(f, list[i].n()); return f; }
function frag(list) { var f = document.createDocumentFragment(), ns = nodesOf(list); for (var i = 0; i < ns.length; i++) f.appendChild(ns[i]); return f; }
function mkText(c, sc) {
var node = document.createTextNode(''), vd = null, last;
var self = {
n: function () { return [node]; },
up: function (s) {
var v = ev(c.x, s);
if (v && typeof v === 'object') {
if (vd && node.nodeType === 1) { patchKids(node, vd, Array.isArray(v) ? v : [v]); vd = Array.isArray(v) ? v : [v]; return; }
var box = document.createElement('span'); box.style.display = 'contents'; vd = Array.isArray(v) ? v : [v];
for (var i = 0; i < vd.length; i++) box.appendChild(mountV(vd[i], false));
if (node.parentNode) node.parentNode.replaceChild(box, node); node = box; return;
}
var t = v == null || v === false || v === true ? '' : String(v);
if (node.nodeType !== 3) { var tn = document.createTextNode(t); if (node.parentNode) node.parentNode.replaceChild(tn, node); unrefV(vd); vd = null; node = tn; last = t; return; }
if (t !== last) { node.data = t; last = t; }
},
rm: function () { unrefV(vd); node.remove(); }
};
self.up(sc); return self;
}
function mkEl(c, sc, svg) {
var isSvg = svg || c.ns === SVG || c.tag === 'svg';
var el = isSvg ? document.createElementNS(SVG, c.tag) : document.createElement(c.tag);
for (var i = 0; i < c.st.length; i++) el.setAttribute(c.st[i][0], c.st[i][1]);
var hs = {}, prev = {}, ref = null, kids = group(c.c, sc, isSvg && c.tag !== 'foreignObject');
c.ev.forEach(function (e) { el.addEventListener(e[0], function (evt) { var f = hs[e[0]]; if (typeof f === 'function') f(evt); }); });
var target = c.tag === 'template' ? el.content : el; target.appendChild(frag(kids));
if (!STATIC && el.hasAttribute('autofocus')) focusQ.push(el);
var self = {
n: function () { return [el]; },
up: function (s) {
for (var i = 0; i < kids.length; i++) kids[i].up(s);
for (i = 0; i < c.ev.length; i++) hs[c.ev[i][0]] = ev(c.ev[i][1], s);
for (i = 0; i < c.dy.length; i++) { var k = c.dy[i][0], v = ev(c.dy[i][1], s); if (v !== prev[k] || PROP[k]) { setA(el, k, v); prev[k] = v; } }
if (c.sty) applyStyle(el, c.sty, s, prev);
if (c.ref) { var r = ev(c.ref, s); if (r !== ref) { var old = ref; ref = r; refQ.push([old, null], [r, el]); } }
},
rm: function () { if (ref) setRef(ref, null); for (var i = 0; i < kids.length; i++) kids[i].rm(); el.remove(); }
};
self.up(sc); return self;
}
function applyStyle(el, sty, s, prev) {
if (sty.w) { var o = ev(sty.w, s) || {}; for (var k in o) setStyleProp(el.style, k, o[k]); return; }
for (var i = 0; i < sty.d.length; i++) {
var p = sty.d[i][0], v = String(ev(sty.d[i][1], s)), key = 'style:' + p;
if (prev[key] === v) continue; prev[key] = v;
var imp = /\s*!important\s*$/.test(v); if (imp) v = v.replace(/\s*!important\s*$/, '');
var empty = v === '' || /undefined|null/.test(v) && v.replace(/undefined|null/g, '').trim() === '';
if (STATIC) { var raw = el.__raw || (el.__raw = {}); if (empty) delete raw[p]; else raw[p] = v + (imp ? ' !important' : ''); continue; }
if (empty) el.style.removeProperty(p); else el.style.setProperty(p, v, imp ? 'important' : '');
}
if (STATIC && el.__raw) { var txt = Object.keys(el.__raw).map(function (k) { return k + ':' + el.__raw[k]; }).join(';'); if (txt) el.setAttribute('style', txt); else el.removeAttribute('style'); }
}
function setA(el, k, v) {
if (PROP[k] && k in el) { if (k === 'value') { var sv = v == null ? '' : String(v); if (el.value !== sv) el.value = sv; } else el[k] = !!v; if (k !== 'value') { if (v) el.setAttribute(k, ''); else el.removeAttribute(k); } return; }
if (k === 'style') { el.removeAttribute('style'); if (v && typeof v === 'object') for (var q in v) setStyleProp(el.style, q, v[q]); else if (v) el.setAttribute('style', v); return; }
if (v == null || (v === false && !/^(aria-|data-)/.test(k))) { el.removeAttribute(k); return; }
if (v === true) { el.setAttribute(k, BOOL[k] ? '' : 'true'); return; }
if (typeof v === 'function' || typeof v === 'object') return;
el.setAttribute(k, String(v));
}
function mkFor(c, sc, svg) {
var a = document.createComment('for'), b = document.createComment('/for'), items = [];
var self = {
n: function () { var f = [a]; for (var i = 0; i < items.length; i++) f.push.apply(f, nodesOf(items[i])); f.push(b); return f; },
up: function (s) {
var l = ev(c.l, s); l = Array.isArray(l) ? l : [];
for (var i = 0; i < l.length; i++) {
var s2 = Object.create(s); s2[c.as] = l[i]; s2.$index = i;
if (items[i]) for (var j = 0; j < items[i].length; j++) items[i][j].up(s2);
else { items[i] = group(c.c, s2, svg); if (b.parentNode) b.parentNode.insertBefore(frag(items[i]), b); }
}
while (items.length > l.length) { var g = items.pop(); for (var k = 0; k < g.length; k++) g[k].rm(); }
},
rm: function () { items.forEach(function (g) { g.forEach(function (x) { x.rm(); }); }); items = []; a.remove(); b.remove(); }
};
self.up(sc); return self;
}
function mkIf(c, sc, svg) {
var a = document.createComment('if'), b = document.createComment('/if'), kids = null;
var self = {
n: function () { return [a].concat(kids ? nodesOf(kids) : [], [b]); },
up: function (s) {
var on = !!ev(c.v, s);
if (on) { if (kids) for (var i = 0; i < kids.length; i++) kids[i].up(s); else { kids = group(c.c, s, svg); if (b.parentNode) b.parentNode.insertBefore(frag(kids), b); } }
else if (kids) { kids.forEach(function (x) { x.rm(); }); kids = null; }
},
rm: function () { if (kids) kids.forEach(function (x) { x.rm(); }); a.remove(); b.remove(); }
};
self.up(sc); return self;
}
// ---- tiny element helper for the few nodes built in code (createElement) ----
function h(type, props) { var ch = []; for (var i = 2; i < arguments.length; i++) ch.push(arguments[i]); return { $v: 1, type: type, props: props || {}, key: props && props.key, ch: flat(ch) }; }
function flat(a) { var o = []; a.forEach(function (x) { if (Array.isArray(x)) o.push.apply(o, flat(x)); else o.push(x); }); return o; }
function setStyleProp(st, k, v) { if (v == null || v === '') { st[k] = ''; return; } if (k.indexOf('--') === 0) { st.setProperty(k, v); return; } st[k] = typeof v === 'number' && !UNITLESS[k] ? v + 'px' : v; }
function mountV(v, svg) {
if (v == null || v === false || v === true) return document.createTextNode('');
if (typeof v !== 'object') return document.createTextNode(String(v));
var isSvg = svg || v.type === 'svg', el = isSvg ? document.createElementNS(SVG, v.type) : document.createElement(v.type);
el.__h = {}; propsV(el, {}, v.props);
v.ch.forEach(function (x) { el.appendChild(mountV(x, isSvg)); });
return el;
}
function propsV(el, o, n) {
var k;
for (k in o) if (!(k in n) && k !== 'children') { if (/^on[A-Z]/.test(k)) el.__h[k.slice(2).toLowerCase()] = null; else if (k !== 'style' && k !== 'ref' && k !== 'key') el.removeAttribute(k === 'className' ? 'class' : k); }
for (k in n) {
var v = n[k]; if (k === 'key' || k === 'children') continue;
if (k === 'ref') { if (o.ref !== v) refQ.push([o.ref, null], [v, el]); continue; }
if (/^on[A-Z]/.test(k)) { var t = k.slice(2).toLowerCase(); if (!(t in el.__h)) el.addEventListener(t, function (e) { var f = el.__h[e.type]; f && f(e); }); el.__h[t] = v; continue; }
if (k === 'style') { var os = o.style || {}, ns = v || {}, q; for (q in os) if (!(q in ns)) setStyleProp(el.style, q, ''); for (q in ns) if (os[q] !== ns[q]) setStyleProp(el.style, q, ns[q]); continue; }
if (o[k] === v && k !== 'value') continue;
var name = k === 'className' ? 'class' : k === 'htmlFor' ? 'for' : k === 'playsInline' ? 'playsinline' : k === 'autoPlay' ? 'autoplay' : k === 'tabIndex' ? 'tabindex' : k;
if ((k === 'muted' || k === 'value' || k === 'loop' || k === 'autoplay') && k in el) el[k] = v;
if (v === false || v == null) el.removeAttribute(name); else el.setAttribute(name, v === true ? '' : v);
}
}
function patchV(dom, o, n) {
if (o === n) return dom;
var oo = o && typeof o === 'object', no = n && typeof n === 'object';
if (!oo && !no && dom.nodeType === 3) { var t = n == null || n === false || n === true ? '' : String(n); if (dom.data !== t) dom.data = t; return dom; }
if (!oo || !no || o.type !== n.type || o.key !== n.key) { var r = mountV(n, dom.namespaceURI === SVG && n && n.type !== 'svg'); unrefV([o]); dom.parentNode.replaceChild(r, dom); return r; }
propsV(dom, o.props, n.props); patchKids(dom, o.ch, n.ch); return dom;
}
function patchKids(el, oc, nc) {
var nodes = Array.prototype.slice.call(el.childNodes);
for (var i = 0; i < nc.length; i++) { if (i < oc.length && nodes[i]) patchV(nodes[i], oc[i], nc[i]); else el.appendChild(mountV(nc[i], el.namespaceURI === SVG)); }
for (i = nc.length; i < nodes.length; i++) { unrefV([oc[i]]); nodes[i].remove(); }
}
function unrefV(list) { (list || []).forEach(function (v) { if (v && typeof v === 'object') { if (v.props && v.props.ref) setRef(v.props.ref, null); unrefV(v.ch); } }); }
function flushRefs() { var q = refQ; refQ = []; for (var i = 0; i < q.length; i++) setRef(q[i][0], q[i][1]); var f = focusQ; focusQ = []; f.forEach(function (el) { setTimeout(function () { if (el.isConnected) el.focus(); }, 0); }); }
// ---- component base + mount ----
function DCLogic(props) { this.props = props || {}; this.state = {}; }
DCLogic.prototype.setState = function (u, cb) { this.__q.push([u, cb]); this.__sched(); };
DCLogic.prototype.forceUpdate = function (cb) { this.__q.push([null, cb]); this.__sched(); };
function mount(root, Cls, html, props, opts) {
opts = opts || {};
var tpl = document.createElement('template'); tpl.innerHTML = html;
var desc = compile(tpl.content), c = new Cls(props || {}), queued = false;
c.props = props || {}; c.__q = []; c.__sched = function () {};
if (opts.init) opts.init(c);
var scope = function () { var v = {}; try { v = c.renderVals ? c.renderVals() || {} : {}; } catch (e) { console.error('[dc-lite] renderVals', e); } var s = Object.assign({}, c.props); for (var k in v) s[k] = v[k]; return s; };
STATIC = !!opts.static;
var top; try { top = group(desc, scope(), false); } finally { STATIC = false; }
root.replaceChildren(frag(top)); flushRefs();
if (opts.static) return { comp: c };
c.__sched = function () { if (!queued) { queued = true; queueMicrotask(flush); } };
var burst = 0, burstT = 0;
function flush() {
queued = false; var q = c.__q.splice(0); if (!q.length) return;
if (++burst > 60) { if (burst === 61) console.error('[dc-lite] update loop stopped', q.map(function (x) { return x[0] && typeof x[0] === 'object' ? Object.keys(x[0]).join(',') : String(x[0]).slice(0, 80); })); return; }
if (!burstT) burstT = setTimeout(function () { burst = 0; burstT = 0; }, 0);
var prevState = c.state, st = c.state, cbs = [];
for (var i = 0; i < q.length; i++) { var u = q[i][0]; if (u) { var part = typeof u === 'function' ? u(st, c.props) : u; if (part) st = Object.assign({}, st, part); } if (q[i][1]) cbs.push(q[i][1]); }
c.state = st; var s = scope();
try { for (var j = 0; j < top.length; j++) top[j].up(s); } catch (e) { console.error('[dc-lite] update', e); }
flushRefs();
if (c.componentDidUpdate) try { c.componentDidUpdate(c.props, prevState); } catch (e) { console.error(e); }
cbs.forEach(function (f) { try { f.call(c); } catch (e) { console.error(e); } });
}
if (c.componentDidMount) try { c.componentDidMount(); } catch (e) { console.error('[dc-lite] mount', e); }
window.addEventListener('pagehide', function () { c.componentWillUnmount && c.componentWillUnmount(); });
return { comp: c };
}
window.DCLogic = DCLogic;
window.React = { createElement: h, createRef: function () { return { current: null }; }, Fragment: 'span' };
window.DCLite = { mount: mount, compile: compile, resolve: resolve };
})();
