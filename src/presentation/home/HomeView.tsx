import { Title, Button, Image } from "../../components"
import statics from "../../constants"

interface InitViewProps {
    title: string
    label: string
    handlerEvent: React.MouseEventHandler<HTMLButtonElement>
}

const HomeView = ({ title, label, handlerEvent }: InitViewProps) => {
    return (
        <>
            <div className="flex flex-col items-center justify-between p-10 rounded-2xl h-min-[200px] w-[400px] text-center bg-white border-purple-700 border-1">
                <Image width={200} src={statics.COMETA_LOGO} />
                <Title title={title} />
                <Button text={label} handlerEvent={handlerEvent} />
            </div>
        </>
    )
}

export default HomeView
