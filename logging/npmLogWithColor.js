import chalk from 'chalk';
const import {
  log,
} 'colorful-logging');

export function npmLogWithColor(data) {
  log(data, chalk.rgb(155, 155, 155));
}
