// Function for generating donate link with tracking attributes
function generateLink(link) {
    var url = new URL(link)
    // This lets sites know that you found the donate link through Tipjar
    url.searchParams.set('utm_source', 'Tipjar Extension (github.com/corbindavenport/tipjar)')
    url.searchParams.set('utm_medium', 'Browser')
    url.searchParams.set('utm_campaign', 'None')
    return url.href
}

// Parse input
const params = (new URL(document.location)).searchParams
const donateLink = params.get('link')
const source = params.get('source')
const siteHostname = params.get('hostname')

// Create button
var btn = document.createElement('button')
if (source === 'scroll') {
    btn.textContent = 'Support with Scroll'
    var eventCategory = 'Donate Click (Scroll)'
} else if (source === 'web') {
    btn.textContent = 'Donate'
    var eventCategory = 'Donate Click (Meta Tag)'
} else if (source === 'list') {
    btn.textContent = 'Donate'
    var eventCategory = 'Donate Click (Tipjar List)'
}
btn.addEventListener('click', function () {
    ga('send', {
        hitType: 'event',
        eventCategory: eventCategory,
        eventAction: siteHostname,
        hitCallback: chrome.tabs.create({ url: generateLink(donateLink) })
    })
})
document.body.appendChild(btn)

// Create text
var caption = document.createElement('div')
if (source === 'list') {
    caption.textContent = 'Link provided by Tipjar'
} else if (source === 'web') {
    caption.textContent = 'Link provided by website'
} else if (source === 'scroll') {
    caption.textContent = 'Scroll code detected on page'
}
document.body.appendChild(caption)

// Load Google Analytics
window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) }; ga.l = +new Date
ga('create', 'UA-59452245-8', 'auto')
ga('set', 'checkProtocolTask', function(){}) // Removes failing protocol check: http://stackoverflow.com/a/22152353/1958200
ga('require', 'displayfeatures')
ga('send', 'pageview', 'popup.html')