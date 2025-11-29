import { useState, useEffect } from "react";

export function useCurrentUrl() {
  // Initialize with development URL directly to avoid setState in effect
  const [currentUrl, setCurrentUrl] = useState<string>(
    import.meta.env.DEV ? "https://claude.ai/chat/development" : ""
  );

  useEffect(() => {
    // Only run Chrome API call in production (non-dev mode)
    const isDevelopment = import.meta.env.DEV;

    if (!isDevelopment && typeof chrome !== "undefined" && chrome?.tabs) {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        (tabs: chrome.tabs.Tab[]) => {
          if (tabs[0]?.url) {
            setCurrentUrl(tabs[0].url);
          }
        }
      );
    }
  }, []);

  return currentUrl;
}
