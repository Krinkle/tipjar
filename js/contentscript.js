// Meta tag for defining a donation page
const donateTag = document.querySelector('meta[name="support-link"]')
// Scroll support
const scrollJS = document.querySelector('script[src*="https://static.scroll.com"]')
// Meta tag for Bitcoin
const bitcoinTag = document.querySelector('meta[name="bitcoin"]')
// Meta tag for generic cryptocurrency
// Docs: https://web.archive.org/web/20181106180613/https://autotip.io/docs/microtip-meta-tag
const cryptoTag = document.querySelector('meta[name="microtip"]')
// Page hostname
const hostname = new URL(window.location.href).hostname.toString()

// Create object for all donation options
var supportLinks = {}

// Check for ways to support site
if (donateTag && donateTag.getAttribute('content')) {
    supportLinks.supportUrl = donateTag.getAttribute('content')
}
if (sitesObj.hasOwnProperty(hostname)) {
    supportLinks.tipjarUrl = sitesObj[hostname]
}
if (scrollJS) {
    supportLinks.scroll = true
}
if (bitcoinTag) {
    supportLinks.crypto = {
        'currency': 'BTC',
        'address': bitcoinTag.getAttribute('content')
    }
} else if (cryptoTag) {
    // Detect currency type
    if (cryptoTag.getAttribute('data-currency')) {
        supportLinks.crypto = {
            'currency': cryptoTag.getAttribute('data-currency').toUpperCase(),
            'address': cryptoTag.getAttribute('content')
        }
    } else {
        supportLinks.crypto = {
            'currency': 'BTC',
            'address': cryptoTag.getAttribute('content')
        }
    }
}

// Send data to background.js
chrome.runtime.sendMessage(supportLinks)