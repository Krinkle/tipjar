// Meta tag for defining a donation page
const donateTag = document.querySelector('meta[name="support-link"]')
// Scroll support
const scrollJS = document.querySelector('script[src*="https://static.scroll.com"]')

// Check for way to support site
if (donateTag && donateTag.getAttribute('content')) {
    chrome.runtime.sendMessage({'url': donateTag.getAttribute('content')})
} else if (scrollJS) {
    chrome.runtime.sendMessage({'scroll': 'https://scroll.com/'})
} else {
    chrome.runtime.sendMessage({})
}