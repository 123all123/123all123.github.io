(function () {
  if (document.getElementById("arg-fictional-note")) return;

  function wouldBreakLayout() {
    var body = document.body;
    if (!body) return false;

    var page = (location.pathname.split("/").pop() || "index.html").split("?")[0].toLowerCase();
    if (page === "qiqi.html" || page === "youxiang.html") return true;

    var bs = window.getComputedStyle(body);
    var hs = window.getComputedStyle(document.documentElement);

    if (bs.display === "flex") {
      var alignCenter = bs.alignItems.indexOf("center") !== -1;
      var justifyCenter = bs.justifyContent.indexOf("center") !== -1;
      if (alignCenter && justifyCenter) return true;
    }

    if (
      (hs.overflow === "hidden" || bs.overflow === "hidden") &&
      (hs.height === "100%" || bs.height === "100%" || bs.height === "100vh")
    ) {
      return true;
    }

    return false;
  }

  if (wouldBreakLayout()) return;

  var el = document.createElement("div");
  el.id = "arg-fictional-note";
  el.textContent = "（以上网站纯属虚构）";
  el.style.cssText =
    "position:relative;z-index:9999;width:100%;padding:10px 16px 14px;" +
    "text-align:center;font-size:11px;color:#999;letter-spacing:1px;" +
    "font-family:'Microsoft YaHei','PingFang SC',Arial,sans-serif;" +
    "background:transparent;pointer-events:none;user-select:none;";
  document.body.appendChild(el);
})();
