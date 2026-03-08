export interface SeacolorProxy {
  (text: string): string;
  [style: string]: SeacolorProxy;
  enabled: boolean;
  styles: Set<string>;
}

declare const seacolor: SeacolorProxy;
export default seacolor;
