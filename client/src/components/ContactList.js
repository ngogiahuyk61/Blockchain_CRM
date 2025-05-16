import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "" });

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/contacts");
        setContacts(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách liên hệ:", error);
      }
    };

    fetchContacts();
  }, []);

  // Add new contact
  const handleAddContact = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/contacts", newContact);
      setContacts([...contacts, response.data]);
      setNewContact({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Lỗi khi thêm liên hệ:", error);
    }
  };

  return (
    <div className="contact-list">
      <h2>Danh sách liên hệ</h2>
      <div className="add-contact">
        <input
          type="text"
          placeholder="Tên"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Số điện thoại"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <button onClick={handleAddContact}>Thêm Liên Hệ</button>
      </div>

      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} - {contact.email} - {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
