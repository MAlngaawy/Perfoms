import{u as g,s as N,a as C,r as l,b as S,c as I,d as _,e as j,j as t,F as p,f as d,G as n,H as v,T as w,U as G,S as F,A as Q,N as b}from"./index.6951adf1.js";const A=y=>{const s=g(N),{data:o}=C({}),[u,f]=l.exports.useState(0),{data:e}=S({team_id:s==null?void 0:s.id},{skip:!s||(o==null?void 0:o.user_type)!=="Coach"}),{data:a}=I({team_id:s==null?void 0:s.id}),{data:i}=_({});l.exports.useEffect(()=>{if(a&&i){const r=i==null?void 0:i.results.filter(m=>{var c;return m.name===((c=a==null?void 0:a.sport)==null?void 0:c.name)})[0].id;f(r),console.log("currentTeamSportId",r)}},[a,i]);const{data:h,refetch:x}=j({team_id:s==null?void 0:s.id,sport_id:u});return t(p,{children:s?t("div",{className:"m-4",children:d(n,{gutter:"sm",children:[t(n.Col,{span:12,sm:5,children:t(v,{})}),t(n.Col,{span:12,xs:8,sm:4,children:t("div",{className:"bg-white p-4 rounded-3xl min-h-full",children:t(w,{teamInfo:a,teamId:(s==null?void 0:s.id)!==void 0?JSON.stringify(s==null?void 0:s.id):"1"})})}),t(n.Col,{span:12,xs:4,sm:3,children:t(G,{})}),d(n.Col,{className:`bg-white p-2 rounded-3xl ${e?"flex-start":"justify-center"} items-center flex-wrap`,span:12,children:[t("h2",{className:"p-2 text-center text-lg",children:"Team Players"}),d("div",{className:"flex flex-wrap justify-center gap-2 xs:gap-4  mt-4",children:[e&&(e==null?void 0:e.results.map((r,m)=>t(F,{teamId:s==null?void 0:s.id,id:r.id,name:r.name,image:r.icon},r.id))),t(Q,{filteredPlayers:h,refetchFilteredPlayers:x,teamInfo:a,teamPlayers:e,coach_team_id:s==null?void 0:s.id})]}),t(p,{children:!(e!=null&&e.results.length)&&d("div",{className:"flex flex-col md:flex-row justify-center items-center gap-3",children:[t("img",{className:"md:w-72 md:my-5",src:"/assets/images/noteams.png",alt:"no teams"}),t("p",{children:"This team has no players yet"})]})})]})]})}):t(b,{})})};export{A as default};