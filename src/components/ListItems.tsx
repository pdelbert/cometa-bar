interface ListItemsProps {
    items: any[]
    Children: React.ElementType
}

const ListItems = ({ items, Children }: ListItemsProps) => {
    return items && items.map((item) => <Children item={item} />)
}

export default ListItems