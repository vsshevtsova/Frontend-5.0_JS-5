const listGenres = document.querySelector(".list-genres"),
  titleText = document.querySelectorAll(".title"),
  mainTitle = document.getElementsByTagName("h1"),
  containerBox = document.getElementsByClassName("container"),
  filmCollection = document.getElementById("films"),
  paragraph = document.createElement("p"),
  div = document.createElement("div"),
  removeMe = document.querySelector(".remove-block");

containerBox[0].style.backgroundColor = "#FF00AA";
containerBox[0].style.borderRadius = "10px";
containerBox[0].style.width = "60%";
containerBox[0].prepend(div);
containerBox[0].insertAdjacentHTML("beforeend", "<h3> Избранные актрисы</h3>");
containerBox[0].insertAdjacentHTML(
  "beforeend",
  '<img src="./img/star.jpg" width = 20%>'
);

titleText.forEach((item) => {
  item.style.cssText = "font-weight: 700;";
});

mainTitle[0].style.cssText = "font-size: 32px; font-weight: 700;";

paragraph.textContent = "Все о вашей киноколлекции";
titleText[0].after(paragraph);

removeMe.remove();

function newGenre(data) {
  let li = document.createElement("li");
  li.textContent = data;
  listGenres.append(li);
  li.classList.add("list-item");
}
//Объект
let personalMovieDB = {
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  private: false,
  start: function () {
    personalMovieDB.count = +prompt("Сколько фильмов вы уже посмотрели?");
    while (
      !personalMovieDB.count ||
      isNaN(personalMovieDB.count) ||
      personalMovieDB.count < 0
    ) {
      personalMovieDB.start();
    }
  },
  myLvl: function () {
    if (personalMovieDB.count < 10) {
      alert("Просмотрено довольно мало фильмов");
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
      alert("Вы классический зритель");
    } else if (personalMovieDB.count > 30) {
      alert("Вы киноман");
    } else {
      alert("Произошла ошибка");
      personalMovieDB.start();
    }
  },
  myFilms: function () {
    const filmName = [];
    for (let i = 0; i < 2; i++) {
      const film = prompt("Один из последних просмотренных фильмов?");
      const rate = +prompt("На сколько оцените его?");
      if (!film || film.length > 50 || !rate) {
        i--;
        personalMovieDB.myFilms();
      }
      personalMovieDB.movies[film] = rate;
      filmName[i] = film;
    }
    filmCollection.innerHTML = `<li>${filmName[0]}</li><li>${filmName[1]}</li>`;
    const listItem = document.getElementsByTagName("li");
    filmCollection.replaceWith(listItem[1], listItem[0]);
  },
  writeYourGenres: function () {
    for (let i = 1; i <= 3; i++) {
      let genre = prompt(`Ваш любимый жанр под номером ${i}`);
      personalMovieDB.genres[i - 1] = genre;
      if (!genre || genre.length < 0) {
        i--;
      } else {
        personalMovieDB.genres[i - 1] = genre;
      }
    }
    personalMovieDB.genres.forEach((item, i) => {
      newGenre(`Любимый жанр ${i + 1} - это ${item}`);
    });
  },
  showMyDB: function () {
    if (personalMovieDB.private == false) {
      console.log(personalMovieDB);
    }
  },
  toggleVisibleMyDB: function () {
    if (personalMovieDB.private == false) {
      personalMovieDB.private = true;
    } else {
      personalMovieDB.private = false;
    }
  },
};
personalMovieDB.myFilms();
personalMovieDB.writeYourGenres();
