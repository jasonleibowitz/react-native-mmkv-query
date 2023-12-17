import camelCase from "lodash/camelCase";
import isArray from "lodash/isArray";
import isObject from "lodash/isObject";
import snakeCase from "lodash/snakeCase";

type StringTransformerFn = (s: string) => string;

const escapeCamelIfValidUUID = (str: string, fn: StringTransformerFn) => {
  // Regular expression to check if string is a valid UUID
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  if (regexExp.test(str) === true) {
    return str;
  }
  return fn(str);
};

const buildNestedKeyTransformer = (fn: StringTransformerFn) => {
  function transform(o: any): any {
    if (o instanceof FormData) {
      const newData = new FormData();
      // @ts-expect-error
      [...o.keys()].forEach((key: string) => {
        // @ts-expect-error strict-null-check TODO resolve
        newData.set(transform(key), o.get(key));
      });
      return newData;
    }

    if (isArray(o)) {
      return o.map(transform);
    }
    if (isObject(o)) {
      return Object.fromEntries(
        Object.entries(o).map(([key, value]) => [
          escapeCamelIfValidUUID(key, fn),
          transform(value),
        ]),
      );
    }
    return o;
  }

  return transform;
};

export const toSnakeCase = buildNestedKeyTransformer(snakeCase);
export const toCamelCase = buildNestedKeyTransformer(camelCase);
