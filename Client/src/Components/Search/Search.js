import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Container,Form, FormControl, FormGroup, Table } from '@material-ui/core';
import {Form,  Button,Col, Container, Table} from 'react-bootstrap/'

 function Search(){
    return (    
    <Container>
        <div>
          <h1> SEARCH </h1>
        </div>

        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridOxidizer">
                    <Form.Control defaultValue="Oxidizer" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridYear">
                    <Form.Control defaultValue="YEAR" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridOutputFormat">
                {/* <Form.Label>State</Form.Label> */}
                    <Form.Control as="select" defaultValue="NONE">
                        <option>Output Formats</option>
                        <option>DEEZ NUTS</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCategories">
                {/* <Form.Label>State</Form.Label> */}
                    <Form.Control as="select" defaultValue="NONE">
                        <option>Categories</option>
                        <option>DEEZ NUTS</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="search" size="sm">
                    Search Database
                </Button>

            </Form.Row>

            <Form.Row>

                <Form.Group as={Col} controlId="formGridSub">
                    <Form.Control defaultValue="Subcategories" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridFuel">
                    <Form.Control defaultValue="Fuel" />
                </Form.Group>

            </Form.Row>

            <Form.Row>

                <Form.Group as={Col} controlId="formGridAuthor">
                    <Form.Control defaultValue="Author" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDiluent">
                    <Form.Control defaultValue="Diluent" />
                </Form.Group>  
            </Form.Row>

        <p>Case Sensitive?</p>
        {[ 'radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
            <Form.Check inline label="YES" type={type} id={`inline-${type}-1`} />
            <Form.Check inline label="NO" type={type} id={`inline-${type}-2`} />     
            </div>
        ))}

        </Form>

        
    </Container>
    );
}
export default Search;