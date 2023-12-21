const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

test('sortPages', () => {
    const input = {
        'https://mohammedoucif.blog/path': 1,
        'https://mohammedoucif.blog': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://mohammedoucif.blog', 3],
        ['https://mohammedoucif.blog/path', 1]
    ]
    expect(actual).toEqual(expected)
})