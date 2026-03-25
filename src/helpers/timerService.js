import { interval, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, share, map } from 'rxjs/operators';

/**
 * A service to manage timer functionality using RxJS with elapsed time tracking
 */
class TimerService {
  constructor() {
    this.destroy$ = new Subject();
    this.timer$ = null;
    this.callbacks = [];
    this.startTime = Date.now();
    this.initialElapsedTime = 0;
    this.elapsedTime$ = new BehaviorSubject(0);
  }

  /**
   * Initialize the timer with a previously saved elapsed time
   * @param {number} elapsedTime - Previously elapsed time in seconds
   */
  initializeWithElapsedTime(elapsedTime) {
    if (typeof elapsedTime === 'number' && elapsedTime > 0) {
      this.initialElapsedTime = elapsedTime;
      // Adjust the start time to account for the pre-existing elapsed time
      this.startTime = Date.now() - (elapsedTime * 1000);
      // Update the current elapsed time value
      this.elapsedTime$.next(elapsedTime);
    }
  }

  /**
   * Start a timer that emits at the specified interval with elapsed time tracking
   * @param {number} intervalMs - Interval in milliseconds
   * @returns {Observable} - The timer observable
   */
  startTimer(intervalMs = 1000) {
    if (!this.timer$) {
      // Only reset startTime if it hasn't been initialized with elapsed time
      if (this.initialElapsedTime === 0) {
        this.startTime = Date.now();
      }
      this.timer$ = interval(intervalMs).pipe(
        map(() => {
          const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
          this.elapsedTime$.next(elapsed);
          return elapsed;
        }),
        takeUntil(this.destroy$),
        share() // Share the same observable among multiple subscribers
      );
    }
    return this.timer$;
  }

  /**
   * Register a callback to be executed on each timer tick with elapsed time
   * @param {Function} callback - Function to execute on each tick
   * @returns {Subscription} - The subscription object
   */
  onTick(callback) {
    const timer = this.startTimer();
    const subscription = timer.subscribe({
      next: (elapsed) => callback(elapsed),
      error: (err) => console.error('Timer error:', err)
    });
    
    this.callbacks.push({ callback, subscription });
    return subscription;
  }

  /**
   * Get an observable of the elapsed time
   * @returns {Observable} - The elapsed time observable
   */
  getElapsedTime$() {
    return this.elapsedTime$.asObservable();
  }

  /**
   * Get the current elapsed time in seconds
   * @returns {number} - Elapsed time in seconds
   */
  getCurrentElapsedTime() {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  /**
   * Get the initial elapsed time that was set during initialization
   * @returns {number} - Initial elapsed time in seconds
   */
  getInitialElapsedTime() {
    return this.initialElapsedTime;
  }

  /**
   * Stop the timer and clean up all subscriptions
   */
  stopTimer() {
    if (this.destroy$) {
      this.destroy$.next();
      this.callbacks.forEach(({ subscription }) => {
        if (subscription && typeof subscription.unsubscribe === 'function') {
          subscription.unsubscribe();
        }
      });
      this.callbacks = [];
      this.timer$ = null;
      // Preserve initial elapsed time when stopping
      this.elapsedTime$.next(this.initialElapsedTime);
    }
  }

  /**
   * Complete and clean up the service
   */
  destroy() {
    this.stopTimer();
    if (this.destroy$) {
      this.destroy$.complete();
    }
    if (this.elapsedTime$) {
      this.elapsedTime$.complete();
    }
    // Reset initial elapsed time when destroying the service
    this.initialElapsedTime = 0;
  }
}

// Export a singleton instance
export const timerService = new TimerService();

// Export the class for testing or if multiple instances are needed
export default TimerService;
