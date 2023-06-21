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
        adjustVideoSize(video);
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
