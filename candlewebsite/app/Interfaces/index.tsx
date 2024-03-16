
export default interface Item {
    id:number,
    name: string,
    category: string,
    price: number,
    image: string[],
    materials: string[],
    description: string,
    colorOptions: string[]
}

export interface CartItemI{
    id:number,
    name:string,
    image:string[],
    price:number,
    color?: string,
    colorOptions?: string[],
    quantity: number,
}

export interface LinkItem{
    itemName: string,
    subCategories?: string[]
}


