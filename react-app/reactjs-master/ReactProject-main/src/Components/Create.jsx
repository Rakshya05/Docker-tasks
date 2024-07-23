import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";


const CreateDifferent = () => {
    const [fullName, setFullName] = useState("");
    const [fullAddress, setFullAddress] = useState("");
    const [birthDate, setBirthDate] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!fullName || !fullAddress || !birthDate) {
            alert("Please fill in all required fields.");
            return;
        }

        axios.post("http://localhost:3001/intern_members", {
            name: fullName,
            address: fullAddress,
            dateOfBirth: birthDate.toISOString().split('T')[0],
            selectionStatus: isSelected
        })
            .then(() => {
                alert("Intern Added");
                navigate('/');
            })
            .catch(error => {
                console.error("Error adding intern:", error);
                alert("Error adding intern. Please try again.");
            });
    };

    const handleDateChange = (date) => {
        setBirthDate(date);
    };

    return (
        <>
            <div className="m-2 p-5" style={{ backgroundColor: "#f9f9f9", borderRadius: "15px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                <div className="d-flex justify-content-center">
                    <h2 className="text-success" style={{ fontFamily: "Arial, sans-serif" }}>New Intern Registration</h2>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            style={{ borderColor: "#62b8ff", borderRadius: "8px" }}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Full Address</label>
                        <input
                            type="text"
                            className="form-control"
                            style={{ borderColor: "#62b8ff", borderRadius: "8px" }}
                            onChange={(e) => setFullAddress(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Date of Birth</label><br />
                        <DatePicker
                            selected={birthDate}
                            placeholderText="YYYY/MM/DD"
                            onChange={handleDateChange}
                            className="form-control"
                            style={{ borderColor: "#62b8ff", borderRadius: "8px" }}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" onChange={(e) => setIsSelected(e.target.checked)} />
                        <label className="form-check-label" style={{ color: "#62b8ff" }}>Selection Status</label>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success"
                        style={{ backgroundColor: "#62b8ff", borderColor: "#62b8ff", borderRadius: "8px" }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateDifferent;
