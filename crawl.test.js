const { normalizeString, getUrlsFromHtml } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeUrl strip https', () => {
    const input = 'https://mohammedoucif.blog/path'
    const actual = normalizeString(input)
    const expected = 'mohammedoucif.blog/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip http', () => {
    const input = 'http://mohammedoucif.blog/path'
    const actual = normalizeString(input)
    const expected = 'mohammedoucif.blog/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip trailing slash', () => {
    const input = 'https://mohammedoucif.blog/path/'
    const actual = normalizeString(input)
    const expected = 'mohammedoucif.blog/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl lower capital letters', () => {
    const input = 'https://mohammedoucif.BLOG/path/'
    const actual = normalizeString(input)
    const expected = 'mohammedoucif.blog/path'
    expect(actual).toEqual(expected)
})

test('getUrlsFromHtmls absolute urls', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href='https://mohammedoucif.blog/'>
                    mohammedoucif Blog
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = "https://mohammedoucif.blog"
    const actual = getUrlsFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = ['https://mohammedoucif.blog/']
    expect(actual).toEqual(expected)
})

test('getUrlsFromHtmls relative urls', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href='/path/'>
                    mohammedoucif Blog
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = "https://mohammedoucif.blog"
    const actual = getUrlsFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = ['https://mohammedoucif.blog/path/']
    expect(actual).toEqual(expected)
})

test('getUrlsFromHtmls both url types', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href='https://mohammedoucif.blog/path1/'>
                    mohammedoucif Blog
                </a>

                <a href='/path2/'>
                    mohammedoucif Blog
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = "https://mohammedoucif.blog"
    const actual = getUrlsFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = ['https://mohammedoucif.blog/path1/', 'https://mohammedoucif.blog/path2/']
    expect(actual).toEqual(expected)
})

test('getUrlsFromHtmls invalid', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href='invalid'>
                    Invalid URL
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = "https://mohammedoucif.blog"
    const actual = getUrlsFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = []
    expect(actual).toEqual(expected)
})