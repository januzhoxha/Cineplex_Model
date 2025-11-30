const API = "2a21ebb4";

let searchBtn = document.getElementById("Search");
let notificationBtn = document.getElementById("Notification");
let loginBtn = document.getElementById("Login");
let brightnessBtn = document.getElementById("Brightness");
let nameInput = document.getElementById("Name");

nameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") e.preventDefault();
});

let resultsContainer = document.createElement("div");
resultsContainer.id = "results";
document.body.appendChild(resultsContainer);

let paginationContainer = document.createElement("div");
paginationContainer.id = "pagination";
document.body.appendChild(paginationContainer);

let currentName = "";
let currentType = "";
let currentPage = 1;

notificationBtn.addEventListener("click", function (e) {
    e.preventDefault();
});


brightnessBtn.addEventListener("click", function (e) {
    e.preventDefault();
});

loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
});


searchBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let name = nameInput.value.trim();
    if (!name) {
        alert("Enter a movie name!");
        return;
    }

    let typeRadio = document.querySelector('input[name="Choose"]:checked');
    let type = typeRadio ? typeRadio.value.toLowerCase() : "";

    currentName = name;
    currentType = type;
    currentPage = 1;

    fetchMovies(name, type, 1);
});

function fetchMovies(name, type, page) {
    let url = `https://www.omdbapi.com/?apikey=${API}&s=${encodeURIComponent(name)}&page=${page}`;
    if (type) url += `&type=${type}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            resultsContainer.innerHTML = "";
            paginationContainer.innerHTML = "";

            if (data.Response === "False") {
                resultsContainer.innerHTML = "<p>Movie not found!</p>";
                return;
            }

            data.Search.forEach(movie => {
                let div = document.createElement("div");
                div.innerHTML = `<strong>${movie.Title}</strong> (${movie.Year})`;
                resultsContainer.appendChild(div);
            });

            let totalResults = parseInt(data.totalResults);
            let totalPages = Math.ceil(totalResults / 10);

            for (let i = 1; i <= totalPages; i++) {
                let btn = document.createElement("button");
                btn.textContent = i;

                if (i === page) {
                    btn.disabled = true;
                    btn.style.background = "#ccc";
                }

                btn.addEventListener("click", () => {
                    currentPage = i;
                    fetchMovies(currentName, currentType, i);
                });

                paginationContainer.appendChild(btn);
            }
        })
        .catch(Error => console.error(Error));
}
