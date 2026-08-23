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

      if (!prompt) {
        return Response.json(
          { error: "Prompt is required." },
          {
            status: 400,
            headers: corsHeaders,
          },
        );
      }

      // Cloudflare Workers AI
      const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      console.log("CLOUDFLARE AI RESPONSE:");
      console.log(response);

      // Send AI response back to React
      return Response.json(
        {
          choices: [
            {
              message: {
                role: "assistant",
                content: response.response,
              },
            },
          ],
        },
        {
          headers: corsHeaders,
        },
      );
    } catch (error) {
      console.log("SERVER ERROR:", error);

      return Response.json(
        {
          error: error.message || "Something went wrong.",
        },
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }
  },
};
