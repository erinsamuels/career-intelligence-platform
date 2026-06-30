import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const icons = {
  insight:  { Icon: Lightbulb,     color: "var(--gold)",    bg: "var(--gold-glow)",  border: "var(--border-gold)"  },
  progress: { Icon: TrendingUp,    color: "var(--sage-lt)", bg: "var(--sage-glow)",  border: "var(--border-sage)"  },
  warning:  { Icon: AlertTriangle, color: "#FB923C",        bg: "rgba(251,146,60,0.08)", border: "rgba(251,146,60,0.22)" },
  success:  { Icon: CheckCircle,   color: "var(--green)",   bg: "rgba(74,222,128,0.07)", border: "rgba(74,222,128,0.18)" },
};

function generateInsights(target, activeNode, pathScore) {
  const list = [];

  // Score-based insights
  if (pathScore >= 80) {
    list.push({
      type: "success",
      text: `Your match strength of ${pathScore}/100 puts you in a competitive position for ${target.company} roles.`,
    });
  } else if (pathScore < 65) {
    list.push({
      type: "insight",
      text: `A targeted project or certification could push your score into the 70s — the threshold where recruiters start responding at higher rates.`,
    });
  }

  // Node-specific insight
  if (activeNode.type === "active") {
    list.push({
      type: "progress",
      text: `You're actively building ${activeNode.title} experience right now. The key is capturing measurable impact before this role ends.`,
    });
  }

  if (activeNode.type === "bridge") {
    list.push({
      type: "insight",
      text: `Bridge roles like ${activeNode.title} matter more than most people think. They signal to recruiters that you made a deliberate, strategic move toward ${target.company}.`,
    });
  }

  if (activeNode.type === "goal") {
    list.push({
      type: "success",
      text: `You're looking at your target. The ${activeNode.match}% step fit means your background is already in the right neighborhood — now it's about the story you tell.`,
    });
  }

  // Network insight
  const networkScore = target.metrics.find((m) => m.label === "Network");
  if (networkScore && networkScore.value < 65) {
    list.push({
      type: "warning",
      text: `Your network score is below 65%. For companies like ${target.company}, a warm introduction meaningfully increases your response rate. Prioritize the connection archetypes on the Network page.`,
    });
  }

  return list.slice(0, 3);
}

export function InsightPanel({ target, activeNode, pathScore }) {
  const insights = generateInsights(target, activeNode, pathScore);

  if (!insights.length) return null;

  return (
    <section className="panel">
      <div className="panelHeader">
        <div className="panelHeaderLeft">
          <p className="eyebrow">Intelligence</p>
          <h2>Key insights</h2>
        </div>
        <div className="panelBadge">{insights.length} signals</div>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {insights.map((insight, i) => {
          const { Icon, color, bg, border } = icons[insight.type];
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                borderRadius: "var(--r-lg)",
                padding: "14px 16px",
                background: bg,
                border: `1px solid ${border}`,
                animation: `fadeUp 0.4s var(--ease) ${i * 0.08}s both`,
              }}
            >
              <Icon
                size={16}
                style={{ color, flexShrink: 0, marginTop: 2 }}
              />
              <p style={{
                fontSize: "0.84rem",
                color: "var(--text-2)",
                lineHeight: 1.6,
              }}>
                {insight.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
