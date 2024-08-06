import React, { Component } from "react";
import DatePicker from "react-datepicker";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { date } = this.state;
    // Format the date to 'yyyy-mm-dd' before passing to the parent component
    const formattedDate = this.formatDateToYYYYMMDD(date);
    this.props.onSearch({ date: formattedDate });
  };

  formatDateToYYYYMMDD(date) {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  }

  handleDateChange = (date) => {
    this.setState({ date });
  };

  render() {
    const { date } = this.state;
    const sectionUrl = this.props?.latestImage?.url || 'https://apod.nasa.gov/apod/image/2408/LarsMilkyWay_Larnaout_960.jpg';

    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-8">
            {sectionUrl && (
              <>
                <h3 className="mb-4">Image of the Day</h3>
                <section
                  className="d-flex flex-column justify-content-center align-items-center text-light bg-dark position-relative"
                  style={{
                    backgroundImage: `url(${sectionUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '500px',
                    padding: '20px',
                    cursor: 'pointer'
                  }}
                />
              </>
            )}

            <h3 className="my-3 mb-4">Search by Date</h3>
            <form onSubmit={this.handleSearch} className="container d-flex justify-content-end align-items-center">
              <DatePicker
                showIcon
                selected={date}
                onChange={this.handleDateChange}
                className="form-control"
                placeholderText="Select Date"
                id="date"
                icon="pi pi-calendar"
                toggleCalendarOnIconClick
                isClearable
                dateFormat="yyyy/MM/dd"
                maxDate={new Date()} // Changed from endDate to maxDate
              />
              <button type="submit" 
              className="btn btn-primary gap-3 ms-3"
              disabled={!date}>Search</button>
            </form>
          </div>

          <div className="col-md-4 my-3">
            <h3>Explore StarVault</h3>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Our Mission
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    At StarVault, our mission is to make space exploration accessible to everyone. We are dedicated to bringing the most breathtaking and scientifically valuable astronomy images from NASA to the public. Our platform offers a rich, interactive experience that allows users to explore and understand the universe's wonders. Join us on this celestial journey and delve into the mysteries of space.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    How It Works
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    StarVault integrates with NASA's Astronomy Picture of the Day (APOD) API to fetch and display daily astronomy images. Our user-friendly interface allows you to browse through a vast collection of space imagery, complete with detailed descriptions and scientific insights. You can filter images by date, explore featured content, and learn about the latest celestial phenomena. Our platform ensures a seamless experience, combining powerful technology with a passion for space exploration.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
