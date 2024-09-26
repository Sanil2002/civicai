// import Navbar from '@/components/navbar/navbar';
// import SidebarComponent from '@/components/sidebar/sidebarComponent';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col bg-slate-100 min-h-screen">
      {/* <Navbar />
      <div className="flex flex-1 min-h-full ">
        <SidebarComponent />
        <div className='flex-1 min-h-full'> */}
          <Outlet />
          {/* </div> */}
        
      {/* // </div> */}
    </div>
  );
};

export default Layout;
