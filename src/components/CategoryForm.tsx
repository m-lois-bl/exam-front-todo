import axios from "axios";
import { useState } from "react";
import Button from "./Button";
import api from "../utils/api";
import React from "react";
import SentryTestComponent from "./SentryTestComponent";

type CategoryFormProps = {
    refetch: () => Promise<void>
}


function CategoryForm({ refetch }: CategoryFormProps) {
    const addCategory = async () => {
        setError(null)
        try {
            const newCategoryData = {
                name: categoryName.trim()
            }
            const response = await api.post(
                "categories/",
                newCategoryData
            )
            console.log(response.data)
            console.log(response.status)
            setCategoryName('');
            setResponseStatus(response.status)
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

    const [categoryName, setCategoryName] = useState<string>('');
    const [error, setError] = useState<Record<string, string> | null>(null)
    const [responseStatus, setResponseStatus] = useState<number | null>(null)
    return (
        <section className="rounded-lg shadow-lg bg-white px-10 py-6" onMouseLeave={() => {
                setResponseStatus(null)
                setError(null)
            }}>
            <h2 className="mb-6 font-bold text-2xl">Ajouter un nouvelle catégorie : </h2>
            {
                responseStatus && responseStatus === 201
                && <p className="font-semibold text-green-500 mb-4">Catégorie créée avec succès</p>
            }
            {
                responseStatus && responseStatus !== 201
                && <p className="font-semibold text-red-700 mb-4">Erreur lors de la création de la catégorie.</p>
            }
            <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex flex-col">
                    <input
                        className="border rounded-md border-stone-300 py-2 px-4"
                        type="text"
                        name="new-category"
                        id="new-category"
                        placeholder="Nouvelle catégorie..."
                        value={categoryName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setError(null)
                            setResponseStatus(null)
                            setCategoryName(e.target.value)
                        }}
                    />
                    {
                        error?.name && <p className="text-sm  font-bold text-red-600">{error.name}</p>
                    }
                </div>
                <Button text="Ajouter une catégorie" onClickFn={addCategory} className="lg:min-w-max"/>
                <SentryTestComponent />
            </div>
        </section>

    )
}

export default React.memo(CategoryForm)