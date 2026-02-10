import { useState } from "react";
import useFetchPaginated from "../hooks/useFetchPaginated";
import type Category from "../types/category.interface";
import type Task from "../types/task.interface";
import TaskForm from "../components/TaskForm";
import useFetchAll from "../hooks/useFetchAll";
import CategoryForm from "../components/CategoryForm";
import TaskViewer from "../components/TaskViewer";

const defaultCategory: Category = {
    id: 0,
    name: 'Toutes'
}

export default function Tasks() {
    const [selectedCategory, setSelectedCategory] = useState<Category>(defaultCategory)
    const [taskFilters, setTaskFilters] = useState<Record<string, string> | undefined>(undefined)
    const categoriesQuery = useFetchAll<Category>('categories/', undefined);
    const tasksQuery = useFetchPaginated<Task>('tasks/', taskFilters);

    const changeSelectedCategory = (category: Category) => {
        setSelectedCategory(category)
        if (category === defaultCategory) {
            setTaskFilters(undefined)
        }
        else {
            const newFilters = {
                'category': String(category.id)
            }
            setTaskFilters(newFilters)
        }
    }

    const changePage = (pageNumber: number) => {
        if (selectedCategory === defaultCategory) {
            setTaskFilters({
                'page': String(pageNumber)
            })
        }
        else {
        setTaskFilters({
            'page': String(pageNumber),
            'category': String(selectedCategory.id)

        })
    }

}

const loading = categoriesQuery.loading || tasksQuery.loading

return (
    <div className="relative">
        {/* Overlay pendant le chargemtn des données */}
        {loading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                <div className="animate-spin h-12 w-12 border-4 border-pink-600 border-t-transparent rounded-full"></div>
            </div>
        )}
        <div className={`container ${loading ? 'opacity-50' : ''}`}>
            <div className="w-full mx-auto flex flex-col xl:flex-row gap-6">
                <div className="flex flex-col gap-6">
                    {/* Erreurs */}
                    {!categoriesQuery.loading && categoriesQuery.error && (
                        <div className="rounded-lg shadow-lg bg-red-700 px-10 py-6">
                            <p className="text-white">Catégories : {categoriesQuery.error}</p>
                        </div>
                    )}
                    {!tasksQuery.loading && tasksQuery.error && (
                        <div className="rounded-lg shadow-lg bg-red-700 px-10 py-6 ">
                            <p className="text-white">Tâches : {tasksQuery.error}</p>
                        </div>
                    )}
                    <CategoryForm key="category-form" refetch={categoriesQuery.refetch} />
                    {/* Données de catégories chargées : affichage du formulaire de création de tâches */}
                    {
                        categoriesQuery.data && categoriesQuery.data.length > 0 ?
                            (<TaskForm categories={categoriesQuery.data} refetch={tasksQuery.refetch} />)
                            : (
                                <section className="rounded-lg shadow-lg bg-white px-10 py-6">
                                    <h2 className="mb-6 font-bold text-2xl">Ajouter un nouvelle tâche : </h2>

                                    <p>Impossible d'afficher le formulaire de création de tâche. Données de catégories absentes.</p>
                                </section>

                            )
                    }
                </div>
                {/* Données de catégories chargées : affichage de la liste de tâches*/}
                {
                    categoriesQuery.data
                    && (

                        <TaskViewer
                            categories={categoriesQuery.data}
                            tasks={tasksQuery.data}
                            nextPage={tasksQuery.nextPage}
                            changePage={changePage}
                            previousPage={tasksQuery.previousPage}
                            defaultCategory={defaultCategory}
                            selectedCategory={selectedCategory}
                            changeSelectedCategory={changeSelectedCategory}
                            refetch={tasksQuery.refetch}
                        />
                    )
                }
            </div>
        </div>
    </div>

);
}