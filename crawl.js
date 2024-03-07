const {JSDOM} = require("jsdom")

async function crawlPage(currentUrl) {
    console.log(`Actively crawling: ${currentUrl}`)

    try {
        const resp = await fetch(currentUrl)

        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page ${currentUrl}`)
            return 
        }
        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type ${contentType} on page: ${currentUrl}`)
            return 
        }

        console.log(await resp.text())
    } catch (error) {
        console.log(`error in fecth: ${error.message}, on page: ${currentUrl}`)
    }

}

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
    getURLsFromHTML,
    crawlPage
}