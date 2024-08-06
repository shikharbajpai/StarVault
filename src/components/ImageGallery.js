import React, { Component } from "react";
import "../css/ImageGallery.css";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from 'primereact/skeleton';

class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingImages: {}
    };
  }

  handleImageClick = (image) => {
    if (this.props.onImageClick) {
      this.props.onImageClick(image);
    }
  };

  handleImageLoad = (image, index) => {
    const uniqueIdentifier = image.title + '_' + index;
    this.setState(prevState => ({
      loadingImages: {
        ...prevState.loadingImages,
        [uniqueIdentifier]: false
      }
    }));
  };

  handleImageError = (image, index) => {
    const uniqueIdentifier = image.title + '_' + index;
    this.setState(prevState => ({
      loadingImages: {
        ...prevState.loadingImages,
        [uniqueIdentifier]: false
      }
    }));
  };

  renderMedia = (image, index) => {
    const { loadingImages } = this.state;
    const uniqueIdentifier = image.title + '_' + index;
    const isLoading = loadingImages[uniqueIdentifier] !== false;

    if (image.media_type === "image") {
      return (
        <div style={{ position: "relative" }}>
          {isLoading && (
            <Skeleton width="100%" height="200px" />
          )}
          <a href={image.hdurl || image.url} target="_blank" rel="noopener noreferrer">
            <img
              src={image.url}
              alt={image.title || "Gallery image"}
              className="img-fluid"
              style={{ cursor: "pointer", display: isLoading ? "none" : "block" }}
              onLoad={() => this.handleImageLoad(image, index)}
              onError={() => this.handleImageError(image, index)}
            />
          </a>
        </div>
      );
    } else if (image.media_type === "video") {
      return (
        <iframe
          src={image.url}
          title={image.title || "Gallery video"}
          className="img-fluid w-100"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onClick={() => this.handleImageClick(image)}
        ></iframe>
      );
    }
    return null;
  };

  render() {
    const { images = [], fetchMoreData, loading, isSearchTriggered, fetchLoadImages } = this.props;

    // Filter images to only include valid media types
    const filteredImages = images.filter(image => image.media_type === "image");

    return (
      <div className="image-gallery">
        {/* {loading && <div className="text-center">Loading images...</div>} */}

        {filteredImages.length > 0 ? (
          <InfiniteScroll
            dataLength={filteredImages.length}
            next={fetchMoreData}
            hasMore={filteredImages.length < 3}
            loader={!isSearchTriggered && <Loading />}
          >
            <div className="container">
              <div className="row">
                {filteredImages.map((image, index) => (
                  <div className="col-md-3 col-sm-4 col-xs-6 mb-4" key={index}>
                    <div className="image-card">
                      {this.renderMedia(image, index)}
                      {image.title && (
                        <button className="image-title" onClick={() => this.handleImageClick(image)}>
                          {image.title}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {(
                <div className="d-flex align-items-center justify-content-center my-3">
                  <button className="btn btn-primary gap-3 d-flex align-items-center"
                    onClick={fetchLoadImages}>
                    Load more images<i className="pi pi-sync pointer"></i>
                  </button>
                </div>
              )}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="text-center">
            {!loading && (
              <>
                <h2 className="mb-4">No Images Available</h2>
                <p className="lead">We couldn't find any images for your selected date. Please try a different date or check back later!</p>

                <div className="alert alert-warning" role="alert">
                  <strong>Tip:</strong> Make sure you are searching for dates with available images.
                </div>

                <h4>{images.length > 0 && `Explore Featured Videos:`}</h4>
                {images.map((image, index) => (
                  image.media_type === 'video' && (
                    <div key={index} className="my-3">
                      <p>
                        <strong>Watch the video titled: "{image.title}"</strong>
                      </p>
                      <p>
                        <strong>Video URL: </strong>
                        <a href={image.url} target="_blank" rel="noopener noreferrer" className="text-decoration-underline">{image.url}</a>
                      </p>
                    </div>
                  )
                ))}
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default ImageGallery;
