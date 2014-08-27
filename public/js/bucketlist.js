var loadBucketList;

var client = new Apigee.Client({
    orgName: 'garazi',
    appName: 'sandbox'
});

var masterList = new Apigee.Collection({
    "client": client,
    "type": "bucketlists",
    "qs": {
        limit: 200,
        "ql": "order by name asc"
    }
});

var myBucketList = new Apigee.Collection({
    "client": client,
    "type": "mylist",
    "qs": {
        limit: 200,
        "ql": "order by name asc"
    }
});

function addEntry(e) {
    var props = {
        "client": client,
        "data": {
            'type': 'mylist',
            'name': e.name,
            'location': e.loc,
            'picture': '',
            'desc': e.desc
        }
    };
    var entry = new Apigee.Entity(props);
    entry.save(function(error, response) {
        console.log("error: " + error);
        console.log("response: " + response);
        if (response) {
            loadBucketList();
        }
    });
}

function showGoogleMap(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    var options = {
        zoom: 11,
        center: latlng,
        disableDefaultUI: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: true
    };
    var map = new google.maps.Map(document.getElementById('detail-map'), options);
}

$(function() {
    var my_items = [];
    masterList.fetch(function() {
        $('#inspirelist').empty();
        while (masterList.hasNextEntity()) {
            var current_item = masterList.getNextEntity();
            my_items.push('<li data-theme="c" data-uuid=' + current_item.get('uuid') + '>' +
                current_item.get('name') + '</li>'
            );
        }
        $('#inspirelist').append(my_items.join(""));

        $('#inspirelist').listview('refresh');
        
    }, function() {
        alert("Oops! An error occured.");
    });

    loadBucketList = function() {
        myBucketList.fetch(function() {
            $('#bucketlist').empty();
            var my_items = [];
            while (myBucketList.hasNextEntity()) {
                var current_item = myBucketList.getNextEntity();
                my_items.push('<li data-theme="c"><a href="#page-add" data-transition="slide" data-uuid=' + current_item.get('uuid') + '>' +
                    current_item.get('name') + '</a></li>'
                );
            }
            $('#bucketlist').append(my_items.join(""));
            $('#bucketlist').listview('refresh');

        }, function() {
            alert("Oops! An error occured.");
        });
    };

    $('#inspirelist').on('click', 'li', function(e) {
        // $('#detail-map').html('');
        // $('#detail-image img').attr('src', '');
        // $('.hideaway').removeClass('hideaway');
        // $('#btn-done').addClass('hideaway');
        
        var options = {
            "type": "bucketlist",
            "uuid": e.target.getAttribute('data-uuid')
        };
        client.getEntity(options, function(error, response) {
            var lat = response.get('lat');
            var lon = response.get('lon');
            var title = response.get('name');
            var desc = response.get('desc');
            // var pict = response.get('picture');
            // if (lat) {
            //     showGoogleMap(lat, lon);
            // } else {
            //     $('#detail-map').addClass('hideaway');
            // }
            // if (pict) {
            //     $('#detail-image img').attr('src', pict);
            // } else {
            //     $('#detail-image').addClass('hideaway');
            // }
            // window.location = "#mylist";
        });
    });
    $('#contentlist').on('click', 'li', function (e) {
        window.location = "#page-add";
        var options = {
            "type": "mylist",
            "uuid": e.target.getAttribute('data-uuid')
        };
        client.getEntity(options, function(error, response) {
            var title = response.get('name');
            var desc = response.get('desc');
            $('#form-title').val(title);
            $('#form-desc').val(desc);
            
        });
        return false;
    })
    $('#form-add-item').on('click', '#btn-submit', function() {
        var item = {};
        item.name = $('#form-title').val();
        item.desc = $('#form-desc').val();
        addEntry(item);
    });
    $('#form-add-item').on('click', '#btn-cancel', function () {
        $('#form-title').val('');
        $('#form-desc').val('');
        history.back();
    });
    $('#page-add').on('click', '#btn-done', function () {
        $('#form-title').val('');
        $('#form-desc').val('');
        history.back();
        return false;
    })

    loadBucketList();
});