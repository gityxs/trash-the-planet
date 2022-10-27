/**
 * Initializes the tooltip system on page load by listening for mouse movement.
 */
export function initializeTooltipSystem() {
  // On startup, attach the Tooltip component to the mouse cursor
  window.addEventListener('mousemove', (e) => {
    setTooltipPosition.bind(this, e.clientX, e.clientY)();
  });
}

/**
 * Updates the tooltip's position based on mouse movement.
 * @param {number} x
 * @param {number} y
 */
function setTooltipPosition(x, y) {
  const tooltipWidth = this.tooltip.clientWidth;
  const tooltipHeight = this.tooltip.clientHeight;

  const newX =
    x + 32 * 2 + tooltipWidth >= window.innerWidth
      ? window.innerWidth - (32 * 2 + tooltipWidth) <= x
        ? x - tooltipWidth - 32
        : window.innerWidth - (tooltipWidth + 32)
      : x + 32;
  const newY =
    y - 32 <= 0
      ? 32
      : y - 16 + 32 + tooltipHeight >= window.innerHeight
      ? window.innerHeight - 32 - tooltipHeight
      : y - 16;

  if (this.tooltip) {
    this.tooltip.style.top = `${newY}px`;
    this.tooltip.style.left = `${newX}px`;
  }
}

/**
 * Shows a tooltip and its contents.
 * @param {object} tip
 */
export function showTooltip(tip) {
  this.setState({
    tooltip: {
      isVisible: true,
      tip: tip,
    },
  });
}

/**
 * Hides the tooltip.
 */
export function hideTooltip() {
  this.setState({
    tooltip: {
      ...this.state.tooltip,
      isVisible: false,
    },
  });
}
