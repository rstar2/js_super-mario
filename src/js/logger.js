/* eslint-disable no-console */

export const LEVEL_DEBUG = 0;
export const LEVEL_INFO = 1;
export const LEVEL_WARN = 2;
export const LEVEL_ERROR = 3;

// const level = LEVEL_DEBUG;
const level = LEVEL_WARN;

function isLog(levelNeeded) {
    return level <= levelNeeded;
}

function log(levelNeeded, logFunc, logFuncArguments) {
    if (isLog(levelNeeded)) {
        logFunc.apply(null, logFuncArguments);
    }
}

/* Check functions */

export function isLogDbg() {
    isLog(LEVEL_DEBUG);
}

export function isLogInfo() {
    isLog(LEVEL_INFO);
}
export function isLogWarn() {
    isLog(LEVEL_WARN);
}

export function isLogError() {
    isLog(LEVEL_ERROR);
}

/* Log functions */

export function logDbg() {
    log(LEVEL_DEBUG, console.log, arguments);
}

export function logInfo() {
    log(LEVEL_INFO, console.info, arguments);
}
export function logWarn() {
    log(LEVEL_WARN, console.warn, arguments);
}

export function logError() {
    log(LEVEL_ERROR, console.error, arguments);
}