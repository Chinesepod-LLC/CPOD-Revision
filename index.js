/*
 * Copyright © 2020. Ugis Rozkalns. All Rights Reserved.
 */

const DAY_IN_MILISECONDS = 1000*60*60*24
const isValidDate = (d) => {
  return d instanceof Date && !isNaN(d);
}

export default class SRM {
  constructor(
    intervals = [1, 1, 2, 3, 8, 17, 35],
    scoreToProgressChange = [-3, -1, 1]
  ) {
    this.intervals = intervals;
    this.scoreToProgressChange = scoreToProgressChange;
  }

  get maxProgress() {
    return this.intervals.length - 1;
  }
  get correctScore() {
    return this.scoreToProgressChange.length - 1;
  }

  calculate(s, { progress }, now) {
    const correct = s === this.scoreToProgressChange.length - 1;
    let newProgress = progress + this.scoreToProgressChange[s];

    if(!isValidDate(new Date(now))) {
      now = Date.now()
    }

    let dueDate = now ? new Date(now + 0) : new Date(Date.now());

    if (correct) {
      dueDate = new Date(now + this.intervals[progress] * DAY_IN_MILISECONDS);
      if (newProgress > this.maxProgress) {
        newProgress = this.maxProgress
      }
    }

    const today = new Date(new Date())

    return {
      dueDate: dueDate < today ? today : dueDate,
      progress: newProgress < 0 ? 0 : newProgress
    };
  }
  getInitialRecord(now) {
    return {
      progress: 0,
      dueDate: now
    };
  }
}

