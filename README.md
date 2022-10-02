# neutron-ui
A highly accessible and easily customizable UI library.

## CONDITIONS

// We default to desktop-first, because most web apps still neglect responsive early on
DESKTOP === Default

// Switch to tshirt sizing, to keep data-X debug attributes short

```
const conditions = {
  s: { '@media': 'screen and (max-width: 395.9987654321px)' },   // Phone
  m: { '@media': 'screen and (max-width: 659.9987654321px)' },    // Phablet
  l: { '@media': 'screen and (max-width: 899.9987654321px)' },    // Tablet
  xl: { '@media': 'screen and (max-width: 1199.9987654321px)' },   // Laptop

  >s: { '@media': 'screen and (min-width: 395.9987654321px)' },
  >m: { '@media': 'screen and (min-width: 659.9987654321px)' },
  >l: { '@media': 'screen and (min-width: 899.9987654321px)' },
  >xl: { '@media': 'screen and (min-width: 1199.9987654321px)' },

  highContrast: { '@media': '(prefers-contrast: more)' }, // highContrast
  reducedMotion: { '@media': '(prefers-reduced-motion)' }, // reducedMotion
  reducedData: { '@media': '(prefers-reduced-data)' }, // reducedData
  touch: { '@media': '(hover: none)' }, // touch
  pointer: { '@media': '(hover: hover) and (pointer: fine)' }, // pointer
  tv: { '@media': '(hover: hover) and (pointer: coarse)' }, // tv

  !highContrast: !highContrast,
  !reducedMotion: !reducedMotion,
  !reducedData: !reducedData,
  !touch: !touch,
  !pointer: !pointer,
  !tv: !tv,

  light: // Check color mode state (DEFAULT)
  dark: // Check color mode state
}
```

## NOTES

(PTC func === Props-to-classes mapping function)

- Create a `<AutoRTL [off]>` provider, which is on by default, but can be turned off in spots (or vice-versa, if you set the UIProvider `disableAutoRTL` option to true, then wrap other sections in `<AutoRTL>`).
  - Our main PTC func should check on this provider, and auto-split styles into both LTR and RTL
  - Also have an input param in the PTC func to set this value, which would override the provider value, IF passed.
    - That's because the PTC func can be used externally, not just inside our components, since all it does is spit out a string with class names.
    - That also becomes a way to strategically ignore the main provider option, without an `<AutoRTL>` wrapper.

### Complex Custom Values

For properties such as `gridTemplateRows`, there are far too many possible values to pre-build. So instead, we could create **CSS variables** for each of these properties, in each breakpoint, then use [vanilla-extract's `assignInlineVars` API](https://vanilla-extract.style/documentation/dynamic-api/#assigninlinevars) to assign a value to those vars on a per-component basis!

Also see [this Stack Overflow answer](https://stackoverflow.com/questions/17543038/responsive-css-styles-inline-on-the-fly/69753550#69753550)

### Mapping Function

- Create a `getStyle` function, which can receive an object (props) with various styling properties (including shorthads), with a value that is either a string, or a _conditions_ object (e.g., responsive breakpoints) with string values.
- This function spits out a string that is either empty, or contains one or more classes of generated styles that match the props passed in.
- This function is used internally in all our components (especially primitives), but can also be used externally.
  - NOTE: Some primitives would have different possible props (e.g., `<Heading>` or `<Text>`), so we should find a way to handle that, either through separate functions, or an options param.
- Create lists of props that are non-standard.
  - We can loop through these lists, and for each list, remove the props from the source, and compile them into a new object, then feed this new object to the right VE handler (sprinkle).
    - This is the most performant way to do it, as it avoids multiple object-to-array conversions.
  - Lists:
    - Directional props
      - Need to account for a string and for conditional objects.
      - These are handled by removing from source, then splitting into 2 props each: one for LTR, and one for RTL.
        - The RTL sprinkle API should not be exposed by default; it's for internal use only.
    - Complex value props (like `gridTemplateRows`).
      - Need to account for a string and for conditional objects.
- Is there a way we could allow for use of vars? E.g.: `<Box mx={$space.40px}>`, instead of `<Box mx="40px">`.
  - (Tested) this will only work if we either add an OR type with all possible values, or use a different type, like an array of these values.
    - The problem with the first approach is that it would pollute the string suggestions for intellisense; so instead of seeing only options like "20px" and "40px", you'd also see "--space-20px" and "--space-40px", which is kind of annoying, IMO.
    - This syntax is also much more verbose, and since the second part of that still includes the simple string version, I think we should just drop this.
  - **INSTEAD**, we could create a func (maybe `css`?) that let's you create a spreadable object, with property values from those theme vars. E.g.:
```TS
const style = css({
  mx: $space.40px,
  my: $space.20px,
  p: $size.20px,
  bg: $color.neutral2,
})

const MyComponent = () => <Box {...style}>This is styled</Box>
```
  - We still need a simple way to allow for shorthand properties to be set to any string, without polluting the intellisense options; _that_ is probably more of a case for using the array syntax, even because we could also _join_ values entered there. So for instance, you could do:
```TS
const MyComponent = () => <Box border={[$size.2px, "solid", $color.secondary11]}>This has a solid border</Box>
```
    - And that would be joined into a value such as `border: "2px solid #444"`.
    - That also keeps this array API _exclusively_ for shorthand CSS properties, all of which can have multiple parts, so this makes perfect sense.
    - Users could still do something like this, if they wish:
```TS
const MyComponent = () => <Box border={[`${$size.2px} solid ${$color.secondary11}`]}>This has a solid border</Box>
```


## Shorthand Properties

- [Full list](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties#see_also).