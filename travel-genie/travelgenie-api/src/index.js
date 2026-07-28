export default {
	async fetch(request, env) {
		const corsHeaders = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		};


		// Handle CORS preflight
		if (request.method === "OPTIONS") {
			return new Response(null, {
				headers: corsHeaders,
			});
		}


		// Only allow POST
		if (request.method !== "POST") {
			return new Response("Method Not Allowed", {
				status: 405,
				headers: corsHeaders,
			});
		}


		try {

			const { prompt } = await request.json();


			const response = await fetch(
				"https://openrouter.ai/api/v1/chat/completions",
				{
					method: "POST",

					headers: {
						Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
						"Content-Type": "application/json",
					},


					body: JSON.stringify({

						model: "nvidia/nemotron-3-super-120b-a12b:free",

						messages: [
							{
								role: "user",
								content: prompt,
							},
						],

					}),
				}
			);



			const data = await response.json();


			console.log("OPENROUTER RESPONSE:");
			console.log(data);



			// Handle OpenRouter errors
			if (data.error) {

				return Response.json(
					{
						error: data.error.message,
					},
					{
						status: 500,
						headers: corsHeaders,
					}
				);

			}



			// Send AI response back to React
			return Response.json(
				{
					choices: data.choices,
				},
				{
					headers: corsHeaders,
				}
			);



		} catch (error) {

			console.log("SERVER ERROR:", error);


			return Response.json(
				{
					error: error.message,
				},
				{
					status: 500,
					headers: corsHeaders,
				}
			);

		}
	},
};