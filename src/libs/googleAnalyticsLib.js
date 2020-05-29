import ReactGA from 'react-ga';
import config from "config";


export function initGA() {
  ReactGA.initialize(config.ga);
}


export function onView(path) {
  ReactGA.pageview(path);
}
