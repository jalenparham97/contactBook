"use strict";

// Contacts Class
class AddressBook { 

  addContact(contact) {
    const contacts = document.querySelector(".contacts__container");
    // Create li element
    const li = document.createElement("li");
    // Add class to div
    li.className = "contact";
    // Insert HTML
    li.innerHTML = `
    <div class="contact__container"
    <p>Name: ${contact.name}</p>
    <p>Email: ${contact.email}</p>
    <p>Phone: ${contact.phone}</p>
    <p>Relation: ${contact.relation}</p>
    </div>
    `;
    // Create a tag
    const deleteBtn = document.createElement("a");
    deleteBtn.innerHTML = `<i class="material-icons">delete</i>`;
    // Add class to a tag
    deleteBtn.classList.add("deleteBtn");
    // Append a tag to li
    li.appendChild(deleteBtn);
    // Append div to contacts
    contacts.appendChild(li);
    // Clear Form Fields 
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#relation").value = "";
  }

  deleteContact(target) {
    if (target.parentElement.classList.contains("deleteBtn")) {
      target.parentElement.parentElement.remove();
    }
  }

  static getContacts() {
    let contacts;
    if (localStorage.getItem("contacts") === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem("contacts"));
    }

    return contacts;
  }

  static storeContacts(contact) {
    const contacts = AddressBook.getContacts();

    contacts.push(contact);

    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  static displayContacts() {
    const contacts = AddressBook.getContacts();

    contacts.forEach((contact) => {
      const addressBook = new AddressBook();

      // Add contact to Address Book
      addressBook.addContact(contact);
    });
  }
  static removeContact(li) {
    const contacts = AddressBook.getContacts();

    contacts.forEach((contact, index) => {
      if (contact.className === li.className) {
        contacts.splice(index, 1);
      }
    });

    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
  error(message) {
    // Create Error div element
    const errorDiv = document.createElement("div");
    // Add class
    errorDiv.className = `error`;
    // Add text node
    errorDiv.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".form__container");
    // Get form
    const form = document.querySelector(".contact__form");
    // Insert Error
    container.insertBefore(errorDiv, form);
    // Timout after 3 sec
    setTimeout(function() {
      document.querySelector(".error").remove();
    }, 3000);
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

// DOM Load Event
document.addEventListener("DOMContentLoaded", AddressBook.displayContacts);

// Event Listener for adding contact
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
    addressBook.error("PLEASE FILL OUT ALL FIELDS!");
  } else {
    // Add Contact to AddressBook;
    addressBook.addContact(contact);

    // Add to local storage 
    AddressBook.storeContacts(contact);
  }

  e.preventDefault();
});

// Event Listener for deleting contacts
document.querySelector(".contacts__container").addEventListener("click", function(e) {
  //Instantiate AddressBook
  const addressBook = new AddressBook();

  addressBook.deleteContact(e.target);

  // Remove from Local storage
  AddressBook.removeContact(e.target.parentElement.parentElement.className);

  e.preventDefault();
});

