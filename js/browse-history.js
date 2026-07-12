(function () {
  var KEY = "arg_browse_history";
  var MAX = 40;

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
  }
  function save(list) {
    var next = JSON.stringify(list.slice(0, MAX));
    if (localStorage.getItem(KEY) === next) return;
    localStorage.setItem(KEY, next);
  }

  function currentEntry() {
    var path = location.pathname.split("/").pop() || "index.html";
    if (path === "" || path === ".") path = "index.html";
    return {
      url: path + (location.search || ""),
      title: (document.title || path).replace(/\s*[-_|].*$/, "").trim() || path,
      time: Date.now()
    };
  }

  function recordVisit() {
    var entry = currentEntry();
    if (/^find\.html$/i.test(entry.url.split("?")[0])) return;
    var list = load();
    if (list.length && list[0].url === entry.url) return;
    list = list.filter(function (x) { return x.url !== entry.url; });
    list.unshift(entry);
    save(list);
  }

  window.ARGBrowseHistory = {
    load: load,
    clear: function () { localStorage.removeItem(KEY); }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", recordVisit);
  } else {
    recordVisit();
  }
})();
