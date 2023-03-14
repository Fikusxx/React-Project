import { NavLink } from 'react-router-dom';
import classes from './EventsNavigation.module.css';

function EventsNavigation()
{
  function isActive({ isActive })
  {
    return isActive ? classes.active : ""
  }

  return (
    <header className={ classes.header }>
      <nav>
        <ul className={ classes.list }>
          <li><NavLink end to="/events" className={ isActive }>All Events</NavLink> </li>
          <li><NavLink to="/events/new" className={ isActive }>Add Event</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
