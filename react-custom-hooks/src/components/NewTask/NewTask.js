import { useHttp } from '../../hooks/useHttp';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) =>
{
  const request = useHttp();
  const { isLoading, error, sendRequest } = request;

  const enterTaskHandler = async (taskText) =>
  {
    function createTask(task)
    {
      const generatedId = task.name;
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    }

    const requestConfig = {
      url: "https://react-http-b7c62-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      method: 'POST',
      body: { text: taskText },
      headers: {
        'Content-Type': 'application/json',
      }
    }

    sendRequest(requestConfig, createTask);
  };

  return (
    <Section>
      <TaskForm onEnterTask={ enterTaskHandler } loading={ isLoading } />
      { error && <p>{ error }</p> }
    </Section>
  );
};

export default NewTask;
