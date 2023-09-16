export function FormDataBuilder(formData: any, data: any, parentKey?: string) {
  if (typeof data === 'object') {
    Object.keys(data).forEach(key => {
      if (key === 'attachment' || key === 'inlineImage') {
        data[key].forEach((attachedObject: any) => {
          formData.append(parentKey, attachedObject.data, attachedObject.name);
        });
      } else {
        FormDataBuilder(
          formData,
          data[key],
          parentKey ? `${parentKey}['${key}']` : key
        );
      }
    });
  } else if (Array.isArray(data)) {
    data.forEach((value: any, index: number) => {
      formData.append(`${parentKey}['${index}']`, value);
    });
  } else {
    formData.append(parentKey, data);
  }
}
