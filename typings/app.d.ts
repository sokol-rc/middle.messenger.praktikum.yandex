declare global {
    export type Nullable<T> = T | null;

    export type Keys<T extends Record<string, unknown>> = keyof T;
	export type Values<T extends Record<string, unknown>> = T[Keys<T>];
	export interface ValidateInputProps {
		validateType: string;
		value: string;
		[x: string | number | symbol]: any;
	}
	export interface ValidateInput {
		[x: string | number | symbol]: any;
	}
	export interface ValidateInputProps extends ValidateInput {
		validateType: string;
		value: string;
	}
	export interface BlockConstructable<Props = any> {
		componentName: string;
		new (props: Props): Block;
	}

}

export {};
