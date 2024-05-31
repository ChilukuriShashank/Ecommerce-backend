import React from 'react';
import { Link } from 'react-router-dom';

export default function WhatsAppLink() {
  const phoneNumber = '7036622150';
  const name = 'John Doe';
  const age = 25;

  // Define the message format with placeholders
  const messageFormat = `Hello! This is a message for [NAME]. [NAME] is [AGE] years old.`;

  // Replace placeholders with actual values
  const message = messageFormat.replace('[NAME]', name).replace('[AGE]', age);
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link to={whatsappLink} target="_blank">
      Open WhatsApp
    </Link>
  );
}
