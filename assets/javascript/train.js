
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAg8qytAHnxQ3qrUqLbGL7yZek8CrJKkPA",
    authDomain: "chernojallow-b3135.firebaseapp.com",
    databaseURL: "https://chernojallow-b3135.firebaseio.com",
    projectId: "chernojallow-b3135",
    storageBucket: "chernojallow-b3135.appspot.com",
    messagingSenderId: "928015750585"
  };
  firebase.initializeApp(config);
   // A variable to reference the database
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

    console.log(theFirstTrain);
    console.log(trainNames);
    console.log(trainDestin);
    console.log(trainFrequency);
    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency  
    var tRemainder = moment().diff(moment.unix(theFirstTrain), "minutes") % trainFrequency;
    var  tMinutes = trainFrequency - tRemainder;

    // To calculate the arrival time, add the tMinutes to the currrent time
    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    // Add each train's data into the table 
    $("#tTable > tbody").append("<tr><td>" + trainNames + "</td><td>" + trainDestin + "</td><td class='min'>" + trainFrequency + "</td><td class='min'>" + tArrival + "</td><td class='min'>" + tMinutes + "</td></tr>");

});