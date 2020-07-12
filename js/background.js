// Function for generating the donate popup
function createPopup(tab, url, source, siteHostname) {
    var popupURL = 'popup.html?link=' + encodeURIComponent(url) + '&source=' + source + '&hostname=' + siteHostname
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
        if (message.hasOwnProperty('supportUrl')) {
            // The page has the <meta> tag
            createPopup(tabs[0], message.supportUrl, 'web', hostname)
        } else if (sitesObj.hasOwnProperty(hostname)) {
            // The page is in the sites.js list
            createPopup(tabs[0], sitesObj[hostname], 'list', hostname)
        } else if (message.hasOwnProperty('scroll')) {
            // The site supports Scroll
            var hostname = url.hostname.toString()
            createPopup(tabs[0], 'https://scroll.com/', 'scroll', hostname)
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