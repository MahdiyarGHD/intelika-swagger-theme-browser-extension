async function executeScript(files) {
  const id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

  const activeTab = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!activeTab.length) {
    console.error("No active tab found!");
    return; 
  }

  const details = {
    target: { tabId: activeTab[0].id },
    files: files
  };

  const promise = new Promise(resolve => {
    const listener = request => {
      if (request && request.asyncFuncID === id) {
        chrome.runtime.onMessage.removeListener(listener);
        resolve(request);
      }
      return false;
    };
    chrome.runtime.onMessage.addListener(listener);
  });

  await chrome.scripting.executeScript(details);
  const { content, error } = await promise;

  if (error) {
    throw new Error(`Error thrown in execution script: ${error.message}.
    Stack: ${error.stack}`);
  }

  return content;
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.url?.startsWith("chrome://")) return undefined;

      const result = await executeScript(["scripts/script.js"]);
})