const se_scraper = require('se-scraper');

(async () => {
    let browser_config = {
        debug_level: 1,
        output_file: 'data/google_results.json',
        proxy: 'socks5://127.0.0.1:10808',
    };

    let scrape_job = {
        search_engine: 'google',
        keywords: ['新冠肺炎','丁香园'],
        num_pages: 1,
        google_settings: {
            gl: '', // The gl parameter determines the Google country to use for the query.
            hl: 'zh-CN', // The hl parameter determines the Google UI language to return results.
            start: 0, // Determines the results offset to use, defaults to 0.
            num: 20, // Determines the number of results to show, defaults to 10. Maximum is 100.
        },
    };

    var scraper = new se_scraper.ScrapeManager(browser_config);
    await scraper.start();

    var results = await scraper.scrape(scrape_job);
    console.dir(results, {depth: null, colors: true});
    await scraper.quit();
})();