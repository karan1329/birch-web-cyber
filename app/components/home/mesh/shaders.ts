/**
 * GLSL source for the WebGL2 hero mesh.
 *
 * - `VERT` is shared by the line pass and (in chunk 4) the additive points
 *   pass. It computes the height-field, applies the cursor-driven lift,
 *   and writes two varyings the fragment shader uses (`vFall`, the radial
 *   centre-vs-edge weight; `vCursorWeight`, the smoothstep falloff from
 *   the cursor).
 * - `LINE_FRAG` paints the wireframe in `uInk` modulated by `vFall` so
 *   the edges fade out from centre to corners — same character as the
 *   2D fallback.
 * - `POINT_FRAG` (added in chunk 4) renders the additive neon halos.
 *
 * Coordinate convention:
 *   - `position.xy` is the grid coord in [-0.5, 0.5]²; we ignore z.
 *   - Plane lives on world XZ; height field rises in world Y.
 *   - `uGridW` × `uGridH` scale the plane to world units.
 *
 * Wave coefficients match the 2D fallback (`MeshCanvas2D`) so the surface
 * character is preserved; only the rendering tier changes.
 */

export const VERT = /* glsl */ `
  attribute float aFall;

  uniform float uTime;
  uniform vec3 uMouseWorld;
  uniform float uMouseStrength;
  uniform float uGridW;
  uniform float uGridH;
  uniform float uCursorRadius;

  varying float vFall;
  varying float vCursorWeight;

  void main() {
    vec2 g = position.xy;
    vec2 uv = g + 0.5;

    float wave =
      sin(uv.x * 7.0 + uTime * 1.3) * 26.0 +
      cos(uv.y * 5.0 + uTime * 1.0) * 30.0 +
      sin((uv.x + uv.y) * 4.5 + uTime * 1.5) * 18.0 +
      cos((uv.x - uv.y) * 8.0 - uTime * 0.9) * 12.0;
    float h = wave * aFall;

    vec2 worldXZ = g * vec2(uGridW, uGridH);
    vec2 mouseXZ = uMouseWorld.xz;
    float md = distance(worldXZ, mouseXZ) / uCursorRadius;
    float liftWeight = smoothstep(1.0, 0.0, md);
    h += liftWeight * uMouseStrength * 22.0 * aFall;

    vFall = aFall;
    vCursorWeight = liftWeight * uMouseStrength;

    vec4 worldPos = vec4(worldXZ.x, h, worldXZ.y, 1.0);
    vec4 mvPos = modelViewMatrix * worldPos;
    gl_Position = projectionMatrix * mvPos;
    gl_PointSize = (4.0 + vCursorWeight * 18.0) * (300.0 / max(1.0, -mvPos.z));
  }
`;

export const LINE_FRAG = /* glsl */ `
  precision mediump float;

  uniform vec3 uInk;
  uniform float uLineAlpha;

  varying float vFall;

  void main() {
    float a = vFall * uLineAlpha;
    gl_FragColor = vec4(uInk, a);
  }
`;

/**
 * POINT_FRAG renders the additive cursor halos. Each vertex becomes a
 * soft radial sprite — core + falloff halo — modulated by the vertex
 * shader's `vCursorWeight` (smoothstep falloff from the eased cursor
 * position) and `vFall` (radial centre-vs-edge weight). Drawn with
 * `THREE.AdditiveBlending` so the points sum on top of each other and
 * onto the line pass; the stacked halos read as bloom without an
 * actual bloom pass.
 *
 * Source colour is premultiplied (`uNeon * a`) which is what additive
 * blending expects — the alpha channel still mirrors `a` for
 * future-proofing (e.g. a downstream framebuffer that needs it).
 */
export const POINT_FRAG = /* glsl */ `
  precision mediump float;

  uniform vec3 uNeon;

  varying float vFall;
  varying float vCursorWeight;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c) * 2.0;
    float halo = smoothstep(1.0, 0.0, d);
    float core = smoothstep(0.5, 0.0, d);
    float a = (halo * 0.35 + core * 0.85) * vCursorWeight * vFall;
    gl_FragColor = vec4(uNeon * a, a);
  }
`;
