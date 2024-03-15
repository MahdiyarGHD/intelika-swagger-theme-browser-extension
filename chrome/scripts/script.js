chrome.storage.sync.get("options", function(data) {
    if(Boolean(data.options.status_checkbox) && document.getElementById('swagger-ui').parentElement.tagName == "BODY") {
        const url = chrome.runtime.getURL("../styles/theme.css");

        fetch(url)
        .then(response => response.text())
        .then(text => {
            var style = document.createElement('style');
            style.classList.add("intelika-swagger-theme");
            style.innerHTML = text;
            document.head.appendChild(style);
        })
        .catch(error => {
            console.error("Error reading file:", error);
        });

    }
})

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if(key == "options")
        {
            if(newValue.status_checkbox) {
                console.log("It made true");
                const url = chrome.runtime.getURL("../styles/theme.css");
                fetch(url)
                .then(response => response.text())
                .then(text => {
                    var style = document.createElement('style');
                    style.classList.add("intelika-swagger-theme");
                    style.innerHTML = text;
                    document.head.appendChild(style);
                })
                .catch(error => {
                    console.error("Error reading file:", error);
                });
            } else {
                var styles = document.getElementsByClassName("intelika-swagger-theme");

                for (var i = 0; i < styles.length; i++) {
                  styles[i].innerHTML = "";
                }
            }
        }
    }
  });