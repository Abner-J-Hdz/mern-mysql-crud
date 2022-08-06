import React from 'react'
import { useTask } from '../context/TaskProvider';
import { useNavigate } from "react-router-dom";

const TaskCard = ({task}) => {

  const { deleteTask, toggleTaskDone } = useTask();

  const navigate = useNavigate();

  const handleDone = async () =>{
    await toggleTaskDone(task.Id)
  }

  return (
    <div className='bg-slate-600 rounded-md p-4'>
      <header className='flex justify-between ' >
        <h2 className='text-sm font-bold' >{task.Title} </h2>
        <span>{task.Done == 1 ? "✅" : "❌"} </span>
      </header>
      <p className='text-xs' >{task.Description} </p>
      <span>{task.CreateAt} </span>
      <div className='flex gap-x-2 py-2' >
        <button 
          className='bg-red-500 px-2 py-1 text-white' 
          onClick={()=>deleteTask(task.Id)}>
            Delete
        </button>
        <button 
          className='bg-slate-800 px-2 py-1 text-white' 
          onClick={()=> navigate(`/edit/${task.Id}`)} >
            Edit
        </button>
        <button
          className='bg-green-500 px-2 py-1 text-white' 
          onClick={()=> handleDone()} >
            Toggle Task
        </button>
      </div>

    </div>
  );
}

export default TaskCard