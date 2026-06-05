// Runs before React hydrates. Reads `bl:theme` from localStorage and applies
// the matching mode + paired neon to <html> so a refresh in light + burgundy
// does not flicker dark + lime first. The pairing is locked: dark → lime,
// light → burgundy. Mirrors the COMBO map in useTheme.ts.
(function () {
  try {
    var m = localStorage.getItem("bl:theme");
    if (m === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.style.setProperty("--bl-neon", "#DA3F62");
      document.documentElement.style.setProperty("--bl-neon-rgb", "218,63,98");
    }
    // Dark is the default in globals.css (lime), so no boot work needed.
    // Drop the legacy `bl:neon` key in case a prior release wrote one.
    localStorage.removeItem("bl:neon");
  } catch (e) {}
})();
