(function () {
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  }, true);

  document.addEventListener("keydown", function (e) {
    var key = (e.key || "").toUpperCase();
    var ctrl = e.ctrlKey || e.metaKey;
    var shift = e.shiftKey;
    if (ctrl && !shift && !e.altKey && key === "U") {
      e.preventDefault();
      return false;
    }
    if (ctrl && shift && (key === "I" || key === "J" || key === "C")) {
      e.preventDefault();
      return false;
    }
    if (key === "F12") {
      e.preventDefault();
      return false;
    }
  }, true);
})();
