import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/common/Header';
import ProductPage from './pages/ProductPage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Header />
                <ProductPage />
            </div>
        </Router>
    );
}

export default App;
