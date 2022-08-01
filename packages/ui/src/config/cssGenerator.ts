import { CharHash } from "./utils"

const varHash = new CharHash()
const classHash = new CharHash()
const keyframeHash = new CharHash()

/** Static values that we create a value for, with all CSS props */
const globalStaticValues = ["unset"]

/** Used for mapping certain values we treat as aliases, to values we create classes for */
const globalStaticValueAliases = {
  inherit: "unset",
  initial: "unset",
}

/*
Loop through `sourcePropsList`
For each prop:
  if mappedProps[prop]
    //
  else
    if scaledProps[prop]
      // 
    if staticProps[prop]
      // 
    if customVarProps[prop]
      // 
*/
