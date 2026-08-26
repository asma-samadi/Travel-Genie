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
						content: `You are TravelGenie, a highly personalized travel recommendation assistant.

You must carefully follow the user's prompt.

Every response must be based on the EXACT destination, dates, number of travelers, budget, and interests provided by the user.

Do NOT use generic travel recommendations.

Do NOT automatically recommend the same famous attractions every time.

Choose different relevant places, activities, foods, and practical tips when possible.

Make recommendations specific to the destination.

Use real attractions, local experiences, and local foods when appropriate.

Return complete valid JSON exactly in the structure requested by the user.

Return JSON only.
Do not include markdown.
Do not include explanations outside the JSON.`,
					},

					{
						role: 'user',
						content: prompt,
					},
				],

				// More space for 20 detailed recommendations
				max_tokens: 2500,

				// Higher variety while still keeping JSON reasonably reliable
				temperature: 0.7,
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
