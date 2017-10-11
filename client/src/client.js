const getFoods = (query) => {
  return fetch(`api/food?q=${query}`, {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => {
    return checkStatus(res)
  }).then(res => {
    return res.json()
  })
}
          
function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    var err = new Error(res.statusText)
    err.response = res
    throw err
  }
}

const client = {
  getFoods,
}

export default client