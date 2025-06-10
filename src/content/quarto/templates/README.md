# Website-Matching Dark Blue Theme for Quarto

This directory contains a custom Quarto theme designed to match the dark blue color palette of the main website.

## Features

- Dark mode with blue accents that match the website's color scheme
- Optimized syntax highlighting for dark backgrounds
- Custom styling for tables, callouts, and other Quarto elements
- Typography that aligns with the main website design
- Properly contrasted colors for readability

## Usage

To use this theme in your Quarto document, add the following to your YAML header:

```yaml
format:
  html:
    theme: templates/website-dark-blue.scss
    minimal: true
    page-layout: article
    toc: true  # optional
```

## Example

See `../dark-blue-theme-example.qmd` for a complete example of using this theme.

## Theme Variables

The dark blue theme defines these core colors:

- Primary color: `#5B6FE9` (blue)
- Accent color: `#8AA9F4` (light blue)
- Background color: `#1A1B26` (dark blue/black)
- Secondary background: `#24283B` (slightly lighter dark blue)
- Text color: `#FFFFFF` (white)
- Code highlight: `#E0AF68` (amber)

## Files in this Directory

- `website-dark-blue.scss` - The main SCSS theme file
- `README.md` - This documentation file

## Customization

If you need to customize the theme further, you can:

1. Copy `website-dark-blue.scss` to your own directory
2. Modify the SCSS variables and rules to fit your needs
3. Reference your custom version in your document YAML frontmatter

## Note on Images

For optimal results with this dark theme:

- Use images with transparent backgrounds when possible
- For photos, consider adding a subtle dark overlay or vignette
- White or very light diagrams may appear too bright - consider inverting colors

## Integration with Main Website

This theme is specifically designed to match the color palette and styling of the main website. The Quarto documents using this theme will have consistent visual appearance with the rest of the site while maintaining Quarto's rich formatting capabilities.

## Compatibility

This theme is designed for Quarto v1.3+ and has been tested with the latest version. It works seamlessly with the website's Quarto integration system that includes automatic rendering and caching.