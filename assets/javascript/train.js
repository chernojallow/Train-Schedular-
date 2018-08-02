
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA9yjY7N1vw0qzYUcPt-59j0VBIwzdh0Wk",
    authDomain: "group-1-2bbc2.firebaseapp.com",
    databaseURL: "https://group-1-2bbc2.firebaseio.com",
    projectId: "group-1-2bbc2",
    storageBucket: "group-1-2bbc2.appspot.com",
    messagingSenderId: "597724055602"
  };
  firebase.initializeApp(config)

   var database = firebase.database();
 
// Button for adding trains
$("#trainButton").on("click", function() {
    event.preventDefault();
    // Grabs user input
    var trainName = $("#nameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding train data
    var train = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    // Uploads train data to the database
    database.ref().push(train);

    // logs everything to console
    console.log(train.name);
    console.log(train.destination);
    console.log(train.firsTrain);
    console.log(train.frequency);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#nameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
     
});


// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

   // store everything into a variable 
    var trainNames = childSnapshot.val().name;
    var trainDestin = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var theFirstTrain = childSnapshot.val().firstTrain;

   // console.log(theFirstTrain);
   // console.log(trainNames);
   // console.log(trainDestin);
  //  console.log(trainFrequency);

    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency  
    var remainder = moment().diff(moment.unix(theFirstTrain), "minutes") % trainFrequency;
    var  minutes = trainFrequency - remainder;

    // To calculate the arrival time, add the tMinutes to the currrent time
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    // Add each train's data into the table 
    $("#tTable > tbody").append("<tr><td>" + 
    trainNames + "</td><td>" + 
    trainDestin + "</td><td class='min'>" + 
    trainFrequency + "</td><td class='min'>" + 
    arrival + "</td><td class='min'>" + 
    minutes + "</td></tr>");

});


