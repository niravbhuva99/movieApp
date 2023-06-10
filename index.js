const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280/";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const movieContainer = document.querySelector("#container");
const tvContainer = document.querySelector("#tv");

const container = function (movieData, putInside, name, category, position) {
  const btn = `<div class="btn-heading">
    <h2>${category}</h2>
    <button class="see">See All<i class="fa-solid fa-play"></i></button>
  </div> `;
  putInside.insertAdjacentHTML("beforebegin", btn);
  movieData.forEach((movie) => {
    const html = `<div class="movie-container"><img class="movie-poster" src="${
      IMGPATH + movie.backdrop_path
    }" alt="" /><div class="heading"><h3>${
      movie[name]
    }</h3><span ><i class="fa-solid fa-star"></i> ${
      movie.vote_average
    }</span></div>
    <div class="overview">${movie.overview}</div>
    </div>`;
    putInside.insertAdjacentHTML(position, html);
    const span = document.querySelectorAll("span");
    span.forEach((ele) => {
      ele.textContent > 5
        ? (ele.style.color = "green")
        : (ele.style.color = "red");
    });
  });
};
const getMovie = async function () {
  const res = await fetch(APIURL);
  const resData = await res.json();
  const movieData = resData.results;
  container(
    movieData,
    movieContainer,
    "original_title",
    "popular movies",
    "afterBegin"
  );
  seeAllAndBackTOHome(movieContainer, "movie");
};
getMovie();

const getTv = async function () {
  const res = await fetch(
    "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
  );
  const resData = await res.json();
  const movieData = resData.results;

  container(movieData, tvContainer, "name", "Tv-show", "afterBegin");
  seeAllAndBackTOHome(tvContainer, "tv-show");
};
getTv();
const serchBox = document.querySelector(".search");
const input = document.querySelector("#search");

serchBox.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = input.value;
  if (inputValue) {
    bySearch(inputValue);
  }
  input.value = "";
});
const searchContainer = document.querySelector(".search-result");
const bySearch = async function (term) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${term}`
  );
  const resData = await res.json();
  const movieData = resData.results;
  container(
    movieData,
    searchContainer,
    "original_title",
    "Search results",
    "afterbegin"
  );
  movieContainer.innerHTML = "";
  tvContainer.innerHTML = "";
  serchBox.innerHTML = "";
  document
    .querySelectorAll(".btn-heading")
    .forEach((ele) => (ele.style.display = "none"));
  const btn = `
    <button class="see forsearch">Home<i class="fa-solid fa-left"></i></button>
   `;
  searchContainer.insertAdjacentHTML("beforebegin", btn);
  const homeBtn = document.querySelector(".forsearch");
  homeBtn.addEventListener("click", () => {
    location.reload();
  });
};

function seeAllAndBackTOHome(where, cat) {
  const btnT = document.querySelector(".btn-heading .see");
  const seeAllBtn = document.querySelector(`.${cat} .see`);
  const btnH = document.querySelector(`.${cat} .btn-heading`);
  seeAllBtn.addEventListener("click", (e) => {
    const btnBack = `<button class="left"><i class="fa-solid fa-left-long "></i></button>`;
    where.classList.add("expand");
    btnT.classList.add("hide");
    btnH.insertAdjacentHTML("beforeend", btnBack);
    const home = document.querySelector(`.${cat} .left`);
    home.addEventListener("click", () => {
      where.classList.remove("expand");
      home.classList.add("hide");
      btnT.classList.remove("hide");
      home.remove();
    });
  });
}
