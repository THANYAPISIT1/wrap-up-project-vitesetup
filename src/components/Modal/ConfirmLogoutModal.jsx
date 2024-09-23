import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ConfirmLogoutModal = ({ onCancel}) => {
  const navigate = useNavigate();


  const handleLogoutConfirm = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/logout`,
        { withCredentials: true }
      );
      // Optionally, you can handle the response message
      console.log(response.data.message);
      
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };
  return (
    <div className="fixed flex justify-center items-center inset-0 z-100 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleLogoutConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmLogoutModal;
  