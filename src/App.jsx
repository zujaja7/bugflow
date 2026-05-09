import './App.css'
function App() {
  return (
    <div className="app-container">

      {/*Header Section*/}
      <header className="app-header"> 
        <div className="brand-area">
      <h1 className="title">BugFlow</h1>
      <h2 className="subtitle">Track issues , organize fixes, ship cleaner releases</h2>
      </div>

      <div className="actions-area">
      <input type="search" placeholder="Search issues..." className="search-input" />
      <button className="add-bug-button">+ New Bug</button>
        </div>
      </header>
      {/*Main Content Area*/}

      <div className='app-layout'>
        <div className='overview-panel'>
          <h2 className='overview-title'>OVERVIEW</h2>
          <h3>Filters</h3>
          <div className="filter-field">
          <label htmlFor="severity"> Severity </label>
          <select id="severity" className='dropdown'>
            <option value="All">All</option>
            <option value="Highest">Highest</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        
        <div className="filter-field">
        <label htmlFor="priority"> Priority </label>
          <select id="priority" className='dropdown'>
            <option value="All">All</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
            <option value="P4">P4</option>
          </select>

        </div>


        <div className="filter-field">
        <label htmlFor="status"> Status </label>
          <select id="status" className='dropdown'>
            <option value="All">All</option>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Fixed">Fixed</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
            <option value="Reopened">Reopened</option>
          </select>

        </div>
        <h3>Quick stats</h3>
        <div className="stat-row">
  <span>Open</span>
  <span>8</span>
  </div>
  <div className='stat-row'>
  <span>Assigned</span>
  <span>3</span>
  </div>
  <div className='stat-row'>
  <span>Fixed</span>
  <span>12</span>
  </div>

  <div className="last-updated">
  <h3>Last Updated</h3>
  <p className="last-updated-value">Today, 10:42 AM</p>
</div>

        </div>
        <div className='recent-issues-panel'>

        <h2 className="recent-issues-title">RECENT ISSUES</h2>

  <div className="issue-card">
    <div className="issue-meta">
      <span className="badge severity-high">High</span>
      <span className="badge status-open">Open</span>
      <span className="updated-time">Updated 10:42 AM</span>
    </div>

    <h3 className="issue-title">Login button not responding</h3>
    <p className="issue-description">
      Submit becomes inactive after validation.
    </p>

    <div className="issue-actions">
      <button>Edit</button>
      <button>Delete</button>
    </div>
  </div>


  <div className="issue-card">
    <div className="issue-meta">
      <span className="badge severity-medium">Medium</span>
      <span className="badge status-in-progress">In Progress</span>
      <span className="updated-time">Updated 04:27 PM</span>
    </div>

    <h3 className="issue-title">Overview Page not Mobile Responsive</h3>
    <p className="issue-description">
      The overview section is not mobile responsive.
    </p>

    <div className="issue-actions">
      <button>Edit</button>
      <button>Delete</button>
    </div>
  </div>

</div>
      </div>
      </div>
    
  )
}

export default App