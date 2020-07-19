// Load Plausible Analytics
window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }

// Function for generating donate link with tracking attributes
function generateLink(link) {
    var url = new URL(link)
    url.searchParams.set('source', 'Tipjar Extension (github.com/corbindavenport/tipjar)')
    return url.href
}

// Parse input
const params = (new URL(document.location)).searchParams
const source = params.get('source')
const pageData = JSON.parse(params.get('data'))
console.log('Recieved data:', pageData)

// Display meta tag button if available, fallback to Tipjar list
if (pageData.hasOwnProperty('supportUrl')) {
    document.querySelector('#meta-btn-container button').addEventListener('click', function() {
        plausible('Donate Click - Meta Tag', {
            callback: chrome.tabs.create({ url: generateLink(pageData.supportUrl) })
        })
    })
    document.querySelector('#meta-btn-container').style.display = 'block'
} else if (pageData.hasOwnProperty('tipjarUrl')) {
    document.querySelector('#tipjar-btn-container button').addEventListener('click', function() {
        plausible('Donate Click - Tipjar List', {
            callback: chrome.tabs.create({ url: generateLink(pageData.tipjarUrl) })
        })
    })
    document.querySelector('#tipjar-btn-container').style.display = 'block'
}

// Display Scroll button if available
if (pageData.hasOwnProperty('scroll')) {
    document.querySelector('#scroll-btn-container button').addEventListener('click', function() {
        plausible('Donate Click - Scroll', {
            callback: chrome.tabs.create({ url: generateLink('https://scroll.com/') })
        })
    })
    document.querySelector('#scroll-btn-container').style.display = 'block'
}