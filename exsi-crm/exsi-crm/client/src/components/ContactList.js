import React from 'react';

const ContactList = ({ contacts }) => {
  return (
    <div>
      <h2>Danh sách liên hệ</h2>
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
