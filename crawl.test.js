const {normalizeUrl, getURLsFromHTML} = require("./crawl.js")
const {test, expect} = require("@jest/globals")

test("normalizeUrl", () => {
    const input = "https://blog.boot.dev/patch"

    const actualOutput = normalizeUrl(input)
    const expected = "blog.boot.dev/patch"
    expect(actualOutput).toEqual(expected)
})

test("ne", () => {
    const input = "https://blog.boot.dev/patch/"

    const actualOutput = normalizeUrl(input)
    const expected = "blog.boot.dev/patch"
    expect(actualOutput).toEqual(expected)
})

test("nek", () => {
    const input = "https://BLOG.boot.dev/patch/"

    const actualOutput = normalizeUrl(input)
    const expected = "blog.boot.dev/patch"
    expect(actualOutput).toEqual(expected)
})

test("nekk", () => {
    const input = "http://BLOG.boot.dev/patch/"

    const actualOutput = normalizeUrl(input)
    const expected = "blog.boot.dev/patch"
    expect(actualOutput).toEqual(expected)
})

test("getURLsFromHTML absolute url", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot Dev Blog
            </a>
        </body>
    </html>
`
    const inputBaseUrl = "https://blog.boot.dev"
    const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actualOutput).toEqual(expected)
})

test("getURLsFromHTML relative url", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot Dev Blog
            </a>
        </body>
    </html>
`
    const inputBaseUrl = "https://blog.boot.dev"
    const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actualOutput).toEqual(expected)
})

test("getURLsFromHTML invalid url", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                invalid
            </a>
        </body>
    </html>
`
    const inputBaseUrl = "https://blog.boot.dev"
    const actualOutput = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
    const expected = []
    expect(actualOutput).toEqual(expected)
})