(this.webpackJsonplotus=this.webpackJsonplotus||[]).push([[0],{143:function(t,e,n){},160:function(t,e,n){},178:function(t,e,n){"use strict";n.r(e);var a=n(0),c=n.n(a),s=n(41),r=n.n(s),o=n(32),i=n(33),j=n(35),u=n(34),l=(n(143),n(144),n(76)),b=n(99),d=n(184),h=n(116),p=n(182),O=n(135),m=n(186),x=n(188),f=n(189),v=n(190),g=n(81);g.a.apps.length?g.a.app():g.a.initializeApp({apiKey:"AIzaSyAIYQGiQcSjZBw9LQ9LcR1yh8uDWtsMfgs",authDomain:"data-492da.firebaseapp.com",databaseURL:"https://data-492da.firebaseio.com",projectId:"data-492da",storageBucket:"data-492da.appspot.com",messagingSenderId:"381903672681",appId:"1:381903672681:web:813cffbc63da30d11f99f8",measurementId:"G-CD4W02BEZ7"});var y=g.a,C=y.auth();function k(t){C.onAuthStateChanged((function(e){return t(e)}))}var S=n.p+"static/media/lotus.3d5db4fb.png",w=n.p+"static/media/user.b326dd92.png",I=n(8),E=function(t){Object(j.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).logout=function(){var t;t=function(t){return console.log(t)},C.signOut().then((function(e){return t(e)}))},a.login=function(){!function(t){var e=new y.auth.GoogleAuthProvider;C.signInWithPopup(e).then((function(e){return t(e)}))}((function(t){console.log(t)}))},a.state={avatar:w,user:null},a}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var t=this;k((function(e){null!=e?t.setState({avatar:e.photoURL,user:e}):t.setState({avatar:e,user:null})}))}},{key:"render",value:function(){var t=Object(I.jsx)(h.a,{children:null===this.state.user?Object(I.jsx)(h.a.Item,{icon:Object(I.jsx)(f.a,{}),onClick:this.login,children:"\u0110\u0103ng nh\u1eadp"},"menu-setting"):Object(I.jsx)(h.a.Item,{icon:Object(I.jsx)(v.a,{}),onClick:this.logout,children:"\u0110\u0103ng xu\u1ea5t"},"menu-logout")}),e=Object(I.jsx)(p.a,{overlay:t,placement:"topRight",children:Object(I.jsx)(O.a,{className:"dropdown-toggle mt-2",size:45,icon:Object(I.jsx)(m.a,{src:this.state.avatar,preview:!1}),id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"})},"header-dropdown");return Object(I.jsx)(x.a,{className:"p-0",title:Object(I.jsx)(m.a,{width:45,height:45,src:S,preview:!1}),subTitle:Object(I.jsx)(l.b,{to:"/",children:"Home"}),extra:[e]})}}]),n}(a.Component),N=function(t){Object(j.a)(n,t);var e=Object(u.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return"Ant Design \xa92018 Created by Ant UED"}}]),n}(a.Component),M=n(26),R=n(97),A=n(80),D={user:{}},L=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET_USER":return t.user=e.data,Object(A.a)(Object(A.a)({},t),{},{user:e.data});default:return t}},U=Object(R.a)({app:L}),B=Object(R.b)(U),z=n(75),F=n(51),G=n(187),K=n(183),Q=n(194),T=n(195),V=n(136),W=n(185),H=n(191),J=n(192),P=n(193),Z=n.p+"static/media/monk.28981645.png",_=n.p+"static/media/buddhist.75efac36.png";y.database();var Y=n(127),q=(n(160),function(t){Object(j.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).handleChange=function(t){a.props.onChange&&t.saver.save().then((function(t){return a.props.onChange(t)}))},a.reference=function(t){a.props.setEditor&&a.props.setEditor(t)},a.state={value:{}},a}return Object(i.a)(n,[{key:"render",value:function(){return Object(I.jsx)("div",{className:"editor-container border",children:Object(I.jsx)(Y.a,{data:this.props.initValue,onChange:this.handleChange,instanceRef:this.reference})})}}]),n}(a.Component)),X=n(112),$=n.n(X),tt=function(t){Object(j.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).submit=function(){a.setState({comments:[].concat(Object(V.a)(a.state.comments),[{key:Math.random(),author:"MacKeNo",avatar:Z,content:Object(I.jsx)($.a,{data:a.state.comment}),datetime:[Object(I.jsx)(H.a,{})]}]),comment:{}}),a.clear()},a.handleChange=function(t){a.setState({comment:t})},a.state={comments:[],comment:{time:1624457156027,blocks:[],version:"2.22.0"},editor:{}},a}return Object(i.a)(n,[{key:"componentDidMount",value:function(){}},{key:"clear",value:function(){this.state.editor.clear()}},{key:"render",value:function(){var t=this;return Object(I.jsx)(z.a,{justify:"center",className:"mb-4",children:Object(I.jsx)(F.a,{xl:16,lg:18,md:20,sm:22,xs:24,children:Object(I.jsxs)(G.a,{children:[Object(I.jsx)(z.a,{children:Object(I.jsxs)(F.a,{span:24,justify:"center",children:[Object(I.jsx)(K.a,{author:"MacKeNo",avatar:_,content:Object(I.jsx)("p",{children:"Some thing"}),datetime:Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(J.a,{})," ",Object(I.jsx)(P.a,{})]})}),Object(I.jsxs)(z.a,{children:[Object(I.jsx)(F.a,{span:6,children:Object(I.jsx)(m.a,{src:Z})}),Object(I.jsx)(F.a,{span:6,children:Object(I.jsx)(m.a,{src:_})})]})]})}),Object(I.jsx)(z.a,{children:Object(I.jsx)(F.a,{span:22,offset:1,children:this.state.comments.length>0&&Object(I.jsx)(W.b,{dataSource:this.state.comments,itemLayout:"horizontal",renderItem:function(t){return Object(I.jsx)(W.b.Item,{children:Object(I.jsx)(K.a,Object(A.a)({},t))},t.key)}})})}),Object(I.jsx)(z.a,{children:Object(I.jsx)(F.a,{span:22,offset:1,children:Object(I.jsx)(K.a,{avatar:Object(I.jsx)(O.a,{src:Z,alt:"user"}),content:Object(I.jsx)(G.a,{actions:[Object(I.jsx)(Q.a,{onClick:this.submit})],children:Object(I.jsx)(q,{onChange:this.handleChange,initValue:this.state.comment,setEditor:function(e){return t.setState({editor:e})}})})})})})]})})})}}]),n}(a.Component),et=function(t){Object(j.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).submit=function(){console.log(a.props.app.user),console.log({userId:a.props.app.user.uid,author:a.props.app.user.displayName,avatar:a.props.app.user.photoURL,content:a.state.comment})},a.handleChange=function(t){a.setState({comment:t})},a.state={comment:{},editor:{}},a}return Object(i.a)(n,[{key:"render",value:function(){var t=this;return Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(z.a,{justify:"center",className:"mb-4",children:Object(I.jsx)(F.a,{xl:12,lg:14,md:16,sm:18,xs:20,children:Object(I.jsxs)(G.a,{actions:[Object(I.jsx)(Q.a,{onClick:this.submit},"send"),Object(I.jsx)(T.a,{},"img")],children:[Object(I.jsx)(K.a,{author:this.props.app.user.displayName,avatar:Object(I.jsx)(m.a,{src:this.props.app.user.photoURL})}),Object(I.jsx)(q,{onChange:this.handleChange,initValue:this.state.comment,setEditor:function(e){return t.setState({editor:e})}})]})})}),Object(I.jsx)(tt,{}),Object(I.jsx)(tt,{})]})}}]),n}(a.Component),nt=Object(b.b)((function(t){return{app:t.app}}))(et),at=function(t){Object(j.a)(n,t);var e=Object(u.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return Object(I.jsx)(nt,{})}}]),n}(a.Component),ct=function(t){Object(j.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(o.a)(this,n),(a=e.call(this,t)).state={user:null},a}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var t=this;k((function(e){t.setState({user:e}),B.dispatch({data:e,type:"SET_USER"})}))}},{key:"render",value:function(){return null===this.state.user?Object(I.jsx)("div",{}):Object(I.jsx)(M.c,{children:Object(I.jsx)(M.a,{exact:!0,path:"/",component:at})})}}]),n}(a.Component),st=function(t){Object(j.a)(n,t);var e=Object(u.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return Object(I.jsx)(b.a,{store:B,children:Object(I.jsx)(l.a,{children:Object(I.jsxs)(d.a,{className:"app",children:[Object(I.jsx)(d.a.Header,{style:{backgroundColor:"white"},children:Object(I.jsx)(E,{})}),Object(I.jsx)(d.a.Content,{className:"p-3",children:Object(I.jsx)(ct,{})}),Object(I.jsx)(d.a.Footer,{style:{textAlign:"center"},children:Object(I.jsx)(N,{})})]})})})}}]),n}(a.Component);r.a.render(Object(I.jsx)(c.a.StrictMode,{children:Object(I.jsx)(st,{})}),document.getElementById("root"))}},[[178,1,2]]]);
//# sourceMappingURL=main.c5a70bce.chunk.js.map