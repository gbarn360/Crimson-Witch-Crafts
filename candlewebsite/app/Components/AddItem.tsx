'use client'
import { useState } from "react"
import { addItem } from "../services"
import Compressor from 'compressorjs';

export default function AddItem(){

    const[name,setName] = useState("")
    const[category,setCategory] = useState("Dessert Candles")
    const[price,setPrice] = useState<number >()
    const[images,setImages] = useState<string[]>([])
    const[material,setMaterial] = useState("")
    const[materials,setmaterials] = useState<string[]>([])
    const[description,setDescription] = useState("")
    const[color,setColor] = useState("")
    const[colorOptions,setColorOptions] = useState<string[]>([])
    const [error,setError] = useState("")
    const [message,setMessage] = useState("");
    const [addingItem,setAddingItem] = useState(false);

    const categories = ["Dessert Candles", "Jarred Candles", "Sculptural Candles","Wax Melts", "Containers","Other Creations"];
    
    function resetInputFields(){
        setName("");
        setCategory("");
        setPrice(0);
        setmaterials([]);
        setDescription("");
        setColorOptions([]);
        setImages([]);

    }
    async function addItemtoCatalog(){

        if(name && category && price && images && materials.length > 0 && description){
            setAddingItem(true);
            setError("");
            let item;
            if(colorOptions){
                item = {
                    name:name,
                    category:category,
                    price:price,
                    image:images,
                    materials:materials,
                    description:description,
                    colorOptions:colorOptions
                }
            }
            else{
                item = {
                    name:name,
                    category:category,
                    price:price,
                    image:images,
                    materials:materials,
                    description:description,
                }
            }
            
        
            setMessage("")

            await addItem(item);
            setMessage("item has been added to catalog")
            resetInputFields();
            setAddingItem(false);


            setError("");
        }
        else{
            setError("fields not filled in")
        }

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
    
            new Compressor(file, {
                quality: 0.7, 
                width: 1000,
                height: 1000,
                success(compressedFile) {
                    const reader = new FileReader();
                    
                    reader.onload = () => {
                        if (reader.result) {
                            setImages((prevImages) => [...prevImages, reader.result as string]);
                        }
                    };
                    
                    reader.readAsDataURL(compressedFile); // Read the compressed file
                },
                error(err) {
                    console.error('Compression error:', err);
                },
            });
        }
    };

      const removeItem = (item:string,type:string) => {
        if(type === "image"){
            setImages(prevImages => prevImages.filter(image => image !== item));
        }
        if(type === "material"){
            setmaterials(prevMaterials => prevMaterials.filter(material => material !== item));
        }
        if(type === "color"){
            setColorOptions(prevColors => prevColors.filter(color => color !== item));
        }
      }

      const addColors = ()=>{
        setColorOptions(["Black","White","Red","Rose Gold","Violet","Wine Red","Orange","Yellow","Gold", "Blue","Bright bout","Aquamarine","Olive green","Bright green","Lime green","Silver","Teal","Bronze","Gray"]);
      }
    return(
        <div  className="flex flex-col min-w-80 ">

                    <label>Product Name</label>
                    <input type="text" className="border-2 " value={name} onChange={(e)=>setName(e.target.value)}/>

                    <label>Category</label>
                    <select className="border-2 " value={category}  onChange={(e)=>setCategory(e.target.value)}>
                        {categories.map((category,index) => (<option key={index} value={category}>{category}</option>))}
                    </select>
                    

                    <label>Price</label>
                    <input className="border-2" type="number" value={price} onChange={(e)=>setPrice(Number(e.target.value))}/>

                    <label>Images</label>
                    <input className="border-2" type="file" accept="image/*" onChange={(e)=>handleFileChange(e)}/>
                    <div className="flex flex-wrap gap-2">
                        {images.map((image,index) =>(<div key={index}><img src={image} className=" h-32"/> <button onClick={()=>{removeItem(image,"image")}} className="text-customRed">remove</button></div>))}
                    </div>
                    
                    <label>materials</label>
                    <input id="material" className="border-2" type="text" onKeyDown={(e)=>updateListing("material",e)}/>
                    <div className="flex gap-2">
                        {materials.map((material,index) =>(<div key={index}><h2>{material}</h2> <button onClick={()=>{removeItem(material,"material")}} className="text-customRed">remove</button></div>))}
                    </div>

                    <label>description</label>
                    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="h-20 border-2"></textarea>
                   
                    <label className="flex justify-between">Color Options <button onClick={()=>{addColors()}} className="text-sm">add default colors</button></label>
                    <input className="border-2" type="text" onKeyDown={(e)=>updateListing("color",e)}/>
                    <div className="flex gap-2">
                        {colorOptions.map((color,index) =>(<div key={index}><h2>{color}</h2> <button onClick={()=>{removeItem(color,"color")}} className="text-customRed">remove</button></div>))}
                    </div>
                    <h2 className="text-customRed text-center ">{error}</h2>

                    

                    <div className="mt-4  m-auto  mb-10" onClick={()=>{addItemtoCatalog()}}>
                        <button disabled={addingItem} className="p-2 border-2 hover:bg-customRed hover:transition-colors hover:text-white hover:border-transparent">Add item</button>
                    </div>
                    <h1 className="text-center mt-5 mb-5">{message}</h1>
                </div>
    )
}