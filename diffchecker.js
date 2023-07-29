document.addEventListener("DOMContentLoaded", () => {
    const originalTextElem = document.querySelector(".original-text");
    const modifiedTextElem = document.querySelector(".modified-text");
  
    originalTextElem.addEventListener("input", updateDiff);
    modifiedTextElem.addEventListener("input", updateDiff);
  
    function updateDiff() {
      const originalText = originalTextElem.innerText;
      const modifiedText = modifiedTextElem.innerText;
  
      const diffResult = generateDiff(originalText, modifiedText);
      renderDiff(diffResult);
    }
  
    function generateDiff(originalText, modifiedText) {
    //   const { diff_match_patch: DiffMatchPatch } = window;
      const dmp = new diff_match_patch();
      const diffs = dmp.diff_main(originalText, modifiedText);
      dmp.diff_cleanupSemantic(diffs);
  
      return diffs;
    }
  
    function renderDiff(diff) {
      const outputElem = document.querySelector("#diff");
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
            output += `<span class="diff-deleted">${value}</span>`;
            break;
        }
      });
  
      outputElem.innerHTML = output;
   
    }
  });
  