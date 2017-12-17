var resume, locationMap, googleMap = '<div id="map"></div>';

var MapWithMarkers = function() {
    "use strict";

    var map; // declares a global map variable

    function initializeMap() {

        var locations;

        var mapOptions = {
            disableDefaultUI: true
        };

        map = new google.maps.Map(document.querySelector('#map'), mapOptions);

        /*
        locationFinder() returns an array of every location string from the JSONs
        written for bio, education, and work.
        */
        function locationFinder() {

            // initializes an empty array
            var locations = [];

            locations.push(resume.bio.contacts[4].name);

            locations.push(resume.education().schools()[0].location);

            // iterates through work locations and appends each location to
            // the locations array. Note that forEach is used for array iteration
            // as described in the Udacity FEND Style Guide:
            // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop

            resume.jobs().forEach(function(job) {
                locations.push(job.location);
            });

            return locations;
        }

        /*
        createMapMarker(placeData) reads Google Places search results to create map pins.
        placeData is the object returned from search results containing information
        about a single location.
        */
        function createMapMarker(placeData) {

            // The next lines save location data from the search result object to local variables
            var lat = placeData.geometry.location.lat(); // latitude from the place service
            var lon = placeData.geometry.location.lng(); // longitude from the place service
            var name = placeData.formatted_address; // name of the place from the place service
            var bounds = window.mapBounds; // current boundaries of the map window

            // marker is an object with additional data about the pin for a single location
            var marker = new google.maps.Marker({
                map: map,
                position: placeData.geometry.location,
                title: name,
                animation: google.maps.Animation.DROP
            });

            // infoWindows are the little helper windows that open when you click
            // or hover over a pin on a map. They usually contain more information
            // about a location.
            var infoWindow = new google.maps.InfoWindow({
                content: name
            });

            // hmmmm, I wonder what this is about...
            google.maps.event.addListener(marker, 'click', function() {
                populateInfoWindow (map, marker);
            });

            // this is where the pin actually gets added to the map.
            // bounds.extend() takes in a map location object
            bounds.extend(new google.maps.LatLng(lat, lon));
            // fit the map to the new marker
            map.fitBounds(bounds);
            // center the map
            map.setCenter(bounds.getCenter());
        }

        /*
        callback(results, status) makes sure the search returned results for a location.
        If so, it creates a new map marker for that location.
        */
        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                createMapMarker(results[0]);
            }
        }

        /*
        pinPoster(locations) takes in the array of locations created by locationFinder()
        and fires off Google place searches for each location
        */
        function pinPoster(locations) {

            // creates a Google place search service object. PlacesService does the work of
            // actually searching for location data.
            var service = new google.maps.places.PlacesService(map);

            // Iterates through the array of locations, creates a search object for each location
            locations.forEach(function(place) {
                // the search request object
                var request = {
                    query: place
                };

                // Actually searches the Google Maps API for location data and runs the callback
                // function with the search results after each search.
                service.textSearch(request, callback);
            });
        }

        // Sets the boundaries of the map based on pin locations
        window.mapBounds = new google.maps.LatLngBounds();

        // locations is an array of location strings returned from locationFinder()
        locations = locationFinder();

        // pinPoster(locations) creates pins on the map for each location in
        // the locations array
        pinPoster(locations);

    }

    // Calls the initializeMap() function when the page loads
    window.addEventListener('load', initializeMap);

    // Vanilla JS way to listen for resizing of the window
    // and adjust map bounds
    window.addEventListener('resize', function(e) {
        //Make sure the map bounds get updated on page resize
        map.fitBounds(mapBounds);
    });

    var infoWin = new google.maps.InfoWindow();

    function populateInfoWindow (map, marker) {
            // Check to make sure the infoWin is not already opened on this marker.
            if (infoWin.marker !== marker) {
                // Clear the infoWin content to give the streetview time to load.
                infoWin.setContent('');
                infoWin.marker = marker;
                // Make sure the marker property is cleared if the infoWin is closed.
                infoWin.addListener('closeclick', function() {
                    infoWin.marker = null;
                });
            }

            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                window.setTimeout(function(){
                    marker.setAnimation(null);
                }, 1400);
            }

            infoWin.setContent('<strong class="infoHeader">' + infoWin.marker.title + '</strong>');

            infoWin.open(map, marker);
    }
};

var Resume = function() {
    "use strict";
    var self = this;

    this.initializeJobs = function(){
        var firstJob = new WorkLocation({
            "title": "Software Developer",
            "employer": "Financial Sciences",
            "dates": "2/2005 - Current",
            "location": "Jersey City, NJ",
            "description": "I'm a full stack web developer who spends much of his time developing and enhancing applications and technical processes. Overall, I've worked on functional development and implementation of trade managers and reporting tools as part of fixed income, market data and cash management applications. My primary skills are Javascript, HTML, CSS, SQL and Java.",
            "url": "http://www.fisci.com"
        });

        var secondJob = new WorkLocation({
            "title": "Software Developer Intern",
            "employer": "Hertz",
            "dates": "1/2003 - 9/2003",
            "location": "Park Ridge, NJ",
            "description": "Updated and maintained company intranet and internet sites using Coldfusion, HTML, CSS, and JS.",
            "url": "http://www.hertz.com"
        });

        var thirdJob = new WorkLocation({
            "title": "Capacity Planning Intern",
            "employer": "Citigroup",
            "dates": "5/2002 - 9/2002",
            "location": "Weehawken, NJ",
            "description": "Created and maintained company intranet and site using Coldfusion, HTML, CSS, and JS.",
            "url": "http://www.citigroup.com"
        });

        var fourthJob = new WorkLocation({
            "title": "Continuity of Business Intern",
            "employer": "Citigroup",
            "dates": "8/2001 - 12/2001",
            "location": "Englewood Cliffs, NJ",
            "description": "Maintained documentation, and handled reporting for weekly disaster recovery meetings.",
            "url": "http://www.citigroup.com"
        });

        this.jobs = ko.observableArray([firstJob, secondJob, thirdJob, fourthJob]);
    };

    var WorkLocation = function(info) {
        this.title = ko.observable(info.title);
        this.employer = ko.observable(info.employer);
        this.jobTitle = ko.computed(function(){
                return this.title() + " - " + this.employer();
        }, this);
        this.dates = info.dates;
        this.location = info.location;
        this.description = info.description;
        this.url = info.url;
    };

    this.initializeProjects = function(){
        var firstProject = new Project({
            "title": "Build a Portfolio Site",
            "dates": "2017",
            "description": "A site to display all my projects.",
            "images": ["images/website-210.png"],
            "url":"https://github.com/jchaplin2/website"
        });

        var secondProject = new Project({
            "title": "Interactive Resume",
            "dates": "2017",
            "description": "An online resume",
            "images": ["images/resume-210.png"],
            "url":"https://github.com/jchaplin2/resume"
        });

        var thirdProject = new Project({
            "title": "Classic Arcade Game Clone",
            "dates": "2017",
            "description": "A clone of a classic arcade game.",
            "images": ["images/frogger-210.png"],
            "url":"https://github.com/jchaplin2/frontend-nanodegree-arcade-game"
        });

        var fourthProject = new Project({
            "title": "Website Optimization",
            "dates": "2017",
            "description": "Optimizing my portfolio site.",
            "images": ["images/mobileportfolio-210.png"],
            "url":"https://github.com/jchaplin2/frontend-nanodegree-mobile-portfolio"
        });

        var fifthProject = new Project({
            "title": "Neighborhood Map",
            "dates": "2017",
            "description": "A map of my travels.",
            "images": ["images/worldmap-210.png"],
            "url":"https://github.com/jchaplin2/frontend-nanodegree-map"
        });

        var sixthProject = new Project({
            "title": "Feed Reader Testing",
            "dates": "2017",
            "description": "Jasmine test cases.",
            "images": ["images/feedreader-210.png"],
            "url":"https://github.com/jchaplin2/frontend-nanodegree-feedreader"
        });

        this.projects = ko.observableArray([firstProject, secondProject, thirdProject, fourthProject, fifthProject, sixthProject]);
    };

    var Project = function(info) {
        this.title = info.title;
        this.dates = info.dates;
        this.description = info.description;
        this.images = info.images;
        this.url=info.url;
    };

    this.initializeEducation = function() {
        var firstCollege = new College({
            "name": "Stevens Institute of Technology",
            "degree": "Bachelor's of Science",
            "majors": ["Computer Science"],
            "dates": "1999 - 2005",
            "location": "Hoboken, NJ",
            "url": "http://www.stevens.edu"
        });

        var firstOnlineCourse = new OnlineCourse({
            "name": "Front End Web Developer Nanodegree",
            "school": "Udacity",
            "dates": "2017",
            "url": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
        });

        var secondOnlineCourse = new OnlineCourse({
            "name": "Dive Deeper Into CSS",
            "school": "Noble Desktop",
            "dates": "2016",
            "url": "https://www.nobledesktop.com/classes/web-development-level2"
        });

        var schools = ko.observableArray([firstCollege]);
        var onlineCourses = ko.observableArray([firstOnlineCourse, secondOnlineCourse]);
        this.education = ko.observable({
            "schools" : schools,
            "onlineCourses": onlineCourses
        });
    };

    var College = function(info) {
        this.name = ko.observable(info.name);
        this.degree = ko.observable(info.degree);
        this.title = ko.computed(function(){
                return this.name() + " - " + this.degree();
        }, this);
        this.majors = info.majors;
        this.dates = info.dates;
        this.location = info.location;
        this.url = info.url;
    };

    var OnlineCourse = function(info) {
        this.name = ko.observable(info.name);
        this.school = ko.observable(info.school);
        this.title = ko.computed(function(){
                return this.name() + " - " + this.school();
        }, this);
        this.dates = info.dates;
        this.url = info.url;
    };

    this.initializeBio = function(){
        var bio = new Bio({
            "name": "Jonathan Chaplin",
            "role": "Front-End Web Developer",
            "welcomeMessage": "My Resume",
            "biopic":"images/jonathan_chaplin.jpg"
        });

        this.bio = bio;
    };

    var Bio = function(info) {
        this.name = ko.observable(info.name);
        this.role = ko.observable(info.role);
        this.welcomeMessage = ko.observable(info.welcomeMessage);
        this.biopic = ko.observable(info.biopic);
        this.languages = ko.observableArray([
            "HTML",
            " JavaScript",
            " CSS",
            " Java",
            " SQL"
        ]);
        this.libraries = ko.observableArray([
            " jQuery",
            " Knockout",
            " Backbone",
            " Bootstrap",
            " Jasmine",
            " Grunt"
        ]);
        this.other = ko.observableArray([
            " AJAX",
            " Responsive Design",
            " Unix",
            " Linux",
            " TDD / BDD",
            " Windows 10",
            " Oracle 11g",
        ]);
        this.versionControl = ko.observableArray([
            "Git",
            " CVS"
        ]);
        this.editors = ko.observableArray([
            "Sublime Text"
        ]);
        this.contacts = [
            {"name" : "jchaplin@gmail.com", "url":"mailTo:jchaplin@gmail.com", "className":"flex-item zocial-gmail"},
            {"name" : "jchaplin2", "url":"https://twitter.com/jchaplin2", "className":"flex-item zocial-twitter"},
            {"name" : "jchaplin2", "url":"https://github.com/jchaplin2", "className":"flex-item zocial-github"},
            {"name" : "jrchaplin", "url":"https://www.linkedin.com/in/jrchaplin/", "className":"flex-item zocial-linkedin"},
            {"name" : "Weehawken, NJ", "url":"#", "class":"flex-item zocial-pinboard", "className":"flex-item zocial-pinboard"},
        ];
    };

    this.initializeJobs();
    this.initializeProjects();
    this.initializeEducation();
    this.initializeBio();
};


function init() {
    $("#mapDiv").append(googleMap);
    resume = new Resume();
    locationMap = new MapWithMarkers();
    ko.applyBindings(resume);

    $('a').click(function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top
        }, 500);
        return false;
    });
}