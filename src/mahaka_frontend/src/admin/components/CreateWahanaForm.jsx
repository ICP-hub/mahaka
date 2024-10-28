import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";
import { getAllVenues } from "../../redux/reducers/apiReducers/venueApiReducer";

const CreateWahanaForm = ({ onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const { backend } = useSelector((state) => state.authentication);
  const { venues } = useSelector((state) => state.venues);
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    decimal: 8,
    totalSupply: 1000000,
    description: "",
    price: "",
    banner: {
      data: "",
      logo_type: "image",
    },
    venueId: "",
  });

  const [bannerPreview, setBannerPreview] = useState("");
  const [imageArrayBuffer, setImageArrayBuffer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getAllVenues({ backend, pageLimit: 100, currPage: 0 }));
  }, [dispatch, backend]);

  console.log("Fetched Venues:", venues);

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

  const handleCreateWahana = async () => {
    setIsSubmitting(true);
    try {
      await dispatch(
        createWahana({
          backend,
          venueId: formData.venueId,
          ...formData,
        })
      );
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating wahana:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="space-y-4">
        {/* Select Venue */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Select Venue</label>
          <select
            value={formData.venueId}
            onChange={(e) =>
              setFormData({ ...formData, venueId: e.target.value })
            }
            className="border border-border rounded-lg px-4 py-2 bg-card"
            required
          >
            <option value="" disabled>
              Select a venue
            </option>
            {venues?.map((venue) => (
              <option className="bg-card" key={venue.id} value={venue.id}>
                {venue.Title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col flex-auto gap-1">
          <label className="font-semibold">Wahana Name</label>
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

        <div className="flex flex-col flex-auto gap-1">
          <label className="font-semibold">Symbol</label>
          <div className="border border-border rounded-lg pl-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              name="symbol"
              value={formData.symbol}
              onChange={(e) =>
                setFormData({ ...formData, symbol: e.target.value })
              }
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold">Description</label>
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
          <label className="font-semibold">Price (IDR)</label>
          <div className="border border-border rounded-lg pl-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="my-3 outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold">Banner</label>
          <div className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 p-4 rounded">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              id="upload-image"
              onChange={handleFileChange}
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
          onClick={handleCreateWahana}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Wahana"}
        </button>
      </div>
    </div>
  );
};

export default CreateWahanaForm;
