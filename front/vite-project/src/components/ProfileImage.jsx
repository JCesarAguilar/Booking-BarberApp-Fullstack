import { useRef } from "react";
import { useAuth } from "../context/useAuth";
import defaultProfile from "../assets/images/user-profile-icon-free-vector.jpg";

export default function ProfileImage({ imageUrl, onImageChange }) {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-28 h-28 rounded-full overflow-hidden cursor-pointer hover:brightness-75 transition sm:w-36 sm:h-36"
        onClick={handleClick}
      >
        <img
          src={imageUrl || defaultProfile}
          alt="Foto de perfil"
          className="w-full h-full object-cover"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <p className="mt-2 sm:mt-1 text-sm text-gray-50 sm:text-2xl sm:pt-2 font-redhat">
        Hola {user.name.split(" ")[0]}
      </p>
    </div>
  );
}
