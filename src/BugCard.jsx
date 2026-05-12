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
        <span className="badge">{bugSeverity}</span>
        <span className="badge">{bugStatus}</span>
        <span className="updated-time">Updated {lastUpdatedDisplay}</span>
      </div>
      <h3 className="issue-title">{bugTitle}</h3>
      <p className="issue-description">{bugDescription}</p>
      <div className="issue-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default BugCard;
