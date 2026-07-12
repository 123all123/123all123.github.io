(function () {
  var IGNORE_KEYS = { arg_browse_history: true };
  var proto = EventTarget.prototype;
  var rawAdd = proto.addEventListener;
  proto.addEventListener = function (type, listener, options) {
    if (type !== "storage" || typeof listener !== "function") {
      return rawAdd.call(this, type, listener, options);
    }
    var wrapped = function (e) {
      if (e && e.key && IGNORE_KEYS[e.key]) return;
      return listener.call(this, e);
    };
    return rawAdd.call(this, type, wrapped, options);
  };
})();
