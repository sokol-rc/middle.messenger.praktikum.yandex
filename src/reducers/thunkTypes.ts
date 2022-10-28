import { ActionsTypes } from "./actionTypes";

type Dispatch<A extends ActionsTypes> = {
    <T extends A>(action: T, ...extraArgs: any[]): A;
};
export type DispatchThunk = (a: Dispatch<ActionsTypes>) => void;
