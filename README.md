# milo-web

The landing page for Milo (Next.js 16, Tailwind CSS 4). The app itself lives in `../milo` (Expo).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (the page prerenders as static HTML)
```

- Light mode only. Colours in `app/globals.css` are the light scheme of the app's `constants/palette.js` (`../milo`). Keep them in step.
- Fonts match the app: Bricolage Grotesque (display) and Nunito (body). Board handwriting is Chalkboard SE where
  installed (Apple devices), Kalam elsewhere.
- The "screenshots" are live HTML, not images: `components/scenes/` scripts each board on a loop with `useTimeline`
  (`components/board/timeline.ts`), ported from the app's onboarding boards. Milo is iPad only, so every scene is the tutor screen on a landscape iPad
  (`IPadSession` in `components/board/devices.tsx`: side panel, board, tool rail, dock). They play only while on screen, and show
  the finished board when the visitor prefers reduced motion.
- Links (App Store, privacy, terms, support) and prices live in `lib/site.ts`. Empty links are hidden, and the buttons say
  "Coming soon" until the App Store URL is set.
- Board pictures in `public/images/` are public domain (Wikimedia Commons), like the app's onboarding images.
