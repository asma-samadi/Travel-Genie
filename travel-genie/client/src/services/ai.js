export async function generateAIResponse(prompt) {
  try {
    const response = await fetch(
      "https://travelgenie-api.asma-samadi.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      },
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    let content = data?.choices?.[0]?.message?.content;

    if (!content) {
      console.error("Unexpected AI response:", data);
      throw new Error("No AI content returned.");
    }

    // Make sure the AI response is a string
    if (typeof content !== "string") {
      console.log("AI returned non-string content:", content);
      content = JSON.stringify(content);
    }

    content = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    console.log("AI RESULT:", content);

    return JSON.parse(content);
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("AI response failed.");
  }
}
