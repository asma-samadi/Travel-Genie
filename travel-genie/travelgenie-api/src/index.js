export default {
	async fetch(request, env) {
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: corsHeaders,
			});
		}

		if (request.method !== 'POST') {
			return new Response('Method Not Allowed', {
				status: 405,
				headers: corsHeaders,
			});
		}

		try {
			const { prompt } = await request.json();

			const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
				method: 'POST',

				headers: {
					Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
					'Content-Type': 'application/json',
				},

				body: JSON.stringify({
					model: 'openai/gpt-oss-20b:free',
					response_format: {
						type: 'json_object',
					},
					messages: [
						{
							role: 'user',
							content: prompt,
						},
					],
				}),
			});

			const data = await response.json();

			console.log(data.choices[0].message.content);

			if (data.error) {
				return Response.json(
					{
						error: data.error.message,
					},
					{
						status: 500,
						headers: corsHeaders,
					},
				);
			}

			return Response.json(
				{
					result: data.choices[0].message.content,
				},
				{
					headers: corsHeaders,
				},
			);

		} catch (error) {
			console.log(error);

			return Response.json(
				{
					error: error.message,
				},
				{
					status: 500,
					headers: corsHeaders,
				},
			);
		}
	},
};
