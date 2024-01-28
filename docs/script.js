// import outputJson from './output.json' assert { type: 'json' };

document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener for the 'keyup' event on the input field
    document.getElementById("keyword").addEventListener("keyup", function (event) {
        // Check if the pressed key is 'Enter' (key code 13)
        if (event.key === "Enter") {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Trigger the fetchHeadlines function
            fetchHeadlines();
        }
    });

    // Add an event listener for the 'click' event on the Home button
    document.getElementById("homeButton").addEventListener("click", function () {
        // Call the resetPage function
        resetPage();
    });
});


function resetPage() {
    // Reload the page
    location.reload();
}


function fetchHeadlines() {
    const keyword = document.getElementById("keyword").value.trim();

    if (!keyword) {
        alert("Please enter a keyword.");
        return;
    }

    // Show loading indicator
    showLoadingIndicator();

    fetch('http://127.0.0.1:8000/output.json', {
        method: 'GET', // or 'GET' depending on your backend
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(json => console.log(json))


    fetch('http://127.0.0.1:5000/api/data', {
        method: 'POST', // or 'GET' depending on your backend
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: keyword }),
    })
    .then(response => response.json())
    .then(headlinesData => {
        hideLoadingIndicator();
        displayHeadlines(headlinesData);
    })
    .catch(error => {
        console.error('Error fetching headlines:', error);
        hideLoadingIndicator();
        alert('Error fetching headlines. Please try again.');
    });

    // Simulate a delay (replace with actual fetch call)
    
        // Placeholder: Simulate receiving headlines from the Python program
        const headlinesData = getSampleHeadlinesData();

        hideLoadingIndicator();
        displayHeadlines(headlinesData);
      // Adjust the duration as needed
}

function getSampleHeadlinesData() {
    // Placeholder: Simulate headlines data from the Python program
    const headlines = Array.from({ length: 5 }, (_, i) => `Headline ${i + 1}`);

    const jsonText = `{
        "Fox News": [
            [
                [
                    70,
                    30
                ],
                [
                    50,
                    50
                ],
                [
                    0,
                    0
                ]
            ],
            [
                "hi",
                "title2",
                "title3"
            ],
            [
                "content1",
                "content2",
                "content3"
            ],
            [
                "link1",
                "link2",
                "link3"
            ]
        ],
        "ABC": [
            [
                [
                    90,
                    10
                ],
                [
                    60,
                    40
                ],
                [
                    0,
                    0
                ]
            ],
            [
                "title1",
                "title2",
                "title3"
            ],
            [
                "content1",
                "content2",
                "content3"
            ],
            [
                "link1",
                "link2",
                "link3"
            ]
        ],
        "New York Times": [
            [
                [
                    90,
                    10
                ],
                [
                    60,
                    40
                ],
                [
                    0,
                    0
                ]
            ],
            [
                "title1",
                "title2",
                "title3"
            ],
            [
                "content1",
                "content2",
                "content3"
            ],
            [
                "link1",
                "link2",
                "link3"
            ]
        ],
        "New York Post": [
            [
                [
                    20,
                    80
                ],
                [
                    0,
                    0
                ],
                [
                    0,
                    0
                ]
            ],
            [
                "title1",
                "title2",
                "title3"
            ],
            [
                "content1",
                "content2",
                "content3"
            ],
            [
                "link1",
                "link2",
                "link3"
            ]
        ]
    }`;
    
    const data = JSON.parse(jsonText);

    
    

    return {
        "Fox News": headlines.map((_, index) => {
            const bias = data["Fox News"][0];
            const content = data["Fox News"];
            const color = getColorFromBias(bias);
            console.log(data["Fox News"])
            return [`${color} Title ${data["Fox News"][1][0]}`, `${color} Content ${content}`, `${color} href link ${index + 1}`];
        }),
        "ABC": headlines.map((_, index) => {
            const bias = data["ABC"][0];
            const color = getColorFromBias(bias);
            return [`${color} Title1 ${index + 1}`, `${color} Content1 ${index + 1}`, `${color} href link1 ${index + 1}`];
        }),
        "New York Times": headlines.map((_, index) => {
            const bias = data["New York Times"][0];
            const color = getColorFromBias(bias);
            return [`${color} Title2 ${index + 1}`, `${color} Content2 ${index + 1}`, `${color} href link2 ${index + 1}`];
        }),
        "New York Post": headlines.map((_, index) => {
            const bias = data["New York Post"][0];
            const color = getColorFromBias(bias);
            return [`${color} Title3 ${index + 1}`, `${color} Content3 ${index + 1}`, `${color} href link3 ${index + 1}`];
        })
    };
}

function getColorFromBias(bias) {
    const [republican, democrat] = bias;
    if (republican > democrat) {
        return "red"; // Biased towards Republicans
    } else if (democrat > republican) {
        return "blue"; // Biased towards Democrats
    } else {
        return "grey"; // Likelihood/not biased
    }
}

function displayHeadlines(data) {
    const foxList = document.getElementById("foxList");
    const abcList = document.getElementById("abcList");
    const nytList = document.getElementById("nytList");
    const nypList = document.getElementById("nypList");

    // Clear previous headlines
    foxList.innerHTML = "";
    abcList.innerHTML = "";
    nytList.innerHTML = "";
    nypList.innerHTML = "";

    // Display Fox News headlines
    if (data["Fox News"]) {
        data["Fox News"].forEach((headline, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${headline[0]}`;
            listItem.style.color = headline[0].split(' ')[0]; // Set text color based on bias
            foxList.appendChild(listItem);
        });
    } else {
        foxList.innerHTML = "<li>No headlines found</li>";
    }

    // Display ABC headlines
    if (data["ABC"]) {
        data["ABC"].forEach((headline, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${headline[0]}`;
            listItem.style.color = headline[0].split(' ')[0]; // Set text color based on bias
            abcList.appendChild(listItem);
        });
    } else {
        abcList.innerHTML = "<li>No headlines found</li>";
    }

    // Display New York Times headlines
    if (data["New York Times"]) {
        data["New York Times"].forEach((headline, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${headline[0]}`;
            listItem.style.color = headline[0].split(' ')[0]; // Set text color based on bias
            nytList.appendChild(listItem);
        });
    } else {
        nytList.innerHTML = "<li>No headlines found</li>";
    }

    // Display New York Post headlines
    if (data["New York Post"]) {
        data["New York Post"].forEach((headline, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${headline[0]}`;
            listItem.style.color = headline[0].split(' ')[0]; // Set text color based on bias
            nypList.appendChild(listItem);
        });
    } else {
        nypList.innerHTML = "<li>No headlines found</li>";
    }

    // Scroll to the headlines section
    scrollToHeadlines();
}

function scrollToHeadlines() {
    const headlinesSection = document.getElementById("resultContainer");
    headlinesSection.scrollIntoView({ behavior: "smooth" });
}

function showLoadingIndicator() {
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "block";
}

function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "none";
}
