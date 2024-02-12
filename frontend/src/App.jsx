import Blogs from "./pages/Blogs";
import CreateNew from "./pages/CreateNewBlog"
import {Routes , Route} from "react-router-dom"
import UpdateBlog from "./pages/UpdateBlog";
function App() {
  
  return (
    <div className="">
        <Routes>
            <Route path="/" element={<Blogs/>}/>
            <Route path="/update/:postId" element={<UpdateBlog/>}/>
            <Route path="/createnew" element={<CreateNew/>}/>
        </Routes>
    </div>
  );
}

export default App;
