import { useLocation, useParams } from "react-router-dom";

const SummaryDetail = () => {
    const { SID } = useParams(); // เข้าถึง SID จาก URL
    const location = useLocation(); // ใช้ useLocation เพื่อดึงข้อมูล state ที่ส่งมาจาก Link
    const { title, content } = location.state || {};
    
    return ( 
        <div className="m-6">
            <h1>{title}</h1>
            <div 
                className="text-base"
                dangerouslySetInnerHTML={{ __html: content }} // แสดงผล HTML ที่ถูกเก็บใน content
            ></div>
        </div>
     );
}
 
export default SummaryDetail;