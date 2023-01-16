import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { setFilterValue } from 'redux/Contacts.slice';

export const Filter = () => {
  const dispatch = useDispatch();

  const onChange = event => {
    const value = event.currentTarget.value.toLowerCase();

    dispatch(setFilterValue(value));
  };

  return (
    <label className={css.label}>
      Find contacts by name
      <input type="text" onChange={onChange} />
    </label>
  );
};
