import "./App.css";
import TextEditor from "./components/TextEditor";
import { v4 as uuidV4 } from "uuid";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate from="/" to={`/documents/${uuidV4()}`} replace={true} />
            }
          ></Route>
          <Route path="/documents/:id" element={<TextEditor />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
