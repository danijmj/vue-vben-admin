import { type ComputedRef, type MaybeRef } from 'vue';

/**
 * Deeply recurse all properties as optional
 */
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Deeply recurse all properties as readonly
 */
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Asynchronous function of any type
 */

type AnyPromiseFunction<T extends any[] = any[], R = void> = (
  ...arg: T
) => PromiseLike<R>;

/**
 * Normal function of any type
 */
type AnyNormalFunction<T extends any[] = any[], R = void> = (...arg: T) => R;

/**
 * Function of any type
 */
type AnyFunction<T extends any[] = any[], R = void> =
  | AnyNormalFunction<T, R>
  | AnyPromiseFunction<T, R>;

/**
 * T | null wrapper
 */
type Nullable<T> = null | T;

/**
 * T | Not null wrapper
 */
type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * String type object
 */
type Recordable<T> = Record<string, T>;

/**
 * String type object (readonly)
 */
interface ReadonlyRecordable<T = any> {
  readonly [key: string]: T;
}

/**
 * setTimeout return type
 */
type TimeoutHandle = ReturnType<typeof setTimeout>;

/**
 * setInterval return type
 */
type IntervalHandle = ReturnType<typeof setInterval>;

/**
 * Maybe it is a computed ref, or a getter function
 */
type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

/**
 * Maybe it is a ref, or a normal value, or a getter function
 */
type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

type Merge<O extends object, T extends object> = {
  [K in keyof O | keyof T]: K extends keyof T
    ? T[K]
    : K extends keyof O
      ? O[K]
      : never;
};

/**
 * T = [
 *  { name: string; age: number; },
 *  { sex: 'male' | 'female'; age: string }
 * ]
 * =>
 * MergeAll<T> = {
 *  name: string;
 *  sex: 'male' | 'female';
 *  age: string
 * }
 */
type MergeAll<
  T extends object[],
  R extends object = Record<string, any>,
> = T extends [infer F extends object, ...infer Rest extends object[]]
  ? MergeAll<Rest, Merge<R, F>>
  : R;

type EmitType = (name: Name, ...args: any[]) => void;

export type {
  AnyFunction,
  AnyNormalFunction,
  AnyPromiseFunction,
  DeepPartial,
  DeepReadonly,
  EmitType,
  IntervalHandle,
  MaybeComputedRef,
  MaybeReadonlyRef,
  Merge,
  MergeAll,
  NonNullable,
  Nullable,
  ReadonlyRecordable,
  Recordable,
  TimeoutHandle,
};
