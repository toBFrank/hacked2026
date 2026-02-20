// Video controller module
// Handles video playback control based on detection results

/**
 * VideoController class for managing video interaction
 */
class VideoController {
  constructor(videoElement) {
    this.video = videoElement;
    this.isEnabled = false;

    // Configuration
    this.config = {
      pauseOnLookAway: true,
      rewindOnConfusion: true,
      rewindDuration: 5, // seconds
    };

    // State tracking
    this.wasPlayingBeforePause = false;
    this.lastActionTime = 0;
    this.actionDebounce = 500; // ms

    // Expression tracking
    this.lastExpression = "neutral";
  }

  /**
   * Enable video controller
   */
  enable() {
    if (this.isEnabled) return;

    this.isEnabled = true;
    console.log("Video controller enabled for:", this.video);
  }

  /**
   * Disable video controller
   */
  disable() {
    if (!this.isEnabled) return;

    this.isEnabled = false;
    console.log("Video controller disabled");
  }

  /**
   * Load configuration from storage
   */
  async loadConfig() {
    // TODO: Load settings from chrome.storage.local
  }

  /**
   * Save configuration to storage
   */
  async saveConfig() {
    // TODO: Save settings to chrome.storage.local
  }

  /**
   * Update configuration
   * @param {Object} newConfig - New configuration values
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.saveConfig();
  }

  /**
   * Handle detection update
   * @param {Object} detectionData - Data from face detector
   */
  onDetectionUpdate(detectionData) {
    if (!this.isEnabled) return;

    const currentTime = Date.now();

    // Check if looking away
    if (this.config.pauseOnLookAway) {
      this._handleLookAway(detectionData, currentTime);
    }

    // Check for confused expression
    if (this.config.rewindOnConfusion) {
      this._handleConfusion(detectionData, currentTime);
    }

    // Update last expression
    this.lastExpression = detectionData.expressionState;
  }

  /**
   * Handle look away action
   * @param {Object} detectionData - Detection data
   * @param {number} currentTime - Current timestamp
   */
  _handleLookAway(detectionData, currentTime) {
    // TODO: Debounce action
    if (currentTime - this.lastActionTime < this.actionDebounce) {
      return;
    }

    if (!detectionData.isLookingAtScreen && !this.video.paused) {
      // User looked away and video is playing - pause it
      this.pauseVideo();
      this.lastActionTime = currentTime;
      this._logAction("Paused due to looking away");
    }

    // TODO: Auto-resume when looking back
    // if (detectionData.isLookingAtScreen && this.video.paused && this.wasPlayingBeforePause) {
    //   this.playVideo();
    // }
  }

  /**
   * Handle confused expression
   * @param {Object} detectionData - Detection data
   * @param {number} currentTime - Current timestamp
   */
  _handleConfusion(detectionData, currentTime) {
    // TODO: Debounce action
    if (currentTime - this.lastActionTime < this.actionDebounce) {
      return;
    }

    // TODO: Define what constitutes "confused" expression
    // For now, use placeholder
    if (detectionData.expressionState === "confused") {
      // Rewind video
      this.rewindVideo(this.config.rewindDuration);
      this.lastActionTime = currentTime;
      this._logAction(
        `Rewound ${this.config.rewindDuration} seconds due to confused expression`,
      );
    }
  }

  /**
   * Pause video and remember if it was playing
   */
  pauseVideo() {
    if (!this.video.paused) {
      this.wasPlayingBeforePause = true;
      this.video.pause();
    }
  }

  /**
   * Play video
   */
  playVideo() {
    if (this.video.paused) {
      this.video.play().catch((error) => {
        console.error("Failed to play video:", error);
      });
    }
  }

  /**
   * Rewind video
   * @param {number} seconds - Seconds to rewind
   */
  rewindVideo(seconds) {
    this.video.currentTime = Math.max(0, this.video.currentTime - seconds);
  }

  /**
   * Forward video
   * @param {number} seconds - Seconds to forward
   */
  forwardVideo(seconds) {
    this.video.currentTime = Math.min(
      this.video.duration,
      this.video.currentTime + seconds,
    );
  }

  /**
   * Get current video state
   * @returns {Object} Video state information
   */
  getVideoState() {
    return {
      currentTime: this.video.currentTime,
      duration: this.video.duration,
      paused: this.video.paused,
      volume: this.video.volume,
    };
  }

  /**
   * Log action to extension
   * @param {string} message - Action message
   */
  _logAction(message) {
    // TODO: Send log message to popup
    console.log("VideoController:", message);

    // Example: send to popup
    // chrome.runtime.sendMessage({
    //   action: 'logAction',
    //   message: message,
    // }).catch(() => {});
  }
}

// Export for use in other modules
// If used as module: export { VideoController };
