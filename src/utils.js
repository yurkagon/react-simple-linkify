import { REGEX_URL, DELIMITER } from './constants';

export const splitByURL = text => text.replace(REGEX_URL, text => DELIMITER + text + DELIMITER).split(DELIMITER);
