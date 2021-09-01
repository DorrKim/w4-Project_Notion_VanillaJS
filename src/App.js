import NavigationBar from './NavigationBar.js'
import EditPage from './EditPage.js'
import { RouterUtils } from './utils/router.js'

export default function App ({ $target }) {

  new NavigationBar({
    $target
  })

  const editPage = new EditPage({
    $target,
    initialState: {
      documentId: '',
      title: '',
      content: ''
    }
  })


  this.route = () => {
    const { pathname } = window.location
    
    if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/')
      console.log(`editPage.setState({ ${documentId} })`)
      
      editPage.setState({ documentId })
    }
  }

  this.route()

  RouterUtils.initRouter(() => this.route())
}