const METADATA_KEY = '__redux-observable-util__';

export interface NgEpicMetadata<T> {
  propertyName: string;
  type: string;
}

function setNgEpicMetadataEntries<T>(sourceProto: T, entries: NgEpicMetadata<T>[]) {
  const constructor = sourceProto.constructor;
  const meta: Array<NgEpicMetadata<T>> = constructor.hasOwnProperty(METADATA_KEY)
    ? (constructor as any)[METADATA_KEY]
    : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[ METADATA_KEY ];

  Array.prototype.push.apply(meta, entries);
}

export function NgEpic<T>(type: string): MethodDecorator {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const metadata: NgEpicMetadata<T> = { propertyName, type };
    setNgEpicMetadataEntries<T>(target, [metadata]);
  };
}

export function getNgEpicMetadataEntries<T>(sourceProto: T): NgEpicMetadata<T>[] {
  return sourceProto.constructor.hasOwnProperty(METADATA_KEY)
    ? (sourceProto.constructor as any)[METADATA_KEY]
    : [];
}
