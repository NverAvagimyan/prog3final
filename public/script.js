//github https://github.com/NverAvagimyan/prog3final
google.charts.load('45', { packages: ['corechart', 'table', 'geochart'] });

google.charts.setOnLoadCallback(drawTable);
google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawColumnChart);


function drawColumnChart() {
    $.ajax({
        url: "/restaurant",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Restaurant');
            data.addColumn('number', 'Rating');

            for (var i = 0; i < jsonData.length; i++) {
                if (parseFloat(jsonData[i].rating) > 96 && parseFloat(jsonData[i].rating) < 99) {
                    data.addRow([
                        jsonData[i].name,
                        parseFloat(jsonData[i].rating),
                    ]);
                }
            }

            var options = {
                title: 'Restaurants',
                hAxis: { title: 'Top 5 Restaurants', titleTextStyle: { color: 'black' } }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
            chart.draw(data, options);

        }

    });

}

function drawPieChart() {
    $.ajax({
        url: "/restaurant",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            w = []
            data.addColumn('string', 'Element');
            data.addColumn('number', 'Numbers');
            for (var i = 0; i < jsonData.length; i++) {
                if (parseFloat(jsonData[i].rating) > 80 && parseFloat(jsonData[i].rating) <= 90)
                    w.push(jsonData[i].rating)
            }
            var count = {};
            w.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
            r = 0;
            for (i in count) {
                data.addRows([
                    [i, count[i]],
                ]);
                r++
            }
            var options = {
                legend: 'right',
                title: 'Ratings for Restaurants',
                is3D: false,
                width: '100%',
                height: '100%'
            };
            //console.log(data.toJSON());
            // Instantiate and draw the chart.
            var chart = new google.visualization.PieChart(document.getElementById('chart_div0'));
            chart.draw(data, options);
        }
    });
}

function drawTable() {
    $.ajax({
        url: "/restaurant",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'name');
            data.addColumn('string', 'tag');
            data.addColumn('string', 'rating');

            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].name,
                    jsonData[i].tag,
                    jsonData[i].rating,
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            /*var formatter = new google.visualization.BarFormat({ width: 100 });
            formatter.format(data, 3); // Apply formatter to 3rd column*/
            table.draw(data, options);
        }
    });
}

$(window).resize(function () {
    drawPieChart();
    drawColumnChart();
    /*drawAreaChart();
    drawRegionsMap();*/
    drawTable();
});
