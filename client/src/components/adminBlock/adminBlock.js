import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { getVolunteer } from '../../http/volunteerAPI';

export default function AdminBlock() {
  const [volunteers, setVolunteers] = useState([]);
  const [showAllVolunteers, setShowAllVolunteers] = useState(false);

  useEffect(() => {
    const fetchVolunteers = async () => {
      const volunteersData = await getVolunteer();
      setVolunteers(volunteersData);
    };

    fetchVolunteers();
  }, []);

  const handleShowAllVolunteers = () => {
    setShowAllVolunteers(!showAllVolunteers);
  };

  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="all-volunteers" style={{ display: showAllVolunteers ? 'block' : 'none' }}>
          <Accordion.Header>Show All Volunteers</Accordion.Header>
          <Accordion.Body>
            {volunteers.map((volunteer, index) => (
              <div key={index}>
                <p>{volunteer.phone_number}</p>
                <p>{volunteer.experience}</p>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {!showAllVolunteers && (
        <button onClick={handleShowAllVolunteers}>Show All Volunteers</button>
      )}
    </div>
  );
}