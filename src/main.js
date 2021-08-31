import App from "./App.js"
import RootContents from "./RootContents.js"

const $target = document.querySelector('#app')

new App({ $target })

const rootcontents = new RootContents({
  $target,
  initialState: {
    "id": 1,
    "title": "노션을 만들자",
    "content": "즐거운 자바스크립트의 세계!",
    "documents": [
      {
        "id": 2,
        "title": "",
        "createdAt": "",
        "updatedAt": ""
      }
    ],
    "createdAt": "",
    "updatedAt": ""
  }
})