import 'react-redux';
import { RootState } from ".";

declare module 'react-redux' {
    export function useSelector<TSelected = unknown>(
        selector: (state: RootState) => TSelected,
        equalityFn?: (left: TSelected, right: TSelected) => boolean
    ): TSelected;
}