export const myValidationMethodTest = (context: any, args: any) => {
  console.log(context);

  return context.test(
    'myValidationMethod',
    'lalalallalalal',
    function(this: any, value: any) {
      console.log('testingg?');
      const { path } = this;

      return this.createError({ path, message: 'lalalalalalalalal' });
    })
};
