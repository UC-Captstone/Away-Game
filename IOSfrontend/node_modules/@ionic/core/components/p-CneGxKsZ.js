/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{k as o,w as s}from"./p-BJoMtgfR.js";import{a as t,s as r}from"./p-C59ryAuS.js";import{c as a}from"./p-DgbT0exM.js";const n=()=>{const n=window;n.addEventListener("statusTap",(()=>{o((()=>{const o=document.elementFromPoint(n.innerWidth/2,n.innerHeight/2);if(!o)return;const e=t(o);e&&new Promise((o=>a(e,o))).then((()=>{s((async()=>{e.style.setProperty("--overflow","hidden"),await r(e,300),e.style.removeProperty("--overflow")}))}))}))}))};export{n as startStatusTap}