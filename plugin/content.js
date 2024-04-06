function inject(data) {
  const text = `${JSON.stringify(data)}`;

  const target = document.getElementById("target-url-magic-id");

  if (!target) {
    const div = document.createElement("div");
    div.innerText = text;
    div.id = "target-url-magic-id";
    div.dataset.url = data?.url;
    document.documentElement.appendChild(div);
  } else {
    target.innerText = text;
    target.dataset.url = data?.url;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  inject(message);
  return true;
});
