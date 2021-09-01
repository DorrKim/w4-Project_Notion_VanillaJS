import Sidebar from './Sidebar.js';
import Editor from './Editor.js';
import { request } from '../api.js';
import { initRouter, push } from '../router.js';
import { removeItem, setItem } from '../storage.js';

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
    },
    foldList: (list, depth) => {
      list.querySelectorAll(`[data-depth="${depth + 1}"]`).forEach(subList => {
        subList.style.display = subList.style.display === '' ? 'none' : 'block';
      });
    },
    deleteList: async documentId => {
      await request(`/documents/${documentId}`, {
        method: 'DELETE'
      }),
        sidebar.render();
      editor.render();
      editor.addEvent();
      push('/');
    }
  });

  let timer = null; // debounce를 위한 초기값

  const editor = new Editor({
    $target,
    initialState: {
      id: '',
      title: '',
      content: '',
      documents: [],
      createdAt: '',
      updatedAt: ''
    },
    onEditSave: document => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      const { id, title, content } = document;
      const localSaveKey = `temp-document-${id}`;

      timer = setTimeout(async () => {
        setItem(localSaveKey, {
          title,
          content,
          updatedAt: new Date()
        });

        if (id === 'new') {
          await request(`/documents`, {
            method: 'POST',
            body: JSON.stringify({
              title,
              parent: null
            })
          });
        } else {
          await request(`/documents/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              title,
              content
            })
          });
        }

        removeItem(localSaveKey);
        sidebar.render();
      }, 2000);
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
