const fs = require('fs');
(async () => {
    let output = [
        ['keyword', 'title', 'summary', 'link', 'visible_link', 'date', 'rank']
    ];
    let writeStream = fs.createWriteStream('./data/Google_rumors.csv');
    keyword_dict = {'南京封城、封路':[]}
    for (let i = 0; i < 28; i++) {
        obj = JSON.parse(fs.readFileSync('./data/google_results/' + i + '.json', 'utf8'));
        for (let keyword of Object.keys(obj)) {
            // if('南京封城、封路' in keyword_dict){console.log('!!!')}
            // if(keyword=='南京封城、封路'){console.log('!!!')}
            keyword_dict[keyword] = obj[keyword]["1"]["results"];
        }
    }
    for (let keyword of Object.keys(keyword_dict)) {
        for(let result of keyword_dict[keyword]){
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
    for (let row of output) {
        writeStream.write(row.join(',') + '\n');
    }
    writeStream.end();

})();