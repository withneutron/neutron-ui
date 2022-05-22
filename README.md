# neutron-ui
A highly accessible and easily customizable UI library.

## BREAKPOINTS

PHONE === Default

```
const breakpoints = {
  phone: {}, // Below 396px
  phablet: { '@media': 'screen and (min-width: 396px)' },
  phones: { '@media': 'screen and (max-width: 659.99px)' },
  tablet: { '@media': 'screen and (min-width: 660px)' },
  portables: { '@media': 'screen and (max-width: 899.99px)' },
  laptop: { '@media': 'screen and (min-width: 900px)' },
  desktop: { '@media': 'screen and (min-width: 1200px)' },
}

const directionalBreakpoints = {
  phone: { selector: "[dir='ltr']" }, // Below 396px
  phablet: { '@media': 'screen and (min-width: 396px)', selector: "[dir='ltr']" },
  phones: { '@media': 'screen and (max-width: 659.99px)', selector: "[dir='ltr']" },
  tablet: { '@media': 'screen and (min-width: 660px)', selector: "[dir='ltr']" },
  portables: { '@media': 'screen and (max-width: 899.99px)', selector: "[dir='ltr']" },
  laptop: { '@media': 'screen and (min-width: 900px)', selector: "[dir='ltr']" },
  desktop: { '@media': 'screen and (min-width: 1200px)', selector: "[dir='ltr']" },

  phoneRTL: { selector: "[dir='rtl']" }, // Below 396px
  phabletRTL: { '@media': 'screen and (min-width: 396px)', selector: "[dir='rtl']" },
  phonesRTL: { '@media': 'screen and (max-width: 659.99px)', selector: "[dir='rtl']" },
  tabletRTL: { '@media': 'screen and (min-width: 660px)', selector: "[dir='rtl']" },
  portablesRTL: { '@media': 'screen and (max-width: 899.99px)', selector: "[dir='rtl']" },
  laptopRTL: { '@media': 'screen and (min-width: 900px)', selector: "[dir='rtl']" },
  desktopRTL: { '@media': 'screen and (min-width: 1200px)', selector: "[dir='rtl']" },
}
```

## NOTES

(PTC func === Props-to-classes mapping function)

- Create a `<AutoRTL [off]>` provider, which is on by default, but can be turned off in spots (or vice-versa, if you set the UIProvider `disableAutoRTL` option to true, then wrap other sections in `<AutoRTL>`).
  - Our main PTC func should check on this provider, and auto-split styles into both LTR and RTL
  - Also have an input param in the PTC func to set this value, which would override the provider value, IF passed.
    - That's because the PTC func can be used externally, not just inside our components, since all it does is spit out a string with class names.
    - That also becomes a way to strategically ignore the main provider option, without an `<AutoRTL>` wrapper.