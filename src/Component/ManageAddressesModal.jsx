import React, { useState } from "react";
import "./ManageAddressesModal.css";

const ManageAddressesModal = ({ isOpen, onClose, user, onAddAddress }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchLocationFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      if (data.address) {
        const addr = data.address;
        setFormData((prev) => ({
          ...prev,
          address: data.display_name?.split(',').slice(0, 2).join(',').trim() || addr.road || addr.street || "",
          city: addr.city || addr.town || addr.village || "",
          state: addr.state || "",
          pincode: addr.postcode || "",
          landmark: addr.neighbourhood || "",
        }));
        setLocationError(null);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setLocationError("Failed to fetch location details. Please fill manually.");
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleUseCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchLocationFromCoordinates(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Unable to get your location. ";
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage += "Please enable location permissions.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage += "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMessage += "Location request timed out.";
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      }
    );
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert("Please fill in all required fields");
      return;
    }

    // Call the callback
    onAddAddress(formData);

    // Reset form
    setFormData({
      address: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    });
    setShowAddForm(false);
    setLocationError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-addresses">
      <div className="modal-content-addresses">
        <button className="modal-close-addresses" onClick={onClose}>
          ✕
        </button>

        <h2>Manage Addresses</h2>

        {/* Saved Addresses */}
        <div className="addresses-list">
          {user?.addresses && user.addresses.length > 0 ? (
            user.addresses.map((addr) => (
              <div key={addr.id} className="address-card">
                <div className="address-header">
                  <h3>Address</h3>
                </div>
                <div className="address-details">
                  <p><strong>Address:</strong> {addr.address}</p>
                  <p><strong>City:</strong> {addr.city}</p>
                  <p><strong>State:</strong> {addr.state}</p>
                  <p><strong>Pincode:</strong> {addr.pincode}</p>
                  {addr.landmark && <p><strong>Landmark:</strong> {addr.landmark}</p>}
                </div>
              </div>
            ))
          ) : (
            <div className="addresses-empty">
              <div className="addresses-empty-icon">
                <i className="bi bi-geo-alt" aria-hidden="true"></i>
              </div>
              <h3>No saved addresses</h3>
              <p>Add your delivery addresses to make checkout faster and easier.</p>
            </div>
          )}
        </div>

        {/* Add Address Form */}
        {!showAddForm ? (
          <button className="add-address-btn" onClick={() => setShowAddForm(true)}>
            + Add new address
          </button>
        ) : (
          <form className="add-address-form" onSubmit={handleAddAddress}>
            <h3>Add New Address</h3>

            {locationError && (
              <div className="location-error-message">
                {locationError}
              </div>
            )}

            <button
              type="button"
              className="use-current-location-btn"
              onClick={handleUseCurrentLocation}
              disabled={isGettingLocation}
            >
              {isGettingLocation ? "📍 Getting location..." : "📍 Use Current Location"}
            </button>

            <div className="form__group">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                placeholder="Enter your address"
              />
            </div>

            <div className="form__group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleFormChange}
                placeholder="Enter city"
              />
            </div>

            <div className="form__group">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleFormChange}
                placeholder="Enter state"
              />
            </div>

            <div className="form__group">
              <label htmlFor="pincode">Pincode *</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleFormChange}
                placeholder="Enter pincode"
              />
            </div>

            <div className="form__group">
              <label htmlFor="landmark">Landmark</label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                value={formData.landmark}
                onChange={handleFormChange}
                placeholder="Enter landmark (optional)"
              />
            </div>

            <div className="form-buttons">
              <button
                type="button"
                className="btn-secondary-addresses"
                onClick={() => {
                  setShowAddForm(false);
                  setFormData({
                    address: "",
                    city: "",
                    state: "",
                    pincode: "",
                    landmark: "",
                  });
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary-addresses">
                Save Address
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ManageAddressesModal;
