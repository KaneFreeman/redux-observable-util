const METADATA_KEY = '__redux-observable-util__';

export interface EpicMetadata<T> {
  propertyName: string;
  type: string;
}

function setEpicMetadataEntries<T>(sourceProto: T, entries: EpicMetadata<T>[]) {
  const constructor = sourceProto.constructor;
  const meta: Array<EpicMetadata<T>> = constructor.hasOwnProperty(METADATA_KEY)
    ? (constructor as any)[METADATA_KEY]
    : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[ METADATA_KEY ];

  Array.prototype.push.apply(meta, entries);
}

export function Epic<T>(type: string): MethodDecorator {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const metadata: EpicMetadata<T> = { propertyName, type };
    setEpicMetadataEntries<T>(target, [metadata]);
  };
}

export function getEpicMetadataEntries<T>(sourceProto: T): EpicMetadata<T>[] {
  return sourceProto.constructor.hasOwnProperty(METADATA_KEY)
    ? (sourceProto.constructor as any)[METADATA_KEY]
    : [];
}
