import {  useState } from 'react';
import { nanoid } from 'nanoid';

import style from './App.module.css';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import initialContacts from './contacts.json';

import useLocalStorage from 'hooks';

const storageKey = 'storagContacts';


// second option
// const getLocalStorage = () => {
//   return JSON.parse(localStorage.getItem(storageKey)) ?? initialContacts;
//   }


const App = () => {
  // third option
  const [contacts, setContacts] = useLocalStorage(storageKey, initialContacts);
  const [filter, setFilter] = useState('');
  // first option
  // const [contacts, setContacts] = useState(
  //   () => JSON.parse(localStorage.getItem(storageKey)) ?? initialContacts
  // );
  // second option
  // const [contacts, setContacts] = useState(getLocalStorage);
  // useEffect(() => {
  // localStorage.setItem(storageKey, JSON.stringify(contacts));
  // }, [contacts])

  const handleSubmit = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacrs`);
      return;
    }

   const newContact = { name, number, id: nanoid() };
   setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDeleteContact = id => {
    const deletedById = contacts.filter(contact => contact.id !== id);
    setContacts(deletedById);
  };

  const makeContactList = () => {
    if (filter.trim() === '') {
      return contacts;
    }

    const filterNormalize = filter.toLowerCase();
    const findNewArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalize)
    );

    return findNewArray;
  };
  console.log(makeContactList());
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
