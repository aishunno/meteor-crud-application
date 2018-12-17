/* eslint-disable no-unused-vars */
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

// Creates new collection
export const StudentsInfo = new Mongo.Collection('students_info')

// Publish data created by the current user
if (Meteor.isServer) {
  Meteor.publish('students_info', function studentsInfoPublication () {
    return StudentsInfo.find({
      $or: [{ owner: this.userId }]
    })
  })
}

// Methods for database operations
Meteor.methods({
  'students_info.insert' (name, email, phone, dob) {
    check(name, String)
    check(email, String)
    check(phone, String)
    check(dob, String)

    // Make sure the user is authenticated
    if (!this.userId) {
      throw new Meteor.Error('Not Authorized')
    }

    // Checks for empty fields
    if (!name || !email || !phone || !dob) {
      throw new Meteor.Error('Field should not be empty')
    }

    // Insert data into database
    StudentsInfo.insert({
      name,
      email,
      phone,
      dob,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    })
  },

  'students_info.remove' (studentId) {
    // Finds the student with the provided ID
    const student = StudentsInfo.findOne(studentId)

    // Make sure only the creator can remove data
    if (student.owner !== this.userId) {
      throw new Meteor.Error('Not Authorized')
    }

    // Removes student data
    StudentsInfo.remove(studentId)
  },

  'students_info.update' (studentId, name, email, phone, dob) {
    check(name, String)
    check(email, String)
    check(phone, String)
    check(dob, String)

    // Checks for empty fields
    if (!name || !email || !phone || !dob) {
      throw new Meteor.Error('Field should not be empty')
    }
    // Finds the student with the provided student id
    const student = StudentsInfo.findOne(studentId)

    // Make sure only the creator can update data
    if (student.owner !== this.userId) {
      throw new Meteor.Error('Not Authorized')
    }

    // Update student data
    StudentsInfo.update(studentId, {
      $set: { name: name, email: email, phone: phone, dob: dob }
    })
  }
})
