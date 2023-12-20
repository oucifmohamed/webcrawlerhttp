const { JSDOM } = require('jsdom')

function getUrlsFromHtml(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')

    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) == '/') {
            // Relative URL

            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            // Absolute URL

            try {
                const urlObj = new URL(`${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        }
    }
    return urls
}

function normalizeString(urlString) {
    const url = new URL(urlString)
    const hostPath = `${url.hostname}${url.pathname}`

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }

    return hostPath
}

module.exports = {
    normalizeString,
    getUrlsFromHtml
}