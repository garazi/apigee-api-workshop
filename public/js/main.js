function addReview() {
    var payload = {
        title: $('#form-title').val(),
        reviewer: $('#form-email').val(),
        rating: Number($('#form-rating').val()),
        body: $('#form-desc').val(),
        restID: Number($('#form-uuid').val())
    }
    $.ajax({
        url: "../reviews",
        type: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        data: JSON.stringify(payload),
        statusCode: {
            403: function () {
                alert("You are limited to 2 reviews an hour");
                window.location = "/";
            }
        }
    })
        .done(function(result) {
            var receipt = JSON.parse(result);
            console.log(receipt)
            if (receipt.error) {
                alert("You are limited to 2 reviews an hour");
                window.location = "/";
            } else {
                window.location = "../details/" + receipt.entities[0].restID;
            }
            
        })
}

$(function() {
    console.log('document ready')

    // $('#form-add-item').on('click', '#btn-submit', function() {
    //     console.log('got it')
    //     addReview();
    //     return false;
    // });

})