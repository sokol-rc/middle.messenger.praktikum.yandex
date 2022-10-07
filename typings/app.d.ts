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
	declare module "*.png" {
		const value: any;
		export default value;
	}
	declare module "*.svg" {
		const value: any;
		export default value;
	 }
}


export {};
