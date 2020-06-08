// Function for generating the donate popup
function createPopup(tab, url, source, siteHostname) {
    var popupURL = 'popup.html?link=' + encodeURIComponent(url) + '&source=' + source + '&hostname=' + siteHostname
    chrome.pageAction.setPopup({tabId: tab.id, popup: popupURL})
    chrome.pageAction.show(tab.id)
}

// Function for checking new pages for donate links
chrome.runtime.onMessage.addListener(function (message) {
    if (Object.keys(message).length === 0) {
        // The page didn't have a <meta> tag, so check the list
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
            var url = new URL(tabs[0].url)
            var hostname = url.hostname.toString()
            // Check if website exists in list
            if (sitesObj.hasOwnProperty(hostname)) {
                console.log('Found site in database:', sitesObj[hostname])
                createPopup(tabs[0], sitesObj[hostname], 'list', hostname)
            }
        })
    } else if (message.hasOwnProperty('url')) {
        // The page had the <meta> tag
        console.log('Found donate tag on page:', message['url'])
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
            var url = new URL(tabs[0].url)
            var hostname = url.hostname.toString()
            createPopup(tabs[0], message['url'], 'web', hostname)
        })
    }
})