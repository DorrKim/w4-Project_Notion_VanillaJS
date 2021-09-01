import Sidebar from './Sidebar.js';
import { request } from '../api.js';

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
    }
  });
}
