var posts=["2025/02/07/第一篇博客咯/","2025/02/07/hello-world/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };