import { useState } from 'react';
import { createEvent } from '@/api';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent = {
      title,
      description,
      date,
      status,
    };

    try {
      const createdEvent = await createEvent(newEvent);
      console.log('Event created:', createdEvent);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value)} required>
        <option value="">Select Status</option>
        <option value="ongoing">Ongoing</option>
        <option value="past">Past</option>
        <option value="upcoming">Upcoming</option>
      </select>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
