"use server";

const API_KEY = "$2y$10$xHycPUKgNpZ33wiOE47numWrqSjq3dFrq5mJEc4YKf1Nrpa1rme";

export async function fetchHadithApiPage(bookSlug: string, page: number) {
  try {
    const res = await fetch(
      `https://hadithapi.com/public/api/hadiths?apiKey=${encodeURIComponent(API_KEY)}&book=${bookSlug}&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) {
      throw new Error(`hadithapi.com responded with status: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("fetchHadithApiPage Error:", error);
    throw new Error("Failed to fetch from hadithapi.com");
  }
}
