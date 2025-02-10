interface ImageProps {
    width?: number
    height?: number
    alt?: string
    className?: string
    src: string
}

const Image = (props: ImageProps) => {
    const { width, height, className, alt, src } = props;

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
        />
    )
}

export default Image