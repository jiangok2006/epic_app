import { json } from '@remix-run/react'
import { z } from 'zod'

const albumSchema = z.object({
	id: z.string(),
	title: z.string(),
	price: z.number(),
})

const getAlbumsSuccessSchema = albumSchema

type Album = z.infer<typeof albumSchema>

const getAlbumsErrorSchema = z.union([
	z.object({
		name: z.string(),
		message: z.string(),
		statusCode: z.number(),
	}),
	z.object({
		name: z.literal('UnknownError'),
		message: z.literal('Unknown Error'),
		statusCode: z.literal(500),
		cause: z.any(),
	}),
])

async function get_album() {
	const response = await fetch(`http://localhost:8090/v1/album_list_service`)
	const album = await response.json()
	const parsedData = getAlbumsSuccessSchema.safeParse(album)
	if (!response.ok || !parsedData.success) {
		const error = getAlbumsErrorSchema.safeParse(album)
		throw new Error(
			error.success ? JSON.stringify(error) : error.error!.message,
		)
	}
	return json(parsedData.data)
}

export { get_album }
export type { Album }
