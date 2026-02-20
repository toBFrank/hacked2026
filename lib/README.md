# Library Directory

This directory contains external libraries and dependencies for the Smart Video Controller extension.

## Expected Libraries

### Google AI Edge for Developers

- **Purpose**: Face and gesture detection
- **Files to add**:
  - `mediapipe-face-detection.js` or similar
  - Any required model files (`.tflite`, `.pbtxt`, etc.)

### Setup Instructions

1. Download the Google AI Edge for Developers Web library from the official repository
2. Copy the necessary files into this directory
3. Update the imports in `js/detector.js` to reference the correct library paths
4. Add the library to `web_accessible_resources` in `manifest.json` if not already done

### References

- [Google AI Edge for Developers](https://developers.google.com/mediapipe)
- [MediaPipe Face Detection](https://developers.google.com/mediapipe/solutions/vision/face_detection)

## Notes

- Keep all external scripts in this directory
- Remember to include the library in `manifest.json`'s `web_accessible_resources` for proper access
