document.addEventListener("DOMContentLoaded", function(){
    // listen for auth status changes
    auth.onAuthStateChanged(user => {
        if (user) {
          console.log("user logged in");
          console.log(user);
          setupUI(user);
          var uid = user.uid;
          console.log(uid);
        } else {
          console.log("user logged out");
          setupUI();
        }
    });

    // login
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // get user info
        const email = loginForm['input-email'].value;
        const password = loginForm['input-password'].value;
        // log the user in
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            // close the login modal & reset form
            loginForm.reset();
            console.log(email);
        })
        .catch((error) =>{
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById("error-message").innerHTML = errorMessage;
            console.log(errorMessage);
        });
    });

    // logout
    const logout = document.querySelector('#logout-link');
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut();
    });


   
   //const ps = document.querySelector('#p-button');
 //  ps.addEventListener('submit', (e) => {
     //  e.preventDefault();
     //  const pt = ps['input-p'].value;
      // console.log(pt);

      // const inputText = document.getElementById('input-p');
      // const outputText = document.getElementById('user-p');
       
      // inputText.addEventListener('input', function() {
       //  outputText.innerText = inputText.value;
    //   });



   //});

   
}); 





//var database = firebase.database();


 // function showData() {
  //  var uid = document.getElementById("input-p").value;
  //  var container = document.getElementById("data-container");
  //  container.innerHTML = "";
////database.ref("BloodOxygenDataUse").orderByChild("name").equalTo(uid).once("value", function(snapshot) {
      ////  if (snapshot.exists()) {
        //    var data = snapshot.val();
        //    var element = document.createElement("div");
        //    element.innerHTML = "spo2: " + data.spo2 + "db: " + data.db + "time" + data.time;
        //    container.appendChild(element);
     //   } else {
         //   var element = document.createElement("div");
         //   element.innerHTML = "No data found for UID " + uid + ".";
         //   container.appendChild(element);
//}
   // });
//}


// Show Data Button Event Listener
///document.getElementById("p-button").addEventListener("click", showData);
