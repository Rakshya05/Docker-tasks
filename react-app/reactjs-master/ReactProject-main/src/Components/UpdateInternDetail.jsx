import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";

const InternEdit = () => {
    const { id } = useParams();
    console.log(id);
    const [intern, setIntern] = useState({
        name: '',
        address: '',
        dateOfBirth: '',
        selectionStatus: false,
    });


    useEffect(() => {
        const fetchIntern = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/intern_members/${id}`);
                response.data.dateOfBirth = new Date(response.data.dateOfBirth);
                setIntern(response.data);
            } catch (error) {
                console.error('Error fetching intern:', error);
            }
        };

        fetchIntern();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIntern({ ...intern, [name]: value });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formattedDateOfBirth = intern.dateOfBirth.toISOString().split('T')[0];
            await axios.put(`http://localhost:3001/intern_members/${id}`, {
                name: intern.name,
                address: intern.address,
                dateOfBirth: formattedDateOfBirth,
                selectionStatus: intern.selectionStatus
            });
            navigate('/');

        } catch (error) {
            console.error('Error updating intern:', error);
        }
    };
    return (
        <>
            <div className="m-2 p-5">
                <div className="d-flex">
                    <h2 className="">Edit Intern</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control" name="name" value={intern.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                            type="text" name="address" value={intern.address}
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date of Birth</label><br />
                        <DatePicker
                            selected={intern.dateOfBirth}
                            placeholderText="YYYY/MM/DD"
                            onChange={(date) => setIntern({ ...intern, dateOfBirth: date })}
                            dateFormat="yyyy/MM/dd"
                        />
                        {/* <DatePicker name="dateOfBirth" value={intern.dateOfBirth} placeholderText="YYYY/MM/DD" onChangeRaw={(date) => setIntern({ ...intern, dateOfBirth: date })} /> */}
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" name="selectionStatus" checked={intern.selectionStatus} onChange={(e) => setIntern({ ...intern, selectionStatus: e.target.checked })} />
                        <label className="form-check-label" >Selection Status</label>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default InternEdit;
