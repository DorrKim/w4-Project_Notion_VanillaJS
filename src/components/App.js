import Sidebar from './Sidebar.js';
import Editor from './Editor.js';
import { request } from '../api.js';
import { initRouter, push } from '../router.js';
import { removeItem, setItem } from '../storage.js';

const addToggleAttribute = documents => {
  return documents.map(obj => {
    obj.isToggled = false;
    if (obj.documents.length === 0) {
      return obj;
    }
    addToggleAttribute(obj.documents);
    return obj;
  });
};

const toggleDocument = (rootDocuments, documentId) => {
  return rootDocuments.map(obj => {
    if (obj.id === documentId) {
      obj.isToggled = !obj.isToggled;
      return obj;
    }
    toggleDocument(obj.documents, documentId);
    return obj;
  });
};

export default function App({ $target }) {
  this.state = {
    rootDocuments: []
  };

  this.setState = async () => {
    const documents = await request('/documents/');
    const nextState = addToggleAttribute(documents);

    this.state.rootDocuments = nextState;
    sidebar.setState(nextState);
  };

  this.setState();

  const sidebar = new Sidebar({
    $target,
    intialState: [],
    createList: async id => {
      await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: '제목 없음',
          parent: id
        })
      });

      this.setState();
    },
    showDocument: documentId => {
      push(`/documents/${documentId}`);
    },
    toggleList: ({ rootDocuments, documentId }) => {
      const nextState = toggleDocument(rootDocuments, documentId);
      sidebar.setState(nextState);
    },
    deleteList: async documentId => {
      await request(`/documents/${documentId}`, {
        method: 'DELETE'
      });

      const nextState = await request('/documents', {
        method: 'GET'
      });

      sidebar.setState(nextState);
      editor.setState();
      push('/');
    }
  });

  let timer = null; // debounce를 위한 초기값

  const editor = new Editor({
    $target,
    initialState: {
      id: '',
      title: '',
      content: ''
    },
    onEditSave: async ({ id, title, content }) => {
      const currentState = await request(`/documents/${id}`, {
        method: 'GET'
      });

      console.log(title);

      if (!title) {
        title = currentState.title;
      } else if (!content) {
        content = currentState.content;
      }

      if (timer !== null) {
        clearTimeout(timer);
      }

      const localSaveKey = `temp-document-${id}`;

      timer = setTimeout(async () => {
        setItem({
          key: localSaveKey,
          value: {
            title,
            content,
            updatedAt: new Date()
          }
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

        removeItem({ key: localSaveKey });

        this.setState();
      }, 500);
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
