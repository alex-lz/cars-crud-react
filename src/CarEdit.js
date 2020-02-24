import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import axios from 'axios';

const apiUrl = 'http://localhost:8083';

class CarEdit extends Component {

  emptyItem = {
    id:'',
    brand: '',
    name: '',
    model: '',
    year: '',
    price: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      axios.get(apiUrl + `/api/v1/cars/${this.props.match.params.id}`).then(response => response.data).then(
        (result)=>{
            this.setState({item: result})
        },
        (error)=>{
            this.setState({error})
        }
       )
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    axios({
        method: (item.id) ? 'put' : 'post',
        url: (item.id) ? apiUrl + `/api/v1/cars/${this.props.match.params.id}` : apiUrl + '/api/v1/cars',
        data: (item.id) ? item : (delete item.id, item)
    })
    .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      })
    // body: JSON.stringify(item),
    this.props.history.push('/cars');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Car' : 'Add Car'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="brand">Brand</Label>
            <Input type="text" name="brand" id="brand" value={item.brand || ''}
                   onChange={this.handleChange} autoComplete="brand"/>
          </FormGroup>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="model">Model</Label>
            <Input type="text" name="model" id="model" value={item.model || ''}
                   onChange={this.handleChange} autoComplete="model"/>
          </FormGroup>
          <FormGroup>
            <Label for="year">Year</Label>
            <Input type="number" name="year" id="year" value={item.year || ''}
                   onChange={this.handleChange} autoComplete="year"/>
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input type="number" name="price" id="priece" value={item.price || ''}
                   onChange={this.handleChange} autoComplete="price"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/cars">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(CarEdit);