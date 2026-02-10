import { cn } from "../utils/cn"

type ButtonProps = {
    text: string,
    onClickFn?: () => void,
    className?: string
}

export default function Button({ text, onClickFn, className }: ButtonProps) {
    if (onClickFn) {
        return (
            <button
                className={cn("bg-pink-700 text-white tracking-wide hover:bg-pink-50 hover:border-3 hover:border-pink-700 rounded-md hover:text-pink-700 font-bold py-3 px-6 hover:cursor-pointer hover:scale-95 transition-all duration-300 ease-out", className)}
                onClick={() => onClickFn()}
            >
                {text}
            </button>
        )
    }
    else {
        return (
            <button
                className={cn("bg-pink-700 text-white tracking-wide hover:bg-pink-50 hover:border-3 hover:border-pink-700 rounded-md hover:text-pink-700 font-bold py-3 px-6 hover:cursor-pointer hover:scale-95 transition-all duration-300 ease-out", className)}
            >
                {text}
            </button >
        )
    }
}