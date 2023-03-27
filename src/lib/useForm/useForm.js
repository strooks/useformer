import { useState, useEffect, useRef } from 'react'
import fillForm from './_fill-form'
import { findPath } from './_path'

const useForm = (formRef, initialState = {}, options = {}) => {
  const [theForm, setForm] = useState(null)
  const [initialized, setInitialized] = useState(false)
  const [filledState, setFilledState] = useState(false)
  const [state, setState] = useState(initialState)
  const stateRef = useRef(initialState)

  const { persist, debug } = options

  if (!!persist && typeof localStorage !== 'undefined') {
    const lsState = localStorage.getItem(persist)
    if (lsState) {
      initialState = JSON.parse(lsState)
    }
  }

  //fillForm
  useEffect(() => {
    if (theForm && !initialized && typeof stateRef.current === 'object') {
      fillForm(theForm, stateRef.current)
      setInitialized(true)
    }
  }, [theForm, initialState, initialized])

  useEffect(() => {
    if (!filledState && initialized) {
      const filledState = JSON.parse(JSON.stringify(initialState))
      const { current: formElement } = formRef
      const elements = Array.from(formElement.querySelectorAll('*'))
      elements.forEach((elem) => {
        if (!elem.name || elem.nodeName === 'FIELDSET') return
        const path = elem.name.split('.')
        const name = path.pop()
        let target = filledState
        path.forEach((prop) => {
          target[prop] = target[prop] || {}
          target = target[prop]
        })
        target[name] = typeof target[name] === 'undefined' ? null : target[name]
      })
      setFilledState(filledState)
      if (debug) setState(filledState)
      stateRef.current = filledState
    }
  }, [formRef, setFilledState, filledState, initialized])

  const update = (param) => {
    let newState
    if (typeof param === 'function') {
      newState = param(stateRef.current)
    } else {
      newState = param
    }
    fillForm(formRef.current, newState)
    stateRef.current = newState
    if (debug) setState(newState)
    if (!!persist && typeof localStorage !== 'undefined') {
      localStorage.setItem(persist, JSON.stringify(newState))
    }
  }

  const onChange = (ev) => {
    ev.persist && ev.persist()
    const theForm = formRef.current

    const target = ev.target
    const { name, value, dataset = {} } = target
    if (!name) return
    const type = dataset.type || target.type
    const path = findPath(target, theForm)

    const newState = { ...stateRef.current }
    let targetObj = newState
    for (const prop of path) {
      targetObj[prop] = targetObj[prop] || {}
      targetObj = targetObj[prop]
    }

    const theName = name.split('.').at(-1)

    const isTrueFalse =
      target.type === 'radio' &&
      theForm[name].length === 2 &&
      Array.from(theForm[name]).every((el) => ['true', 'false'].includes(el.value))

    if (isTrueFalse) {
      targetObj[theName] = value === 'true' ? true : value === 'false' ? false : null
    } else if (target.type === 'checkbox') {
      const { checked } = target
      const count = theForm[name].length
      if (count > 1) {
        targetObj[theName] = [...theForm[name]].filter((c) => c.checked).map((c) => c.value)
      } else {
        targetObj[theName] = checked
      }
    } else if (target.nodeName === 'SELECT' && target.multiple) {
      targetObj[theName] = [...target.options].filter((o) => o.selected).map((o) => o.value)
    } else {
      if (['number', 'range'].includes(type)) {
        if (value === '') {
          targetObj[theName] = null
        } else {
          targetObj[theName] = +value
        }
      } else {
        targetObj[theName] = value
      }
    }

    if (!!persist && typeof localStorage !== 'undefined') {
      localStorage.setItem(persist, JSON.stringify(newState))
    }
    stateRef.current = newState
    if (debug) setState(newState)
  }

  const clear = () => {
    if (!!persist && typeof localStorage !== 'undefined') {
      localStorage.removeItem(persist)
    }
    stateRef.current = {}
    if (debug) setState({})
    theForm.reset()
  }

  useEffect(() => {
    const formElement = formRef.current
    const onReset = () => {
      stateRef.current = {}
      if (debug) setState({})
      if (!!persist && typeof localStorage !== 'undefined') {
        localStorage.removeItem(persist)
      }
    }
    const onSubmit = (ev) => {
      ev.preventDefault()
    }

    setForm(formElement)
    formElement.addEventListener('input', onChange)
    formElement.addEventListener('reset', onReset)
    formElement.addEventListener('submit', onSubmit)
    return () => {
      formElement.removeEventListener('input', onChange)
      formElement.removeEventListener('reset', onReset)
      formElement.removeEventListener('submit', onSubmit)
    }
  }, [formRef, persist])

  return [debug ? () => ({ ...state }) : () => stateRef.current, update, clear]
}

export default useForm
