// background.js
// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//     if (tab.url && tab.url.includes("youtube.com/watch")) {
//         const queryParameters = tab.url.split("?")[1];
//         const urlParameters = new URLSearchParams(queryParameters);

//         chrome.tabs.sendMessage(tabId, {
//             type: "NEW",
//             videoId: urlParameters.get("v"),
//         });
//     }
// });
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    chrome.tabs.get(details.tabId, (tab) => {
        if (tab.url && tab.url.includes("youtube.com/watch")) {
            const queryParameters = tab.url.split("?")[1];
            const urlParameters = new URLSearchParams(queryParameters);

            chrome.tabs.sendMessage(tab.id, {
                type: "NEW",
                videoId: urlParameters.get("v"),
            });
        }
    });
}, { url: [{ hostSuffix: 'youtube.com' }] });

