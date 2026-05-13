import "./App.css";

import BugCard from "./BugCard";
import { useState, useEffect } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bugs, setBugs] = useState(() => {
    const savedBugs = localStorage.getItem("bugs");

    if (savedBugs) {
      try {
        return JSON.parse(savedBugs);
      } catch (error) {
        console.error("Failed to parse saved bugs:", error);
        return [];
      }
    }

    return [];
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [estimate, setEstimate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [editingBugId, setEditingBugId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const openCount = bugs.filter((bug) => bug.bugStatus === "Open").length;
  const totalBugs = bugs.length;
  const lastUpdatedBug = [...bugs].sort(
    (a, b) => b.lastUpdated - a.lastUpdated,
  )[0];

  const lastUpdatedText = lastUpdatedBug
    ? lastUpdatedBug.lastUpdatedDisplay
    : "No updates yet";
  const assignedCount = bugs.filter(
    (bug) => bug.bugStatus === "Assigned",
  ).length;
  const fixedCount = bugs.filter((bug) => bug.bugStatus === "Fixed").length;

  useEffect(() => {
    localStorage.setItem("bugs", JSON.stringify(bugs));
  }, [bugs]);
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSeverity("");
    setPriority("");
    setStatus("");
    setEstimate("");
    setSubmitted(false);
    setEditingBugId(null);
  };
  const handleSaveBug = () => {
    const now = new Date();
    if (!title || !description || !severity || !status) {
      setSubmitted(true);
      return;
    }

    if (editingBugId !== null) {
      const updatedBugs = bugs.map((bug) => {
        if (bug.id === editingBugId) {
          return {
            ...bug,
            bugTitle: title,
            bugDescription: description,
            bugSeverity: severity,
            bugPriority: priority,
            bugStatus: status,
            bugEstimate: estimate,
            lastUpdated: now.getTime(), // number for sorting
            lastUpdatedDisplay: now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        }
        return bug;
      });
      setBugs(updatedBugs);
    } else {
      const newBug = {
        id: Date.now(),
        bugTitle: title,
        bugDescription: description,
        bugSeverity: severity,
        bugPriority: priority,
        bugStatus: status,
        bugEstimate: estimate,
        lastUpdated: now.getTime(),
        lastUpdatedDisplay: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setBugs([...bugs, newBug]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleNewBug = () => {
    resetForm();
    setIsModalOpen(true);
  };
  const handleEditBug = (bug) => {
    setEditingBugId(bug.id);
    setTitle(bug.bugTitle);
    setDescription(bug.bugDescription);
    setSeverity(bug.bugSeverity);
    setPriority(bug.bugPriority);
    setStatus(bug.bugStatus);
    setEstimate(bug.bugEstimate);
    setSubmitted(false);
    setIsModalOpen(true);
  };
  const handleDeleteBug = (id) => {
    setBugs(bugs.filter((bug) => bug.id !== id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const filteredBugs = bugs.filter((bug) => {
    const title = bug.bugTitle.toLowerCase();
    const description = bug.bugDescription.toLowerCase();
    const search = searchText.toLowerCase();
    const matchesSearch =
      title.includes(search) || description.includes(search);
    const matchesSeverity =
      severityFilter === "All" || bug.bugSeverity === severityFilter;
    const matchesStatus =
      statusFilter === "All" || bug.bugStatus === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || bug.bugPriority === priorityFilter;
    return matchesSearch && matchesSeverity && matchesStatus && matchesPriority;
  });
  return (
    <div className="app-container">
      {/*Header Section*/}
      <header className="app-header">
        <div className="brand-area">
          <h1 className="title">BugFlow</h1>
          <h2 className="subtitle">
            Track issues, organize fixes, ship cleaner releases
          </h2>
        </div>

        <div className="actions-area">
          <input
            type="search"
            placeholder="Search issues..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button className="add-bug-button" onClick={handleNewBug}>
            + New Bug
          </button>
        </div>
      </header>
      {/*Main Content Area*/}

      <div className="app-layout">
        <div className="overview-panel">
          <h2 className="overview-title">OVERVIEW</h2>
          <h3>Filters</h3>
          <div className="filter-field">
            <label htmlFor="severity"> Severity </label>
            <select
              id="severity"
              className="dropdown"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Highest">Highest</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="priority"> Priority </label>
            <select
              id="priority"
              className="dropdown"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
              <option value="P4">P4</option>
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="status"> Status </label>
            <select
              id="status"
              className="dropdown"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
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
            <span>Total</span>
            <span>{totalBugs}</span>
          </div>
          <div className="stat-row">
            <span>Open</span>
            <span>{openCount}</span>
          </div>
          <div className="stat-row">
            <span>Assigned</span>
            <span>{assignedCount}</span>
          </div>
          <div className="stat-row">
            <span>Fixed</span>
            <span>{fixedCount}</span>
          </div>

          <div className="last-updated">
            <h3>Last Updated</h3>
            <p className="last-updated-value">{lastUpdatedText}</p>
          </div>
        </div>
        <div className="recent-issues-panel">
          <h2 className="recent-issues-title">RECENT ISSUES</h2>

          {[...filteredBugs]
            .sort((a, b) => b.lastUpdated - a.lastUpdated)
            .map((bug) => (
              <BugCard
                key={bug.id}
                bugTitle={bug.bugTitle}
                bugSeverity={bug.bugSeverity}
                bugStatus={bug.bugStatus}
                bugDescription={bug.bugDescription}
                lastUpdatedDisplay={bug.lastUpdatedDisplay}
                onEdit={() => handleEditBug(bug)}
                onDelete={() => handleDeleteBug(bug.id)}
              />
            ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2 className="Title">
                {editingBugId === null ? "New Bug" : "Edit Bug"}
              </h2>
              <button onClick={closeModal}>✕</button>
            </div>
            <div className="title-description">
              <label>Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter your Bug title"
                className="title-input"
              />
              {submitted && !title && (
                <p className="error">* Title is required</p>
              )}
              <label>Description</label>
              <textarea
                className="description-area"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
              {submitted && !description && (
                <p className="error">* Description is required</p>
              )}
            </div>
            <div className="bug-properties">
              <div className="property-field">
                <label>Severity</label>
                <select
                  onChange={(e) => setSeverity(e.target.value)}
                  value={severity}
                >
                  <option value="" disabled hidden>
                    Severity
                  </option>
                  <option value="Highest">Highest</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                {submitted && !severity && (
                  <p className="error">* Severity is required</p>
                )}
              </div>
              <div className="property-field">
                <label>Priority</label>
                <select
                  onChange={(e) => setPriority(e.target.value)}
                  value={priority}
                >
                  <option value="" disabled hidden>
                    Priority
                  </option>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                  <option value="P3">P3</option>
                  <option value="P4">P4</option>
                </select>
              </div>
              <div className="property-field">
                <label>Status</label>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                >
                  <option value="" disabled hidden>
                    Status
                  </option>
                  <option value="New">New</option>
                  <option value="Open">Open</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Verified">Verified</option>
                  <option value="Closed">Closed</option>
                  <option value="Reopened">Reopened</option>
                </select>
                {submitted && !status && (
                  <p className="error">* Status is required</p>
                )}
              </div>

              <div className="property-field">
                <label>Estimate</label>
                <select
                  onChange={(e) => setEstimate(e.target.value)}
                  value={estimate}
                >
                  <option value="" disabled hidden>
                    Estimate
                  </option>
                  <option value="0.25 hr">Quarter hour</option>
                  <option value="0.5 hr">Half an hour</option>
                  <option value="1 hr">1 hour</option>
                  <option value="2 hrs">2 hours</option>
                  <option value="3 hrs">3 hours</option>
                  <option value="4 hrs">4 hours</option>
                  <option value="5 hrs">5 hours</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
              <button className="save-bug-button" onClick={handleSaveBug}>
                {editingBugId === null ? "Save Bug" : "Update Bug"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
