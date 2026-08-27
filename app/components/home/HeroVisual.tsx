"use client";

/**
 * Hero visual · The Cabinet.
 *
 * A real line drawing, ported from the `Hero Image F` artwork in Karan's
 * Claude Design project. It replaces the earlier dithered canvas, which
 * could not survive having its lighting removed: that piece rendered to one
 * bit, so form existed only where the raking light created value
 * differences. Strip the light and every face crossed the threshold into
 * solid beige and the object disappeared. There were no outlines underneath
 * to fall back on.
 *
 * This is the opposite construction — strokes first. The form is carried by
 * the line work, so there is no lighting effect, no dither, no black bars,
 * and nothing washing over the artwork. It also scales cleanly, because it
 * is vector rather than a pixel buffer.
 *
 * Colour is driven by three CSS variables set on the wrapper, so the same
 * drawing can sit on the cranberry hero panel or on paper without editing
 * a single path:
 *   --ink    the line colour
 *   --ground the fill behind the lines (should match the panel)
 *   --hi     the one highlight (the open drawer's tab and the empty slot)
 */
export function HeroVisual() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--bl-accent-deep)",
        // Paper lines on the deep cranberry ground — the same language as
        // the cabinet film on /start, so the two pages draw the same world.
        ["--ink" as string]: "#F1EEE7",
        ["--ground" as string]: "var(--bl-accent-deep)",
        ["--hi" as string]: "#F6C7B0",
        padding: "clamp(16px, 3vw, 44px)",
      }}
    >
      <svg viewBox="0 0 1600 1000" style={{ width: "100%", height: "100%", display: "block" }} fontFamily="var(--font-mono)">
  <defs>
  <pattern id="dth1" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.1" fill="var(--ink)" opacity="0.3"></circle></pattern>
  <pattern id="dth2" width="11" height="11" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1.4" fill="var(--ink)" opacity="0.22"></circle></pattern>
</defs>
  <g transform="translate(1087 136) scale(0.85)" fill="var(--ground)" stroke="var(--ink)" strokeWidth="3.5" strokeLinejoin="round">
    <path d="M-8.7 1.0L826.2 483.0L826.2 141.0L-8.7 -341.0Z" fill="none" strokeDasharray="16 12" strokeWidth="3"></path>
    <path d="M-8.7 -389.0L826.2 93.0L826.2 -165.0L-8.7 -647.0Z"></path>
    <path d="M261.5 -338.0L556.0 -168.0L556.0 -216.0L261.5 -386.0Z"></path>
    <path d="M275.4 -340.0L542.1 -186.0L542.1 -214.0L275.4 -368.0Z"></path>
    <path d="M-8.7 293.0L826.2 775.0L826.2 531.0L-8.7 49.0Z"></path>
    <path d="M261.5 351.0L556.0 521.0L556.0 473.0L261.5 303.0Z"></path>
    <path d="M275.4 349.0L542.1 503.0L542.1 475.0L275.4 321.0Z"></path>
    <path d="M-450.3 540.0L401.8 1032.0L194.0 1152.0L-658.2 660.0Z" fill="url(#dth2)" stroke="none"></path>
  </g>
  <path d="M60 958 L1560 958" stroke="var(--ink)" strokeWidth="3" fill="none"></path>
  <ellipse cx="625" cy="866" rx="300" ry="74" fill="none" stroke="var(--hi)" strokeWidth="3" strokeDasharray="14 10"></ellipse>
  <ellipse cx="645" cy="878" rx="270" ry="46" fill="url(#dth1)" stroke="none"></ellipse>
  <g transform="translate(668 848) rotate(-11)">
  <rect x="-190" y="-115" width="380" height="230" fill="var(--ground)" stroke="var(--ink)" strokeWidth="3"></rect>
  
  <path d="M-165 -48 L120 -48 M-165 -22 L155 -22 M-165 4 L95 4 M-165 30 L130 30 M-165 56 L40 56" stroke="var(--ink)" strokeWidth="2" opacity="0.38" fill="none"></path>
  
</g>
  <g transform="translate(432 892) rotate(10)">
  <rect x="-190" y="-115" width="380" height="230" fill="var(--ground)" stroke="var(--ink)" strokeWidth="3"></rect>
  <text x="-165" y="-78" fontFamily="var(--font-mono)" fontWeight="600" fontSize="19" letterSpacing="1" fill="var(--ink)">THIRD-PARTY RISK ASSESSMENT</text>
  <path d="M-165 -48 L120 -48 M-165 -22 L155 -22 M-165 4 L95 4 M-165 30 L130 30 M-165 56 L40 56" stroke="var(--ink)" strokeWidth="2" opacity="0.38" fill="none"></path>
  
</g>
  <g transform="translate(658 812) rotate(-4)">
  <rect x="-190" y="-115" width="380" height="230" fill="var(--ground)" stroke="var(--ink)" strokeWidth="3"></rect>
  <text x="-165" y="-78" fontFamily="var(--font-mono)" fontWeight="600" fontSize="19" letterSpacing="1" fill="var(--ink)">VENDOR SECURITY QUESTIONNAIRE</text>
  <path d="M-165 -48 L120 -48 M-165 -22 L155 -22 M-165 4 L95 4 M-165 30 L130 30 M-165 56 L40 56" stroke="var(--ink)" strokeWidth="2" opacity="0.38" fill="none"></path>
  <g transform="translate(95 62) rotate(-9)">
    <ellipse rx="82" ry="27" fill="none" stroke="var(--hi)" strokeWidth="3" strokeDasharray="10 7"></ellipse>
    <text y="6" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="600" fontSize="17" letterSpacing="1.5" fill="var(--hi)">BIRCHLOGIC</text>
  </g>
</g>
  <g transform="translate(1087 136) scale(0.85)" fill="var(--ground)" stroke="var(--ink)" strokeWidth="3.5" strokeLinejoin="round">
    <path d="M0.0 -240.0L817.5 232.0L798.5 243.0L-19.1 -229.0Z"></path>
    <path d="M-19.1 11.0L798.5 483.0L798.5 243.0L-19.1 -229.0Z"></path>
    <path d="M817.5 472.0L798.5 483.0L798.5 243.0L817.5 232.0Z"></path>
    <path d="M-19.1 -229.0L0.0 -218.0L-556.0 103.0L-575.0 92.0Z"></path>
    <path d="M0.0 22.0L-556.0 343.0L-556.0 103.0L0.0 -218.0Z"></path>
    <path d="M0.0 22.0L779.4 472.0L223.4 793.0L-556.0 343.0Z"></path>
    <path d="M27.7 -196.0L741.3 216.0L734.4 220.0L20.8 -192.0Z"></path>
    <path d="M741.3 456.0L734.4 460.0L734.4 220.0L741.3 216.0Z"></path>
    <path d="M20.8 48.0L734.4 460.0L734.4 220.0L20.8 -192.0Z"></path>
    <path d="M3.5 -182.0L263.3 -32.0L256.3 -28.0L-3.5 -178.0Z"></path>
    <path d="M533.5 124.0L717.1 230.0L710.1 234.0L526.5 128.0Z"></path>
    <path d="M717.1 470.0L710.1 474.0L710.1 234.0L717.1 230.0Z"></path>
    <path d="M-3.5 62.0L710.1 474.0L710.1 234.0L526.5 128.0L526.5 52.0L256.3 -104.0L256.3 -28.0L-3.5 -178.0Z"></path>
    <path d="M263.3 -108.0L533.5 48.0L526.5 52.0L256.3 -104.0Z"></path>
    <path d="M533.5 124.0L526.5 128.0L526.5 52.0L533.5 48.0Z"></path>
    <text transform="matrix(0.866 0.5 0 1 391.4 20.0)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="26" letterSpacing="1" fill="var(--ink)" stroke="none">CLOUD SECURITY</text>
    <path d="M-20.8 -168.0L692.8 244.0L685.9 248.0L-27.7 -164.0Z"></path>
    <path d="M692.8 484.0L685.9 488.0L685.9 248.0L692.8 244.0Z"></path>
    <path d="M-27.7 76.0L685.9 488.0L685.9 248.0L-27.7 -164.0Z"></path>
    <path d="M-45.0 -154.0L13.9 -120.0L6.9 -116.0L-52.0 -150.0Z"></path>
    <path d="M230.4 5.0L668.6 258.0L661.6 262.0L223.4 9.0Z"></path>
    <path d="M668.6 498.0L661.6 502.0L661.6 262.0L668.6 258.0Z"></path>
    <path d="M-52.0 90.0L661.6 502.0L661.6 262.0L223.4 9.0L223.4 -67.0L6.9 -192.0L6.9 -116.0L-52.0 -150.0Z"></path>
    <path d="M13.9 -196.0L230.4 -71.0L223.4 -67.0L6.9 -192.0Z"></path>
    <path d="M230.4 5.0L223.4 9.0L223.4 -67.0L230.4 -71.0Z"></path>
    <text transform="matrix(0.866 0.5 0 1 115.2 -101.5)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="22" letterSpacing="1" fill="var(--ink)" stroke="none">VULNERABILITY</text>
    <text transform="matrix(0.866 0.5 0 1 115.2 -73.5)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="22" letterSpacing="1" fill="var(--ink)" stroke="none">MANAGEMENT</text>
    <path d="M-69.3 -140.0L644.3 272.0L637.4 276.0L-76.2 -136.0Z"></path>
    <path d="M644.3 512.0L637.4 516.0L637.4 276.0L644.3 272.0Z"></path>
    <path d="M-76.2 104.0L637.4 516.0L637.4 276.0L-76.2 -136.0Z"></path>
    <path d="M-93.5 -126.0L482.4 206.5L475.4 210.5L-100.5 -122.0Z"></path>
    <path d="M620.1 286.0L620.1 286.0L613.1 290.0L613.1 290.0Z"></path>
    <path d="M620.1 526.0L613.1 530.0L613.1 290.0L620.1 286.0Z"></path>
    <path d="M-100.5 118.0L613.1 530.0L613.1 290.0L613.1 290.0L613.1 214.0L475.4 134.5L475.4 210.5L-100.5 -122.0Z"></path>
    <path d="M482.4 130.5L620.1 210.0L613.1 214.0L475.4 134.5Z"></path>
    <path d="M620.1 286.0L613.1 290.0L613.1 214.0L620.1 210.0Z"></path>
    <text transform="matrix(0.866 0.5 0 1 544.3 220.3)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="26" letterSpacing="1" fill="var(--ink)" stroke="none">DEVOPS</text>
    <path d="M-117.8 -112.0L595.8 300.0L588.9 304.0L-124.7 -108.0Z"></path>
    <path d="M595.8 540.0L588.9 544.0L588.9 304.0L595.8 300.0Z"></path>
    <path d="M-124.7 132.0L588.9 544.0L588.9 304.0L-124.7 -108.0Z"></path>
    <path d="M-142.0 -98.0L-136.8 -95.0L-143.8 -91.0L-149.0 -94.0Z"></path>
    <path d="M51.1 13.5L571.6 314.0L564.6 318.0L44.2 17.5Z"></path>
    <path d="M571.6 554.0L564.6 558.0L564.6 318.0L571.6 314.0Z"></path>
    <path d="M-149.0 146.0L564.6 558.0L564.6 318.0L44.2 17.5L44.2 -58.5L-143.8 -167.0L-143.8 -91.0L-149.0 -94.0Z"></path>
    <path d="M-136.8 -171.0L51.1 -62.5L44.2 -58.5L-143.8 -167.0Z"></path>
    <path d="M51.1 13.5L44.2 17.5L44.2 -58.5L51.1 -62.5Z"></path>
    <text transform="matrix(0.866 0.5 0 1 -49.8 -84.8)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="22" letterSpacing="1" fill="var(--ink)" stroke="none">APPLICATION</text>
    <text transform="matrix(0.866 0.5 0 1 -49.8 -56.8)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="22" letterSpacing="1" fill="var(--ink)" stroke="none">SECURITY</text>
    <path d="M-166.3 -84.0L547.3 328.0L540.4 332.0L-173.2 -80.0Z"></path>
    <path d="M547.3 568.0L540.4 572.0L540.4 332.0L547.3 328.0Z"></path>
    <path d="M-173.2 160.0L540.4 572.0L540.4 332.0L-173.2 -80.0Z"></path>
    <path d="M-190.5 -70.0L383.6 261.5L376.7 265.5L-197.5 -66.0Z"></path>
    <path d="M471.1 312.0L523.1 342.0L516.2 346.0L464.2 316.0Z"></path>
    <path d="M523.1 582.0L516.2 586.0L516.2 346.0L523.1 342.0Z"></path>
    <path d="M-197.5 174.0L516.2 586.0L516.2 346.0L464.2 316.0L464.2 240.0L376.7 189.5L376.7 265.5L-197.5 -66.0Z"></path>
    <path d="M383.6 185.5L471.1 236.0L464.2 240.0L376.7 189.5Z"></path>
    <path d="M471.1 312.0L464.2 316.0L464.2 240.0L471.1 236.0Z"></path>
    <text transform="matrix(0.866 0.5 0 1 420.5 260.8)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="26" letterSpacing="1" fill="var(--ink)" stroke="none">GRC</text>
    <path d="M-214.8 -56.0L498.8 356.0L491.9 360.0L-221.7 -52.0Z"></path>
    <path d="M498.8 596.0L491.9 600.0L491.9 360.0L498.8 356.0Z"></path>
    <path d="M-221.7 188.0L491.9 600.0L491.9 360.0L-221.7 -52.0Z"></path>
    <path d="M-239.0 -42.0L-226.9 -35.0L-233.8 -31.0L-246.0 -38.0Z"></path>
    <path d="M-81.4 49.0L474.6 370.0L467.7 374.0L-88.3 53.0Z"></path>
    <path d="M474.6 610.0L467.7 614.0L467.7 374.0L474.6 370.0Z"></path>
    <path d="M-246.0 202.0L467.7 614.0L467.7 374.0L-88.3 53.0L-88.3 -23.0L-233.8 -107.0L-233.8 -31.0L-246.0 -38.0Z"></path>
    <path d="M-226.9 -111.0L-81.4 -27.0L-88.3 -23.0L-233.8 -107.0Z"></path>
    <path d="M-81.4 49.0L-88.3 53.0L-88.3 -23.0L-81.4 -27.0Z"></path>
    <text transform="matrix(0.866 0.5 0 1 -161.1 -37.0)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="22" letterSpacing="1" fill="var(--ink)" stroke="none">INCIDENT</text>
    <text transform="matrix(0.866 0.5 0 1 -161.1 -9.0)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="22" letterSpacing="1" fill="var(--ink)" stroke="none">RESPONSE</text>
    <path d="M-263.3 -28.0L450.3 384.0L443.4 388.0L-270.2 -24.0Z"></path>
    <path d="M450.3 624.0L443.4 628.0L443.4 388.0L450.3 384.0Z"></path>
    <path d="M-270.2 216.0L443.4 628.0L443.4 388.0L-270.2 -24.0Z"></path>
    <path d="M-287.5 -14.0L152.4 240.0L145.5 244.0L-294.4 -10.0Z"></path>
    <path d="M426.1 398.0L426.1 398.0L419.2 402.0L419.2 402.0Z"></path>
    <path d="M426.1 638.0L419.2 642.0L419.2 402.0L426.1 398.0Z"></path>
    <path d="M-294.4 230.0L419.2 642.0L419.2 402.0L419.2 402.0L419.2 326.0L145.5 168.0L145.5 244.0L-294.4 -10.0Z"></path>
    <path d="M152.4 164.0L426.1 322.0L419.2 326.0L145.5 168.0Z"></path>
    <path d="M426.1 398.0L419.2 402.0L419.2 326.0L426.1 322.0Z"></path>
    <text transform="matrix(0.866 0.5 0 1 282.3 275.0)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="22" letterSpacing="1" fill="var(--ink)" stroke="none">IDENTITY &amp; ACCESS</text>
    <text transform="matrix(0.866 0.5 0 1 282.3 303.0)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="22" letterSpacing="1" fill="var(--ink)" stroke="none">MANAGEMENT</text>
    <path d="M-311.8 0.0L401.8 412.0L394.9 416.0L-318.7 4.0Z"></path>
    <path d="M401.8 652.0L394.9 656.0L394.9 416.0L401.8 412.0Z"></path>
    <path d="M-318.7 244.0L394.9 656.0L394.9 416.0L-318.7 4.0Z"></path>
    <path d="M-93.5 96.0L53.7 181.0L46.8 185.0L-100.5 100.0Z" fill="var(--hi)"></path>
    <path d="M-100.5 176.0L46.8 261.0L46.8 185.0L-100.5 100.0Z" fill="var(--hi)"></path>
    <path d="M53.7 257.0L46.8 261.0L46.8 185.0L53.7 181.0Z" fill="var(--hi)"></path>
    <text transform="matrix(0.866 0.5 0 1 -26.8 190.5)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="600" fontSize="26" letterSpacing="2" fill="var(--ink)" stroke="none">TPRM</text>
    <path d="M74.5 302.0L291.0 427.0L301.4 318.0L84.9 193.0Z" strokeWidth="3"></path>
    <path d="M98.7 233.0L258.1 325.0" strokeWidth="2" opacity="0.4" fill="none"></path>
    <path d="M100.5 256.0L213.0 321.0" strokeWidth="2" opacity="0.4" fill="none"></path>
    <path d="M-391.4 46.0L322.2 458.0L315.2 462.0L-398.4 50.0Z"></path>
    <path d="M322.2 698.0L315.2 702.0L315.2 462.0L322.2 458.0Z"></path>
    <path d="M-398.4 290.0L315.2 702.0L315.2 462.0L-398.4 50.0Z"></path>
    <path d="M-415.7 60.0L43.3 325.0L36.4 329.0L-422.6 64.0Z"></path>
    <path d="M217.4 425.5L297.9 472.0L291.0 476.0L210.4 429.5Z"></path>
    <path d="M297.9 712.0L291.0 716.0L291.0 476.0L297.9 472.0Z"></path>
    <path d="M-422.6 304.0L291.0 716.0L291.0 476.0L210.4 429.5L210.4 353.5L36.4 253.0L36.4 329.0L-422.6 64.0Z"></path>
    <path d="M43.3 249.0L217.4 349.5L210.4 353.5L36.4 253.0Z"></path>
    <path d="M217.4 425.5L210.4 429.5L210.4 353.5L217.4 349.5Z"></path>
    <text transform="matrix(0.866 0.5 0 1 123.4 331.3)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="22" letterSpacing="1" fill="var(--ink)" stroke="none">DATA</text>
    <text transform="matrix(0.866 0.5 0 1 123.4 359.3)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="22" letterSpacing="1" fill="var(--ink)" stroke="none">PROTECTION</text>
    <path d="M-439.9 74.0L273.7 486.0L266.7 490.0L-446.9 78.0Z"></path>
    <path d="M273.7 726.0L266.7 730.0L266.7 490.0L273.7 486.0Z"></path>
    <path d="M-446.9 318.0L266.7 730.0L266.7 490.0L-446.9 78.0Z"></path>
    <path d="M-464.2 88.0L-346.4 156.0L-353.3 160.0L-471.1 92.0Z"></path>
    <path d="M-42.4 331.5L249.4 500.0L242.5 504.0L-49.4 335.5Z"></path>
    <path d="M249.4 740.0L242.5 744.0L242.5 504.0L249.4 500.0Z"></path>
    <path d="M-471.1 332.0L242.5 744.0L242.5 504.0L-49.4 335.5L-49.4 259.5L-353.3 84.0L-353.3 160.0L-471.1 92.0Z"></path>
    <path d="M-346.4 80.0L-42.4 255.5L-49.4 259.5L-353.3 84.0Z"></path>
    <path d="M-42.4 331.5L-49.4 335.5L-49.4 259.5L-42.4 255.5Z"></path>
    <text transform="matrix(0.866 0.5 0 1 -201.4 217.8)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="500" fontSize="26" letterSpacing="1" fill="var(--ink)" stroke="none">SECURITY REVIEWS</text>
    <path d="M-488.4 102.0L225.2 514.0L218.2 518.0L-495.4 106.0Z"></path>
    <path d="M225.2 754.0L218.2 758.0L218.2 518.0L225.2 514.0Z"></path>
    <path d="M-495.4 346.0L218.2 758.0L218.2 518.0L-495.4 106.0Z"></path>
    <path d="M-512.7 116.0L200.9 528.0L194.0 532.0L-519.6 120.0Z"></path>
    <path d="M200.9 768.0L194.0 772.0L194.0 532.0L200.9 528.0Z"></path>
    <path d="M-519.6 360.0L194.0 772.0L194.0 532.0L-519.6 120.0Z"></path>
    <path d="M779.4 232.0L798.5 243.0L242.5 564.0L223.4 553.0Z"></path>
    <path d="M798.5 483.0L242.5 804.0L242.5 564.0L798.5 243.0Z"></path>
    <path d="M-601.0 37.0L268.5 539.0L239.0 556.0L-630.5 54.0Z"></path>
    <path d="M-630.5 334.0L239.0 836.0L239.0 556.0L-630.5 54.0Z"></path>
    <path d="M268.5 819.0L239.0 836.0L239.0 556.0L268.5 539.0Z"></path>
    <path d="M-386.2 300.0L-5.2 520.0L-27.7 533.0L-408.8 313.0Z"></path>
    <path d="M-408.8 363.0L-27.7 583.0L-27.7 533.0L-408.8 313.0Z"></path>
    <path d="M-5.2 570.0L-27.7 583.0L-27.7 533.0L-5.2 520.0Z"></path>
    <path d="M-391.4 363.0L-45.0 563.0L-45.0 533.0L-391.4 333.0Z"></path>
    <text transform="matrix(0.866 0.5 0 1 -218.2 454.0)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="600" fontSize="17" letterSpacing="1" fill="var(--ink)" stroke="none">FRACTIONAL SECURITY OFFICE</text>
  </g>
  <g transform="translate(36 455) scale(0.95)" fill="var(--ground)" stroke="var(--ink)" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
  <ellipse cx="150" cy="510" rx="95" ry="20" fill="url(#dth1)" stroke="none"></ellipse>
  <ellipse cx="150" cy="498" rx="95" ry="24"></ellipse>
  <ellipse cx="150" cy="486" rx="95" ry="24"></ellipse>
  <path d="M138 470 L162 470 L158 484 L142 484 Z"></path>
  <circle cx="150" cy="462" r="9"></circle>
  <path d="M146 458 L222 320 M154 466 L230 328" strokeWidth="3" fill="none"></path>
  <path d="M160 440 L172 448 L170 432 L182 440 L180 424 L192 432 L190 416 L202 424 L200 408 L212 416" strokeWidth="2" fill="none"></path>
  <circle cx="228" cy="320" r="10"></circle>
  <circle cx="228" cy="320" r="3.5" fill="var(--ink)" stroke="none"></circle>
  <path d="M232 314 L330 258 M226 306 L324 250" strokeWidth="3" fill="none"></path>
  <path d="M244 296 L254 306 L256 290 L266 300 L268 284 L278 294 L280 278 L290 288" strokeWidth="2" fill="none"></path>
  <circle cx="334" cy="252" r="9"></circle>
  <circle cx="334" cy="252" r="3" fill="var(--ink)" stroke="none"></circle>
  <g transform="rotate(-34 334 252)">
    <path d="M334 252 L334 268" strokeWidth="3" fill="none"></path>
    <ellipse cx="334" cy="272" rx="15" ry="7"></ellipse>
    <path d="M319 272 L300 336 L368 336 L349 272 Z"></path>
    <ellipse cx="334" cy="336" rx="34" ry="13"></ellipse>
    <ellipse cx="334" cy="336" rx="26" ry="9" fill="var(--ink)" strokeWidth="2.5"></ellipse>
  </g>
</g>
<path d="M370 735 L345 895 M400 750 L425 885 M430 730 L520 860" stroke="var(--hi)" strokeWidth="2.5" strokeDasharray="2 9" fill="none"></path>
  <g transform="translate(1315 670) scale(0.75)" fill="var(--ground)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
  <ellipse cx="190" cy="372" rx="88" ry="16" fill="url(#dth1)" stroke="none"></ellipse>
  <path d="M158 96 Q158 74 190 74 Q222 74 222 96 L222 148 L158 148 Z"></path>
  <path d="M158 148 L222 148 L214 176 L166 176 Z"></path>
  <path d="M182 176 L198 176 L198 260 L182 260 Z"></path>
  <path d="M136 260 L244 260 L258 300 L122 300 Z"></path>
  <path d="M122 300 L258 300 L258 316 L122 316 Z"></path>
  <path d="M134 316 L246 316 L246 352 Q246 366 232 366 L148 366 Q134 366 134 352 Z"></path>
  <path d="M134 340 L246 340" strokeWidth="2.5" fill="none"></path>
  <text x="190" y="331" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="600" fontSize="15" letterSpacing="1" fill="var(--ink)" stroke="none">BIRCHLOGIC</text>
</g>
</svg>
    </div>
  );
}
