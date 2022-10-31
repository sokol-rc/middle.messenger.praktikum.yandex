declare global {
    export type Nullable<T> = T | null;

    export type Keys<T extends Record<string, unknown>> = keyof T;
	export type Values<T extends Record<string, unknown>> = T[Keys<T>];
	export interface ValidateInput {
		[x: string | number | symbol]: any;
	}
	export interface BlockConstructable<Props = any> {
		componentName: string;
		new (props: Props): Block;
	}
	interface Window {
		store: Store<AppState>;
		router: HashRouter;
	  }
	declare module "*.png" {
		const value: string;
		export default value;
	}
	declare module "*.svg" {
		const value: string;
		export default value;
	}
	export type Indexed<T = unknown> = {
		[key in string]: T;
	};
}


export {};
