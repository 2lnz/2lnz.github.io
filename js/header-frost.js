// 首页背景图随滚动渐变毛玻璃
// 进度以 #scroll-down（首屏底部箭头）为基准：
// 它从初始位置一路滑到视口顶端，毛玻璃从 0 渐变到最大；
// 一旦到顶（首屏完全划出），数值锁定，继续滚动不再变化。
// 直接给 .pl-container（固定全屏背景层）写内联 filter + !important，
// 避免主题 .pl-img 的动画/优先级干扰。
(function () {
  var MAX_BLUR = 3; // 最大模糊 px
  var initialTop = null; // 基准元素初始位置（每次加载/pjax 重置）

  function getProgress() {
    var el = document.getElementById('scroll-down') ||
             document.getElementById('site-title') ||
             document.getElementById('page-header');
    if (!el) return 0;
    var rect = el.getBoundingClientRect();
    if (initialTop === null) {
      initialTop = rect.top;
      // 兜底：初始位置异常（如恢复滚动后已出屏）时按 80% 视口高度算
      if (!(initialTop > 0)) initialTop = (window.innerHeight || 800) * 0.8;
    }
    // 0 = 基准元素在原位（首屏未划出）；1 = 已到视口顶端，之后锁定
    var p = (initialTop - rect.top) / initialTop;
    if (!isFinite(p)) p = 0;
    p = Math.max(0, Math.min(1, p));
    // 轻微缓动：顶端几乎不糊，越接近小箭头越明显，避免起步过快
    return Math.pow(p, 1.4);
  }

  function apply() {
    var p = getProgress();
    var blur = (p * MAX_BLUR).toFixed(1) + 'px';
    var containers = document.querySelectorAll('.pl-container');
    for (var i = 0; i < containers.length; i++) {
      var c = containers[i];
      c.style.setProperty('filter', 'blur(' + blur + ')', 'important');
      var img = c.querySelector('.pl-img:not(.pl-blur)');
      if (img) img.style.setProperty('filter', 'blur(' + blur + ')', 'important');
    }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      apply();
    });
  }

  function init() {
    initialTop = null;
    apply(); // 立即应用：若浏览器恢复了滚动位置，一进页面就应是正确的毛玻璃状态
    // .pl-container 由 imgloaded.js 动态注入且带 2s 入场动画（blur-to-clear），
    // 动画结束后内联 filter 才真正接管，这里分几次补应用，覆盖加载/恢复滚动
    setTimeout(apply, 300);
    setTimeout(apply, 1200);
    setTimeout(apply, 2500);
    window.addEventListener('load', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('pjax:complete', function () {
      initialTop = null;
      setTimeout(apply, 0);
      setTimeout(apply, 300);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
