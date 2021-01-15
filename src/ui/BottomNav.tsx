import { NavProps } from '../helperFunctions/Props';
import Nav from './Nav';

function BottomNav(props: NavProps) {
  const { children } = props;
  const { nav } = children;

  return (
    <div className="ui bottom fixed two item menu show-for-medium nav" ref={nav}>
      <Nav />
    </div>
  );
}

export default BottomNav;
