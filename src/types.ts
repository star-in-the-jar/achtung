export enum SessionState {
  PAUSED = "PAUSED",
  WORK = "WORK",
  BREAK = "BREAK",
  STOPPED = "STOPPED",
}

export enum DataFileName {
  IS_TIRED = "tired",
  IS_DISTRACTED = "distracted",
  IS_ASLEEP = "asleep",
  IS_PRESENT = "has_head",
  IS_LOOKING_AWAY = "looking_away",
  WINDOWS = "windows",
}

export const DATA_FILE_NAMES = [
  DataFileName.IS_TIRED,
  DataFileName.IS_DISTRACTED,
  DataFileName.IS_ASLEEP,
  DataFileName.IS_PRESENT,
  DataFileName.IS_LOOKING_AWAY,
  DataFileName.WINDOWS,
];

type Milliseconds = number;

export interface Event {
  timestamp: Milliseconds;
  sessionState: SessionState;
  isDistracted: boolean;
  isTired: boolean;
  isAsleep: boolean;
  isLookingAway: boolean;
  isPresent: boolean;
}

export interface Session {
  state: SessionState;
  config: SessionConfig;
  timeLeft: Milliseconds;
  events: Event[];
}

export interface SessionConfig {
  workDuration: Milliseconds;
  breakDuration: Milliseconds;
  cycleNumber: number;
  focusGoal: number;
  unwantedApps: string[];
  unwantedWebsites: string[];
}

export interface Detected {
  isTired: boolean;
  isDistracted: boolean;
  isAsleep: boolean;
  isLookingAway: boolean;
  isPresent: boolean;
}
export interface GlobalStore {
  sessions: Session[];
  lastDetected: Detected;
  stateBeforePause:
    | SessionState.STOPPED
    | SessionState.WORK
    | SessionState.BREAK;
}

const detectedInstance: Detected = {
  isTired: false,
  isDistracted: false,
  isAsleep: false,
  isLookingAway: false,
  isPresent: true,
};

export interface Option {
  value: string;
  label: string;
}

export const detectedKeys = Object.keys(detectedInstance) as (keyof Detected)[];
