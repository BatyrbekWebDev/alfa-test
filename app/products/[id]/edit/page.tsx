import EditProductClient from './EditProductClient';
import { fetchProducts } from '@/lib/api';

export async function generateStaticParams() {
  try {
    const data = await fetchProducts();
    return data.products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default function EditProductPage() {
  return <EditProductClient />;
}
