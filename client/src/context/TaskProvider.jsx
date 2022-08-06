import { useContext, useState } from 'react'
import { getTasksRequest, deleteTaskRequest, 
    createTaskRequest, getTaskRequest, 
    updateTaskRequest, toggleTaksDoneRequest } 
    from '../api/tasks.api';
import { TaskContext } from './TaskContext';

//hook que se va utilizar en los componentes donde se requieran
export const useTask = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
      throw new Error("useTasks must be used within a TaskContextProvider");
    }
    return context;
  };
  
//componente que envuelve la aplicacion 
export const TaskContextProvider = ({children}) => {

    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        const response = await getTasksRequest();
        //console.log(response)
        setTasks(response.data)
    }

    const deleteTask = async (idTask) => {
        try {
            const response = await deleteTaskRequest(idTask)
            loadTasks();
        } catch (error) {
            console.log("No  se que pex con el error deleteTask")
            console.log(error)
        }
    }  

    const createTask = async (task) =>
    {
        try {
            const response = await createTaskRequest(task)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const getTask = async (idTask) => {
        try {
            const response = await getTaskRequest(idTask)
            return  response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async (idTask, newFields) => {
        try {
            const response = await updateTaskRequest(idTask, newFields)
            console.log(response)
            return  response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const toggleTaskDone = async (idTask) => {
        try {
            const taskFound = tasks.find((task) => task.Id === idTask)
            await toggleTaksDoneRequest(idTask, taskFound.Done === 0 ? true : false )
            setTasks(
              tasks.map((task) =>
                task.Id === idTask ? { ...task, Done: !task.Done } : task
              )
            );
            
            //loadTasks();
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <TaskContext.Provider value={{
            tasks, loadTasks, deleteTask, createTask, getTask, updateTask, toggleTaskDone
            }}>
            {children}
        </TaskContext.Provider>
    ) 
}
