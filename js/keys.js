/*
 * 《勇者不再》密钥核心
 * key2 = 667269656E64 = UTF-8 "friend"（莉亚 / 音频隐写）
 * key3 = 4845415254   = UTF-8 "HEART" （小满 / 冯骅照片）
 * key1 = hex(玩家名) ⊕ key2 ⊕ key3    （法恩 /《秘密1》画作，按玩家名动态生成）
 * 于是：key1 ⊕ key2 ⊕ key3 = hex(玩家名) → UTF-8 解码 = 玩家自己的名字。
 * 约定：异或按"左对齐、缺位补 0x00"进行，各页面统一，保证可逆。
 */
window.ARGKeys = (function () {
  var KEY2 = "667269656e64"; // friend
  var KEY3 = "4845415254";   // HEART

  // 字符串 -> UTF-8 字节数组
  function strToBytes(str) {
    var utf8 = unescape(encodeURIComponent(str));
    var bytes = [];
    for (var i = 0; i < utf8.length; i++) bytes.push(utf8.charCodeAt(i) & 0xff);
    return bytes;
  }
  // 字节数组 -> 十六进制小写
  function bytesToHex(bytes) {
    return bytes.map(function (b) { return ("0" + (b & 0xff).toString(16)).slice(-2); }).join("");
  }
  // 十六进制 -> 字节数组（容错：忽略空白，非法返回 null）
  function hexToBytes(hex) {
    hex = (hex || "").replace(/[\s:]/g, "");
    if (hex.length % 2 !== 0 || /[^0-9a-fA-F]/.test(hex)) return null;
    var bytes = [];
    for (var i = 0; i < hex.length; i += 2) bytes.push(parseInt(hex.substr(i, 2), 16));
    return bytes;
  }
  // 字节数组 -> UTF-8 字符串（剥除尾部 0x00 填充）
  function bytesToStr(bytes) {
    var b = bytes.slice();
    while (b.length && b[b.length - 1] === 0) b.pop();
    var s = "";
    for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    try { return decodeURIComponent(escape(s)); } catch (e) { return s; }
  }
  // 多个字节数组按位异或（左对齐，短的补 0）
  function xorBytes(arrs) {
    var maxLen = 0;
    arrs.forEach(function (a) { if (a && a.length > maxLen) maxLen = a.length; });
    var out = [];
    for (var i = 0; i < maxLen; i++) {
      var v = 0;
      arrs.forEach(function (a) { v ^= (a && a[i] !== undefined ? a[i] : 0); });
      out.push(v);
    }
    return out;
  }
  function strToHex(str) { return bytesToHex(strToBytes(str)); }
  function xorHex() {
    var arrs = [];
    for (var i = 0; i < arguments.length; i++) {
      var b = hexToBytes(arguments[i]);
      if (b === null) return null;
      arrs.push(b);
    }
    return bytesToHex(xorBytes(arrs));
  }
  function hexToStr(hex) {
    var b = hexToBytes(hex);
    return b === null ? null : bytesToStr(b);
  }
  // 根据玩家名动态计算 key1（法恩的《秘密1》）
  function computeKey1(playerName) {
    return xorHex(strToHex(playerName || "勇者"), KEY2, KEY3);
  }
  return {
    KEY2: KEY2, KEY3: KEY3,
    strToHex: strToHex, xorHex: xorHex, hexToStr: hexToStr, computeKey1: computeKey1
  };
})();
