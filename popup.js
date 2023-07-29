function renderDiff(diff) {
    const outputElem = document.querySelector("#overlay");
    //   outputElem.classList.add("diff-text");

    let output = "";
    diff.forEach((item) => {
        const value = item[1].replace(/\n/g, "<br>");
        switch (item[0]) {
            case 0:
                output += value;
                break;
            case 1:
                output += `<span class="diff-added">${value}</span>`;
                break;
            case -1:
                output += `<span class="diff-deleted1">${value}</span>`;
                break;
        }
    });

    outputElem.innerHTML = output;

}

function generateDiff(originalText, modifiedText) {
    //   const { diff_match_patch: DiffMatchPatch } = window;
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(originalText, modifiedText);
    dmp.diff_cleanupSemantic(diffs);

    return diffs;
}


function showOverlay(original, other) {
    let overlay = document.getElementById("overlay");

    // If the overlay doesn't exist, create it
    if (!overlay) {
        const overlayDiv = document.createElement("div");
        overlayDiv.id = "overlay";
        overlayDiv.className = "overlay";
        document.body.appendChild(overlayDiv);
    }
    overlay = document.getElementById("overlay");
    // Update the position of the overlay based on the mouse cursor
    let boundClient = window.getSelection().getRangeAt(0).getBoundingClientRect();
    const x = boundClient.x;
    const y = boundClient.y + boundClient.height;
    overlay.style.left = `${x + 10}px`;
    // overlay.style.top = `${y + 10}px`;
    overlay.style.top = `${500 + 10}px`;

    // Show the overlay
    overlay.style.display = "block";



    let diff = generateDiff(original, other);
    renderDiff(diff);

}

// Function to hide the overlay div
function hideOverlay() {
    const overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.style.display = "none";
    }
}

// Event listeners to show/hide the overlay
// const placeholder = document.getElementById("placeholder");
// placeholder.addEventListener("mousemove", showOverlay);
// placeholder.addEventListener("mouseleave", hideOverlay);

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (key === "j") {
        showOverlay(event);
        console.warn("This is pressed");
        // openModal();
    }
    else if (event.key === "Escape" || event.keyCode === 27) {
        // Your code to handle the "Escape" key press here
        hideOverlay();
    }
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    console.warn(msg);
    showOverlay(msg.original, msg.response);
    // alert("Message recieved!");
});
