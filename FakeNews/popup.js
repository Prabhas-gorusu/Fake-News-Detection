// Simple Fake News Detector popup
let currentResults = null;

// Function to update the UI with scan results
function updateResults(results) {
  if (!results) return;

  currentResults = results;

  // Update percentages - fake score shows actual percentage, real score shows complementary percentage
  document.getElementById("fake-percentage").textContent = results.fakePercentage + "%";
  document.getElementById("real-percentage").textContent = results.realPercentage + "%";

  // Update status
  updateStatus(results);
}

// Function to update status
function updateStatus(results) {
  const statusEl = document.getElementById("status");

  if (results.fakePercentage > 70) {
    statusEl.innerHTML = "Very High Risk - Exercise extreme caution!";
    statusEl.style.color = "#c62828";
  } else if (results.fakePercentage > 50) {
    statusEl.innerHTML = "High Risk - Be very skeptical";
    statusEl.style.color = "#e53935";
  } else if (results.fakePercentage > 30) {
    statusEl.innerHTML = "Medium Risk - Verify information";
    statusEl.style.color = "#f57c00";
  } else if (results.fakePercentage < 20) {
    statusEl.innerHTML = "Low Risk - Reliable source";
    statusEl.style.color = "#2e7d32";
  } else {
    statusEl.innerHTML = "Moderate Risk - Use caution";
    statusEl.style.color = "#f57c00";
  }
}

// Function to show initial state
function showInitialState() {
  // Reset displays
  document.getElementById("fake-percentage").textContent = "--";
  document.getElementById("real-percentage").textContent = "--";

  // Show initial status
  document.getElementById("status").innerHTML = "Ready to scan";
  document.getElementById("status").style.color = "#666";
}

// Function to scan the current page
async function scanCurrentPage() {
  try {
    // Show scanning status
    document.getElementById("status").innerHTML = "Scanning...";
    document.getElementById("status").style.color = "#1976d2";

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Execute the content script and get results
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        // Fake news keywords
        const fakeKeywords = [
          "free money", "click here", "breaking!!!", "giveaway", "fake news", "scam",
          "urgent", "limited time", "act now", "exclusive offer", "100% guaranteed",
          "miracle cure", "secret", "government conspiracy", "they don't want you to know",
          "shocking truth", "doctors hate this", "one weird trick", "you won't believe",
          "viral", "trending", "insane", "amazing", "incredible", "unbelievable",
          "secret method", "hidden truth", "exposed", "leaked", "banned", "censored",
          "shocking", "mind-blowing", "revolutionary", "breakthrough", "miracle",
          "guaranteed results", "proven method", "scientifically proven", "doctors recommend",
          "lose weight fast", "get rich quick", "instant success", "overnight results"
        ];

        // Real news indicators
        const realNewsIndicators = [
          "verified", "fact-checked", "reliable source", "official statement",
          "peer-reviewed", "scientific study", "government report", "expert analysis",
          "credible source", "well-researched", "evidence-based", "multiple sources",
          "journalist", "reporter", "news agency", "press release", "official",
          "research", "study", "data", "statistics", "expert", "professor", "doctor",
          "university", "institution", "organization", "publication", "journal",
          "interview", "statement", "announcement", "report", "investigation",
          "analysis", "review", "assessment", "evaluation", "examination"
        ];

        function scanPage() {
          const text = document.body.innerText.toLowerCase();
          let fakeFound = [];
          let realFound = [];

          // Check for fake news keywords
          fakeKeywords.forEach(keyword => {
            if (text.includes(keyword)) {
              fakeFound.push(keyword);
            }
          });

          // Check for real news indicators
          realNewsIndicators.forEach(indicator => {
            if (text.includes(indicator)) {
              realFound.push(indicator);
            }
          });

          // Calculate fake news percentage
          const fakeScore = (fakeFound.length / fakeKeywords.length) * 100;
          const normalizedFakeScore = Math.min(fakeScore, 100);

          // Calculate real news percentage as complementary to fake news
          // If fake news is 2%, real news is 98%
          // If fake news is 100%, real news is 0%
          const normalizedRealScore = Math.max(0, 100 - normalizedFakeScore);

          return {
            fakeKeywords: fakeFound,
            realIndicators: realFound,
            fakePercentage: Math.round(normalizedFakeScore),
            realPercentage: Math.round(normalizedRealScore)
          };
        }

        return scanPage();
      }
    });

    if (results && results[0] && results[0].result) {
      updateResults(results[0].result);
    } else {
      document.getElementById("status").innerHTML = "No results received";
      document.getElementById("status").style.color = "#c62828";
    }

  } catch (error) {
    console.error("Error scanning page:", error);
    document.getElementById("status").innerHTML = "Error scanning page";
    document.getElementById("status").style.color = "#c62828";
  }
}

// Event listeners
document.getElementById("rescan").addEventListener("click", scanCurrentPage);

// Show initial state when popup opens
document.addEventListener("DOMContentLoaded", () => {
  showInitialState();
});
