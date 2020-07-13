const useragent = navigator.userAgent
const review = document.querySelector('.review-info')

// Add version number to welcome page
document.querySelector('.version').innerHTML = chrome.runtime.getManifest().version

// Button links
document.querySelectorAll('.link-btn').forEach(function (el) {
	el.addEventListener('click', function () {
		chrome.tabs.create({ url: el.getAttribute('data-url') })
	})
})

// Hide Chrome warning on non-Chrome browsers
if (useragent.includes('OPR') || useragent.includes('Firefox')) {
	document.querySelector('.chrome-icon-warning').style.display = 'none'
}

// Show instructions for leaving a review based on the browser being used
/* This code will be used after the extension is published
if (useragent.includes("OPR")) {
	review.innerHTML = 'Leaving a review on the <a href="https://addons.opera.com/en/extensions/details/wikipedia-search/" target="_blank">Opera add-ons site</a> is also greatly appreciated!'
} else if (useragent.includes("Firefox")) {
  review.innerHTML = 'Leaving a review on the <a href="https://addons.mozilla.org/en-US/firefox/addon/noplugin/" target="_blank">Firefox add-ons site</a> is also greatly appreciated!'
} else if (useragent.includes("Chrome")) {
	review.innerHTML = 'Leaving a review on the <a href="https://chrome.google.com/webstore/detail/wikipedia-search/lipakennkogpodadpikgipnogamhklmk" target="_blank">Chrome Web Store</a> is also greatly appreciated!'
}
*/