// import path from "path";
// import fs from 'fs'

const updateTemplate = (html: string) => {
  localStorage.setItem('template', html)
}

const getPackagePath = () => {
  // const pathCurrent = path.dirname('');
  // console.log('api', pathCurrent);
  // if (pathCurrent?.startsWith('(api)')) {
  //   return path.join(process.cwd() as string, '..', pathCurrent as string)
  // } else {
  //   return pathCurrent as string
  // }
  return __dirname
}

export const savePageAction = (html: string) => {
  updateTemplate(html)
}

export const loadTemplate: () => Promise<string | null> = () => {
  return new Promise<string | null>((resolve) => {
    const template = localStorage.getItem('template')
    resolve(template !== null ? template : null)
  })
}

export const handleTheme: (themeName: string) => Promise<string | null> = (themeName: string) => {
  return new Promise<string | null>(async (resolve) => {
    // resolve(/* Nơi bạn muốn trả về giá trị trong trường hợp thực tế */);
    console.log('getPackagePath()', getPackagePath())
    // const folderPath = path.join(getPackagePath() as string, 'themes', themeName);
    // console.log('folderPath', folderPath);
    // const componentNames = await fs.promises
    //   .readdir(folderPath)
    //   .then((f) => f.filter((c) => c !== 'index.ts' && !c.startsWith('.')))
    // const componentsP = componentNames.map(async (c) => {
    //   const assetPath = path.join(folderPath, c, 'index.html')
    //   const source = await fs.promises.readFile(assetPath, 'utf-8')
    //   return { source, folder: c }
    // })
    // const components = await Promise.all(componentsP)
    // console.log(components)
  })
}
