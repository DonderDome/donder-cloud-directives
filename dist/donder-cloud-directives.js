function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var d;const c=window,l=c.trustedTypes,h=l?l.emptyScript:"",v=c.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),g={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:u},m="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||g}static finalize(){if(this.hasOwnProperty(m))return!1;this[m]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((i=>{const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=g){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _;f[m]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==v||v({ReactiveElement:f}),(null!==(d=c.reactiveElementVersions)&&void 0!==d?d:c.reactiveElementVersions=[]).push("1.6.3");const y=window,$=y.trustedTypes,w=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,b="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,A="?"+x,E=`<${A}>`,S=document,C=()=>S.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,k=Array.isArray,P="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,M=/>/g,R=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,H=/"/g,T=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),z=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),j=new WeakMap,L=S.createTreeWalker(S,129,null,!1);function B(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=U;for(let e=0;e<i;e++){const i=t[e];let a,d,c=-1,l=0;for(;l<i.length&&(r.lastIndex=l,d=r.exec(i),null!==d);)l=r.lastIndex,r===U?"!--"===d[1]?r=N:void 0!==d[1]?r=M:void 0!==d[2]?(T.test(d[2])&&(o=RegExp("</"+d[2],"g")),r=R):void 0!==d[3]&&(r=R):r===R?">"===d[0]?(r=null!=o?o:U,c=-1):void 0===d[1]?c=-2:(c=r.lastIndex-d[2].length,a=d[1],r=void 0===d[3]?R:'"'===d[3]?H:O):r===H||r===O?r=R:r===N||r===M?r=U:(r=R,o=void 0);const h=r===R&&t[e+1].startsWith("/>")?" ":"";n+=r===U?i+E:c>=0?(s.push(a),i.slice(0,c)+b+i.slice(c)+x+h):i+x+(-2===c?(s.push(void 0),e):h)}return[B(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[d,c]=W(t,e);if(this.el=q.createElement(d,i),L.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=L.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(b)||e.startsWith(x)){const i=c[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+b).split(x),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?J:"?"===e[1]?Z:"@"===e[1]?G:X})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(T.test(s.tagName)){const t=s.textContent.split(x),e=t.length-1;if(e>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),L.nextNode(),a.push({type:2,index:++o});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===A)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(x,t+1));)a.push({type:7,index:o}),t+=x.length-1}o++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){var o,n,r,a;if(e===z)return e;let d=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=D(e)?void 0:e._$litDirective$;return(null==d?void 0:d.constructor)!==c&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===c?d=void 0:(d=new c(t),d._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=d:i._$Cl=d),void 0!==d&&(e=Y(t,d._$AS(t,e.values),d,s)),e}class F{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(i,!0);L.currentNode=o;let n=L.nextNode(),r=0,a=0,d=s[0];for(;void 0!==d;){if(r===d.index){let e;2===d.type?e=new K(n,n.nextSibling,this,t):1===d.type?e=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(e=new tt(n,this,t)),this._$AV.push(e),d=s[++a]}r!==(null==d?void 0:d.index)&&(n=L.nextNode(),r++)}return L.currentNode=S,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{constructor(t,e,i,s){var o;this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),D(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>k(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==V&&D(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=q.createElement(B(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new F(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new q(t)),e}T(t){k(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new K(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class X{constructor(t,e,i,s,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Y(this,t,e,0),n=!D(t)||t!==this._$AH&&t!==z,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Y(this,s[i+r],e,r),a===z&&(a=this._$AH[r]),n||(n=!D(a)||a!==this._$AH[r]),a===V?t=V:t!==V&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}const Q=$?$.emptyScript:"";class Z extends X{constructor(){super(...arguments),this.type=4}j(t){t&&t!==V?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class G extends X{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=Y(this,t,e,0))&&void 0!==i?i:V)===z)return;const s=this._$AH,o=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==V&&(s===V||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const et=y.litHtmlPolyfillSupport;null==et||et(q,K),(null!==(_=y.litHtmlVersions)&&void 0!==_?_:y.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,st;class ot extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new K(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return z}}ot.finalized=!0,ot._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:ot});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:ot}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function at(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):rt(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function dt(t){return at({...t,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ct,lt,ht;function vt(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var s=e.get("hass");return!s||s.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}null===(ct=window.HTMLSlotElement)||void 0===ct||ct.prototype.assignedElements,function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(lt||(lt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ht||(ht={}));let pt=class extends ot{setConfig(t){this._config=t}static get styles(){return r`
      ha-form {
        padding: 16px;
      }
    `}render(){return this.hass&&this._config?I`
      <ha-form
        .data=${this._config}
        .schema=${[{type:"string",name:"name",label:"Name",required:!0},{type:"string",name:"entity",label:"Entity",required:!0}]}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:I``}_valueChanged(t){const e=t.detail.value;e&&(this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}})))}};t([at({attribute:!1})],pt.prototype,"hass",void 0),t([dt()],pt.prototype,"_config",void 0),pt=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e))("donder-cloud-directives-editor")],pt);class ut extends ot{constructor(){super(...arguments),this.directives=[],this.creating=null,this.deleting=null,this.downloading=null,this.creation_stage="",this.creation_message="",this.creation_message_old="",this.error="",this.conversations=[],this._stageChanged=!1,this.selectedDirective=null,this.showDetailsView=!1,this.conversationInput="",this.isSendingMessage=!1,this.expandedDirective=null,this.newDirectiveMessage="",this._isRendered=!1}setConfig(t,e,i,s,o,n,r,a,d){this.config={type:"donder-cloud-directives-dialog",name:"Donder Cloud Directives",entity:"sensor.donder_directives"},this.hass=t,this.directives=e,this.creating=i,this.deleting=s,this.downloading=o,this.error=a,this.conversations=d,this.creation_stage!==n&&(this.creation_message_old=this.creation_message,this.creation_message=r,this.creation_stage=n,this._stageChanged=!0,setTimeout((()=>{this._stageChanged=!1}),250))}shouldUpdate(t){return this._hasConfigOrEntityChanged(this,t,!1)||vt(this,t,!1)}_hasConfigOrEntityChanged(t,e,i){if(e.has("config")||i)return!0;const s=e.get("hass");if(s&&this.config.entity){return s.states[this.config.entity].state!==t.hass.states[this.config.entity].state}return!1}_propagateVisionSync(){this.hass?this.hass.callService("mqtt","publish",{topic:"direktive-vision-ha-addon/fetch_vision_entities",payload:"{}",qos:0,retain:!1}).then((()=>{console.log("MQTT message published to trigger entity sync.")})).catch((t=>{console.error("Error publishing MQTT message:",t)})):console.error("Home Assistant object (hass) is not available.")}async _createDirective(){if(!(this.deleting||this.creating||this.downloading))if(this.newDirectiveMessage.trim())try{(await this.hass.callWS({type:"donder_cloud/create_directive",message:this.newDirectiveMessage.trim()})).success&&(this._showNotification("Directive created successfully","success"),this._propagateVisionSync())}catch(t){console.error("Error creating directive:",t),this._showNotification("Error creating directive","error")}else this._showNotification("Please enter a directive message","warning")}async _deleteDirective(t){if(!(this.deleting||this.creating||this.downloading))try{(await this.hass.callWS({type:"donder_cloud/delete_directive",directive_id:t})).success&&(this._showNotification("Directive deleted successfully","success"),this._propagateVisionSync())}catch(t){console.error("Error deleting directive:",t),this._showNotification("Error deleting directive","error")}}async _downloadDirective(t,e){if(!(this.deleting||this.creating||this.downloading))try{const i=await this.hass.callWS({type:"donder_cloud/download_directive",directive_id:t,message:e});i.success&&(this.directives=i.directives,this._showNotification("Directive downloaded successfully","success"),this._propagateVisionSync())}catch(t){console.error("Error downloading directive:",t),this._showNotification("Error downloading directive","error")}}_showNotification(t,e){this.hass.callService("persistent_notification","create",{title:"Donder Cloud",message:t,notification_id:`donder_cloud_${e}`})}_getStatusIcon(t,e,i){if(this.deleting===e)return"mdi:loading";if(this.downloading===e)return"mdi:loading";if(!1===i)return"mdi:creation-outline";switch(t){case"success":return"mdi:check-all";case"warning":case"error":return"mdi:alert-circle";default:return"mdi:help-circle"}}_getStatusClass(t){switch(t){case"success":return"status-success";case"warning":return"status-warning";default:return"status-unknown"}}async _loadConversation(t){try{const e=await this.hass.callWS({type:"donder_cloud/get_conversation",directive_id:t});e.success&&this.selectedDirective&&(this.selectedDirective.messages=e.messages,this.requestUpdate())}catch(t){console.error("Error loading conversation:",t),this._showNotification("Error loading conversation","error")}}async _sendMessage(){if(this.selectedDirective&&this.conversationInput.trim()&&!this.isSendingMessage)try{this.isSendingMessage=!0;(await this.hass.callWS({type:"donder_cloud/send_conversation_message",directive_id:this.selectedDirective.id,prompt:this.conversationInput.trim()})).success&&(this.conversationInput="",await this._loadConversation(this.selectedDirective.id))}catch(t){console.error("Error sending message:",t),this._showNotification("Error sending message","error")}finally{this.isSendingMessage=!1}}static get styles(){return r`
      :host {
        display: block;
        padding: 16px;
        max-width: 600px;
        width: 100%;
        --spacing: 12px;
      }
      .content {
        min-width: 500px;
      }
      .directive-list {
        margin-bottom: 20px;
        max-height: 400px;
        overflow-y: auto;
        transition: opacity 0.25s ease, transform 0.25s ease;
      }
      .directive-list.hidden {
        opacity: 0;
        transform: translateX(-20px);
        pointer-events: none;
      }
      .directive-details {
        position: absolute;
        width: 86%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 16px;
        background: var(--mdc-theme-surface);
        opacity: 0;
        transform: translateX(20px);
        transition: opacity 0.25s ease, transform 0.25s ease;
        pointer-events: none;
      }
      .directive-details.visible {
        opacity: 1;
        transform: translateX(0);
        pointer-events: auto;
      }
      .back-button {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        color: var(--primary-text-color);
      }
      .directive-detail-content {
        margin-top: 26px;
      }
      .detail-item {
        margin-bottom: 12px;
      }
      .detail-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }
      .chat-title {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 15px;
      }
      .detail-value {
        font-size: 14px;
        color: var(--primary-text-color);
      }
      .directive-item {
        display: flex;
        position: relative;
        align-items: center;
        padding: 10px;
        padding-right: 100px;
        border-bottom: 1px solid var(--divider-color);
        cursor: pointer;
      }
      .directive-item:last-child {
        border-bottom: none;
      }
      .directive-content {
        flex-grow: 1;
        margin-right: 10px;
        display: flex;
      }
      .directive-message {
        margin-bottom: 5px;
        max-width: 350px;
        flex-wrap: wrap;
        padding-top: 3px;
      }
      .directive-status-icon {
        margin-right: var(--spacing);
      }
      .directive-actions {
        position: absolute;
        width: 0%;
        right: 0;
        top: 5px;
        display: flex;
        gap: 10px;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, var(--mdc-theme-surface) 60%);
        transition: width 0s ease-in-out;
        justify-content: flex-end;
      }
      .directive-actions.expanded {
        width: 100%;
      }
      .status-success {
        color: var(--success-color);
      }
      .status-warning {
        color: var(--warning-color);
      }
      .new-directive {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }
      .new-directive input {
        flex-grow: 1;
      }
      .new-directive-input {
        padding: var(--spacing);
      }
      .new-directive.hidden {
        opacity: 0;
        pointer-events: none;
      }
      .confirm-delete {
        display: flex;
        gap: 10px;
      }
      .dialog-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 16px;
      }
      .delete-icon, .download-icon {
        color: var(--secondary-text-color);
      }
      .delete-icon.is-loading, .download-icon.is-loading {
        opacity: 0.5;
      }
      @keyframes spin {
        100% { transform: rotate(360deg); }
      }

      .rotating-icon {
        animation: spin 1s linear infinite;
      }
      .directive-list-subtitle {
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 10px;
        color: var(--secondary-text-color);
      }
      .create-directive-button {
        flex: 0 1 40px;
        margin-left: 20px;
      }
      .message-icon {
        margin-left: 10px;
        color: var(--secondary-text-color);
      }
      .muted {
        color: var(--secondary-text-color);
      }
      .conversation-container {
        margin-top: 20px;
        border-top: 1px solid var(--divider-color);
        padding-top: 16px;
        padding-bottom: 40px;
        width: 110%;
      }

      .message-list {
        /* max-height: 300px;
        overflow-y: auto; */
        margin-bottom: 16px;
      }

      .message {
        margin-bottom: 12px;
        padding: 8px 12px;
        border-radius: 8px;
        max-width: 80%;
      }

      .message.user {
        background-color: var(--primary-color);
        color: var(--text-primary-color);
        margin-left: auto;
      }

      .message.assistant {
        background-color: var(--secondary-background-color);
        margin-right: auto;
      }

      .message-time {
        font-size: 11px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      .conversation-input {
        display: flex;
        gap: 8px;
        margin-top: 16px;
      }

      .conversation-input input {
        flex-grow: 1;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
      }

      .conversation-input button {
        min-width: 80px;
      }

      .conversation-input button:disabled {
        opacity: 0.5;
      }
      .creation-progress-container {
        position: relative;
        height: 20px;
        margin-top: 10px;
      }
      .creation-progress-message.animated {
        position: absolute;
        width: 100%;
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
      }
      .creation-progress-message.old {
        animation: fadeOutUp 0.25s forwards;
      }
      .creation-progress-message.new {
        animation: fadeInDown 0.25s forwards;
      }
      .error-message {
        color: var(--error-color);
        margin-top: 16px;
        font-size: 12px;
        font-weight: 600;
      }
      @keyframes fadeOutUp {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-10px);
        }
      }
      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}show(){if(this._isRendered)throw new Error("Already rendered!");this._isRendered=!0;const t=this.getDialogElement();t&&(t.open=!0);const e=document.getElementsByTagName("home-assistant"),i=e.length?e[0].shadowRoot:null;i?i.appendChild(this):document.body.appendChild(this)}onDialogClose(){this._isRendered&&(this.remove(),this._isRendered=!1)}getDialogElement(){return this._isRendered&&this.renderRoot?this.renderRoot.querySelector("ha-dialog"):null}render(){var t;this._isRendered=!0;const e=this.creating||this.deleting||this.downloading,i=this.directives.filter((t=>!1===t.discovery)),s=this.directives.filter((t=>!0===t.discovery&&!1===t.active));return I`
      <ha-dialog
          open
          @closed=${()=>this.onDialogClose()}
          hideActions
        >
          <div class="content">
            <div class="directive-list ${this.showDetailsView?"hidden":""}">
              <div class="directive-list-subtitle">Suggested Directives</div>
              ${s.map((t=>I`
                <div class="directive-item" @click=${()=>this._showDirectiveDetails(t)}>
                  <div class="directive-content">
                    <div class=${"directive-status-icon "+(this.downloading===t.id?"rotating-icon":"")}>
                      <ha-icon
                        icon=${this._getStatusIcon(t.status,t.id,t.active)}
                        class=${this._getStatusClass(t.status)}
                      ></ha-icon>
                    </div>
                    <div class="directive-message">
                      ${t.title}  
                      <ha-icon icon="mdi:chevron-right" class="message-icon"></ha-icon>
                    </div>                    
                  </div>
                  <div class="directive-actions ${this.downloading===t.id?"expanded":""}">
                    ${this.downloading===t.id?I`
                        <div class="confirm-delete">
                          <ha-button @click=${e=>{e.stopPropagation(),this._downloadDirective(t.id,t.message)}} ?disabled=${e}>Confirm</ha-button>
                          <ha-button ?disabled=${e}>Cancel</ha-button>
                        </div>
                      `:I`
                        <ha-button ?disabled=${e}>
                          <ha-icon icon="mdi:cloud-download-outline" class="download-icon is-loading"></ha-icon>
                        </ha-button>
                      `}
                  </div>
                </div>
              `))}
            </div>
            <div class="directive-list ${this.showDetailsView?"hidden":""}">
              <div class="directive-list-subtitle">Your Directives</div>
              ${i.map((t=>I`
                <div class="directive-item" @click=${()=>this._showDirectiveDetails(t)}>
                  <div class="directive-content">
                    <div class=${"directive-status-icon "+(this.deleting===t.id?"rotating-icon":"")}>
                      <ha-icon
                        icon=${this._getStatusIcon(t.status,t.id,t.active)}
                        class=${this._getStatusClass(t.status)}
                      ></ha-icon>
                    </div>
                    <div class="directive-message">
                      ${t.title}  
                    </div>                    
                  </div>
                  <div class="directive-actions ${this.expandedDirective===t.id?"expanded":""}">
                    ${this.expandedDirective===t.id?I`
                        <div class="confirm-delete">
                          <ha-button @click=${e=>{e.stopPropagation(),this._deleteDirective(t.id)}} ?disabled=${e}>Confirm</ha-button>
                          <ha-button ?disabled=${e}>Cancel</ha-button>
                        </div>
                      `:I`
                        <ha-button @click=${e=>{e.stopPropagation(),this.expandedDirective=t.id}} ?disabled=${e}>
                          <ha-icon icon="mdi:trash-can-outline" class="delete-icon is-loading"></ha-icon>
                        </ha-button>
                      `}
                  </div>
                </div>
              `))}
              ${0===i.length?I`
                <div class="directive-item">
                  <div class="directive-content">
                    <div class="directive-message muted">No active directives</div>
                  </div>
                </div>
              `:""}
            </div>
            <div class="directive-details ${this.showDetailsView?"visible":""}">
              ${this.selectedDirective?I`
                <div class="back-button" @click=${this._hideDirectiveDetails}>
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                  <span>Back to Directives</span>
                </div>
                <div class="directive-detail-content">
                  <div class="detail-item">
                    <div class="detail-label">Automation</div>
                    <div class="detail-value">${this.selectedDirective.title}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Status</div>
                    <div class="detail-value">${this.selectedDirective.discovery?"Suggested - "+(this.selectedDirective.active?"Active":"Inactive"):""+(this.selectedDirective.active?"Active":"Inactive")}</div>
                  </div>
                  <!-- Make this super small under the title -->
                  <!-- <div class="detail-item">
                    <div class="detail-label">Created At</div>
                    <div class="detail-value">${new Date(this.selectedDirective.created_at).toLocaleString()}</div>
                  </div> -->
                  <div class="detail-item">
                    <div class="detail-label">Summary</div>
                    <div class="detail-value">${this.selectedDirective.summary}</div>
                  </div>
                  ${this.selectedDirective.follow_up?I`
                    <div class="detail-item">
                      <div class="detail-label">Follow Up</div>
                      <div class="detail-value">${this.selectedDirective.follow_up}</div>
                    </div>
                  `:""}
                  ${this.selectedDirective.review_summary?I`
                    <div class="detail-item">
                      <div class="detail-label">Review Summary</div>
                      <div class="detail-value">${this.selectedDirective.review_summary}</div>
                    </div>
                  `:""}

                  <div class="conversation-container">
                    <div class="chat-title">AI Chat</div>
                    <div class="message-list">
                      ${null===(t=this.selectedDirective.messages)||void 0===t?void 0:t.map((t=>I`
                        <div class="message ${t.role}">
                          ${"question"===t.content.type?I`
                            <div>${t.content.answer}</div>
                          `:"request"===t.content.type?I`
                            <div>${t.content.request}</div>
                          `:I`
                            <div>${t.content.user_prompt}</div>
                          `}
                        </div>
                      `))}
                    </div>
                    <div class="conversation-input">
                      <input
                        type="text"
                        .value=${this.conversationInput}
                        @input=${t=>{const e=t.target;this.conversationInput=e.value}}
                        @keydown=${t=>{"Enter"!==t.key||t.shiftKey||(t.preventDefault(),this._sendMessage())}}
                        placeholder="Ask me for changes or clarifications on the directive..."
                        ?disabled=${this.isSendingMessage}
                      />
                      <ha-button
                        @click=${()=>this._sendMessage()}
                        ?disabled=${this.isSendingMessage}
                      >
                        ${this.isSendingMessage?I`
                          <ha-icon icon="mdi:loading" class="rotating-icon"></ha-icon>
                        `:"Send"}
                      </ha-button>
                    </div>
                  </div>
                </div>
              `:""}
            </div>
            <div class="new-directive ${this.showDetailsView?"hidden":""}">
              <input
                type="text"
                class="new-directive-input"
                .value=${this.newDirectiveMessage}
                @input=${t=>{const e=t.target;this.newDirectiveMessage=e.value}}
                @click=${t=>t.stopPropagation()}
                placeholder="Enter new directive..."
                ?disabled=${e}
              />
              <div class=${"create-directive-button "+(this.creating?"rotating-icon":"")}>
                ${this.creating?I`<ha-icon icon="mdi:loading" class="rotating-icon"></ha-icon>`:I`<ha-button @click=${()=>this._createDirective()} ?disabled=${e}>Create</ha-button>`}
              </div>
            </div>
            ${this.creating?I`
              <div class="creation-progress-container ${this.showDetailsView?"hidden":""}">
                ${this._stageChanged?I`
                  <div class="creation-progress-message animated old">${this.creation_message_old}</div>
                `:""}
                <div class="creation-progress-message animated ${this._stageChanged?"new":""}">${this.creation_message}</div>
              </div>
            `:""}
            ${this.error?I`
              <div class="error-message ${this.showDetailsView?"hidden":""}">${this.error}</div>
            `:""}
          </div>
        </ha-dialog>
    `}_showDirectiveDetails(t){this.selectedDirective=t,this.showDetailsView=!0,this._loadConversation(t.id)}_hideDirectiveDetails(){this.showDetailsView=!1,this.selectedDirective=null}}t([dt()],ut.prototype,"hass",void 0),t([dt()],ut.prototype,"config",void 0),t([dt()],ut.prototype,"directives",void 0),t([dt()],ut.prototype,"creating",void 0),t([dt()],ut.prototype,"deleting",void 0),t([dt()],ut.prototype,"downloading",void 0),t([dt()],ut.prototype,"creation_stage",void 0),t([dt()],ut.prototype,"creation_message",void 0),t([dt()],ut.prototype,"creation_message_old",void 0),t([dt()],ut.prototype,"error",void 0),t([dt()],ut.prototype,"conversations",void 0),t([dt()],ut.prototype,"_stageChanged",void 0),t([dt()],ut.prototype,"selectedDirective",void 0),t([dt()],ut.prototype,"showDetailsView",void 0),t([dt()],ut.prototype,"conversationInput",void 0),t([dt()],ut.prototype,"isSendingMessage",void 0),t([dt()],ut.prototype,"expandedDirective",void 0),customElements.define("donder-cloud-directives-dialog",ut),console.info("%c  DONDER-CLOUD-DIRECTIVES \n%c  version: 1.9.4  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"donder-cloud-directives",name:"Donder Cloud Directives",description:"A custom card for managing directives"});class gt extends ot{constructor(){super(...arguments),this.directives=[],this.creating=null,this.deleting=null,this.downloading=null,this.creation_stage="",this.creation_message="",this.error="",this.conversations=[],this.dialog=null}static async getConfigElement(){return document.createElement("donder-cloud-directives-editor")}static getStubConfig(){return{}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config=Object.assign(Object.assign({},t),{name:"Donder Cloud Directives",entity:"sensor.donder_directives"})}shouldUpdate(t){return!!this.config&&(this._hasConfigOrEntityChanged(this,t,!1)||vt(this,t,!1))}_hasConfigOrEntityChanged(t,e,i){if(e.has("config")||i)return!0;const s=e.get("hass");if(s&&this.config.entity){return s.states[this.config.entity].state!==t.hass.states[this.config.entity].state}return!1}_showWarning(t){return I`
      <hui-warning>${t}</hui-warning>
    `}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),I`
      ${e}
    `}_getStatus(){return this.directives.reduce(((t,e)=>(t[e.status]++,t.total++,t)),{total:0,success:0,warning:0})}_openDialog(){this.dialog=new ut,this.dialog.setConfig(this.hass,this.directives,this.creating,this.deleting,this.downloading,this.creation_stage,this.creation_message,this.error,this.conversations),this.dialog.show()}static get styles(){return r`
      :host {
        --spacing: 12px;
      }
      .type-custom-donder-cloud-directives {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: var(--spacing);
        display: flex;
        flex-direction: column;
        justify-content: var(--layout-align);
        height: auto;
        cursor: pointer;
      }
      .donder-cloud-directives {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
      }
      .status-icon {
        margin-right: var(--spacing);
      }
      .status-text {
        min-width: 0;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .summary {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: 16px;
      }
      .status-text-total {
        font-weight: var(--card-primary-font-weight);
        font-size: var(--card-primary-font-size);
        line-height: var(--card-primary-line-height);
        color: var(--primary-text-color);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .status-text-subtitle {
        font-weight: var(--card-secondary-font-weight);
        font-size: var(--card-secondary-font-size);
        line-height: var(--card-secondary-line-height);
        color: var(--secondary-text-color);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .status-success {
        color: var(--success-color);
      }
      .status-warning {
        color: var(--warning-color);
      }
    `}_updateDirectivesFromSensor(){const t=this.hass.states[this.config.entity];t&&t.attributes.directives&&(this.directives=t.attributes.directives,this.creating=t.attributes.creating,this.deleting=t.attributes.deleting,this.downloading=t.attributes.downloading,this.creation_stage=t.attributes.creation_stage,this.creation_message=t.attributes.creation_message,this.error=t.attributes.error,this.conversations=t.attributes.conversations,this.dialog&&this.dialog.setConfig(this.hass,this.directives,this.creating,this.deleting,this.downloading,this.creation_stage,this.creation_message,this.error,this.conversations))}firstUpdated(){this._updateDirectivesFromSensor()}render(){if(this.config.show_warning)return this._showWarning("warning message");if(this.config.show_error)return this._showError("error message");this._updateDirectivesFromSensor();const t=this._getStatus();return I`
      <ha-card
        @click=${()=>this._openDialog()}
        tabindex="0"
      >
        <div class='donder-cloud-directives'>
          <div class="status-icon">
            ${t.warning>0?I`<ha-icon icon="mdi:alert-circle" class="status-warning"></ha-icon>`:I`<ha-icon icon="mdi:alpha-d-circle"></ha-icon>`}
          </div>
          <div class="status-text">
            <div class="status-text-total">
              You have a total of ${t.total} directives
            </div>
            <div class="status-text-subtitle">
              ${t.warning>0?I`<i>You have <span>${t.warning}</span> warnings</i>`:I`<i>You have no warnings</i>`}
            </div>
          </div>
        </div>
      </ha-card>
    `}}t([dt()],gt.prototype,"hass",void 0),t([dt()],gt.prototype,"config",void 0),t([dt()],gt.prototype,"directives",void 0),t([dt()],gt.prototype,"creating",void 0),t([dt()],gt.prototype,"deleting",void 0),t([dt()],gt.prototype,"downloading",void 0),t([dt()],gt.prototype,"creation_stage",void 0),t([dt()],gt.prototype,"creation_message",void 0),t([dt()],gt.prototype,"error",void 0),t([dt()],gt.prototype,"conversations",void 0),customElements.define("donder-cloud-directives",gt);export{gt as DonderCloudDirectives};
