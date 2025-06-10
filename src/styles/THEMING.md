# Modular Theming System

## Overview

This document describes the theming system for our application. The system is designed to be modular, consistent, and reusable while reducing redundant code.

## Directory Structure

```
src/styles/
├── theme/                  # Core theme system
│   ├── colors.css          # Base color definitions
│   ├── semantic.css        # Semantic variables that map to colors
│   ├── layout.css          # Layout and spacing variables
│   ├── typography.css      # Typography variables
│   └── index.css           # Main theme import file
├── utilities.css           # Utility classes
├── components.css          # Base component styles
├── global.css              # Global styles that import everything
├── variables.css           # Legacy variables (for backward compatibility)
└── components/             # Component-specific styles
```

## Usage

### Importing Styles

To use the theming system, simply import the global styles in your main CSS file:

```css
/* src/index.css */
@import "./styles/global.css";
```

### Using Theme Variables

Theme variables are categorized by function and follow a consistent naming pattern:

```css
/* Example of using theme variables */
.my-component {
  background-color: var(--color-background-primary);
  color: var(--text-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-sm);
  transition: var(--transition-standard);
}
```

### Using Utility Classes

Utility classes provide quick styling without writing custom CSS:

```html
<div class="flex items-center justify-between p-md mb-lg rounded-md bg-primary">
  <h2 class="text-xl font-bold text-primary">Title</h2>
  <button class="btn btn-primary">Click Me</button>
</div>
```

## Theme Structure

### Color System

Colors are defined in two layers:
1. Base colors (`colors.css`) - Raw color values
2. Semantic colors (`semantic.css`) - Context-specific variables that use base colors

### Spacing and Layout

A consistent spacing scale based on 8px:
- --spacing-xs: 4px
- --spacing-sm: 8px
- --spacing-md: 16px
- --spacing-lg: 24px
- --spacing-xl: 32px

### Typography

Typography follows a consistent scale with semantic names for font sizes, weights, etc.

## Component Base Styles

Common UI components have base styles in `components.css`:
- Buttons
- Cards
- Form elements
- Navigation
- Tags

## Customizing Themes

To customize the theme, modify the variables in the theme files:
- For color changes: update `theme/colors.css`
- For spacing/layout changes: update `theme/layout.css`
- For typography changes: update `theme/typography.css`

## Best Practices

1. Use semantic variables instead of direct color values
2. Use utility classes for common patterns
3. Keep component styles focused on component-specific styling
4. Use the existing scale for spacing (--spacing-*)
5. Maintain the theme structure when adding new variables