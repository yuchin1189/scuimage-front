import{_ as re}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{p as z,r as O,s as M,c as u,a as ue,w as L,o as ie,b as ce,m as K,g as j,u as de,d as X,e as ee,t as F,f as U,h as s,i as R,j as te,k as ve,l as ae,n as me,q as fe,v as le,x as ge,y as he,z as pe,A as ye,B as be,C as ke,D as Se,E as Ce,F as _e,G as we,H as Ve,I as oe,J as v,K as B,L as l,M as C,V as E,N as y,O as _,P as S,Q as V,R as x,S as D,T as xe,U as Be,W as Me,X as Ie,Y as Pe,Z as Te,_ as T,$ as Le,a0 as H,a1 as Y,a2 as He}from"./index-Dye-7HYz.js";import{V as se,a as J,b as A}from"./VRow-CfRmg7EG.js";import{m as Ae,u as ne,V as Q,a as W,b as Z,c as $}from"./VMenu-D77DTfFK.js";import"./VDivider-Ddfa82oE.js";const Re=z({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function Fe(e){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:o}=i;let m=0,c=0;const t=O(null),r=M(0),d=M(0),b=M(0),k=M(!1),g=M(!1),h=u(()=>Number(e.scrollThreshold)),w=u(()=>ue((h.value-r.value)/h.value||0)),p=()=>{const n=t.value;if(!n||o&&!o.value)return;m=r.value,r.value="window"in n?n.pageYOffset:n.scrollTop;const f=n instanceof Window?document.documentElement.scrollHeight:n.scrollHeight;if(c!==f){c=f;return}g.value=r.value<m,b.value=Math.abs(r.value-h.value)};return L(g,()=>{d.value=d.value||r.value}),L(k,()=>{d.value=0}),ie(()=>{L(()=>e.scrollTarget,n=>{var I;const f=n?document.querySelector(n):window;f&&f!==t.value&&((I=t.value)==null||I.removeEventListener("scroll",p),t.value=f,t.value.addEventListener("scroll",p,{passive:!0}))},{immediate:!0})}),ce(()=>{var n;(n=t.value)==null||n.removeEventListener("scroll",p)}),o&&L(o,p,{immediate:!0}),{scrollThreshold:h,currentScroll:r,currentThreshold:b,isScrollActive:k,scrollRatio:w,isScrollingUp:g,savedScroll:d}}const Ee=z({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...Ae(),...K(),...Re(),height:{type:[Number,String],default:64}},"VAppBar"),ze=j()({name:"VAppBar",props:Ee(),emits:{"update:modelValue":e=>!0},setup(e,i){let{slots:o}=i;const m=O(),c=de(e,"modelValue"),t=u(()=>{var P;const a=new Set(((P=e.scrollBehavior)==null?void 0:P.split(" "))??[]);return{hide:a.has("hide"),fullyHide:a.has("fully-hide"),inverted:a.has("inverted"),collapse:a.has("collapse"),elevate:a.has("elevate"),fadeImage:a.has("fade-image")}}),r=u(()=>{const a=t.value;return a.hide||a.fullyHide||a.inverted||a.collapse||a.elevate||a.fadeImage||!c.value}),{currentScroll:d,scrollThreshold:b,isScrollingUp:k,scrollRatio:g}=Fe(e,{canScroll:r}),h=u(()=>t.value.hide||t.value.fullyHide),w=u(()=>e.collapse||t.value.collapse&&(t.value.inverted?g.value>0:g.value===0)),p=u(()=>e.flat||t.value.fullyHide&&!c.value||t.value.elevate&&(t.value.inverted?d.value>0:d.value===0)),n=u(()=>t.value.fadeImage?t.value.inverted?1-g.value:g.value:void 0),f=u(()=>{var q,G;if(t.value.hide&&t.value.inverted)return 0;const a=((q=m.value)==null?void 0:q.contentHeight)??0,P=((G=m.value)==null?void 0:G.extensionHeight)??0;return h.value?d.value<b.value||t.value.fullyHide?a+P:a:a+P});X(u(()=>!!e.scrollBehavior),()=>{te(()=>{h.value?t.value.inverted?c.value=d.value>b.value:c.value=k.value||d.value<b.value:c.value=!0})});const{ssrBootStyles:I}=ne(),{layoutItemStyles:N}=ee({id:e.name,order:u(()=>parseInt(e.order,10)),position:F(e,"location"),layoutSize:f,elementSize:M(void 0),active:c,absolute:F(e,"absolute")});return U(()=>{const a=Q.filterProps(e);return s(Q,R({ref:m,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"},e.class],style:[{...N.value,"--v-toolbar-image-opacity":n.value,height:void 0,...I.value},e.style]},a,{collapse:w.value,flat:p.value}),o)}),{}}}),Ne=z({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...ve(),...ae(),...me(),...K(),...fe(),...le({tag:"footer"}),...ge()},"VFooter"),$e=j()({name:"VFooter",props:Ne(),setup(e,i){let{slots:o}=i;const m=O(),{themeClasses:c}=he(e),{backgroundColorClasses:t,backgroundColorStyles:r}=pe(F(e,"color")),{borderClasses:d}=ye(e),{elevationClasses:b}=be(e),{roundedClasses:k}=ke(e),g=M(32),{resizeRef:h}=Se(p=>{p.length&&(g.value=p[0].target.clientHeight)}),w=u(()=>e.height==="auto"?g.value:parseInt(e.height,10));return X(()=>e.app,()=>{const p=ee({id:e.name,order:u(()=>parseInt(e.order,10)),position:u(()=>"bottom"),layoutSize:w,elementSize:u(()=>e.height==="auto"?void 0:w.value),active:u(()=>e.app),absolute:F(e,"absolute")});te(()=>{m.value=p.layoutItemStyles.value})}),U(()=>s(e.tag,{ref:h,class:["v-footer",c.value,t.value,d.value,b.value,k.value,e.class],style:[r.value,e.app?m.value:{height:Ce(e.height)},e.style]},o)),{}}}),De=z({scrollable:Boolean,...ae(),..._e(),...le({tag:"main"})},"VMain"),Oe=j()({name:"VMain",props:De(),setup(e,i){let{slots:o}=i;const{dimensionStyles:m}=we(e),{mainStyles:c}=Ve(),{ssrBootStyles:t}=ne();return U(()=>s(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[c.value,t.value,m.value,e.style]},{default:()=>{var r,d;return[e.scrollable?s("div",{class:"v-main__scroller"},[(r=o.default)==null?void 0:r.call(o)]):(d=o.default)==null?void 0:d.call(o)]}})),{}}}),je={class:"d-flex"},Ue=["href","title"],qe={class:"text-caption text-disabled text-center"},Ge={__name:"AppFooter",setup(e){const i=oe(),o=u(()=>i.xs.value),m=[{title:"scuimage IG",icon:"mdi-instagram",href:"https://www.instagram.com/scu_image/"},{title:"scuimage FB",icon:"mdi-facebook",href:"https://www.facebook.com/scuimage/"},{title:"scuimage Discord",icon:["M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z"],href:"https://discord.gg/"},{title:"email us",icon:"mdi-email",href:"mailto:scuimage1969@gmail.com"},{title:"Source code of this site",icon:"mdi-github",href:"https://github.com/vuetifyjs/vuetify"}];return(c,t)=>(v(),B($e,{border:"","max-height":"25vh"},{default:l(()=>[s(se,{class:"h-100 d-flex flex-column justify-space-between"},{default:l(()=>[s(J,null,{default:l(()=>[o.value.valueOf()?S("",!0):(v(),B(A,{key:0,cols:"12",md:"5"},{default:l(()=>[C("h3",null,[s(E,null,{default:l(()=>t[0]||(t[0]=[y("mdi-film")])),_:1}),y(" "+_(c.$t("branding")),1)]),t[1]||(t[1]=C("br",null,null,-1)),t[2]||(t[2]=C("span",null,"攝影大眾化，生活藝術化",-1))]),_:1})),s(A,{cols:"12",md:"5"}),s(A,{cols:"12",md:"2",class:"h-100 d-flex flex-column justify-md-space-between"},{default:l(()=>[C("div",je,[(v(),V(x,null,D(m,r=>C("a",{key:r.title,href:r.href,title:r.title,class:"d-inline-block mx-2 social-link",rel:"noopener noreferrer",target:"_blank"},[s(E,{icon:r.icon,size:16},null,8,["icon"])],8,Ue)),64))]),t[3]||(t[3]=C("a",{class:"text-caption",style:{"text-decoration":"none"},href:"https://maps.app.goo.gl/gkG1uBBQ3JudjDAR6"},"111台北市士林區臨溪路70號 綜合大樓 B212室",-1))]),_:1})]),_:1}),s(J,null,{default:l(()=>[s(A,{class:"d-flex flex-column justify-end"},{default:l(()=>[C("div",qe,[y(" © 1989-"+_(new Date().getFullYear())+" ",1),t[4]||(t[4]=C("span",{class:"d-none d-sm-inline-block"},"東吳大學溪城攝影學會",-1)),t[5]||(t[5]=y(" — ")),t[6]||(t[6]=C("a",{class:"text-decoration-none on-surface",href:"",rel:"noopener noreferrer",target:"_top"}," 版權所有 ",-1))])]),_:1})]),_:1})]),_:1})]),_:1}))}},Ye=re(Ge,[["__scopeId","data-v-87cf487e"]]),Xe={__name:"default",setup(e){const{t:i}=xe(),o=Be(),{apiAuth:m}=He(),c=Me(),t=oe(),r=Ie(),d=[{to:"/equipment",text:i("nav.resourceMenu.equipment"),value:"equipment"},{to:"/lab",text:i("nav.resourceMenu.lab"),value:"lab"}],b=u(()=>[{key:"login",to:"/login",text:i("nav.userMenu.login"),show:!o.isLoggedIn},{key:"register",to:"/register",text:i("nav.userMenu.register"),show:!o.isLoggedIn},{key:"resetPassword",text:i("nav.userMenu.resetPassword"),show:o.isLoggedIn},{key:"logout",text:i("nav.userMenu.logout"),show:o.isLoggedIn}]);let k=localStorage.getItem("theme");k?r.global.name.value=k==="dark"?"dark":"light":k=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";const g=async()=>{try{await m.delete("user/logout")}catch(n){console.log("default.vue logout",n)}o.logout(),c({text:i("logout.success"),snackbarProps:{color:"success",rounded:"pill"}})},h=u(()=>t.xs.value),w=u(()=>o.isAdmin?"bg-brown":"bg-primary");function p(){const n=r.global.current.value.dark?"light":"dark";r.global.name.value=n,localStorage.setItem("theme",n),c({text:i("themeChanged"),snackbarProps:{color:"success",timeout:5e3,rounded:"pill"}})}return(n,f)=>{const I=Pe("router-view"),N=Ye;return v(),V(x,null,[s(ze,{class:Te(w.value)},{default:l(()=>[s(se,{class:"d-flex align-center"},{default:l(()=>[s(T,{to:"/",active:!1,"prepend-icon":"mdi-film"},{default:l(()=>[y(_(n.$t("branding")),1)]),_:1}),s(Le),s(W,{"open-on-click":""},{activator:l(({props:a})=>[s(T,R(a,{"prepend-icon":"mdi-format-list-checks"}),{default:l(()=>[h.value.valueOf()?S("",!0):(v(),V(x,{key:0},[y(_(n.$t("nav.resources")),1)],64))]),_:2},1040)]),default:l(()=>[s(Z,{class:"bg-main"},{default:l(()=>[(v(),V(x,null,D(d,a=>s($,{key:a.value,to:a.to,disabled:a.value==="lab"},{default:l(()=>[y(_(a.text),1)]),_:2},1032,["to","disabled"])),64))]),_:1})]),_:1}),s(W,{"open-on-click":""},{activator:l(({props:a})=>[H(o).isAdmin?S("",!0):(v(),B(T,R({key:0},a,{"prepend-icon":"mdi-account"}),{default:l(()=>[h.value.valueOf()?S("",!0):(v(),V(x,{key:0},[y(_(n.$t("nav.member")),1)],64))]),_:2},1040)),H(o).isAdmin?(v(),B(T,R({key:1},a,{"prepend-icon":"mdi-account-wrench"}),{default:l(()=>[h.value.valueOf()?S("",!0):(v(),V(x,{key:0},[y(_(n.$t("nav.admin")),1)],64))]),_:2},1040)):S("",!0)]),default:l(()=>[s(Z,{class:"bg-main"},{default:l(()=>[(v(!0),V(x,null,D(b.value,a=>(v(),V(x,{key:a.key},[a.show&&a.key!=="logout"?(v(),B($,{key:0,to:a.to,disabled:a.key==="resetPassword"},{default:l(()=>[y(_(a.text),1)]),_:2},1032,["to","disabled"])):S("",!0),a.show&&a.key==="logout"?(v(),B($,{key:1,onClick:f[0]||(f[0]=P=>g())},{default:l(()=>[y(_(n.$t("nav.userMenu.logout")),1)]),_:1})):S("",!0)],64))),128))]),_:1})]),_:1}),s(T,{icon:"",onClick:p},{default:l(()=>[H(Y).theme.name.value==="dark"?(v(),B(E,{key:0},{default:l(()=>f[1]||(f[1]=[y("mdi-brightness-3")])),_:1})):S("",!0),H(Y).theme.name.value==="light"?(v(),B(E,{key:1},{default:l(()=>f[2]||(f[2]=[y("mdi-brightness-7")])),_:1})):S("",!0)]),_:1})]),_:1})]),_:1},8,["class"]),s(Oe,null,{default:l(()=>[s(I)]),_:1}),s(N)],64)}}};export{Xe as default};
