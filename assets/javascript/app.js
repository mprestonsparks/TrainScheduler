
// ****** FIREBASE CODE ***********
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDAERu2OhTJmiBgZIAnXk7lHWAaSAY28Zk",
    authDomain: "trainscheduler-1c731.firebaseapp.com",
    databaseURL: "https://trainscheduler-1c731.firebaseio.com",
    projectId: "trainscheduler-1c731",
    storageBucket: "trainscheduler-1c731.appspot.com",
    messagingSenderId: "130724070717"
};
firebase.initializeApp(config);

// Push form data to Firebase on click of Submit button
$("#submitButton").on("click", function(e) {
    e.preventDefault();
    var trainName = $("#trainNameInput").val();
    var destination = $("#destinationInput").val();
    var firstTrainTime = $("#firstTrainTimeInput").val();
    var frequency = $("#frequencyInput").val();
    var nextArrival = calculateNextArrival(firstTrainTime,frequency);
    var minutesAway = testcalcMinutesAway(frequency,firstTrainTime);
    firebase.database().ref().push({
      TrainName: trainName,
      Destination: destination,
      FirstTrainTime : firstTrainTime,
      Frequency: frequency,
      NextArrival: nextArrival,
      MinutesAway: minutesAway
      });
})

// When new data added to Firebase, add new row to table on page
firebase.database().ref().on("child_added", function(childSnapshot) {
  var trainNameToAdd = childSnapshot.val().TrainName;
  var destinationToAdd = childSnapshot.val().Destination;
  var frequencyToAdd = childSnapshot.val().Frequency;
  var nextArrivalToAdd = childSnapshot.val().NextArrival;
  var minutesAwayToAdd = childSnapshot.val().MinutesAway;
  addRow(trainNameToAdd,destinationToAdd,frequencyToAdd,nextArrivalToAdd,minutesAwayToAdd);
});


// **** FUNCTIONS ****
// Functin to calculate minutes until next train arrives
function testcalcMinutesAway(frequency,firstTime){
    var tFrequency = parseInt(frequency);
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // Current Time
    var currentTime = moment();
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    return tMinutesTillTrain;
}

// Write table data from Firebase
function addRow(newName,newDestination,newFrequency,newNextArrival,newMinutesAway) {
  var newRow = $("<tr>")
  $("#table-body").append(newRow);
  // Add Train Name to page
  var trainName = $("<td>");
  trainName.attr("class","trainName");
  $(newRow).append(trainName);
  $(trainName).text(newName);
  // Add Destination to page
  var destination = $("<td>");
  destination.attr("class","destination");
  $(newRow).append(destination);
  $(destination).text(newDestination);
  // Add Frequency to page
  var frequency = $("<td>");
  frequency.attr("class","frequency");
  $(newRow).append(frequency);
  $(frequency).text(newFrequency);
  // Add NextArrival
  var nextArrival = $("<td>");
  nextArrival.attr("class","nextArrival");
  $(newRow).append(nextArrival);
  $(nextArrival).text(newNextArrival);
  // Add MinutesAway
  var minutesAway = $("<td>");
  minutesAway.attr("class","minutesAway");
  $(newRow).append(minutesAway);
  $(minutesAway).text(newMinutesAway);
}

// Function to calculate the arrival time of next train
function calculateNextArrival (firstTrainTime,frequency) {
    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    var nextTime = firstTimeConverted.add(frequency,"m");
    var nextTimeConverted = moment(nextTime, "hh:mm");
    return nextTimeConverted.format("hh:mm A");
}


