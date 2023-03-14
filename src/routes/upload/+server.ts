import { storageKey } from "$lib/config";
import type { ShadowBatchUploadResponse, ShadowFile, ShdwDrive } from "@shadow-drive/sdk";
import { json, error } from "@sveltejs/kit";



/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
  const data = await request.formData()

  const drive : ShdwDrive = (locals as any).drive

  if (!drive) throw error(500, 'Drive not initialized')
  if (!data.has('address')) throw error(400, 'address is required')
  if (Array.from(data.keys()).length < 2) throw error(400, 'No files uploaded')

  const files : ShadowFile[] = []
  const address = data.get('address')

  try {
    for (const [name, value] of data.entries()) {
      if (name === 'address') continue;
  
      files.push({
        name: `${address}_${name}`,
        file: Buffer.from(await (value as Blob).arrayBuffer())
      })
      
    }
  } catch (e) {
    console.log(e)
    throw error(400, 'Invalid files')
  }

  
  let res : ShadowBatchUploadResponse[] = [];

  try {
    console.log('Uploading files to Shadow Drive')
    console.log("info:", drive.userInfo)
    console.log(await drive.getStorageAccount(storageKey))
    res = await drive.uploadMultipleFiles(storageKey, files)
  } catch (e) {
    console.log(e)
    throw error(500, 'Error uploading files to Shadow Drive')
  }

  res.forEach((x) => {
    console.log(x)
  })

  return json({
    statuses: res.map((x) => ({ name: x.fileName.split('_')[1], status: x.status }))
  })

}