import { json, useLoaderData, defer, Await } from 'react-router-dom';
import React from 'react'
import EventsList from '../components/EventsList';

async function loadEvents()
{
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok)
  {
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else
  {
    const data = await response.json();
    return data.events; // [ {}, {}, ... ]
  }
}

function eventsLoader()
{
  // returns { events: [...] }
  return defer({
    events: loadEvents()
  });
}

function EventsPage()
{
  // data is an object returned by defer()
  // data = {events: Promise}
  const data = useLoaderData();

  return (
    <React.Suspense fallback={ <div>Loading...</div> }>
      <Await resolve={ data.events }>
        { (loadedEvents) => <EventsList events={ loadedEvents } /> }
      </Await>
    </React.Suspense>
  )
}

export { EventsPage, eventsLoader }
