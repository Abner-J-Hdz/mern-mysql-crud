import { Formik, Form } from "formik";
import { useTask } from "../context/TaskProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskForm() {

    const [task, setTask ] = useState({
        Title: "",
        Description: ""
    })

    const { createTask, getTask, updateTask } = useTask()

    const params = useParams();
    const navigate = useNavigate();

    const loadGetTask = async () => {
        //cargar la tarea si existe un valor en la url
        if(params.id){
            const taskGet = await getTask(params.id)
            setTask({
                Title: taskGet.Title,
                Description: taskGet.Description,
            })
        }
    }

    useEffect(() => {
        loadGetTask();
    }, [])

//formik
//initialValues => es donde indicamos los valores de inicio
//enableReinitialize => permite reiniciar o recargar los datos del formmulario
//onSubmit cuando enviammos el formulario, recibe como parametros los valores
//del formulario, formik los recibe automaticamente, y actions es de formik...
    return(
        <div className="">
            <Formik
                initialValues={task}
                enableReinitialize={true}
                onSubmit={ async (values, actions) => {
                    //console.log(values)
                    if(params.id){
                       await updateTask(params.id, values);
                       
                    }else{
                        await createTask(values)
                        //navigate("/");
                        //actions.resetForm();
                    }
                    actions.resetForm();
                    setTask({
                        Title: "",
                        Description: "",
                    })
                    navigate("/");
                }}
            >
                {({handleChange, handleSubmit, values, isSubmitting}) => (
                    <Form onSubmit={handleSubmit} 
                        className="bg-slate-600 px-2 py-3 max-w-sm rounded-md mx-auto mt-10">
                        <h1 className="text-xl font-bold uppercase text-center" >{ params.id ? "Edit Task" : "New Task" } </h1>
                        <label className="font-bold block" htmlFor="">Title</label>
                        <input type="text" 
                            name="Title"  
                            placeholder="Write a title"
                            className="px-2 py-1 rounded-sm w-full"
                            onChange={handleChange}
                            value= {values.Title}
                        />

                        <label className="font-bold block" htmlFor="">Description</label>
                        <textarea 
                            name="Description" rows="3" 
                            placeholder="Write a description"
                            className="px-2 py-1 rounded-sm w-full"
                            onChange={handleChange}
                            value= {values.Description}
                        >
                        </textarea>
                        <button 
                            disabled={isSubmitting} 
                            className="block bg-slate-800 px-2 py-1 w-full rounded-md text-white"
                            type="submit"
                        >
                            {isSubmitting ? "Saving " :  "Save"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default TaskForm