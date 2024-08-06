import React, { Component } from 'react';
import logo from '../images/logo.png';
import { Sidebar } from 'primereact/sidebar';
import { Avatar } from 'primereact/avatar';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible,
    }));
  };

  render() {
    const { visible } = this.state;

    return (
      <section
        className="d-flex flex-column justify-content-center align-items-center text-light bg-dark position-relative"
        style={{
          backgroundImage: `url('https://apod.nasa.gov/apod/image/1605/OphiuchusPlanets_Fairbairn_960.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '500px',
          padding: '20px'
        }}
      >
        <nav className="position-absolute top-0 end-0 p-3 d-flex flex-column align-items-end">
          <img src={logo} alt="logo" width="50" height="50" className="mb-2" />
          <h1 className="mt-2 mb-1">StarVault</h1>
          <p className="mb-1">Explore the Wonders of Space</p>
          <p className="mb-1">
            <a
              href='https://api.nasa.gov/'
              target="_blank"
              rel="noopener noreferrer"
              className="text-light text-decoration-underline"
            >
              Powered by NASA API
            </a>
          </p>
        </nav>

        <div className="text-center m-4">
          <h2 className="m-4">The best free Astronomy images shared by NASA.</h2>
          <button
            className="btn btn-primary d-flex justify-content-center align-items-center gap-3 m-4"
            onClick={this.toggleSidebar}
          >
            Read more <i className="pi pi-arrow-right"></i>
          </button>

          <Sidebar
            visible={visible}
            onHide={() => this.setState({ visible: false })}
            className="p-sidebar-md"
            style={{ padding: '1rem', maxWidth: '300px' }}
          >
            <div>
              <h2 className="fs-4 mb-3">About StarVault</h2>
              <p className="mb-4">
                StarVault is your go-to source for exploring the latest and most stunning astronomy images provided by NASA. 
                Discover the wonders of space and learn about celestial events and phenomena.
              </p>
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href='https://api.nasa.gov/?search=apod' className="text-decoration-none">NASA APOD</a></li>
              </ul>
              <button className="btn btn-outline-primary mt-3">Contact Us</button>

              <hr className="my-4" />

              <div className="d-flex justify-content-between align-items-center flex-end">
                <span className="fw-bold">Shikhar Bajpai</span>
                <Avatar
                  icon="pi pi-user"
                  size="small"
                  shape="circle"
                  style={{ backgroundColor: '#9c27b0', color: '#ffffff' }}
                />
              </div>
            </div>
          </Sidebar>
        </div>
      </section>
    );
  }
}

export default Header;
