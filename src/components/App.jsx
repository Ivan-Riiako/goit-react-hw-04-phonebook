import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import style from './App.module.css';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import initialContacts from './contacts.json';

const storageKey = 'storagContacts';
const getInitalContacts=() => {
  const todosLocalStorage = localStorage.getItem(storageKey);
  return todosLocalStorage!==null?JSON.parse(todosLocalStorage):initialContacts
  }

const App = () => {
  const [contacts, setContacts] = useState(getInitalContacts)
  const [filter, setFilter] = useState('')

  useEffect(() => {
  localStorage.setItem(storageKey, JSON.stringify(contacts));
  }, [contacts])

  const handleSubmit = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacrs`);
      return;
    }
    setContacts(prev => [...prev, { name, number, id: nanoid() }]);
  };

  const handleDeleteContact = id => {
    const deletedById = contacts.filter(contact => contact.id !== id);
    setContacts(deletedById);
  };

  const makeContactList = () => {
  
    const filterNormalize = filter.toLowerCase();

    if (filter.trim() === '') {
      return contacts;
    }
    const findNewArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalize)
    );
    return findNewArray;
  };

    return (
      <div className={style.section}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmit} />
        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <Filter onFindInput={setFilter} inputValueSeach={filter} />
        <ContactList
          contactList={makeContactList()}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    );
  
}

export default App;
