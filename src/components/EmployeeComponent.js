
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({});
    const [updatedEmployee, setUpdatedEmployee] = useState({});
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const fetchEmployees = () => {
        // GET request
        axios.get('https://dummy.restapiexample.com/api/v1/employees')
            .then(response => {
                setEmployees(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    };

    useEffect(() => {
        fetchEmployees();
    }, []);//here the empty array indicates that it runs only once when the component mount and if we have any field inside that array ,the effect will re-run when the field gets updated.

    const handleGetById = (id) => {
        // GET by ID request
        axios.get(`	https://dummy.restapiexample.com/api/v1/employee/${id}`)
            .then(response => {
                console.log('Employee by ID:', response.data);
                setSelectedEmployee(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching employee by ID:', error);
            });
    };

    const handlePost = () => {
        // POST request
        axios.post('https://dummy.restapiexample.com/api/v1/create', newEmployee)
            .then(response => {
                console.log('Employee added successfully:', response.data);
                fetchEmployees(); //fetch the updated data after successful post call
            })
            .catch(error => {
                console.error('Error adding employee:', error);
            });
    };

    const handlePut = () => {
        // PUT request
        axios.put(` https://dummy.restapiexample.com/api/v1/update/${selectedEmployee.id}`, updatedEmployee)
            .then(response => {
                console.log('Employee updated successfully:', response.data);
                fetchEmployees(); //fetch the updated data after successful put call
            })
            .catch(error => {
                console.error('Error updating employee:', error);
            });
    };

    const handleDelete = (id) => {
        // DELETE request
        axios.delete(`https://dummy.restapiexample.com/api/v1/delete/${id}`)
            .then(response => {
                console.log('Employee deleted successfully:', response.data);
                fetchEmployees(); //fetch the updated data after successful delete call
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
            });
    };
    const handleEdit = (id) => {
        // Fetch employee data for editing
        axios.get(`	https://dummy.restapiexample.com/api/v1/employee/${id}`)
            .then(response => {
                console.log('Employee data for editing:', response.data);
                setSelectedEmployee(response.data.data);
                setUpdatedEmployee({
                    ...response.data.data,
                })

            })
            .catch(error => {
                console.error('Error fetching employee data for editing:', error);
            });
    };

    return (
        <div>
            <h1>Employee Component</h1>
            {/*code for GET API call */}
            <h2>Employee Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.employee_name}</td>
                            <td>{employee.employee_salary}</td>
                            <td>{employee.employee_age}</td>
                            <td>
                                <button onClick={() => handleGetById(employee.id)}>Get by ID</button>
                                <button onClick={() => handleEdit(employee.id)}>Edit</button>
                                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* code for GET BY ID api call */}
            <h2>Selected Employee</h2>
            {selectedEmployee && (
                <div>
                    <p>ID: {selectedEmployee.id}</p>
                    <p>Name: {selectedEmployee.employee_name}</p>
                    <p>Salary: {selectedEmployee.employee_salary}</p>
                    <p>Age: {selectedEmployee.employee_age}</p>
                </div>
            )}
            {/* code for PUT api call */}
            {selectedEmployee && (
                <div>
                    <h2>Edit Employee</h2>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={selectedEmployee.employee_name}
                        onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, employee_name: e.target.value })}
                    />
                    <label>Salary: </label>
                    <input
                        type="number"
                        value={selectedEmployee.employee_salary}
                        onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, employee_salary: e.target.value })}
                    />
                    <label>Age: </label>
                    <input
                        type="number"
                        value={selectedEmployee.employee_age}
                        onChange={(e) => setUpdatedEmployee({ ...updatedEmployee, employee_age: e.target.value })}
                    />
                    <button onClick={handlePut}>Update Employee</button>
                </div>
            )}

            {/* code for POST api call */}
            <h2>Add Employee</h2>
            <input
                type="text"
                placeholder="Name"
                onChange={(e) => setNewEmployee({ ...newEmployee, employee_name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Salary"
                onChange={(e) => setNewEmployee({ ...newEmployee, employee_salary: e.target.value })}
            />
            <input
                type="number"
                placeholder="Age"
                onChange={(e) => setNewEmployee({ ...newEmployee, employee_age: e.target.value })}
            />
            <button onClick={handlePost}>Add Employee</button>
        </div>
    );
};

export default EmployeeComponent;