import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InternList = ({ onDelete }) => {
    const [interns, setInterns] = useState([]);

    useEffect(() => {
        const fetchInterns = async () => {
            try {
                const response = await axios.get('http://localhost:3001/intern_members');
                setInterns(response.data);
            } catch (error) {
                console.error('Error fetching interns:', error);
            }
        };

        fetchInterns();
    }, []);

    const deleteIntern = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/intern_members/${id}`);
            setInterns((prevInterns) => prevInterns.filter((intern) => intern.id !== id));
        } catch (error) {
            console.error('Error deleting intern:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ color: '#7D3C98', marginBottom: '20px' }}>Internship Candidates</h2>
            {interns.map((intern) => (
                <div key={intern.id} style={{ border: '2px solid #7D3C98', borderRadius: '6px', padding: '10px', marginBottom: '10px', width: '400px', boxShadow: '2px 2px 5px #888888' }}>
                    <p><strong>Name:</strong> {intern.name}</p>
                    <p><strong>Location:</strong> {intern.address}</p>
                    <p><strong>Date of Birth:</strong> {intern.dateOfBirth}</p>
                    <p><strong>Status:</strong> {intern.selectionStatus ? 'Accepted' : 'Pending'}</p>
                    <div>
                        <Link to={`/edit/${intern.id}`} style={{ marginRight: '6px', color: '#7D3C98', textDecoration: 'none' }}>Modify</Link>
                        <button onClick={() => deleteIntern(intern.id)} style={{ background: '#FF5733', color: 'white', border: 'none', borderRadius: '3px', padding: '3px 6px', cursor: 'pointer' }}>Remove</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InternList;
