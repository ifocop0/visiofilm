export interface Product2 {
  id: string;
  inStock: boolean;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}

export interface Product {
  id: string;
  inStock: boolean;
  titre: string;
  description: string;
  realisateurs: string;
  annee: number;
  pays: number;
  prix: number;
  desc_film: string;
  desc_realisateur: string;
  qte: number;
  rating: number;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface LoginData {
  email: string;
  password: string;
}


export interface Cart {
  lines: {[name: string]: CartItem};
  total: number;
  shippingCost: number;
  nbItems: number;
}

export interface CartItem {
  product: Product;
  qty: number;
  itemTotal: number
}
