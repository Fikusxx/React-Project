import { useNavigate, useNavigation, useActionData } from 'react-router-dom';
import { json, redirect } from "react-router-dom";
import { Form } from 'react-router-dom';
import classes from './EventForm.module.css';

async function newEventAction({ request, params })
{
  const data = await request.formData();
  const method = request.method;

  const event = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description")
  }

  let url = "http://localhost:8080/events/";
  if (method === "PATCH")
  {
    const id = params.id;
    url = url + id;
  }

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.status === 422)
  {
    return response;
  }

  if (response.ok === false)
  {
    throw json({ message: "Couldnt post a new event" }, { status: 500 });
  }

  // redirect user to /events instead of returning a response
  return redirect("/events")
}

function EventForm({ method, event })
{
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  function cancelHandler()
  {
    navigate('..');
  }

  return (
    <Form method={ method } className={ classes.form }>
      {
        data && data.errors &&
        <ul>
          { Object.values(data.errors).map(error =>
          {
            return <li>{ error }</li>
          }) }
        </ul>
      }
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" defaultValue={ event ? event.title : "" } required />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" defaultValue={ event ? event.image : "" } required />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" defaultValue={ event ? event.date : "" } required />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" defaultValue={ event ? event.description : "" } required />
      </p>
      <div className={ classes.actions }>
        <button type="button" onClick={ cancelHandler }>
          Cancel
        </button>
        <button type="submit" disabled={ isSubmitting }>{ isSubmitting ? "Submitting..." : "Save" }</button>
      </div>
    </Form>
  );
}

export { EventForm, newEventAction };
