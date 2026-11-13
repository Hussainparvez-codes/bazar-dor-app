const API_URLS = [
  process.env.MAIN_API_URL,
  process.env.BASE_URL_2,
  process.env.BASE_URL_1,
].filter(Boolean);

export async function fetchFromApi(endpoint) {
  let lastError;

  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        cache: "force-cache",
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();

      if (result?.status === false || result?.success === false) {
        throw new Error("API request failed");
      }

      return result?.data ?? result;
    } catch (error) {
      console.error(`API failed: ${baseUrl}`, error);
      lastError = error;
    }
  }

  throw lastError || new Error("সব API ব্যর্থ হয়েছে।");
}