import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from './pages/Register'
function App() {

  return (
    
      <Router >
        <Routes>
          <Route path="/" element={<Layout>
            <p>Home Page</p>
          </Layout>}/>
          <Route path="/search" element={<p>Search page</p>}/>
          <Route path="/register" element={
          <Layout>
            <Register/>
            </Layout>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </Router>
    
  )
}

export default App
