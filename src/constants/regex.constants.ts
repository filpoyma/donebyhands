export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const phoneRegex = /(\+7|8)(\d{3})(\d{3})(\d{2})(\d{2})/g;
export const cardPatternsRegex = {
  Visa: /^4/,
  MasterCard: /^5[1-5]/,
  AmericanExpress: /^3[47]/,
  Discover: /^6(?:011|5)/,
};
