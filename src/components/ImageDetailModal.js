import React, { Component } from 'react';
import { Skeleton } from 'primereact/skeleton';

class ImageDetailModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingImages: {}
    };
  }

  // Method to handle the loading state of images
  handleImageLoad = (url) => {
    this.setState(prevState => ({
      loadingImages: {
        ...prevState.loadingImages,
        [url]: false // Set the loading state to false when the image loads
      }
    }));
  };

  handleImageError = (url) => {
    this.setState(prevState => ({
      loadingImages: {
        ...prevState.loadingImages,
        [url]: false // Also set to false if there's an error
      }
    }));
  };

  renderMedia = (image) => {
    const { loadingImages } = this.state;
    const isLoading = loadingImages[image.url] !== false; // true while loading

    if (image.media_type === "image") {
      return (
        <div style={{ position: "relative" }}>
          {isLoading && (
            <Skeleton width="100%" height="200px" />
          )}
          <img
            src={image.url}
            alt={image.title || "Gallery image"}
            className="img-fluid"
            style={{ cursor: "pointer", display: isLoading ? "none" : "block" }} // Hide the image while loading
            onLoad={() => this.handleImageLoad(image.url)} // Image load event
            onError={() => this.handleImageError(image.url)} // Image error event
          />
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
    const { image, show, handleClose } = this.props;

    if (!image) return null;
    return (
      <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{image.title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              {this.renderMedia(image)}
              <p className='my-3'>{image.explanation}</p>
              <p><strong>Date:</strong> {image.date}</p>
              <p><strong>Copyright:</strong> {image.copyright || 'Unknown'}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDetailModal;
