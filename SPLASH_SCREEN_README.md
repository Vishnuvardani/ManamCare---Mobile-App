# Splash Screen Implementation

## Overview
The splash screen is now configured as the first screen when the app starts.

## File Structure
```
app/
├── index.tsx          # Splash Screen (First screen)
├── login.tsx          # Login Screen
├── (tabs)/            # Home/Main App (after login)
└── _layout.tsx        # Root navigation layout
```

## How It Works

1. **App starts** → Shows `app/index.tsx` (Splash Screen)
2. **After 3 seconds** → Checks authentication:
   - If logged in → Navigate to `/(tabs)` (Home)
   - If not logged in → Navigate to `/login`

## Navigation Flow
```
Splash Screen (3s delay)
    ↓
    ├─→ Login Screen (if not logged in)
    │       ↓
    │   [User logs in]
    │       ↓
    └─→ Home/Tabs (if logged in)
```

## Customization

### Change Authentication Logic
Edit `app/index.tsx` and replace the `isUserLoggedIn()` function:

```typescript
const isUserLoggedIn = () => {
  // Add your authentication check here
  // Example: return AsyncStorage.getItem('userToken') !== null;
  return false;
};
```

### Change Splash Duration
Modify the timeout value in `app/index.tsx`:
```typescript
const timer = setTimeout(() => {
  // Change 3000 to desired milliseconds
}, 3000);
```

### Customize Appearance
Edit styles in `app/index.tsx`:
- `backgroundColor`: Change splash background color
- `logoText`: Modify logo text/size
- `appName`: Update app name display

## Testing

Run the app:
```bash
npm start
```

Then press:
- `a` for Android
- `i` for iOS
- `w` for Web

You should see the splash screen first with animations, then navigate to login after 3 seconds.
