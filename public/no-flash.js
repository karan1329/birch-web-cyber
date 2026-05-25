// Runs before React hydrates. Reads stored theme/neon from localStorage and
// applies them to <html> so a refresh in light + non-default-neon does not
// flicker dark/lime first. Mirrors the defaults in useTheme.ts.
(function () {
  try {
    var m = localStorage.getItem("bl:theme");
    var n = localStorage.getItem("bl:neon");
    if (m === "light") document.documentElement.classList.add("light");
    if (n) {
      document.documentElement.style.setProperty("--bl-neon", n);
      var hex = n.replace("#", "");
      if (hex.length >= 6) {
        var rgb = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)]
          .map(function (x) {
            return parseInt(x, 16);
          })
          .join(",");
        document.documentElement.style.setProperty("--bl-neon-rgb", rgb);
      }
    }
  } catch (e) {}
})();
