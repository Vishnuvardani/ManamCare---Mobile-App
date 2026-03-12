# Logo Setup Instructions

## Add Your Logo

Place your logo image file at:
```
assets/images/logo.png
```

## Logo Requirements

- **Format**: PNG (with transparent background recommended)
- **Size**: 512x512px or higher (will be scaled to 100x100px)
- **Aspect Ratio**: Square (1:1) works best
- **Background**: Transparent or white background

## Quick Steps

1. Save your logo as `logo.png`
2. Copy it to: `ManamCare---Mobile-App/assets/images/logo.png`
3. Restart the app: `npm start`

## Alternative: Use Existing Icon

If you don't have a logo yet, you can temporarily use the existing icon:

1. Copy `icon.png` to `logo.png`:
   ```bash
   cd assets/images
   copy icon.png logo.png
   ```

2. Or rename in the code (edit `app/index.tsx`):
   ```typescript
   source={require('@/assets/images/icon.png')}
   ```

## Customization

To adjust logo size, edit `app/index.tsx`:

```typescript
logoContainer: {
  width: 120,      // Change container size
  height: 120,
},
logo: {
  width: 100,      // Change logo size
  height: 100,
},
```

## Troubleshooting

If you see an error about missing logo.png:
1. Make sure the file is named exactly `logo.png` (lowercase)
2. Place it in `assets/images/` folder
3. Clear cache: `npx expo start -c`
