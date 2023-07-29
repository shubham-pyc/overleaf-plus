// Function to handle the context menu click event
async function callApi(url, method, data, info) {
    
    // Make the request.
    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            { "message": data }
        )
    });

    // Check the response status code.
    if (response.status === 200) {
        // The request was successful.
        const res = await response.json();
        // console.log("API call successful. Response: ", data.message);

        chrome.tabs.query({ active: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "open_dialog_box",
                    original: info,
                    response: res.message
                }, function (response) { });
            });
    } else {
        // The request failed.
        console.log("API call failed. Status code: ", response.status);
    }
}
const CONCLUSION_ID = "openContextMenuConclusion";
const INTRODUCTION_ID = "openContextMenuIntroduction";
const ELABORATE_ID = "openContextMenuElaborate"

function onOpenContextMenuClick(info, tab) {

    // console.log(info, tab)

    if (info.selectionText) {
        let prompt = "";
        if (info.menuItemId == CONCLUSION_ID) {

            let text = info.selectionText;
            text += "\n Write this in third person";

            console.log(text);

            callApi("http://127.0.0.1:5000", "POST", text);
            alert("Selected Text: " + text);

        } else if (info.menuItemId == INTRODUCTION_ID) {

            prompt = `Write Introduction for this paragraph:\n`;
            prompt += info.selectionText + "\n";
            prompt += "Introduction: ";

            console.log(prompt);

        } else if (info.menuItemId == ELABORATE_ID) {
            prompt = `Elobrate this text academically:\n`;
            prompt += info.selectionText + "\n";
            prompt += "Elobrated Text: ";

            
        }
        callApi("http://127.0.0.1:5000", "POST", prompt, info.selectionText);

    } else {
        alert("No text selected.");
    }




}
chrome.contextMenus.create({
    id: "parentMenu",
    title: "Expandable Menu",
    contexts: ["all"]
});

// Create the context menu
chrome.contextMenus.create({
    id: CONCLUSION_ID,
    title: "Write Conclusion",
    contexts: ["all"],
    parentId: "parentMenu"
});

chrome.contextMenus.create({
    id: INTRODUCTION_ID,
    title: "Write Intorduction",
    contexts: ["all"],
    parentId: "parentMenu"
});

chrome.contextMenus.create({
    id: ELABORATE_ID,
    title: "Elaborate Text",
    contexts: ["all"],
    parentId: "parentMenu"
});







// Add a listener to handle the context menu click event
chrome.contextMenus.onClicked.addListener(onOpenContextMenuClick);