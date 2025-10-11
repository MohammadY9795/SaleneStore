import React, { useState } from "react";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate your API or form handling here
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
    setFormData({ fullName: "", email: "", phone: "", message: "" });
  };

  return (
    <main role="main" className="main-content contact-page">
      {/* Hero Section */}
      <section className="index-page section-padding text-center">
        <div className="hero__content__wrapper">
          <div className="hero__content hero__content--compact">
            <h2 className="hero__title">Contact</h2>
            <div className="hero__rte">
              <p>
                We would love to hear from you! Whether you have a question, need assistance, or want to share your feedback, our team is here to help.
              </p>
              <p><strong>Customer Service:</strong></p>
              <ul className='list-unstyled'>
                <li>Contact Us: 9873949037</li>
                <li>Email: <a href="mailto:support@metaman.in">support@metaman.in</a></li>
                <li>Address: Flat No - A1702, Fressia Ranibello, Shivaji Nagar, Shree Mahakali Dairy, Mumbai, Maharashtra, 400097</li>
              </ul>
              <p><strong>Feedback and Inquiries:</strong> Please fill out the form below, and we will get back to you as soon as possible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="index-contact section-padding">
        <div className="wrapper--narrow">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="custom-form__block">
              <label htmlFor="fullName" className="visually-hidden">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="custom-form__block">
              <label htmlFor="email" className="visually-hidden">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email*"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="custom-form__block">
              <label htmlFor="phone" className="visually-hidden">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone Number*"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="custom-form__block">
              <label htmlFor="message" className="visually-hidden">Message</label>
              <textarea
                id="message"
                name="message"
                rows="10"
                placeholder="Message*"
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div className="custom-form__block">
              <button type="submit" className="btn btn--primary btn--solid btn--full">
                Send
              </button>
            </div>

            <div className="custom-form__required-text">
              Fields marked with an asterisk (*) are required.
            </div>

            <div className="form__legal">
              <p>
                This site is protected by hCaptcha and the hCaptcha <a href="https://hcaptcha.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and <a href="https://hcaptcha.com/terms" target="_blank" rel="noreferrer">Terms of Service</a> apply.
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
