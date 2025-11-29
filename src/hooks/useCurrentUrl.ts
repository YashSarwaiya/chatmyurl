import { useState, useEffect } from "react";

export function useCurrentUrl() {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always get the actual URL from Chrome API
    if (typeof chrome !== "undefined" && chrome?.tabs) {
      // Get initial URL
      chrome.tabs.query(
        { active: true, currentWindow: true },
        (tabs: chrome.tabs.Tab[]) => {
          if (tabs[0]?.url) {
            setCurrentUrl(tabs[0].url);
          }
          setLoading(false);
        }
      );

      // Listen for tab updates (when user navigates to different URL)
      const handleTabUpdate = (
        _tabId: number,
        changeInfo: { url?: string; status?: string },
        tab: chrome.tabs.Tab
      ) => {
        if (changeInfo.url && tab.active) {
          // URL changed
          setCurrentUrl(changeInfo.url);
        }
      };

      // Listen for tab activation (when user switches tabs)
      const handleTabActivated = (activeInfo: {
        tabId: number;
        windowId: number;
      }) => {
        chrome.tabs.get(activeInfo.tabId, (tab: chrome.tabs.Tab) => {
          if (tab.url) {
            setCurrentUrl(tab.url);
          }
        });
      };

      chrome.tabs.onUpdated.addListener(handleTabUpdate);
      chrome.tabs.onActivated.addListener(handleTabActivated);

      // Cleanup listeners
      return () => {
        chrome.tabs.onUpdated.removeListener(handleTabUpdate);
        chrome.tabs.onActivated.removeListener(handleTabActivated);
      };
    } else {
      console.error("Chrome API not available");
      setLoading(false);
    }
  }, []);

  return { currentUrl, loading };
}
