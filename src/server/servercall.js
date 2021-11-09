const shopitems = (url) => fetch(url).then(response => response.json())

export default shopitems