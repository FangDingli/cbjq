export const obj2url = (data: any, isPrefix?: boolean) => {
  const prefix = isPrefix ? '?' : ''

  const result = []
  for (const key in data) {
    const value = data[key]

    if (['', undefined, null].includes(value)) {
      continue
    }

    if (Array.isArray(value)) {
      value.forEach(item => {
        result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(item))
      })
    } else {
      result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
    }

    return result.length ? prefix + result.join('&') : ''
  }
}
