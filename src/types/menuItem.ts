export interface Translation {
  id: number;
  meal_id: number;
  locale: string; // "en" | "ar"
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// ✅ Meal object
export interface Meal {
  id: number;
  price: number;
  minimum_quantity: number;
  maximum_quantity: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  translations: Translation[];
}

// ✅ Pagination link object
export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

// ✅ Paginated response
export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// ✅ The actual meals API response
export interface MealsApiResponse {
  status: string; // "success"
  data: PaginatedResponse<Meal>;
}
