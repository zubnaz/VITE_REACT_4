import './App.css'
import CategoryListPage from "./category/list/CategoryListPage.tsx";
import { Route, Routes } from "react-router-dom";
import CategoryCreatePage from "./category/create/CategoryCreatePage.tsx";
import DefaultLayout from './containers/default/DefaultJayout.tsx';
import CategoryEdit from './category/edit/CategoryEdit.tsx';
import DeleteCategory from './category/delete/DeleteCategory.tsx';
import Index from './account/register';
import Login from "./account/login";
import AdminLayout from "./containers/admin/AdminLayout.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<DefaultLayout />}>
          <Route index element={<CategoryListPage />} />
          <Route path={"account"}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Index />} />
            <Route path="exit" element={<DefaultLayout />} />
          </Route>


        </Route>
        <Route path={"/admin"} element={<AdminLayout/>}>
          <Route index element={<CategoryListPage />} />
          <Route path={"category"}>
            <Route path="create" element={<CategoryCreatePage />} />
            <Route path="edit/:id" element={<CategoryEdit />} />
            <Route path="delete/:id" element={<DeleteCategory />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App