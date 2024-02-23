import './App.css'
import CategoryListPage from "./category/list/CategoryListPage.tsx";
import { Route, Routes } from "react-router-dom";
import CategoryCreatePage from "./category/create/CategoryCreatePage.tsx";
import DefaultLayout from './containers/default/DefaultJayout.tsx';
import CategoryEdit from './category/edit/CategoryEdit.tsx';
import DeleteCategory from './category/delete/DeleteCategory.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<DefaultLayout />}>
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