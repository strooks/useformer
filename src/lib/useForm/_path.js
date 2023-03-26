const findPath = (elem, form, path = []) => {
  const split = elem.name.split('.')
  if (split.length > 1) {
    return split.slice(0, split.length - 1)
  }
  let parent = elem.parentNode

  while (parent && parent !== form) {
    if (parent.nodeName.toLowerCase() === 'fieldset') {
      if (parent.name) {
        path.unshift(parent.name)
      }
    }
    parent = parent.parentNode
  }
  return path
}

export { findPath }
