import MyProfile from "../assets/MyProfile.jpg";

const Home = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center p-3 border border-3 border-success rounded-4 mb-4" style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
        <div>
          <img
            src={MyProfile}
            alt="My Profile"
            className="rounded-circle mb-2"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        </div>

        <div>
          <div className="fw-bold fs-3 text-start p-3">
            <p className="mb-4"></p>
            <p className="mb-1">67182803 ภูริวัชร์ จินดาพงษ์ศิริ</p>
            <p className="mb-1">นักศึกษาปี2 สาขา CSI คณะเทคโนโลยี</p>
            <p className="mb-1">มหาวิทยาลัยศรีปทุม</p>
          </div>
        </div>
      </div>

      <div className="mb-3 fw-bold fs-5">แนะนำตัว :</div>

      <div className="mb-2 fs-4">
        เป็นคนขึ้ลืมครับ ปลาทองเรียกพี่ จำอะไรไม่ค่อยได้ ซุ่มซ่ามระดับพระกาฬ
      </div>
      <div className="mb-2 fs-4">
        นอนไม่ดึก แต่ตื่นสายตลอด เน้นนอนไม่เน้นนัวร์
      </div>

      <div className="mb-2 fs-4 fw-bold">
        #โค้ดไม่บัคเป็นลาบอันประเสริฐ
      </div>

    </>
  );
};

export default Home;
