import React, { useEffect, useState } from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'

// @ts-ignore
import cx from 'classnames'

type DialogProps = {
  open: boolean
  setOpen: any
  selectedElement: SVGTextPathElement | SVGElement
}

const Dialog: React.FC<DialogProps> = ({ open, setOpen, selectedElement }) => {
  const [path, setPath] = useState('')

  useEffect(() => {
    if (open) {
      if (selectedElement.tagName === 'path') {
        setPath(selectedElement?.getAttribute('d') ?? '')
      } else if (selectedElement.tagName === 'svg') {
        const pathElement = selectedElement.querySelector('path')
        setPath(pathElement?.getAttribute('d') ?? '')
      } else {
        setPath('')
      }
    } else {
      setPath('')
    }
  }, [open])

  const onSave = () => {
    setOpen(false)

    if (selectedElement.tagName === 'path') {
      selectedElement.setAttribute('d', path)
    } else if (selectedElement.tagName === 'svg') {
      const pathElement = selectedElement.querySelector('path')
      pathElement!.setAttribute('d', path)
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay>
          <DialogPrimitive.Content
            className={cx(
              'fixed shadow bg-white rounded-lg p-4',
              'w-[95vw] max-w-md md:w-full',
              'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
            )}
          >
            <DialogPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Update SVG Path
            </DialogPrimitive.Title>

            <div className="mt-8 mb-4">
              <div>
                <div>
                  <div className="flex justify-center mb-4 flex-col">
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
                      placeholder="Eg. d = 'M150 0 L75 200 L225 200 Z'"
                      defaultValue={path as string}
                      onChange={(e) => setPath(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <DialogPrimitive.Close
                onClick={() => {
                  onSave()
                }}
                className={cx(
                  'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                  'bg-blue-600 text-white hover:bg-blue-700 border border-transparent',
                )}
              >
                Save
              </DialogPrimitive.Close>
            </div>

            <DialogPrimitive.Close
              onClick={() => setOpen(false)}
              className={cx('absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1')}
            >
              <XMarkIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export default Dialog
