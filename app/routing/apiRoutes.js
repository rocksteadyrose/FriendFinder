//====================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// 

var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    // res.json(friendsData);

    var othersUserScores = [];
    var totalDifference = [];
    var othersScores;
    var subtractScores;
    var currentUserIndex = friendsData.length - 1;
    var otherUsers = [];
    var currentUserScores = friendsData[currentUserIndex].scores;

    // console.log(friendsData);

    //Get other user score info
    for (i = 0; i < currentUserIndex; i++) {
      othersScores = friendsData[i].scores;
      var others = friendsData[i];
      othersUserScores.push(othersScores)
      otherUsers.push(others)
    }
    console.log(otherUsers)

    for (i = 0; i < othersUserScores.length; i++) {
      var compareArray = [];
      var otherUsersResults = othersUserScores[i];
      // othersUserScores.length: 4

      for (j = 0; j < otherUsersResults.length; j++) {
        var subtractScores = Math.abs(currentUserScores[j] - otherUsersResults[j]);
        compareArray.push(subtractScores)
        // console.log("compare array: " + compareArray)
        // otherUsersResults.length: 10
      }

      var difference = compareArray.reduce(
        function (total, num) { return total + num }
        , 0);
      // console.log("total difference: " + friendsData[i].name + " " + difference)
      totalDifference.push(difference)
      // console.log(totalDifference)
    }
    // console.log(Math.min(difference))
    var min = Math.min.apply(null, totalDifference);
    var selectedPersonIndex = totalDifference.indexOf(min);
    console.log(selectedPersonIndex)

    var match = otherUsers[selectedPersonIndex];
    console.log(match)

  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware

    // res.json(true);


    // else {
    //   waitListData.push(req.body);
    //   res.json(false);
    // }

  });

  // ---------------------------------------------------------------------------

  app.post("/api/clear", function () {
    // Empty out the arrays of data
    friendsData = [];
    //   waitListData = [];

  });
};
