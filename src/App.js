import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

import Card from "react-bootstrap/Card";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationResult: {},
      searchQuery: '',
      showLocInfo: false,
    };
  }

  getLocFun = async (e) => {
    e.preventDefault();

    await this.setState({
      searchQuery: e.target.city.value,
    });

    let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;

    let locResult = await axios.get(reqUrl);

    this.setState({
      locationResult: locResult.data[0],
      showLocInfo: true,
    });
  };

  render() {
    return (
      <div>

        <header style={{ backgroundColor: "pink", padding: '15px' }}>
          <h2>City Explorer App</h2>
        </header>

        <main style={{ backgroundColor: "lightblue", marginTop: '-25px' }}>

          <Form onSubmit={this.getLocFun} style={{ width: "25rem", marginLeft: '30px', marginTop: '30px', paddingBottom: '50px', maxHeight: '1000', paddingTop:'50px' }} >

            <Form.Group className="mb-3" controlId="SearchForLocation">

              <Form.Label>Location </Form.Label>

              <Form.Control type="text" name='city' placeholder="Enter The Location for the city" />
            </Form.Group>

            <Button type="submit" variant="primary">
              Let's Finde it
            </Button>


          </Form>


          {this.state.showLocInfo &&
            <>
              <Card style={{ width: "18rem", border: '2px solid black', marginLeft: '25px', marginBottom: '25px' }}>

                <Card.Body>

                  <Card.Title>Location For The City </Card.Title>

                  <Card.Text>

                    <p>LATITUDE: {this.state.locationResult.lat}</p>

                    <p>LONGITUDEl: {this.state.locationResult.lon} </p>

                  </Card.Text>

                  <Card.Img

                    variant="top"
                    src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`}
                  />
                </Card.Body>
              </Card>
            </>
          }
        </main>

        <footer style={{ backgroundColor: "pink", padding: '20px' }}>

          <h3>Design by : Ammar Zeyad</h3>

        </footer>

      </div>
    );
  }
}

export default App;