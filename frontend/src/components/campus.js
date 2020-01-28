import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Auth } from '../App';

const Campus = (props) => (
    <tr>
      <td>{props.campus.title}</td>
      <td>{props.campus.course}</td>
      <td>{props.campus.description}</td>
      <td>{props.campus.status}</td>
      <td>{props.campus.dateDue.substring(0,10)}</td>
      <td>
        <Link to={"/issue/"+props.campus._id}>edit</Link> | <a href="#" onClick={() => { props.deleteCampus(props.campus._id) }}>delete</a>
      </td>
    </tr>
)

export default class CampusList extends React.Component {
    constructor(props) {
      super(props);
  
      this.deleteCampus = this.deleteCampus.bind(this)
  
      this.state = {campus: []};
    }
  
    async componentDidMount() {
      let response = await axios.get('http://localhost:5000/campus/', { headers: { Authorization: 'Bearer ' +  Auth.token } }).catch((err) => {})
      this.setState({ campus: response.data })
    }
  
    async deleteCampus(cid) {
      await axios.delete('http://localhost:5000/campus/issue', {
        headers: {
          Authorization: 'Bearer ' + Auth.token
        },
        data: {
          id: cid
        }
      }).then(response => { console.log(response.data)});
  
      this.setState({
        campus: this.state.campus.filter(el => el._id !== cid)
      })
    }
  
    campusList() {
      return this.state.campus.map(currentcampus => {
        return <Campus campus={currentcampus} deleteCampus={this.deleteCampus} key={currentcampus._id}/>;
      })
    }
  
    render() {
      return (
        <div>
          <h3>Assignment Writing and Notes Taking</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { this.campusList() }
            </tbody>
          </table>
        </div>
      )
    }
  }