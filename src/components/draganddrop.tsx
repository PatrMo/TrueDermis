
/*
* TODO:
* Follow this tutorial later:
* https://github.com/InnocentAnyaele/Create-a-Drag-and-Drop-file-component-in-ReactJS-NextJS-Tailwind
* 
* 
* also need to include DragAndDrop in layout.tsx under defaultfunction rootlayout
* just look at where the <Navbar /> component is for context,
* 
* also also need to import it at the top of the layout.tsx page same way navbar is imported.
* 
* link to api when backend is configured
*/
"use client";  
  
import { useRef, useState } from "react";  
export default function DragAndDrop() {  
  const [dragActive, setDragActive] = useState<boolean>(false);  
  const inputRef = useRef<any>(null);  
  const [files, setFiles] = useState<any>([]);  
  
  function handleChange(e: any) {  
    e.preventDefault();  
    console.log("File has been added");  
    if (e.target.files && e.target.files[0]) {  
      console.log(e.target.files);  
      for (let i = 0; i < e.target.files["length"]; i++) {  
        setFiles((prevState: any) => [...prevState, e.target.files[i]]);  
      }  
    }  
  }  
  
  function handleSubmitFile(e: any) {  
    if (files.length === 0) {  
      // no file has been submitted  
    } else {  
      // write submit logic here  
    }  
  }  
  
  function handleDrop(e: any) {  
    e.preventDefault();  
    e.stopPropagation();  
    setDragActive(false);  
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {  
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {  
        setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);  
      }  
    }  
  }  
  
  function handleDragLeave(e: any) {  
    e.preventDefault();  
    e.stopPropagation();  
    setDragActive(false);  
  }  
  
  function handleDragOver(e: any) {  
    e.preventDefault();  
    e.stopPropagation();  
    setDragActive(true);  
  }  
  
  function handleDragEnter(e: any) {  
    e.preventDefault();  
    e.stopPropagation();  
    setDragActive(true);  
  }  
  
  function removeFile(fileName: any, idx: any) {  
    const newArr = [...files];  
    newArr.splice(idx, 1);  
    setFiles([]);  
    setFiles(newArr);  
  }  
  
  function openFileExplorer() {  
    inputRef.current.value = "";  
    inputRef.current.click();  
  }  
  
  return (  
    <div className="flex items-center justify-center h-screen">  
      <form  
        className={`${  
          dragActive ? "bg-blue-400" : "bg-blue-100"  
        }  p-4 w-1/3 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center`}  
        onDragEnter={handleDragEnter}  
        onSubmit={(e) => e.preventDefault()}  
        onDrop={handleDrop}  
        onDragLeave={handleDragLeave}  
        onDragOver={handleDragOver}  
      >  
        {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}  
        <input  
          placeholder="fileInput"  
          className="hidden"  
          ref={inputRef}  
          type="file"  
          multiple={true}  
          onChange={handleChange}  
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"  
        />  
  
        <p>  
          Drag & Drop files or{" "}  
          <span  
            className="font-bold text-blue-600 cursor-pointer"  
            onClick={openFileExplorer}  
          >  
            <u>Select files</u>  
          </span>{" "}  
          to upload  
        </p>  
  
        <div className="flex flex-col items-center p-3">  
          {files.map((file: any, idx: any) => (  
            <div key={idx} className="flex flex-row space-x-5">  
              <span>{file.name}</span>  
              <span  
                className="text-red-500 cursor-pointer"  
                onClick={() => removeFile(file.name, idx)}  
              >  
                remove  
              </span>  
            </div>  
          ))}  
        </div>  
  
        {/* <button  
          className="bg-black rounded-lg p-2 mt-3 w-auto"  
          onClick={handleSubmitFile}  
        >  
          <span className="p-2 text-white">Submit</span>  
        </button> */}  
      </form>  
    </div>  
  );  
}