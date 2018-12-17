import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { StudentsInfo } from '../api/studentsInfo.js';
import Student from './Student.jsx';

export class Students extends Component {

  state = {
      showAddNewStudentForm: true,
      old_data: {
          _id: " ",
          name: " ",
          email: " ",
          phone: " ",
          dob: " "
      } 
  }
  saveStudentData(event) {
    event.preventDefault();

    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    const phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
    const dob = ReactDOM.findDOMNode(this.refs.dob).value.trim();

    Meteor.call('students_info.insert', name, email, phone, dob);

    ReactDOM.findDOMNode(this.refs.name).value = '';
    ReactDOM.findDOMNode(this.refs.email).value = '';
    ReactDOM.findDOMNode(this.refs.phone).value = '';
    ReactDOM.findDOMNode(this.refs.dob).value = '';
  }

  editStudentInfo(student) {
    //   Temporary UI state for update form 
     this.setState({
         showAddNewStudentForm: !this.state.showAddNewStudentForm,
         name: student.name,
         old_data: student
     })
  }

  //   Update student data
  updateStudentInfo(event) {
    event.preventDefault();

    const name = ReactDOM.findDOMNode(this.refs.updatedName,).value.trim();
    const email = ReactDOM.findDOMNode(this.refs.updatedEmail).value.trim();
    const phone = ReactDOM.findDOMNode(this.refs.updatedPhone).value.trim();
    const dob = ReactDOM.findDOMNode(this.refs.updatedDOB).value.trim();

    Meteor.call('students_info.update', this.state.old_data._id, name, email, phone, dob)

    // Reset the temporary UI state 
    this.setState({
        showAddNewStudentForm: !this.state.showAddNewStudentForm,
        old_data: null,
    });
  }

  renderStudents() {
    // Maps students data to "Student" component
    return this.props.students.map((student) => (
        <Student editClickHandler={this.editStudentInfo.bind(this, student)} key={student._id} student={student} />
    ));
  }
  render() {
    return (
        <React.Fragment>
            {/* 
                Generates form depending on the
                "ShowAddNewStudentForm" state 
            */}
            {this.state.showAddNewStudentForm ? <div className="student-form">
                <h2 className="display-4 text-center">Add New Student</h2>
                <form onSubmit={this.saveStudentData.bind(this)}>
                    <div className="form-group">
                        <input  
                            type="text" 
                            ref="name"
                            className="form-control input-field"
                            placeholder="Student's Name"/>
                    </div>
                    <div className="form-group">
                        <input
                            type="email" 
                            ref="email"
                            className="form-control input-field"
                            placeholder="Student's Email"/>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <input  
                                    type="phone" 
                                    ref="phone"
                                    className="form-control input-field"
                                    placeholder="Phone"/>
                            </div>
                            <div className="col-md-6 form-input-field">
                                <input  
                                    type="date" 
                                    ref="dob"
                                    className="input-field form-control"/>
                            </div>
                        </div>
                    </div>    
                    <button type="submit" className="btn btn-block submit-button">Add New Student</button>
                </form>
            </div> : <div className="student-form">
                <h2 className="display-4 text-center">Update Student Info</h2>
                <form className="form">
                    <div className="form-group">
                        <input
                            className="form-control input-field"
                            type="text"
                            ref="updatedName"
                            defaultValue={this.state.old_data.name}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control input-field"
                            type="email"
                            ref="updatedEmail"
                            defaultValue={this.state.old_data.email}
                        />
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <input
                                    className="form-control input-field"
                                    type="phone"
                                    ref="updatedPhone"
                                    defaultValue={this.state.old_data.phone}
                                /> 
                            </div>
                            <div className="col-md-6">
                                <input
                                    className="form-control input-field"
                                    type="date"
                                    ref="updatedDOB"
                                    defaultValue={this.state.old_data.dob}
                                />
                            </div>
                        </div>
                    </div>
                    <button onClick={this.updateStudentInfo.bind(this)} type="submit" className="btn btn-block submit-button update-button">
                        Update
                    </button>
                </form>
            </div>}
            <br/>
            {/* 
                Checks whether there is any
                data stored if there so then displays the data
            */}
            {this.props.students.length > 0 ? <div className="students_info"> 
                <h1 className="display-4 text-center">Students Information</h1>
                <table className="table student-table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Phone</td>
                            <td>Date of Birth</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderStudents() }
                    </tbody>
                </table>
                
            </div>: <h1 className="display-4 text-center text-danger">No Records Found</h1>}
            
        </React.Fragment>
    )
  }
}

export default withTracker(() => {
    // Subscribes to the publication 
    Meteor.subscribe('students_info');

    // Returns data for the above subscription 
	return {
        students: StudentsInfo.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user()
	};
})(Students);