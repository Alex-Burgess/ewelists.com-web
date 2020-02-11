import {isWebpSupported} from 'react-image-webp/dist/utils';
import config from 'config.js';

export function imageSize(image) {
  image = config.imagePrefix + image;
  if (isWebpSupported()) {
    return image + '.webp'
  } else {
    if (window.innerWidth >= 400) {
      return image + '.jpg'
    } else {
      return image + '.mob.jpg'
    }
  }
}
