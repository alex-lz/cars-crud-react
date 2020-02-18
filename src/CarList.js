import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'http://localhost:8083';

class CarList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error:null, 
      cars: [], 
      response: {}, 
      isLoading: true
    };
    this.remove = this.remove.bind(this);
  }

componentDidMount(){
  this.setState({isLoading: true});

   axios.get(apiUrl + '/api/v1/cars').then(response => response.data).then(
        (result)=>{
            this.setState({
                cars:result, isLoading: false
            });
        },
        (error)=>{
            this.setState({error});
        }
    )
}

  async remove(id) {
    const { cars } = this.state;
    axios.delete(apiUrl + '/api/v1/cars/' + id).then(result=>{
       this.setState({
         response:result,
         cars:cars.filter(car=>car.id !== id)
       });
     });
  }

  render() {
    const {cars, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const carList = cars.map(car => {
      return <tr key={car.id}>
        <td style={{whiteSpace: 'nowrap'}}>{car.brand}</td>
        <td style={{whiteSpace: 'nowrap'}}>{car.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{car.model}</td>
        <td style={{whiteSpace: 'nowrap'}}>{car.year}</td>
        <td style={{whiteSpace: 'nowrap'}}>{car.price}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/cars/" + car.id}>Edit</Button>
            <Button 
              size="sm" 
              color="danger" 
              onClick={() => window.confirm("Are you sure you wish to delete this item?") && this.remove(car.id)}
            >Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/cars/new">Add Car</Button>
          </div>
          <h3>Cars list</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="15%">Brand</th>
              <th width="15%">Name</th>
              <th width="15%">Model</th>
              <th width="15%">Year</th>
              <th width="15%">Price</th>
              <th width="20%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {carList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CarList;