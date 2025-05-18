import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ContactList from '../components/ContactList';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    api.get('/contacts')
      .then((res) => setContacts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Trang Liên Hệ</h1>
      <ContactList contacts={contacts} />
    </div>
  );
};

export default ContactsPage;
