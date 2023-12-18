import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { getVolunteer } from '../../http/volunteerAPI';

export default function AdminBlock() {
 const [volunteers, setVolunteers] = useState([]);

 useEffect(() => {
  const fetchVolunteers = async () => {
    const volunteersData = await getVolunteer();
    setVolunteers(volunteersData);
  };

  fetchVolunteers();
 }, []);

 return (
  <div>
    <Accordion>
      {volunteers.map((volunteer, index) => (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header>{volunteer.phone_number}</Accordion.Header>
          <Accordion.Body>{volunteer.experience}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  </div>
 );
}
