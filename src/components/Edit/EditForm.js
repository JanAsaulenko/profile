import React from 'react'
import {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: [
        {
          student: {
            id: '1',
            name: 'student'
          },
        },
        {
          teacher: {
            id: '2',
            name: 'teacher'
          }
        },
      ],
      showTeacherInfo: false,
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
      }
    };
    this.takeTargetSelect = this.takeTargetSelect.bind(this);
    this.submit = this.submit.bind(this);
    this.generateOption = this.generateOption.bind(this)
  }

  takeTargetSelect(event) {
    if (event.target.value === "teacher") {
      this.setState({showTeacherInfo: true})
    }
    else {
      this.setState({showTeacherInfo: false})
    }
  }

  handleInput(input) {
    return (event) => {
      let activeUser = {...this.state.activeUser, [input]: event.target.value}
      this.setState({activeUser})
    }
  }

  submit(event) {
    event.preventDefault();
    this.props.submit(this.state.activeUser)
  }

  componentDidMount() {
    let activeUser = {...this.state.activeUser, ...this.props.state};
    this.setState({activeUser});
    if (activeUser.type === 'teacher') {
      this.setState({showTeacherInfo: true})
    }
    else {
      this.setState({showTeacherInfo: false})
    }
  }

  generateOption(options) {
    let opt = [];
    options.map((el) => {
      Object.keys(el).map((el) => {
        if (el === 'student') {
          if (this.state.showTeacherInfo) {
            opt.push(<option key={el} value={el}>{el}</option>)
          }
        }
        else if (el === 'teacher') {
          if (!this.state.showTeacherInfo) {
            opt.push(<option key={el} value={el}>{el}</option>)
          }
        }
      })
    })
    return opt
  }


  render() {
    let user = this.state.activeUser;
    let teachersAdd = this.state.showTeacherInfo && (
      <div>
        <Form.Field>
          <label htmlFor="position">Position</label>
          <input type="text" placeholder="position" name="position" defaultValue={user.position}
                 onChange={this.handleInput('position')}/>
        </Form.Field>
        <Form.Field>
          <label htmlFor="position">Experience</label>
          <input id="range"
                 type="range"
                 min="1"
                 max="50"
                 step="1"
                 defaultValue={user.experience}
                 placeholder="experience"
                 name="experience"
                 onChange={this.handleInput('experience')}/>
          <input type='text' id="rangeOutput" value={this.state.activeUser.experience}
                 onChange={this.handleInput('experience')}/>
        </Form.Field>
      </div>);
    return (
      <div>
        <Form onSubmit={this.submit}>
          <div className="user-info">
            <select className='list' onChange={this.takeTargetSelect}>
              <option defaultValue={user.type}>{user.type}</option>
              {this.generateOption(this.state.type)}
            </select>
            <Form.Field>
              <label htmlFor="name">Name</label>
              <input type="text" placeholder="name" name="name" defaultValue={user.name}
                     onChange={this.handleInput('name')}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor="surname">Surname</label>
              <input type="text" placeholder="surname" defaultValue={user.surname}
                     onChange={this.handleInput('surname')}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor="dateForBirthday">Date of birthday</label>
              <input type="date" placeholder="dateOfBirthday" defaultValue={user.dateOfBirthday}
                     onChange={this.handleInput('dateOfBirthday')}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor="city">City</label>
              <input type="text" placeholder="city" defaultValue={user.city} onChange={this.handleInput('city')}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor="number">Phone</label>
              <input type="tel" placeholder="+380" defaultValue={user.phone} onChange={this.handleInput('phone')}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="email" defaultValue={user.email} onChange={this.handleInput('email')}/>
            </Form.Field>
            {teachersAdd}
          </div>
          <Button type="submit">Change data</Button>
        </Form>
      </div>
    )
  }
}


export default EditForm