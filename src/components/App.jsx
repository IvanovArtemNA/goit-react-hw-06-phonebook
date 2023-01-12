import React from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(
    () =>
      parsedContacts ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const newContact = {
      name: contact.name,
      number: contact.number,
      id: nanoid(),
    };

    if (contacts.some(event => event.name === contact.name)) {
      alert(`${contact.name} is already in contacts.`);
    } else {
      return setContacts(prevState => [newContact, ...prevState]);
    }
  };

  const filterContacts = event => {
    setFilter(event.currentTarget.value);
  };

  const getContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const removeContacts = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div style={{ margin: '0 auto', width: '333px' }}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts </h2>
      <Filter value={filter} onChange={filterContacts} />
      <ContactList contacts={getContacts} onRemoveContact={removeContacts} />
    </div>
  );
};
