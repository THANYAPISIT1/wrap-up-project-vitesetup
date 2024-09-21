import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ConfirmLogoutModal from "../../components/Modal/ConfirmLogoutModal";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";

const SummaryDetail = () => {
    const { SID } = useParams(); // เข้าถึง SID จาก URL
    const location = useLocation(); // ใช้ useLocation เพื่อดึงข้อมูล state ที่ส่งมาจาก Link
    const { title, content,  dateUpdate } = location.state || {};
    const [showConfirmLogout, setShowConfirmLogout] = useState(false); 
    
    return ( 
        <div className="flex bg-gray-100 min-h-screen max-h-content">
            <Sidebar onLogoutClick={() => setShowConfirmLogout(true)}/>
            <div className="flex-1 ml-[20rem]">
                <Navbar />
                <div className="m-6">
                    <p>Last Updated: {dateUpdate}</p>
                    <h1>{title}</h1>
                    <div 
                        className="text-base"
                        dangerouslySetInnerHTML={{ __html: content }} // แสดงผล HTML ที่ถูกเก็บใน content
                    ></div>
                </div>
            </div>

            {showConfirmLogout && (
                <ConfirmLogoutModal
                    onCancel={() => setShowConfirmLogout(false)} // Handle cancellation
                />
            )}
        </div>
     );
}
 
export default SummaryDetail;