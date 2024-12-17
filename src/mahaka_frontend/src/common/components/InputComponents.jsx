import { useEffect, useRef } from "react";
import notificationManager from "../utils/notificationManager";
import { BsInfoCircle } from "react-icons/bs";

// input field
export const FormFieldInput = ({
  type,
  value,
  onChange,
  label,
  disabled = false,
  placeholder = "",
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 border border-border rounded-md -z-1"></div>
      <div className="px-4">
        <input
          type={type}
          className="bg-transparent w-full my-3"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          // disabled={disabled}
          onKeyDown={(e) => {
            const key = e.key;
            // console.log(key);
            if (type === "number" && key === "-") {
              e.preventDefault();
            }
          }}
          style={{
            pointerEvents: disabled ? "none" : "auto",
            fontWeight: disabled && "600",
          }}
        />
      </div>
      <div
        className="absolute -top-6"
        style={{ fontWeight: disabled && "600" }}
      >
        {label}*
      </div>
    </div>
  );
};

// Form field textarea
export const FormFieldTextArea = ({ value, onChange, label, placeholder }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 border border-border rounded-md -z-1"></div>
      <div className="px-4">
        <textarea
          type="text"
          className="bg-transparent w-full my-3"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="absolute -top-6">{label}*</div>
    </div>
  );
};

// input options
export const FormFieldOptions = ({
  value,
  onChange,
  label,
  optionInit,
  options,
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 border border-border rounded-md -z-1"></div>
      <select
        className="px-4 py-3 w-full bg-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {optionInit && (
          <option value="" disabled className="w-full my-3 text-black">
            {optionInit}
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id} className="text-black">
            {option.Title}
          </option>
        ))}
      </select>
      {label && <div className="absolute -top-6">{label}*</div>}
    </div>
  );
};

export const FormFieldImageUpload = ({ label, image, onChange }) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 200 * 1024) {
        // alert(
        //   "The file is too large. Please upload an image smaller than 200KB."
        // );
        notificationManager.error("Please upload an image smaller than 200KB.");
        return;
      }
      onChange(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 border border-border rounded-md -z-1"></div>
      <div className="px-4">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <div className="px-2 py-4">
          <button
            type="button"
            onClick={triggerFileInput}
            className="bg-secondary text-white py-2 px-4 rounded-md"
          >
            Choose Image
          </button>
        </div>
      </div>
      <div className="absolute -top-6 flex w-full items-center">
        <div className="relative flex items-center">
          <div>{label}*</div>
        </div>
        <div className="ml-auto italic text-sm">
          Image size should be below 200KB
        </div>
      </div>
      {image && (
        <div className="mt-2 mb-4 h-48">
          <img
            src={image}
            alt="Uploaded preview"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

// Form field date picker
export const FormFieldDate = ({ value, onChange, label, minDate = "" }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      flatpickr(inputRef.current, {
        dateFormat: "Y-m-d",
        minDate: minDate,
        onChange: (selectedDates, dateStr) => {
          onChange(dateStr);
        },
      });
    }
  }, [minDate, onChange]);

  return (
    <div className="relative">
      <div className="absolute inset-0 border border-border rounded-md -z-1"></div>
      <div className="px-4">
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent w-full my-3"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Select a date"
        />
      </div>
      <div className="absolute -top-6">{label}</div>
    </div>
  );
};

// Form field for time picker
export const FormFieldTime = ({ value, onChange, label }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      flatpickr(inputRef.current, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        onChange: (selectedDates, dateStr) => {
          onChange(dateStr);
        },
      });
    }
  }, [onChange]);

  return (
    <div className="relative">
      <div className="absolute inset-0 border border-border rounded-md -z-1"></div>
      <div className="px-4">
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent w-full my-3"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Select time"
        />
      </div>
      <div className="absolute -top-6">{label}</div>
    </div>
  );
};
