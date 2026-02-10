import axios from "axios";
import type Category from "../types/category.interface"
import api from "../utils/api";
import Button from "./Button";
import { useState } from "react";
import React from "react";

type TaskFormProps = {
    categories: Category[],
    refetch: () => Promise<void>

}
function TaskForm({ categories, refetch }: TaskFormProps) {
    const [taskDescription, setTaskDescription] = useState<string>('')
    const [taskCategory, setTaskCategory] = useState<number>(categories[0].id)
    const [error, setError] = useState<Record<string, string> | null>(null)
    const [responseStatus, setResponseStatus] = useState<number | null>(null)

    const addNewTask = async () => {
        setError(null)
        setResponseStatus(null)
        try {
            const newTaskData = {
                description: taskDescription.trim(),
                category: taskCategory
            }
            const response = await api.post(
                "tasks/",
                newTaskData
            )
            console.log(response.data)
            console.log(response.status)
            setResponseStatus(response.status)
            setTaskDescription('')
            setTaskCategory(categories[0].id)
            await refetch()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "Erreur lors de la création de la catégorie :",
                    error.message
                );
                if (error.response) {
                    console.error("Détails API:", error.response.status, error.response.data);
                    setError(error.response.data)
                    setResponseStatus(error.response.status)
                } else if (error.request) {
                    console.error("Erreur réseau:", error.request);
                } else {
                    console.error("Erreur config:", error.message);
                }
            }
            else {
                console.log(error)
            }

        }
    }

    const handleSubmit = () => {
        addNewTask()
    }

    return (
        <section
            className="rounded-lg shadow-lg bg-white px-10 py-6"
            onMouseLeave={() => {
                if (responseStatus) setResponseStatus(null)
                if (error) setError(null)
            }}
        >
            <h2 className="mb-6 font-bold text-2xl">Ajouter un nouvelle tâche : </h2>
            {
                responseStatus && responseStatus === 201
                && <p className="font-semibold text-green-500 mb-4">Nouvelle tâche ajoutée avec succès</p>
            }
            {
                responseStatus && responseStatus !== 201
                && <p className="font-semibold text-red-700 mb-4">Erreur lors de l'ajout de la tâche.</p>
            }
            <form
                action={handleSubmit}
                id="add-task-div"
                className="flex flex-col lg:flex-row justify-between gap-4"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <input
                            className="border rounded-md border-stone-300 py-2 px-4"
                            type="text"
                            name="new-task-description"
                            id="new-task-description"
                            placeholder="Nouvelle tâche..."
                            value={taskDescription}
                            onChange={e => {
                                if (responseStatus) setResponseStatus(null)
                                if (error) setError(null)
                                setTaskDescription(e.target.value)
                                }
                            }
                        />
                        {
                            error?.description && <p className="text-sm  font-bold text-red-600">{error.description}</p>
                        }
                    </div>
                    <div className="flex flex-col">
                        <select
                            className="border rounded-md border-stone-300 bg-stone-300 py-2 px-4"
                            name="new-task-category"
                            id="new-task-category"
                            value={taskCategory}
                            onChange={e => {
                                if (responseStatus) setResponseStatus(null)
                                if (error) setError(null)
                                setTaskCategory(Number(e.target.value))
                            }
                            }
                        >
                            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </select>
                        {
                            error?.category && <p className="text-sm  font-bold text-red-600">{error.category}</p>
                        }
                    </div>
                </div>
                <Button text="Ajouter une tâche" className="lg:self-end lg:min-w-max" />
            </form>
        </section>

    )
}

export default React.memo(TaskForm)