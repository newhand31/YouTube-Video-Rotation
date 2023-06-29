(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
        console.log(bookmarkBtnExists);
        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/retation.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            youtubeLeftControls.append(bookmarkBtn);
            bookmarkBtn.addEventListener("click", rotateVideo);
        }
    }
})();
// contentScript.js
function addButton() {
    let container = document.querySelector('.ytp-left-controls');
    if (container && !container.querySelector('.my-custom-button')) {
        let button = document.createElement('button');
        button.className = 'my-custom-button';
        button.innerText = 'My Button';
        container.appendChild(button);
        button.addEventListener('click', rotateVideo);
    }
}

function rotateVideo() {
    let video = document.querySelector('video.html5-main-video');
    if (video) {
        video.style.transformOrigin = 'center center';
        video.style.transform += 'rotate(90deg)';
        // adjustVideoSize(video);
    }
}

function adjustVideoSize(video) {
    const videoRect = video.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scaleX = windowWidth / (videoRect.width + bodyRect.left);
    const scaleY = windowHeight / (videoRect.height + bodyRect.top);
    const scale = Math.min(scaleX, scaleY);
    video.style.transform += ` scale(${scale})`;
}

document.addEventListener('DOMContentLoaded', addButton);
