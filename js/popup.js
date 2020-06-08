// Function for generating donate link with utm_source attribute
function generateLink(link) {
    var url = new URL(link)
    // This lets sites know that you found the donate link through Tipjar
    url.searchParams.set('utm_source', 'Tipjar%20Browser%20Extension')
    return url.href
}

// Parse input
const params = (new URL(document.location)).searchParams
const donateLink = params.get('link')
const source = params.get('source')
const siteHostname = params.get('hostname')

// Create button
var btn = document.createElement('button')
btn.textContent = 'Donate'
btn.addEventListener('click', function () {
    ga('send', { hitType: 'event', eventAction: 'Donate click', eventLabel: siteHostname })
    chrome.tabs.create({ url: generateLink(donateLink) })
})
document.body.appendChild(btn)

// Create text
var caption = document.createElement('div')
if (source === 'list') {
    caption.textContent = 'Link provided by Tipjar'
} else if (source === 'web') {
    caption.textContent = 'Link provided by website'
}
document.body.appendChild(caption)

// Load Google Analytics
window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) }; ga.l = +new Date
ga('create', 'UA-59452245-8', 'auto')
ga('send', 'pageview')