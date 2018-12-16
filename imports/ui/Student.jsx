import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { StudentsInfo } from '../api/studentsInfo.js'

export default class Student extends Component {
  deleteStudentInfo () {
    StudentsInfo.remove(this.props.student._id)
  }

  onEditClick () {
    this.props.editClickHandler()
  }

  render () {
    return (
      <React.Fragment>
        <tr>
          <td>{this.props.student.name}</td>
          <td>{this.props.student.email}</td>
          <td>{this.props.student.phone}</td>
          <td>{this.props.student.dob}</td>
          <td><a onClick={ this.onEditClick.bind(this) }><i className="fas fa-edit"></i></a></td>
          <td><a onClick={ this.deleteStudentInfo.bind(this) }><i className="fas fa-trash-alt"></i></a></td>
        </tr>

      </React.Fragment>
    )
  }
}
