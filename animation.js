 return class Animation {
    /**
     * Create an Animation.
     * @param {Object} options - The animation options.
     * @param {Function} options.behavior - The function to execute on each frame.
     * @param {number} [options.duration=10] - The interval in milliseconds between frames.
     */
    constructor ({ behavior, duration = 10 }) {
      this.fpsInterval = duration;
      this.then = Date.now();
      this.startTime = this.then;
      this.behavior = behavior;
      this.stop = false;
      this.animate();
    }
  
    /**
     * The animation loop that gets called recursively via requestAnimationFrame.
     * It calculates elapsed time and triggers the behavior if the required time has passed.
     */
    animate = () => {
      if (this.stop) { return }
  
      // Built in JS function that smooths animation mov
      requestAnimationFrame(this.animate);
  
      // Calculate elapsed time since last loop
      this.now = Date.now();
      this.elapsed = this.now - this.then;
  
      // If enough time has elapsed, execute the behavior
      if (this.elapsed > this.fpsInterval) {
        // Prepare for the next frame by adjusting for any remainder time
        this.then = this.now - (this.elapsed % this.fpsInterval);
  
        this.behavior();
      }
    }
  
    /**
     * Toggles the animation on or off.
     */
    toggleAnimation() {
      if (this.stop) {
        this.stop = false;
        this.animate();
      } else {
        this.stop = true;
      }
    }
}