import React from 'react';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export default Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">
        <div className="page-content_sidebar">
          <NoteList/>
        </div>
        <div className="page-content_main">
          <Editor/>
        </div>

      </div>
    </div>
  );
};
