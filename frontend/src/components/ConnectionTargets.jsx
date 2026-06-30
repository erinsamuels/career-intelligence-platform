import { Search, MessageSquare } from "lucide-react";

export function ConnectionTargets({ connections }) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <div className="panelHeaderLeft">
          <p className="eyebrow">Network strategy</p>
          <h2>Who to find next</h2>
        </div>
        <div className="panelBadge panelBadge-sage">{connections.length} targets</div>
      </div>

      <div className="connectionGrid">
        {connections.map((connection) => (
          <article className="connectionCard" key={connection.type}>
            <div className="connectionIcon">
              {connection.type.slice(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="connectionType">{connection.type}</div>
              <p className="connectionReason">{connection.reason}</p>
            </div>

            <div className="connectionMeta">
              <div className="connectionMetaLabel" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Search size={10} />
                Search phrase
              </div>
              <div className="connectionMetaVal">{connection.search}</div>
            </div>

            <div className="messageBox">
              <div className="messageBoxLabel" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <MessageSquare size={10} />
                Message angle
              </div>
              <p className="messageBoxText">{connection.message}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
