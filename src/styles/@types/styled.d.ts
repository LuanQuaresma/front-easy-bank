import 'styled-components';
import { defaultTheme } from '../themes/default';


type ThemeType = typeof defaultTheme

declare module 'style-components' {
    export interface DefaultTheme extends ThemeType {}
}