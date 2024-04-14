'use client'


export default function AdminBtn({ selected,setButton,text, setComponent }: { selected:boolean,setButton : () => void ,text: string, setComponent: () => void }) {
    return(
        <button  onClick={()=>{setComponent(),setButton()}} className={selected ? "border-2 p-2 bg-customRed border-customRed text-white" : "border-2 p-2 hover:bg-customRed hover:text-white hover:border-customRed transition-colors"}>{text}</button>
    )
}