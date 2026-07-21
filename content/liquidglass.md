## What it is

Liquid Glass is a small, dependency-free engine that renders **glass the way light actually behaves** — not the usual blur-and-tint "glassmorphism", but real optics. The middle of a panel stays perfectly readable; only the rim refracts, bending the backdrop through the edge — exactly the behaviour that makes a pane of glass feel like a physical material rather than a frosted overlay.

The whole thing is about **9 KB** with zero runtime dependencies.

## The idea: one physics model, everywhere

The hard part of a cross-platform effect is usually maintaining it twice. Liquid Glass keeps a single, platform-agnostic model of how light refracts through a curved edge, and drives both web and native from that same core. Write the optics once; render it anywhere — so a web app and a mobile app show the same material without two diverging implementations.

## How it works

The effect is built from a few honest optical steps rather than a fake blur:

1. **Shape.** A rounded-rectangle field describes the panel and how its edge curves.
2. **Surface.** The edge rises into a bevel while the centre stays flat, so the rim tilts and the middle doesn't.
3. **Refraction.** Light bends as it passes through that tilted rim and travels through the pane — the flat centre bends nothing, so text behind it stays crisp.
4. **Light.** A bright highlight along the rim sells the sense of a real, physical surface.

## The demo

The project ships with an interactive demo that makes the model tangible: a refracting hero, a live playground where every slider maps to a real optical property — bevel width, depth, refraction, blur, saturation, highlight — with presets, and a drag-anywhere lens you can slide over real text and watch only the rim bend the light.

## Why it's interesting

Most "glass" UI is a blur and a white overlay. This is a genuine optical model — small enough to read in an afternoon, honest about its limits, and structured so the same equations power both web and native. It's the signature visual layer of the FusionUI design system, extracted and documented as a standalone engine.
