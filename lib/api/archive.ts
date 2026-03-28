export interface KalamItem {
  id: number;
  title: string;
  content: string; // Markdown formatted lyrics
  writer: string;
  media_url: string;
  category: string; // "AUDIO"
  is_mureed_only: boolean;
}

export interface KitabItem {
  id: number;
  title: string;
  author: string;
  book_url: string;
  description: string;
  is_mureed_only: boolean;
}

export interface ArchiveData {
  kalam: KalamItem[];
  kitab: KitabItem[];
}

export async function getSufiArchive(): Promise<ArchiveData> {
  const binId = process.env.NEXT_PUBLIC_JSONBIN_BIN_ID;
  const masterKey = process.env.NEXT_PUBLIC_JSONBIN_MASTER_KEY;

  if (!binId || !masterKey) {
    console.error("JSONbin configuration missing in environment variables.");
    return { kalam: [], kitab: [] };
  }

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
      method: 'GET',
      headers: {
        'X-Master-Key': masterKey,
        'X-Bin-Meta': 'false'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Sufi Archive: ${response.statusText}`);
    }

    const data = await response.json();
    return data as ArchiveData;
  } catch (error) {
    console.error("Error fetching Sufi Archive:", error);
    return { kalam: [], kitab: [] };
  }
}

export async function getKalamById(id: number): Promise<KalamItem | null> {
  const archive = await getSufiArchive();
  return archive.kalam.find(k => k.id === id) || null;
}

export async function getKitabById(id: number): Promise<KitabItem | null> {
  const archive = await getSufiArchive();
  return archive.kitab.find(k => k.id === id) || null;
}
