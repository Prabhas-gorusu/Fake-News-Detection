// Enhanced fake news keyword check with percentage calculation
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
  let totalWords = text.split(/\s+/).length;

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

  // Return results for popup
  return {
    fakeKeywords: fakeFound,
    realIndicators: realFound,
    fakePercentage: Math.round(normalizedFakeScore),
    realPercentage: Math.round(normalizedRealScore),
    totalWords: totalWords,
    hasFakeNews: fakeFound.length > 0,
    hasRealIndicators: realFound.length > 0
  };
}

// Execute scan and send results to popup
const results = scanPage();
chrome.runtime.sendMessage({ action: "scanResults", results: results });

// Also inject a visual indicator on the page
if (results.hasFakeNews || results.fakePercentage > 30) {
  const banner = document.createElement("div");
  banner.id = "fake-news-banner";

  let bannerText = "⚠️ Fake News Risk Detected";
  let bannerColor = "#f57c00";

  if (results.fakePercentage > 70) {
    bannerText = "🚨 Very High Fake News Risk";
    bannerColor = "#d32f2f";
  } else if (results.fakePercentage > 50) {
    bannerText = "🚨 High Fake News Risk";
    bannerColor = "#e53935";
  } else if (results.fakePercentage > 30) {
    bannerText = "⚠️ Medium Fake News Risk";
    bannerColor = "#f57c00";
  }

  banner.innerText = `${bannerText} (${results.fakePercentage}% risk)`;
  banner.style.position = "fixed";
  banner.style.top = "0";
  banner.style.left = "0";
  banner.style.width = "100%";
  banner.style.backgroundColor = bannerColor;
  banner.style.color = "white";
  banner.style.fontSize = "16px";
  banner.style.fontWeight = "bold";
  banner.style.textAlign = "center";
  banner.style.zIndex = "9999";
  banner.style.padding = "12px";
  banner.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";

  document.body.prepend(banner);
}

// Add a success indicator if real news indicators are found
if (results.hasRealIndicators && results.realPercentage > 30) {
  const successBanner = document.createElement("div");
  successBanner.id = "real-news-banner";

  let successText = "✅ Reliable News Indicators Found";
  if (results.realPercentage > 50) {
    successText = "✅ Strong Reliable News Indicators";
  }

  successBanner.innerText = `${successText} (${results.realPercentage}% reliability)`;
  successBanner.style.position = "fixed";
  successBanner.style.top = results.hasFakeNews ? "60px" : "0";
  successBanner.style.left = "0";
  successBanner.style.width = "100%";
  successBanner.style.backgroundColor = "#4caf50";
  successBanner.style.color = "white";
  successBanner.style.fontSize = "16px";
  successBanner.style.fontWeight = "bold";
  successBanner.style.textAlign = "center";
  successBanner.style.zIndex = "9998";
  successBanner.style.padding = "12px";
  successBanner.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";

  document.body.prepend(successBanner);
}
