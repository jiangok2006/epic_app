import { http, type HttpHandler } from 'msw'
import { json } from '@remix-run/react'

export const handlers: Array<HttpHandler> = [
	http.get('http://localhost:8090/v1/album_list_service', async () => {
		return json({
			id: '200',
			title: 'mock_title',
			price: 200.0,
		})
	}),
]
