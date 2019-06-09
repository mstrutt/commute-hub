import { TubeStatus } from './components/tube.js';
import { WeatherStatus } from './components/weather.js';
import { StravaFeed } from './components/strava.js';

new TubeStatus(document.getElementById('status'));
new WeatherStatus(document.getElementById('weather'));
new StravaFeed(document.getElementById('strava'));
