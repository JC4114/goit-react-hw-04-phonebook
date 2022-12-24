import React, { useState,useEffect } from 'react';
import shortid from 'shortid';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
import initialContacts from './contacts.json';

const INITIAL_STATE = {
  contacts: initialContacts,
  filter:'',
}

const App = () => {
  const [contacts,setContacts] = useState(INITIAL_STATE.contacts)
  const [filter,setFilter] = useState(INITIAL_STATE.filter)

  const addContact = data => {
    const {name,number} = data;
    if(contacts.find(contact => contact.name === name)){
      alert(`${name} is alredy in contacts`)
      return
    }
    const newContact ={
      id: shortid.generate(),
      name,
      number,
    }

    setContacts([newContact,...contacts])
  }
  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !==id))
  }
const filterContacts = event => {
  setFilter(event.currentTarget.value)
}

const normalizedFilter = filter.toLocaleLowerCase()
const filteredContacts = contacts.filter(contact => contact.name.toLocaleLowerCase().includes(normalizedFilter))


useEffect(()=>{
  const localContacts = localStorage.getItem('contact')
  const parsedContacts = JSON.parse(localContacts)
  if(parsedContacts){
    setContacts(parsedContacts)
  }
},[])
useEffect(()=>{
  localStorage.setItem('contacts',JSON.stringify(contacts))
},[contacts])
return(
  <div style={{
    margin: '20px',
    width: '700px',
  }}>
  <h1>Phonebook</h1>
  <ContactForm onSubmit={addContact}/>
  <Filter onChange={filterContacts}/>
  <h2 style={{ marginBottom: '0' }}>Contacts</h2>
      <div style={{ color: 'blue', marginTop: '10px' }}>
        All contacts: {contacts.length}
      </div>
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
  </div>
)

}

export default App