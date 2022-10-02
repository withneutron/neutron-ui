import { FunctionComponent, JSXElementConstructor } from "react"

export type ComponentType<T> = keyof JSX.IntrinsicElements | FunctionComponent<T> | JSXElementConstructor<T>
