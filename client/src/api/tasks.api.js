import axios from "axios";

export const getTasksRequest = async () =>
    await axios.get("http://localhost:3001/tasks");

export const createTaskRequest = async (task) => 
    await axios.post('http://localhost:3001/task', task); //return explicito ``

export const deleteTaskRequest = async (idTask) => 
    await axios.delete(`http://localhost:3001/task/${idTask}`);

export const getTaskRequest = async (idTask) => 
    await axios.get(`http://localhost:3001/task/${idTask}`)

export const updateTaskRequest = async (idTask, newFields) => 
    await axios.put(`http://localhost:3001/task/${idTask}`, newFields)

export const toggleTaksDoneRequest = async (idTask, done) =>
    await axios.put(`http://localhost:3001/task/${idTask}`, { Done: done })