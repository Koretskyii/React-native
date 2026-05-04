import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      text: string;
      background: string;
      tint: string;
      icon: string;
      tabIconDefault: string;
      tabIconSelected: string;
      card: string;
      primary: string;
      success: string;
    };
  }
}
