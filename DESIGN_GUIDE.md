# SpendWise Design Guide

## Design System

### Color Palette

**Primary Colors**
- Primary: `#1a9b8e` (Teal) - Main brand color, CTAs, accents
- Primary Dark: `#158070` - Hover state, darker backgrounds
- Primary Light: `#40c9ba` - Light accents, backgrounds

**Category Colors**
- Food & Dining: `#f5a623` (Orange)
- Transport: `#4a90e2` (Blue)
- Entertainment: `#9b59b6` (Purple)
- Utilities: `#27ae60` (Green)
- Shopping: `#3498db` (Light Blue)
- Health: `#e74c3c` (Red)
- Education: `#2ecc71` (Green Light)
- Other: `#95a5a6` (Gray)

**Neutrals**
- Background Primary: `#ffffff` (White)
- Background Secondary: `#f8f9fa` (Light Gray)
- Text Primary: `#1a1a1a` (Dark)
- Text Secondary: `#666666` (Gray)
- Border: `#e0e0e0` (Light Gray)

**Semantic**
- Success: `#27ae60` (Green)
- Warning: `#f39c12` (Orange)
- Danger: `#e74c3c` (Red)

### Typography

**Font Family**
- Primary: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, etc.)
- Monospace: Not currently used (reserved for future code displays)

**Font Sizes**
- h1: 32px (700 weight)
- h2: 24px (600 weight)
- h3: 18px (600 weight)
- Body: 16px (400 weight)
- Small: 14px (400 weight)
- Extra Small: 12px (400 weight)

**Line Heights**
- Body: 1.6 (24px)
- Headings: 1.2

### Spacing System

Based on 8px grid:
- xs: 4px
- sm: 8px
- md: 16px (base)
- lg: 24px
- xl: 32px

### Border Radius

- sm: 4px
- md: 8px (inputs, buttons)
- lg: 12px (cards)
- xl: 16px (large components)

### Shadows

- Card: `0 2px 4px rgba(0, 0, 0, 0.05)`
- Card Hover: `0 4px 12px rgba(0, 0, 0, 0.08)`
- Button Hover: `0 4px 8px rgba(0, 0, 0, 0.1)`

## Component Library

### Summary Cards
- Display key metrics (Total Spent, Total Income, Savings Goal)
- Left border accent (4px) in category color
- Amount in large bold (32px)
- Optional change percentage with icon
- Hover effect: slight shadow enhancement

```jsx
<SummaryCard 
  title="Total Spent"
  amount="$1,550.25"
  change={12.5}
  color="teal"
/>
```

### Spending Chart
- 6-month line chart using Recharts
- Teal line color with circle dots
- Grid lines for reference
- Interactive tooltip on hover
- Responsive height (300px desktop, 250px mobile)

### Risk Score Card
- Circular progress indicator
- Score 0-100 in center
- Color coding: green (low), orange (medium), red (high)
- SVG-based for smooth animations

```jsx
<RiskScoreCard 
  riskScore={45}
  riskLevel="medium"
/>
```

### Transaction List
- Table layout with merchant, category, amount columns
- Merchant avatar (48px) with category emoji
- Category badge with background color
- Row hover effect with border and background change
- Mobile: Collapses to 2 columns

### Category Breakdown
- List of categories with horizontal progress bars
- Category name, percentage, and amount
- Icon for each category
- Hover: Slight background change

### Add Expense Form
- Input fields with light border and teal focus state
- Form grid: 2 columns on desktop, 1 on mobile
- Textarea for optional description
- Primary button with hover state
- Submit disabled state during loading

## Layout Patterns

### Grid Layout
```
Desktop (1400px+):
┌─────────────────────────────────────────┐
│          Header (sticky)                 │
├─────────────────────────────────────────┤
│ Dashboard Title              Add Transaction Button │
├─────────────────────────────────────────┤
│ Card 1  Card 2  Card 3  (Summary Cards) │
├─────────────────┬───────────────────────┤
│   Main Chart    │  Trends Sidebar       │
│                 │                       │
├─────────────────┤ Budget Progress       │
│ Category List   │                       │
├─────────────────┴───────────────────────┤
│        Recent Transactions              │
└─────────────────────────────────────────┘

Tablet (768px - 1024px):
┌─────────────────────────────────────────┐
│          Header (sticky)                 │
├─────────────────────────────────────────┤
│ Dashboard Title       Add Transaction    │
├─────────────────────────────────────────┤
│ Card 1  Card 2  Card 3 (Stacked)       │
├─────────────────────────────────────────┤
│        Main Chart (Full Width)          │
├──────────────┬──────────────────────────┤
│ Category     │  Budget Progress         │
├──────────────┴──────────────────────────┤
│    Recent Transactions                  │
└─────────────────────────────────────────┘

Mobile (< 768px):
┌─────────────────────────────────────────┐
│     Header (sticky)                     │
├─────────────────────────────────────────┤
│ Dashboard
│ Add Transaction (Full Width)            │
├─────────────────────────────────────────┤
│ Card 1
├─────────────────────────────────────────┤
│ Card 2
├─────────────────────────────────────────┤
│ Card 3
├─────────────────────────────────────────┤
│ Main Chart (Full Width)
├─────────────────────────────────────────┤
│ Category List (Full Width)
├─────────────────────────────────────────┤
│ Budget Progress (Full Width)
├─────────────────────────────────────────┤
│ Recent Transactions (Full Width)
└─────────────────────────────────────────┘
```

## Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: 1024px - 1400px
- Large: > 1400px

### Key Changes by Breakpoint

**Mobile (< 768px)**
- Single column layouts
- Smaller font sizes (-2px)
- Reduced padding
- Full-width buttons
- Hamburger menu
- Table becomes card layout
- Sidebar moves below main content

**Tablet (768px - 1024px)**
- 2-column grid layouts
- Dashboard header stacks on smaller screens
- Chart height reduced
- Some components stack vertically

**Desktop (1024px+)**
- 3+ column layouts
- Full-featured header
- Sidebar visible
- Maximum container width (1400px)

## Interactive States

### Buttons
- **Default**: `background: #1a9b8e, color: white`
- **Hover**: `transform: translateY(-2px), box-shadow: 0 4px 12px`
- **Active**: `background: #158070`
- **Disabled**: `opacity: 0.6, cursor: not-allowed`

### Form Inputs
- **Default**: `border: 1px solid #e0e0e0`
- **Focus**: `border: 1px solid #1a9b8e, box-shadow: 0 0 0 3px rgba(26,155,142,0.1)`
- **Error**: `border: 1px solid #e74c3c`
- **Disabled**: `background: #f8f9fa, cursor: not-allowed`

### Cards
- **Default**: `box-shadow: 0 2px 4px rgba(0,0,0,0.05)`
- **Hover**: `box-shadow: 0 4px 12px rgba(0,0,0,0.08)`
- **Active**: `border: 2px solid #1a9b8e`

## Animation & Transitions

- All transitions: `0.3s ease`
- Hover effects: `0.3s ease`
- Page load: Fade in `0.3s ease-in`
- Form submission: Disable state change

## Accessibility

### Color Contrast
- Primary text on white: 8.5:1 ✅
- Secondary text on white: 4.5:1 ✅
- Success/danger colors: 4.5:1+ ✅

### Focus States
- Clear focus indicators on inputs
- Keyboard navigation support
- Tab order: logical flow

### Semantic HTML
- Proper heading hierarchy (h1 > h2 > h3)
- Form labels for inputs
- Alt text for images (future)
- ARIA labels where needed

## Image & Icon Guidelines

### Icons
- Size: 16px (small), 20px (medium), 24px (large)
- Color: Match text color or category color
- Style: Emoji for categories (for simplicity)
- Future: SVG icon set for consistency

### Images
- Avatar: 32px (header), 48px (lists)
- Border radius: 50% for avatars
- Placeholder: Light gray background

## Design Tokens (CSS Variables)

All colors, spacing, and sizing are defined as CSS variables in `index.css`:

```css
:root {
  --primary: #1a9b8e;
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
  --spacing-md: 16px;
  --radius-lg: 12px;
  /* ... more tokens ... */
}
```

This allows for easy theme switching and maintenance.

## Future Enhancements

- [ ] Dark mode support
- [ ] Additional color themes
- [ ] Animations library (Framer Motion)
- [ ] Component Storybook
- [ ] Icon system (SVG sprites)
- [ ] Typography scale expansion
- [ ] Micro-interactions
- [ ] Haptic feedback (mobile)

## Design Consistency Checklist

When adding new components:
- [ ] Uses design tokens for colors/spacing
- [ ] Consistent border radius
- [ ] Proper hover/active states
- [ ] Mobile responsive
- [ ] Accessible (WCAG AA minimum)
- [ ] Matches existing typography
- [ ] Follows shadow guidelines
- [ ] Uses CSS Grid or Flexbox (no floats)
- [ ] No hardcoded colors (use CSS variables)
- [ ] Component documented
