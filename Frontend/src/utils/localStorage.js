export const addJWTToLocalStorage = (data) => {
  localStorage.setItem('data_access', JSON.stringify(data))
}

export const removeJWTToLocalStorage = () => {
  localStorage.removeItem('data_access')
}

export const getJWTFromLocalStorage = () => {
  const result = localStorage.getItem('data_access')
  return !result ? null : JSON.parse(result)
}
