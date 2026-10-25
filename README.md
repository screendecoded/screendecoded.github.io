# Screen Decoded

**A TV buying guide in plain language: https://screendecoded.github.io**

QLED, QNED, Mini LED, QD-OLED, Micro RGB… Screen Decoded explains what the labels on the box actually mean, so everyday buyers can compare TVs with confidence. It is not a technical reference.

## What's on the site

- **Display technologies**: CRT to MicroLED, how LCD layers work, and the two OLED families
- **Backlights & panels**: local dimming, Mini LED, contrast, VA vs IPS, glossy vs matte
- **Labels decoded**: a searchable table of marketing names and what they mean
- **HDR & gaming** and **Smart TV platforms**
- **Viewing distance calculator**: the ideal seat for any screen size, with top and perspective views
- **Buying checklist**: five questions to ask about every TV on your shortlist

## Privacy

No cookies, no analytics, no tracking, and no requests to third-party servers; even the fonts are served from the site. Checklist ticks and unit choices are only saved in the visitor's browser if they switch on "Remember on this device". See the [privacy notice](https://screendecoded.github.io/privacy).

## Development

Built with React, TypeScript and Vite. You need [Node.js](https://nodejs.org) 24.

```
npm install      # once, to download the tools
npm run dev      # local preview at http://localhost:5173, updates as you save
npm run build    # type-check and build the finished site into dist/
npm run lint     # check the code for common mistakes
npm run preview  # serve the built site locally
```

Every push to `master` is linted, built and published to GitHub Pages automatically by [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

For how the code is organised and how to make common changes, read [documentation.md](documentation.md). It is written for beginner programmers.
