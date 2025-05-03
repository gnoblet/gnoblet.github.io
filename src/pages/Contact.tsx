// src/pages/Contact.tsx
import React from 'react';

function Contact() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission
    console.log('Form submitted!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" />
      </label>
      <label>
        Email:
        <input type="email" />
      </label>
      <label>
        Message:
        <textarea />
      </label>
      <button type="submit">Send</button>
    </form>
  );
}

export default Contact;