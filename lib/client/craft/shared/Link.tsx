import React from 'react'

import { useNode, useEditor } from '@craftjs/core'

import Child from './Child'

const handleClick = (props: any) => {
  if (props?.newTab) {
    window.open(props.link, '_blank')?.focus()
  } else {
    location.href = props.link
  }
}

interface LinkProps {
  r: any
  d: number[]
  i: number
  propId: string
}
interface LinkInterface extends React.FC<LinkProps> {
  craft: object
}

const Link: LinkInterface = ({ r, d, i, propId }) => {
  const { node } = useNode((node) => ({ node }))
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }))
  const { connectors } = useNode((node) => ({ node }))

  const { ['class']: foo, ...attrsR } = r.attrs

  const onClick = (e: any) => {
    e.preventDefault()
    if (!enabled) handleClick(node.data.props[propId])
  }

  return (
    <a
      ref={(ref) => connectors.connect(ref as HTMLElement)}
      {...attrsR}
      href={node.data.props[propId]?.link}
      className={r.classNames}
      onClick={onClick}
    >
      <Child root={r} d={d.concat(i)} />
    </a>
  )
}
export { Link }

Link.craft = {
  displayName: 'Link',
  props: {},
  rules: {
    canDrag: () => true,
  },
  related: {},
}
