import{bI as p,bJ as c,T as g,U as V,W as f,r as b,J as v,K as y,L as s,h as a,M as o,O as u,bi as q,b9 as _,aV as h,_ as S,N as w,a2 as B}from"./index-DFLJ4UxI.js";import{b as r,a as C,V as M}from"./VRow-B9BOWsk7.js";import{V as N}from"./VDivider-Dicnoa_2.js";import{V as E}from"./VForm-gCExJc69.js";const I={class:"text-center"},J={__name:"[id]",setup(R){const{api:l,apiAuth:T}=B(),n=p(),d=c();g(),V(),f();const t=b({_id:"",name:"",statue:0,description:"",image:"",category:"lens"});return(async()=>{try{const{data:e}=await l.get("/equipment/"+n.params.id);t.value=e.result,document.title=t.value.name+"溪城"}catch(e){console.log("[id].vue getEquipment",e),d.push("/")}})(),(e,i)=>(v(),y(M,null,{default:s(()=>[a(C,null,{default:s(()=>[a(r,{cols:"12"},{default:s(()=>[o("h1",I,u(t.value.name),1)]),_:1}),a(N),a(r,{cols:"12",md:"6"},{default:s(()=>[a(q,{src:t.value.image},null,8,["src"])]),_:1}),a(r,{cols:"12",md:"6"},{default:s(()=>[o("p",null,u(e.$t("equipment.categor"+t.value.category)),1),o("p",null,u(t.value.price),1),o("p",null,u(t.value.description),1),a(E,{disabled:e.isSubmitting,onSubmit:_(e.submit,["prevent"])},{default:s(()=>[a(h,{modelValue:e.quantity.value.value,"onUpdate:modelValue":i[0]||(i[0]=m=>e.quantity.value.value=m),modelModifiers:{number:!0},type:"number","error-messages":e.quantity.errorMessage.value},null,8,["modelValue","error-messages"]),a(S,{type:"submit","prepend-icon":"mdi-cart",loading:e.isSubmitting},{default:s(()=>[w(u(e.$t("product.addCart")),1)]),_:1},8,["loading"])]),_:1},8,["disabled","onSubmit"])]),_:1})]),_:1})]),_:1}))}};export{J as default};
