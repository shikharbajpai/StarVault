import React, { Component } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import ImageDetailModal from './components/ImageDetailModal';
import Footer from './components/Footer';

const API_KEY = process.env.REACT_APP_DEMO_API_KEY;
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerImage: [],
      images: [],
      latestImage: [],
      loading: true,
      error: null, // To handle API errors
      selectedImage: null,
      query: '',
      modalVisible: false,
      isSearchTriggered: false // Flag to track search action
    };
  }

  componentDidMount() {
    // Fetch latest image or other initial data here
    this.fetchLatestImage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages(this.state.query);
    }
  }

  fetchImages = async (searchQuery) => {
    this.setState({ loading: true, error: null, isSearchTriggered: true }); // Set loading to true and reset error
    try {
      const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&date=${searchQuery.date}`);
      const data = await response.json();

      if (data.hasOwnProperty('url')) {
        this.setState({ images: [data], loading: false });
      } else {
        this.setState({ images: [], loading: false, error: "No images available." });
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ loading: false, error: "Failed to fetch images." });
    }
  };

  fetchHeaderImage = async () => {
    try {
      const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&count=1`);
      const data = await response.json();
      this.setState({ headerImage: data[0] });
    } catch (error) {
      console.error('Error fetching header image:', error);
    }
  };

fetchMoreImages = async () => {
  if (this.state.isSearchTriggered) {
    return; // Prevent fetching more images if a search has been triggered
  }
  this.setState({ loading: true }); // Set loading to true for more images
  try {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&count=2`);
    const data = await response.json();
    this.setState((prevState) => ({
      images: prevState.images.concat(data),
      loading: false, // Set loading to false after fetching
    }));
  } catch (error) {
    console.error('Error fetching more images:', error);
    this.setState({ loading: false, error: "Failed to fetch more images." });
  }
};

fetchLoadImages = async () => {
  this.setState({ loading: true }); // Set loading to true for more images
  try {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&count=2`);
    const data = await response.json();
    this.setState((prevState) => ({
      images: prevState.images.concat(data),
      loading: false, // Set loading to false after fetching
    }));
  } catch (error) {
    console.error('Error fetching more images:', error);
    this.setState({ loading: false, error: "Failed to fetch more images." });
  }
};


  fetchLatestImage = async () => {
    this.setState({ loading: true, error: null }); // Set loading to true and reset error
    try {
      const today = new Date();
      const formattedDate = this.formatDateToYYYYMMDD(today);
      const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&date=${formattedDate}`);
      const data = await response.json();
      if (data.hasOwnProperty('url')) {
        this.setState({ images: [data], loading: false, latestImage: [data] });
      } else {
        this.setState({ images: [], latestImage: [], loading: false, error: "No images available." });
      }
    } catch (error) {
      console.error('Error fetching latest image:', error);
      this.setState({ loading: false, error: "Failed to fetch latest image." });
    }
  };

  fetchImageByDate = async (date) => {
    this.setState({ loading: true, error: null }); // Set loading to true and reset error
    try {
      const formattedDate = this.formatDateToYYYYMMDD(date);
      const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&date=${formattedDate}`);
      const data = await response.json();
      this.setState({
        images: [data],
        loading: false, // Set loading to false after fetching
      });
    } catch (error) {
      console.error('Error fetching images by date:', error);
      this.setState({ loading: false, error: "Failed to fetch images by date." });
    }
  };

  formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  handleSearch = (searchQuery) => {
    if (searchQuery.date) {
      this.setState({ query: searchQuery });
    } else {
      // Fetch latest image or other initial data here
      this.fetchLatestImage();
      this.setState({ isSearchTriggered: false, query: '' });
    }
  };

  handleImageClick = (image) => {
    this.setState({ selectedImage: image, modalVisible: true });
  };

  handleCloseModal = () => {
    this.setState({ modalVisible: false, selectedImage: null });
  };

  render() {
    return (
      <>
        <Header headerImage={this.state.headerImage} />

        <div className="container my-4">
          <div className="d-flex justify-content-between align-items-center">
            <SearchBar
              onSearch={this.handleSearch}
              latestImage={this.state.latestImage[0]}
              fetchImageByDate={this.fetchImageByDate}
            />
          </div>

          <ImageGallery
            images={this.state.images}
            onImageClick={this.handleImageClick}
            fetchMoreData={this.fetchMoreImages}
            loading={this.state.loading} // Pass loading state
            error={this.state.error} // Pass error state,
            isSearchTriggered={this.state.isSearchTriggered}
            fetchLoadImages={this.fetchLoadImages}
          />
        </div>

        <ImageDetailModal
          image={this.state.selectedImage}
          show={this.state.modalVisible}
          handleClose={this.handleCloseModal}
        />

        <Footer />
      </>
    );
  }
}

export default App;
