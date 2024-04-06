function inject(data) {
    const text = `${JSON.stringify(data)}`
    
    const target = document.getElementById("target-url-magic-id")

    if(!target) {
        const div = document.createElement('div')
        div.innerText = text
        div.id = "target-url-magic-id"
        document.documentElement.appendChild(div)
    } else {
        target.innerText = text
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message", message, sender)
    inject(message)
    return true
});
