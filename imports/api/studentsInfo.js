/* eslint-disable no-unused-vars */
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

export const StudentsInfo = new Mongo.Collection('students_info')

if (Meteor.isServer) {
  Meteor.publish('students_info', function studentsInfoPublication () {
    return StudentsInfo.find()
  })
}

Meteor.methods({
  'students_info.insert' (name, email, phone, dob) {
    check(name, String)
    check(email, String)
    check(phone, String)
    check(dob, String)

    if (!this.userId) {
      throw new Meteor.Error('Not Authorized')
    }

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

    if (student.owner !== this.userId) {
      // make sure only the creator can remove data
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

    const student = StudentsInfo.findOne(studentId)

    if (student.owner !== this.userId) {
      throw new Meteor.Error('Not Authorized')
    }

    StudentsInfo.update(studentId, {
      $set: { name: name, email: email, phone: phone, dob: dob }
    })
  }
})
