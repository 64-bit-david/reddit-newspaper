(this.webpackJsonpnewspaper=this.webpackJsonpnewspaper||[]).push([[0],{34:function(e,t,n){},82:function(e,t,n){"use strict";n.r(t);n(34);var c=n(11),r=n.n(c),a=n(6),s=n(4),i=n(28),d=n(5),o=n.n(d),l=n(7),u=n(17),j=n(0),h=n(29),b=n.n(h),O="FETCH_POSTS",f="FETCH_COMMENTS",m="SET_SUBREDDIT",p="REMOVE_ARTICLES",x=n(30),v=n.n(x).a.create({baseURL:"https://www.reddit.com"}),y=n(1),w=function(){return Object(y.jsx)("p",{children:"London UK"})},g=function(){return Object(y.jsx)("p",{children:function(){var e=new Date,t=String(e.getDay()),n=String(e.getDate()),c=String(e.getMonth()),r=e.getFullYear();return"".concat(["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][t]," ").concat(["January","February","March","April","May","June","July","August","September","October","November","December"][c]," ").concat([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31][n]," ").concat(r)}()})},N=["worldnews","news","upliftingnews","askreddit","politics","nottheonion","ukpolitics","technology","science","futurology"],S=Object(a.b)((function(e){return{subreddit:e.subreddit}}),{selectSubreddit:function(e){return{type:m,payload:["worldnews","news","upliftingnews","askreddit","politics","nottheonion","ukpolitics","technology","science","futurology"][e]}}})((function(e){var t=e.clickState,n=e.setClickState,c=e.selectSubreddit;return Object(y.jsx)("div",{className:"subreddit-list-container ".concat(t&&"active"),children:Object(y.jsxs)("div",{className:"s-list-container",children:[Object(y.jsx)("h4",{children:"Select a subreddit"}),Object(y.jsx)("ul",{className:"subreddit-list",children:N.map((function(e,r){return Object(y.jsx)("li",{children:Object(y.jsxs)("button",{onClick:function(){c(r),n(!t)},children:["/r/",e]})},e)}))})]})})})),k=n(31),E=n(32),C=Object(a.b)((function(e){return{subreddit:e.subreddit,posts:e.posts,articles:e.articles}}),{fetchPosts:function(e){return function(){var t=Object(l.a)(o.a.mark((function t(n){var c,r,a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.get("/r/".concat(e,".json"));case 2:c=t.sent,r=c.data.data.children,a=r.filter((function(e){return!e.data.stickied})),n({type:O,payload:a.slice(0,21)});case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},fetchComments:function(e,t){return function(){var n=Object(l.a)(o.a.mark((function n(c,r){var a,s,i,d;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,v.get(e);case 2:a=n.sent,s=a.data[1].data.children,i=s.filter((function(e){return!e.data.stickied&&"BOT"!==e.data.author_flair_text&&"[removed]"!==e.data.body})),d={articleTitle:t.data.title,articleComments:[i.slice(0,2)],articleMeta:t},c({type:f,payload:d});case 7:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}()},removeArticles:function(){return{type:p}}})((function(e){var t=e.subreddit,n=e.fetchPosts,c=e.posts,r=e.fetchComments,a=e.articles,s=e.removeArticles,i=Object(j.useState)(!1),d=Object(u.a)(i,2),h=d[0],O=d[1],f=Object(j.useState)(!1),m=Object(u.a)(f,2),p=m[0],x=m[1];Object(j.useEffect)((function(){a.length>10?x(!1):x(!0)}),[a,x]),Object(j.useEffect)((function(){s(),function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(t);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[t,n,s,x]),Object(j.useEffect)((function(){c.map((function(e){return r("/".concat(e.data.id,".json"),e)}))}),[c,r]),Object(j.useEffect)((function(){var e=function(e){"Escape"===e.key&&O(!1)};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}));var v=function(e,t){return e.body.length<200?e.body:e.body.length>200?Object(y.jsxs)("div",{children:[e.body.slice(0,200),"...",Object(y.jsx)("br",{}),Object(y.jsx)("a",{href:"https://www.reddit.com".concat(e.permalink),className:"reddit-comment-link",children:"Continue on reddit"})]}):void 0};return Object(y.jsxs)("div",{className:"main-container",children:[Object(y.jsxs)("div",{className:"header-container",children:[Object(y.jsxs)("div",{className:"header-left",children:[Object(y.jsxs)("button",{onClick:function(){return O(!h)},children:["/r/",t,Object(y.jsx)("span",{className:"btn-symbol",children:Object(y.jsx)(k.a,{icon:E.a})})]}),Object(y.jsx)(S,{clickState:h,setClickState:O})]}),Object(y.jsx)("div",{className:"header-center",children:Object(y.jsx)("h1",{children:"The Reddit Daily"})}),Object(y.jsx)("div",{className:"header-right",children:Object(y.jsxs)("h4",{children:["LATEST ",Object(y.jsx)("br",{})," EDITION"]})})]}),Object(y.jsxs)("div",{className:"sub-header",children:[Object(y.jsx)("div",{className:"weather",children:Object(y.jsx)(w,{})}),Object(y.jsx)("div",{className:"date",children:Object(y.jsx)(g,{})})]}),Object(y.jsx)("div",{className:"main-grid",children:p?Object(y.jsx)("div",{className:"loader-container",children:Object(y.jsx)(b.a,{type:"Grid",color:"rgb(44,44,44)",height:150,timeout:5e3})}):function(){if(a.length>0)return a.map((function(e,t){return Object(y.jsxs)("div",{className:"grid-item\n             ".concat(e.articleTitle.length>80&&t>1?"long-header":""," "),children:[Object(y.jsx)("h2",{className:"grid-item-header",children:Object(y.jsx)("a",{className:"header-link",href:"https://www.reddit.com".concat(e.articleMeta.data.permalink),children:e.articleTitle})}),Object(y.jsx)("div",{children:Object(y.jsxs)("ul",{children:[e.articleComments[0][0]?Object(y.jsxs)("li",{children:[Object(y.jsxs)("span",{className:"author-line",children:["User:",Object(y.jsxs)("span",{className:"author-name",children:[" ",e.articleComments[0][0].data.author]})," says "]}),Object(y.jsx)("br",{}),v(e.articleComments[0][0].data)]}):Object(y.jsx)("li",{children:" No Comments Yet!"}),e.articleComments[0][1]?Object(y.jsxs)("li",{children:[Object(y.jsxs)("span",{className:"author-line",children:["User:",Object(y.jsx)("span",{className:"author-name",children:e.articleComments[0][1].data.author})," says "]})," ",Object(y.jsx)("br",{}),v(e.articleComments[0][1].data)]}):null]})})]},e.articleMeta.data.id)}))}()}),Object(y.jsx)("div",{className:"footer-container",children:Object(y.jsx)("footer",{children:Object(y.jsx)("a",{href:"https://david-w.dev",children:"Created By David Williamson"})})})]})})),T=n(33);var _=Object(s.c)({posts:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case O:return t.payload;default:return e}},articles:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f:return[].concat(Object(T.a)(e),[t.payload]);case p:return[];default:return e}},subreddit:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"worldnews",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case m:return t.payload;default:return e}}}),D=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||s.d,M=Object(s.e)(_,D(Object(s.a)(i.a)));r.a.render(Object(y.jsx)(a.a,{store:M,children:Object(y.jsx)(C,{})}),document.querySelector("#root"))}},[[82,1,2]]]);
//# sourceMappingURL=main.d6c10508.chunk.js.map