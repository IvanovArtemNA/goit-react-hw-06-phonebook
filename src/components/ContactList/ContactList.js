import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact, getFilter } from 'redux/Contacts.slice';

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.phonebook.contacts);
  const filter = useSelector(getFilter);

  const onRemoveContact = deletedContactId => {
    dispatch(removeContact(deletedContactId));
  };

  const getContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={css.list}>
      {getContacts.map(({ id, name, number }) => (
        <li key={id} className={css.item}>
          {name + ': ' + number}
          <button
            type="button"
            className={css.remove}
            onClick={() => onRemoveContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
