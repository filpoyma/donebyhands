export interface IBindingsCard {
  id: number;
  binding_id: string;
  masked_pan: string;
}

export interface IBindingsCardResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IBindingsCard[];
}

export interface IBindingsStatus {
  status: 'fulfilled' | 'pending' | 'rejected';
}
export interface IUnBindCard {
  message: string;
}

export interface IBingCard {
  id: number;
  form_url: string;
  content_type: number;
  payment_error: string;
}
