import React, {Component} from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';

class App extends Component{
  state = {
    employees: [],
    newEmployeeData:{
      EmpID: '',
      Name: '',
      EmpCode: '',
      Salary: ''
    },
    newEmployeeModal: false
  }
  addEmployee(){
    let { newEmployeeData } = this.state;
    newEmployeeData.EmpID = 0;
    this.setState({ newEmployeeData });
    axios.post('http://localhost:5000/employees', this.state.newEmployeeData).then((response) =>{
        let { employees } = this.state;

        employees.push(response.data);
        this.setState({ employees, newEmployeeModal: false, newEmployeeData:{
          EmpID: '',
          Name: '',
          EmpCode: '',
          Salary: ''
        } })
    });
  }

  componentWillMount(){
    axios.get('http://localhost:5000/employees').then((response) =>{
      this.setState({
        employees: response.data
     
      })
     });
  }
  toggleNewEmployeeModal(){
    this.setState({
      newEmployeeModal: !this.state.newEmployeeModal
    });
  }
  render(){
    let employees = this.state.employees.map((employee) => {
      return(
        <tr key={employee.EmpID}>
          <td>{employee.EmpID}</td>
          <td>{employee.Name}</td>
          <td>{employee.EmpCode}</td>
          <td>{employee.Salary}</td>
          <td>
            <Button color="success" size="sm" className="mr-2">Edit</Button>
            <Button color="danger" size="sm">Delete</Button>
          </td>
        </tr>
      )
    });
    return(
      <div className="App container mt-5">

        <Button color="primary" onClick={this.toggleNewEmployeeModal.bind(this)}>Add Employee</Button>
        <Modal isOpen={this.state.newEmployeeModal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggleNewEmployeeModal.bind(this)}>Add New Employee</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input id="name" placeholder="" value={this.state.newEmployeeData.Name} onChange={(e) => {
                let { newEmployeeData } = this.state;
                newEmployeeData.Name = e.target.value;
                this.setState({ newEmployeeData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for='emp_code'>Emp Code</Label>
              <Input id="emp_code" placeholder="" value={this.state.newEmployeeData.EmpCode} onChange={(e) => {
                let { newEmployeeData } = this.state;
                newEmployeeData.EmpCode = e.target.value;
                this.setState({ newEmployeeData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for='salary'>Salary</Label>
              <Input id="salary" placeholder="" value={this.state.newEmployeeData.Salary} onChange={(e) => {
                let { newEmployeeData } = this.state;
                newEmployeeData.Salary = e.target.value;
                this.setState({ newEmployeeData });
              }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addEmployee.bind(this)}>Add Employee</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewEmployeeModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

           <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Employer Code</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees}
            </tbody>
          </Table>
      </div>
    )
  }
}

export default App;
