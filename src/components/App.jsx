import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactList from 'components/ContactList/ContactList';
import AddingContacts from 'components/AddingContacts/AddingContacts';
import { getFromStorage } from 'service/localStorageServic';
import { saveToStorage } from 'service/localStorageServic';

export const App = () => {
  const [contacts, setContacts] = useState(getFromStorage('contacts'));
  const [filter, setFilter] = useState('');

  useEffect(() => {
    saveToStorage('contacts', contacts);
  }, [contacts]);

  const addContact = event => {
    event.preventDefault();
    const { name, number } = event.target;
    const contact = {
      id: nanoid(),
      name: name.value,
      number: number.value,
    };
    const info = contact.name + ' is already in contacts';
    checkAddContact(contacts, contact)
      ? Notify.failure(info)
      : setContacts([...contacts, contact]);
    saveToStorage('contacts', contacts);

    event.target.reset();
  };

  const deleteContact = event => {
    const value = event.target.parentNode.firstChild.textContent;
    setContacts(contacts.filter(item => item.name !== value));
  };

  const checkAddContact = (contacts, newContact) => {
    return contacts.find(contact => contact.name === newContact.name);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = () => {
    const normalizedCase = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedCase)
    );
  };

  const filtred = filteredContacts();

  return (
    <div>
      <AddingContacts title="Name" handleAddContact={addContact} />
      <ContactList
        title="Contacts"
        contacts={filtred}
        handleDeleteContact={deleteContact}
        changeFilter={changeFilter}
      />
    </div>
  );
};
