interface ButtonProps {
    text: string
    className?: string | undefined
    handlerEvent: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = ({ text, className, handlerEvent }: ButtonProps) => {
    const defaultClass = className || "bg-black rounded-4xl p-2 text-white text-[18px] mt-3 w-full";

    return <button
        className={defaultClass}
        onClick={handlerEvent}>{text}</button>
}

export default Button