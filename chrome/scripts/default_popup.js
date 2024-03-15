const options = {};
const optionsForm = document.getElementById("optionsForm");

optionsForm.status_checkbox.addEventListener("change", (event) => {
  options.status_checkbox = event.target.checked;
  chrome.storage.sync.set({ options });
});

const data = await chrome.storage.sync.get("options");
Object.assign(options, data.options);
optionsForm.status_checkbox.checked = Boolean(options.status_checkbox);