import { useState } from "react";
import type Category from "../types/category.interface";
import type Task from "../types/task.interface";
import TasksFilter from "./TaskFilter";
import TaskList from "./TaskList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TaskViewerProps = {
    categories: Category[],
    tasks: Task[] | null,
    nextPage: number | null,
    previousPage: number | null,
    changePage: (pageNumber: number) => void,
    defaultCategory: Category,
    selectedCategory: Category,
    changeSelectedCategory: (newCategory: Category) => void,
    refetch: () => Promise<void>
}

export default function TaskViewer({ categories, tasks, nextPage, previousPage, changePage, defaultCategory, selectedCategory, changeSelectedCategory, refetch }: TaskViewerProps) {
    const [error, setError] = useState<string | null>(null)
    const [responseMessage, setResponseMessage] = useState<string | null>(null)
    // @ts-ignore
    const chevronLeftIcon: IconProp = "fa-solid fa-chevron-left";
    // @ts-ignore
    const chevronRightIcon: IconProp = "fa-solid fa-chevron-right";
    return (
        <section
            className="rounded-lg grow shadow-lg bg-white px-10 py-6"
            onMouseLeave={() => {
                if (responseMessage) setResponseMessage(null)
                if (error) setError(null)
            }}
        >
            <h2 className="mb-6 font-bold text-2xl">Votre To-Do Liste : </h2>
            <TasksFilter categories={categories} defaultCategory={defaultCategory} selectedCategory={selectedCategory} changeSelectedCategory={changeSelectedCategory} />
            {
                tasks && tasks.length > 0 ?
                    (

                        <>
                            {
                                responseMessage
                                && <p className="font-semibold text-green-500 mb-4">{responseMessage}</p>
                            }
                            {
                                error
                                && <p className="font-semibold text-red-700 mb-4">{error}</p>
                            }
                            <TaskList tasks={tasks} setResponseMessage={setResponseMessage} setError={setError} refetch={refetch} />
                        </>

                    )
                    : (<p>Aucune tâche à afficher.</p>)
            }
            <div className="w-full flex flex-row justify-end mt-2">
                {
                    previousPage && <button
                        className="cursor-pointer text-white rounded-lg border-2 border-white size-12 bg-zinc-600"
                        onClick={() => changePage(previousPage)}
                    ><FontAwesomeIcon icon={chevronLeftIcon} /></button>
                }
                {
                    nextPage && <button
                        className="cursor-pointer text-white rounded-lg border-2 border-white size-12 bg-zinc-600"
                        onClick={() => changePage(nextPage)}
                    ><FontAwesomeIcon icon={chevronRightIcon} /></button>
                }
            </div>
        </section>
    )
}