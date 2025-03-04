import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { ImSpinner9 } from "react-icons/im";
import { getAllWahanasbyVenue } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { getAllWahanas } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { deleteWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { FaArrowRight } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
// import { getWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";



import wahanaDummy1 from "../../assets/images/Frame10.png";
import { getAllVenues } from "../../redux/reducers/apiReducers/venueApiReducer";

import { MdDelete } from "react-icons/md";

const HeaderWahanas = ()=>{

  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { wahanas, loading } = useSelector((state) => state.wahana);
  console.log("logging the loadign for wahanas are", wahanas)
  const { venues } = useSelector((state) => state.venues);

  const [selectedVenue, setSelectedVenue] = useState(null);
  console.log("selected venue is ", selectedVenue)
  const [selectedWahana, setSelectedWahana] = useState(null)
  console.log("logging the selected wahana is", selectedWahana)
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true)
  console.log("edit modal open",editModalOpen)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteWahanaId,setDeleteWahanaId] = useState(null)
  const [deleteVenueId,setDeleteVenueId] = useState(null)

const [wahanaDescription, setWahanaDescription] = useState("")

  useEffect(() => {
    if (loading && initialLoad) {
     
      setInitialLoad(true);
    } else if (!loading && initialLoad) {
    
      setInitialLoad(false);
    }
  }, [loading]);



  useEffect(() => {
    dispatch(getAllVenues({ backend, pageLimit: 100, currPage: 0 }));
  }, [dispatch, backend]);



  useEffect(() => {
   
    if (selectedVenue) {
      // setSpinner(true)
      headerFetchWahanas(selectedVenue);
    }else{
      
      dispatch(getAllWahanas({backend, chunkSize:100, pageNo:0}))
      setInitialLoad(false)

    }
  
  }, [selectedVenue]);


  const headerFetchWahanas = (venueId) => {
    // console.log("venue id is",venueId)
    dispatch(
      getAllWahanasbyVenue({
        backend,
        chunkSize: 100,
        pageNo: 0,
        venueId: venueId,
      })
    );
  };


  const delete_Wahana = (wahanaId, venueId)=>{
     
    // console.log("handle delete",selectedWahana)
   
    setDeleteWahanaId(wahanaId)
    setDeleteVenueId(venueId)
    setDeleteModalVisible(true)

  }

  const confirmDeleteWahana = () => {
    console.log("handle delete ids are", deleteWahanaId)
     console.log("handle delete ids are", deleteVenueId)
     dispatch(deleteWahana({backend, deleteVenueId, deleteWahanaId}))
     setDeleteModalVisible(false); // Close the modal
  };


  const handleDescription = (description)=>{
    console.log("wahana description is ", description)

    setDescriptionModal(true)
    setWahanaDescription(description)
  }

  const closeDescription = ()=>{
    setDescriptionModal(false)
  }

  // header wahana card 

  const HeaderWahanaCard = ({ wahana, delete_Wahana, loading}) => {
  const name = wahana.venueId.split('#')[0];
  console.log("venue name is", name)
    const bannerImage = wahana.image || wahanaDummy1;
    return (
      <div className="bg-card flex h-96 flex-col overflow-hidden rounded-2xl shadow relative group">
      <div className="flex flex-col relative">
        <div className="flex items-center justify-between p-6 z-10">
          <div className="rounded-full px-3 py-0.5 text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-500 dark:text-blue-50">
            {name}
          
          </div>
          
      {/* <div className = "p-1" onClick={()=> setSelectedWahana(wahanaId)}>
          <button className =""  onClick={onEditClick}><FaEdit clasName ="opacity-80" size={25} onClick ={()=>setSelectedVenue(venueId)}/></button>
          </div> */}

          {/* <div className = " " onClick={()=> setSelectedWahana(wahana.id)}>
            <div className = "" onClick ={()=>setSelectedVenue(wahana.venueId)}> */}
            <div className ="bg-blue-100 rounded-full h-7 w-7 text-center pt-1">
            <button onClick = {()=>delete_Wahana(wahana.id, wahana.venueId)} disabled = {loading}>
            
            {loading ? "Deleting..." : <MdDelete className = "text-blue-700" size ={23}/>}
            </button>
            </div>
            {/* </div>
         </div> */}

        </div>
        <div
          className="absolute h-60 w-full inset-0 group-hover:scale-110 transition-all duration-500"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
      </div>
      <div className="mt-auto flex w-full flex-col p-6">
        <div className="text-lg font-medium">{wahana.ride_title}</div>
        <div className="text-secondary mt-0.5 line-clamp-1">
          {/* {wahana.description} */}
          <div className ="flex" onClick ={()=>handleDescription(wahana.description)}>
          <p className ="text-red-500 font-md">View description</p>
          <FaArrowRight className ="mt-1 ml-1 text-red-500"/>
          </div>

        </div>
        <div className="flex items-baseline whitespace-nowrap">
          <div className="mr-2 text-2xl">IDR</div>
          <div className="text-6xl font-semibold leading-tight tracking-tight">
         {parseInt(wahana?.price)}
          </div>
          <div className="text-secondary text-2xl">/person</div>
          {/* <button className="mt-8 sm:ml-auto sm:mt-0" onClick={onEditClick}>
            <div className="inline-flex items-center align-middle bg-secondary px-3 py-2 rounded-full text-white">
              Edit Wahana
            </div>
           
          </button> */}
        </div>
      </div>
    </div>
    );
  };


  const HeaderWahanaMain = ({
    wahanaData,
  venues,
  selectedVenue,
  selectedWahana,
  setSelectedVenue,
  onCreateClick,
  onEditClick,
  loading,
  setSelectedWahana,
  delete_Wahana,
  initialLoad
  }) => {


    const SkeletonLoader = () => {
      return (
        <div className="animate-pulse flex flex-col p-4 bg-gray-300 rounded-lg shadow-md min-w-65 min-h-80 mt-8 mx-3">
        {/* title and delete btn */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gray-400 h-4 w-[25%] rounded"></div> 
          <div className="bg-gray-400 h-4 w-8 rounded"></div>    
        </div>
    
        {/* Bottom section*/}
        <div className="space-y-2 mt-auto">
          <div className="h-3 bg-gray-400 rounded w-1/2"></div>
          <div className="h-5 bg-gray-400 rounded w-1/2"></div>
          <div className="h-3 bg-gray-400 rounded w-1/2"></div>
        </div>
      </div>
       
      );
    };

    return (
      <div className="flex flex-auto p-6 sm:p-10">
      <div className="mx-auto flex w-full max-w-xs flex-auto flex-col sm:max-w-5xl">
        <div className="flex w-full max-w-xs flex-col justify-center sm:max-w-none sm:flex-row ">
          <select
            value={selectedVenue || ""}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="bg-card text-icon px-4 min-h-12 rounded-full border border-border sm:w-36"
          >
           
            <option value="" className="min-h-12">
              All Wahanas
            </option>
            {venues?.map((venues) => (
              <option key={venues.id} value={venues.id} className="min-h-12">
                {venues.Title}
              </option>
            ))}
          </select>

          <div className="px-4 mt-4 sm:ml-4 sm:mt-0 sm:w-72 min-h-12 lg:min-w-[68%] md:min-w-[55%] rounded-full border border-border flex items-center bg-card text-icon">
            <HiMagnifyingGlass size={20} />
            <input
              type="text"
              placeholder="Search wahanas"
              className=" bg-transparent outline-none ml-4 lg:w-1000px"
            />
          </div>

         
         
        </div>
        {loading && initialLoad ? (
          <div className ="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonLoader/>
          <SkeletonLoader/>
          <SkeletonLoader/>
        </div>
        
        ):loading?
        (
          <div className="mt-8 text-center">

      <div className="flex justify-center mt-30"><ImSpinner9 className = "animate-spin text-7xl opacity-80"/></div>
          </div>
        ) :  (
          <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {wahanaData?.map((wahana) => (
              <HeaderWahanaCard
                key={wahana.id}
                wahana={{
                  ...wahana,
                  title: wahana.ride_title,
                  price: wahana.price,
                  image: wahana.banner?.data,
                }}
                onEditClick ={onEditClick}
                wahanaId = {wahana.id}
                venueId = {wahana.venueId}
                setSelectedWahana = {setSelectedWahana}
                setSelectedVenue = {setSelectedVenue}
                selectedVenue = {selectedVenue}
                selectedWahana = {selectedWahana}
                delete_Wahana = {delete_Wahana}
                loading = {loading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    );
  };

 


  return (
    <>
    {/* description modal */}
  {descriptionModal &&
    <div className="fixed inset-0 z-40 min-h-60 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-3 rounded-lg shadow-lg min-h-50 min-w-80 lg:min-h-50 lg:max-w-100 mx-4">
   <div className ="flex">
    <h1 className ="text-gray-900 text-3xl mb-2 font-md">Description</h1>
      <div onClick = {closeDescription} className ="ml-auto flex justify-end opacity-85">
      <IoCloseCircle size ={30}/>
      </div>
      </div>
      <p className="text-lg text-slate-500">
       {wahanaDescription}
      
      </p>
      
    </div>
  </div>
  
  
  }
     {/* delete modal */}
     {deleteModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center rounded justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">
              Are you sure you want to delete this wahana?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded mr-4"
                onClick={()=>confirmDeleteWahana()}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setDeleteModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}




        <div className="bg-gray-200 min-h-screen p-2">
          <div className = "bg-white p-2">
        {/* <svg
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 pointer-events-none opacity-25"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="100"
              className="text-gray-700 opacity-25"
            >
              <circle r="234" cx="196" cy="23"></circle>
              <circle r="234" cx="790" cy="491"></circle>
            </g>
          </svg> */}

          <div className="relative z-10 flex flex-col items-center text-text">
            <div className="text-xl font-semibold">MAHAKA'S</div>
            <div className="text-center text-4xl font-extrabold leading-tight tracking-tight sm:text-7xl">
              Wahana
            </div>
          </div>
          </div>

          <HeaderWahanaMain
          wahanaData={wahanas}
          venues={venues}
          selectedVenue={selectedVenue}
          setSelectedVenue={setSelectedVenue}
         
          loading={loading}
          onEditClick = {()=> setEditModalOpen(true)}
          setSelectedWahana = {setSelectedWahana}
          initialLoad={initialLoad}
          delete_Wahana = {delete_Wahana}
          selectedWahana = {selectedWahana}
        />
    
       </div>
    </>
  )
}


export default HeaderWahanas;