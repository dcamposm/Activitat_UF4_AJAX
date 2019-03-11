$(document).ready(function(){
    updates = 0;
    //alert(updates.length);
    insert = setInterval(peticioAjax,5000);
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
            }
        });
}
