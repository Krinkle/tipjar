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
const donateLink = params.get('link')
const format = params.get('format')
const source = params.get('source')

// Create button
// Note: All variations of eventCategory need to be configured in Plausible analytics before they are tracked
var btn = document.createElement('button')
if (format === 'scroll') {
    btn.textContent = 'Support with Scroll'
    var eventCategory = 'Donate Click - Scroll'
} else if (format === 'web') {
    btn.textContent = 'Donate'
    var eventCategory = 'Donate Click - Meta Tag'
} else if (format === 'list') {
    btn.textContent = 'Donate'
    var eventCategory = 'Donate Click - Tipjar List'
}
btn.addEventListener('click', function () {
    plausible(eventCategory, {
        callback: chrome.tabs.create({ url: generateLink(donateLink) })
    })
})
document.body.appendChild(btn)

// Create text
var caption = document.createElement('div')
if (format === 'list') {
    caption.textContent = 'Link provided by Tipjar'
} else if (format === 'web') {
    caption.textContent = 'Link provided by website'
} else if (format === 'scroll') {
    caption.textContent = 'Scroll code detected on page'
}
document.body.appendChild(caption)