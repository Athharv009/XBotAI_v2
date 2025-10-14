import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './componenets/home/Home';
import PastConversation from './componenets/history/PastConversation';
import Conversations from './componenets/conversations/Conversations';
import { AppProvider } from "./AppContext";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<PastConversation />} />
        <Route path="/conversations" element={<Conversations />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
