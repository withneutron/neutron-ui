# quarks-react-native: Feature Gaps vs quarks-react

> Tracks what was **not** or **could not** be implemented in the RN engine, organized by category.

---

## Hooks (2 of 8 ported)

| Hook | Status | Reason |
|---|---|---|
| `useStyleConditions` | Replaced | RN uses `useConditionMask()` (bitmask) instead of object |
| `useThemeStyle` | N/A | No `<html>` to style; theme set via `configureTheme()` singleton |
| `useColors` | Ported | As `useColorMode()` |
| `useTokens` | Not ported | Tokens resolved at `styled()` time, not runtime. Could add a read-only accessor. |
| `useAnimation` | Not ported | Web CSS animations. RN needs `Animated` / `react-native-reanimated` instead. |
| `useRTL` | Not ported | **Quick win.** Wrap `I18nManager.isRTL`; trivial to add. |
| `useMediaQuery` | N/A | `window.matchMedia` doesn't exist in RN. Breakpoints via `Dimensions`. |
| `useResizeObserver` | N/A | Web DOM API. RN has `onLayout` for equivalent. |
| `useMutationObserver` | N/A | Web DOM API. No equivalent needed in RN. |

---

## Primitives (7 of 14 ported)

| Primitive | Status | Reason |
|---|---|---|
| Box | Ported | `View` wrapper |
| Row | Ported | `View` with `flexDirection: "row"` |
| Column | Ported | `View` with `flexDirection: "column"` |
| Grid | Not ported | RN has no CSS Grid. Flex-based workarounds only. |
| Text | Ported | As `Label` (wraps RN `Text`) |
| Heading | Ported | `Text` with heading tokens |
| SubHeading | Ported | `Text` with subheading tokens |
| Anchor | Not ported | No `<a>` equivalent. Use `Pressable` + `Linking.openURL()`. |
| Image | Ported | As `StyledImage` (wraps RN `Image`) |
| List | Not ported | No `<ul>`. Use `FlatList` or `ScrollView` + items. |
| ListItem | Not ported | No `<li>`. Use styled `View`/`Text`. |
| OList | Not ported | No `<ol>`. Same as List. |
| FlexList | Not ported | Could add as flex `View` wrapper — **quick win**. |
| FlexListItem | Not ported | Could add as styled `View` — **quick win**. |

**Added for RN (not in web):** `StyledPressable`, `StyledScrollView`

---

## styled() Features

| Feature | Status | Reason |
|---|---|---|
| `as` polymorphism | Not ported | RN components aren't interchangeable like HTML elements |
| `styleManager` prop | Not ported | Debug/context-aware class tracking is web-specific |
| `className` prop | N/A | RN uses `style` objects, not class strings |
| `index`/`length` props | Not ported | Used for nth-child; see below |
| `isSemantic` prop | N/A | No semantic HTML distinction in RN |
| Inline `style` warning | Changed | RN allows `style` prop as escape hatch (merged after token styles) |
| Variant support | Ported | Same pattern: `variants` object → cached resolution |
| `css` prop override | Ported | WeakMap-cached per css object reference |

---

## Provider Features

| Feature | Status | Reason |
|---|---|---|
| `defaultColorMode` | Ported | |
| `isDebugMode` | Ported | Sets debug bit in mask |
| System color scheme sync | Ported | `Appearance.addChangeListener` |
| Breakpoint detection | Ported | `Dimensions.addEventListener` |
| RTL detection | Ported (static) | `I18nManager.isRTL` — **does not update at runtime** (requires app restart) |
| Reduced motion detection | Ported | `AccessibilityInfo.isReduceMotionEnabled` |
| `isMobile` flag | Not ported | Always mobile in RN |
| `queryOverrides` (custom breakpoints) | Not ported | Breakpoints hardcoded to quarks `observerConditionsMap`. **Could add.** |
| `themeOverrides` | Ported | Via `configureTheme({ overrides })` |
| `semanticColorOverrides` | Ported | Via `configureTheme({ colors })` |
| `tokenValue` in context | Not ported | Tokens not exposed at runtime; resolved at `styled()` time |

---

## Props System

### Pseudo-classes — NOT PORTED

| Pseudo | Web support | RN status | Reason |
|---|---|---|---|
| `:hover` | 21 props | None | No hover on touch devices (except pointer devices on iPadOS) |
| `:focus-visible` | 20 props | None | RN focus is programmatic, not CSS-based |
| `:active` | 20 props | None | RN uses `Pressable` state callbacks instead |
| `:interact` (alias) | Combined hover+focus | None | |

**Mitigation path:** Expose a `pressableStyle` helper that maps pressed/focused states to different resolver outputs, keyed by interaction state bits appended to the condition mask.

### Nth-child selectors — NOT PORTED

All patterns (`:first`, `:last`, `:even`, `:odd`, `:nth-child(n)`, custom) unsupported.

**Reason:** RN renders lists via `FlatList`/`map()` with index props, not CSS selectors.
**Mitigation path:** Accept `index`/`length` props in styled components and branch at resolve time.

### Custom var props — NOT PORTED

170+ CSS properties that accept arbitrary values via CSS custom properties.

**Reason:** RN has no CSS variables. All values must be concrete at style resolution time.
**Mitigation path:** The `css` prop override + inline `style` prop cover this use case for dynamic values.

### Directional props — PARTIAL

| Feature | Status | Notes |
|---|---|---|
| `float` LTR/RTL swap | N/A | RN has no `float` property |
| Logical prop → RTL-aware | Ported | `marginInlineStart` → `marginStart` (RN handles RTL natively) |

### Static props — PARTIAL

Web has 400+ pre-generated CSS classes for static keyword values (`display: "flex"`, `position: "absolute"`, etc.).

RN doesn't need pre-generated classes — static values pass through directly as style object properties. Only RN-compatible values are meaningful (e.g., `display` only supports `"flex"` and `"none"` in RN).

---

## Scale Support (10 of 17 scales)

### Fully supported

| Scale | Token count | Notes |
|---|---|---|
| color | ~200+ | Full palette generation via `generateThemeColors()` with light/dark |
| space | 18 | Computed from base (default 4) |
| size | 18 | Computed from base (default 4) |
| fontSize | 27 | Computed from base (default 16) |
| fontWeight | 21 | Static + semantic aliases |
| fontFamily | 8 | System fonts (no web font loading) |
| lineHeight | 21 | Computed from size base |
| radius | 21 | Computed from base (default 4) |
| zIndex | 15 | Static |
| typoSpace | 13 | Letter/word spacing |

### Not supported

| Scale | Reason | Mitigation |
|---|---|---|
| animation | No CSS keyframes/animations in RN | Use `Animated` API or `react-native-reanimated` |
| border (combos) | RN border model differs (no shorthand combos, no outline) | Individual border props work; combo aliases don't |
| outline | RN has no outline property | N/A |
| shadow | RN shadow model differs (`shadowColor`/`shadowOffset`/`shadowOpacity`/`shadowRadius` on iOS; `elevation` on Android) | Could build RN-specific shadow scale |
| textDecoration (combos) | RN `textDecorationLine` is limited; no thickness/offset | Basic text decoration works via direct props |
| typo (combos) | Multi-prop combos (font + lineHeight + textTransform) | Use individual tokens instead |
| font (combos) | Multi-prop combos (fontSize + fontFamily + fontWeight) | Use individual tokens instead |
| row/column | No CSS Grid in RN | N/A |

---

## Type System

| Feature | Status | Notes |
|---|---|---|
| Full `CSS` type from quarks | Used as-is | Same descriptor type — but only RN-compatible props resolve |
| RN-specific style types (`ViewStyle`, `TextStyle`) | Used in output | Resolver output typed as `ViewStyle & TextStyle` |
| Variant types | Same | `{ [name: string]: { [value: string]: CSS } }` |
| Per-prop token autocomplete | Not yet | Web has generated types from scales; RN tokens are plain `Record<string, number \| string>` |

---

## Debug Features

| Feature | Status | Notes |
|---|---|---|
| Debug condition bit | Ported | Included in bitmask |
| Debug component rendering | Not ported | Web renders `<Debug>` component (currently returns null anyway) |
| Debug class-to-prop mapping | Not ported | Web tracks which class came from which prop/condition |

---

## Summary: Quick Wins for Future Parity

1. **`useRTL` hook** — trivial wrapper around `I18nManager.isRTL`
2. **`useTokens` hook** — expose frozen theme token maps via `getTheme()`
3. **FlexList / FlexListItem primitives** — styled `View` wrappers
4. **`queryOverrides` in NativeProvider** — pass custom breakpoint thresholds
5. **RN-specific shadow scale** — map `$low`/`$medium`/`$high` → `shadowColor`+`shadowOffset`+`shadowOpacity`+`shadowRadius`+`elevation`
6. **Pressable state integration** — map pressed/focused states to condition mask bits for pseudo-class-like behavior

## Summary: Architectural Gaps (require significant work)

1. **Animation system** — needs `Animated` or `react-native-reanimated` integration
2. **Combo scales** (border, font, typo) — need RN-specific implementations
3. **Per-prop token type generation** — generate union types from scale definitions
4. **Nth-child support** — add index/length-based branching in resolver
5. **Runtime RTL switching** — blocked by `I18nManager` requiring restart
