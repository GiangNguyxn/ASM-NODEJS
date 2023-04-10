import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getLimit,
  updateProduct,
} from "./api/product";
import "./App.css";
import AdminLayout from "./components/layout/AdminLayout";
import RootLayout from "./components/layout/RootLayout";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import AddProductPage from "./pages/admin/product/AddProductPage";
import UpdateProductPage from "./pages/admin/product/UpdateProductPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/productDetail/ProductDetailPage";
import ProductPage from "./pages/productPage/ProductPage";
import {
  addCategory,
  getAllCate,
  removeCate,
  updateCategory,
} from "./api/category";
import ProductManagementPage from "./pages/admin/product/ProductManagementPage";
import CategoriesPage from "./pages/admin/categories/CategoriesPage";
import AddCategoryPage from "./pages/admin/categories/AddCategoryPage";
import UpdateCategoryPage from "./pages/admin/categories/UpdateCategoryPage";
function App() {
  const [products, setProducts] = useState([]);
  const [productsLimit, setProductsLimit] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllCate();

        setCategories(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllProducts();

        setProducts(data.data.docs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getLimit();

        setProductsLimit(data.data.docs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const onHandleRemove = async (id: number | string) => {
    try {
      const { data } = await deleteProduct(id);
      console.log(data);

      setProducts(products.filter((item) => item._id != id));
    } catch (error) {
      console.log(error);
    }
  };
  const onHandleAdd = async (product: any) => {
    try {
      const { data } = await createProduct(product).then(() =>
        getAllProducts().then(({ data }) => setProducts(data.data.docs))
      );
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const onHandleUpdate = async (product: any) => {
    try {
      await updateProduct(product).then(() =>
        getAllProducts().then(({ data }) => setProducts(data.data.docs))
      );
    } catch (error) {
      console.log(error);
    }
  };
  const onHandleCateRemove = async (id) => {
    try {
      const { data } = removeCate(id);
      setCategories(categories.filter((item) => item._id != id));

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onHandleCateAdd = async (category) => {
    try {
      await addCategory(category).then(() =>
        getAllCate().then(({ data }) => setCategories(data.data))
      );
    } catch (error) {
      console.log(error);
    }
  };
  const onHandleCateUpdate = async (category) => {
    try {
      await updateCategory(category).then(() =>
        getAllCate().then(({ data }) => setCategories(data.data))
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage products={productsLimit} />} />
          <Route
            path="products"
            element={
              <ProductPage categories={categories} products={products} />
            }
          />

          <Route
            path="products/:id"
            element={
              <ProductDetailPage products={products} categories={categories} />
            }
          />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="products"
            element={
              <ProductManagementPage
                products={products}
                categories={categories}
                onRemove={onHandleRemove}
              />
            }
          />

          <Route
            path="products/add"
            element={
              <AddProductPage onAdd={onHandleAdd} categories={categories} />
            }
          />
          <Route
            path="products/:id/edit"
            element={
              <UpdateProductPage
                products={products}
                onUpdate={onHandleUpdate}
                categories={categories}
              />
            }
          />
          <Route
            path="categories"
            element={
              <CategoriesPage
                categories={categories}
                onRemove={onHandleCateRemove}
              />
            }
          />
          <Route
            path="category/add"
            element={<AddCategoryPage onCateAdd={onHandleCateAdd} />}
          />
          <Route
            path="category/:id/edit"
            element={
              <UpdateCategoryPage
                categories={categories}
                onUpdate={onHandleCateUpdate}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
