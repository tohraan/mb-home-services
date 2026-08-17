---
name: Clinical Precision Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#44474e'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#465f88'
  primary: '#00091b'
  on-primary: '#ffffff'
  primary-container: '#002046'
  on-primary-container: '#7089b4'
  inverse-primary: '#aec7f6'
  secondary: '#0c6780'
  on-secondary: '#ffffff'
  secondary-container: '#9ae1ff'
  on-secondary-container: '#09657f'
  tertiary: '#070a0b'
  on-tertiary: '#ffffff'
  tertiary-container: '#1e2123'
  on-tertiary-container: '#85888a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aec7f6'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#2e476f'
  secondary-fixed: '#baeaff'
  secondary-fixed-dim: '#89d0ed'
  on-secondary-fixed: '#001f29'
  on-secondary-fixed-variant: '#004d62'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

The design system is engineered for the high-end medical and dental sector, focusing on a narrative of "Clinical Precision & Compassionate Care." The brand personality is authoritative yet approachable, evoking feelings of safety, cleanliness, and cutting-edge expertise.

The visual style is **Corporate Modern** with a strong infusion of **Glassmorphism**. It utilizes generous white space to create a "breathable" clinical environment. The interface is characterized by translucent overlays, subtle background blurs, and a meticulous attention to typographic hierarchy that conveys professionalism and trust. Visual elements are refined, avoiding clutter to maintain a premium, high-tech aesthetic.

## Colors

The palette is rooted in a sophisticated clinical spectrum.
- **Primary (#002046):** A deep, authoritative navy used for headings, primary actions, and brand identification. It provides the "weight" and stability of the system.
- **Secondary (#87CEEB):** A soft sky blue accent used to highlight interactive elements, progress indicators, and supportive visual cues. It softens the austerity of the navy.
- **Tertiary (#F8FAFC):** A clean, cool off-white used for background surfaces and subtle containment.
- **Neutral (#64748B):** A slate grey used for secondary text and icons, ensuring high legibility without the harshness of pure black.

Glassmorphism effects should use white at 70-80% opacity with a 12px to 20px background blur for floating cards and navigation elements.

## Typography

The typography system relies exclusively on **Inter** to maintain a systematic, utilitarian, and clean feel. 

- **Display levels** are used for high-impact hero sections, utilizing tight tracking and bold weights to command attention.
- **Body text** prioritizes readability with a slightly increased line height (1.5x to 1.6x) to ensure the interface feels open and accessible.
- **Labels** utilize medium weights and subtle letter spacing with uppercase transformations for secondary metadata and categorizations.
- **Authoritative Contrast:** Use the primary navy for all headlines to maintain a sense of clinical hierarchy against the lighter background surfaces.

## Layout & Spacing

The design system employs a **Fixed Grid** model for desktop and a **Fluid Grid** for mobile. 
- **Desktop:** A 12-column grid within a 1280px container. Large vertical gaps (120px+) between sections are mandatory to maintain the "premium" clinical feel.
- **Mobile:** A 4-column fluid grid with 16px side margins. 
- **Spacing Rhythm:** Based on an 8px base unit. Component internal padding should favor "generous" values (e.g., 24px or 32px) to prevent the UI from feeling cramped.
- **Content Alignment:** Text and imagery should often use asymmetric layouts (e.g., text spanning 5 columns, image spanning 7) to create a modern, editorial flow.

## Elevation & Depth

This design system uses a combination of **Tonal Layers** and **Glassmorphism** to establish hierarchy.

1.  **Base Layer:** The tertiary off-white background.
2.  **Surface Layer:** White containers with very soft, diffused shadows (0px 10px 30px rgba(0, 32, 70, 0.05)). The shadow should have a slight navy tint to maintain color harmony.
3.  **Glass Layer:** Used for floating navigation, labels over imagery, or "doctor cards." These feature a 70% white fill, a 1px solid white border at 40% opacity, and a 16px background blur.
4.  **Interaction:** On hover, cards should subtly lift using an increased shadow spread and a slight scale-up (1.02x) to provide tactile feedback.

## Shapes

The shape language is **Rounded**, reflecting the "Gentle Care" aspect of the brand narrative.
- **Standard Elements:** Buttons, input fields, and small cards use a 0.5rem (8px) corner radius.
- **Large Containers:** Hero sections and feature cards use a 1rem (16px) or 1.5rem (24px) radius to feel soft and welcoming.
- **Interactive Pill:** Small tags or secondary buttons may use "Pill" shapes (full radius) to differentiate them from primary structural elements.
- **Imagery:** Photography should always feature rounded corners to match the UI components.

## Components

- **Buttons:** 
    - *Primary:* Solid navy background, white text, 8px radius. High padding (16px 32px).
    - *Secondary:* Sky blue background with navy text, or ghost buttons with a thin navy border.
- **Input Fields:** Minimalist design. 1px border (#E2E8F0) that transitions to secondary sky blue on focus. Subtle inner shadow for depth.
- **Cards:** White background, 16px radius, soft navy-tinted shadow. Include generous internal padding (32px).
- **Chips/Tags:** Often styled with the glassmorphism effect when placed over imagery (translucent white with blur).
- **Icons:** Use thin-stroke (2pt) linear icons in navy or sky blue. Avoid filled icons unless used for active states in navigation.
- **Service Tiles:** Large cards with high-quality photography, utilizing glassmorphic overlays for the service titles.