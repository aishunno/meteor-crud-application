/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

export default class Student extends Component {
  deleteStudentInfo () {
    Meteor.call('students_info.remove', this.props.student._id)
  }

  onEditClick () {
    this.props.editClickHandler()
  }

  render () {
    // Destructuring the object
    const { name, email, phone, dob } = this.props.student
    return (
      <React.Fragment>
        <tr>
          <td>{name}</td>
          <td>{email}</td>
          <td>{phone}</td>
          <td>{dob}</td>
          <td><a onClick={ this.onEditClick.bind(this) }><i className="fas fa-edit"></i></a></td>
          <td><a onClick={ this.deleteStudentInfo.bind(this) }><i className="fas fa-trash-alt"></i></a></td>
        </tr>
      </React.Fragment>
    )
  }
}
