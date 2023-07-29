// // Import the necessary libraries.
// import { chrome } from 'chrome';

// // Create a function that will be called when the extension is loaded.
// const onExtensionLoaded = () => {
//   // Add a listener for the debugger attach event.
//   chrome.debugger.onAttach.addListener(() => {
//     // Say "hello world" in the debugger console.
//     chrome.debugger.console.log('hello world');
//   });
// };

// // Add the extension as a listener for the extension loaded event.
// chrome.webNavigation.onCommitted.addListener(onExtensionLoaded);


console.warn("Checking if this is working", document.querySelector("body"));


document.addEventListener('contextmenu', (event) => {
  if (event.button === 2) {
    const selectedText = window.getSelection().toString();
    // console.log(selectedText);
  }
});

// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

//     alert("Message recieved!");
// });
