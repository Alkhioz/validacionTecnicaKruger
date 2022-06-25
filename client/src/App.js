import './App.css';
import IconButton from './components/iconbutton/IconButton.js';

function App() {
  return (
    <div className="App">
      <header className="AppHeader">
        <h1>This is the h1 header</h1>
        <h2>This is the h2 header</h2>
        <h3>This is the h3 header</h3>
        <h4>This is the h4 header</h4>
        <h5>This is the h5 header</h5>
      </header>
      <p>lorem ipsum dolor sit amet, consectetur adip <i className="fa fa-car"></i></p>
      <IconButton 
        id="uno"
        onclick={(evt)=>{evt.preventDefault(); console.log("it works");}}
        name="Enviar Carro"
        icon="fa fa-car"
        type="IconButton"
      />
      <IconButton 
        id="dos"
        onclick={(evt)=>{evt.preventDefault(); console.log("it works");}}
        name="Enviar Carro"
        icon="fa fa-car"
        type="IconButtonAlter"
      />
    </div>
  );
}

export default App;
