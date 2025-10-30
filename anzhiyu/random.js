var posts=["2025/02/07/hello-world/","2025/02/07/第一篇博客/","2025/03/06/大学老师-究竟在干嘛？/","2025/08/21/黄杨钿甜事件我的看法/","2025/10/25/教育资源分布不公导致的问题/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };