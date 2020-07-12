// Meta tag for defining a donation page
const donateTag = document.querySelector('meta[name="support-link"]')
// Scroll support
const scrollJS = document.querySelector('script[src*="https://static.scroll.com"]')

// Create object for all donation options
var supportLinks = {}

// Check for way to support site
if (donateTag && donateTag.getAttribute('content')) {
    supportLinks.supportUrl = donateTag.getAttribute('content')
}
if (scrollJS) {
    supportLinks.scroll = true
}

// Send date
chrome.runtime.sendMessage(supportLinks)