import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './componenets/home/Home';
import PastConversation from './componenets/history/PastConversation';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<PastConversation />} />
      </Routes>
    </div>
  );
}

export default App;
