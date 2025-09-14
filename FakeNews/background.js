// Background script for Fake News Detector
chrome.runtime.onInstalled.addListener(() => {
  console.log("Fake News Detector installed.");
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scanResults") {
    console.log("Scan results received:", message.results);
    // Store results for popup access if needed
    chrome.storage.local.set({ lastScanResults: message.results });
  }
});

// Listen for tab updates to auto-scan new pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
    // Auto-scan new pages when they load
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"]
    });
  }
});
