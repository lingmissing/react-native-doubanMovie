export function Fetch(url) {
  const defer = new Promise((resolve, reject) => {
    fetch(`https://api.douban.com/v2/movie/${url}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        resolve(data) 
      })
      .catch(error => {
        //捕获异常
        console.log(error.msg)
        reject() 
      })
  })
  return defer
}