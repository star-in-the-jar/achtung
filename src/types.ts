type Milliseconds = number;

interface Event {
  timestamp: Milliseconds;
  sessionState: SessionState;
  isDistracted: boolean;
  isTired: boolean;
  isPresent: boolean;
}

interface Session {
  state: SessionState;
  config: SessionConfig;
  timeLeft: Milliseconds;
}

interface SessionConfig {
  workDuration: Milliseconds;
  breakDuration: Milliseconds;
  cycleNumber: number;
  focusGoal: number;
  unwantedApps: string[];
  unwantedWebsites: string[];
}

enum SessionState {
  PAUSED = "PAUSED",
  WORK = "WORK",
  BREAK = "BREAK",
  STOPPED = "STOPPED",
}

export {
  type Milliseconds,
  type Event,
  type Session,
  type SessionConfig,
  SessionState,
};
