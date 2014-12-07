/**
 * Created by Travis on 11/28/2014.
 */
$(function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(pos){
            var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;
            var url = 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDCSXNtDdcEe1ZqU2ZcODV-WjBgN0YvsbA&origin='+lat+'+'+lng+'&destination=2427+North+Stevens+Street+Spokane+WA+99205&avoid=tolls|highways&mode=driving';
            $('#gmap').attr('src', url);
        });
    }



    var favorite = {
        toppings: [],
        crust: [],
        drinks: []
    };
    if (localStorage.favoriteOrder){
        favorite = JSON.parse(localStorage.favoriteOrder);
        for(var i= 0; i<favorite.toppings.length; i++){
            $("#toppings").append('<li>' + favorite.toppings[i] + '</li>');
        }
        for(var i= 0; i<favorite.crust.length; i++){
            $("#crust").append('<li>' + favorite.crust[i] + '</li>');
        }
        for(var i= 0; i<favorite.drinks.length; i++){
            $("#drinks").append('<li>' + favorite.drinks[i] + '</li>');
        }
    }
    $("[data-role='footer']").append('<a href="#contact" class="ui-btn">Call Us</a>');

    $(document).on("click", "#show", function(e){
        e.preventDefault();
        $("#order-view").slideToggle();
    }).on("click", "#add", function(e){
        favorite = {
            toppings: [],
            crust: [],
            drinks: []
        };
        $("#toppings, #crust, #drinks").html("");
        $("#menu").find("input").each(function(){
            switch($(this).prop("type")){
                case "checkbox":
                case "radio":
                    if ($(this).prop("checked")){
                        if ($(this).data("ingredient") == "topping"){
                            $("#toppings").append('<li>' + $(this).val() + '</li>');
                            favorite.toppings.push($(this).val());
                        }else if ($(this).data("ingredient") == "crust"){
                            $("#crust").append('<li>' + $(this).val() + '</li>');
                            favorite.crust.push($(this).val());
                        }
                    }
                    break;
                default:
                    if ($(this).val() > 0){
                        $("#drinks").append('<li>' + $(this).prop("name") + ' <span class="lower">x</span>' + $(this).val() + '</li>');
                        favorite.drinks.push($(this).prop("name") + ' x' + $(this).val());
                    }
                    break;
            }
        });
        $("#show").trigger("click");
    }).on("click", "#save", function(e) {
        e.preventDefault();
        if(typeof(Storage) !== "undefined") {
            localStorage.favoriteOrder = JSON.stringify(favorite);
        } else {
            alert("Sorry! No Web Storage support..");
        }

    }).on("click", "#submit", function(e){
        e.preventDefault();
        $.ajax({
            url: "http://217-mobile.travisjgreen.com/mailer.php",
            type: "POST",
            data: {order: JSON.stringify(favorite)},
            success: function(data){
                navigator.notification.beep(2);
                navigator.notification.alert(data);
            }
        })
    })
});

