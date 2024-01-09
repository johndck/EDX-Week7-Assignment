// Get current date

let currentDate = dayjs();
let formatCurrentDate = currentDate.format("dddd DD MMMM");

$("#currentDay").text(formatCurrentDate);

// set the colour of the each calendar event box
function setEventColor() {
  let currentHour = currentDate.hour();
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

// Pull back saved events & display them.

let availableEvents = JSON.parse(localStorage.getItem("dailyCalendarEvents"));
if (availableEvents) {
  console.log(availableEvents);

  for (let i = 0; i < availableEvents.length; i++) {
    eventTime = parseInt(availableEvents[i].eventHour);
    eventdetails = availableEvents[i].eventText;
    $("#" + eventTime).val(eventdetails);
  }
}

// Repeat the setEventColor every 5 seconds

setInterval(setEventColor, 5000);

$(".container").on("click", "button.saveBtn", function () {
  // get the detail of the event to be stored
  let eventDetail = $(this).prev().val();
  // get the ID of the event row
  let eventID = $(this).prev().attr("ID");

  // check that we are getting the right information
  console.log(eventDetail);
  console.log(eventID);

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
