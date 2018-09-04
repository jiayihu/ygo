declare module 'awesomplete' {
  export interface Awesomplete {
    [key: string]: any;
  }

  const awesomplete: {
    new (input: HTMLInputElement, options?: any): Awesomplete;
  };

  export default awesomplete;
}
