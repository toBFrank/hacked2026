// Popup script for Smart Video Controller extension
// Handles UI interactions and communication with content scripts

/**
 * Initialize popup UI elements
 */
function initializeUI() {
  const startBtn = document.getElementById("start-detection-btn");
  const stopBtn = document.getElementById("stop-detection-btn");
  const statusText = document.getElementById("status-text");

  // Start detection button
  startBtn?.addEventListener("click", async () => {
    // TODO: Send message to content script to start detection
    addLog("Starting face and gesture detection...", "info");
    startBtn.disabled = true;
    stopBtn.disabled = false;
  });

  // Stop detection button
  stopBtn?.addEventListener("click", async () => {
    // TODO: Send message to content script to stop detection
    addLog("Stopping face and gesture detection...", "info");
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });

  // Load saved settings
  loadSettings();

  // Check current detection status
  checkDetectionStatus();
}

/**
 * Load saved settings from storage
 */
function loadSettings() {
  chrome.storage.local.get(
    {
      pauseOnLookAway: true,
      rewindOnConfusion: true,
      rewindDuration: 5,
    },
    (items) => {
      document.getElementById("pause-on-look-away").checked =
        items.pauseOnLookAway;
      document.getElementById("rewind-on-confusion").checked =
        items.rewindOnConfusion;
      document.getElementById("rewind-duration").value = items.rewindDuration;
    },
  );

  // Save settings on change
  document
    .getElementById("pause-on-look-away")
    ?.addEventListener("change", (e) => {
      chrome.storage.local.set({ pauseOnLookAway: e.target.checked });
    });

  document
    .getElementById("rewind-on-confusion")
    ?.addEventListener("change", (e) => {
      chrome.storage.local.set({ rewindOnConfusion: e.target.checked });
    });

  document
    .getElementById("rewind-duration")
    ?.addEventListener("change", (e) => {
      chrome.storage.local.set({ rewindDuration: parseInt(e.target.value) });
    });
}

/**
 * Check current detection status
 */
function checkDetectionStatus() {
  // TODO: Query content script for current detection status
  // For now, this is a skeleton
}

/**
 * Add log entry to the detection log
 * @param {string} message - Log message
 * @param {string} type - Log type (info, warning, error, success)
 */
function addLog(message, type = "info") {
  const logBox = document.getElementById("detection-log");
  if (!logBox) return;

  const entry = document.createElement("div");
  entry.className = `log-entry ${type}`;
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;

  logBox.appendChild(entry);

  // Keep only last 20 entries
  const entries = logBox.querySelectorAll(".log-entry");
  if (entries.length > 20) {
    entries[0].remove();
  }

  // Auto-scroll to bottom
  logBox.scrollTop = logBox.scrollHeight;
}

/**
 * Listen for messages from content script
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // TODO: Handle messages from content script
  // Examples:
  // - Detection status updates
  // - Alert messages
  // - Log entries
});

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeUI);
