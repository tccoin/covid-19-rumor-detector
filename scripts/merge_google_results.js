const fs = require('fs');
(async () => {
    let output = [
        ['keyword', 'title', 'summary', 'link', 'visible_link', 'date', 'rank']
    ];
    let writeStream = fs.createWriteStream('../data/Google_rumors.csv');
    for (let i = 0; i < 28; i++) {
        obj = JSON.parse(fs.readFileSync('../data/google_results/' + i + '.json', 'utf8'));
        for (let keyword of Object.keys(obj)) {
            for (let result of obj[keyword]["1"]["results"]) {
                output.push([
                    keyword,
                    result['title'].replace(/,/g, '，'),
                    result['snippet'].replace(/,/g, '，').replace(/\n/g, '。'),
                    result['link'].replace(/,/g, '，'),
                    result['visible_link'].replace(/,/g, '，'),
                    result['date'],
                    result['rank']
                ]);
            }
        }
    }
    for (let row of output) {
        writeStream.write(row.join(',') + '\n');
    }
    writeStream.end();

})();