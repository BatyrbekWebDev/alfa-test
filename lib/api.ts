import axios from "axios";
import type { ProductsResponse } from "@/types/product";

const API_BASE_URL = "https://dummyjson.com";

export async function fetchProducts(): Promise<ProductsResponse> {
  try {
    const response = await axios.get<ProductsResponse>(
      `${API_BASE_URL}/products`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products");
    throw error;
  }
}
