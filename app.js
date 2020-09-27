const API = "http://api.giphy.com/v1/gifs/search?q=hilarious&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
const form = document.querySelector("#form");
const searchInput = document.querySelector("#search-input");
const clearBtn = document.querySelector("#clear-btn")
const gifContainer = document.querySelector("#gif-container");

const searchConfig = {
    api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
}

async function handleFormSubmit(evt) {
    evt.preventDefault();
    if (!searchInput.value) return;

    try {
        searchConfig["q"] = searchInput.value;
        let res = await axios.get("http://api.giphy.com/v1/gifs/search", {params: searchConfig});
        const idx = Math.floor(Math.random() * res.data.data.length);
        buildImg(res.data.data[idx].images.original.url); // Passes img URL
    } catch(err) {
        console.log("Error", err);
    }
}

function buildImg(img) {
    const imgEl = document.createElement("img");
    imgEl.classList.add("m-2");
    imgEl.src = img;
    gifContainer.appendChild(imgEl);
}

function clearGifs() {
    const gifs = Array.from(document.querySelectorAll("#gif-container img"));
    for (let gif of gifs) {
        gif.remove();
    }
}

clearBtn.addEventListener("click", clearGifs);
form.addEventListener("submit", handleFormSubmit);