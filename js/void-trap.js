(function () {
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

  function typewriter(el, text, speed) {
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
  typewriter(span, msg, 85);
})();
