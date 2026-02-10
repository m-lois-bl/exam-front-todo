import type Task from "../types/task.interface";
import Button from "./Button";
import api from "../utils/api";
import axios from "axios";

type TaskListProps = {
    tasks: Task[],
    setError: (error: string | null) => void,
    setResponseMessage: (message: string | null) => void,
    refetch: () => Promise<void>
}

export default function TaskList({ tasks, setResponseMessage, setError, refetch }: TaskListProps) {
    const deleteTask = async (taskId: number) => {
        setResponseMessage(null)
        setError(null)
        try {
            const response = await api.delete(
                `tasks/${taskId}/`,

            )
            console.log(response.data)
            console.log(response.status)
            setResponseMessage("Tâche supprimée avec succès.")
            await refetch()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "Erreur lors de la suppression d'une tâche :",
                    error.message
                );
                if (error.response) {
                    console.error("Détails API:", error.response.status, error.response.data);
                    setError(`Erreur lors de la suppression d'une tâche : ${error.response.data}`)
                } else if (error.request) {
                    setError("Erreur réseau survenue pendant la requête de suppression d'une tâche.")
                    console.error("Erreur réseau:", error.request);
                } else {
                    setError("Erreur de configuration survenue pendant la requête de suppression d'une tâche.")
                    console.error("Erreur config:", error.message);
                }
            }
            else {
                console.log(error)
            }

        }
    }

    const patchTask = async (taskId: number, isCompleted: boolean) => {
        setResponseMessage(null)
        setError(null)
        try {
            const response = await api.patch(
                `tasks/${taskId}/`,
                {
                    isCompleted: isCompleted
                }

            )
            console.log(response.data)
            console.log(response.status)
            setResponseMessage("Tâche modfiée avec succès.")
            await refetch()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "Erreur lors de la modification d'une tâche :",
                    error.message
                );
                if (error.response) {
                    console.error("Détails API:", error.response.status, error.response.data);
                    setError(`Erreur lors de la modification d'une tâche : ${error.response.data}`)
                } else if (error.request) {
                    setError("Erreur réseau survenue pendant la requête de modification d'une tâche.")
                    console.error("Erreur réseau:", error.request);
                } else {
                    setError("Erreur de configuration survenue pendant la requête de modification d'une tâche.")
                    console.error("Erreur config:", error.message);
                }
            }
            else {
                console.log(error)
            }

        }
    }

    return (
        <>
            <ul id="task-list" className="flex flex-col gap-2" onMouseLeave={() => {
                setResponseMessage(null)
                setError(null)
            }}>
                {tasks.map((task) => {
                    return (

                        <li key={task.id} className={`flex justify-between items-center p-4 rounded-md transition-all duration-300 ease-out ${task.isCompleted ? 'bg-zinc-200' : 'bg-pink-200'}`}>
                            <TaskItem task={task} patchTask={patchTask} deleteTask={deleteTask} refetch={refetch} />
                        </li>

                    );
                })
                }
            </ul>
        </>

    );
}

type TaskProps = {
    task: Task,
    patchTask: (id: number, isCompleted: boolean) => void,
    deleteTask: (taskId: number) => void,
    refetch: () => Promise<void>
}

function TaskItem({ task, patchTask, deleteTask }: TaskProps) {
    const deleteOnClick = () => {
        deleteTask(task.id);
    }
    return (
        <>
            <div className="flex flex-row items-center mr-4">
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => patchTask(task.id, !task.isCompleted)}
                />
                <label className={`ml-4 text-nowrap ${task.isCompleted ? 'line-through' : ''}`}>{task.description}</label>
            </div>
            <Button text="Supprimer" onClickFn={deleteOnClick} className="self-end" />
        </>
    );
}