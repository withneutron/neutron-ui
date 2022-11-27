export type Shared<A extends Record<string, any>, B extends Record<string, any>> = Extract<keyof A, keyof B>
export type NotShared<A extends Record<string, any>, B extends Record<string, any>> = Exclude<keyof A, keyof B>
