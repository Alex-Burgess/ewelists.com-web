import {isWebpSupported} from 'react-image-webp/dist/utils';
import config from 'config.js';

export function imageSize(image) {
  if (! image) {
      return null
  }

  image = config.imagePrefix + "/images/" + image;
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

export function imageUrl(image) {
  image = config.imagePrefix + "/images/" + image;

  return image;
}
