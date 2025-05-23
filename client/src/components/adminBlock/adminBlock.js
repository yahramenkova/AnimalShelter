import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from '../button/button';
import { Alert } from 'react-bootstrap';
import { createLostAnimal } from '../../http/lostAnimalAPI';
import { getVolunteer } from '../../http/volunteerAPI';
import { getAdoptionRequests, updateAdoptionStatus } from '../../http/adoptionAPI';
import jsPDF from 'jspdf';

export default function AdminBlock() {
  const [volunteers, setVolunteers] = useState([]);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [location, setLocation] = useState('');
  const [dateLost, setDateLost] = useState('');
  const [img, setImg] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
  const fetchData = async () => {
    const volunteersData = await getVolunteer();
    let adoptionData = await getAdoptionRequests();

    // сортировка: новые (с большим id) первыми
    adoptionData.sort((a, b) => b.adoption_id - a.adoption_id);

    setVolunteers(volunteersData);
    setAdoptionRequests(adoptionData);
  };
  fetchData();
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLostAnimal(species, breed, location, dateLost, img);
      setAlertMessage('Animal added successfully!');
    } catch (error) {
      console.error(error);
      setAlertMessage('Failed to add animal.');
    }
  };

  const exportVolunteersToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Volunteers List', 10, 10);
    let y = 20;
    volunteers.forEach((volunteer, index) => {
      const text = `${index + 1}. ${volunteer.user.firstName} ${volunteer.user.lastName} | Phone: ${volunteer.phone_number} | Experience: ${volunteer.experience}`;
      doc.text(text, 10, y);
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save('volunteers_list.pdf');
  };

  const handleApprove = async (id) => {
  try {
    await updateAdoptionStatus(id, 'approved');
    setAdoptionRequests(prev =>
      prev.map(req =>
        req.adoption_id === id ? { ...req, status: 'approved' } : req
      )
    );
  } catch (error) {
    console.error('Ошибка при подтверждении заявки:', error);
  }
};


  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="all-volunteers">
          <Accordion.Header>Show All Volunteers</Accordion.Header>
          <Accordion.Body>
            <Button
              customClass="button-pdf"
              variant="secondary"
              label="Export to PDF"
              onClick={exportVolunteersToPDF}
            />
            {volunteers.map((volunteer, index) => (
              <div key={index}>
                <p>{volunteer.user.firstName} {volunteer.user.lastName}</p>
                <p>Phone number: {volunteer.phone_number}</p>
                <p>Experience: {volunteer.experience}</p>
                <div className='line'></div>
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="add-lost-animal">
          <Accordion.Header>Add Lost Animal</Accordion.Header>
          <Accordion.Body lang="en">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Animal Species"
                name="species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Animal Breed"
                name="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
              <input
                type="text"
                placeholder="Animal Location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="text"
                placeholder="Date lost (dd.mm.yyyy)"
                name="dateLost"
                value={dateLost}
                onChange={(e) => setDateLost(e.target.value)}
              />
              <input
                type="text"
                placeholder="Image Link"
                name="img"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
              <Button customClass="button-logUp" variant="primary" label="Submit" type="submit" />
              <Alert
                className="alert"
                show={alertMessage !== ''}
                dismissible
                onClose={() => setAlertMessage('')}
              >
                {alertMessage}
              </Alert>
            </form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="adoption-requests">
          <Accordion.Header>View Adoption Requests</Accordion.Header>
          <Accordion.Body>
            {adoptionRequests.length === 0 ? (
              <p>No adoption requests available.</p>
            ) : (
              adoptionRequests.map((request, index) => (
                <div key={index}>
                  <p><strong>Animal ID:</strong> {request.animal_id}</p>
                  <p><strong>User ID:</strong> {request.user_id}</p>
                  <p><strong>Phone:</strong> {request.phone}</p>
                  <p><strong>Comment:</strong> {request.comment}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span style={{ color: request.status === 'approved' ? 'green' : 'black' }}>
                      {request.status}
                    </span>
                  </p>
                  {request.status !== 'approved' && (
                    <Button
                      customClass="button-submit"
                      variant="success"
                      label="Approve"
                      onClick={() => handleApprove(request.adoption_id)}
                    />
                  )}
                  <div className="line_adoption"></div>
                </div>
              ))
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
