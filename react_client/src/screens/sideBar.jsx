import React from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { FaAccusoft ,FaTh ,FaUsers ,FaHamburger ,FaCalendarPlus ,FaUnlockAlt ,FaUsersCog,FaUniversity} from "react-icons/fa";


export default function () {
    const Logout = () => {
        swal({
          title: "Are you sure?",
          text: "you want to logout?",
          icon: "warning",
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            localStorage.removeItem('data');
          localStorage.removeItem('token');
          window.location.href = "/";
            // swal("logout!", "successfully logout! ", "success");
          }
        })
      }
  return (    
    <div className="sidebar">
            <div className="sidebar-brand">
                <h2><span><FaAccusoft style={{color:"#dc3545"}} /></span><span id="kleenpulse">ASUM</span></h2>
            </div>
            <div className="sidebar-menu">
                <ul>
                    <li>
                        <Link to="/dashboard" className="active">
                            <span><FaTh style={{color:"#dc3545"}} /></span>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/addproducts"><span><FaUsers style={{color:"#dc3545"}} /></span>
                            <span>Add Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/foodproducts"><span><FaHamburger style={{color:"#dc3545"}} /></span>
                            <span>Food Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/addFoodproducts"><span ><FaCalendarPlus style={{color:"#dc3545"}}/></span>
                            <span>Add Foods</span>
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/inventory"><span><FaUniversity style={{color:"#dc3545"}} /></span>
                            <span>Inventory</span>
                        </Link>
                    </li> */}
                    <li>
                        <Link to="/account-setting"><span ><FaUsersCog style={{color:"#dc3545"}} /></span>
                            <span>Accounts</span>
                        </Link>
                    </li>
                    <li onClick={Logout}>
                        <Link to='#'><span ><FaUnlockAlt style={{color:"#dc3545"}} /></span>
                        <span >LogOut</span>
                        </Link>
                    </li>
                </ul>
            </div>
    </div>
  );
}
