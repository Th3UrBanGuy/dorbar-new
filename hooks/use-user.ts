"use client";

import { useState, useEffect } from 'react';

export type UserRole = "Staff" | "User" | "Murid" | "Special";

export function useUser() {
  const [tags, setTags] = useState<UserRole[]>(["User"]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(/(^| )dorbar_tags=([^;]+)/);
    if (match) {
      try {
        const parsed = JSON.parse(decodeURIComponent(match[2]));
        if (Array.isArray(parsed)) {
          setTags(parsed as UserRole[]);
        }
      } catch (e) {
        console.error("Failed to parse tags cookie", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleTag = (tag: UserRole) => {
    let newTags: UserRole[];
    if (tags.includes(tag)) {
      newTags = tags.filter(t => t !== tag);
    } else {
      newTags = [...tags, tag];
    }
    
    // Ensure "User" is always there as a baseline if everything is removed
    if (newTags.length === 0) newTags = ["User"];
    
    setTags(newTags);
    document.cookie = `dorbar_tags=${encodeURIComponent(JSON.stringify(newTags))}; path=/; max-age=31536000`;
    
    // Dispatch a custom event so other components (like Hadith page) can revalidate if needed
    window.dispatchEvent(new Event("userTagsChanged"));
  };

  const hasTag = (tag: UserRole) => tags.includes(tag);

  return { tags, toggleTag, hasTag, isLoaded };
}
