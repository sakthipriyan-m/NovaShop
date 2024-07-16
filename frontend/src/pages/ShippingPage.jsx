import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";
import { FaEdit } from "react-icons/fa";
import CheckoutProgressTracker from "../components/CheckoutProgressTracker";
import { Country, State, City } from "country-state-city";
import CartSummary from "../components/CartSummary";

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const [name, setName] = useState(shippingAddress?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress?.phoneNumber || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [address2, setAddress2] = useState(shippingAddress?.address2 || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [state, setState] = useState(shippingAddress?.state || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [isEditing, setIsEditing] = useState(false);
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.name && !shippingAddress.phoneNumber && !shippingAddress.address && !shippingAddress.city && !shippingAddress.postalCode && !shippingAddress.country && !shippingAddress.state) {
      setIsEditing(true);
    }
  }, [shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      dispatch(saveShippingAddress({ name, phoneNumber: phoneNumber, address, address2, city, state, postalCode, country }));
      navigate("/review-order");
    }
  };

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    // Reset state and city when country changes
    setState("");
    setCity("");
  };

  const handleStateChange = (selectedState) => {
    setState(selectedState);
    // Reset city when state changes
    setCity("");
  };

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
  };

  return (
    <FormContainer isShippingPage={true}>
      <CheckoutProgressTracker shipping />
      <h2>Shipping Details</h2>
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Row>
          <Col md={8}>
          {shippingAddress && !isEditing && (
              <Row className="mb-2">
                <Col>
                  <div
                    type="button"
                    variant="link"
                    onClick={() => setIsEditing(true)}
                    className="btn-dark"
                    style={{ cursor: "pointer", float: "right" }}
                  >
                    <FaEdit /> Edit
                  </div>
                </Col>
              </Row>
            )}
            <Row>
              <Col md={6}>
                <Form.Group controlId="name" className="mb-2">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    required
                    isInvalid={validated && !name}
                  />
                  <Form.Control.Feedback type="invalid">
                    Name is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="phoneNumber" className="mb-2">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={!isEditing}
                    required
                    isInvalid={validated && !phoneNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    Phone Number is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="country" className="mb-2">
                  <Form.Label>Country *</Form.Label>
                  <Form.Control
                    as="select"
                    value={country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    disabled={!isEditing}
                    required
                    isInvalid={validated && !country}
                  >
                    <option value="">Select Country *</option>
                    {Country.getAllCountries().map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Country is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="state" className="mb-2">
                  <Form.Label>State *</Form.Label>
                  <Form.Control
                    as="select"
                    value={state}
                    onChange={(e) => handleStateChange(e.target.value)}
                    disabled={!isEditing}
                    required
                    isInvalid={validated && !state}
                  >
                    <option value="">Select State</option>
                    {State.getStatesOfCountry(country).map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    State is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="city" className="mb-2">
                  <Form.Label>City *</Form.Label>
                  <Form.Control
                    as="select"
                    value={city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    disabled={!isEditing}
                    required
                    isInvalid={validated && !city}
                  >
                    <option value="">Select City</option>
                    {City.getCitiesOfState(country, state).map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    City is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
              <Form.Group controlId="postalCode" className="mb-2">
              <Form.Label>Postal Code *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                disabled={!isEditing}
                required
                isInvalid={validated && !postalCode}
              />
              <Form.Control.Feedback type="invalid">
                Postal Code is required
              </Form.Control.Feedback>
            </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="address" className="mb-2">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!isEditing}
                    required
                    isInvalid={validated && !address}
                  />
                  <Form.Control.Feedback type="invalid">
                    Address is required
                  </Form.Control.Feedback>
                </Form.Group>
            <Form.Group controlId="address2" className="mb-2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <div className="mt-4">
              <CartSummary  showShippingPrice={true} onSubmit={submitHandler}/>
            </div>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
