var posts=["2025/02/07/hello-world/","2025/02/10/test1/","2025/02/07/第一篇博客/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };