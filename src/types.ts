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

export type Milliseconds = number;

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
  cycleCount: number;
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
  lastDetected: FetchDataReturnType;
  state: NewSessionState | null;
  windowReference: any | null;
  lastDistractedTimeStamp: number;
}

const detectedInstance: Detected = {
  isTired: false,
  isDistracted: false,
  isAsleep: false,
  isLookingAway: false,
  isPresent: true,
};

export interface NewSessionState {
  config: SessionConfig | null;
  cycleNumber: number;
  timeLeft: number;
  state: SessionState;
  wasWorking: boolean;
}

export interface Option {
  value: string;
  label: string;
}

export type IsSomethingResponse = boolean;
export type WindowsResponse = {
  focusedWindow: string | null;
  windows: string[];
};

export interface FetchDataReturnType {
  isAsleep: IsSomethingResponse;
  isDistracted: IsSomethingResponse;
  hasHead: IsSomethingResponse;
  isLookingAway: IsSomethingResponse;
  isTired: IsSomethingResponse;
  windows: WindowsResponse;
}

export const detectedKeys = Object.keys(detectedInstance) as (keyof Detected)[];
