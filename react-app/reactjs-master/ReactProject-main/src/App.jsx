import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Create from './Components/Create';
import ListInterns from './Components/ListInterns';
import InternEdit from './Components/UpdateInternDetail';

const App = () => {
  const [showAddIntern, setShowAddIntern] = useState(true);

  const toggleButtons = () => {
    setShowAddIntern(!showAddIntern);
  };

  return (
    <Router>
      <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
        {showAddIntern ? (
          <button className="btn btn-success btn-lg mb-3 add-intern-btn" onClick={toggleButtons}>
            <Link to="/create" className="text-white text-decoration-none">Add Intern Members</Link>
          </button>
        ) : (
          <button className="btn btn-info btn-lg mb-3 list-interns-btn" onClick={toggleButtons}>
            <Link to="/" className="text-white text-decoration-none">List Interns Members</Link>
          </button>
        )}
        <hr />

        <Routes>
          <Route path="/" element={<DefaultView />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<InternEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

function DefaultView() {
  return (
    <>
      <div>
        <ListInterns></ListInterns>
      </div>
    </>
  );
}

export default App;
