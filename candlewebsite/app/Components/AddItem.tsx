'use client'
import AdminBtn from "../Components/AdminBtn"
import { useState } from "react"

export default function AddItem(){

    const[name,setName] = useState("")
    const[category,setCategory] = useState("")
    const[price,setPrice] = useState(0)
    const[images,setImages] = useState<string[]>([])
    const[material,setMaterial] = useState("")
    const[materials,setmaterials] = useState<string[]>([])
    const[description,setDescription] = useState("")
    const[color,setColor] = useState("")
    const[colorOptions,setColorOptions] = useState<string[]>([])

    function addItemtoCatalog(){
        //check if all item fields are used 
    }
    function updateListing(type: string, e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault(); 

            const value = e.currentTarget.value.trim(); 
            if (type === "material" && value !== "") {
                setmaterials(prevM => [...prevM, value]);
                setMaterial(""); 
                e.currentTarget.value = "";
                
            } else if (type === "color" && value !== "") {
                setColorOptions(prevColors => [...prevColors, value]);
                setColor("");
                e.currentTarget.value = "";

            }
        }
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result) {
              setImages(prevImages => [...prevImages, reader.result as string]);
            }
          };
          reader.readAsDataURL(file);
        }
      };
    return(
        <div  className="flex flex-col w-1/3 ">
                    <label>Product Name</label>
                    <input type="text" className="border-2 " onChange={(e)=>setName(e.target.value)}/>

                    <label>Category</label>
                    <select className="border-2 " onChange={(e)=>setCategory(e.target.value)}>
                        <option  value="Dessert Candles">Dessert Candles</option>
                        <option value="Jarred Candles">Jarred Candles</option>
                        <option value="Sculptural Candles">Sculptural Candles</option>
                        <option value="Wax Melts">Wax Melts</option>
                        <option value="Containers">Containers</option>
                    </select>

                    <label>Price</label>
                    <input className="border-2" type="number" onChange={(e)=>setPrice(Number(e.target.value))}/>

                    <label>Images</label>
                    <input className="border-2" type="file" accept="image/*" onChange={(e)=>handleFileChange(e)}/>
                    <div className="flex">
                        {images.map(image =>(<img src={image} className=" h-32"/>))}
                    </div>
                    
                    <label>materials</label>
                    <input id="material" className="border-2" type="text" onKeyDown={(e)=>updateListing("material",e)}/>
                    <div className="flex gap-2">
                        {materials.map(material =>(<h2>{material}</h2>))}
                    </div>

                    <label>description</label>
                    <textarea onChange={(e)=>setDescription(e.target.value)} className="h-20 border-2"></textarea>

                    <label>Color Options</label>
                    <input className="border-2" type="text" onKeyDown={(e)=>updateListing("color",e)}/>
                    <div className="flex gap-2">
                        {colorOptions.map(color =>(<h2>{color}</h2>))}
                    </div>
                    

                    <div className="mt-4  m-auto" onClick={()=>{addItemtoCatalog()}}>
                        <AdminBtn text="Add Item" />
                    </div>
                </div>
    )
}