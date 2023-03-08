import React, { useEffect, useState } from 'react';
import { useHttp } from './hooks/useHttp';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App()
{
  const [tasks, setTasks] = useState([]);

  const transformTasks = React.useCallback((task) =>
  {
    const loadedTasks = [];

    for (const taskKey in task)
    {
      loadedTasks.push({ id: taskKey, text: task[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const request = useHttp();
  const { isLoading, error, sendRequest } = request;
  const requestConfig = {
    url: "https://react-http-b7c62-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
  }

  useEffect(() =>
  {
    sendRequest(requestConfig, transformTasks);
  }, [sendRequest, transformTasks]);

  const taskAddHandler = (task) =>
  {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={ taskAddHandler } />
      <Tasks
        items={ tasks }
        loading={ isLoading }
        error={ error }
        onFetch={ () => sendRequest(requestConfig, transformTasks) }
      />
    </React.Fragment>
  );
}

export default App;
