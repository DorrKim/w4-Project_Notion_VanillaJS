import Sidebar from './Sidebar.js';
import Editor from './Editor.js';
import { request } from '../api.js';
import { initRouter, push } from '../router.js';

export default function App({ $target }) {
  const sidebar = new Sidebar({
    $target,
    addList: async id => {
      await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: '제목 없음',
          parent: id
        })
      }),
        sidebar.render();
    },
    showDocument: documentId => {
      push(`/documents/${documentId}`);
    }
  });

  const editor = new Editor({
    $target,
    initialState: {
      id: '',
      title: '',
      content: '',
      documents: [],
      createdAt: '',
      updatedAt: ''
    }
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      editor.setState({
        ...editor.state,
        id: documentId
      });
    }
  };

  this.route();

  initRouter(() => this.route());
}
