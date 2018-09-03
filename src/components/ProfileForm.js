import React from 'react'
import {Component} from 'react'
import {Form, Button, Message, Label} from 'semantic-ui-react'
import CreateUser from "./Create/CreateUser";
import Validator from 'validator'
import InlineError from './messages/InlineError'

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
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
      loading: false,
      errors: {},
      isOpen: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.takeTargetSelect = this.takeTargetSelect.bind(this);
    this.validate = this.validate.bind(this)
  }

  validate(data) {
    let errors = {};
    if (typeof(data.type) === 'boolean' || data.type === '') errors.type = "Choose type of user";
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    if (data.phone.length < 10 || data.phone.length > 12) errors.phone = 'Invalid phone number';
    return errors
  }

  onSubmit() {
    const errors = this.validate(this.state.user);
    this.setState({errors});
    if (Object.keys(errors).length === 0) {
      this.state.loading = true;
      this.props.create(this.state.user)
    }
  }

  takeTargetSelect(event) {
    const user = {...this.state.user, type: event.target.value};
    this.setState({user});
    if (event.target.value === "teacher") {
      this.setState({isOpen: true})
    }
    else {
      this.setState({isOpen: false})
    }
  }

  handleInputChange(input) {
    return (event) => {
      const user = {...this.state.user, [input]: event.target.value};
      this.setState({user})
    }
  }


  render() {
    let {errors} = this.state;
    let teachersAdd = this.state.isOpen && (
      <div>
        <Form.Field>
          <label htmlFor="position">Position</label>
          <input type="text" placeholder="position" name="position" onChange={this.handleInputChange('position')}/>
        </Form.Field>
        <Form.Field>
          <label htmlFor="position">Experience</label>
          <input id="range" type="range" min="1" max="50" step="1" placeholder="experience" name="experience"
                 onChange={this.handleInputChange('experience')}/>
          <input type='text' id="rangeOutput" value={this.state.user.experience}/>
        </Form.Field>
      </div>);

    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label htmlFor="type">Type of user</label>
            <select className='list' onChange={this.takeTargetSelect}>
              <option defaultValue value>None</option>
              <option>{this.state.type[0].student.name}</option>
              <option>{this.state.type[1].teacher.name}</option>
            </select>
            {errors.type && <Label pointing> <InlineError text={errors.type}/></Label>}
          </Form.Field>
          <div className="user-info">
            <Form.Field>
              <label htmlFor="name">Name</label>
              <input type="text" placeholder="name" name="name" onChange={this.handleInputChange('name')}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor="surname">Surname</label>
              <input type="text" placeholder="surname" onChange={this.handleInputChange('surname')}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor="dateForBirthday">Date of birthday</label>
              <input type="date" placeholder="dateofBirthday" onChange={this.handleInputChange('dateOfBirthday')}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor="city">City</label>
              <input type="text" placeholder="city" onChange={this.handleInputChange('city')}/>
            </Form.Field>
            <Form.Field>
              <label htmlFor="number">Phone</label>
              <input type="tel" placeholder="+380" onChange={this.handleInputChange('phone')}/>
              {errors.phone && <Label pointing><InlineError text={errors.phone}/></Label>}
            </Form.Field>
            <Form.Field>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="email" onChange={this.handleInputChange('email')}/>
              {errors.email && <Label pointing><InlineError text={errors.email}/></Label>}
            </Form.Field>
          </div>
          {teachersAdd}
          <Button type="submit">Registrate</Button>
        </Form>
      </div>
    )
  }
}

export default ProfileForm