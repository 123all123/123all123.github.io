/*
 * 《勇者不再》离线占位图系统
 * 作用：当任何 <img> 加载失败（本地缺图或无网络）时，
 *      用一张内联 SVG 占位图替换，SVG 上写明该处最终需要的图片内容（取自 alt 或 data-ph）。
 * 这样双击 HTML 即可离线运行，同时清晰标注美术需求。
 */
(function () {
  function svgPlaceholder(w, h, text) {
    w = w || 300; h = h || 200;
    text = (text || '图片占位').toString();
    // 自动按宽度折行
    var perLine = Math.max(6, Math.floor(w / 16));
    var lines = [];
    var s = text;
    while (s.length > 0) { lines.push(s.slice(0, perLine)); s = s.slice(perLine); }
    if (lines.length > 6) { lines = lines.slice(0, 6); lines[5] = lines[5].slice(0, perLine - 1) + '…'; }
    var lineHeight = 20;
    var startY = h / 2 - (lines.length - 1) * lineHeight / 2;
    var texts = lines.map(function (ln, i) {
      return '<text x="' + (w / 2) + '" y="' + (startY + i * lineHeight) +
        '" font-family="sans-serif" font-size="14" fill="#888" text-anchor="middle" dominant-baseline="middle">' +
        ln.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</text>';
    }).join('');
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
      '<rect width="100%" height="100%" fill="#ececec" stroke="#c8c8c8" stroke-width="2" stroke-dasharray="6 4"/>' +
      '<text x="' + (w / 2) + '" y="18" font-family="sans-serif" font-size="11" fill="#bbb" text-anchor="middle">[ 占位图 · 待替换 ]</text>' +
      texts + '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function fix(img) {
    if (img.dataset.phDone) return;
    img.dataset.phDone = '1';
    var w = img.getAttribute('width') || img.width || img.clientWidth || 300;
    var h = img.getAttribute('height') || img.height || img.clientHeight || 200;
    var label = img.getAttribute('data-ph') || img.getAttribute('alt') || '图片占位';
    img.src = svgPlaceholder(parseInt(w, 10), parseInt(h, 10), label);
  }

  function scan() {
    var imgs = document.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      // 拦截：把网络占位服务(via.placeholder 等)与缺失图统一走本地占位
      img.addEventListener('error', function () { fix(this); });
      var src = img.getAttribute('src') || '';
      if (/placeholder\.com|via\.placeholder|placehold\.it/i.test(src)) {
        fix(img);
      } else if (img.complete && img.naturalWidth === 0) {
        fix(img);
      }
    }
  }

  // 暴露给页面手动调用（例如动态生成的占位）
  window.svgPlaceholder = svgPlaceholder;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan);
  } else {
    scan();
  }
  window.addEventListener('load', scan);
})();
