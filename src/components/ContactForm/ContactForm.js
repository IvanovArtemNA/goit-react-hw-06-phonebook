import css from './ContactForm.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/Contacts.slice';
import { nanoid } from 'nanoid';

export const ContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    number: '',
  });

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.phonebook.contacts);

  const onInputChange = event => {
    const { name, value } = event.currentTarget;
    setContact(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmit = event => {
    event.preventDefault();

    const contactName = contacts.map(contact => contact.name);
    if (!contactName.includes(contact.name)) {
      dispatch(
        addContact({
          id: nanoid(),
          name: contact.name,
          number: contact.number,
        })
      );
    } else {
      alert(`${contact.name} is already in contacts.`);
    }
    setContact({ name: '', number: '' });
  };

  return (
    <div>
      <form className={css.form} onSubmit={onSubmit}>
        <label className={css.lable}>
          Name
          <input
            className={css.inputContact}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={contact.name}
            onChange={onInputChange}
          />
        </label>
        <label className={css.lable}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={contact.number}
            onChange={onInputChange}
          />
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    </div>
  );
};
