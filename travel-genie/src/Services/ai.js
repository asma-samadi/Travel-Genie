export async function generateAIResponse(prompt) {
  try {
    const response = await fetch("YOUR_API_URL", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        prompt: prompt,
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
}
