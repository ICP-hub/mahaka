import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { ImSpinner9 } from "react-icons/im";
import { getAllWahanasbyVenue } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { getAllWahanas } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { deleteWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { getWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import CreateWahanaForm from "../components/CreateWahanaForm";
import EditWahanaForm from "../components/EditWahanaForm";
import wahanaDummy1 from "../../assets/images/Frame10.png";
import { getAllVenues } from "../../redux/reducers/apiReducers/venueApiReducer";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import wahanaDummy2 from "../../assets/images/Frame11.png";
// import wahanaDummy3 from "../../assets/images/Frame7.png";
// import wahanaDummy4 from "../../assets/images/Frame8.png";
// import { FaRupiahSign } from "react-icons/fa6";

// const wahanaData = [
//   {
//     id: 1,
//     title: "Wahana One",
//     description:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit sunt aut explicabo magnam rem! Ipsam, enim. Ipsum cupiditate quo vero.",
//     price: 6,
//     event: "Event One",
//     image: wahanaDummy1,
//   },
//   {
//     id: 2,
//     title: "Wahana Two",
//     description:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit sunt aut explicabo magnam rem! Ipsam, enim. Ipsum cupiditate quo vero.",
//     price: 8,
//     event: "Event Two",
//     image: wahanaDummy2,
//   },
//   {
//     id: 3,
//     title: "Wahana Three",
//     description:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit sunt aut explicabo magnam rem! Ipsam, enim. Ipsum cupiditate quo vero.",
//     price: 10,
//     event: "Event Three",
//     image: wahanaDummy3,
//   },
//   {
//     id: 4,
//     title: "Wahana Four",
//     description:
//       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit sunt aut explicabo magnam rem! Ipsam, enim. Ipsum cupiditate quo vero.",
//     price: 12,
//     event: "Event Four",
//     image: wahanaDummy4,
//   },
// ];

const AdminWahana = () => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { wahanas, loading } = useSelector((state) => state.wahana);
  console.log("logging the loadign for wahanas are", wahanas)
  const { venues } = useSelector((state) => state.venues);

  const [selectedVenue, setSelectedVenue] = useState(null);
  console.log("selected venue is ", selectedVenue)
  const [selectedWahana, setSelectedWahana] = useState(null)
  console.log("logging the selected wahana is", selectedWahana)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [spinner, setSpinner] = useState(false)
  console.log("edit modal open",editModalOpen)
  // const [editModalOpen, setEditModalOpen] = useState(false);

  // console.log("selected venue is",selectedVenue)

  useEffect(() => {
    dispatch(getAllVenues({ backend, pageLimit: 100, currPage: 0 }));
  }, [dispatch, backend]);

  // useEffect(()=>{
  //   if(selectedWahana){
  //     dispatch(getWahana(backend,selectedWahana,selectedVenue))
  //     console.log("editin g wahana", wahanas)
  //   }

  // },[selectedWahana])
  
  useEffect(() => {
   
    if (selectedVenue) {
      setSpinner(true)
      fetchWahanas(selectedVenue);
    }else{
      
      dispatch(getAllWahanas({backend, chunkSize:100, pageNo:0}))

    }
  
  }, [selectedVenue]);

  const fetchWahanas = (venueId) => {
    dispatch(
      getAllWahanasbyVenue({
        backend,
        chunkSize: 100,
        pageNo: 0,
        venueId: venueId,
      })
    );
  };

  // fetching all wahanas

  // const fetchAllWahanas = ()=>{
  //   dispatch(getAllWahanas({backend, chunkSize:100, pageNo:0}))
  // }


  const delete_Wahana = (wahanaId, venueId)=>{
    // console.log("handle delete ids are", wahanaId)
    // console.log("handle delete ids are", venueId)
    // console.log("handle delete",selectedWahana)
    dispatch(deleteWahana({backend, wahanaId, venueId}))

  }

  return (
    <div className="relative h-full">
      <div className="absolute inset-0 flex min-w-0 flex-col overflow-y-auto">
        <div className="dark relative flex-0 overflow-hidden bg-gray-800 px-4 py-8 sm:p-16">
          <svg
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 pointer-events-none"
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
          </svg>
          <div className="relative z-10 flex flex-col items-center text-text">
            <div className="text-xl font-semibold">MAHAKA'S</div>
            <div className="text-center text-4xl font-extrabold leading-tight tracking-tight sm:text-7xl">
              Wahana
            </div>
          </div>
        </div>

        <WahanaMain
          wahanaData={wahanas}
          venues={venues}
          selectedVenue={selectedVenue}
          setSelectedVenue={setSelectedVenue}
          onCreateClick={() => setIsModalOpen(true)}
          loading={loading}
          onEditClick = {()=> setEditModalOpen(true)}
          setSelectedWahana = {setSelectedWahana}
          spinner = {spinner}
          delete_Wahana = {delete_Wahana}
          selectedWahana = {selectedWahana}
         
        />

        <ModalOverlay
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          title="Create New Wahana"
        >
          <CreateWahanaForm
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => fetchWahanas(selectedVenue)}
          />
        </ModalOverlay>


{/* edit modal */}

{editModalOpen && 

        <ModalOverlay
          isOpen={editModalOpen}
          setIsOpen={setEditModalOpen}
          title="Edit Wahana"
        >
          <EditWahanaForm
            onClose={() => setEditModalOpen(false)}
            selectedVenue ={selectedVenue}
            selectedWahana = {selectedWahana}
            wahanas = {wahanas}

            // onSuccess={() => editWahanas(selectedWahana)}
          />
        </ModalOverlay>
}
      </div>
    </div>
  );
};

const WahanaMain = ({
  wahanaData,
  venues,
  selectedVenue,
  selectedWahana,
  setSelectedVenue,
  onCreateClick,
  onEditClick,
  loading,
  setSelectedWahana,
  delete_Wahana
}) => {
 
  return (
    <div className="flex flex-auto p-6 sm:p-10">
      <div className="mx-auto flex w-full max-w-xs flex-auto flex-col sm:max-w-5xl">
        <div className="flex w-full max-w-xs flex-col justify-center sm:max-w-none sm:flex-row">
          <select
            value={selectedVenue || ""}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="bg-card text-icon px-4 min-h-12 rounded-md border border-border sm:w-36"
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

          <div className="px-4 mt-4 sm:ml-4 sm:mt-0 sm:w-72 min-h-12 lg:min-w-[68%] md:min-w-[55%] rounded-md border border-border flex items-center bg-card text-icon">
            <HiMagnifyingGlass size={20} />
            <input
              type="text"
              placeholder="Search wahanas"
              className=" bg-transparent outline-none ml-4 lg:w-1000px"
            />
          </div>

          <button className="mt-8 sm:ml-auto sm:mt-0" onClick={onCreateClick}>
            <div className="inline-flex items-center align-middle bg-secondary px-3 py-2 rounded-full text-white">
              + Add Wahana
            </div>
           
          </button>

         
        </div>
        {loading ? (
          <div className="mt-8 text-center">

      <div className="flex justify-center mt-30"><ImSpinner9 className = "animate-spin text-7xl opacity-80"/></div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {wahanaData?.map((wahana) => (
              <WahanaCard
                key={wahana.id}
                wahana={{
                  ...wahana,
                  title: wahana.ride_title,
                  price: wahana.priceinusd,
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

const WahanaCard = ({ wahana,onEditClick, wahanaId , venueId, setSelectedWahana, setSelectedVenue, selectedVenue, selectedWahana, delete_Wahana, loading}) => {
  console.log("logging edited wahana id is",wahana)
  // console.log("logging edited venue id is", venueId)
//  console.log("wahana price is ", wahana.price)
  const bannerImage = wahana.image || wahanaDummy1;
  return (
    <div className="bg-card flex h-96 flex-col overflow-hidden rounded-2xl shadow relative group">
      <div className="flex flex-col relative">
        <div className="flex items-center justify-between p-6 z-10">
          <div className="rounded-full px-3 py-0.5 text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-500 dark:text-blue-50">
            {wahana.ride_title}
          
          </div>
          
      {/* <div className = "p-1" onClick={()=> setSelectedWahana(wahanaId)}>
          <button className =""  onClick={onEditClick}><FaEdit clasName ="opacity-80" size={25} onClick ={()=>setSelectedVenue(venueId)}/></button>
          </div> */}

          {/* <div className = " " onClick={()=> setSelectedWahana(wahana.id)}>
            <div className = "" onClick ={()=>setSelectedVenue(wahana.venueId)}> */}
            <button onClick = {()=>delete_Wahana(wahana.id, wahana.venueId)} disabled = {loading}>
            
            {loading ? "Deleting..." : <MdDelete className = "" size ={25}/>}
            </button>
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
          {wahana.description}
        </div>
        <div className="flex items-baseline whitespace-nowrap">
          <div className="mr-2 text-2xl">IDR</div>
          <div className="text-6xl font-semibold leading-tight tracking-tight">
          {wahana?.price}
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

export default AdminWahana;
