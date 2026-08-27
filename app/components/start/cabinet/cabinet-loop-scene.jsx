"use client";
/* eslint-disable */
// Ported verbatim from the Claude Design project (Cabinet Loop).
//
// The mascot loop: arrives and pulls the light cord, wrestles the stamp and
// slams FILED onto the vendor security questionnaire, then files three
// papers into the highlighted drawer slots, hip-jamming the drawer shut
// after each one. 17 scenes, ~33.6s, loops.
//
// Changes from source, all of them structural rather than artistic:
//   - React imported explicitly; CompositionStage imported as an ES module.
//   - The authoring globals (OM_SCENES / OM_PLAYBACK / TWEAK_DEFAULTS) are
//     inlined as constants, so nothing depends on window at module scope.
//   - The TweaksPanel editor UI is dropped: it is an authoring tool, not
//     part of the page.
// The SVG artwork and all motion timing are untouched.
import React from "react";
import {
  CompositionStage,
  Easing,
  useComposition,
} from "./animations-v3";

const OM_SCENES = '[{"name":"Arrive","dur":3.6},{"name":"Stamp","dur":3.2},{"name":"Pickup 1","dur":1.6},{"name":"Jump 1","dur":1.8},{"name":"File 1","dur":2.2},{"name":"Close 1","dur":1.8},{"name":"Return 1","dur":1.5},{"name":"Pickup 2","dur":1.6},{"name":"Jump 2","dur":1.8},{"name":"File 2","dur":2.2},{"name":"Close 2","dur":1.8},{"name":"Return 2","dur":1.5},{"name":"Pickup 3","dur":1.6},{"name":"Jump 3","dur":1.8},{"name":"File 3","dur":2.2},{"name":"Close 3","dur":1.8},{"name":"Away","dur":1.6}]';
const OM_PLAYBACK = '{"mode":"loop"}';
// Authoring default carried over from the project file.
const CHUBBY = 1.1;

/* cabinet-loop-scene.jsx — Birchlogic cabinet mascot loop, 3 rounds */
const DEFS="<defs>\n  <pattern id=\"dth1\" width=\"8\" height=\"8\" patternUnits=\"userSpaceOnUse\"><circle cx=\"4\" cy=\"4\" r=\"1.1\" fill=\"#40101F\" opacity=\"0.3\"></circle></pattern>\n  <pattern id=\"dth2\" width=\"11\" height=\"11\" patternUnits=\"userSpaceOnUse\"><circle cx=\"5\" cy=\"5\" r=\"1.4\" fill=\"#40101F\" opacity=\"0.22\"></circle></pattern>\n</defs>";
const ISO_A="\n    <path d=\"M-8.7 293.0L826.2 775.0L826.2 -165.0L-8.7 -347.0Z\" fill=\"#F1EFE8\" stroke=\"none\"></path>\n    <path d=\"M-8.7 1.0L826.2 483.0L826.2 141.0L-8.7 -341.0Z\" fill=\"#F1EFE8\" stroke=\"none\"></path><path d=\"M-8.7 1.0L826.2 483.0L826.2 141.0L-8.7 -341.0Z\" fill=\"url(#dth2)\" opacity=\"0.55\" stroke=\"none\"></path><path d=\"M-8.7 1.0L826.2 483.0L826.2 141.0L-8.7 -341.0Z\" fill=\"none\" stroke=\"#F1EFE8\" opacity=\"0.85\" stroke-dasharray=\"16 12\" stroke-width=\"3\"></path>\n    <path d=\"M-8.7 -389.0L826.2 93.0L826.2 -165.0L-8.7 -647.0Z\"></path>\n    <path d=\"M261.5 -338.0L556.0 -168.0L556.0 -216.0L261.5 -386.0Z\"></path>\n    <path d=\"M275.4 -340.0L542.1 -186.0L542.1 -214.0L275.4 -368.0Z\"></path>\n    <path d=\"M-8.7 293.0L826.2 775.0L826.2 531.0L-8.7 49.0Z\"></path>\n    <path d=\"M261.5 351.0L556.0 521.0L556.0 473.0L261.5 303.0Z\"></path>\n    <path d=\"M275.4 349.0L542.1 503.0L542.1 475.0L275.4 321.0Z\"></path>\n    <path d=\"M-450.3 540.0L401.8 1032.0L194.0 1152.0L-658.2 660.0Z\" fill=\"url(#dth2)\" stroke=\"none\"></path>\n  ";
const BG_MID="\n  <path d=\"M60 958 L1560 958\" stroke=\"#F1EFE8\" stroke-width=\"3\" fill=\"none\"></path>\n  \n  <ellipse cx=\"645\" cy=\"878\" rx=\"270\" ry=\"46\" fill=\"url(#dth1)\" stroke=\"none\"></ellipse>\n  \n  \n  ";
const D1="\n    <path d=\"M0.0 -240.0L817.5 232.0L798.5 243.0L-19.1 -229.0Z\"></path>\n    <path d=\"M-19.1 11.0L798.5 483.0L798.5 243.0L-19.1 -229.0Z\"></path>\n    <path d=\"M817.5 472.0L798.5 483.0L798.5 243.0L817.5 232.0Z\"></path>\n    <path d=\"M-19.1 -229.0L0.0 -218.0L-556.0 103.0L-575.0 92.0Z\"></path>\n    <path d=\"M0.0 22.0L-556.0 343.0L-556.0 103.0L0.0 -218.0Z\"></path>\n    <path d=\"M0.0 22.0L779.4 472.0L223.4 793.0L-556.0 343.0Z\"></path>\n    <path d=\"M27.7 -196.0L741.3 216.0L734.4 220.0L20.8 -192.0Z\"></path>\n    <path d=\"M741.3 456.0L734.4 460.0L734.4 220.0L741.3 216.0Z\"></path>\n    <path d=\"M20.8 48.0L734.4 460.0L734.4 220.0L20.8 -192.0Z\"></path>\n    <path d=\"M3.5 -182.0L263.3 -32.0L256.3 -28.0L-3.5 -178.0Z\"></path>\n    <path d=\"M533.5 124.0L717.1 230.0L710.1 234.0L526.5 128.0Z\"></path>\n    <path d=\"M717.1 470.0L710.1 474.0L710.1 234.0L717.1 230.0Z\"></path>\n    <path d=\"M-3.5 62.0L710.1 474.0L710.1 234.0L526.5 128.0L526.5 52.0L256.3 -104.0L256.3 -28.0L-3.5 -178.0Z\"></path>\n    <path d=\"M263.3 -108.0L533.5 48.0L526.5 52.0L256.3 -104.0Z\"></path>\n    <path d=\"M533.5 124.0L526.5 128.0L526.5 52.0L533.5 48.0Z\"></path>\n    <text transform=\"matrix(0.866 0.5 0 1 391.4 20.0)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"26\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">CLOUD SECURITY</text>\n    <path d=\"M-20.8 -168.0L692.8 244.0L685.9 248.0L-27.7 -164.0Z\"></path>\n    <path d=\"M692.8 484.0L685.9 488.0L685.9 248.0L692.8 244.0Z\"></path>\n    <path d=\"M-27.7 76.0L685.9 488.0L685.9 248.0L-27.7 -164.0Z\"></path>\n    <path d=\"M-45.0 -154.0L13.9 -120.0L6.9 -116.0L-52.0 -150.0Z\"></path>\n    <path d=\"M230.4 5.0L668.6 258.0L661.6 262.0L223.4 9.0Z\"></path>\n    <path d=\"M668.6 498.0L661.6 502.0L661.6 262.0L668.6 258.0Z\"></path>\n    <path d=\"M-52.0 90.0L661.6 502.0L661.6 262.0L223.4 9.0L223.4 -67.0L6.9 -192.0L6.9 -116.0L-52.0 -150.0Z\"></path>\n    <path d=\"M13.9 -196.0L230.4 -71.0L223.4 -67.0L6.9 -192.0Z\"></path>\n    <path d=\"M230.4 5.0L223.4 9.0L223.4 -67.0L230.4 -71.0Z\"></path>\n    <text transform=\"matrix(0.866 0.5 0 1 115.2 -101.5)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"22\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">VULNERABILITY</text>\n    <text transform=\"matrix(0.866 0.5 0 1 115.2 -73.5)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"22\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">MANAGEMENT</text>\n    <path d=\"M-69.3 -140.0L644.3 272.0L637.4 276.0L-76.2 -136.0Z\"></path>\n    <path d=\"M644.3 512.0L637.4 516.0L637.4 276.0L644.3 272.0Z\"></path>\n    <path d=\"M-76.2 104.0L637.4 516.0L637.4 276.0L-76.2 -136.0Z\"></path>\n    <path d=\"M-93.5 -126.0L482.4 206.5L475.4 210.5L-100.5 -122.0Z\"></path>\n    <path d=\"M620.1 286.0L620.1 286.0L613.1 290.0L613.1 290.0Z\"></path>\n    <path d=\"M620.1 526.0L613.1 530.0L613.1 290.0L620.1 286.0Z\"></path>\n    <path d=\"M-100.5 118.0L613.1 530.0L613.1 290.0L613.1 290.0L613.1 214.0L475.4 134.5L475.4 210.5L-100.5 -122.0Z\"></path>\n    <path d=\"M482.4 130.5L620.1 210.0L613.1 214.0L475.4 134.5Z\"></path>\n    <path d=\"M620.1 286.0L613.1 290.0L613.1 214.0L620.1 210.0Z\"></path>\n    <text transform=\"matrix(0.866 0.5 0 1 544.3 220.3)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"26\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">DEVOPS</text>\n    <path d=\"M-117.8 -112.0L595.8 300.0L588.9 304.0L-124.7 -108.0Z\"></path>\n    <path d=\"M595.8 540.0L588.9 544.0L588.9 304.0L595.8 300.0Z\"></path>\n    <path d=\"M-124.7 132.0L588.9 544.0L588.9 304.0L-124.7 -108.0Z\"></path>\n    <path d=\"M-142.0 -98.0L-136.8 -95.0L-143.8 -91.0L-149.0 -94.0Z\"></path>\n    <path d=\"M51.1 13.5L571.6 314.0L564.6 318.0L44.2 17.5Z\"></path>\n    <path d=\"M571.6 554.0L564.6 558.0L564.6 318.0L571.6 314.0Z\"></path>\n    <path d=\"M-149.0 146.0L564.6 558.0L564.6 318.0L44.2 17.5L44.2 -58.5L-143.8 -167.0L-143.8 -91.0L-149.0 -94.0Z\"></path>\n    <path d=\"M-136.8 -171.0L51.1 -62.5L44.2 -58.5L-143.8 -167.0Z\"></path>\n    <path d=\"M51.1 13.5L44.2 17.5L44.2 -58.5L51.1 -62.5Z\"></path>\n    <text transform=\"matrix(0.866 0.5 0 1 -49.8 -84.8)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"22\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">APPLICATION</text>\n    <text transform=\"matrix(0.866 0.5 0 1 -49.8 -56.8)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"22\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">SECURITY</text>\n    <path d=\"M-166.3 -84.0L547.3 328.0L540.4 332.0L-173.2 -80.0Z\"></path>\n    <path d=\"M547.3 568.0L540.4 572.0L540.4 332.0L547.3 328.0Z\"></path>\n    <path d=\"M-173.2 160.0L540.4 572.0L540.4 332.0L-173.2 -80.0Z\"></path>\n    <path d=\"M-190.5 -70.0L383.6 261.5L376.7 265.5L-197.5 -66.0Z\"></path>\n    <path d=\"M471.1 312.0L523.1 342.0L516.2 346.0L464.2 316.0Z\"></path>\n    <path d=\"M523.1 582.0L516.2 586.0L516.2 346.0L523.1 342.0Z\"></path>\n    <path d=\"M-197.5 174.0L516.2 586.0L516.2 346.0L464.2 316.0L464.2 240.0L376.7 189.5L376.7 265.5L-197.5 -66.0Z\"></path>\n    <path d=\"M383.6 185.5L471.1 236.0L464.2 240.0L376.7 189.5Z\"></path>\n    <path d=\"M471.1 312.0L464.2 316.0L464.2 240.0L471.1 236.0Z\"></path>\n    <text transform=\"matrix(0.866 0.5 0 1 420.5 260.8)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"26\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">GRC</text>\n    <path d=\"M-214.8 -56.0L498.8 356.0L491.9 360.0L-221.7 -52.0Z\"></path>\n    <path d=\"M498.8 596.0L491.9 600.0L491.9 360.0L498.8 356.0Z\"></path>\n    <path d=\"M-221.7 188.0L491.9 600.0L491.9 360.0L-221.7 -52.0Z\"></path>\n    <path d=\"M-239.0 -42.0L-226.9 -35.0L-233.8 -31.0L-246.0 -38.0Z\"></path>\n    <path d=\"M-81.4 49.0L474.6 370.0L467.7 374.0L-88.3 53.0Z\"></path>\n    <path d=\"M474.6 610.0L467.7 614.0L467.7 374.0L474.6 370.0Z\"></path>\n    <path d=\"M-246.0 202.0L467.7 614.0L467.7 374.0L-88.3 53.0L-88.3 -23.0L-233.8 -107.0L-233.8 -31.0L-246.0 -38.0Z\"></path>\n    <path d=\"M-226.9 -111.0L-81.4 -27.0L-88.3 -23.0L-233.8 -107.0Z\"></path>\n    <path d=\"M-81.4 49.0L-88.3 53.0L-88.3 -23.0L-81.4 -27.0Z\"></path>\n    <text transform=\"matrix(0.866 0.5 0 1 -161.1 -37.0)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"22\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">INCIDENT</text>\n    <text transform=\"matrix(0.866 0.5 0 1 -161.1 -9.0)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"22\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">RESPONSE</text>\n    <path d=\"M-263.3 -28.0L450.3 384.0L443.4 388.0L-270.2 -24.0Z\"></path>\n    <path d=\"M450.3 624.0L443.4 628.0L443.4 388.0L450.3 384.0Z\"></path>\n    <path d=\"M-270.2 216.0L443.4 628.0L443.4 388.0L-270.2 -24.0Z\"></path>\n    <path d=\"M-287.5 -14.0L152.4 240.0L145.5 244.0L-294.4 -10.0Z\"></path>\n    <path d=\"M426.1 398.0L426.1 398.0L419.2 402.0L419.2 402.0Z\"></path>\n    <path d=\"M426.1 638.0L419.2 642.0L419.2 402.0L426.1 398.0Z\"></path>\n    <path d=\"M-294.4 230.0L419.2 642.0L419.2 402.0L419.2 402.0L419.2 326.0L145.5 168.0L145.5 244.0L-294.4 -10.0Z\"></path>\n    <path d=\"M152.4 164.0L426.1 322.0L419.2 326.0L145.5 168.0Z\"></path>\n    <path d=\"M426.1 398.0L419.2 402.0L419.2 326.0L426.1 322.0Z\"></path>\n    <text transform=\"matrix(0.866 0.5 0 1 282.3 275.0)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"22\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">IDENTITY &amp; ACCESS</text>\n    <text transform=\"matrix(0.866 0.5 0 1 282.3 303.0)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"22\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">MANAGEMENT</text>\n    <path d=\"M-311.8 0.0L401.8 412.0L394.9 416.0L-318.7 4.0Z\"></path>\n    <path d=\"M401.8 652.0L394.9 656.0L394.9 416.0L401.8 412.0Z\"></path>\n    <path d=\"M-318.7 244.0L394.9 656.0L394.9 416.0L-318.7 4.0Z\"></path>\n    <path d=\"M-93.5 96.0L53.7 181.0L46.8 185.0L-100.5 100.0Z\" fill=\"#C13A56\"></path>\n    <path d=\"M-100.5 176.0L46.8 261.0L46.8 185.0L-100.5 100.0Z\" fill=\"#C13A56\"></path>\n    <path d=\"M53.7 257.0L46.8 261.0L46.8 185.0L53.7 181.0Z\" fill=\"#C13A56\"></path>\n    <text transform=\"matrix(0.866 0.5 0 1 -26.8 190.5)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"600\" font-size=\"26\" letter-spacing=\"2\" fill=\"#F1EFE8\" stroke=\"none\">TPRM</text>\n    ";
const D2="\n    <path d=\"M-391.4 46.0L322.2 458.0L315.2 462.0L-398.4 50.0Z\"></path>\n    <path d=\"M322.2 698.0L315.2 702.0L315.2 462.0L322.2 458.0Z\"></path>\n    <path d=\"M-398.4 290.0L315.2 702.0L315.2 462.0L-398.4 50.0Z\"></path>\n    <path d=\"M-415.7 60.0L43.3 325.0L36.4 329.0L-422.6 64.0Z\"></path>\n    <path d=\"M217.4 425.5L297.9 472.0L291.0 476.0L210.4 429.5Z\"></path>\n    <path d=\"M297.9 712.0L291.0 716.0L291.0 476.0L297.9 472.0Z\"></path>\n    <path d=\"M-422.6 304.0L291.0 716.0L291.0 476.0L210.4 429.5L210.4 353.5L36.4 253.0L36.4 329.0L-422.6 64.0Z\"></path>\n    <path d=\"M43.3 249.0L217.4 349.5L210.4 353.5L36.4 253.0Z\"></path>\n    <path d=\"M217.4 425.5L210.4 429.5L210.4 353.5L217.4 349.5Z\"></path>\n    <text transform=\"matrix(0.866 0.5 0 1 123.4 331.3)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"22\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">DATA</text>\n    <text transform=\"matrix(0.866 0.5 0 1 123.4 359.3)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"22\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">PROTECTION</text>\n    <path d=\"M-439.9 74.0L273.7 486.0L266.7 490.0L-446.9 78.0Z\"></path>\n    <path d=\"M273.7 726.0L266.7 730.0L266.7 490.0L273.7 486.0Z\"></path>\n    <path d=\"M-446.9 318.0L266.7 730.0L266.7 490.0L-446.9 78.0Z\"></path>\n    <path d=\"M-464.2 88.0L-346.4 156.0L-353.3 160.0L-471.1 92.0Z\"></path>\n    <path d=\"M-42.4 331.5L249.4 500.0L242.5 504.0L-49.4 335.5Z\"></path>\n    <path d=\"M249.4 740.0L242.5 744.0L242.5 504.0L249.4 500.0Z\"></path>\n    <path d=\"M-471.1 332.0L242.5 744.0L242.5 504.0L-49.4 335.5L-49.4 259.5L-353.3 84.0L-353.3 160.0L-471.1 92.0Z\"></path>\n    <path d=\"M-346.4 80.0L-42.4 255.5L-49.4 259.5L-353.3 84.0Z\"></path>\n    <path d=\"M-42.4 331.5L-49.4 335.5L-49.4 259.5L-42.4 255.5Z\"></path>\n    <text transform=\"matrix(0.866 0.5 0 1 -201.4 217.8)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"500\" font-size=\"26\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">SECURITY REVIEWS</text>\n    <path d=\"M-488.4 102.0L225.2 514.0L218.2 518.0L-495.4 106.0Z\"></path>\n    <path d=\"M225.2 754.0L218.2 758.0L218.2 518.0L225.2 514.0Z\"></path>\n    <path d=\"M-495.4 346.0L218.2 758.0L218.2 518.0L-495.4 106.0Z\"></path>\n    <path d=\"M-512.7 116.0L200.9 528.0L194.0 532.0L-519.6 120.0Z\"></path>\n    <path d=\"M200.9 768.0L194.0 772.0L194.0 532.0L200.9 528.0Z\"></path>\n    <path d=\"M-519.6 360.0L194.0 772.0L194.0 532.0L-519.6 120.0Z\"></path>\n    <path d=\"M779.4 232.0L798.5 243.0L242.5 564.0L223.4 553.0Z\"></path>\n    <path d=\"M798.5 483.0L242.5 804.0L242.5 564.0L798.5 243.0Z\"></path>\n    <path d=\"M-601.0 37.0L268.5 539.0L239.0 556.0L-630.5 54.0Z\"></path>\n    <path d=\"M-630.5 334.0L239.0 836.0L239.0 556.0L-630.5 54.0Z\"></path>\n    <path d=\"M268.5 819.0L239.0 836.0L239.0 556.0L268.5 539.0Z\"></path>\n    <path d=\"M-386.2 300.0L-5.2 520.0L-27.7 533.0L-408.8 313.0Z\"></path>\n    <path d=\"M-408.8 363.0L-27.7 583.0L-27.7 533.0L-408.8 313.0Z\"></path>\n    <path d=\"M-5.2 570.0L-27.7 583.0L-27.7 533.0L-5.2 520.0Z\"></path>\n    <path d=\"M-391.4 363.0L-45.0 563.0L-45.0 533.0L-391.4 333.0Z\"></path>\n    <text transform=\"matrix(0.866 0.5 0 1 -218.2 454.0)\" text-anchor=\"middle\" font-family=\"'IBM Plex Mono',monospace\" font-weight=\"600\" font-size=\"17\" letter-spacing=\"1\" fill=\"#40101F\" stroke=\"none\">FRACTIONAL SECURITY OFFICE</text>\n  ";
const ISO="translate(1087 136) scale(0.85)";
const NAVY="#40101F", BONE="#F1EFE8", OCHRE="#C13A56";
const MOTION={go:Easing.easeInOutSine,pop:Easing.easeOutBack};
function clamp01(v){return v<0?0:v>1?1:v;}
function kf(T,pts,ez){ez=ez||MOTION.go;if(T<=pts[0][0])return pts[0][1];for(let i=0;i<pts.length-1;i++){const t0=pts[i][0],v0=pts[i][1],t1=pts[i+1][0],v1=pts[i+1][1];if(T<t1){if(t1<=t0)return v1;return v0+(v1-v0)*ez(clamp01((T-t0)/(t1-t0)));}}return pts[pts.length-1][1];}
function mlerp(A,B,p){return A.map((a,i)=>a+(B[i]-a)*p);}
function mstr(m){return "matrix("+m.map(v=>Math.round(v*1000)/1000).join(" ")+")";}
const LIN=[0.484,0.28,0.048,0.711];
const ROUND_CFG=[
 {header:"VENDOR SECURITY QUESTIONNAIRE",pile:[0.998,-0.07,0.07,0.998,658,812],e:1242.3,f:396.9,stand:[1120,514]},
 {header:"DPDP ACT 2023 COMPLIANCE",pile:[0.985,0.174,-0.174,0.985,432,892],e:1187.8,f:428.3,stand:[1096,496]},
 {header:"AWS SECURITY IMPLEMENTATION CONTROLS",hs:15,pile:[0.982,-0.191,0.191,0.982,668,848],e:1417.5,f:149.5,stand:[1120,514],stand2:[1426,246]}
];
const TABS={
 tprm:{top:"M-93.5 96L53.7 181L46.8 185L-100.5 100Z",front:"M-100.5 176L46.8 261L46.8 185L-100.5 100Z",right:"M53.7 257L46.8 261L46.8 185L53.7 181Z",label:[["TPRM",-26.8,190.5,26,600,2]]},
 dp:{top:"M43.3 249L217.4 349.5L210.4 353.5L36.4 253Z",front:"M36.4 329L210.4 429.5L210.4 353.5L36.4 253Z",right:"M217.4 425.5L210.4 429.5L210.4 353.5L217.4 349.5Z",label:[["DATA",123.4,331.3,22,500,1],["PROTECTION",123.4,359.3,22,500,1]]},
 cs:{top:"M263.3 -108L533.5 48L526.5 52L256.3 -104Z",front:"M256.3 -28L526.5 128L526.5 52L256.3 -104Z",right:"M533.5 124L526.5 128L526.5 52L533.5 48Z",label:[["CLOUD SECURITY",391.4,20,26,500,1]]}
};
function TabOverlay({id,color}){
  const t=TABS[id];if(!t)return null;
  return (<g fill={color} stroke={NAVY} strokeWidth="3.5" strokeLinejoin="round">
    <path d={t.top}></path><path d={t.front}></path><path d={t.right}></path>
    {t.label.map((L,i)=><text key={i} transform={"matrix(0.866 0.5 0 1 "+L[1]+" "+L[2]+")"} textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontWeight={L[4]} fontSize={L[3]} letterSpacing={L[5]} fill={color===OCHRE?BONE:NAVY} stroke="none">{L[0]}</text>)}
  </g>);}
function Sheet({n,fade,marked}){
  const t1={fontFamily:"'IBM Plex Mono',monospace",fontWeight:"600",fontSize:"17px",letterSpacing:"1px"};
  const t2={fontFamily:"'IBM Plex Mono',monospace",fontWeight:"500",fontSize:"9.5px",letterSpacing:"2px"};
  let body=null;
  if(n===1)body=(<g>
    <text x="-168" y="-84" style={t1} fill={NAVY}>VENDOR SECURITY</text>
    <text x="-168" y="-63" style={t1} fill={NAVY}>QUESTIONNAIRE</text>
    <text x="-168" y="-46" style={t2} fill={OCHRE}>FORM VSQ-7 &#183; ANNUAL</text>
    <path d="M-168 -38 L168 -38 M-168 -34 L168 -34" stroke={NAVY} strokeWidth="1.4" fill="none"></path>
    <g stroke={NAVY} strokeWidth="1.8" fill="none">
      <rect x="-168" y="-22" width="10" height="10"></rect><path d="M-166 -17 L-163 -13 L-159 -21" stroke={OCHRE} strokeWidth="2.2"></path>
      <rect x="-168" y="-2" width="10" height="10"></rect>
      <rect x="-168" y="18" width="10" height="10"></rect><path d="M-166 23 L-163 27 L-159 19" stroke={OCHRE} strokeWidth="2.2"></path>
    </g>
    <path d="M-148 -16 L96 -16 M-148 4 L140 4 M-148 24 L70 24" stroke={NAVY} strokeWidth="2" opacity="0.35" fill="none"></path>
    <rect x="-148" y="42" width="186" height="11" fill="#0D0D0F" stroke="none"></rect>
    {marked?<g transform="translate(112 84) rotate(-9)">
      <ellipse rx="42" ry="13" fill="none" stroke={OCHRE} strokeWidth="1.8" opacity="0.35" transform="translate(2 2)"></ellipse>
      <ellipse rx="42" ry="13" fill="none" stroke={OCHRE} strokeWidth="2"></ellipse>
      <text y="3.5" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontWeight="600" fontSize="9.5" letterSpacing="2.5" fill={OCHRE} stroke="none">FILED</text>
    </g>:null}
    <path d="M60 86 L168 86" stroke={NAVY} strokeWidth="1.4" fill="none"></path>
    <text x="60" y="99" style={t2} fill={NAVY} opacity="0.7">SIGNATURE / DATE</text>
  </g>);
  else if(n===2)body=(<g>
    <text x="-168" y="-84" style={t1} fill={NAVY}>DPDP ACT 2023</text>
    <text x="-168" y="-63" style={t1} fill={NAVY}>COMPLIANCE</text>
    <text x="-168" y="-46" style={t2} fill={OCHRE}>DIGITAL PERSONAL DATA PROTECTION &#183; IN</text>
    <path d="M-168 -38 L168 -38 M-168 -34 L168 -34" stroke={NAVY} strokeWidth="1.4" fill="none"></path>
    <g fill={OCHRE} fontFamily="'IBM Plex Mono',monospace" fontWeight="600" fontSize="10.5px">
      <text x="-168" y="-14">S.4</text><text x="-168" y="8">S.7</text><text x="-168" y="30">S.25</text>
    </g>
    <path d="M-134 -18 L110 -18 M-134 4 L82 4 M-134 26 L128 26" stroke={NAVY} strokeWidth="2" opacity="0.35" fill="none"></path>
    <rect x="-134" y="40" width="160" height="11" fill="#0D0D0F" stroke="none"></rect>
    <g stroke={NAVY} strokeWidth="1.3" fill="none">
      <rect x="-168" y="62" width="336" height="40"></rect>
      <path d="M-168 82 L168 82 M0 62 L0 102"></path>
    </g>
    <path d="M-154 74 L-60 74 M14 74 L110 74 M-154 94 L-84 94 M14 94 L130 94" stroke={NAVY} strokeWidth="2" opacity="0.35" fill="none"></path>
  </g>);
  else if(n===3)body=(<g>
    <text x="-168" y="-84" style={t1} fill={NAVY}>AWS SECURITY</text>
    <text x="-168" y="-63" style={{fontFamily:"'IBM Plex Mono',monospace",fontWeight:"600",fontSize:"14.5px",letterSpacing:"0.5px"}} fill={NAVY}>IMPLEMENTATION CONTROLS</text>
    <text x="-168" y="-46" style={t2} fill={OCHRE}>CTRL-SET AWS-22 &#183; REV C</text>
    <path d="M-168 -38 L168 -38 M-168 -34 L168 -34" stroke={NAVY} strokeWidth="1.4" fill="none"></path>
    <g fill={OCHRE} fontFamily="'IBM Plex Mono',monospace" fontWeight="600" fontSize="10px">
      <text x="-168" y="-13">IAM-01</text><text x="-168" y="9">KMS-04</text><text x="-168" y="31">VPC-09</text>
    </g>
    <g stroke={NAVY} strokeWidth="1.8" fill="none">
      <rect x="148" y="-22" width="10" height="10"></rect><path d="M150 -17 L153 -13 L157 -21" stroke={OCHRE} strokeWidth="2.2"></path>
      <rect x="148" y="0" width="10" height="10"></rect><path d="M150 5 L153 9 L157 1" stroke={OCHRE} strokeWidth="2.2"></path>
      <rect x="148" y="22" width="10" height="10"></rect>
    </g>
    <path d="M-104 -17 L134 -17 M-104 5 L112 5 M-104 27 L134 27" stroke={NAVY} strokeWidth="2" opacity="0.35" fill="none"></path>
    <rect x="-104" y="44" width="190" height="11" fill="#0D0D0F" stroke="none"></rect>
    <rect x="-168" y="74" width="56" height="8" fill={OCHRE} stroke="none"></rect>
    <rect x="-108" y="74" width="38" height="8" fill={OCHRE} opacity="0.55" stroke="none"></rect>
    <rect x="-66" y="74" width="22" height="8" fill={OCHRE} opacity="0.3" stroke="none"></rect>
    <text x="-168" y="99" style={t2} fill={NAVY} opacity="0.7">COVERAGE 61%</text>
  </g>);
  else body=(<path d="M-160 -60 L110 -60 M-160 -10 L60 -10 M-160 40 L120 40" stroke={NAVY} strokeWidth="2.5" opacity="0.38" fill="none"></path>);
  return (<g>
    <rect x="-190" y="-115" width="380" height="230" fill={BONE} stroke={NAVY} strokeWidth="3"></rect>
    {n===1?<path d="M190 -115 L158 -115 L190 -83 Z" fill="#E4DFD3" stroke={NAVY} strokeWidth="3" strokeLinejoin="round"></path>:null}
    <g opacity={fade}>{body}</g>
  </g>);}
function Puff({T,t0,x,y,big}){
  const d=T-t0;if(d<0||d>0.5)return null;
  const p=d/0.5,r=(big?24:15)+p*(big?44:28),o=(1-p)*0.65;
  return (<g stroke={BONE} strokeWidth="3" opacity={o} strokeLinecap="round" fill="none">
    {[15,55,95,135,168].map(dg=>{const a=dg*Math.PI/180,c=Math.cos(a),si=-Math.sin(a);
      return <path key={dg} d={"M"+(x+c*r*0.72).toFixed(0)+" "+(y+si*r*0.45).toFixed(0)+" L"+(x+c*r).toFixed(0)+" "+(y+si*r*0.6).toFixed(0)}></path>;})}
  </g>);}
function JamSpark({T,t0,x,y}){
  const d=T-t0;if(d<0||d>0.32)return null;
  const p=d/0.32,o=1-p,l=12+p*30;
  return (<g stroke={OCHRE} strokeWidth="3.5" opacity={o} strokeLinecap="round" fill="none">
    {[-34,8,52,96].map(dg=>{const a=dg*Math.PI/180,c=Math.cos(a),si=-Math.sin(a);
      return <path key={dg} d={"M"+(x+c*13).toFixed(0)+" "+(y+si*13).toFixed(0)+" L"+(x+c*l).toFixed(0)+" "+(y+si*l).toFixed(0)}></path>;})}
  </g>);}
function Mascot(p){
  const mitt=(x,y,k)=><circle key={k} cx={x} cy={y} r="4.6" fill={BONE} stroke={NAVY} strokeWidth="3"></circle>;
  let arms;
  if(p.arm==="carry")arms=<g><path d="M-14 -32 L-22 -74 M16 -32 L24 -72" fill="none"></path>{mitt(-23,-77,"a")}{mitt(25,-75,"b")}</g>;
  else if(p.arm==="hang")arms=<g><path d="M-10 -36 L-2 -106 M14 -36 L12 -106" fill="none"></path>{mitt(0,-110,"a")}{mitt(13,-110,"b")}</g>;
  else if(p.arm==="pat")arms=<g><path d="M-16 -28 L-24 -20" fill="none"></path>{mitt(-26,-19,"a")}<g transform={"rotate("+p.patA+" 18 -30)"}><path d="M18 -30 L38 -38" fill="none"></path>{mitt(41,-40,"b")}</g></g>;
  else if(p.arm==="naruto")arms=<g><path d="M-13 -32 Q-30 -30 -44 -22" fill="none"></path><path d="M-9 -26 Q-26 -22 -40 -14" fill="none"></path>{mitt(-46,-21,"a")}{mitt(-42,-13,"b")}</g>;
  else arms=<g><g transform={"rotate("+(p.legB*0.7)+" -19 -26)"}><path d="M-19 -26 L-28 -18" fill="none"></path>{mitt(-30,-17,"a")}</g><g transform={"rotate("+(p.legA*0.7)+" 19 -26)"}><path d="M19 -26 L28 -18" fill="none"></path>{mitt(30,-17,"b")}</g></g>;
  const eyes = p.face==="grit"
    ? <g><path d="M0 -67 L9 -63 L0 -59 M26 -67 L17 -63 L26 -59" fill="none" strokeWidth="2.6"></path><path d="M10 -49 L20 -49" fill="none" strokeWidth="2.4"></path></g>
    : <g>
        <ellipse cx="5" cy="-63" rx="6.2" ry={p.blink?1.1:6.2} fill={NAVY} stroke="none"></ellipse>
        <ellipse cx="21" cy="-63" rx="6.2" ry={p.blink?1.1:6.2} fill={NAVY} stroke="none"></ellipse>
        {p.blink?null:<circle cx="7" cy="-65.5" r="2.1" fill={BONE} stroke="none"></circle>}
        {p.blink?null:<circle cx="23" cy="-65.5" r="2.1" fill={BONE} stroke="none"></circle>}
        {p.face==="o"?<circle cx="14" cy="-49" r="3.6" fill="none" strokeWidth="2.4"></circle>:<path d="M9 -50 Q12 -47 15 -50 Q18 -47 21 -50" fill="none" strokeWidth="2.2"></path>}
      </g>;
  return (
  <g transform={"translate("+p.x+" "+p.y+") rotate("+p.lean+") scale("+p.sx+" "+p.sy+")"} stroke={NAVY} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill={BONE}>
    <g transform={"rotate("+p.legA+" -10 -16)"}><path d="M-10 -16 L-11 -5" fill="none"></path><ellipse cx="-12" cy="-3" rx="8" ry="4.5"></ellipse></g>
    <g transform={"rotate("+p.legB+" 10 -16)"}><path d="M10 -16 L11 -5" fill="none"></path><ellipse cx="12" cy="-3" rx="8" ry="4.5"></ellipse></g>
    <ellipse cx="0" cy="-21" rx="21" ry="17"></ellipse>
    <g transform={"translate(0 "+p.bob+")"}>
      <ellipse cx="0" cy="-60" rx="36" ry="31"></ellipse>
      {arms}
      <ellipse cx="-5" cy="-50" rx="4.5" ry="2.6" fill={OCHRE} opacity="0.5" stroke="none"></ellipse>
      <ellipse cx="28" cy="-47" rx="4.5" ry="2.6" fill={OCHRE} opacity="0.5" stroke="none"></ellipse>
      {eyes}
      <g transform={"translate(0 "+(p.hatDy||0)+") rotate("+(p.hatRot||0)+" 1 -83)"}>
        {p.head==="band"?<g>
          <path d="M-34 -74 Q-46 -68 -56 -56 M-33 -69 Q-44 -60 -50 -48" stroke={OCHRE} strokeWidth="3" fill="none"></path>
          <path d="M-33 -82 Q1 -92 35 -78 L34 -67 Q1 -81 -32 -71 Z" fill={OCHRE} strokeWidth="2.5"></path>
          <rect x="-6" y="-84" width="26" height="13" rx="2" fill={BONE} strokeWidth="2.2" transform="rotate(4 7 -77)"></rect>
          <path d="M4 -79 Q9 -82 11 -78 Q13 -74 8 -73 Q4 -73 5 -76 M12 -73 L16 -70" stroke={NAVY} strokeWidth="1.8" fill="none"></path>
        </g>:<g>
          <ellipse cx="1" cy="-83" rx="27" ry="8" fill={OCHRE} strokeWidth="2.5"></ellipse>
          <path d="M-15 -86 Q0 -104 16 -86 Q8 -90 1 -90 Q-7 -90 -15 -86 Z" fill={OCHRE} strokeWidth="2.5"></path>
          <path d="M-15 -86 Q1 -92 16 -86" fill="none" strokeWidth="2"></path>
        </g>}
      </g>
    </g>
  </g>);}

function Piece({chubby}){
  const {T,CUES,authoredTotal}=useComposition();
  const R=[0,1,2].map(i=>{const n=i+1,c=ROUND_CFG[i];
    const P=CUES["Pickup "+n]||6.8+7.4*i+1.5*i;
    const Jc=CUES["Jump "+n]||P+1.6, F=CUES["File "+n]||Jc+1.8, C=CUES["Close "+n]||F+2.2;
    const E=(n<3?CUES["Return "+n]:CUES["Away"])||C+1.8;
    return Object.assign({n,P,J:Jc,F,C,E,launch:Jc+0.35,land:Jc+1.35,swap:F+0.95},c);});
  const ST=CUES["Stamp"]||3.6;
  // x path
  const xk=[[0.05,-90],[1.02,246],[1.25,262],[1.75,276],[2.5,276],[2.9,330],[3.08,330],[ST+0.05,430],[ST+0.55,985],[ST+1.0,985],[ST+1.15,995],[ST+1.3,978],[ST+1.5,978],[ST+2.1,640],[ST+2.45,640],[ST+2.62,655],[ST+2.8,640],[ST+3.15,430],[R[0].P,430]];
  R.forEach(r=>{const s2=r.stand2||r.stand;xk.push([r.launch,430],[r.land,r.stand[0]]);
    if(r.stand2)xk.push([r.F+0.05,r.stand[0]],[r.F+0.45,r.stand2[0]]);
    xk.push([r.C,s2[0]],[r.C+0.45,1305],[r.C+0.95,1332],[r.C+1.14,1228],[r.C+1.32,1330],[r.E,1330]);
    xk.push(r.n<3?[r.E+1.35,430]:[r.E+1.5,1780]);});
  const x=kf(T,xk);
  // y path
  let y=940, air=false;
  if(T<=1.25){y=940;}
  else if(T<=1.75){const p=clamp01((T-1.25)/0.5);y=940-(940-448)*(1-(1-p)*(1-p)*(1-p));air=true;}
  else if(T<=2.5){y=kf(T,[[1.75,448],[2.05,543],[2.2,483],[2.34,521],[2.5,498]]);}
  else if(T<=2.9){const p=clamp01((T-2.5)/0.4);y=498+(940-498)*p*p;air=true;}
  for(const r of R){
    if(T>r.launch&&T<=r.land){const p=clamp01((T-r.launch)/(r.land-r.launch));y=940+(r.stand[1]-940)*Math.pow(p,0.82)-300*Math.sin(Math.PI*Math.pow(p,0.9));air=true;}
    else if(T>r.land&&T<=r.C){y=r.stand[1];
      if(r.stand2){if(T>r.F+0.05&&T<=r.F+0.45){const p=clamp01((T-r.F-0.05)/0.4);y=r.stand[1]+(r.stand2[1]-r.stand[1])*Math.pow(p,0.85)-90*Math.sin(Math.PI*Math.pow(p,0.9));air=true;}else if(T>r.F+0.45)y=r.stand2[1];}
      const j0=r.F+1.7;if(T>j0&&T<j0+0.3)y-=22*Math.sin(Math.PI*(T-j0)/0.3);}
    else if(T>r.C&&T<=r.C+0.45){const s2=r.stand2||r.stand;const p=clamp01((T-r.C)/0.45);y=s2[1]+(940-s2[1])*Math.pow(p,0.88)-120*Math.sin(Math.PI*Math.pow(p,0.85));air=true;}
    else if(T>r.C+1.02&&T<=r.C+1.32){y=940-150*Math.sin(Math.PI*(T-r.C-1.02)/0.3);air=true;}
  }
  // gait
  let dir=1,running=false;
  if((T>0.05&&T<1.15)||(T>3.06&&T<ST+0.6)||(T>ST+1.45&&T<ST+2.12)||(T>ST+2.85&&T<ST+3.18))running=true;
  let naruto=false;
  R.forEach(r=>{if(r.n<3){if(T>r.E&&T<r.E+1.35){running=true;dir=-1;naruto=true;}}else if(T>=r.E&&T<r.E+1.5){running=true;naruto=true;}});
  if(T>0.05&&T<1.15)naruto=true;
  const ph=T*11;
  const legA=running?26*Math.sin(ph):(air?-22:(T>1.75&&T<2.5?9*Math.sin(T*7):0));
  const legB=running?-26*Math.sin(ph):(air?22:(T>1.75&&T<2.5?-9*Math.sin(T*7+1):0));
  const bob=running?-5*Math.abs(Math.sin(ph)):(air?0:1.6*Math.sin(T*2.6));
  const syk=[[1.05,1],[1.22,0.78],[1.32,1.18],[1.52,1.05],[1.72,1.1],[1.85,1],[2.92,1],[3.02,0.72],[3.18,1]];
  syk.push([ST+0.62,1],[ST+0.78,0.8],[ST+0.95,1.1],[ST+1.1,1],[ST+2.14,1.08],[ST+2.34,0.74],[ST+2.54,1]);
  R.forEach(r=>{syk.push([r.P+0.15,1],[r.P+0.35,0.85],[r.P+0.55,1],[r.J+0.05,1],[r.J+0.32,0.74],[r.launch+0.02,1.18],[r.launch+0.3,1.05],[r.land-0.05,1.08],[r.land+0.12,0.76],[r.land+0.32,1]);
    if(r.stand2)syk.push([r.F+0.08,1],[r.F+0.18,0.82],[r.F+0.28,1.12],[r.F+0.5,1]);
    syk.push([r.C+0.72,1],[r.C+0.86,0.86],[r.C+0.95,1.06]);
    syk.push([r.C+1.0,1],[r.C+1.08,0.82],[r.C+1.14,1.12],[r.C+1.24,0.88],[r.C+1.4,1]);});
  const syv=kf(T,syk), sxv=1+(1-syv)*0.85;
  const lk=[[1.28,0],[1.5,-14],[1.72,6],[1.88,0],[2.52,0],[2.7,-8],[2.95,4],[3.1,0]];
  lk.push([ST+0.95,0],[ST+1.2,-10],[ST+2.05,-8],[ST+2.3,6],[ST+2.5,0]);
  R.forEach(r=>{lk.push([r.launch-0.02,0],[r.launch+0.2,-12],[r.land,8],[r.land+0.25,0],[r.C+0.72,0],[r.C+0.86,-9],[r.C+1.0,0],[r.C+1.12,20],[r.C+1.3,-6],[r.C+1.45,0]);});
  let lean=kf(T,lk)+(running?-6*dir:0);
  let arm="run",face="smile",patA=0;
  for(const r of R){
    if(T>=r.P+0.3&&T<r.swap)arm="carry"; else if(T>=r.swap&&T<r.C)arm="pat";
    if((T>r.launch-0.1&&T<r.land+0.1)||(T>r.C+1.0&&T<r.C+1.4))face="o";
    patA+=kf(T,[[r.F+1.0,0],[r.F+1.1,-42],[r.F+1.2,0],[r.F+1.4,-42],[r.F+1.52,0]],MOTION.pop);
  }
  if(T<3.02){if(T>=1.25)arm=(T>1.72&&T<=2.5)?"hang":"carry";face=((T>1.3&&T<1.9)||(T>2.45&&T<3.02))?"o":"smile";}
  if(T>ST+0.78&&T<ST+2.42)arm="carry";
  if(naruto&&arm==="run")arm="naruto";
  if(arm==="naruto")lean-=7*dir;
  if(T>ST+2.42&&T<ST+2.75)face="o";
  if(arm==="carry"&&face==="smile")face="grit";
  // drawer jam
  const qk=[];R.forEach(r=>qk.push([r.C+1.14,0],[r.C+1.22,30],[r.C+1.36,-6],[r.C+1.52,0]));
  const q=kf(T,qk);
  // highlight: hops at each jam
  const hi = T<R[0].C+1.2?"tprm":T<R[1].C+1.2?"dp":T<R[2].C+1.2?"cs":"tprm";
  // sheets
  const wob=(-4+6*Math.sin(T*2.6))*Math.PI/180, sc=0.92;
  const carryM=[sc*Math.cos(wob),sc*Math.sin(wob),-sc*Math.sin(wob)+0.05*Math.sin(T*3.4),sc*Math.cos(wob),x+8,y-252];
  const fly=R.map(r=>{
    const tgt=LIN.concat([r.e,r.f]);let m=r.pile,o=1;
    if(T>=r.swap)o=0;
    else if(T>=(r.stand2?r.F+0.35:r.F+0.15)){const t0=r.stand2?r.F+0.35:r.F+0.15;const fp=MOTION.go(clamp01((T-t0)/(r.stand2?0.6:0.8)));m=mlerp(carryM,tgt,fp).slice();m[5]-=26*Math.sin(Math.PI*fp);}
    else if(T>=r.P+1.05)m=carryM;
    else if(T>=r.P+0.3)m=mlerp(r.pile,carryM,MOTION.go(clamp01((T-r.P-0.3)/0.75)));
    return {m,o,fade:kf(T,[[r.F+0.2,1],[r.F+0.7,0]]),header:r.header,hs:r.hs,n:r.n};});
  const ins=R.map(r=>{
    const o=T<r.swap?0:kf(T,[[r.F+1.2,1],[r.F+1.6,0]]);
    const f=kf(T,[[r.swap,r.f],[r.F+1.08,r.f],[r.F+1.18,r.f+27.1],[r.F+1.42,r.f+27.1],[r.F+1.54,r.f+108.1]]);
    return {o,m:LIN.concat([r.e,f]),n:r.n};});
  const ch=chubby||1, S=1.45*ch;
  const blink=((T%2.7)<0.1)&&face==="smile";
  const hatDy=((1-syv)*14+(air?-3.5:0)+(running?-2.8*Math.sin(ph+0.9):0)).toFixed(1);
  const hatRot=(running?3.5*Math.sin(ph+0.6):(air?-parseFloat(lean)*0.25:0)).toFixed ? (running?3.5*Math.sin(ph+0.6):(air?-lean*0.25:0)).toFixed(1) : "0";
  const gph=Math.floor(T*9)%3;
  const lit=((T>2.05&&T<2.2)||(T>2.34&&T<R[2].C+1.21))&&!R.some(r=>r.n<3&&T>r.C+1.2&&T<r.C+1.31);
  const sey=(T>1.75&&T<=2.5)?(y-205):(T<=1.75?242:kf(T,[[2.5,293],[2.64,204],[2.76,266],[2.9,228],[3.04,248],[3.18,242]]));
  return (
  <svg viewBox="0 0 1600 1000" width="100%" height="100%" style={{display:"block",background:"#C13A56"}} fontFamily="'IBM Plex Mono',monospace">
    <g dangerouslySetInnerHTML={{__html:DEFS}}></g>
    <defs>
      <pattern id="scanp" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1.4" fill="#40101F" opacity="0.055"></rect></pattern>
      <pattern id="ld1" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1.6" cy="2.1" r="1.05" fill="#F1EFE8"></circle><circle cx="4.9" cy="5.6" r="0.95" fill="#FFFFFF"></circle></pattern>
      <pattern id="ld2" width="11" height="11" patternUnits="userSpaceOnUse"><circle cx="2.4" cy="3.2" r="1.1" fill="#F1EFE8"></circle><circle cx="7.8" cy="8.4" r="1.0" fill="#F1EFE8"></circle><circle cx="8.9" cy="2.1" r="0.85" fill="#FFFFFF"></circle></pattern>
      <pattern id="ld3" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="5" r="1.15" fill="#F1EFE8"></circle><circle cx="12" cy="12.5" r="1.0" fill="#F1EFE8"></circle></pattern>
      <pattern id="lw1" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2.6" r="1.0" fill="#FFFFFF"></circle><circle cx="6.4" cy="7" r="0.85" fill="#FFF6E8"></circle></pattern>
      <radialGradient id="vig" cx="50%" cy="46%" r="75%"><stop offset="70%" stopColor="#40101F" stopOpacity="0"></stop><stop offset="100%" stopColor="#40101F" stopOpacity="0.1"></stop></radialGradient>
      <filter id="gr0" x="0%" y="0%" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="3" stitchTiles="stitch"></feTurbulence><feColorMatrix type="matrix" values="0 0 0 0 0.25 0 0 0 0 0.06 0 0 0 0 0.12 0 0 0 0.85 0"></feColorMatrix></filter>
      <filter id="gr1" x="0%" y="0%" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="17" stitchTiles="stitch"></feTurbulence><feColorMatrix type="matrix" values="0 0 0 0 0.25 0 0 0 0 0.06 0 0 0 0 0.12 0 0 0 0.85 0"></feColorMatrix></filter>
      <filter id="gr2" x="0%" y="0%" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="29" stitchTiles="stitch"></feTurbulence><feColorMatrix type="matrix" values="0 0 0 0 0.25 0 0 0 0 0.06 0 0 0 0 0.12 0 0 0 0.85 0"></feColorMatrix></filter>
    </defs>
    <g transform={ISO} fill={BONE} stroke={NAVY} strokeWidth="3.5" strokeLinejoin="round" dangerouslySetInnerHTML={{__html:ISO_A}}></g>
    <g dangerouslySetInnerHTML={{__html:BG_MID}}></g>
    {lit?<g>
      <polygon points="229,216 269,216 485,430 261,430" fill="url(#ld1)" opacity="0.9"></polygon>
      <polygon points="261,430 485,430 697,640 292,640" fill="url(#ld2)" opacity="0.75"></polygon>
      <polygon points="292,640 697,640 925,866 325,866" fill="url(#ld3)" opacity="0.6"></polygon>
      <ellipse cx="625" cy="866" rx="300" ry="46" fill="url(#ld1)" opacity="0.95"></ellipse>
    </g>:null}
    <g stroke={BONE} strokeWidth="3" fill="#C13A56" strokeLinecap="round" strokeLinejoin="round">
      <g transform="translate(24 -50) scale(0.75)">
        <path d="M296 0 L294 96 M308 0 L306 96" strokeWidth="3" fill="none"></path>
        <path d="M296 20 L307 15 M295 42 L306 37 M295 64 L306 59 M294 86 L305 81" strokeWidth="2" fill="none"></path>
        <path d="M285 96 L315 96 L319 118 L281 118 Z"></path>
        <path d="M282 124 L318 124 M283 132 L317 132" strokeWidth="2.5" fill="none"></path>
        <path d="M281 118 L281 138 Q281 144 287 144 L313 144 Q319 144 319 138 L319 118"></path>
        <path d="M322 128 L338 128" strokeWidth="2.5" fill="none"></path>
        {lit?<ellipse cx="300" cy="256" rx="40" ry="52" fill="url(#ld1)" stroke="none" opacity="0.5"></ellipse>:null}
        <path d="M287 144 Q280 176 268 198 Q242 236 242 272 Q242 316 276 338 Q300 352 324 338 Q358 316 358 272 Q358 236 332 198 Q320 176 313 144" fill="none"></path>
        <path d="M283 150 Q238 244 293 364 M317 150 Q362 244 307 364" strokeWidth="2" fill="none" opacity="0.9"></path>
        <ellipse cx="300" cy="264" rx="64" ry="15" fill="none" strokeWidth="2" opacity="0.9"></ellipse>
        <circle cx="300" cy="366" r="8" fill="none" strokeWidth="2.5"></circle>
        <path d="M288 144 L290 164 M312 144 L310 164" strokeWidth="2" fill="none"></path>
        <path d="M290 164 Q300 158 310 164" strokeWidth="2" fill="none"></path>
        <path d="M294 164 L289 204 M306 164 L311 204" strokeWidth="2" fill="none"></path>
        <path d="M287 204 Q291 194 295 204 Q299 214 303 204 Q307 194 311 204" stroke={lit?"#FFF6E8":BONE} opacity={lit?1:0.4} strokeWidth="2.5" fill="none"></path>
      </g>
      {Array.from({length:16},(_,i)=><circle key={i} cx={(279+5*i/15).toFixed(1)} cy={(52+(sey-52)*i/15).toFixed(1)} r="3" strokeWidth="2" fill="none"></circle>)}
      <path d={"M279 "+(sey+6).toFixed(0)+" L290 "+(sey+6).toFixed(0)+" L287 "+(sey+19).toFixed(0)+" L282 "+(sey+19).toFixed(0)+" Z"} strokeWidth="2"></path>
      <circle cx="284" cy={sey+30} r="9" strokeWidth="3" fill="none"></circle>
    </g>
    <g transform={"translate("+(q*0.736).toFixed(1)+" "+(-q*0.425).toFixed(1)+")"}>
      <g transform={ISO} fill={BONE} stroke={NAVY} strokeWidth="3.5" strokeLinejoin="round" dangerouslySetInnerHTML={{__html:D1}}></g>
      <g transform={ISO}>
        {hi!=="tprm"?<TabOverlay id="tprm" color={BONE}></TabOverlay>:null}
        {hi==="cs"?<TabOverlay id="cs" color={OCHRE}></TabOverlay>:null}
      </g>
      {ins.map(s=>s.o>0?<g key={s.n} transform={mstr(s.m)} opacity={s.o}><Sheet n={0} fade={0}></Sheet></g>:null)}
      <g transform={ISO} fill={BONE} stroke={NAVY} strokeWidth="3.5" strokeLinejoin="round" dangerouslySetInnerHTML={{__html:D2}}></g>
      <g transform={ISO}>{hi==="dp"?<TabOverlay id="dp" color={OCHRE}></TabOverlay>:null}</g>
    </g>
    {fly.slice().reverse().map(s=>s.o>0?<g key={s.n} transform={mstr(s.m)} opacity={s.o}><Sheet n={s.n} fade={s.fade} marked={T>ST+2.34}></Sheet></g>:null)}
    {lit?<ellipse cx="625" cy="866" rx="288" ry="58" fill="url(#lw1)" stroke="none" opacity="0.5"></ellipse>:null}
    <Mascot x={Math.round(x)} y={Math.round(y)} sx={(dir*S*sxv).toFixed(3)} sy={(S*syv).toFixed(3)} lean={lean.toFixed(1)} legA={legA.toFixed(1)} legB={legB.toFixed(1)} bob={bob.toFixed(1)} arm={arm} patA={patA.toFixed(1)} face={face} blink={blink} hatDy={hatDy} hatRot={hatRot} head={arm==="naruto"?"band":"hat"}></Mascot>
    {R.map(r=><Puff key={"p"+r.n} T={T} t0={r.land} x={r.stand[0]} y={r.stand[1]+10}></Puff>)}
    {R.map(r=><Puff key={"q"+r.n} T={T} t0={r.C+0.45} x={1305} y={932} big={true}></Puff>)}
    {R.map(r=><JamSpark key={"j"+r.n} T={T} t0={r.C+1.17} x={1268} y={688}></JamSpark>)}
    <Puff T={T} t0={2.94} x={330} y={928} big={true}></Puff>
    {R[2].stand2?<Puff T={T} t0={R[2].F+0.45} x={R[2].stand2[0]} y={R[2].stand2[1]+10}></Puff>:null}
    {R.map(r=><Puff key={"hb"+r.n} T={T} t0={r.E+0.02} x={1310} y={826}></Puff>)}
    {R.filter(r=>r.n<3).map(r=><Puff key={"hc"+r.n} T={T} t0={r.E+1.33} x={452} y={826}></Puff>)}
    <Puff T={T} t0={1.16} x={262} y={826}></Puff>
    {T>=ST+2.8?<g transform="translate(1042 900) scale(0.8) rotate(-4)" stroke={NAVY} strokeWidth="3.5" fill={BONE} strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="50" cy="92" rx="150" ry="22" fill="url(#dth1)" stroke="none"></ellipse>
      <path d="M64.9 -14.5 Q78 -22 87.5 -17.5 M64.9 25.5 Q78 14 87.5 2.5" strokeWidth="2.5" fill="none"></path>
      <path d="M0 -64 L129.9 11 L110.9 22 L-19.1 -53 Z"></path>
      <path d="M129.9 11 L110.9 22 L110.9 86 L129.9 75 Z"></path>
      <path d="M-19.1 11 L110.9 86 L110.9 22 L-19.1 -53 Z"></path>
      <path d="M87.5 -17.5 L110 -30.5 M87.5 2.5 L110 -10.5" strokeWidth="2.5" fill="none"></path>
      <ellipse rx="10" ry="10" transform="matrix(0.866 0.5 0 -1 110 -20.5)" strokeWidth="2"></ellipse>
      <circle cx="123.8" cy="-28.5" r="17"></circle>
      <path d="M112 -33 Q124 -41 136 -32" strokeWidth="2" opacity="0.6" fill="none"></path>
      <ellipse rx="60" ry="24" transform="matrix(0.866 0.5 0 -1 45.9 16.5)" stroke={OCHRE} strokeWidth="2.5" fill="none"></ellipse>
      <text transform="matrix(0.866 0.5 0 1 46 24)" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontWeight="600" fontSize="22" letterSpacing="3" fill={OCHRE} stroke="none" opacity="0.85">FILED</text>
    </g>:null}
    {T<ST+2.8?(()=>{const sG=ST+0.9,sS=ST+2.45;
      let tx=1042,ty=900,rot=0,sc2=0.8;
      if(T>=sG&&T<ST+2.0){tx=x+6;ty=y-176;rot=8*Math.sin(T*7);sc2=0.55;}
      else if(T>=ST+2.0&&T<ST+2.16){const p=clamp01((T-ST-2.0)/0.16);tx=x+6;ty=y-176-18*Math.sin(Math.PI*p);rot=8*Math.sin(T*7)*(1-p);sc2=0.55;}
      else if(T>=ST+2.16&&T<sS){const p=clamp01((T-ST-2.16)/0.2),pe=p*p;tx=x+6+(640-(x+6))*pe;ty=(y-176)+(872-(y-176))*pe;rot=0;sc2=0.55+0.11*pe;}
      else if(T>=sS){const p=clamp01((T-sS)/0.35);tx=640+402*p;ty=872+26*p-150*Math.sin(Math.PI*Math.pow(p,0.9));rot=86*p;sc2=0.65+0.15*p;}
      return (<g transform={"translate("+tx.toFixed(0)+" "+ty.toFixed(0)+") scale("+sc2.toFixed(2)+") rotate("+rot.toFixed(0)+")"} stroke={NAVY} strokeWidth="3.5" fill={BONE} strokeLinecap="round" strokeLinejoin="round">
        {T<sG?<ellipse cx="16" cy="46" rx="110" ry="20" fill="url(#dth1)" stroke="none"></ellipse>:null}
        <g transform="translate(-37 -42)">
          <path d="M0 -22 L129.9 53 L74.5 85 L-55.4 10 Z"></path>
          <path d="M-55.4 10 L74.5 85 L74.5 107 L-55.4 32 Z"></path>
          <path d="M129.9 53 L74.5 85 L74.5 107 L129.9 75 Z"></path>
          <path d="M-55.4 24 L74.5 99 M74.5 99 L129.9 67" strokeWidth="2" opacity="0.6" fill="none"></path>
          <path d="M-14.7 1.5 Q37.25 -12 89.2 61.5" strokeWidth="2.5" fill="none"></path>
          <path d="M30.2 1.5 L30.2 -34.5 M44.2 1.5 L44.2 -34.5" strokeWidth="2.5" fill="none"></path>
          <ellipse cx="37.2" cy="-34.5" rx="7" ry="3.5" strokeWidth="2"></ellipse>
          <circle cx="37.2" cy="-52" r="16"></circle>
          <path d="M24 -56 Q37 -64 50.4 -56" strokeWidth="2" opacity="0.6" fill="none"></path>
        </g>
      </g>);})():null}
    <Puff T={T} t0={ST+2.34} x={640} y={880} big={true}></Puff>
    <Puff T={T} t0={ST+2.79} x={1042} y={902}></Puff>
    
    <g style={{pointerEvents:"none"}}>
      <rect width="1600" height="1000" filter="url(#gr0)" opacity={gph===0?0.09:0}></rect>
      <rect width="1600" height="1000" filter="url(#gr1)" opacity={gph===1?0.09:0}></rect>
      <rect width="1600" height="1000" filter="url(#gr2)" opacity={gph===2?0.09:0}></rect>
      <rect width="1600" height="1000" fill="url(#scanp)"></rect>
      <rect width="1600" height="1000" fill="url(#vig)"></rect>
    </g>
  </svg>);}

function CabinetLoopRoot(){
  return (
  <div style={{width:"100%",height:"100%",minHeight:"480px"}}>
    <CompositionStage
      width={1600}
      height={1000}
      bg="#B53752"
      scenes={OM_SCENES}
      playback={OM_PLAYBACK}
      controls={false}
    >
      <Piece chubby={CHUBBY}></Piece>
    </CompositionStage>
  </div>);}

export { CabinetLoopRoot };
export default CabinetLoopRoot;
