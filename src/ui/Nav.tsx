import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <>
      <NavLink
        activeClassName="active"
        className="item"
        to="/play-with-friend"
      >
        Play With Friend
      </NavLink>

      <NavLink
        activeClassName="active"
        className="item"
        to="/play-with-stranger"
      >
        Play With Stranger
      </NavLink>
    </>
  );
}

export default Nav;
