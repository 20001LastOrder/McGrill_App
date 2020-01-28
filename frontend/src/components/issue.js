import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Auth } from '../App';

export default class Issue extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      course: '',
      dateDue: 0,
      status: ''
    }
  }

  async componentDidMount() {
    if (this.props.match.params.id) {
      await axios.get('http://localhost:5000/campus/', { headers: { Authorization: 'Bearer ' +  Auth.token } })
      .then(response => {
        for (const doc of response.data) {
          if (doc._id === this.props.match.params.id) {
            this.setState({
              title: doc.title,
              description: doc.description,
              course: doc.course,
              dateDue: new Date(doc.dateDue.toString().substr(0, 10)),
              status: doc.status
            }) 
            break;
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeCourse(e) {
    this.setState({
      course: e.target.value
    })
  }

  onChangeDueDate(date) {
    this.setState({
      dateDue: date
    })
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    })
  }

  async onSubmit(e) {
    e.preventDefault();

    if (!this.props.match.params.id) {
        await axios({method: 'post', url: 'http://localhost:5000/campus/issue', 
                     data: this.state, headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' +  Auth.token }
        }).catch((err) => {});
    } else {
        await axios({method: 'put', url: 'http://localhost:5000/campus/issue', 
                     data: {'id': this.props.match.params.id, 'newData': this.state}, 
                     headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' +  Auth.token }
        }).catch((err) => {});
    }
  }

  render() {
    let hint = "";
    if (!this.props.match.params.id) hint = "create";
    else hint = "update";
    return (

    <div>
      <h3>Edit Issue</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Title </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>
        <div className="form-group"> 
          <label>Description </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Course </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.course}
              onChange={this.onChangeCourse}
              />
        </div>
        <div className="form-group">
          <label>Due Date </label>
          <div>
            <DatePicker
              selected={this.state.dateDue}
              onChange={this.onChangeDueDate}
            />
          </div>
        </div>
        <div className="form-group">
          {!!Auth.isServer ?               
              <select value={this.state.status} onChange={this.onChangeStatus}>
                <option selected value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="finished">Finished</option>
                <option value="issued">Issued</option>
              </select> : 
              null
          }
        </div>
        <div className="form-group">
          <input type="submit" value={hint} className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}