import './App.css'
function App() {
  return (
    <div className="app-container">
      <header className="main-header">
      <h1 className="title">BugFlow</h1>
      <h2 className="subtitle">Track, update, and organize bugs</h2>
      </header>
      <div className="app-layout">
        <div className="bug-list-section">
          <header className="bug-list-header">BUGS</header>
        </div>
        <div className="form-section">
          <header className="form-header">CREATE / EDIT </header>
          <div className="title-input-group">
              <label htmlFor="title" className="form-title">Title</label>
              <input type="text" id="title" name="title" placeholder="Enter bug title" />
            </div>
            
          </div>
          
      
        </div>
      </div>
    
  )
}

export default App