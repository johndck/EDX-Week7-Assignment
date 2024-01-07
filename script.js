// test out day.js

let currentDate = dayjs();
let formatCurrentDate = currentDate.format("dddd DD MMMM");
//let currentHour = currentDate.hour();

let currentHour = 13;

$("#currentDay").text(formatCurrentDate);

// set the colour of the each calendar event box
function setEventColor() {
  console.log(typeof currentHour);

  $(".description").each(function () {
    let hourEvent = $(this).attr("id");

    if (hourEvent < currentHour) {
      $(this).addClass("past");
      $(this).prop("disabled", true);
    } else if (hourEvent == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
}

setEventColor();

// make sure the current hour is updated
// setInterval - query around the this.keyword when I tested it

// add item to local storage
// check on event delegation decision - not required because we are

$(".container").on("click", "button.saveBtn", function () {
  alert("button is pressed");

  // get the detail of the event to be stored
  let eventDetail = $(this).prev().val();
  // get the ID of the event row
  let eventID = $(this).prev().attr("ID");

  // check that we are getting the right information
  console.log(eventDetail);
  console.log(eventID);
  //console.log($("#17").val());

  //$("#18").val("Add this into the area");

  // check if any events exist in local storage

  let doEventsExist = JSON.parse(localStorage.getItem("dailyCalendarEvents"));

  if (doEventsExist == null) {
    let newEvent = JSON.stringify([
      { eventHour: eventID, eventText: eventDetail },
    ]);
    localStorage.setItem("dailyCalendarEvents", newEvent);
  } else {
    let newEvent = { eventHour: eventID, eventText: eventDetail };
    doEventsExist.push(newEvent);
    console.log(doEventsExist);
    let updateEvents = JSON.stringify(doEventsExist);
    localStorage.setItem("dailyCalendarEvents", updateEvents);
  }
});
