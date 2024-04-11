'use client'


export default function AdminBtn({ text, setComponent }: { text: string, setComponent: () => void }) {
    return(
        <button onClick={setComponent} className="border-2 p-2 hover:bg-customRed hover:text-white hover:border-customRed transition-colors">{text}</button>
    )
}