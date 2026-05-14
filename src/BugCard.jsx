function BugCard({
  bugTitle,
  bugSeverity,
  bugStatus,
  bugDescription,
  lastUpdatedDisplay,
  bugPriority,
  bugEstimate,
  onEdit,
  onDelete,
}) {
  return (
    <div className="issue-card">
      <div className="issue-meta">
        <span className={`badge severity-${bugSeverity.toLowerCase()}`}>
          {bugSeverity}
        </span>

        <span className={`badge status-${bugStatus.toLowerCase()}`}>
          {bugStatus}
        </span>
        <span className="updated-time">Updated {lastUpdatedDisplay}</span>
      </div>
      <h3 className="issue-title">{bugTitle}</h3>
      <p className="issue-description">{bugDescription}</p>
      <div className="issue-actions">
        <button className="icon-button edit-button" onClick={onEdit}>
          ✎
        </button>

        <button className="icon-button delete-button" onClick={onDelete}>
          🗑
        </button>
      </div>
    </div>
  );
}

export default BugCard;
