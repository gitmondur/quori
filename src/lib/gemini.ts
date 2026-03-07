const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent';

export async function callGemini(prompt: string, apiKey: string): Promise<string> {
  if (!apiKey) return 'Error: API Key is missing.';

  const payload = { contents: [{ parts: [{ text: prompt }] }] };
  const delays = [1000, 2000, 4000, 8000, 16000];

  for (let i = 0; i <= delays.length; i++) {
    try {
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 429 && i < delays.length) {
          await new Promise(r => setTimeout(r, delays[i]));
          continue;
        }
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response generated.';
    } catch (error) {
      if (i === delays.length) {
        console.error('Gemini API failed after retries:', error);
        return 'Error: Could not reach the AI service.';
      }
      await new Promise(r => setTimeout(r, delays[i]));
    }
  }

  return 'Error: Request failed.';
}
