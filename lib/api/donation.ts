export interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  senderNumber?: string;
  transactionDate?: string;
  timestamp: string;
}

const BIN_ID = process.env.NEXT_PUBLIC_JSONBIN_DONATION_BIN_ID;
const MASTER_KEY = process.env.NEXT_PUBLIC_JSONBIN_MASTER_KEY;

export async function saveDonation(record: DonationRecord): Promise<boolean> {
  if (!BIN_ID || !MASTER_KEY) {
    console.error("Donation JSONBin API keys missing.");
    return false;
  }

  try {
    // 1. Fetch current donations
    const getRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "GET",
      headers: {
        "X-Master-Key": MASTER_KEY,
        "X-Bin-Meta": "false",
      },
      cache: "no-store",
    });

    let currentDonations: DonationRecord[] = [];
    if (getRes.ok) {
      currentDonations = await getRes.json();
      if (!Array.isArray(currentDonations)) {
        currentDonations = Object.keys(currentDonations).length === 0 ? [] : [currentDonations as any];
      }
    } else if (getRes.status === 404) {
       // Bin might be empty/new
       currentDonations = [];
    } else {
      console.error("Failed to fetch current donations from JSONBin");
      return false;
    }

    // 2. Append new record
    currentDonations.push(record);

    // 3. Save back to bin
    const putRes = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY,
      },
      body: JSON.stringify(currentDonations),
    });

    if (!putRes.ok) {
      console.error("Failed to save donation to JSONBin");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Donation API Error:", error);
    return false;
  }
}
