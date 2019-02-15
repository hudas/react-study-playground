import {ObjectSchema, ValidationError} from "yup";


export const requiredOneOfTest = (schema: ObjectSchema<any>) => {
  return (...propertyNames: string[]): ObjectSchema<any> => {

    return schema.test(
      'requiredOneOf',
      'One of fields is required',
      function (this: any, value: any) {

        const someProvided = propertyNames
          .some((propertyName: string) => !!value[propertyName] && value[propertyName] !== '');

        if (someProvided) {
          return true;
        }

        const allFields = propertyNames.join(' ')

        const fieldErrors: ValidationError[] = propertyNames.map((property) =>
          this.createError({path: property, message: `At least one of fields: ${allFields} is required`})
        );

        return {
          ...this.createError({path: 'contacts', message: 'One of the fields is required'}),
          inner: fieldErrors
        }
      })
  }
};
