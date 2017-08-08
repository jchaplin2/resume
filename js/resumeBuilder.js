var bio = {
    "name": "Jonathan Chaplin",
    "role": "Front-End Web Developer",
    "contacts": {
        "mobile": "908-XXX-XXXX",
        "email": "jchaplin@gmail.com",
        "twitter": "jchaplin2",
        "github": "jchaplin2",
        "linkedin": "jrchaplin",
        "location": "Weehawken, NJ"
    },
    "skills": {
        "Languages": [
            "HTML",
            "JavaScript",
            "CSS",
            "Java",
            "JQuery",
            "SQL"
        ],
        "Frameworks/libraries": [
            "jQuery",
            "Knockout.js",
            "Backbone JS",
            "Bootstrap",
            "Jasmine",
            "Grunt"
        ],
        "Other": [
            "AJAX",
            "Responsive Design",
            "Unix",
            "Linux",
            "Windows 10",
            "Microsoft Office",
            "Oracle 11g",
        ],
        "Version-control": [
            "Git",
            "CVS"
        ],
        "Editors": [
            "Sublime Text"
        ]
    },
    "biopic": "images/jonathan_chaplin.jpg",
    "welcomeMessage": "My Resume"
};

bio.display = function() {
    "use strict";
    var formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic);
    $("#header").append(formattedBioPic);

    var newHeader = HTMLheaderName.replace("%data%", bio.name);
    $("#header").append(newHeader);

    var newRole = HTMLheaderRole.replace("%data%", bio.role);
    $("#header").append(newRole);

    var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    $("#header").append(formattedWelcomeMsg);

    if (bio.skills) {
        $("#header").append(HTMLskillsStart);
        var formattedSkill;
        var skillsArr = Object.keys(bio.skills);
        var skillList = "";
        for (var i = 0, size = skillsArr.length; i < size; i += 1) {
            skillList += bio.skills[skillsArr[i]].join(", ");
            formattedSkill = HTMLskills.replace("%data%", skillList).replace("%header%", skillsArr[i]);
            $("#skills").append(formattedSkill);
            skillList = "";
        }
    }

    if (bio.contacts) {
        var zocialClassList;
        var socialMediaContact;
        var formattedContact;

        $.each(bio.contacts, function(key, value) {
            zocialClassList = zocialMediaClassMap[key];
            socialMediaContact = socialMediaLinkMap[key];
            formattedContact = HTMLcontactGenericwithClass.replace("%data%", value)
                .replace("%class%", zocialClassList).replace("%link%", socialMediaContact);
            $("#topContacts, #footerContacts").append(formattedContact);
        });
    }
};

var education = {
    "schools": [{
        "name": "Stevens Institute of Technology",
        "degree": "Bachelor's of Science",
        "majors": ["Computer Science"],
        "dates": "1999 - 2005",
        "location": "Hoboken, NJ",
        "url": "http://www.stevens.edu"
    }],
    "onlineCourses": [{
        "title": "Front End Web Developer Nanodegree",
        "school": "Udacity",
        "dates": "2017",
        "url": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
    }]
};

education.display = function() {
    "use strict";
    $("#education").append(HTMLschoolStart);

    var schools = education.schools;
    var formattedSchool;
    var formattedDegree;
    var formattedDegreeAndSchool;
    var formattedDates;
    var formattedSchoolLocation;
    var formattedSchoolMajor;

    for (var i = 0; i < schools.length; i += 1) {
        formattedSchool = HTMLschoolName.replace("%data%", schools[i].name).replace("#", schools[i].url);
        formattedDegree = HTMLschoolDegree.replace("%data%", schools[i].degree);
        formattedDegreeAndSchool = formattedSchool + formattedDegree;
        $(".education-entry:last").append(formattedDegreeAndSchool);

        formattedDates = HTMLschoolDates.replace("%data%", schools[i].dates);
        $(".education-entry:last").append(formattedDates);

        formattedSchoolLocation = HTMLschoolLocation.replace("%data%", schools[i].location);
        $(".education-entry:last").append(formattedSchoolLocation);

        var majors = schools[i].majors;
        for (var k = 0; k < majors.length; k++) {
            formattedSchoolMajor = HTMLschoolMajor.replace("%data%", majors[k]);
            $(".education-entry:last").append(formattedSchoolMajor);
        }
    }

    $(".education-entry:last").append(HTMLonlineClasses);

    var formattedTitle;
    var formattedTitleAndSchool;
    var formattedURL;
    for (var j = 0; j < education.onlineCourses.length; j += 1) {
        formattedTitle = HTMLschoolName.replace("%data%", education.onlineCourses[j].title).replace("#", education.onlineCourses[j].url);
        formattedSchool = HTMLschoolDegree.replace("%data%", education.onlineCourses[j].school);
        formattedTitleAndSchool = formattedTitle + formattedSchool;
        $(".education-entry:last").append(formattedTitleAndSchool);

        formattedDates = HTMLonlineDates.replace("%data%", education.onlineCourses[j].dates);
        $(".education-entry:last").append(formattedDates);

        formattedURL = HTMLonlineURL.replace("%data%", education.onlineCourses[j].url).replace("#", education.onlineCourses[j].url);
        $(".education-entry:last").append(formattedURL);
    }
};

var work = {
    "jobs": [{
        "title": "Software Developer",
        "employer": "Financial Sciences",
        "dates": "2/2005 - Current",
        "location": "Jersey City, NJ",
        "description": "I'm a full stack web developer who spends much of his time developing and enhancing applications and technical processes. Overall, I've worked on functional development and implementation of trade managers and reporting tools as part of fixed income, market data and cash management applications. My primary skills are Javascript, HTML, CSS, SQL and Java."
    }, {
        "title": "Software Developer",
        "employer": "Hertz",
        "dates": "1/2003 - 9/2003",
        "location": "Park Ridge, NJ",
        "description": "Updated and maintained company intranet and internet sites using Coldfusion, HTML, CSS, and JS."
    }, {
        "title": "Software Development Intern",
        "employer": "Citigroup",
        "dates": "5/2001 - 9/2001",
        "location": "Weehawken, NJ",
        "description": "Created and maintained company intranet and site using Coldfusion, HTML, CSS, and JS."
    }]
};

work.display = function() {
    "use strict";

    var formattedEmployer;
    var formattedWorkTitle;
    var formattedEmployerTitle;
    var formattedJobDates;
    var formattedJobLocation;
    var formattedJobDescription;

    for (var i = 0; i < work.jobs.length; i += 1) {
        $("#workExperience").append(HTMLworkStart);

        formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[i].employer);
        formattedWorkTitle = HTMLworkTitle.replace("%data%", work.jobs[i].title);
        formattedEmployerTitle = formattedEmployer + formattedWorkTitle;
        $(".work-entry:last").append(formattedEmployerTitle);

        formattedJobDates = HTMLworkDates.replace("%data%", work.jobs[i].dates);
        $(".work-entry:last").append(formattedJobDates);

        formattedJobLocation = HTMLworkLocation.replace("%data%", work.jobs[i].location);
        $(".work-entry:last").append(formattedJobLocation);

        formattedJobDescription = HTMLworkDescription.replace("%data%", work.jobs[i].description);
        $(".work-entry:last").append(formattedJobDescription);
    }
};

var projects = {
    projects: [{
        "title": "Build a Portfolio Site",
        "dates": "2017",
        "description": "A site to display all my projects.",
        "images": ["images/197x148.gif"]
    }, {
        "title": "Interactive Resume",
        "dates": "2017",
        "description": "A resume to display my projects and work history.",
        "images": ["images/197x148.gif"]
    }, {
        "title": "Classic Arcade Game Clone",
        "dates": "2017",
        "description": "A clone of a classic arcade game.",
        "images": ["images/197x148.gif"]
    }, {
        "title": "Website Optimization",
        "dates": "2017",
        "description": "Optimizing my portfolio site.",
        "images": ["images/197x148.gif"]
    }, {
        "title": "Neighborhood Map",
        "dates": "2017",
        "description": "A map of my neighborhood.",
        "images": ["images/197x148.gif"]
    }, {
        "title": "Feed Reader Testing",
        "dates": "2017",
        "description": "Automated testing of a feed reader.",
        "images": ["images/197x148.gif"]
    }]
};

projects.display = function() {
    "use strict";
    $("#projects").append(HTMLprojectStart);

    var projArray = projects.projects;
    var formattedProjectTitle;
    var formattedProjectDates;
    var formattedProjectDescription;

    for (var i = 0; i < projArray.length; i += 1) {
        formattedProjectTitle = HTMLprojectTitle.replace("%data%", projArray[i].title);
        $("#projects").append(formattedProjectTitle);

        formattedProjectDates = HTMLprojectDates.replace("%data%", projArray[i].dates);
        $("#projects").append(formattedProjectDates);

        formattedProjectDescription = HTMLprojectDescription.replace("%data%", projArray[i].description);
        $("#projects").append(formattedProjectDescription);

        var formattedProjectImage;
        for (var image = 0; image < projArray[image].images.length; image++) {
            var projectImagesArr = projArray[image].images;
            for (var k = 0; k < projectImagesArr.length; k++) {
                formattedProjectImage = HTMLprojectImage.replace("%data%", projectImagesArr[k]);
                $("#projects").append(formattedProjectImage);
            }
        }
    }
};

$("#mapDiv").append(googleMap);

function displayInformation() {
    bio.display();
    education.display();
    work.display();
    projects.display();
}