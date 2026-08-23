export default {
	async fetch(request, env) {
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		// Handle CORS preflight
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: corsHeaders,
			});
		}

		// Only allow POST
		if (request.method !== 'POST') {
			return new Response('Method Not Allowed', {
				status: 405,
				headers: corsHeaders,
			});
		}

		try {
			const { prompt } = await request.json();

			const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct-fast', {
				messages: [
					{
						role: 'system',
						content:
							"You are a travel planning assistant. Follow the user's requested JSON format exactly. Return complete valid JSON and nothing else.",
					},
					{
						role: 'user',
						content: prompt,
					},
				],

				// Important: allow enough space for the whole itinerary
				max_tokens: 1500,

				// Lower temperature makes structured JSON more reliable
				temperature: 0.2,
			});

			console.log('CLOUDFLARE AI RESPONSE:');
			console.log(result);

			return Response.json(
				{
					choices: [
						{
							message: {
								role: 'assistant',
								content: result.response,
							},
						},
					],
				},
				{
					headers: corsHeaders,
				},
			);
		} catch (error) {
			console.log('SERVER ERROR:', error);

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
