var posts=["2025/03/06/大学老师-究竟在干嘛？/","2025/02/07/第一篇博客/","2025/02/07/hello-world/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };