const {JSDOM} = require("jsdom")

function getURLsFromHTML(htmlBody, baseUrl) {
    const url = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === "/") {
            // relative url
            try {
                const urlOjbect = new URL(`${baseUrl}${linkElement.href}`)
                url.push(urlOjbect.href)
            } catch (error) {
                console.log(`Error with relative url ${error}`)
            }
        } else {
            // absolute url
            try {
                const urlOjbect = new URL(linkElement.href)
                url.push(urlOjbect.href)
            } catch (error) {
                console.log(`Error with absolute url ${error}`)
            }
        }
    }
    return url
}

function normalizeUrl(urlString) {
    const urlObject = new URL(urlString)
    const hostPath = `${urlObject.hostname}${urlObject.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML
}