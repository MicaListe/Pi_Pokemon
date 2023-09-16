import './App.css';
import Form from "./Componentes/Form"
import Detail from "./Componentes/Detail"
import Home from "./Componentes/Home"
import Landing from "./Componentes/Landing page"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/pokemons" element={<Home/>}></Route>
        <Route path="/pokemons/:id" element={<Detail/>}></Route>
        <Route path="/form" element={<Form/>}></Route>
      </Routes>
    </div>
  );
}
export default App;
