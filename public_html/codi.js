$(document).ready(function(){
    updates = 0;
    //alert(updates.length);
    insert = setInterval(peticioAjax,5000);

    $("#change").click(function() {
        
    });
    $("#stop").click(function() {
        type = 0;
        updateBudget();
    });
    $("#rep").click(function() {
        type = 0;
        updateBudget();
    });
    peticioAjax();
    //insert = setInterval(peticioAjax,5000);
});

function peticioAjax(){
    var url = 'https://cors.io/?http://wservice.viabicing.cat/v2/stations?format=json';
    $.getJSON(url, function(dades) { 
            var last = false;
            if (updates == 0){
                updates=dades.updateTime;
            } else {
                if (updates == dades.updateTime){
                    last = true;
                }
            }
            
            if (last == false){
                updates=dades.updateTime;
                //var station = new Array();
                
                $(document.body).append('<p id=\''+dades.updateTime+'\'></p><br>');
                $('#'+dades.updateTime).append('<p>Nova actualitzacio <b>'+dades.updateTime+'</b></p>');
                /*station[dades.updateTime]['bikeEst']=0;
                station[dades.updateTime]['bikeDisp']=0;
                station[dades.updateTime]['bikeSlot']=0;
                station[dades.updateTime]['bikeElEst']=0;
                station[dades.updateTime]['bikeElDisp']=0;
                station[dades.updateTime]['bikeDisp']=0;*/
                var bikeEst=0;
                var bikeDisp=0;
                var bikeSlot=0;
                var bikeElEst=0;
                var bikeElDisp=0;
                var bikeElSlot=0;
                for (var i=0; i<dades.stations.length; i++) {
                    if (dades.stations[i].type=="BIKE"){
                        bikeEst++;
                        //station['bikeEst']++;
                        bikeDisp+=parseInt(dades.stations[i].bikes);
                        bikeSlot+=parseInt(dades.stations[i].slots);
                    } else {
                        bikeElEst++;
                        bikeElDisp+=parseInt(dades.stations[i].bikes);
                        bikeElSlot+=parseInt(dades.stations[i].slots);
                    }
                }
                //station['bikeEst']=dades.updateTime;
                $('#'+dades.updateTime).append('<p>Tipus BIKE: hi ha <b>'+bikeEst+'</b> estacions amb <b>'+bikeDisp+'</b> bicis disponibles i <b>'+bikeSlot+'</b> slots lliures</p>');
                $('#'+dades.updateTime).append('<p>Tipus BIKE-ELECTRIC: hi ha <b>'+bikeElEst+'</b> estacions amb <b>'+bikeElDisp+'</b> bicis disponibles i <b>'+bikeElSlot+'</b> slots lliures</p>');
                /*dades.forEach( function(element) {
                    station.push('<div>'+element+'</div>')
                });*/
                //alert(dades.stations.length);
                 $(document.body).append('<div id="chart_div"></div>');
//---------------------------Google Chart-----------------------------------
                // Load the Visualization API and the corechart package.
                google.charts.load('current', {'packages':['corechart']});

                // Set a callback to run when the Google Visualization API is loaded.
                google.charts.setOnLoadCallback(function(){
                    // Create the data table.
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', 'Topping');
                    data.addColumn('number', 'Slices');
                    data.addRows([
                      ['BIKE', bikeEst],
                      ['BIKE-ELECTRIC', bikeElEst],
                    ]);

                    // Set chart options
                    var options = {'title':'Quantitat d\'estacions per tipus',
                                   'width':600,
                                   'height':500};

                    // Instantiate and draw our chart, passing in some options.
                    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                    chart.draw(data, options);
                });
            }
        });
}