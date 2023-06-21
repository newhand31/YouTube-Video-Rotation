// background.js
chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete' && tab.url.startsWith('https://www.youtube.com/watch')) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['contentScript.js'],
            });
        }
    });
});
