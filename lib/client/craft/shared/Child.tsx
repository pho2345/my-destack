import React from 'react'

import { Element } from '@craftjs/core'
import { useNode } from '@craftjs/core'

import { Text } from './Text'
import { Link } from './Link'
import { Button } from './Button'
import { Image } from './Image'
import { Svg } from './Svg'

import { RootProps } from '../../../types'

interface ChildProps {
  root: RootProps
  d?: number[]
}

const Child: React.FC<ChildProps> = ({ root, d = [0] }) => {
  if (!root || root?.childNodes.length === 0) return null

  return (
    <>
      {Array.from(root?.childNodes).map((r, i) => {
        const key = d.concat(i).join('')
        if (r.nodeType === 1) {
          if (r.tagName === 'DIV')
            return (
              <div className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </div>
            )
          else if (r.tagName === 'H1')
            return (
              <h1 className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </h1>
            )
          else if (r.tagName === 'SECTION')
            return (
              <section className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </section>
            )
          else if (r.tagName === 'H2')
            return (
              <h2 className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </h2>
            )
          else if (r.tagName === 'H3')
            return (
              <h3 className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </h3>
            )
          else if (r.tagName === 'H4')
            return (
              <h4 className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </h4>
            )
          else if (r.tagName === 'H5')
            return (
              <h5 className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </h5>
            )
          else if (r.tagName === 'H6')
            return (
              <h6 className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </h6>
            )
          else if (r.tagName === 'P')
            return (
              <p className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </p>
            )
          else if (r.tagName === 'A')
            return <Element is={Link} key={key} r={r} d={d} i={i} id={key} propId={key} />
          else if (r.tagName === 'SPAN')
            return (
              <span className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </span>
            )
          else if (r.tagName === 'STRONG')
            return (
              <strong className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </strong>
            )
          else if (r.tagName === 'EM')
            return (
              <em className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </em>
            )
          else if (r.tagName === 'HEADER')
            return (
              <header className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </header>
            )
          else if (r.tagName === 'MAIN')
            return (
              <main className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </main>
            )
          else if (r.tagName === 'FOOTER')
            return (
              <footer className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </footer>
            )
          else if (r.tagName === 'NAV')
            return (
              <nav className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </nav>
            )
          else if (r.tagName === 'ASIDE')
            return (
              <aside className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </aside>
            )
          else if (r.tagName === 'DETAILS')
            return (
              <details className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </details>
            )
          else if (r.tagName === 'SUMMARY')
            return (
              <summary className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </summary>
            )
          else if (r.tagName === 'BLOCKQUOTE')
            return (
              <blockquote className={r.classNames} key={key} {...r.attrs}>
                <Child root={r} d={d.concat(i)} />
              </blockquote>
            )
          else if (r.tagName === 'INPUT')
            return <input className={r.classNames} key={key} {...r.attrs} />
          else if (r.tagName === 'LABEL')
            return (
              <label className={r.classNames} key={key} {...r.attrs}>
                {r.innerText}
              </label>
            )
          else if (r.tagName === 'TEXTAREA')
            return (
              <textarea
                defaultValue={r.innerText}
                className={r.classNames}
                key={key}
                {...r.attrs}
              />
            )
          else if (r.tagName === 'BUTTON')
            return <Element is={Button} key={key} r={r} d={d} i={i} id={key} propId={key} />
          else if (r.tagName === 'FORM')
            return (
              <form className={r.classNames} key={key} {...r.attrs}>
                <Child root={r} d={d.concat(i)} />
              </form>
            )
          else if (r.tagName === 'SVG')
            // if (root.tagName === 'A') return <Svg key={key} r={r} propId={key} />
            // else return <Element is={Svg} key={key} r={r} id={key} propId={key} />
            return <Element is={Svg} key={key} r={r} id={key} propId={key} />
          else if (r.tagName === 'ADDRESS')
            return (
              <address className={r.classNames} key={key} {...r.attrs}>
                <Text className={''} text={r.innerText} key={key} id={key} />
              </address>
            )
          else if (r.tagName === 'FIGURE')
            return (
              <figure className={r.classNames} key={key} {...r.attrs}>
                <Child root={r} d={d.concat(i)} />
              </figure>
            )
          else if (r.tagName === 'IMG') {
            return (
              <Element
                is={Image}
                key={key}
                d={d}
                i={i}
                classNames={r.classNames}
                attrs={r.attrs}
                id={key}
                propId={key}
              />
            )
          } else if (r.tagName === 'ARTICLE') {
            return (
              <article className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </article>
            )
          } else if (r.tagName === 'DL') {
            return (
              <article className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </article>
            )
          } else if (r.tagName === 'DD') {
            return (
              <article className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </article>
            )
          } else if (r.tagName === 'DT') {
            return (
              <article className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </article>
            )
          } else if (r.tagName === 'SCRIPT') {
            return null
          } else if (r.tagName === 'LINK') {
            return <link className={r.classNames} {...r.attrs} key={key}></link>
          } else if (r.tagName === 'BR') {
            return <br className={r.classNames} key={key} />
          } else if (r.tagName === 'UL') {
            return (
              <ul className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </ul>
            )
          } else if (r.tagName === 'LI') {
            return (
              <li className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </li>
            )
          } else if (r.tagName === 'CITE') {
            return (
              <cite className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </cite>
            )
          } else if (r.tagName === 'HR') {
            return <hr className={r.classNames} key={key}></hr>
          } else if (r.tagName === 'IFRAME') {
            return <iframe className={r.classNames} {...r.attrs} key={key} />
          } else if (r.tagName === 'STYLE') {
            return <style key={key}>{r.innerText}</style>
          } else if (r.tagName === 'TABLE') {
            return (
              <table className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </table>
            )
          } else if (r.tagName === 'THEAD') {
            return (
              <thead className={r.classNames} {...r.attrs} key={key}>
                <Child root={r} d={d.concat(i)} />
              </thead>
            )
          } else if (r.tagName === 'TBODY') {
            return (
              <tbody className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </tbody>
            )
          } else if (r.tagName === 'TR') {
            return (
              <tr className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </tr>
            )
          } else if (r.tagName === 'TD') {
            return (
              <td className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </td>
            )
          } else if (r.tagName === 'TH') {
            return (
              <th className={r.classNames} key={key}>
                <Child root={r} d={d.concat(i)} />
              </th>
            )
          } else if (r.tagName === 'FIGCAPTION') {
            return (
              <figcaption className={r.classNames}>
                <Child root={r} d={d.concat(i)} />
              </figcaption>
            )
          } else {
            return <p key={key}>Unknown container</p>
          }
        } else if (r.nodeType === 3) {
          if (r.innerText.trim() === '') return null
          // className={r.parentNode.classNames}
          if (r.constructor === 'TextNode' || r.constructor === 't')
            return <Text className={r.classNames} text={r.innerText ?? ''} key={key} id={key} />
          else return <p key={key}>Unknown node</p>
        } else {
          return <p key={key}>Unknown type</p>
        }
      })}
    </>
  )
}
export default Child

interface ComponentProps {
  root: RootProps
}

const Component: React.FC<ComponentProps> = ({ root }) => {
  const { connectors, node } = useNode((node) => ({ node }))

  return (
    <div id={node.data.props.id} ref={(ref) => connectors.connect(ref as HTMLDivElement)}>
      <Child root={root} />
    </div>
  )
}
export { Component }
