var contactURLArray = [];
var contactArray = [];
var loadingContact = 0;

function initApplication() {
    console.log('Initializing Mustang v1...');
}

function loadIndex() {
    contactURLArray = [];
    contactArray = [];
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    indexRequest.onload = function () {
        if (indexRequest.status >= 200 && indexRequest.status < 400) {
            console.log("Index JSON:" + indexRequest.responseText);
            document.getElementById("indexID").innerHTML = "Contact index has been loaded. Click the Load Contacts button to see them."; //indexRequest.responseText;
            contactIndex = JSON.parse(indexRequest.responseText);
            for (i = 0; i < contactIndex.length; i++) {
                contactURLArray.push(contactIndex[i].ContactURL);
            }
            console.log("ContactURLArray: " + JSON.stringify(contactURLArray));
        } else {
            console.log("A connection to the server has been established, but an error occurred while loading the initial index file.");
            document.getElementById("indexID").innerHTML = "Your contact index did not properly load. Check the console for more details.";
        }
    }

    indexRequest.onerror = function () {
        console.log("A connection error has occurred with the index file.")
    }

    indexRequest.send();
}

function loadContacts() {

    //Should clear the current contactArray.
    contactArray.length = 0;
    loadingContact = 0;

    document.getElementById("contactsID").innerHTML = "";

    if (contactURLArray.length > loadingContact) {
        loadNextContact(contactURLArray[loadingContact]);
    }
}

//So, this is a recursive function to load each contact. Recursive solutions are not optimal, but
//I guess I'm going to follow your lead on this one, considering the size of what we're loading.
//A better way to do this would be to throw a while loop in loadContacts() to call this function, 
//and then to not include the if-statement here.
//I'm going to have to sit on that one.
function loadNextContact(URL) {
    console.log("URL: " + URL);
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', URL);
    contactRequest.onload = function () {
        if (contactRequest.status >= 200 && contactRequest.status < 400) {
            console.log(contactRequest.responseText);
            var contact;
            contact = JSON.parse(contactRequest.responseText);

            var htmlString = "";

            htmlString += "First Name: " + contact.firstName + "<br>";
            htmlString += "Last Name: " + contact.lastName + "<br>";
            htmlString += "email: " + contact.email + "<br>";
            htmlString += "Phone Number: " + contact.phoneNumber + "<br>";
            htmlString += "City: " + contact.city + "<br>";
            htmlString += "State: " + contact.state + "<br>";
            htmlString += "ZIP Code: " + contact.zip + "<br>";

            htmlString += "<br>";

            console.log("Contact: " + contact.firstName);
            contactArray.push(contact);
            document.getElementById("contactsID").innerHTML += htmlString; //JSON.stringify(contactArray);
            loadingContact++;
            if (contactURLArray.length > loadingContact) {
                loadNextContact(contactURLArray[loadingContact]);
            } else {
                console.log("A connection to the server has been established, but an error occurred while loading contact file #" + loadingContact + ".");
            }
        }

        contactRequest.onerror = function () {
            console.log("A connection error has occurred with contact file #" + loadingContact + ".");
        }

        console.log(contactArray);
    }
    contactRequest.send();
}

function logContacts() {
    console.log(contactArray);
}