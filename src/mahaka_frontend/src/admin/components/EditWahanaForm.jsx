import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_wahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
  // import { getWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
 import TextHint from "../../customer/Components/TextHint";



const EditWahanaForm = ({onClose,  selectedWahana, selectedVenue})=>{

  console.log("logging the selected wahana is", selectedWahana)
  console.log("logging the selected venue is", selectedVenue)
  const dispatch = useDispatch();
  
    const { backend } = useSelector((state) => state.authentication);
    const { wahanas, loading } = useSelector((state) => state.wahana);
    console.log("editiggg", wahanas)



    
// const wahana = useSelector((state) => state.wahana.wahanas);
// const editWahana = wahana.filter((wahana) => wahana[0]?.id !== selectedWahana)
// console.log("editing wahanas", editWahana)
   
const editWahana = useSelector((state) =>
  state.wahana.wahanas.filter(
    (wahana) => 
       wahana.venueId === selectedVenue && wahana.id === selectedWahana
      // console.log("wahanaprice ", wahana.price)
    // console.log("wahanaid ", wahana.venueId)
  )
);


console.log('Filtered Wahana:', editWahana);

   
    const [formData, setFormData] = useState({
      name: editWahana[0]?.ride_title || "",
      symbol: "",
      decimal: 8,
      totalSupply: 1000000,
      description:editWahana[0]?.description || "",
     
      banner: {
        data: "",
        logo_type: "image",
      },
      price: editWahana[0]?.price ? Number(String(editWahana[0]?.price)) : "" ,
    });

  const [bannerPreview, setBannerPreview] = useState("");
  const [imageArrayBuffer, setImageArrayBuffer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   dispatch(getWahana(backend, selectedWahana, selectedVenue));
  //   console.log("useeffect edit", selectedWahana)
  // }, [selectedVenue, selectedWahana]);


 
 


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setFormData({
        ...formData,
        banner: { data: dataUrl, logo_type: "image" },
      });
      setBannerPreview(dataUrl);

      // Reading the image as an ArrayBuffer for backend submission
      const arrayBufferReader = new FileReader();
      arrayBufferReader.onloadend = (event) => {
        const arrayBuffer = event.target.result;
        const uintArray = new Uint8Array(arrayBuffer);
        const byteArray = Array.from(uintArray);
        setImageArrayBuffer(byteArray);
      };
      arrayBufferReader.readAsArrayBuffer(file);
    };

    reader.readAsDataURL(file);
  };
  

const handleEditWahana = async ()=>{
  setIsSubmitting(true);
  try {
    await dispatch(
      edit_wahana ({
        backend,
        selectedWahana,
        selectedVenue,
        ...formData,
      })
    );
    // onSuccess();
    onClose();
  } catch (error) {
    console.error("Error editing wahana:", error);
  } finally {
    setIsSubmitting(false);
  }

}



    return (
<>
<div>
      <div className="space-y-4">
        {/* Select Venue */}
        <div className="flex flex-col gap-1">
         
        
        </div>
        <div className="flex flex-col flex-auto gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Wahana Name </label>
            <TextHint text="Enter the name of the wahana." />
            </div>
          <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border ">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Description </label>
            <TextHint text="Enter the description of the wahana." />
            </div>
          <div className="border border-border rounded-lg pl-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <textarea
              name="description"
              rows={5}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Price (IDR)</label>
            <TextHint text="Enter the price of the wahana." />
            </div>
          <div className="border border-border rounded-lg pl-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseInt(e.target.value) })
              }
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Banner </label>
            <TextHint text="Upload the image of the wahana." />
            </div>
          <div className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 p-4 rounded">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              id="upload-image"
              onChange={handleFileChange}
              required
            />
            <label
              htmlFor="upload-image"
              className="cursor-pointer bg-gray-100 text-gray-800 py-2 px-4 rounded-md border border-gray-300"
            >
              Upload Banner
            </label>
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="mt-2 w-full h-auto rounded"
                style={{
                  maxWidth: "96px",
                  maxHeight: "96px",
                  minWidth: "96px",
                  minHeight: "96px",
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded-full"
           onClick={handleEditWahana}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
</>

    )
}

export default EditWahanaForm ;