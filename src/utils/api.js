const API_END_POINT = 'https://kdt.roto.codes'

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'grighth12',
      },
      ...options,
    })

    if (res.ok) {
      return await res.json()
    }
  } catch (e) {
    console.log(e)
  }
}

export const requestGET = (url, options = {}) => {
  return request(url, options)
}

export const requestPOST = (url, body, options = {}) => {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  })
}

export const requestPUT = (url, body, options = {}) => {
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...options,
  })
}

export const requestDELETE = (url, options = {}) => {
  return request(url, {
    method: 'DELETE',
    ...options,
  })
}
