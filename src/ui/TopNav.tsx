import { NavLink } from 'react-router-dom';
import { NavProps } from '../helperFunctions/Props';
import Nav from './Nav';
import './TopNav.css';

const optionsArr = [
  { key: '3', text: '3', value: '3' },
  { key: '5', text: '5', value: '5' },
];

function TopNav(props: NavProps) {
  const { children } = props;
  const { nav, selectDiv } = children;

  const options = [];

  for (let i = 0; i < optionsArr.length; i += 1) {
    options.push(
      <option key={optionsArr[i].key} value={optionsArr[i].value}>
        {optionsArr[i].text}
      </option>,
    );
  }

  return (
    <div className="ui menu top fixed nav" ref={nav}>
      <NavLink
        activeClassName="active"
        className="header item"
        to="/"
      >
        Rock Paper Scissors
      </NavLink>

      <span className="show-for-large">
        <Nav />
      </span>

      <div className="item" ref={selectDiv}>
        Max Score
        <select
          style={{ padding: '5px 5px' }}
          name="max_score"
          className="ui selection fluid dropdown"
          defaultValue="3"
        >
          {options}
        </select>
      </div>
    </div>
  );
}

export default TopNav;
