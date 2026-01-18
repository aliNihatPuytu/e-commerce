export function showCenterNotice({
  title,
  subtitle = "",
  type = "info",
  duration = 2400,
  actionLabel = "",
  actionHref = "",
} = {}) {
  window.dispatchEvent(
    new CustomEvent("center-notice", {
      detail: { title, subtitle, type, duration, actionLabel, actionHref },
    })
  );
}
