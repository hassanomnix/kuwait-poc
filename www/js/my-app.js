// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

//We can also add callback for all pages:
myApp.onPageInit('*', function (page) {
    console.log(page.name + ' initialized');
});




// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;

function createContentPage() {
    mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
    return;
}




var pictureSource; // picture source
var destinationType; // sets the format of returned value 
// Wait for PhoneGap to connect with the device
//
var config = {
   enableHighAccuracy: true,
   timeout: 20000,
   maximumAge: 18000000
}

document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap is ready to be used!
//
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    console.log('navigator: ' , navigator);
    //navigator.geolocation.getCurrentPosition(maponSuccess, maponError,config);
    navigator.geolocation.getCurrentPosition(maponSuccess, maponError,  {enableHighAccuracy: true,maximumAge:60000, timeout: 5000});
}
// Called when a photo is successfully retrieved
//

function maponSuccess(position){
     alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    console.log(position);
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var latLong = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
        center: latLong,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
          position: latLong,
          map: map,
          title: 'my location'
      });
}

function maponError(error){
    alert("the code is " + error.code + ". \n" + "message: " + error.message);
}

function onPhotoFileSuccess(imageData) {
    // Get image handle
    //console.log(JSON.stringify(imageData));

    // Get image handle
    //
    var largeImage = document.getElementById('largeImage');
    // Unhide image elements
    //
    largeImage.style.display = 'block';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = imageData;
}


function capturePhotoWithFile() {
    navigator.camera.getPicture(onPhotoFileSuccess, onFail, {
        quality: 75,
        encodingType: Camera.EncodingType.JPEG,
        destinationType: Camera.DestinationType.FILE_URI,
        correctOrientation: true
    });
}


// Called if something bad happens.
// 
function onFail(message) {
    //    alert('Failed because: ' + message);
}