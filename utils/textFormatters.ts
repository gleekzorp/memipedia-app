export const formatErrors = (errorList: any) => {
  const errorContent = Object.keys(errorList).map(key => ({
    key: key,
    value: errorList[key]
  }))

  const formatedErrors: Array<any> = errorContent.map(name => {
    return `${name.key}: ${name.value.join(', ')}`
  })

  return formatedErrors.join(", ")
}