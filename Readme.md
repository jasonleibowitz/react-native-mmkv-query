# React Native Expo Template with MMKV & React Query

## Template Contains

1. Expo app via `create-expo-app`
2. TypeScript (Enable absolute imports to src via `@/*`)
3. Expo Router v3
4. Prettier & ESLint
5. Development Build
6. Install React Native Gesture Handler
7. Install support for Icons via @expo/vector-icons
8. Configure [Env Variable](https://docs.expo.dev/guides/environment-variables/)
9. Add Supabase Client. Don't forget to [set policies](https://supabase.com/docs/guides/auth/row-level-security) for the DB
10. Add Supabase Auth

- https://dev.to/sruhleder/creating-user-profiles-on-sign-up-in-supabase-5037
  - https://github.com/supabase/supabase/tree/master/examples/user-management/expo-user-management
  - https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native

## Still to Explore

- [ ] [Expo Development Builds locally](https://docs.expo.dev/guides/local-app-development/), instead of via EAS Build
- [ ] [Preload Fonts](https://docs.expo.dev/archive/classic-updates/preloading-and-caching-assets/#pre-loading-and-caching-assets), specifically vector-icons
- [ ] Authentication via [Expo Auth](https://docs.expo.dev/guides/authentication/) or [Clerk](https://clerk.com/solutions/react-native-expo)
- [ ] Publish this repo as an [Expo Template](https://www.reactnativeschool.com/how-to-create-an-expo-template-for-react-native-development)

## Library to Decide Between

### Styling

1. [Tamagui](https://tamagui.dev/) - full UI library for React Native. Styling is similar to Tailwind, but you add styles as props directly to the component.
2. [NativeWind](https://www.nativewind.dev/) - Much simpler Tailwind-type styling option for React Native. Pass styles via the `className` prop on your components after putting them through the HOC `styles` method.
3. Expo Router
4. Expo Constants
5. React Native Gesture Handler
