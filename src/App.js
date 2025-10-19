import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './componenets/home/Home';
import PastConversation from './componenets/history/PastConversation';
import Conversations from './componenets/conversations/Conversations';
import { AppProvider } from "./AppContext";
import Feedback from './componenets/feedback/Feedback';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<PastConversation />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
