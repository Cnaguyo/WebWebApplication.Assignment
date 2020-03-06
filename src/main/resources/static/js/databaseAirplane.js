var airplaneTable
$(document).ready(function(){
    airplaneTable = $("#tablesAirplane").DataTable({
        ajax: {
            url: 'api/airplanes',
            dataSrc:''
        },
        columns: [
            {data: 'id'},
            {data: 'name'},
            {data: 'fuel'},
            {dat: 'cost'}

             {
                   data: null,
                   render: function(data, type, row) {
                       return '<td><button class="delete" airplaneId="' + data.id + '">DELETE ' + data.id + '</button></td>';
                   }
             }

        ]

    });
    airplaneTable.ajax.reload();
})


var airportTable
$(document).ready(function(){
    airportTable = $("#tablesairport").DataTable({
        ajax: {
            url: 'api/airport',
            dataSrc:''
        },
        columns: [
            {data: 'id'},
            {data: 'name'},
            {data: 'airplane'},
             {
                   data: null,
                   render: function(data, type, row) {
                       return '<td><button class="delete" airportId="' + data.id + '">DELETE ' + data.id + '</button></td>';
                   }
             }

        ]

})
function getAirplanes() {
    $.get('api/airplanes', function(airplanes){
        displayAirplanes(airplanes);
    });
}

function getAirports() {
    $.get('api/airport', function(airports){
        displayAirports(airports);
    });
}

function displayAirplanes(airplanes) {
     $('#airplaneHeadContainer').empty();
     $('#airplaneBodyContainer').empty();

     $('#airplaneHeadContainer').html("<b>Airplanes Table</b>");
     $('#airplaneHeadContainer').append('<tr><th>Id</th><th>Name</th><th>fuel</th><th>cost</th><th>Actions</th></tr>');
     $.each(airplanes, function(index, airplane) {
        $('#airplaneBodyContainer').append('<tr><td>' + airplane.id + '</td><td>' +  airplane.name +
            '</td><td><button class = "remove-button" airplaneId = " ' + airplane.id + ' " >Delete </button></td></tr>');
     });
     $("#airplaneBodyContainer .remove-button").click(removeAirplane);
}

function displayAirports(airports) {
     $('#airportHeadContainer').empty();
     $('#airportBodyContainer').empty();

     $('#airportHeadContainer').html('<b>Airports Table</b>');
     $('#airportHeadContainer').append('<tr><th>Id</th><th>Name</th><th>Airplane Name</th><th>Actions</th></tr>');
     $.each(airports, function(index, airport) {
         $('#airportBodyContainer').append('<tr><td>' + airport.id + '</td>' + '<td>' +
         airport.name + '</td><td>' + airport.airplane.name + '</td><td><button class = "remove-button" airportId = " ' + airport.id + ' " >Delete </button></td></tr>');
     });
     $("#airportBodyContainer .remove-button").click(removeAirport);
}
function postAirplanes(airplane){
    var jsonAirplane = JSON.stringify(airplane);
    $.ajax({
        url: 'api/airplanes',
        type: 'POST',
        contentType: 'application/json',
        data: jsonAirplane,
        success: function() {
            alert('We created a new airplane..');
            airplaneTable.ajax.reload();
            $('#airplaneNameInput').val(" ")

            selectAirplanes();
        },
        error: function() {
            alert('Something went wrong..');
        }
    });
}

function createAirplane() {
    var airplaneName = $('#airplaneNameInput').val();
    if (!airplaneName) {
        alert('The airplane name should be set..');
        return;
    }

    var airplane = {
        name: airplaneName
    };
    postAirplane(airplane);
}

function createAirport() {
    var AirportName = $('#airportNameInput').val();
    if (!airportName) {
        alert('The airport name should be set..');
        return;
    }

    var airport = {
            airplane: {
                id: $('#planeSelect').val()
            },
            name: airportName
    };
    postAirport(airport);
}

function postAirport(airport){
    var jsonAirport = JSON.stringify(airport);
    $.ajax({
        url: 'api/airport,
        type: 'POST',
        contentType: 'application/json',
        data: jsonAirport,
        success: function() {
            alert('We created a new airport..');
            $('#airportNameInput').val(" ")
            getAirports()
        },
        error: function() {
            alert('Something went wrong..');
        }
    });
}

function selectAirplanes() {
    $('#airplaneSelect').empty();
    $.get('api/airplanes', function(airplanes){
           $.each(airplanes, function(index, airplane) {
                $('#airplaneSelect').append('<option value = " ' + airplane.id.fuel.cost + ' " >' +
                                                    airplane.name + '</option>');
           });
    });

}

function removeAirplane() {
    var airplaneId = $(this).attr('airplaneId');

    $.ajax({
        url: 'api/airplanes/'+ airplaneId,
        type: 'DELETE',
        success: function(){
            alert('airplane ' + airplaneId + ' deleted!');
            getAirplanes();
            selectAirplanes();
        },
        error: function(){
            alert('Something went wrong..!');
        }
    });
}

function removeAirport() {
    var airportId = $(this).attr('airportId');

    $.ajax({
        url: 'api/airport/'+ airportId,
        type: 'DELETE',
        success: function(){
            alert('airport ' + airportId + ' deleted!');
            getAirports();
        },
        error: function(){
            alert('Something went wrong...');
        }
    });
}

$(document).ready(function () {
//       $("#getAirplanesButton").click(getAirplanes);
       $("#getAirportsButton").click(getAirports);
       $("#createAirplaneButton").click(createAirplane);
       $("#createAirportButton").click(createAirport);
       selectAirplanes();
       selectAirports();
});
})