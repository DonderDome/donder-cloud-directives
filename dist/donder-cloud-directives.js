/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(s,t,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a;const c=window,l=c.trustedTypes,d=l?l.emptyScript:"",h=c.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},p=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p},g="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{e?i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((e=>{const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=v){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=n,this[n]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _;f[g]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:f}),(null!==(a=c.reactiveElementVersions)&&void 0!==a?a:c.reactiveElementVersions=[]).push("1.6.3");const m=window,$=m.trustedTypes,y=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,b="?"+w,E=`<${b}>`,S=document,C=()=>S.createComment(""),x=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,P="[ \t\n\f\r]",k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,N=/>/g,O=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,R=/"/g,M=/^(?:script|style|textarea|title)$/i,T=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),z=new WeakMap,L=S.createTreeWalker(S,129,null,!1);function B(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==y?y.createHTML(e):e}const V=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":"",o=k;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(o.lastIndex=d,c=o.exec(i),null!==c);)d=o.lastIndex,o===k?"!--"===c[1]?o=U:void 0!==c[1]?o=N:void 0!==c[2]?(M.test(c[2])&&(n=RegExp("</"+c[2],"g")),o=O):void 0!==c[3]&&(o=O):o===O?">"===c[0]?(o=null!=n?n:k,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?O:'"'===c[3]?R:H):o===R||o===H?o=O:o===U||o===N?o=k:(o=O,n=void 0);const h=o===O&&t[e+1].startsWith("/>")?" ":"";r+=o===k?i+E:l>=0?(s.push(a),i.slice(0,l)+A+i.slice(l)+w+h):i+w+(-2===l?(s.push(void 0),e):h)}return[B(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class W{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[c,l]=V(t,e);if(this.el=W.createElement(c,i),L.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=L.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(A)||e.startsWith(w)){const i=l[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+A).split(w),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?Q:"@"===e[1]?X:J})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(M.test(s.tagName)){const t=s.textContent.split(w),e=t.length-1;if(e>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),L.nextNode(),a.push({type:2,index:++n});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===b)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(w,t+1));)a.push({type:7,index:n}),t+=w.length-1}n++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function q(t,e,i=t,s){var n,r,o,a;if(e===j)return e;let c=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const l=x(e)?void 0:e._$litDirective$;return(null==c?void 0:c.constructor)!==l&&(null===(r=null==c?void 0:c._$AO)||void 0===r||r.call(c,!1),void 0===l?c=void 0:(c=new l(t),c._$AT(t,i,s)),void 0!==s?(null!==(o=(a=i)._$Co)&&void 0!==o?o:a._$Co=[])[s]=c:i._$Cl=c),void 0!==c&&(e=q(t,c._$AS(t,e.values),c,s)),e}class F{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(i,!0);L.currentNode=n;let r=L.nextNode(),o=0,a=0,c=s[0];for(;void 0!==c;){if(o===c.index){let e;2===c.type?e=new K(r,r.nextSibling,this,t):1===c.type?e=new c.ctor(r,c.name,c.strings,this,t):6===c.type&&(e=new Y(r,this,t)),this._$AV.push(e),c=s[++a]}o!==(null==c?void 0:c.index)&&(r=L.nextNode(),o++)}return L.currentNode=S,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{constructor(t,e,i,s){var n;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),x(t)?t===I||null==t||""===t?(this._$AH!==I&&this._$AR(),this._$AH=I):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>D(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==I&&x(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=W.createElement(B(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new F(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=z.get(t.strings);return void 0===e&&z.set(t.strings,e=new W(t)),e}T(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new K(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,i,s,n){this.type=1,this._$AH=I,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=q(this,t,e,0),r=!x(t)||t!==this._$AH&&t!==j,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=q(this,s[i+o],e,o),a===j&&(a=this._$AH[o]),r||(r=!x(a)||a!==this._$AH[o]),a===I?t=I:t!==I&&(t+=(null!=a?a:"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===I?void 0:t}}const G=$?$.emptyScript:"";class Q extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==I?this.element.setAttribute(this.name,G):this.element.removeAttribute(this.name)}}class X extends J{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=q(this,t,e,0))&&void 0!==i?i:I)===j)return;const s=this._$AH,n=t===I&&s!==I||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==I&&(s===I||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Y{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const tt=m.litHtmlPolyfillSupport;null==tt||tt(W,K),(null!==(_=m.litHtmlVersions)&&void 0!==_?_:m.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var et,it;class st extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new K(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return j}}st.finalized=!0,st._$litElement$=!0,null===(et=globalThis.litElementHydrateSupport)||void 0===et||et.call(globalThis,{LitElement:st});const nt=globalThis.litElementPolyfillSupport;var rt,ot;null==nt||nt({LitElement:st}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3"),function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(rt||(rt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ot||(ot={}));function at(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function lt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):ct(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var dt;null===(dt=window.HTMLSlotElement)||void 0===dt||dt.prototype.assignedElements;let ht=class extends st{setConfig(t){this._config=t}static get styles(){return r`
      ha-form {
        padding: 16px;
      }
    `}render(){return this.hass&&this._config?T`
      <ha-form
        .data=${this._config}
        .schema=${[{type:"string",name:"name",label:"Name",required:!0},{type:"string",name:"entity",label:"Entity",required:!0}]}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:T``}_valueChanged(t){const e=t.detail.value;e&&(this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e}})))}};at([lt({attribute:!1})],ht.prototype,"hass",void 0),at([function(t){return lt({...t,state:!0})}()],ht.prototype,"_config",void 0),ht=at([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e))("donder-cloud-directives-editor")],ht);customElements.define("donder-cloud-directives-dialog",class extends st{constructor(){super(...arguments),this.directives=[],this.newDirectiveMessage="",this.deletingDirectiveId=null}setConfig(t,e){this.hass=t,this.directives=e}async _createDirective(){if(this.newDirectiveMessage.trim())try{const t=await this.hass.callWS({type:"donder_cloud/create_directive",message:this.newDirectiveMessage.trim()});t.success&&(this.directives=t.directives,this.newDirectiveMessage="",this._showNotification("Directive created successfully","success"))}catch(t){console.error("Error creating directive:",t),this._showNotification("Error creating directive","error")}else this._showNotification("Please enter a directive message","warning")}async _deleteDirective(t){try{(await this.hass.callWS({type:"donder_cloud/delete_directive",directive_id:t})).success&&(this.deletingDirectiveId=null,this._showNotification("Directive deleted successfully","success"))}catch(t){console.error("Error deleting directive:",t),this._showNotification("Error deleting directive","error")}}_showNotification(t,e){this.hass.callService("persistent_notification","create",{title:"Donder Cloud",message:t,notification_id:`donder_cloud_${e}`})}_getStatusIcon(t){switch(t){case"success":return"mdi:check-circle";case"warning":return"mdi:alert-circle";case"error":return"mdi:close-circle";default:return"mdi:help-circle"}}_getStatusClass(t){switch(t){case"success":return"status-success";case"warning":return"status-warning";case"error":return"status-error";default:return"status-unknown"}}static get styles(){return r`
      :host {
        display: block;
        padding: 16px;
        max-width: 600px;
        width: 100%;
      }
      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      .dialog-title {
        font-size: 20px;
        font-weight: bold;
      }
      .directive-list {
        margin-bottom: 20px;
        max-height: 400px;
        overflow-y: auto;
      }
      .directive-item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid var(--divider-color);
      }
      .directive-content {
        flex-grow: 1;
        margin-right: 10px;
      }
      .directive-message {
        margin-bottom: 5px;
      }
      .directive-actions {
        display: flex;
        gap: 10px;
      }
      .status-success {
        color: var(--success-color);
      }
      .status-warning {
        color: var(--warning-color);
      }
      .status-error {
        color: var(--error-color);
      }
      .status-unknown {
        color: var(--secondary-text-color);
      }
      .new-directive {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }
      .new-directive input {
        flex-grow: 1;
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
    `}render(){return T`
      <div class="dialog-header">
        <div class="dialog-title">Manage Directives</div>
        <ha-icon-button icon="mdi:close" @click=${this._closeDialog}></ha-icon-button>
      </div>
      
      <div class="directive-list">
        ${this.directives.map((t=>T`
          <div class="directive-item">
            <div class="directive-content">
              <div class="directive-message">
                <ha-icon
                  icon=${this._getStatusIcon(t.status)}
                  class=${this._getStatusClass(t.status)}
                ></ha-icon>
                ${t.message}
              </div>
              <div class="directive-actions">
                ${this.deletingDirectiveId===t.id?T`
                    <div class="confirm-delete">
                      <ha-button @click=${()=>this._deleteDirective(t.id)}>Confirm</ha-button>
                      <ha-button @click=${()=>this.deletingDirectiveId=null}>Cancel</ha-button>
                    </div>
                  `:T`
                    <ha-button @click=${()=>this.deletingDirectiveId=t.id}>
                      <ha-icon icon="mdi:delete"></ha-icon>
                    </ha-button>
                  `}
              </div>
            </div>
          </div>
        `))}
      </div>

      <div class="new-directive">
        <input
          type="text"
          .value=${this.newDirectiveMessage}
          @input=${t=>{const e=t.target;this.newDirectiveMessage=e.value}}
          @click=${t=>t.stopPropagation()}
          placeholder="Enter new directive..."
        />
        <ha-button @click=${()=>this._createDirective()}>Create</ha-button>
      </div>
      
      <div class="dialog-footer">
        <ha-button @click=${this._closeDialog}>Close</ha-button>
      </div>
    `}_closeDialog(){const t=new CustomEvent("closed",{bubbles:!0,composed:!0});this.dispatchEvent(t)}}),console.info("%c  DONDER-CLOUD-DIRECTIVES \n%c  version: 1.2.4  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"donder-cloud-directives",name:"Donder Cloud Directives",description:"A custom card for managing directives"});class ut extends st{constructor(){super(...arguments),this.directives=[]}static async getConfigElement(){return document.createElement("donder-cloud-directives-editor")}static getStubConfig(){return{}}setConfig(t){if(!t)throw new Error("Invalid configuration");t.test_gui&&function(){var t=document.querySelector("home-assistant");if(t=(t=(t=(t=(t=(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root")){var e=t.lovelace;return e.current_view=t.___curView,e}return null}().setEditMode(!0),this.config=Object.assign(Object.assign({},t),{name:"Donder Cloud Directives",entity:"sensor.donder_directives"})}shouldUpdate(t){return!!this.config&&(this._hasConfigOrEntityChanged(this,t,!1)||function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var s=e.get("hass");return!s||s.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1))}_hasConfigOrEntityChanged(t,e,i){if(e.has("config")||i)return!0;const s=e.get("hass");if(s&&this.config.entity){return s.states[this.config.entity].state!==t.hass.states[this.config.entity].state}return!1}_showWarning(t){return T`
      <hui-warning>${t}</hui-warning>
    `}_showError(t){const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t,origConfig:this.config}),T`
      ${e}
    `}_showNotification(t,e){this.hass.callService("persistent_notification","create",{title:"Donder Cloud",message:t,notification_id:`donder_cloud_${e}`})}_getStatusCounts(){return this.directives.reduce(((t,e)=>(t[e.status]++,t)),{success:0,warning:0,error:0})}_openDialog(){const t=document.createElement("ha-dialog");t.setAttribute("heading","Donder Cloud Directives"),t.setAttribute("hideActions","");const e=document.createElement("donder-cloud-directives-dialog");e.setConfig(this.hass,this.directives),t.appendChild(e),document.body.appendChild(t),t.addEventListener("closed",(()=>{document.body.removeChild(t)}))}static get styles(){return r`
      .type-custom-donder-cloud-directives {
        height: 100%;
        width: 100%;
      }
      .donder-cloud-directives {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding: 20px;
        box-sizing: border-box;
      }
      .summary {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: 16px;
      }
      .counts {
        display: flex;
        gap: 24px;
        justify-content: center;
      }
      .count-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .count-value {
        font-size: 24px;
        font-weight: bold;
      }
      .count-label {
        font-size: 14px;
        color: var(--secondary-text-color);
      }
      .status-success {
        color: var(--success-color);
      }
      .status-warning {
        color: var(--warning-color);
      }
      .status-error {
        color: var(--error-color);
      }
    `}_updateDirectivesFromSensor(){const t=this.hass.states[this.config.entity];t&&t.attributes.directives&&(this.directives=t.attributes.directives)}firstUpdated(){this._updateDirectivesFromSensor()}render(){if(this.config.show_warning)return this._showWarning("warning message");if(this.config.show_error)return this._showError("error message");this._updateDirectivesFromSensor();const t=this._getStatusCounts();return T`
      <ha-card
        .header=${this.config.name}
        @click=${()=>this._openDialog()}
        tabindex="0"
      >
        <div class='donder-cloud-directives'>
          <div class="summary">
            <div class="counts">
              <div class="count-item">
                <div class="count-value status-success">${t.success}</div>
                <div class="count-label">Success</div>
              </div>
              <div class="count-item">
                <div class="count-value status-warning">${t.warning}</div>
                <div class="count-label">Warning</div>
              </div>
              <div class="count-item">
                <div class="count-value status-error">${t.error}</div>
                <div class="count-label">Error</div>
              </div>
            </div>
            <ha-button>
              <ha-icon icon="mdi:cog"></ha-icon>
              Manage Directives
            </ha-button>
            <ha-dialog id="myDialog" heading="Popup Title">
              <p>This is the content of the popup.</p>
            </ha-dialog>
          </div>
        </div>
      </ha-card>
    `}}customElements.define("donder-cloud-directives",ut);export{ut as BoilerplateCard};
