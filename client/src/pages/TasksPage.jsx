import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useTask } from "../context/TaskProvider";

function TaskPage() {

    const { tasks, loadTasks } = useTask();
    
    useEffect(() => {
        loadTasks();
    }, [])
    
    function renderTask(){
        if(tasks.length == 0)
            return <h1>No tasks yet!!!</h1>
        return tasks.map((task) =>(<TaskCard task={task} key={task.Id} />))
    }

    return(
        <div>
            <h1 className="text-5xl text-white font-bold text-center" >Task</h1>
            <div className="grid grid-cols-3 gap-2 py-7">
                {renderTask()}
            </div>
        </div>
    )
}

export default TaskPage