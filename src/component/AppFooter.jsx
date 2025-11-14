import Badge from "react-bootstrap/Badge";
// ลบ import Button ที่ไม่ได้ใช้ออก

const AppFooter = () => {
  return (
    <>
      {/* ใช้ text-center เพื่อจัดกลาง Badge ทั้ง 3 อัน */}
      <div className="text-center p-3 fs-1">
        
        {/* กล่องที่ 1: Joseph (สีน้ำเงิน) */}
        {/* p-2 = เพิ่ม padding (พื้นที่ภายใน) ให้กล่องดูใหญ่ขึ้น */}
        {/* mx-2 = เพิ่ม margin (ระยะห่างภายนอก) ซ้าย-ขวา เพื่อให้แต่ละกล่องไม่ติดกัน */}
        <Badge bg="primary" className="p-2 mx-2">
          Joseph
        </Badge>
        |
        {/* กล่องที่ 2: SIT (สีเขียว) */}
        <Badge bg="success" className="p-2 mx-2">
          SIT
        </Badge>
        |
        {/* กล่องที่ 3: CSI (สีฟ้า) */}
        <Badge bg="info" className="p-2 mx-2">
          CSI
        </Badge>
        
      </div>
    </>
  );
};
export default AppFooter;