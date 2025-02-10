const buttonSizes = ['M', 'L'] as const;
export type TButtonSizes = (typeof buttonSizes)[number];

const buttonContainerSizes = {
  XS: 24,
  S: 32,
  M: 40,
  L: 48,
  XL: 56,
  XXL: 64,
};

const buttonIconSizes = {
  XS: 12,
  S: 16,
  M: 20,
  L: 24,
  XL: 28,
  XXL: 32,
};

const iconButtonContainerSizes = {
  S: buttonContainerSizes.M,
  M: buttonContainerSizes.L,
};

export { iconButtonContainerSizes, buttonSizes, buttonContainerSizes, buttonIconSizes };
