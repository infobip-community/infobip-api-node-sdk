export function FormDataBuilder(formData: any, data: any, parentKey?: string) {
  if (typeof data === 'object') {
    Object.keys(data).forEach(key => {
      FormDataBuilder(
        formData,
        data[key],
        parentKey ? `${parentKey}['${key}']` : key
      );
    });
  } else {
    formData.append(parentKey, data);
  }
}
