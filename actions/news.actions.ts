import httpClient from "@/lib/httpClient"; // Adjust path as needed
export async function fetchNews(): Promise<any[]> {
  try {
    const response = await httpClient.get<any[]>("/news");
    return response.data;
  } catch (error) {
    throw error;
  }
}
