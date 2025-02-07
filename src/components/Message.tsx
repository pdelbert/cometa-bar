import { createPortal } from "react-dom";

interface MessageItemsProps {
    item?: string;
    message: string;
    type: string;
}

const RenderMessage = ({ item, message, type }: MessageItemsProps) => {
    const baseClass = `p-5 text-center w-full absolute top-0`;
    const className = `${baseClass} ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;

    return (
        <div className={className}>
            <p><b>{item}</b> {message}</p>
        </div>
    )
}

const Message = ({ item, message, type }: MessageItemsProps) => {
    return createPortal(
        <RenderMessage item={item} message={message} type={type} />,
        document.body
    )
}

export default Message