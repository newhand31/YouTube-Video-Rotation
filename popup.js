document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addButton").addEventListener("click", addCustomButton);
});

async function addCustomButton() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: addButton,
        });
        window.close();
    } catch (error) {
        console.error("Failed to add custom button:", error);
    }
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: checkForLeftControls,
    });
});

function checkForLeftControls() {
    const leftControls = document.querySelector(".ytp-left-controls");
    if (leftControls) {
        addButton();
    } else {
        observeLeftControls();
    }
}

function addButton() {
    const leftControls = document.querySelector(".ytp-left-controls");
    if (leftControls) {
        const customButton = document.createElement("button");
        customButton.classList.add("custom-button");
        customButton.textContent = "Custom Button";
        leftControls.appendChild(customButton);
    }
}

function observeLeftControls() {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                const addedNodes = Array.from(mutation.addedNodes);
                const leftControls = addedNodes.find(node => node.classList && node.classList.contains("ytp-left-controls"));
                if (leftControls) {
                    addButton();
                    observer.disconnect();
                }
            }
        });
    });

    const videoContainer = document.querySelector("#movie_player");
    if (videoContainer) {
        observer.observe(videoContainer, { childList: true, subtree: true });
    }
}
