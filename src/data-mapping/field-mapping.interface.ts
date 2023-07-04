export interface FieldMapping<T, U> {
    idField: keyof T;
    map: Map<T[keyof T], U>;
    __all__: boolean;
    selectedFields: (keyof U)[];
}