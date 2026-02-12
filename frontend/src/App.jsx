import { useActionState } from "react";
import { useState,useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

export default function App() {

  const [notes, setnotes] = useState([
    {
      title:"",

      description:""
    },
    
  ]

  )
  



  function featchNotes(){
     axios.get("https://notes-app-5-8zq8.onrender.com/notes")

    .then(res=>{
      setnotes(res.data)
    })


  }

 useEffect(()=>{

    featchNotes()


 },[])



function handleDelete(noteid){

 

  axios.delete("https://notes-app-5-8zq8.onrender.com/notes/"+noteid)
  .then(res=>{
    console.log(res.data)

    featchNotes()
  })


}


 function handleSunmit(e){
  e.preventDefault()

  const{title,description}=e.target.elements

  axios.post("https://notes-app-5-8zq8.onrender.com/notes",{
    title:title.value,
    description:description.value
  })

  .then(res=>{
    featchNotes()
  })

 }




 

     const [isOpen, setisOpen] = useState(false)
     const [title, settitle] = useState("")
     const [description, setdescription] = useState("")





  return (



        


    <div className="flex min-h-screen bg-white">

      {/* Sidebar */}
      <div className="w-32 bg-white flex flex-col items-center py-8 border-r border-gray-200">

        {/* Docket Text */}
        <h2 className="text-2xl font-bold mb-12">Docket</h2>

        {/* Add Button */}

        <div onClick={()=>{
          console.log("clicked")
          setisOpen(true)
        }} className="w-12 h-12 bg-gray-800 rounded-full mt-6 active:scale-95 cursor-pointer">
        <div className="text-white text-center mt-1 font-medium text-3xl active:scale-95 cursor-pointer.">+</div>
        </div>

        {/* Add Button end*/}
        
           

        {/* Color Dots */}
       

      </div>

      {/* Main Content */}
      <div className="flex-1 px-20 py-10">

        {/* Search */}
        <div className="flex  mb-8">
          <input
            type="text"
            placeholder="Search"
            className="w-80 px-6 py-3 rounded-full border border-gray-200 outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* Title */}
        <h1 className="text-7xl font-medium mb-12">Notes</h1>

        {/* Notes Section */}
        <div className="flex flex-wrap gap-10">

       {
        notes.map(note=>{
         return <div className="w-72 f h-60 bg-orange-300 rounded-3xl p-6">

            <div className="top flex  justify-between text-center items-center "><h1 className="text-xl font-bold tracking-tight ">{note.title}</h1>
        <div onClick={()=>{handleDelete(note._id)}} className="bg-red-500 p-2 rounded-full cursor-pointer hover:bg-red-600 transition">
  <FaTimes className="text-white text-sm" />
</div>  
  </div>

        <p className="mt-6 text-gray-700 font-medium break-words whitespace-pre-wrap text-medium leading-relaxed">
           {note.description}
        </p>

         
            

          </div>
        })
       }

         


        </div>
      </div>
      {isOpen && (
  
<div className="fixed inset-0 flex items-center justify-center bg-black/30">

    <form onSubmit={handleSunmit} className="bg-white w-70 h-94 p-5 rounded-xl shadow-lg ">
      
      <h2 className="text-lg text-center  font-bold mb-3 text-black">
        Add Note
      </h2>

      <label className="text-sm font-medium text-gray-700 block mt-7 mb-2">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full border mt-1 bg-gray-200  border-gray-200 rounded-lg px-3 py-2 mb-3 outline-none border-none focus:ring-2 focus:ring-gray-200"
      />

      <label className="text-sm font-medium text-gray-700 block mt-1 mb-2">Description</label>
      <textarea
        rows="2"
        name="description"
        placeholder="Description"
        
        className=" mt-3 resize-none w-full border bg-gray-200 rounded-lg px-3 py-2 outline-none border-none focus:ring-2 focus:ring-gray-200"
      ></textarea>

       

       <div className="flex justify-center mt-6">
        <button  onClick={()=>{
          setisOpen(false)
        }} className="bg-gray-200 text-black font-medium px-9 py-2 rounded-full hover:bg-gray-400 transition-colors mr-3">
          Clear
        </button>
        <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-700 transition-colors font-medium">
          Save Note
        </button>
      </div>

    </form>

  </div>


   
)}

    </div>
  );
}


