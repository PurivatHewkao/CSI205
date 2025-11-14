const AppHeader = () => {
  return (
    <div className="text-center">

      {/* แถบบน: ชื่อวิชา */}
      <div
        className="container-fluid text-white py-3 shadow-sm"
        style={{
          background: "linear-gradient(90deg, #0e5b1a, #1f7a2e, #0e5b1a)",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px"
        }}
      >
        <h2 className="m-0 fw-bold tracking-wide">
          C S I&nbsp;2 0 5
        </h2>
      </div>

      {/* แถบล่าง: ชื่อคอร์ส */}
      <div className="container-fluid text-dark py-2 mt-1">
        <h4
          className="m-0 fw-semibold"
          style={{
            background: "linear-gradient(90deg, #0e5b1a, #25a445)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          FRONT END SOFTWARE DEVELOPMENT
        </h4>

      </div>

    </div>
  );
};

export default AppHeader;
