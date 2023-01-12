import PropTypes from 'prop-types';
import React from 'react';
import css from './ContactForm.module.css';
import { useState } from 'react';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onInputChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };
  const onSubmit = event => {
    event.preventDefault();
    addContact({ name, number });
    setName('');
    setNumber('');
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
            value={name}
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
            value={number}
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

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
