import { create } from "zustand";
import type { Product } from "@/types/product";
import { fetchProducts } from "@/lib/api";

interface ProductsStore {
  products: Product[];
  likedIds: Set<number>;
  filter: "all" | "favorites";
  searchQuery: string;
  categoryFilter: string;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  loadProducts: () => Promise<void>;
  toggleLike: (id: number) => void;
  deleteProduct: (id: number) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setCurrentPage: (page: number) => void;
  setFilter: (filter: "all" | "favorites") => void;
  getFilteredProducts: () => Product[];
  getPaginatedProducts: () => Product[];
  getCategories: () => string[];
  getTotalPages: () => number;
  isLiked: (id: number) => boolean;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  likedIds: new Set<number>(),
  filter: "all",
  searchQuery: "",
  categoryFilter: "",
  isLoading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 12,

  loadProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchProducts();
      set({ products: data.products, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to load products",
        isLoading: false,
      });
    }
  },

  toggleLike: (id: number) => {
    const { likedIds } = get();
    const newLikedIds = new Set(likedIds);

    if (newLikedIds.has(id)) {
      newLikedIds.delete(id);
    } else {
      newLikedIds.add(id);
    }
    set({ likedIds: newLikedIds });
  },

  deleteProduct: (id: number) => {
    const { products } = get();
    set({ products: products.filter((p) => p.id !== id) });
  },

  addProduct: (productData: Omit<Product, 'id'>) => {
    const { products } = get();
    const newId = products.length > 0 
      ? Math.max(...products.map(p => p.id)) + 1 
      : 1;
    
    const newProduct: Product = {
      ...productData,
      id: newId,
    };
    
    set({ products: [...products, newProduct], currentPage: 1 });
  },

  updateProduct: (id: number, productData: Partial<Product>) => {
    const { products } = get();
    set({
      products: products.map((p) =>
        p.id === id ? { ...p, ...productData } : p
      ),
    });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query, currentPage: 1 });
  },

  setCategoryFilter: (category: string) => {
    set({ categoryFilter: category, currentPage: 1 });
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  setFilter: (filter: "all" | "favorites") => {
    set({ filter, currentPage: 1 });
  },

  getFilteredProducts: () => {
    const { products, likedIds, filter, searchQuery, categoryFilter } = get();
    let filtered = products;

    if (filter === "favorites") {
      filtered = filtered.filter((p) => likedIds.has(p.id));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    return filtered;
  },

  getPaginatedProducts: () => {
    const filtered = get().getFilteredProducts();
    const { currentPage, itemsPerPage } = get();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  },

  getCategories: () => {
    const { products } = get();
    const categories = new Set(products.map((p) => p.category));
    return Array.from(categories).sort();
  },

  getTotalPages: () => {
    const filtered = get().getFilteredProducts();
    const { itemsPerPage } = get();
    return Math.ceil(filtered.length / itemsPerPage);
  },

  isLiked: (id: number) => {
    return get().likedIds.has(id);
  },
}));
