// Content script injected into web pages
console.log("Content script loaded on:", window.location.href);

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log("Message received in content script:", request);

  if (request.action === "getPageUrl") {
    sendResponse({ url: window.location.href });
  }

  return false;
});

// Future: You could inject a chat widget into the page here
// For now, we'll keep the chat in the popup only
