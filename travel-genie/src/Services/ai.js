export async function generateAIResponse(prompt) {
  const response = await fetch("http://127.0.0.1:8787", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();

  return data.result;
}
