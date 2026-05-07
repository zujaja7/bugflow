import './App.css'
function App() {
  return (
    <div className="app-container">
      <header className="header">
      <h1 className="title">Bug Tracker</h1>
      <h2 className="subtitle">Track, update, and organize bugs</h2>
      </header>
      <div className="app-layout">
        <div className="sections-size">Bugs</div>
        <div className="sections-size">Create/Edit Bug</div>
      </div>
    </div>
  )
}

export default App