export interface IResponsiveHelper {
  hp(elHeight: number): number;
  wp(elWidth: number): number;
  ms(mScale: number): number;
}

export type TDeviceDimensions = {
  width: number;
  height: number;
};
