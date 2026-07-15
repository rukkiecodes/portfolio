## What it is

Liquid Glass is a small, dependency-free engine that renders **glass the way light actually behaves** — not the usual blur-and-tint "glassmorphism", but real optics. A rounded-rectangle signed distance field shapes the bezel, the gradient of that field gives the surface normal, and Snell's law bends the backdrop through the slab. The middle of the panel stays perfectly readable; only the rim refracts — exactly the behaviour that makes iOS 26's "liquid glass" feel like a physical material.

The whole thing is about **9&nbsp;KB gzipped** with zero runtime dependencies.

## The idea: one physics model, two backends

The hard part of a cross-platform effect is usually maintaining it twice. Liquid Glass keeps a single, platform-agnostic physics core and ships it to two very different renderers whose function names match one-to-one:

- **Web** — the CPU rasterises the field into an RGBA displacement map, which drives an SVG `<feDisplacementMap>` applied through `backdrop-filter`. Chromium refracts the live backdrop; Safari and Firefox fall back to a frosted blur while still painting the rim highlight.
- **Native** — the identical maths ships to the GPU as an SKSL runtime shader for `@shopify/react-native-skia`, evaluated per pixel, with chromatic aberration splitting R/G/B at the rim.

Write the optics once; render it anywhere.

## How it works — four steps, per pixel

1. **Signed distance field.** A rounded-box SDF gives the distance to the nearest edge. Distance drives the bezel height; the SDF gradient is the direction the surface tilts.
2. **Surface normal.** Inside the bezel band the height rises along a lens (quarter-circle) or smoothstep profile. The height gradient reconstructs the surface normal — steep at the rim, flat in the middle.
3. **Snell refraction.** A downward view ray refracts at that normal by the index of refraction and travels through the slab's thickness. The flat plateau bends nothing, so the centre stays crisp.
4. **Displace & light.** Where the bent ray lands is the pixel offset — the backdrop shows through, shifted — and a Blinn–Phong term adds the bright rim highlight that sells the glass.

## The demo

The project ships with an interactive demo that makes the model tangible: a refracting hero, a live **playground** where every slider maps to a real term in the physics (bezel width, depth, index of refraction, blur, saturation, specular) with presets like *iOS 26*, *Water*, and *Thick*, a drag-anywhere lens over real text, and a live view of the displacement map the engine generates. Drag a glass panel across the colour field behind it and watch only the rim bend the light.

## Why it's interesting

Most "glass" UI is a blur and a white overlay. This is a genuine optical model — SDF geometry, reconstructed surface normals, and Snell's law — small enough to read in an afternoon, honest about browser limits, and structured so the same equations power both a web filter and a GPU shader. It's the signature visual layer of the FusionUI design system, extracted and documented as a standalone engine.
