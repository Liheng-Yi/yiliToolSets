import React from 'react';

import AppContent from './views/FileTransfer';  // Importing AppContent component
import TextBoxContent from './views/TextBox';
function App() {
  return (
    <div className="App">
      <AppContent />  {/* Using AppContent component */}
      <TextBoxContent />
    </div>
  );
}

export default App;
