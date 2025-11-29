// Background service worker for Chrome extension
console.log("Background service worker loaded");

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log("Message received in background:", request);

  if (request.action === "getCurrentUrl") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) {
        sendResponse({ url: tabs[0].url });
      } else {
        sendResponse({ url: null });
      }
    });
    return true; // Keep channel open for async response
  }

  return false;
});

// Optional: Listen for tab updates to refresh chat when URL changes
chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    console.log("Tab updated:", tab.url);
    // You could send a message to the popup here if needed
  }
});
