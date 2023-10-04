import React from "react";
import "./navbar.css";

const search = {
    width: "100%"
  }; 

const logo ={
    borderRadius: "50px",
    height: "50px",
};

export function OffcanvasExample() {
  return (
    <div >
    <header  style= {{width: "100%"}}class="mb-4 fixed-top">
    <div class="p-3 text-center bg-white border-bottom">
      <div class="container-fluid">
        <div class="row">
          <div
            class="col-md-5 d-flex justify-content-center justify-content-md-start align-items-center d-none d-lg-flex">
            <a class="text-reset me-3" href="#">
              <i class="fas fa-th-large"></i>
            </a>
            <a class="text-reset me-3" href="#">
              <i class="fas fa-home"></i>
            </a>
            <a class="text-reset me-3" href="#">
              <i class="fas fa-columns me-1"></i>
              <span class="d-none d-xl-inline-block">Boards</span>
            </a>
  
            <form class="d-flex input-group w-auto my-auto mb-3 mb-md-0">
              <input style = {search} autocomplete="off" type="search" class="form-control rounded" placeholder="Search" />
            </form>
            <span style = {{marginLeft : -10}} class="input-group-text border-0 d-none d-lg-flex"><i class="fas fa-search"></i></span>

          </div>
          {/*<!-- Right elements -->*/}
  
          {/*<-- Center elements -->*/}
          <div class="col-md-2 d-none d-lg-block">
            <a href="#!" class="ms-md-2">
              <img style = {logo}src={require('../../images/TECNEXUS.jpeg')} alt="App Logo"
               >
                </img>
            </a>
          </div>
  
          <div class="col-lg-5 d-flex justify-content-center justify-content-md-end align-items-center">
            <a class="text-reset me-3" href="#">
              <i class="fas fa-plus"></i>
            </a>
            <a class="text-reset me-3" href="#">
              <i class="fas fa-info-circle"></i>
            </a>
  
            <div class="dropdown">
              <a class="text-reset me-3 dropdown-toggle hidden-arrow" href="#" id="navbarDropdownMenuLink" role="button"
                data-mdb-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-bell"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="#">Some news</a></li>
                <li><a class="dropdown-item" href="#">Another news</a></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </div>
  
            <div class="dropdown">
              <a class="text-reset dropdown-toggle d-flex align-items-center hidden-arrow" href="#"
                id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                <img style = {{height:22} }src="https://therichpost.com/wp-content/uploads/2021/03/avatar3.png" class="rounded-circle" 
                  alt="" loading="lazy" />
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="#">My profile</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" href="#">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  
  <main id="intro" class="bg-image" style={{backgroundimage: "url('https://mdbootstrap.com/img/new/fluid/city/018.jpg')"}} >
    <div class="mask" style={{backgroundcolor: "rgba(0, 0, 0, 0.7)"}}></div>
  </main>
    </div>
  );
}

export default OffcanvasExample;