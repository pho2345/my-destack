import React, { useEffect, useContext } from 'react'

import { Editor as CraftEditor, Frame, Element, useEditor, Resolver } from '@craftjs/core'

import Viewport from '../viewport'
import EditorElement from './EditorElement'

import { Container } from '../shared/Cont4ainer'

import { loadTemplate, saveTemplateDebounce } from '../utils/fetch'
import PoweredBy from './PoweredBy'

import { ThemeContext, ThemeProvider } from '../store'

interface FrameProps {
  data: any
  standaloneServer: boolean
}

const DEFAULT_TEMPLATE = {
  ROOT: {
    type: { resolvedName: 'Container' },
    isCanvas: true,
    props: { width: '100%', height: '800px' },
    displayName: 'Container',
    custom: { displayName: 'App' },
  },
}

const FrameEditor: React.FC<FrameProps> = ({ data, standaloneServer }) => {
  const { actions } = useEditor()

  const loadData = async () => {
    if (data) {
      const templateData = data.find(({ name }: any) => name === `${location.pathname}.json`)
      const content = JSON.parse(templateData.content)
      actions.deserialize(content)
    } else {
      const result = await loadTemplate(standaloneServer)
      const content = JSON.parse(result as string)
      actions.deserialize(content.ROOT ? content : DEFAULT_TEMPLATE) // NOTE: also loads the data in the editor
    }

    console.log('data', data)
  }

  useEffect(() => {
    loadData()
  }, [])

  return !data ? (
    // <ThemeProvider standaloneServer={standaloneServer}>
    //   <Viewport>
    //     <Frame>
    //       <Element canvas is={Container} children={[]} custom={{ displayName: 'App' }} />
    //     </Frame>
    //   </Viewport>
    // </ThemeProvider>
    <></>
  ) : (
    <div className="page-container">
      <Frame />
      <PoweredBy />
    </div>
  )
}

interface EditorProps {
  data: any
  standaloneServer: boolean
}

const Editor: React.FC<EditorProps> = ({ data, standaloneServer }) => {
  const { resolver } = useContext(ThemeContext)
  console.log('resole', resolver)

  const onStateChange = (e: any) => {
    saveTemplateDebounce(e, standaloneServer)
  }

  return (
    <CraftEditor
      resolver={resolver as Resolver}
      enabled={!data}
      onRender={({ render }) => <EditorElement render={render} standaloneServer={standaloneServer} />} //
      onNodesChange={onStateChange}
    >
      'aasssssss'
      <FrameEditor data={data} standaloneServer={standaloneServer} />
    </CraftEditor>
  )
}
export default Editor
