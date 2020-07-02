const cars = [];
const carsIcon = [];
let gameCancontinue = true;
let boardOfGame = [];
let roundCounter = 1;
let message = "";

function Car(name, currentPosition, icon) {
  this.icon = icon;
  this.name = name;
  this.currentPosition = currentPosition;
}

function createCars(numberOfCars) {
  let icon;
  let name;
  for (let i = 1; i <= numberOfCars; i++) {
    name = prompt(`Enter name of car${i}`);
    icon = $("<i></i>");
    icon.addClass("fas fa-car-side");
    icon.attr("id", `${name}-icon`);
    icon.attr("title", name);
    icon.css("color", "white");
    cars.push(new Car(name, -1, icon));
  }
  alert("note: you can hover on cars and see their names");
  console.log(cars);
}


function createBoard() {
  for (let i = 0; i < 300; i++) {
    boardOfGame.push("*");
  }
}

function createCell() {
  let containerOfCells = $("div.container");
  let height = (containerOfCells.width() / 100) * 4;



  for (let index = 0; index < 300; index++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "circle");
    cell.setAttribute("id", index);
    cell.setAttribute("height", `${height}px`);
    containerOfCells.append(cell);
  }
}

function changeHeightOfCells() {
  let cells = $(".circle");
  let w = document.documentElement.clientWidth;
  cells.height(`${(w / 100) * 4}px`);

}

function showTheBoard() {
  let result = "";
  for (let i = 0; i < 100; i++) {
    result += `${boardOfGame[i]}`;
  }
  console.log(result);
  result = "";
  for (let i = 100; i < 200; i++) {
    result += `${boardOfGame[i]}`;
  }
  console.log(result);
  result = "";
  for (let i = 200; i < 300; i++) {
    result += `${boardOfGame[i]}`;
  }
  console.log(result);
}

function getNumberOfCars() {
  let numberOfCars = prompt("Enter number of cars");
  createCars(numberOfCars);
}

function setpositionOfCar(car, currentPosition, rand) {
  if (!gameCancontinue) return; 
  if (currentPosition >= 299) {
    // when the game is done.
    car.icon.addClass("spinner grid-icon");
    $("#stage").append(car.icon);
    $(".name-of-winner").html(`"${car.name}"`);
    $("#stage").css("display", "grid");
    $("#stage").show("slow");
    gameCancontinue = false;
    showTheBoard();
    message = `"${car.name}" won the game!!!`;
    $(".rep pre").html(message);
    $("#next").css("display", "none");
    let resetIcon = $("<i></i>");
    resetIcon.addClass("fas fa-sync-alt");
    $(".next-reset-btn").html(resetIcon);
  }
  else if (boardOfGame[currentPosition] === "*") {
    message += `car ${car.name} => before: ${car.currentPosition - rand + 1}, after: ${car.currentPosition + 1}\n`;

    boardOfGame[currentPosition] = car.name;
    car.icon.css("display", "block");
    $(`#${currentPosition}`).html(car.icon);
    boardOfGame[currentPosition - rand] = "*";
  }
  else {
    message += `car ${car.name} => before: ${car.currentPosition - rand + 1}, after: ${car.currentPosition + 1}\n`;

    for (let index = 0; index < cars.length; index++) {
      if (cars[index].name === boardOfGame[currentPosition]) {
        message += `   car ${cars[index].name} => before: ${cars[index].currentPosition + 1}, after: ${0}\n`;

        cars[index].currentPosition = -1;
        cars[index].icon.css("display", "none");
        car.icon.css("display", "block");
        $(`#${currentPosition}`).html(car.icon);
        boardOfGame[currentPosition - rand] = "*";
        break;
      }

    }
    boardOfGame[currentPosition] = car.name;
  }
}

function moveCar(car) {
  let rand;
  rand = Math.floor(Math.random() * 10) + 1;
  car.currentPosition += rand;
  setpositionOfCar(car, car.currentPosition, rand);
}

function toDo() {
  
  getNumberOfCars();
  createBoard();
}

function nextRound() {
  if (gameCancontinue) {
    console.log(`Round ${roundCounter}`);
    message = "";
    for (let i = 0; i < cars.length; i++) {
      moveCar(cars[i]);
    }
    $(".rep pre").html(message);

    if (gameCancontinue) {
      showTheBoard()
    }
    roundCounter++;
  }
  else {
    location.reload(true);
  }
}


window.addEventListener("resize", changeHeightOfCells);
createCell();
$(document).ready(function () {
  toDo();
  $(".next-reset-btn").click(function (e) {
    nextRound();
  });
});