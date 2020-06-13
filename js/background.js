// Function for generating the donate popup
function createPopup(tab, url, source, siteHostname) {
    var popupURL = 'popup.html?link=' + encodeURIComponent(url) + '&source=' + source + '&hostname=' + siteHostname
    chrome.pageAction.setPopup({tabId: tab.id, popup: popupURL})
    chrome.pageAction.setIcon({
        path: {
            32: 'img/pageaction-32.png',
            64: 'img/pageaction-64.png'
        },
        tabId: tab.id
    })
    chrome.pageAction.show(tab.id)
}

// Function for checking new pages for donate links
chrome.runtime.onMessage.addListener(function (message) {
    if (message.hasOwnProperty('url')) {
        // The page had the <meta> tag
        console.log('Found donate tag on page:', message['url'])
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
            var url = new URL(tabs[0].url)
            var hostname = url.hostname.toString()
            createPopup(tabs[0], message['url'], 'web', hostname)
        })
    } else if (Object.keys(message).length === 0) {
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
    } else if (message.hasOwnProperty('scroll')) {
        // The site supports Scroll
        console.log('Found Scroll support on page.')
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
            var url = new URL(tabs[0].url)
            var hostname = url.hostname.toString()
            createPopup(tabs[0], message['scroll'], 'scroll', hostname)
        })
    }
})

// Hide pageAction button when current page changes
// The icon should be re-initialized by the content script once the DOM has finished loading
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (changeInfo.hasOwnProperty('status')) {
        if (changeInfo === 'loading') {
            // Hide button
            chrome.pageAction.hide(tabId)
            // The icon has to be changed to grey for Chromium browsers, because the button stays in the toolbar
            chrome.pageAction.setIcon({
                path: {
                    32: 'img/pageaction-greyscale-32.png',
                    64: 'img/pageaction-greyscale-64.png'
                },
                tabId: tab.id
            })
        }
    }
})