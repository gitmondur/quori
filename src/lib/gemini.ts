// Calls Gemini via Vertex AI using the user's Google OAuth access token.
// No separate API key needed — sign-in with Google is sufficient.
// Requires the Vertex AI API to be enabled in the GCP project:
//   https://console.cloud.google.com/apis/library/aiplatform.googleapis.com

const VERTEX_REGION = 'us-central1';
const MODEL = 'gemini-2.0-flash-001';

function vertexUrl(projectId: string) {
  return (
    `https://${VERTEX_REGION}-aiplatform.googleapis.com/v1/projects/` +
    `${projectId}/locations/${VERTEX_REGION}/publishers/google/models/${MODEL}:generateContent`
  );
}

export async function callGemini(
  prompt: string,
  accessToken: string,
  projectId: string,
): Promise<string> {
  if (!accessToken) return 'Error: Not signed in to Google.';
  if (!projectId) return 'Error: No GCP Project ID — set one in Settings.';

  const payload = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  };
  const delays = [1000, 2000, 4000, 8000, 16000];

  for (let i = 0; i <= delays.length; i++) {
    try {
      const response = await fetch(vertexUrl(projectId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 429 && i < delays.length) {
          await new Promise(r => setTimeout(r, delays[i]));
          continue;
        }
        if (response.status === 401) {
          return 'Error: Session expired — please sign out and sign in again.';
        }
        if (response.status === 403) {
          return (
            `Error: Vertex AI is not enabled for project "${projectId}". ` +
            `Enable it at console.cloud.google.com/apis/library/aiplatform.googleapis.com`
          );
        }
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response generated.';
    } catch (error) {
      if (i === delays.length) {
        console.error('Vertex AI call failed after retries:', error);
        return 'Error: Could not reach the AI service.';
      }
      await new Promise(r => setTimeout(r, delays[i]));
    }
  }

  return 'Error: Request failed.';
}
