import Register from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";

import Unauthorized from "./components/Unauthorized";

import RequireAuth from "./components/RequireAuth";
import Blogs from "./components/Blogs";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./components/Blog";
import Db from "./pages/Db";
import Categories from "./components/Categories";
import CategorieEdit from "./components/CategorieEdit";
import ArticleEdit from "./components/ArticleEdit";
import ArticleAdd from "./components/ArticleAdd";
import PersistentLogin from "./components/PersistentLogin";

const ROLES = {
    ADMIN: "dcac",
    USER: "28c6",
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="signup" element={<Register />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                <Route path="/" element={<Home />}>
                    <Route path="/" element={<Blogs />} />
                    <Route path="articles/:id" element={<Blog />} />
                </Route>

                <Route element={<PersistentLogin />}>
                <Route
                    element={
                        <RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN]} />
                    }
                >
                    <Route path="/dashboard" element={<Db />}>
                        <Route path="articles" element={<Blogs />} />
                        <Route path="articles/:id" element={<Blog />} />
                        <Route
                            path="articles/:id/edit"
                            element={<ArticleEdit />}
                        />
                        <Route
                            path="articles/add"
                            element={<ArticleAdd />}
                        />
                        <Route path="categories" element={<Categories />} />
                        <Route
                            path="categories/:id/edit"
                            element={<CategorieEdit />}
                        />
                    </Route>
                </Route>
                </Route>

                {/* catch all */}
                <Route path="*" element={<h2>missing</h2>} />
            </Route>
        </Routes>
    );
}

export default App;
