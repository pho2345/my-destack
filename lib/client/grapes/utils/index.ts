import { standaloneServerPort } from '../../../server/config'

type fetchJSONArgs = {
  method: RequestInit['method']
  data?: Record<string, unknown>
  url: string
}

const elementExists = (el: any) => typeof el !== 'undefined' && el !== null
export { elementExists }

const fetchJSON = async ({ method, url, data }: fetchJSONArgs): Promise<string> => {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'text/plain' },
    body: data ? JSON.stringify(data) : undefined,
  })
  return res.text()
}

export { fetchJSON }

// fixes problem with tailwind (use of slashes in css class names)
const escapeName = (name: string): string => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-')
export { escapeName }

const getSvgHtml = (svg: () => Element): string => {
  if (typeof window === 'undefined') return ''
  const svgEl = svg()
  svgEl.setAttribute('width', '100%')
  svgEl.setAttribute('height', '100%')
  return svgEl.outerHTML
}
export { getSvgHtml }

const getPngHtml = (png: string): string => {
  const img = new Image()
  img.src = png
  img.style.width = '100%'
  img.style.objectFit = 'cover'
  // @ts-ignore
  img.style.aspectRatio = '1.81'
  return img.outerHTML
}
export { getPngHtml }

const isJsonValid = (str: string): boolean => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}
export { isJsonValid }

const getBaseUrl = (standaloneServer: boolean) => {
  return standaloneServer ? `http://localhost:${standaloneServerPort}` : ''
}

const saveTemplate = async (data: any, standaloneServer: boolean) => {
  const baseUrl = getBaseUrl(standaloneServer)

  await fetchJSON({
    method: 'post',
    url: `${baseUrl}/api/builder/handle?type=data&path=${location.pathname}&ext=json`,
    data: data,
  })
}
export { saveTemplate }

const loadTemplate = async (standaloneServer: boolean) => {
  const baseUrl = getBaseUrl(standaloneServer)
  const data = (await fetchJSON({
    method: 'get',
    url: `${baseUrl}/api/builder/handle?type=data&path=${location.pathname}&ext=json`,
  })) as any
  console.log(data)
  return data
}
export { loadTemplate }

const getPngFromId = (theme: string, id: string, standaloneServer: boolean) =>
  getPngHtml(getImageUrl(standaloneServer, `/themes/${theme}/${id}/preview.png`))
export { getPngFromId }

const getThemeUrl = (standaloneServer: boolean, themeFolder: string) => {
  const baseUrl = getBaseUrl(standaloneServer)
  return `${baseUrl}/api/builder/handle?type=theme&name=${themeFolder}`
}
export { getThemeUrl }

const getImageUrl = (standaloneServer: boolean, imageSrc: string) => {
  const baseUrl = getBaseUrl(standaloneServer)
  return `${baseUrl}/api/builder/handle?type=asset&path=${imageSrc}`
}
export { getImageUrl }

const uploadFile = async (file: File, standaloneServer: boolean) => {
  const formData = new FormData()
  formData.append('file-0', file)
  const baseUrl = getBaseUrl(standaloneServer)
  const res = await fetch(`${baseUrl}/api/builder/handle?type=data`, {
    method: 'POST',
    body: formData,
  })
  return await res.json()
}
export { uploadFile }
