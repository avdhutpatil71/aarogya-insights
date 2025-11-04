# Typography System - Rank Method Implementation

## Overview

This website uses a consistent **Rank Method** typographic scale to ensure professional hierarchy and readability across all pages. All typography is built on the Poppins font family with carefully defined sizes, weights, and line heights.

## Typography Scale

### Font Family
- **Primary**: Poppins (imported via Next.js font optimization)
- **Fallback**: Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif

### Size Hierarchy (Desktop)

| Element | Font Size | Weight | Line Height | Usage |
|---------|-----------|--------|-------------|-------|
| Display | 60px | 800 (Extrabold) | 1.2 | Hero/landing page headings |
| H1 | 48px | 700 (Bold) | 1.2 | Main page titles |
| H2 | 36px | 700 (Bold) | 1.375 | Section titles |
| H3 | 28px | 600 (Semibold) | 1.375 | Subsection titles |
| H4 | 20px | 600 (Semibold) | 1.5 | Card/component titles |
| Body Large | 18px | 400 (Regular) | 1.625 | Emphasis text, intro paragraphs |
| Body | 16px | 400 (Regular) | 1.5 | Standard body text |
| Body Small | 14px | 400 (Regular) | 1.5 | Secondary text, captions |
| Caption | 12px | 500 (Medium) | 1.5 | Small labels, metadata |
| Label | 14px | 600 (Semibold) | 1.5 | Uppercase labels |

### Responsive Scaling

#### Tablet (≤ 768px)
- H1: 48px → 40px
- H2: 36px → 32px
- H3: 28px → 24px
- H4: 20px → 18px
- Display: 60px → 48px

#### Mobile (≤ 480px)
- H1: 48px → 36px
- H2: 36px → 28px
- H3: 28px → 20px
- Display: 60px → 48px

## Usage Guidelines

### Semantic HTML Tags

Use semantic HTML elements for best accessibility and SEO:

```jsx
// ✅ Correct - Use semantic tags
<h1>Main Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Card Title</h4>
<p>Body text content goes here.</p>

// ❌ Incorrect - Don't use inline styles for font sizes
<h1 style={{fontSize: '48px'}}>Title</h1>
```

### Class Names for Styling

Use semantic classes to override or extend defaults:

```jsx
// Display heading (hero sections)
<h1 className="display-heading">Hero Title</h1>

// Section headings
<h2 className="h2">Section Title</h2>

// Body text variants
<p className="body-large">Emphasis text</p>
<p className="body-small">Secondary text</p>
<p className="caption">Small caption</p>
<span className="label">LABEL TEXT</span>
```

### Color Combinations

Standard color scheme for typography:

- **Primary Text**: `#243561` (dark blue)
- **Secondary Text**: `#666666` (medium gray)
- **Muted Text**: `#999999` (light gray)
- **Accent Text**: `#5271FF` (brand blue)
- **Accent Dark**: `#144EED` (darker blue)

## Implementation Examples

### Hero Section
```jsx
<h1 className="display-heading text-[#5271FF]">
  Discover Healthcare Insights
</h1>
<p className="body-large text-gray-600">
  Stay informed with expert analysis
</p>
```

### Section Headings
```jsx
<h2 className="h2 text-[#5271FF]">
  Our Recent Articles
</h2>
<p className="body-large text-[#5271FF]">
  Stay informed with our latest healthcare insights
</p>
```

### Card Titles
```jsx
<h4 className="h4 text-gray-900">
  Article Title
</h4>
<p className="body-small text-gray-600">
  Article description or excerpt...
</p>
```

### Labels and Metadata
```jsx
<span className="label text-[#5271FF]">
  HEALTHCARE
</span>
<p className="caption text-gray-500">
  Published 2 days ago
</p>
```

## Best Practices

1. **Maintain Hierarchy**: Always use the correct heading level (h1 → h2 → h3)
2. **Consistent Spacing**: Use Tailwind spacing utilities (mt-4, mb-2, etc.)
3. **Readable Colors**: Ensure sufficient contrast (minimum 4.5:1 for body text)
4. **Responsive Design**: Trust the automatic responsive scaling
5. **Semantic Structure**: Use proper HTML structure for accessibility

## Color Variables

Access typography colors via CSS variables:

```css
--text-primary: #243561;      /* Main text color */
--text-secondary: #666666;    /* Secondary text */
--text-muted: #999999;        /* Muted text */
--primary-color: #5271FF;     /* Brand blue */
--primary-accent: #144EED;    /* Accent blue */
```

## Benefits of Rank Method

1. **Consistency**: Unified typography across all pages
2. **Scalability**: Easy to maintain and update
3. **Professional Look**: Clean, hierarchical design
4. **Accessibility**: Proper heading structure for screen readers
5. **Performance**: Optimized font loading via Next.js
6. **Responsive**: Automatic scaling for all devices

## Testing Checklist

- [ ] All headings use semantic HTML (h1-h4)
- [ ] Font sizes match the typography scale
- [ ] Line heights ensure readability
- [ ] Responsive scaling works on mobile devices
- [ ] Color contrast meets WCAG AA standards
- [ ] Font weights are consistent across similar elements
- [ ] Poppins font loads correctly
- [ ] Text is readable on all screen sizes

## Future Enhancements

- [ ] Dark mode typography support
- [ ] Additional font weight options
- [ ] Custom letter-spacing for headings
- [ ] Font loading optimization metrics
- [ ] A/B testing for readability improvements
