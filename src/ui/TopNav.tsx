import { Menu } from 'semantic-ui-react';
import { NavProps } from '../helperFunctions/Props';
import Nav from './Nav';
import './TopNav.css';

function TopNav(props: NavProps) {
  const { children } = props;
  const { nav } = children;

  return (
    <div className="ui menu nav" ref={nav}>
      <Menu.Item href="/" header>Rock Paper Scissors</Menu.Item>
      <span className="show-for-large">
        <Nav />
      </span>
    </div>
  );
}

export default TopNav;
