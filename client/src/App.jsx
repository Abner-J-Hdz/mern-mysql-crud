import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import TaskForm from "./pages/TaskForm";
import TaskPage from "./pages/TasksPage";
import { TaskContextProvider } from "./context/TaskProvider";


function App() {

  return (
    <div className="bg-zinc-900 h-screen">
      <NavBar />
      <div className="container mx-auto px-20 py-4">
        <TaskContextProvider>
          <Routes>
            <Route path="/" element={<TaskPage />} />
            <Route path="/new" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  );
}

export default App
