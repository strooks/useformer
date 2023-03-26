const setNativeValue = (element, value) => {
  const objectDescriptor = Object.getOwnPropertyDescriptor(element, 'value')
  if (!objectDescriptor) {
    element.value = value
    return
  }
  const valueSetter = objectDescriptor.set
  const prototype = Object.getPrototypeOf(element)
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value)
  } else {
    valueSetter.call(element, value)
  }
}

export default setNativeValue
