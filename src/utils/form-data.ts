export function FormDataBuilder(formData: any, data: any, parentKey?: string) {
  if (typeof data === 'object') {
    Object.keys(data).forEach(key => {
      if (key === 'attachment' || key === 'inlineImage') {
        data[key].forEach((attachedObject: any) => {
          formData.append(
            parentKey ? `${parentKey}['${key}']` : key,
            attachedObject.data,
            attachedObject.name
          );
        });
      } else {
        FormDataBuilder(
          formData,
          data[key],
          parentKey ? `${parentKey}['${key}']` : key
        );
      }
    });
  } else {
    formData.append(parentKey, data);
  }
}
