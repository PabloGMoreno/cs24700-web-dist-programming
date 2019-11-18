
var contactURLArray = [];
var contactArray = [];
var loadingContact = 0;
var currentContactIndex = 0;

function initApplication() {
    console.log('Initializing Mustang v1...');
    loadIndex();
}

function loadIndex() {
    contactURLArray = [];
    contactArray = [];
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    indexRequest.onload = function () {
        if (indexRequest.status >= 200 && indexRequest.status < 400) {
            console.log("Index JSON:" + indexRequest.responseText);
            //document.getElementById("indexID").innerHTML = "Contact index has been loaded. Click the Load Contacts button to see them."; //indexRequest.responseText;
            contactIndex = JSON.parse(indexRequest.responseText);
            for (i = 0; i < contactIndex.length; i++) {
                contactURLArray.push(contactIndex[i].ContactURL);
            }
            console.log("ContactURLArray: " + JSON.stringify(contactURLArray));
            loadContacts();
        } else {
            console.log("A connection to the server has been established, but an error occurred while loading the initial index file.");
            //document.getElementById("indexID").innerHTML = "Your contact index did not properly load. Check the console for more details.";
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

    //document.getElementById("contactsID").innerHTML = "";

    if (contactURLArray.length > loadingContact) {
        loadNextContact(contactURLArray[loadingContact]);
    }
}

//So, this is a recursive function to load each contact. Recursive solutions are not optimal, but
//I guess I'm going to follow your lead on this one, considering the size of what we're loading.
//A better way to do this would be to throw a while loop in loadContacts() to call this function, 
//and then to not include the if-statement here.
//I'm still sitting.

function loadNextContact(URL) {
    console.log("URL: " + URL);
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', URL);
    contactRequest.onload = function () {
        if (contactRequest.status >= 200 && contactRequest.status < 400) {
            console.log(contactRequest.responseText);
            var contact;
            contact = JSON.parse(contactRequest.responseText);
            /*

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
            */

            console.log("Contact: " + contact.preferredName);
            contactArray.push(contact);

            //document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);

            //document.getElementById("statusID").innerHTML = "Status: Loading " + contact.firstName + " " + contact.lastName;

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

function getPlace() {
    var zip = document.getElementById("zipID").value
    console.log("zip:" + zip);

    console.log("function getPlace(zip) { ... }");
    var xhr = new XMLHttpRequest();

    // Register the embedded handler function
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            console.log("result:" + result);
            var place = result.split(', ');
            if (document.getElementById("cityID").value == "")
                document.getElementById("cityID").value = place[0];
            if (document.getElementById("stateID").value == "")
                document.getElementById("stateID").value = place[1];
        }
    }
    xhr.open("GET", "getCityState.php?zip=" + zip);
    xhr.send(null);
}

function nextContact() {
    if (currentContactIndex < (contactArray.length - 1)) {
        currentContactIndex++;
    }
    currentContact = contactArray[currentContactIndex];
    viewCurrentContact();

    //disable button when no next item

    if (currentContactIndex >= (contactArray.length - 1)) {
        document.getElementById("nextBtn").disabled = true;
    }

    document.getElementById("previousBtn").disabled = false;
}

function previousContact() {
    if (currentContactIndex > 0) {
        currentContactIndex--;
    }
    currentContact = contactArray[currentContactIndex];
    viewCurrentContact();

    //disable when no previous item

    if (currentContactIndex <= 0){
        document.getElementById("previousBtn").disabled = true;
    }

    document.getElementById("nextBtn").disabled = false;
}

function addContact() {
    console.log('addcontact()');
    preferredName = document.getElementById("nameID").value;
    email = document.getElementById("emailID").value;
    city = document.getElementById("cityID").value;
    state = document.getElementById("stateID").value;
    zip = document.getElementById("zipID").value;

    contactArray.push({'preferredName': preferredName, 'email': email, 'city': city, 'state': state, 'zip': zip});
}

function removeContact() {
    console.log('removeContact()');

    if (contactArray.length > 0) {
        contactArray.splice(currentContactIndex, 1); 
    }

    currentContactIndex = 0;
    viewCurrentContact();

}

function sortContacts() {
    console.log('sortContacts()');
}

function viewCurrentContact() {
    currentContact = contactArray[currentContactIndex];
    console.log(currentContact);
    document.getElementById("nameID").value = currentContact.preferredName;
    document.getElementById("emailID").value = currentContact.email;
    document.getElementById("cityID").value = currentContact.city;
    document.getElementById("stateID").value = currentContact.state;
    document.getElementById("zipID").value = currentContact.zip;

    // Todo: Add additional fields.
    //document.getElementById("statusID").innerHTML = "Status: Viewing contact " + (currentContactIndex + 1) + " of " + contactArray.length;
}

function zipBlurFunction() {
    getPlace();
}