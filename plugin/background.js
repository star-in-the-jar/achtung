chrome.tabs.onActivated.addListener(function (activeInfo) {
    var activeTabId = activeInfo.tabId;
    
    chrome.tabs.get(activeTabId, function (tab) {
        var url = tab.url;

        chrome.tabs.query({url: "http://localhost:5812/*"}, ([tab]) => {
            chrome.tabs.sendMessage(
                tab.id, {
                url: url,
            }, function() {});  
        });
    });
});