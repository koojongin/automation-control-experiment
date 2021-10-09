import * as robot from 'robotjs'
import fs from 'fs'
import {Bitmap} from 'robotjs';
import Jimp from 'jimp';


export function captureScreen() {
  return new Promise((resolve, reject) => {
    const saveRectRange = {
      width: 1500,
      height: 1080
    };
    const {
      image,
      width,
      height,
      ...rest
    }: Bitmap = robot.screen.capture(0, 0, saveRectRange.width, saveRectRange.height);
    const jimpImage = new Jimp(saveRectRange.width, saveRectRange.height);
    let pos = 0;
    jimpImage.scan(0, 0, jimpImage.bitmap.width, jimpImage.bitmap.height, (x, y, idx) => {
    // jimpImage.scan(0, 0, 900,900, (x, y, idx) => {
      jimpImage.bitmap.data[idx + 2] = image.readUInt8(pos++);
      jimpImage.bitmap.data[idx + 1] = image.readUInt8(pos++);
      jimpImage.bitmap.data[idx + 0] = image.readUInt8(pos++);
      jimpImage.bitmap.data[idx + 3] = image.readUInt8(pos++);
    });
    jimpImage.write('./test.png', resolve);
  })
}

export function typeString() {
  robot.typeString("Hello World");
}
