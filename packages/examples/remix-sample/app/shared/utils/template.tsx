import React from "react"
import { Zone } from "~models/template"

interface ConditionalWrapperProps {
  condition: boolean
  wrapper?: React.FC
  children: React.ReactElement
}

const ConditionalWrapper = ({ condition, wrapper, children }: ConditionalWrapperProps) =>
  condition && !!wrapper ? wrapper({ children }) : children

interface ZoneSectionProps {
  children?: React.ReactNode
  zone?: Zone
}
export function ZoneSection({ zone, children }: ZoneSectionProps) {
  return (
    <ConditionalWrapper condition={!!zone?.wrapper} wrapper={zone?.wrapper}>
      <>
        {zone?.before}
        {children}
        {zone?.after}
      </>
    </ConditionalWrapper>
  )
}
