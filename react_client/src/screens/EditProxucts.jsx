import React from 'react';
import '../assert/dashboard.css';
import SideBar from './sideBar';
import { Customer } from './Customer';
import { EditProduct } from './EditProduct';
export const EditProductPage = () => {
    let welcome;  
    let date = new Date();  
    let hour = date.getHours();  
    let minute = date.getMinutes();  
    let second = date.getSeconds();  
    if (minute < 10) {  
      minute = "0" + minute;  
    }  
    if (second < 10) {  
      second = "0" + second;  
    }  
    if (hour < 12) {  
      welcome = "morning";  
    } else if (hour < 17) {  
      welcome = "afternoon";  
    } else {  
      welcome = "evening";  
    } 

function display(val){
  if(val.key === 'Enter'){
		if((val.value).length > 0){
			  console.log(val.value)
    	customAlert(`searching for: "${val.value}"`, 3500)
		}else{
			customWarn('Type something',1500)
		}
  }
}


    const handelToggle =()=>{
	const body = document.querySelector('body');
	const toggled = document.getElementById('toggle');
	const media = window.matchMedia("(min-width:700px)");
	// const dashboard = window.getElementById("dashboard");



toggled.onclick = function(){

		body.classList.toggle('light')
	toggled.classList.toggle('active')
}
	if(media.matches){
		console.log(true)
        // dashboard.mouseenter(function() {
        //     return {__html: `good ${welcome}`   };
           
        // })
	// 	$('#dashboard').mouseenter(function(){
	// 	this.innerHTML = `good
    // ${welcome}`;
	// });
// 	$('#dashboard').mouseleave(function(){
// 		this.innerHTML = "DASHBOARD";
// 	});
// 	$('#kleenpulse').mouseenter(function(){
// 		this.innerHTML = "welcome";
// 	});
// 	$('#kleenpulse').mouseleave(function(){
// 		this.innerHTML = "LiquidTime";
// 	});
	}else{
		console.log(false)
	}

    }



function customAlert(msg, duration) {
	var styler = document.createElement("div");
	styler.className = 'dis-wrap'

	styler.innerHTML = "<h1 className='display'>" + msg + "</h1>";
	setTimeout(function () {
		styler.parentNode.removeChild(styler);
	}, duration);
	document.body.appendChild(styler);
}

function customWarn(msg, duration) {
	var styler = document.createElement("div");
	styler.className = 'dis-warn'

	styler.innerHTML = "<h1 className='display'>" + msg + "</h1>";
	setTimeout(function () {
		styler.parentNode.removeChild(styler);
	}, duration);
	document.body.appendChild(styler);
}

  return (
    <>
    <input type="checkbox" id="nav-toggle" />
    
    <SideBar />
    <div className="main-wrapper">
    <div className="main-content">
        <header>
            <h4 className="heading" id="dashboard">
                Dashboard
                </h4>
                <label for="nav-toggle">
                    <span className="fas fa-bars"></span>
                </label>
                
            <div className="search">
                <div className="search-rotate">
                <div className="icon"></div>
                </div>
                <div className="input">
                    <input type="text" placeholder="search" id="mysearch" autocomplete="off" onkeydown={display}/>
                    
                </div>
                
            </div>
            <div className="user-wrapper">
                {/* <img src="https://assets.codepen.io/3853433/internal/avatars/users/default.png?format=auto&version=1617122449&width=40&height=40"
                    alt=""/> */}
                <div>
                    <h4>LiquidTime</h4>
                    <b>C E O</b>
                </div>
            </div>
        </header>
        <main>
            {/* <div id="pop-wrap">
                <h1 className="pop-up">Light Mode Activated</h1>
            </div>  */}
            <div className="switch" id="switch">
                <div id="toggle" onClick={handelToggle}>
                    <i className="fas fa-moon"></i>
                    <i className="fas fa-sun"></i>
                    <i className="indicator"></i>
                </div>
            </div>
            {/* <Cards /> */}
            <div className="recent-grid">
                <div className="projects">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="heading">Update Products</h3>
                            {/* <button>See all <span className="fas fa-arrow-right"></span></button> */}
                        </div>
                        <EditProduct />
                    </div>
                </div>
                <Customer />
            </div>

        </main>
     <div className="footer">
    <div className="word">
     <p>Made with <span id="hrt"><i className="far fa-heart"></i></span> | PULSE 2022</p>
    </div>
    </div>
    </div>
    </div>
    <video className="video-1" src="https://res.cloudinary.com/liquidtime/video/upload/v1655385934/abstract_fihenv.mp4" loop muted autoplay></video>
    <video className="video-2" src="https://res.cloudinary.com/liquidtime/video/upload/v1655385877/dark_wave_irg2pp.mp4" loop muted
    autoPlay></video>
    </>
  )
}
