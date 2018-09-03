import React from 'react'
import {Component} from 'react'
import db from '../../firebase'
import EditForm from "./EditForm";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      isOpen: false,
      activeUser: {
        type: '',
        name: '',
        surname: '',
        city: '',
        dateOfBirthday: '',
        phone: '',
        email: '',
        position: '',
        faculty: '',
        experience: ''
      },
      activeUserId: '',
    };
    this.selectUser = this.selectUser.bind(this);
    this.handle = this.handle.bind(this);
    this.submit = this.submit.bind(this);
  }


  componentDidMount() {
    return db.ref('users').once('value').then(el => {
      this.setState({
        users: el.val() ? el.val() : {}
      })
    })
  }


  selectUser(event) {
    event.preventDefault();
    let activeUserId = event.target.value;
    this.setState({activeUserId});
    db.ref('users').child(activeUserId).once('value').then((element) => {
      let activeUser = {...this.state.activeUser, ...element.val()};
      this.setState({activeUser})
    })
  }

  submit(event) {
    console.log(event);
    let userId = this.state.activeUserId;
    db.ref('users').child(userId).set(event)
      .then(() => this.props.history.push('/'))
  }

  generateOptions(users) {
    return Object.keys(users).map(el => {
      let opt = <option key={el} value={el}>{users[el].name}</option>;
      return opt
    })
  }


  handle(event) {
    event.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const chooseForEdit = (
      <div>
        <select onChange={this.selectUser}>
          <option defaultValue value>None</option>
          {this.generateOptions(this.state.users)}
        </select>
        <button onClick={this.handle}>Choose</button>
      </div>
    );
    let editForm = this.state.isOpen && (<EditForm submit={this.submit} state={this.state.activeUser}/>);
    return (
      <div className="user-form">
        <h1>Edit</h1>
        {chooseForEdit}
        {editForm}
      </div>
    )
  }
}


export default EditUser