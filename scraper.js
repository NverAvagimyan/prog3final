var scrapeIt = require("scrape-it");
var jsonfile = require('jsonfile');

var file = 'scraping.json';


scrapeIt("https://www.menu.am/restaurant/type.html", {
    restaurant: {
        listItem: "div.restaurants_grid > div.odd",
        data: {
            name: ".list-title > a",
            url: {
                selector: "a"
                , attr: "href"
            },
            tag: ".list-title > span",
            rating: {
                selector: ".list-rate div>.fl",
                attr: "style",
                convert: function (x) {
                    var re = /width: (\d*\.?\d*)/i;
                    if (re.test(x)) {
                        var found = x.match(re);
                        console.log(found[1]);
                        return found[1];
                    } else {
                        return "";
                    }
                }
            }
        }
    }



}).then(function (page) {
    console.log(page);
    jsonfile.writeFile(file, page, { spaces: 2 }, function (err) {
        console.error(err);
    });
});