// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
    contact.id = this.assignId();
    this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress, address, type) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emailAddress = emailAddress,
  this.address = address,
  this.type = type
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var contactsWork = $("ul#contactsWork");
  var contactsSchool = $("ul#contactsSchool");
  contactsWork.text("")
  contactsSchool.text("")
  contactsList.text("")

  addressBookToDisplay.contacts.forEach(function(contact) {
    var htmlForContactInfo = "";
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName +"</li>";
    if(contact.type === "work"){
      contactsWork.append(htmlForContactInfo);
    } else if(contact.type === "school"){
      contactsSchool.append(htmlForContactInfo);

    } else if(contact.type === "personal"){
      contactsList.append(htmlForContactInfo);

    }

  });
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".address").html(contact.address);
  $(".type").html(contact.type);
  var buttons = $("#buttons");
  buttons.empty()
  buttons.append("<button class='deleteButton' id=" +  contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("ul#contactsWork").on("click", "li", function() {
    showContact(this.id);
  });
  $("ul#contactsSchool").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
   addressBook.deleteContact(this.id);
   $("#show-contact").hide();
   displayContactDetails(addressBook);
 });
};

function resetFields() {
  $('input#new-first-name').val("");
  $('input#new-last-name').val("");
  $('input#new-phone-number').val("");
  $('input#new-email-address').val("");
  $('input#new-address').val("");

}


$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedAddress = $("input#new-address").val();
    var inputtedType = $("input[name='radioButton']:checked").val();
    console.log("Radio Input Value:", inputtedType);
    console.log(addressBook);
    resetFields();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedAddress, inputtedType);
    console.log(newContact.type);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
