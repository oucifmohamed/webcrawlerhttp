const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {

    if (process.argv.length < 3) {
        console.log('No website provided')
        process.exit(1)
    }

    if (process.argv.length > 3) {
        console.log('Only one website is allowed')
        process.exit(1)
    }

    const baseUrl = process.argv[2]

    console.log(`Starting Crawl of ${baseUrl}`)

    const pages = await crawlPage(baseUrl, baseUrl, {})
    printReport(pages)
}

main()