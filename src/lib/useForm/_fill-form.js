import setNativeValue from './_set-native-value'

const fillForm = (theForm, state, path = []) => {
  Object.entries(state).forEach(([key, val]) => {
    const name = [...path, key].join('.')
    const elems = Array.from(document.getElementsByName(name)).filter(
      (elem) => elem.closest('form') === theForm,
    )
    const [elem] = elems

    if (Array.isArray(state[key])) {
      if (elems.every((elem) => elem.type === 'checkbox')) {
        elems.forEach((elem) => (elem.checked = val.includes(elem.value)))
      }
      if (elems.length === 1) {
        if (elem.nodeName.toUpperCase() === 'SELECT') {
          const options = Array.from(elem.querySelectorAll('option'))
          options.forEach((opt) => (opt.selected = val.includes(opt.value)))
        }
      }
    }

    if (elem && elem.type === 'date') {
      setNativeValue(elem, dateFormat(val))
      return
    }

    if (typeof state[key] === 'object') {
      return fillForm(theForm, state[key], [...path, key])
    }

    if (typeof val === 'boolean') {
      if (elems.length === 1) {
        if (elem.type === 'checkbox') {
          elem.checked = val
        }
      }
    }

    if (elems.length === 1) {
      setNativeValue(elem, val)
      return
    }

    if (elems.every((elem) => elem.type === 'radio')) {
      elems.forEach((elem) => (elem.checked = val.toString() === elem.value))
    }
  })
}

export default fillForm

const dateFormat = (v) => new Date(v).toISOString().slice(0, 10)
