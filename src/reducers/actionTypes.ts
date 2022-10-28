import { actions} from './authReducer';

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;

export type ActionsTypes = ReturnType<PropertiesType<typeof actions>>;
