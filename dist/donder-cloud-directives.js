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
 */;var d;const c=window,l=c.trustedTypes,h=l?l.emptyScript:"",v=c.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},p=(t,e)=>e!==t&&(e==e||t==t),g={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p},m="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||g}static finalize(){if(this.hasOwnProperty(m))return!1;this[m]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{i?t.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((i=>{const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=g){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _;f[m]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==v||v({ReactiveElement:f}),(null!==(d=c.reactiveElementVersions)&&void 0!==d?d:c.reactiveElementVersions=[]).push("1.6.3");const y=window,$=y.trustedTypes,w=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,b="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,A="?"+x,D=`<${A}>`,E=document,S=()=>E.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,k=Array.isArray,P="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,M=/>/g,R=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,O=/"/g,H=/^(?:script|style|textarea|title)$/i,T=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),z=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),V=new WeakMap,L=E.createTreeWalker(E,129,null,!1);function B(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,d,c=-1,l=0;for(;l<i.length&&(r.lastIndex=l,d=r.exec(i),null!==d);)l=r.lastIndex,r===N?"!--"===d[1]?r=U:void 0!==d[1]?r=M:void 0!==d[2]?(H.test(d[2])&&(o=RegExp("</"+d[2],"g")),r=R):void 0!==d[3]&&(r=R):r===R?">"===d[0]?(r=null!=o?o:N,c=-1):void 0===d[1]?c=-2:(c=r.lastIndex-d[2].length,a=d[1],r=void 0===d[3]?R:'"'===d[3]?O:I):r===O||r===I?r=R:r===U||r===M?r=N:(r=R,o=void 0);const h=r===R&&t[e+1].startsWith("/>")?" ":"";n+=r===N?i+D:c>=0?(s.push(a),i.slice(0,c)+b+i.slice(c)+x+h):i+x+(-2===c?(s.push(void 0),e):h)}return[B(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[d,c]=W(t,e);if(this.el=q.createElement(d,i),L.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=L.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(b)||e.startsWith(x)){const i=c[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+b).split(x),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Y:"?"===e[1]?Z:"@"===e[1]?G:X})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(H.test(s.tagName)){const t=s.textContent.split(x),e=t.length-1;if(e>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],S()),L.nextNode(),a.push({type:2,index:++o});s.append(t[e],S())}}}else if(8===s.nodeType)if(s.data===A)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(x,t+1));)a.push({type:7,index:o}),t+=x.length-1}o++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function F(t,e,i=t,s){var o,n,r,a;if(e===z)return e;let d=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=C(e)?void 0:e._$litDirective$;return(null==d?void 0:d.constructor)!==c&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===c?d=void 0:(d=new c(t),d._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=d:i._$Cl=d),void 0!==d&&(e=F(t,d._$AS(t,e.values),d,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(i,!0);L.currentNode=o;let n=L.nextNode(),r=0,a=0,d=s[0];for(;void 0!==d;){if(r===d.index){let e;2===d.type?e=new J(n,n.nextSibling,this,t):1===d.type?e=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(e=new tt(n,this,t)),this._$AV.push(e),d=s[++a]}r!==(null==d?void 0:d.index)&&(n=L.nextNode(),r++)}return L.currentNode=E,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{constructor(t,e,i,s){var o;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=F(this,t,e),C(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>k(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==j&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=q.createElement(B(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new K(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new q(t)),e}T(t){k(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new J(this.k(S()),this.k(S()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class X{constructor(t,e,i,s,o){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=F(this,t,e,0),n=!C(t)||t!==this._$AH&&t!==z,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=F(this,s[i+r],e,r),a===z&&(a=this._$AH[r]),n||(n=!C(a)||a!==this._$AH[r]),a===j?t=j:t!==j&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Y extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const Q=$?$.emptyScript:"";class Z extends X{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class G extends X{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=F(this,t,e,0))&&void 0!==i?i:j)===z)return;const s=this._$AH,o=t===j&&s!==j||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==j&&(s===j||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){F(this,t)}}const et=y.litHtmlPolyfillSupport;null==et||et(q,J),(null!==(_=y.litHtmlVersions)&&void 0!==_?_:y.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,st;class ot extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new J(e.insertBefore(S(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return z}}ot.finalized=!0,ot._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:ot});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:ot}),(null!==(st=globalThis.litElementVersions)&&void 0!==st?st:globalThis.litElementVersions=[]).push("3.3.3");
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
 */var ct,lt,ht;function vt(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var s=e.get("hass");return!s||s.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}null===(ct=window.HTMLSlotElement)||void 0===ct||ct.prototype.assignedElements,function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(lt||(lt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ht||(ht={}));let ut=class extends ot{setConfig(t){this._config=t}static get styles(){return r`
      ha-form {
        padding: 16px;
      }
    `}render(){return this.hass&&this._config?T`
      <ha-form
        .data=${this._config}
        .schema=${[{type:"string",name:"name",label:"Name",required:!0},{type:"string",name:"entity",label:"Entity",required:!0}]}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:T``}_valueChanged(t){const e=t.detail.value;e&&(this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}})))}};t([at({attribute:!1})],ut.prototype,"hass",void 0),t([dt()],ut.prototype,"_config",void 0),ut=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e))("donder-cloud-directives-editor")],ut);class pt extends ot{constructor(){super(...arguments),this.directives=[],this.deletingDirectiveId=null,this.downloadingDirectiveId=null,this.isDeleting=!1,this.isDownloading=!1,this.isCreating=!1,this.selectedDirective=null,this.showDetailsView=!1,this.conversationInput="",this.isSendingMessage=!1,this.newDirectiveMessage="",this._isRendered=!1}setConfig(t,e){this.config={type:"donder-cloud-directives-dialog",name:"Donder Cloud Directives",entity:"sensor.donder_directives"},this.hass=t,this.directives=e}shouldUpdate(t){return this._hasConfigOrEntityChanged(this,t,!1)||vt(this,t,!1)}_hasConfigOrEntityChanged(t,e,i){if(e.has("config")||i)return!0;const s=e.get("hass");if(s&&this.config.entity){return s.states[this.config.entity].state!==t.hass.states[this.config.entity].state}return!1}_propagateVisionSync(){this.hass?this.hass.callService("mqtt","publish",{topic:"direktive-vision-ha-addon/fetch_vision_entities",payload:"{}",qos:0,retain:!1}).then((()=>{console.log("MQTT message published to trigger entity sync.")})).catch((t=>{console.error("Error publishing MQTT message:",t)})):console.error("Home Assistant object (hass) is not available.")}async _createDirective(){if(!(this.isDeleting||this.isCreating||this.isDownloading))if(this.newDirectiveMessage.trim())try{this.isCreating=!0;const t=await this.hass.callWS({type:"donder_cloud/create_directive",message:this.newDirectiveMessage.trim()});t.success&&(this.isCreating=!1,this.directives=t.directives,this.newDirectiveMessage="",this._showNotification("Directive created successfully","success"),this._propagateVisionSync())}catch(t){console.error("Error creating directive:",t),this.isCreating=!1,this._showNotification("Error creating directive","error")}else this._showNotification("Please enter a directive message","warning")}async _deleteDirective(t){if(!(this.isDeleting||this.isCreating||this.isDownloading))try{this.isDeleting=!0;(await this.hass.callWS({type:"donder_cloud/delete_directive",directive_id:t})).success&&(this.deletingDirectiveId=null,this._showNotification("Directive deleted successfully","success"),this.isDeleting=!1,this._propagateVisionSync())}catch(t){console.error("Error deleting directive:",t),this._showNotification("Error deleting directive","error"),this.isDeleting=!1}}async _downloadDirective(t){if(!(this.isDeleting||this.isCreating||this.isDownloading))try{this.isDownloading=!0;const e=await this.hass.callWS({type:"donder_cloud/dowload_directive",directive_id:t});e.success&&(this.isDownloading=!1,this.directives=e.directives,this._showNotification("Directive downloaded successfully","success"),this._propagateVisionSync())}catch(t){console.error("Error downloading directive:",t),this.isDownloading=!1,this._showNotification("Error downloading directive","error")}}_showNotification(t,e){this.hass.callService("persistent_notification","create",{title:"Donder Cloud",message:t,notification_id:`donder_cloud_${e}`})}_getStatusIcon(t,e,i){if(this.deletingDirectiveId===e&&this.isDeleting)return"mdi:loading";if(this.downloadingDirectiveId===e&&this.isDownloading)return"mdi:loading";if(!1===i)return"mdi:creation-outline";switch(t){case"success":return"mdi:check-all";case"warning":return"mdi:alert-circle";default:return"mdi:help-circle"}}_getStatusClass(t){switch(t){case"success":return"status-success";case"warning":return"status-warning";default:return"status-unknown"}}async _loadConversation(t){try{const e=await this.hass.callWS({type:"donder_cloud/get_conversation",directive_id:t});e.success&&this.selectedDirective&&(this.selectedDirective.messages=e.messages,this.requestUpdate())}catch(t){console.error("Error loading conversation:",t),this._showNotification("Error loading conversation","error")}}async _sendMessage(){if(this.selectedDirective&&this.conversationInput.trim()&&!this.isSendingMessage)try{this.isSendingMessage=!0;(await this.hass.callWS({type:"donder_cloud/send_conversation_message",directive_id:this.selectedDirective.id,prompt:this.conversationInput.trim()})).success&&(this.conversationInput="",await this._loadConversation(this.selectedDirective.id))}catch(t){console.error("Error sending message:",t),this._showNotification("Error sending message","error")}finally{this.isSendingMessage=!1}}static get styles(){return r`
      :host {
        display: block;
        padding: 16px;
        max-width: 600px;
        width: 100%;
        --spacing: 12px;
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
        flex: 0 1 70px;
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
      }

      .message-list {
        max-height: 300px;
        overflow-y: auto;
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
    `}show(){if(this._isRendered)throw new Error("Already rendered!");this._isRendered=!0;const t=this.getDialogElement();t&&(t.open=!0);const e=document.getElementsByTagName("home-assistant"),i=e.length?e[0].shadowRoot:null;i?i.appendChild(this):document.body.appendChild(this)}onDialogClose(){this._isRendered&&(this.remove(),this._isRendered=!1)}getDialogElement(){return this._isRendered&&this.renderRoot?this.renderRoot.querySelector("ha-dialog"):null}render(){var t;this._isRendered=!0;const e=this.isDeleting||this.isCreating||this.isDownloading,i=this.directives.filter((t=>!1===t.discovery)),s=this.directives.filter((t=>!0!==t.discovery));return T`
      <ha-dialog
          open
          @closed=${()=>this.onDialogClose()}
          hideActions
        >
          <div class="content">
            <div class="directive-list ${this.showDetailsView?"hidden":""}">
              <div class="directive-list-subtitle">Suggested Directives</div>
              ${s.map((t=>T`
                <div class="directive-item" @click=${()=>this._showDirectiveDetails(t)}>
                  <div class="directive-content">
                    <div class=${"directive-status-icon "+(this.downloadingDirectiveId===t.id&&this.isDownloading?"rotating-icon":"")}>
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
                  <div class="directive-actions ${this.downloadingDirectiveId===t.id?"expanded":""}">
                    ${this.downloadingDirectiveId===t.id?T`
                        <div class="confirm-delete">
                          <ha-button @click=${e=>{e.stopPropagation(),this._downloadDirective(t.id)}} ?disabled=${e}>Confirm</ha-button>
                          <ha-button @click=${t=>{t.stopPropagation(),this.downloadingDirectiveId=null}} ?disabled=${e}>Cancel</ha-button>
                        </div>
                      `:T`
                        <ha-button @click=${e=>{e.stopPropagation(),this.downloadingDirectiveId=t.id}} ?disabled=${e}>
                          <ha-icon icon="mdi:cloud-download-outline" class="download-icon is-loading"></ha-icon>
                        </ha-button>
                      `}
                  </div>
                </div>
              `))}
            </div>
            <div class="directive-list ${this.showDetailsView?"hidden":""}">
              <div class="directive-list-subtitle">Active Directives</div>
              ${i.map((t=>T`
                <div class="directive-item" @click=${()=>this._showDirectiveDetails(t)}>
                  <div class="directive-content">
                    <div class=${"directive-status-icon "+(this.deletingDirectiveId===t.id&&this.isDeleting?"rotating-icon":"")}>
                      <ha-icon
                        icon=${this._getStatusIcon(t.status,t.id,t.active)}
                        class=${this._getStatusClass(t.status)}
                      ></ha-icon>
                    </div>
                    <div class="directive-message">
                      ${t.title}  
                    </div>                    
                  </div>
                  <div class="directive-actions ${this.deletingDirectiveId===t.id?"expanded":""}">
                    ${this.deletingDirectiveId===t.id?T`
                        <div class="confirm-delete">
                          <ha-button @click=${e=>{e.stopPropagation(),this._deleteDirective(t.id)}} ?disabled=${e}>Confirm</ha-button>
                          <ha-button @click=${t=>{t.stopPropagation(),this.deletingDirectiveId=null}} ?disabled=${e}>Cancel</ha-button>
                        </div>
                      `:T`
                        <ha-button @click=${e=>{e.stopPropagation(),this.deletingDirectiveId=t.id}} ?disabled=${e}>
                          <ha-icon icon="mdi:trash-can-outline" class="delete-icon is-loading"></ha-icon>
                        </ha-button>
                      `}
                  </div>
                </div>
              `))}
              ${0===i.length?T`
                <div class="directive-item">
                  <div class="directive-content">
                    <div class="directive-message muted">No active directives</div>
                  </div>
                </div>
              `:""}
            </div>
            <div class="directive-details ${this.showDetailsView?"visible":""}">
              ${this.selectedDirective?T`
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
                    <div class="detail-value">${this.selectedDirective.status}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Created At</div>
                    <div class="detail-value">${new Date(this.selectedDirective.created_at).toLocaleString()}</div>
                  </div>
                  <div class="detail-item">
                    <div class="detail-label">Summary</div>
                    <div class="detail-value">${this.selectedDirective.summary}</div>
                  </div>
                  ${this.selectedDirective.follow_up?T`
                    <div class="detail-item">
                      <div class="detail-label">Follow Up</div>
                      <div class="detail-value">${this.selectedDirective.follow_up}</div>
                    </div>
                  `:""}
                  ${this.selectedDirective.review_summary?T`
                    <div class="detail-item">
                      <div class="detail-label">Review Summary</div>
                      <div class="detail-value">${this.selectedDirective.review_summary}</div>
                    </div>
                  `:""}

                  <div class="conversation-container">
                    <div class="message-list">
                      ${console.log(this.selectedDirective)}
                      ${null===(t=this.selectedDirective.messages)||void 0===t?void 0:t.map((t=>T`
                        <div class="message ${t.role}">
                          ${"question"===t.content.type?T`
                            <div>${t.content.answer}</div>
                          `:"request"===t.content.type?T`
                            <div>${t.content.request}</div>
                          `:T`
                            <div>${t.content.answer||JSON.stringify(t.content)}</div>
                          `}
                          <div class="message-time">
                            ${new Date(t.created_at).toLocaleString()}
                          </div>
                        </div>
                      `))}
                    </div>
                    <div class="conversation-input">
                      <input
                        type="text"
                        .value=${this.conversationInput}
                        @input=${t=>{const e=t.target;this.conversationInput=e.value}}
                        @keydown=${t=>{"Enter"!==t.key||t.shiftKey||(t.preventDefault(),this._sendMessage())}}
                        placeholder="Type your message..."
                        ?disabled=${this.isSendingMessage}
                      />
                      <ha-button
                        @click=${()=>this._sendMessage()}
                        ?disabled=${this.isSendingMessage}
                      >
                        ${this.isSendingMessage?T`
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
              <div class=${"create-directive-button "+(this.isCreating?"rotating-icon":"")}>
                ${this.isCreating?T`<ha-icon icon="mdi:loading" class="rotating-icon"></ha-icon>`:T`<ha-button @click=${()=>this._createDirective()} ?disabled=${e}>Create</ha-button>`}
              </div>
            </div>
          </div>
        </ha-dialog>
    `}_showDirectiveDetails(t){this.selectedDirective=t,this.showDetailsView=!0,this._loadConversation(t.id)}_hideDirectiveDetails(){this.showDetailsView=!1,this.selectedDirective=null}}t([dt()],pt.prototype,"hass",void 0),t([dt()],pt.prototype,"config",void 0),t([dt()],pt.prototype,"directives",void 0),t([dt()],pt.prototype,"deletingDirectiveId",void 0),t([dt()],pt.prototype,"downloadingDirectiveId",void 0),t([dt()],pt.prototype,"isDeleting",void 0),t([dt()],pt.prototype,"isDownloading",void 0),t([dt()],pt.prototype,"isCreating",void 0),t([dt()],pt.prototype,"selectedDirective",void 0),t([dt()],pt.prototype,"showDetailsView",void 0),t([dt()],pt.prototype,"conversationInput",void 0),t([dt()],pt.prototype,"isSendingMessage",void 0),customElements.define("donder-cloud-directives-dialog",pt),console.info("%c  DONDER-CLOUD-DIRECTIVES \n%c  version: 1.7.5  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"donder-cloud-directives",name:"Donder Cloud Directives",description:"A custom card for managing directives"});class gt extends ot{constructor(){super(...arguments),this.directives=[],this.dialog=null}static async getConfigElement(){return document.createElement("donder-cloud-directives-editor")}static getStubConfig(){return{}}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config=Object.assign(Object.assign({},t),{name:"Donder Cloud Directives",entity:"sensor.donder_directives"})}shouldUpdate(t){return!!this.config&&(this._hasConfigOrEntityChanged(this,t,!1)||vt(this,t,!1))}_hasConfigOrEntityChanged(t,e,i){if(e.has("config")||i)return!0;const s=e.get("hass");if(s&&this.config.entity){return s.states[this.config.entity].state!==t.hass.states[this.config.entity].state}return!1}_showWarning(t){return T`
      <hui-warning>${t}</hui-warning>
    `}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),T`
      ${e}
    `}_getStatus(){return this.directives.reduce(((t,e)=>(t[e.status]++,t.total++,t)),{total:0,success:0,warning:0})}_openDialog(){this.dialog=new pt,this.dialog.setConfig(this.hass,this.directives),this.dialog.show()}static get styles(){return r`
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
    `}_updateDirectivesFromSensor(){const t=this.hass.states[this.config.entity];t&&t.attributes.directives&&(this.directives=t.attributes.directives,this.dialog&&this.dialog.setConfig(this.hass,this.directives))}firstUpdated(){this._updateDirectivesFromSensor()}render(){if(this.config.show_warning)return this._showWarning("warning message");if(this.config.show_error)return this._showError("error message");this._updateDirectivesFromSensor();const t=this._getStatus();return T`
      <ha-card
        @click=${()=>this._openDialog()}
        tabindex="0"
      >
        <div class='donder-cloud-directives'>
          <div class="status-icon">
            ${t.warning>0?T`<ha-icon icon="mdi:alert-circle" class="status-warning"></ha-icon>`:T`<ha-icon icon="mdi:alpha-d-circle"></ha-icon>`}
          </div>
          <div class="status-text">
            <div class="status-text-total">
              You have a total of ${t.total} directives
            </div>
            <div class="status-text-subtitle">
              ${t.warning>0?T`<i>You have <span>${t.warning}</span> warnings</i>`:T`<i>You have no warnings</i>`}
            </div>
          </div>
        </div>
      </ha-card>
    `}}t([dt()],gt.prototype,"hass",void 0),t([dt()],gt.prototype,"config",void 0),t([dt()],gt.prototype,"directives",void 0),customElements.define("donder-cloud-directives",gt);export{gt as DonderCloudDirectives};
