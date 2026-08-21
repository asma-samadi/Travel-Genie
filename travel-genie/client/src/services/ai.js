export async function generateAIResponse(prompt) {
  try {
    const response = await fetch("http://127.0.0.1:8787", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    let content = data?.choices?.[0]?.message?.content;

    if (!content) {
      console.error("Unexpected AI response:", data);
      throw new Error("No AI content returned.");
    }

    content = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("AI RESULT:", content);

    return JSON.parse(content);
  } catch (error) {
    console.error("AI Error:", error);

    throw new Error("AI response failed.");
  }
}
