const { JSDOM } = require('jsdom')

async function crawlPage(baseUrl, currentUrl, pages) {

    const baseUrlObj = new URL(baseUrl)
    const currentUrlObj = new URL(currentUrl)

    if (baseUrlObj.hostname !== currentUrlObj.hostname) {
        return pages
    }

    const normalizeCurrentUrl = normalizeString(currentUrl)

    if (pages[normalizeCurrentUrl] > 0) {
        pages[normalizeCurrentUrl]++
        return pages
    }

    pages[normalizeCurrentUrl] = 1

    console.log(`actively crawling ${currentUrl}`)

    try {
        const resp = await fetch(currentUrl)

        if (resp.status > 399) {
            console.log(`error in fetch with status code ${resp.status} on page: ${currentUrl}`)
            return pages
        }

        const contentType = resp.headers.get('content-type')

        if (!contentType.includes('text/html')) {
            console.log(`non html response, content type: ${contentType}, on page: ${currentUrl}`)
            return pages
        }

        const htmlBody = await resp.text()

        const nextUrls = getUrlsFromHtml(htmlBody, baseUrl)

        for (const nextUrl of nextUrls) {
            pages = await crawlPage(baseUrl, nextUrl, pages)
        }

        return pages
    } catch (err) {
        console.log(`error in fetch ${err.message}, on page : ${currentUrl}`)
    }
}

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
    getUrlsFromHtml,
    crawlPage
}