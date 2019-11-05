import React, { Component } from 'react';
import { Container, Header, Content,Text } from 'native-base';
export default class getData extends Component {
constructor() {
    super();
    this.state = {
      newsList: []
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
 fetchData() {
     fetch(
     "caae700d.ngrok.io/login",{method:"POST"}
    ).then((res) => {
        let data = res.json();
        return data

    });
    
    //this.setState({ newsList: data });
  }
  render() {
    return (
      <Container>
      <Text>{JSON.stringify(this.fetchData())}</Text>
      </Container>
    );
  }
}