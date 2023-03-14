import { json, error} from "@sveltejs/kit";

 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const data = await request.formData()

  if (!data.has('address')) throw error(400, 'address is required')
  if (Array.from(data.keys()).length < 2) throw error(400, 'No files uploaded')

  for (const [name, value] of data.entries()) {
    if (name === 'address') continue;

    console.log(name, value)

  }
 
  return json("lolo");
}

