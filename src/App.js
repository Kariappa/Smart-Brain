import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
const app = new Clarifai.App({
  apiKey: '0c160148564042a19aedc650eedc816f'
 });

const particleOptions =
{
  particles: {
    number: {
      value: 130,
      density: {
        enable: true,
        value_area: 900

      }
    }
  }
}







class App extends React.Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageURL:''
    }

  }


  onInputChange = (event) => {
      this.setState({input :event.target.value})
    
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input})
    app.models
    .predict(
      Clarifai.COLOR_MODEL, 
      this.state.input)
      .then(
    function(response) {
      console.log(response)
    },
    function(err) {
      // there was an error
    }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageURL={this.state.imageURL} />
      </div>
    )
  }
}

export default App;
