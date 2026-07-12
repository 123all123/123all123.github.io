(function () {
  function fileName(href) {
    if (!href) return "";
    var path = href.split("?")[0].split("#")[0];
    return path.split("/").pop().toLowerCase() || "";
  }

  function isLocalHtml(href) {
    if (!href || href.indexOf("javascript:") === 0 || href.charAt(0) === "#") return false;
    if (/^https?:\/\//i.test(href)) return false;
    return /\.html/i.test(href);
  }

  function siteKey(name) {
    if (!name) return "";
    if (name === "find.html" || name === "index.html") return "hub";
    if (name.indexOf("backup_") === 0) return "backup";
    if (
      name === "guanwang.html" || name === "faen.html" || name === "liya.html" ||
      name === "xiaoman_intro.html" || name === "xiaoman.html" ||
      name.indexOf("news_") === 0 || name === "test.html" ||
      name === "forum.html" || name === "huodong.html"
    ) return "guanwang";
    if (
      name.indexOf("baike_") === 0 || name === "seiyuu_lilinye.html" ||
      name === "blog_lilinye.html" || name === "shenfa_gallery.html"
    ) return "wiki";
    if (name.indexOf("tools_") === 0) return "tools";
    if (name.indexOf("kuailiao_") === 0) return "kuailiao";
    if (name === "dreamcms.html" || name === "dreamcms_doc.html") return "dreamcms";
    if (name === "admin.html") return "admin";
    if (name === "qiqi.html" || name === "juezhan.html") return "qiqi";
    if (name === "youxiang.html") return "youxiang";
    if (name === "tieba.html") return "tieba";
    if (name === "feidie.html") return "feidie";
    return name;
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]");
    if (!a || a.target === "_blank" || a.dataset.sameTab === "1") return;

    var href = a.getAttribute("href");
    if (!isLocalHtml(href)) return;

    var from = fileName(location.pathname);
    var to = fileName(href);
    if (!to || to === from) return;
    if (to === "find.html" || to === "index.html") return;
    if (siteKey(from) === siteKey(to)) return;

    e.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");
  }, true);

  if (localStorage.getItem("arg_void_trap") !== "active") return;

  var page = (location.pathname.split("/").pop() || "").toLowerCase();
  if (!page || page === "find.html") return;
  if (page === "tools_hub.html" || page.indexOf("tools_") === 0) return;
  if (page === "qiqi.html") return;

  var msgs = [
    "逃避解决不了问题。",
    "永远留在这里吧。",
    "希望是残忍的谎言。",
    "你逃不掉的。",
    "一切都是徒劳。",
    "没有回头路了。",
    "幻想该结束了。",
    "挣扎毫无意义。"
  ];

  var css = document.createElement("style");
  css.textContent =
    "html,body{margin:0!important;padding:0!important;overflow:hidden!important;background:#000!important;}" +
    "#arg-void-trap{position:fixed;inset:0;z-index:2147483646;background:#000;display:flex;align-items:center;justify-content:center;}" +
    "#arg-void-trap .msg{color:#c00;font-size:22px;font-weight:bold;text-align:center;padding:24px;max-width:90vw;line-height:1.8;}";
  document.head.appendChild(css);

  var storageKey = "arg_void_msg_" + location.pathname;
  var msg = sessionStorage.getItem(storageKey);
  if (!msg) {
    msg = msgs[Math.floor(Math.random() * msgs.length)];
    sessionStorage.setItem(storageKey, msg);
  }

  function voidTrapTypewriter(el, text, speed) {
    el.textContent = "";
    var i = 0;
    (function tick() {
      if (i < text.length) {
        el.textContent += text.charAt(i++);
        setTimeout(tick, speed);
      }
    })();
  }

  var box = document.createElement("div");
  box.id = "arg-void-trap";
  var span = document.createElement("div");
  span.className = "msg";
  box.appendChild(span);
  document.body.appendChild(box);
  voidTrapTypewriter(span, msg, 85);
})();
