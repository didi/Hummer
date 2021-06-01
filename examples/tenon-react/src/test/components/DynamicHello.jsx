import React from 'react';

class Hello extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      message: 'Hello Tenon!'
    }
    this.startTimer()
  }
  startTimer(){
    let count = 0;
    let timer = setInterval(() => {
      this.setState({
        message: "Hello Tenon " + count 
      })
      count ++
      if(count > 10){
        clearInterval(count)
      }
    }, 1000)
  }

  render(){
    const {message} = this.state

    return (
      <div>
        <text>{message}</text>
      </div>)

  }
}
export default Hello;
