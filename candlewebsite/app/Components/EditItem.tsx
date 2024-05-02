'use client'
import { useState,useEffect } from "react";
import { getAllItems,updateItem } from "../services";
import Item from "../Interfaces";
import Compressor from 'compressorjs';

export default function EditItem(){

    const[items,setItems] = useState<Item[]>([]);
    const[item,setItem] = useState<Item>();
    const[copy,setCopy] = useState<Item>();

    const [changesMade,setChangesMade] = useState(false);
    const [message,setMessage] = useState("");

    const[name,setName] = useState("")
    const[category,setCategory] = useState("")
    const[price,setPrice] = useState(0)
    const[images,setImages] = useState<string[]>([])
    const[materials,setMaterials] = useState<string[]>([])
    const[material,setMaterial] = useState("");
    const[description,setDescription] = useState("")
    const[colorOptions,setColorOptions] = useState<string[]>([])
    const[color,setColor] = useState("");
    
    async function fetchData(){
        let item = await getAllItems();
        setItems(item);
        setCopy(item);
    }
    useEffect(() => {
        fetchData();
    }, []);

    function editItem(item: Item){
        setItem(item);
        setName(item.name);
        setCategory(item.category);
        setPrice(item.price);
        setDescription(item.description);
        setImages(item.image);
        setMaterials(item.materials);
        item.colorOptions ? setColorOptions(item.colorOptions) : null;
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
            setMaterials(prevMaterials => prevMaterials.filter(material => material !== item));
        }
        if(type === "color"){
            setColorOptions(prevColors => prevColors.filter(color => color !== item));
        }
      }
      
      function updateListing(type: string, e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault(); 

            const value = e.currentTarget.value.trim(); 
            if (type === "material" && value !== "") {
                setMaterials(prevM => [...prevM, value]);
                setMaterial(""); 
                e.currentTarget.value = "";
                
            } else if (type === "color" && value !== "") {
                setColorOptions(prevColors => [...prevColors, value]);
                setColor("");
                e.currentTarget.value = "";

            }
        }
    }
    async function saveChanges(){
        const updatedItem = {
            name:name,
            category:category,
            price:price,
            image:images,
            materials:materials,
            description:description,
            colorOptions:colorOptions
        }
     
        if(item){
            setMessage("");
            await updateItem(item.id,updatedItem);
        }
        setMessage("your catalog has been updated");
        setChangesMade(false);
        setCopy(item)
        fetchData();
    }
  
   
    return(
        <div className="w-4/5 mb-20">
        {items.map((item,index)=>(<div key={index} className="border-2 m-2 p-2 flex justify-between">{item.name} <button className="hover:text-customRed hover:tarnsition-colors"onClick={()=>{editItem(item)}}>edit</button></div>))}
        {item ? 
            <div className="flex flex-col gap-5 mt-10">
                <>
                    <div className="flex gap-2">
                        <h1>name</h1>
                        <button className="text-gray-500" onClick={()=>setName(item.name)}>(reset)</button>
                    </div>
                    <input value={name} className="w-full border-2 p-2" onChange={(e)=>{setName(e.target.value);setChangesMade(true); }} />
                </>
                <>
                <div className="flex gap-2">
                    <h1>description</h1>
                    <button className="text-gray-500" onClick={()=>setDescription(item.description)}>(reset)</button>
                </div>
                <textarea value={item.description} className="w-full border-2 p-2" onChange={(e)=>{setDescription(e.target.value);setChangesMade(true); }} />
                </>
                <>
                    <div className="flex gap-2">
                        <h1>price</h1>
                        <button className="text-gray-500" onClick={()=>setPrice(item.price)}>(reset)</button>
                    </div>
                    <input value={price} className="border-2" type="number" onChange={(e)=>{setPrice(Number(e.target.value));setChangesMade(true); }}/>
                </>
                <>
                    <div className="flex gap-2">
                        <h1>category</h1>
                        <button className="text-gray-500" onClick={()=>setCategory(item.category)}>(reset)</button>
                    </div>
                    <select value={category} className="border-2 w-full"  onChange={(e)=>{setCategory(e.target.value);setChangesMade(true); }}>
                        <option  value="Dessert Candles">Dessert Candles</option>
                        <option value="Jarred Candles">Jarred Candles</option>
                        <option value="Sculptural Candles">Sculptural Candles</option>
                        <option value="Wax Melts">Wax Melts</option>
                        <option value="Containers">Containers</option>
                    </select>
                </>
                <>
                    <div className="flex gap-2">
                        <h1>images</h1>
                        <button className="text-gray-500" onClick={()=>setImages(item.image)}>(reset)</button>
                    </div>
                    <input className="border-2" type="file" accept="image/*" onChange={(e)=>{handleFileChange(e);setChangesMade(true); }}/>
                    <div className="flex flex-wrap gap-2">
                        {images.map((image,index) =>(<div key={index}><img src={image} className=" h-32"/> <button onClick={()=>{removeItem(image,"image");setChangesMade(true);}} className="text-customRed">remove</button></div>))}
                    </div>
                </>
                <>
                    <div className="flex gap-2">
                        <h1>materials</h1>
                        <button className="text-gray-500" onClick={()=>setMaterials(item.materials)}>(reset)</button>
                    </div>
                    <input id="material" className="border-2" type="text" onKeyDown={(e)=>{updateListing("material",e);setChangesMade(true); }}/>
                    <div className="flex gap-2">
                        {materials.map((material,index) =>(<div key={index}><h2>{material}</h2> <button onClick={()=>{removeItem(material,"material");setChangesMade(true);}} className="text-customRed">remove</button></div>))}
                    </div>
                </>
                {item.colorOptions ? 
                   <>
                    <div className="flex gap-2">
                        <h1>color options</h1>
                        <button className="text-gray-500" onClick={()=>item.colorOptions ? setColorOptions(item.colorOptions) : null}>(reset)</button>
                    </div>
                    <input className="border-2" type="text" onKeyDown={(e)=>{updateListing("color",e);setChangesMade(true); }}/>
                    <div className="flex gap-2">
                        {colorOptions.map((color,index) =>(<div key={index}><h2>{color}</h2> <button onClick={()=>{removeItem(color,"color");setChangesMade(true);}} className="text-customRed">remove</button></div>))}
                    </div>
                   </> : null
                }
                  <div className="flex justify-center gap-2">
                    <button disabled={!changesMade} className={ !changesMade ? `text-gray-300 p-2 border-2` : 'p-2 border-2'} onClick={()=>{saveChanges()}}>save</button>
                    <button disabled={!changesMade} className={ !changesMade ? `text-gray-300 p-2 border-2` : 'p-2 border-2'} onClick={()=>{editItem(item);setChangesMade(false);}}>undo changes</button>
                  </div>
                    <h1 className="text-center mt-5">{message}</h1>
    
            </div> : null
            
            
        } 
         

        </div>
    )
}