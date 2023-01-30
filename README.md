# Neutron-UI (WIP)

A highly accessible and easily customizable UI library.

## Installation

To get the sample Next.js app up and running, run the following commands after cloning this repo:

```
yarn
yarn build:lib
yarn dev:next
```
(**NOTE**: `tsc` can take a few minutes to finish running, for each of `quarks` and `quarks-react` libraries)

Then the sample app at [http://localhost:3000](http://localhost:3000).

The source code for this app can be found in the `examples/nextjs-sample/` folder.

## Troubleshooting

If you see this error...
`Failed to replace env in config: ${NPM_AUTH_TOKEN}`

...then make sure you [create an NPM token](https://docs.npmjs.com/creating-and-viewing-access-tokens#creating-granular-access-tokens-on-the-website), and add it to your shell's env variables as `NPM_AUTH_TOKEN` (and refresh your shell's profile).
