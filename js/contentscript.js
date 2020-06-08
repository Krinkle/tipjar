console.log('hi')

// Check if page has a donate <meta> tag
var donateTag = document.querySelector('meta[name="support-link"]')
if (donateTag && donateTag.getAttribute('content')) {
    chrome.runtime.sendMessage({'url': donateTag.getAttribute('content')})
} else {
    chrome.runtime.sendMessage({})
}