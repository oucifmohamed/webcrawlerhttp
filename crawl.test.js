const { normalizeString } = require('./crawl.js')
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