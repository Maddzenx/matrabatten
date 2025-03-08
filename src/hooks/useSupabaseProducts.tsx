
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/types";
import { toast } from "@/components/ui/use-toast";

export const useSupabaseProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch products from Supabase ICA table
      const { data, error } = await supabase
        .from('ICA')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Transform Supabase data to match our Product interface
        // Using a unique ID based on name since the ICA table might not have an id column
        const transformedProducts: Product[] = data.map((item) => ({
          id: `ica-${item.name.replace(/\s+/g, '-').toLowerCase()}-${Math.random().toString(36).substring(2, 9)}`,
          image: item.image_url || 'https://assets.icanet.se/t_product_large_v1,f_auto/7310865085313.jpg', // Default image
          name: item.name || 'Product',
          details: item.description || 'No description available',
          currentPrice: `${item.price || 0}:- kr`,
          originalPrice: '',
          store: 'ICA',
          category: 'other'
        }));
        
        console.log('Fetched products from Supabase:', transformedProducts);
        setProducts(transformedProducts);
      }
    } catch (err) {
      console.error('Error fetching products from Supabase:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      
      toast({
        title: "Error loading products",
        description: "Could not load products from Supabase. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refetch = useCallback(async () => {
    try {
      await fetchProducts();
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }, [fetchProducts]);

  return { products, loading, error, refetch };
};
