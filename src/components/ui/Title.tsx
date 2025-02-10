export interface TitleProps {
    title: string
}

const Title = ({ title }: TitleProps) => {
    return <h1 className="text-lg mb-15 mt-2 font-light text-gray-400">{title}</h1>
}

export default Title
