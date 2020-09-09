// Function for generating UUID for analytics
// Source: https://stackoverflow.com/a/2117523
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

// Function for generating the donate popup
function createPopup(tab, source, data) {
    var popupURL = 'popup.html?&source=' + source + '&data=' + encodeURIComponent(JSON.stringify(data))
    chrome.pageAction.setPopup({ tabId: tab.id, popup: popupURL })
    chrome.pageAction.setIcon({
        path: {
            32: 'img/pageaction-32.png',
            64: 'img/pageaction-64.png'
        },
        tabId: tab.id
    })
    chrome.pageAction.show(tab.id)
}

// Regenerate popup on each page change
// Order of operations: Meta tag, link in sites.js, Scroll link
chrome.runtime.onMessage.addListener(function (message) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        var url = new URL(tabs[0].url)
        var hostname = url.hostname.toString()
        console.log('Recieved data from tab ' + tabs[0].id + ' (' + hostname + '):', message)
        // If the object isn't empty, generate a popup
        if (!(Object.keys(message).length === 0 && message.constructor === Object)) {
            createPopup(tabs[0], hostname, message)
        }
    })
})

// Hide pageAction button when current page changes
// The icon should be re-initialized by the content script once the DOM has finished loading
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
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

// Welcome page
chrome.storage.local.get(function (data) {
    // Set version
    if (data.version) {
        if (!(data.version === chrome.runtime.getManifest().version)) {
            chrome.tabs.create({ 'url': chrome.extension.getURL('welcome.html') })
            chrome.storage.local.set({
                version: chrome.runtime.getManifest().version
            })
        }
    } else {
        chrome.tabs.create({ 'url': chrome.extension.getURL('welcome.html') })
        chrome.storage.local.set({
            version: chrome.runtime.getManifest().version
        })
    }
})

// Generate UUID for analytics
chrome.storage.local.get(function (data) {
    if (!data.uuid) {
        var uuid = uuidv4()
        chrome.storage.local.set({
            uuid: uuid
        })
    }
})