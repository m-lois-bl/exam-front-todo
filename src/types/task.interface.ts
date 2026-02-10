import type Category from "./category.interface";

export default interface Task {
    id: number,
    description: string,
    isCompleted: boolean,
    created_at: string,
    category: Category
}
