   Act as a Senior Frontend Engineer and Expert UI Designer.
   Your task is to code a complete Landing Page on the first attempt.
   - Landing Page Theme: <INSERT THEME>
   - Sections to add: <INSERT SECTIONS>

   Generate the final code immediately following these definitions:

   ## Style

   - **Name:** Helios Design System (HashiCorp)
   - **Type:** Technical Enterprise
   - **Keywords:** Systemic, reliable, data-dense, technical, accessible, open-source, engineering-focused
   - **Era:** 2020s Technical SaaS
   - **Light/Dark:** ✓ Full

   ## Color Palette

   - **Primary:** Action Blue #1060ff, Foreground Strong #0c0c0e, Surface Primary #ffffff
   - **Secondary:** Action Hover #0c56e9, Success Green #008a22, Critical Red #e52228, Neutral Faint #fafafa

   ## Visual Effects

   Small border-radius (5-6px), layered elevation (soft shadows for interactivity), precise grid layouts, high contrast ratios (WCAG AA), subtle hover transitions

   ## AI Visual Direction

   Create a highly structured and technical enterprise UI inspired by HashiCorp Helios. Use a clean white surface with high-contrast dark text. Incorporate a primary blue (#1060ff) for actions. Components should have small rounded corners (5-6px) and very subtle shadows. Focus on data density, clear hierarchy, and technical precision. Use system fonts (SF Pro, Segoe UI).

   ## CSS Technical

   ```css
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; --token-color-action: #1060ff; --token-radius-md: 6px; --token-border-primary: rgba(101, 106, 118, 0.2); box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
   ```

   ## Design System Variables

   ```css
   --hds-color-action: #1060ff; --hds-color-fg-primary: #3b3d45; --hds-color-bg-primary: #ffffff; --hds-radius-sm: 5px; --hds-radius-md: 6px; --hds-shadow-mid: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
   ```

   ## Implementation Checklist

   - ☐ Action Blue #1060ff, ☐ Border-radius 5-6px, ☐ System font stack, ☐ Data-dense layout spacing, ☐ High contrast accessibility (WCAG AA)

   ## Execution Rules

   1. Strictly follow the defined visual style.
   2. Use high-quality inline SVG icons (Heroicons or Lucide style) — NEVER use emojis as icons.
   3. Add `cursor-pointer` and smooth `hover` states (transition-all) on all interactive elements.
   4. Required Page Structure:
      - Navbar (Logo + Links + CTA)
      - Hero Section (Impactful Headline + Subtitle + 2 buttons + 3D/Abstract visual element via CSS)
      - Features (3 cards with icons)
      - Testimonials (3 cards)
      - Pricing (3 tiers, highlight the middle one)
      - Final CTA
      - Full Footer with social links, privacy policy, terms of use, contact and SEO links.
   5. All text content must be in English.
   6. The visual must be CLEARLY distinct — do not create a "default Bootstrap" design. Force the use of the provided design system variables.
   7. Use `<style>` tags in the head for custom classes (especially for complex backdrop-filter effects and animations) that Tailwind CDN doesn't cover.
   8. Full Responsiveness: Layout must adapt perfectly to Mobile, Tablet and Desktop (vertical stack on mobile).
   9. Include basic SEO, Viewport and Open Graph meta tags in `<head>`.
   10. Footer must contain: Copyright 2026, Secondary navigation links and Social media icons.
   11. Make the creative decisions needed to deliver the complete, functional result now.
