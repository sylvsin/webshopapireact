import axios from "axios";

export const getService = (url: string) => {
  const api = axios.create({
    baseURL: url,
  });
  const getUsers = async() => {
    const customers = await api.get("customers").then (data => (data.data)) 
    return Promise.resolve(customers)
  };

  const getCategories = async() => {
    const categories = await api.get("categories").then (data => (data.data))
    return Promise.resolve(categories);
  };

  const getProducts = async() => {
    const products = await api.get("products").then (data => (data.data))
    return Promise.resolve(products);
  };

  const getProductsCategories = async() => {
    const productcategories = await api.get("productcategories").then (data => (data.data))
    return Promise.resolve(productcategories);
  };

  const getFavorite = async(productId:number, customerId:number) => {
    const favorites = await api.get(`Favorites?productId=${productId}&customerId=${customerId}`).then (data => (data.data)).catch(() => undefined)
    return Promise.resolve(favorites);
  };

  const postFavorite = async(productId:number, customerId:number) => {
    const favorites = await api.post(`Favorites`, {productId, customerId}).then (data => (data.data)).catch(() => undefined)
    return Promise.resolve(favorites);
  };

  const deleteFavorite = async(productId:number, customerId:number) => {
    const favorites = await api.delete(`Favorites?productId=${productId}&customerId=${customerId}`).then (_ => (true)).catch(() => undefined)
    return Promise.resolve(favorites);
  };

  const getCartItems = async(productId:number, customerId:number) => {
    const cartItem = await api.get(`cartproducts?customerId=${customerId}&productId=${productId}`).then (data => (data.data)).catch(() => undefined)
    return Promise.resolve(cartItem);
  };

  const postCartItems = async(ProductId:number, CustomerId:number, Count:number) => {
    const cartItem = await api.post(`cartproducts`, {ProductId, CustomerId, Count}).then (data => (data.data)).catch(() => undefined)
    return Promise.resolve(cartItem);
  };

  const putCartItems = async(ProductId:number, CustomerId:number, Count:number) => {
    const cartItem = await api.put(`cartproducts`, {ProductId, CustomerId, Count}).then (data => (data.data)).catch(() => undefined)
    return Promise.resolve(cartItem);
  };

  const deleteCartItems = async(ProductId:number, CustomerId:number) => {
    const cartItem = await api.delete(`cartproducts?customerId=${CustomerId}&productId=${ProductId}`).then (data => (data.data)).catch(() => undefined)
    return Promise.resolve(cartItem);
  };

  const getProductImages = async() => {
    const productimages = await api.get(`productimages`).then (data => (data.data)).catch(() => undefined)
    return Promise.resolve(productimages);
  };

  return {
    getUsers,
    getCategories,
    getProducts,
    getFavorite,
    deleteFavorite,
    getCartItems,
    getProductsCategories,
    postFavorite,
    postCartItems,
    putCartItems,
    deleteCartItems,
    getProductImages
  };
};

export type Service = ReturnType<typeof getService>;
