# Recipe Prototype — Style Guide & Design Specifications

**Project:** In-Class Demo Week 3: Stage 2 Launch  
**Document:** Style Guide (`styleguide.md`)  
**Design Level:** Mid-Fidelity Wireframe Prototype  

---

## 1. Overview & Design Purpose

This prototype transforms a hand-drawn paper wireframe into an interactive, mid-fidelity web experience. The interface centers on a **Natural Language Form ("Mad Libs" UI)** where users assemble a recipe query by selecting dropdown options directly within a readable sentence.

The visual style is deliberately kept minimal, clean, and distraction-free:
- **No decorative branding** or unnecessary graphics.
- **Wireframe aesthetic** (underlined inline inputs, square placeholders with diagonal "X" crosslines).
- **High-contrast typography** for clear hierarchy and legibility.

---

## 2. Color Palette

The color system uses neutral, restrained tones suitable for a mid-fidelity prototype, with subtle accents for interactive states.

| Token / Variable | Hex Value | Swatch / Role | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-page` | `#f8f9fa` | Off-White | Canvas page background |
| `--bg-card` | `#ffffff` | Pure White | Interface container & recipe card background |
| `--text-main` | `#111827` | Dark Charcoal | Headings, sentence text, active titles, underlines |
| `--text-muted` | `#6b7280` | Mid Slate Gray | Secondary descriptions, labels, metadata |
| `--border-light` | `#e5e7eb` | Light Gray | Container borders, card dividers, tag borders |
| `--border-dark` | `#111827` | Dark Slate | Section underlines & dropdown select bottom borders |
| `--focus-ring` | `#2563eb` | Royal Blue | Accessible keyboard focus outline and hover accents |
| `Placeholder Fill` | `#f3f4f6` | Soft Neutral | Wireframe image box background |
| `Placeholder Cross` | `#9ca3af` | Cool Gray | Diagonal "X" wireframe crosslines |
| `Tag Highlight Bg` | `#e0e7ff` | Subtle Indigo | Background for active filter tag matches |
| `Tag Highlight Text`| `#3730a3` | Deep Indigo | Text color for active filter tag matches |

---

## 3. Typography & Hierarchy

The site uses modern system sans-serif typography for fast rendering, cross-platform consistency, and crisp rendering.

- **Font Family Stack:**  
  `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`

| Element | Size | Weight | Case / Spacing | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Prototype Tag** | `0.75rem` (12px) | Bold (`700`) | Uppercase, `letter-spacing: 0.08em` | Small badge at top of page |
| **Sentence Prompts** | `clamp(1.75rem, 4vw, 2.5rem)` (28–40px) | Extra Bold (`800`) | Uppercase, `letter-spacing: 0.03em`, `line-height: 1.2` | Sentence rows (`HUNGRY FOR`, `SOMETHING`, etc.) |
| **Sentence Selects** | Inherited (`28–40px`) | Extra Bold (`800`) | Uppercase, `border-bottom: 3px solid` | Interactive dropdown text |
| **Section Title** | `1.5rem` (24px) | Extra Bold (`800`) | Uppercase, `letter-spacing: 0.05em` | `RECIPES` heading |
| **Recipe Card Title** | `1.1rem` (17.6px) | Bold (`700`) | Title Case, `line-height: 1.3` | Recipe card heading |
| **Body / Description** | `0.85rem` (13.6px) | Regular (`400`) | Sentence case, `line-height: 1.45` | Recipe description summary |
| **Filter & Meta Tags** | `0.70rem` (11.2px) | Bold (`700`) | Uppercase, `letter-spacing: 0.03em` | Recipe badges (`SPICY`, `30 MIN`, `CHICKEN`) |
| **Card Footer Meta** | `0.75rem` (12px) | Regular (`400`) | Standard | Difficulty & calories readout |

---

## 4. UI Components & Layout Specifications

### 4.1. Natural Language Sentence Form (`.sentence-form`)
- **Structure:** 4 stacked rows directly reflecting the notebook sketch:
  1. `HUNGRY FOR`
  2. `SOMETHING` + Dropdown (`SPICY`, `SAVOURY`, `SWEET`)
  3. `& HAVE` + Dropdown (`15 MIN`, `30 MIN`, `60 MIN`)
  4. `AND` + Dropdown (`CHICKEN`, `BEEF`, `TOFU`)
- **Alignment:** Labels (`.sentence-label`) maintain a minimum width of `220px` (desktop) to keep dropdowns neatly aligned in a vertical column.
- **Select Styling:**
  - `appearance: none;` (native styling removed).
  - Thick `3px solid #111827` bottom underline replicating hand-drawn wireframe sketch underlines.
  - Custom pure CSS chevron arrow (`.select-wrapper::after`).
  - Active `:focus-visible` ring in accessible blue (`#2563eb`).

### 4.2. Selection Feedback Bar (`.selection-feedback`)
- Displays live, plain-language confirmation of the active filter state.
- Connected via `aria-live="polite"` for screen reader accessibility.

### 4.3. Recipe Card (`.recipe-card`)
- Clean white card (`background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px;`).
- Hover state: subtle 2px lift (`transform: translateY(-2px)`) with softened border color (`#cbd5e1`).
- Contains:
  1. **Wireframe Image Placeholder:** Square 1:1 aspect ratio with inline SVG diagonal "X" crosslines (`stroke: #9ca3af; stroke-width: 1.5`).
  2. **Title:** Bold headline.
  3. **Tags:** 3 pills indicating Flavor, Time, and Ingredient. Matching tags receive highlighted background (`#e0e7ff`).
  4. **Description:** 2–3 line filler summary.
  5. **Footer:** Difficulty level and estimated calories.

### 4.4. Layout Grid & Responsiveness
- **Max Width:** `960px` centered with auto margins.
- **Desktop (> 820px):** 3-column card grid (`grid-template-columns: repeat(3, 1fr); gap: 24px;`).
- **Tablet (601px – 820px):** 2-column card grid (`grid-template-columns: repeat(2, 1fr);`).
- **Mobile (≤ 600px):**
  - 1-column card grid (`grid-template-columns: 1fr;`).
  - Sentence form stacks vertically with full-width dropdown inputs.
  - Page padding adjusts to `24px 16px`.

---

## 5. Interaction & Data Architecture

- **Data Source:** Local JSON format stored in [`data/recipes.json`](file:///c:/Users/chris/Documents/GitHub/class-actvities/MMDD226/In-class%20demo%20week%203%20Stage%202%20Launch/data/recipes.json), mirrored at [`recipes.json`](file:///c:/Users/chris/Documents/GitHub/class-actvities/MMDD226/In-class%20demo%20week%203%20Stage%202%20Launch/recipes.json) and [`js/data.js`](file:///c:/Users/chris/Documents/GitHub/class-actvities/MMDD226/In-class%20demo%20week%203%20Stage%202%20Launch/js/data.js).
- **Data Schema:**
  ```json
  {
    "id": 1,
    "title": "Spicy Thai Basil Chicken",
    "flavor": "spicy",
    "time": "30 min",
    "ingredient": "chicken",
    "description": "Sautéed chicken minced with fragrant holy basil...",
    "calories": "420 kcal",
    "difficulty": "Easy"
  }
  ```
- **Filter Logic:**
  - Strict multi-property match: `flavor === selectedFlavor && time === selectedTime && ingredient === selectedIngredient`.
  - Exactly 30 recipes covering all 27 permutations.
  - Immediate DOM re-render on any `<select>` change event.
