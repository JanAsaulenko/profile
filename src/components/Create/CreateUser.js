import React from 'react'
import {Component} from 'react'
import ProfileForm from "../ProfileForm";
import db from '../../firebase'

class CreateUser extends Component {
  constructor(props) {
    super(props)

  }

  createUser(dates) {
    const faculty = {
      economical: {
        id: 1,
        name: 'economical'
      },
      financial: {
        id: 2,
        name: 'financial'
      },
      engineering: {
        id: 3,
        name: 'engineering'
      },
      historical: {
        id: 4,
        name: 'historical'
      }
    };
    const user = dates;
    const userId = db.ref().push().key;
    let ref = db.ref('users');
    ref = ref.child(userId);
    ref.set(user)
  }

  render() {
    return (
      <div className="user-form">
        <h1>Create</h1>
        <ProfileForm create={this.createUser}/>
      </div>
    )
  }
}


export default CreateUser