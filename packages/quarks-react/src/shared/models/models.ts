import { FunctionComponent, JSXElementConstructor } from "react"

export type AnyProps = Record<string, unknown>
export type ComponentType<T = any> = keyof JSX.IntrinsicElements | FunctionComponent<T> | JSXElementConstructor<T>
