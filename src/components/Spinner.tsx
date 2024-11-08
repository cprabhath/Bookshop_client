const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
       <div
         className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-4 border-primary-600 rounded-full border-t-transparent border-solid"
         role="status"
       >
         <span className="sr-only">Loading...</span>
       </div>
     </div>
  )
}

export default Spinner