const fs = require('fs');
let content = fs.readFileSync('app/components/how-we-work/StickyPrinciples.tsx', 'utf8');

// Find the style object for the card
// We need to replace the transform, opacity, and transition.
// Let's replace the whole card style block.

content = content.replace(
/transform: `translateY\(\$\{offset \* 24\}px\) scale\(\$\{\s*1 - abs \* 0\.06\s*\}\) rotateX\(\$\{offset \* 4\}deg\)`,\s*opacity: isPast\s*\?\s*0\s*:\s*visible\s*\?\s*Math\.max\(0, 1 - abs \* 0\.45\)\s*:\s*0,/gs,
`transform: \`translateY(\${offset < 0 ? offset * 120 + "%" : offset * 32 + "px"}) scale(\${offset < 0 ? 1 : 1 - offset * 0.05})\`,
                    opacity: offset < -0.8 ? 0 : visible ? 1 : 0,`
);

fs.writeFileSync('app/components/how-we-work/StickyPrinciples.tsx', content);
