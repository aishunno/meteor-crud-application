/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { StudentsInfo } from '../api/studentsInfo.js'
import { Meteor } from 'meteor/meteor'

export default class Student extends Component {
  state = {
    activeRow: false
  }

  deleteStudentInfo () {
    Meteor.call('students_info.remove', this.props.student._id)
  }

  onEditClick () {
    this.setState({
      activeRow: !this.state.activeRow
    })

    this.props.editClickHandler()
  }

  render () {
    return (
      <React.Fragment>
        <tr className={this.state.activeRow ? 'table-info': null}>
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
