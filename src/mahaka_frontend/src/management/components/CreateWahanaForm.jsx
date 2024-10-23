import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWahana } from "../../redux/reducers/apiReducers/wahanaApiReducer";

const CreateWahanaForm = ({ onClose, onSuccess }) => {
    const dispatch = useDispatch();
    const { backend } = useSelector((state) => state.authentication);
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
    });

    const [bannerPreview, setBannerPreview] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    banner: { data: reader.result, logo_type: "image" },
                });
                setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateWahana = async () => {
        setIsSubmitting(true);
        try {
            await dispatch(
                createWahana({
                    backend,
                    venueId: "Venue1#br5f7-7uaaa-aaaaa-qaaca-cai",
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
                    <label className="font-semibold">Price (USD)</label>
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
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full" onClick={onClose}>
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
