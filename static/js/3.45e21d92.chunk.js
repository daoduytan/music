(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[3],{124:function(e,t,c){"use strict";c.r(t),c.d(t,"Home",(function(){return d}));var i=c(4),n=c(14),r=c(2),o=c(52),s=c(31),u=c(40),d=function(){var e=Object(s.b)(),t=e.audios,c=e.addAudio,d=Object(n.useQuery)(u.b),a=d.loading,b=d.data,j=d.error;return console.log("loading",a,b,j),Object(r.useEffect)((function(){b&&c(b.getMusicList)}),[b]),a?Object(i.jsx)("div",{children:"Loading"}):j?Object(i.jsx)("div",{children:"Error"}):Object(i.jsx)("div",{children:t.map((function(e){return Object(i.jsx)(o.c,{music:e},e._id)}))})};t.default=d}}]);
//# sourceMappingURL=3.45e21d92.chunk.js.map