// variables

const key = "user your own  Unsplash key here";
let inputData = "";
const searchBtn = document.querySelector("#searchBtn");
const moreBtn = document.querySelector("#more");
const cardContainer = document.querySelector(".card-container");

let page = 1;

// functions

async function handleSearchClick(e) {
  e.preventDefault();
  page = 1;
  cardContainer.innerHTML = "";
  inputData = document.querySelector("input").value;
  await fetchData();
  moreBtn.classList.remove("hidden");
}

function handleMoreClick() {
  inputData = document.querySelector("input").value;
  page++;
  fetchData();
}

async function fetchData() {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;
  results.map((pic) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    const img = document.createElement("img");
    img.src = pic.urls.small;
    img.alt = pic.alt_description;
    const a = document.createElement("a");
    a.href = pic.links.html;
    a.target = "_blank";
    a.textContent = pic.alt_description;
    cardContainer.append(card);
    card.append(imageContainer, a);
    imageContainer.append(img);
  });
}

// eventListeners

searchBtn.addEventListener("click", handleSearchClick);
moreBtn.addEventListener("click", handleMoreClick);
