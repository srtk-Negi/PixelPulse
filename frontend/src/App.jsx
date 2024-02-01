import DataComponentOne from "./DataComponentOne";
import DataComponentTwo from "./DataComponentTwo";
import HomeComponent from "./HomeComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={HomeComponent} />
                <Route path="/data1" Component={DataComponentOne} />
                <Route path="/data2" Component={DataComponentTwo} />
            </Routes>
        </Router>
    );
}

export default App;
