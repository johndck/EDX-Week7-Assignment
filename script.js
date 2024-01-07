// test out day.js

let currentDate = dayjs();
let formatCurrentDate = currentDate.format("dddd DD MMMM");
let currentHour = currentDate.hour();
console.log(typeof currentHour);

$("#currentDay").text(formatCurrentDate);

// get current day
