## API Report File for "@lyoyl/s-ray"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public (undocumented)
export interface AttrDefinition<N extends string = string, T = BooleanConstructor | NumberConstructor | StringConstructor, D = ExtractAttrDefault<T>, P = HyphenToCamelCase<N>> {
    // (undocumented)
    default: D;
    // (undocumented)
    name: N;
    // (undocumented)
    propertyName: P;
    // (undocumented)
    type: T;
}

// @public (undocumented)
export interface ComponentOptions<AttrDefinitions extends AttrDefinition[], PropDefinitions extends PropDefinition[]> {
    // (undocumented)
    attrs?: AttrDefinitions;
    // (undocumented)
    name: string;
    // (undocumented)
    props?: PropDefinitions;
    // (undocumented)
    setup: (hostElement: ElementInstance<AttrDefinitions, PropDefinitions>) => SetupResult;
    // (undocumented)
    styles?: CSSStyleSheet[];
}

// @public (undocumented)
export function computed<T>(getter: () => T): ComputedRef<T>;

// @public (undocumented)
export interface ComputedRef<T> {
    // (undocumented)
    __isComputed: true;
    // (undocumented)
    readonly value: T;
}

// @public (undocumented)
export function css(strings: TemplateStringsArray, ...values: unknown[]): CSSStyleSheet;

// @public (undocumented)
export function defineBooleanAttr<S extends string>(name: S, defaultValue: boolean): AttrDefinition<S, BooleanConstructor>;

// @public (undocumented)
export function defineElement<AttrDefinitions extends AttrDefinition[], PropDefinitions extends PropDefinition[]>(options: ComponentOptions<AttrDefinitions, PropDefinitions>): ElementConstructor<AttrDefinitions, PropDefinitions>;

// @public (undocumented)
export function defineNumberAttr<S extends string>(name: S, defaultValue: number): AttrDefinition<S, NumberConstructor>;

// @public (undocumented)
export function defineProperty<T, N extends string>(name: N, defaultValue?: T): PropDefinition<N, T>;

// @public (undocumented)
export function defineStringAttr<S extends string>(name: S, defaultValue: string): AttrDefinition<S, StringConstructor>;

// Warning: (ae-forgotten-export) The symbol "DomRef" needs to be exported by the entry point index.d.ts
//
// @public (undocumented)
export function domRef<T extends Element>(): DomRef<T>;

// Warning: (ae-forgotten-export) The symbol "FunctionInterpolator" needs to be exported by the entry point index.d.ts
//
// @public (undocumented)
export type DynamicInterpolators = FunctionInterpolator | Template | DomRef;

// @public (undocumented)
export type ElementConstructor<AttrDefinitions extends AttrDefinition[], PropDefinitions extends PropDefinition[]> = {
    observedAttributes: ExtractAttrNames<AttrDefinitions>[];
    new (): SRayElement<AttrDefinitions, PropDefinitions> & ExtractPropertyFromAttrDefinitions<AttrDefinitions> & ExtractPropertiesFromPropDefinitions<PropDefinitions>;
};

// @public (undocumented)
export type ElementInstance<AttrDefinitions extends AttrDefinition[], PropDefinitions extends PropDefinition[]> = InstanceType<ElementConstructor<AttrDefinitions, PropDefinitions>>;

// @public (undocumented)
export type ExtractAttrDefault<T> = T extends BooleanConstructor ? boolean : T extends NumberConstructor ? number : T extends StringConstructor ? string : never;

// @public (undocumented)
export type ExtractAttrName<AttrD> = AttrD extends AttrDefinition<infer N, any, any, any> ? N : never;

// @public (undocumented)
export type ExtractAttrNames<AttrDefinitions> = AttrDefinitions extends [infer AttrD, ...infer Rest] ? ExtractAttrName<AttrD> | ExtractAttrNames<Rest> : never;

// @public (undocumented)
export type ExtractPropertiesFromPropDefinition<PropDefinition> = PropDefinition extends {
    name: infer N;
    default?: infer D;
} ? N extends string ? {
    [K in N]: D;
} : never : never;

// @public (undocumented)
export type ExtractPropertiesFromPropDefinitions<PropDefinitions> = PropDefinitions extends [
infer PropDefinition,
...infer Rest
] ? ExtractPropertiesFromPropDefinition<PropDefinition> & ExtractPropertiesFromPropDefinitions<Rest> : {};

// @public (undocumented)
export type ExtractPropertyFromAttrDefinition<AttrD> = AttrD extends AttrDefinition<infer N, infer T, infer D, infer P> ? P extends string ? {
    [K in P]: D;
} : never : never;

// @public (undocumented)
export type ExtractPropertyFromAttrDefinitions<AttrDefinitions> = AttrDefinitions extends [infer AttrD, ...infer Rest] ? ExtractPropertyFromAttrDefinition<AttrD> & ExtractPropertyFromAttrDefinitions<Rest> : {};

// @public (undocumented)
export function html(strings: TemplateStringsArray, ...values: unknown[]): Template;

// Warning: (ae-forgotten-export) The symbol "TemplateKey" needs to be exported by the entry point index.d.ts
//
// @public (undocumented)
export function html(key: TemplateKey): (strings: TemplateStringsArray, ...values: unknown[]) => Template;

// @public (undocumented)
export type HyphenToCamelCase<S extends string> = S extends `${infer P1}-${infer P2}${infer P3}` ? `${Lowercase<P1>}${Uppercase<P2>}${HyphenToCamelCase<P3>}` : S;

// @public (undocumented)
export function nextTick(): Promise<void>;

// @public (undocumented)
export function onConnected(cb: CallableFunction): void;

// @public (undocumented)
export function onDisconnected(cb: CallableFunction): void;

// @public (undocumented)
export type OnInvalidateFn = (cb: CallableFunction) => void;

// @public (undocumented)
export enum Priority {
    // (undocumented)
    High = "high",
    // (undocumented)
    Immediate = "immediate",
    // (undocumented)
    Low = "low",
    // (undocumented)
    Middle = "middle"
}

// @public (undocumented)
export interface PropDefinition<N extends string = string, T extends any = any> {
    // (undocumented)
    default?: T;
    // (undocumented)
    name: N;
}

// @public (undocumented)
export function queueTask(task: CallableFunction, priority?: Priority): void;

// @public (undocumented)
export class Ref<T = unknown> {
    constructor(value: T);
    // (undocumented)
    get value(): T;
    set value(newValue: T);
}

// @public (undocumented)
export function ref<T = unknown>(value: T): Ref<T>;

// @public (undocumented)
export interface SetupResult {
    // (undocumented)
    template: Template;
}

// @public (undocumented)
export class SRayElement<AttrDefinitions extends AttrDefinition[], PropDefinitions extends PropDefinition[]> extends SRayHTMLElement {
    // (undocumented)
    $emit(event: string, detail?: any): void;
    constructor(options: ComponentOptions<AttrDefinitions, PropDefinitions>);
    // (undocumented)
    [key: string]: any;
    // (undocumented)
    addConnectedCallback(cb: CallableFunction): void;
    // (undocumented)
    addDisconnectedCallback(cb: CallableFunction): void;
    // (undocumented)
    attributeChangedCallback<K extends keyof ElementInstance<AttrDefinitions, PropDefinitions>, V extends ElementInstance<AttrDefinitions, PropDefinitions>[K]>(this: ElementInstance<AttrDefinitions, PropDefinitions>, name: string, oldValue: string | null, newValue: string | null): void;
    // (undocumented)
    connectedCallback(this: ElementInstance<AttrDefinitions, PropDefinitions>): void;
    // (undocumented)
    disconnectedCallback(): void;
    // (undocumented)
    internals: ElementInternals;
    // (undocumented)
    options: ComponentOptions<AttrDefinitions, PropDefinitions>;
    // (undocumented)
    registerCleanup(cleanup: CallableFunction): void;
    // (undocumented)
    toString(): string;
}

// @public (undocumented)
export const SRayHTMLElement: typeof HTMLElement;

// @public (undocumented)
export class Template {
    constructor(originalDoc: DocumentFragment, dynamicPartToGetterMap: Map<string, DynamicInterpolators>);
    // (undocumented)
    adoptGettersFrom(other: Template): void;
    // (undocumented)
    get children(): Set<Template>;
    clone(): Template;
    // (undocumented)
    cloneIfInUse(): Template;
    // (undocumented)
    get dynamicPartToGetterMap(): Map<string, DynamicInterpolators>;
    // (undocumented)
    hydrate(childNodes: ChildNode[]): void;
    // (undocumented)
    get isInitialized(): boolean;
    get isInUse(): boolean;
    mountTo(parentTemplate: Template, anchorNode: Node | null): void;
    // (undocumented)
    mountTo(parent: Node): void;
    // (undocumented)
    moveToAfter(tpl: Template): void;
    // (undocumented)
    moveToBefore(tpl: Template): void;
    // (undocumented)
    get originalDoc(): DocumentFragment;
    // (undocumented)
    get parent(): Template | null;
    sameAs(other: Template): boolean;
    // (undocumented)
    setKey(key: TemplateKey): void;
    // (undocumented)
    strictSameAs(other: Template): boolean | "" | 0 | null;
    // (undocumented)
    toString(): string;
    unmount(): void;
    // (undocumented)
    update(dynamicPartSpecifier?: string): void;
}

// @public (undocumented)
export const unsafeHtml: (strings: TemplateStringsArray, ...values: unknown[]) => Template;

// @public (undocumented)
export type UnwatchFn = () => void;

// Warning: (ae-forgotten-export) The symbol "WatchOptions" needs to be exported by the entry point index.d.ts
//
// @public (undocumented)
export function watch<T extends ComputedRef<any>, V = T extends ComputedRef<infer R> ? R : never>(computed: T, callback: WatchCallback<V>, options?: WatchOptions): UnwatchFn;

// @public (undocumented)
export function watch<T extends Ref<any>, V = T extends Ref<infer R> ? R : never>(ref: T, callback: WatchCallback<V>, options?: WatchOptions): UnwatchFn;

// @public (undocumented)
export function watch<Getter extends (...args: any[]) => any, R = ReturnType<Getter>>(getter: Getter, callback: WatchCallback<R>, options?: WatchOptions): UnwatchFn;

// @public (undocumented)
export type WatchCallback<V> = (newValue: V, oldValue: V | null, onInvalidate: OnInvalidateFn) => void;

// (No @packageDocumentation comment for this package)

```
