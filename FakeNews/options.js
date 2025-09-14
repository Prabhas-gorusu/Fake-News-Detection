const keywordInput = document.getElementById("keyword");
const addBtn = document.getElementById("add");
const list = document.getElementById("list");

// Load saved keywords
chrome.storage.sync.get(["customKeywords"], (data) => {
  const keywords = data.customKeywords || [];
  keywords.forEach(addToList);
});

addBtn.addEventListener("click", () => {
  const word = keywordInput.value.trim();
  if (word) {
    chrome.storage.sync.get(["customKeywords"], (data) => {
      let keywords = data.customKeywords || [];
      keywords.push(word);
      chrome.storage.sync.set({ customKeywords: keywords });
      addToList(word);
      keywordInput.value = "";
    });
  }
});

function addToList(word) {
  const li = document.createElement("li");
  li.textContent = word;
  list.appendChild(li);
}
