
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

// Pagination and filtering types
export type PaginationOptions = {
  page: number;
  perPage: number;
  searchTerm?: string;
  searchFields?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type PaginatedResult<T> = {
  data: T[];
  count: number;
  page: number;
  perPage: number;
  totalPages: number;
};

// Generic function for paginated fetches
export async function fetchPaginated<T>(
  table: keyof Database["public"]["Tables"],
  options: PaginationOptions,
  additionalFilter?: (query: any) => any
): Promise<PaginatedResult<T>> {
  const { page, perPage, searchTerm, searchFields, sortBy, sortOrder } = options;
  
  // Calculate range for pagination
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  
  // Start building query
  let query = supabase.from(table).select("*", { count: "exact" });
  
  // Apply search if provided
  if (searchTerm && searchFields && searchFields.length > 0) {
    const searchFilters = searchFields.map(field => `${field}.ilike.%${searchTerm}%`);
    query = query.or(searchFilters.join(","));
  }
  
  // Apply additional filters if provided
  if (additionalFilter) {
    query = additionalFilter(query);
  }
  
  // Apply sorting
  if (sortBy) {
    query = query.order(sortBy, { ascending: sortOrder === "asc" });
  } else {
    // Default sort by created_at
    query = query.order("created_at", { ascending: false });
  }
  
  // Apply pagination
  query = query.range(from, to);
  
  // Execute query
  const { data, error, count } = await query;
  
  if (error) {
    toast.error("Error fetching data", {
      description: error.message,
    });
    throw error;
  }
  
  return {
    data: data as T[],
    count: count || 0,
    page,
    perPage,
    totalPages: count ? Math.ceil(count / perPage) : 0,
  };
}

// Generic function to upload an image
export async function uploadImage(imageFile: File): Promise<any> {
  try {
    // Convert the file to base64
    const base64Image = await fileToBase64(imageFile);
    
    // Call the Supabase Edge Function to upload to Cloudinary
    const { data, error } = await supabase.functions.invoke("upload-image", {
      body: { image: base64Image },
    });
    
    if (error) {
      toast.error("Error uploading image", {
        description: error.message,
      });
      throw error;
    }
    
    return data.image;
  } catch (error: any) {
    toast.error("Error uploading image", {
      description: error.message,
    });
    throw error;
  }
}

// Helper to convert file to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
