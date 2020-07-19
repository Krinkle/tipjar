// Meta tag for defining a donation page
const donateTag = document.querySelector('meta[name="support-link"]')
// Scroll support
const scrollJS = document.querySelector('script[src*="https://static.scroll.com"]')
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

// Send data to background.js
chrome.runtime.sendMessage(supportLinks)