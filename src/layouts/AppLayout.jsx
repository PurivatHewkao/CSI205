import AppHeader from "../component/AppHeader";
import AppNevbar from "../component/AppNevbar";
import AppFooter from "../component/AppFooter";
import { Outlet } from "react-router-dom";
import mainbackground from '../assets/mainbackground.jpg';

const AppLayout = ({ products, carts, setToken }) => {
  return (

    <div 
      className="min-vh-100 p-3"
      style={{ 
        backgroundImage: `url(${mainbackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >

      <div 
        className="rounded-4 p-3 mx-auto"
        style={{ 
          maxWidth: 1000,
          backdropFilter: "blur(2px)",
          backgroundColor: 'rgba(203, 255, 203, 0.3)'
        }}
      >
        <div className="row g-3">

          <div className="col-12">
            <AppHeader />
          </div>

          <div className="col-12">
            <AppNevbar products={products} carts={carts} setToken={setToken} />
          </div>

          <div className="col-12">
            <Outlet />
          </div>

          <div className="col-12">
            <AppFooter />
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default AppLayout;
