"use strict";

// Contacts Class
class AddressBook {
  constructor () {
    
  }

  addContact(contact) {
    const contacts = document.querySelector(".contacts__container");
    // Create div element
    const div = document.createElement("div");
    // Add class to div
    div.className = "contact";
    // Insert HTML
    div.innerHTML = `
    <p>Name: ${contact.name}</p>
    <p>Email: ${contact.email}</p>
    <p>Phone: ${contact.phone}</p>
    <p>Relation: ${contact.relation}</p>
    <i class="material-icons deleteBtn">delete</i>
    `;
    // Append div to contacts
    contacts.appendChild(div);
    // Clear Form Fields 
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#relation").value = "";
  }

  deleteContact() {

  }

  displayContacts() {

  }

  error(message, className) {

  }
}

// Contact Class
class Contact {
  constructor (name, email, phone, relation) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.relation = relation;
  }
}





// Event Listeners
document.querySelector(".contact__form").addEventListener("submit", function(e) {
  // Get form values
  const name = document.querySelector("#name").value,
        email = document.querySelector("#email").value,
        phone = document.querySelector("#phone").value,
        relation = document.querySelector("#relation").value;

  // Instantiate AddressBook
  const addressBook = new AddressBook();

  // Instantiate Contact
  const contact = new Contact(name, email, phone, relation);

  // Validation
  if (name === "" || email === "" || phone === "" || relation === "") {
    // Error Message
    addressBook.error("PLEASE FILL OUT ALL FIELDS!", "error");
  } else {
    // Add Contact to AddressBook;
    addressBook.addContact(contact);
  }

  e.preventDefault();
});

