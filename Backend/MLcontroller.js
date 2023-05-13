/* const tfnode = require("@tensorflow/tfjs-node"); */
const tf = require("@tensorflow/tfjs");
const fs = require("fs");
const jimp = require("jimp");
const sharp = require("sharp");
/* const mlmodel = require("./Ml_model/model.json"); */
/* const resolve = require("path").resolve; */

function processImage(path) {
  const image = sharp(path);
  image
    .ensureAlpha(0) // Remove any alpha channel
    .resize(224, 224) // Resize the image to 224x224 pixels
    .toBuffer((err, buffer) => {
      if (err) throw err;

      // Create a tensor from the image buffer
      const tensor = tf.browser.fromPixels(buffer, 3);

      // Normalize the pixel values to be between 0 and 1
      const normalized = tensor.toFloat().div(tf.scalar(255));

      // Print the shape of the tensor
      console.log(normalized.shape, "normalisz");
    });
  const imageSize = 224;
  /*  const imageBuffer = fs.readFileSync(path);  */ // can also use the async readFile instead
  // get tensor out of the buffer
  /* image = tf.node.decodeImage(path);
  image = image.cast("float32"); // image ki pixel array ko float kiye n divide kr diye har pixel ko 255 se taaki - n 1 k beech value aa jaye ( pixel 0 se 255 hote)
  // resize the image
  const { mean, variance } = tf.moments(image, 0);
  image = tf.image.resizeBilinear(image, (size = [imageSize, imageSize])); // can also use tf.image.resizeNearestNeighbor
  image = tf.div(tf.sub(image, mean), tf.sqrt(variance)); */
  return image; // shape (1,300,300,4) rehna chahiye
}

const mlfunction = async (req, res) => {
  const newName = "tempImage.png";
  let imagePath = "./public/images/" + newName;

  /* jimp
    .read(req.files.file)
    .then((lenna) => {
      return lenna.write(imagePath); // save
    })
    .catch((err) => {
      console.error(err);
    }); */
  console.log("hello");
  /*  const modeljs = resolve("./Ml_model/model.json");
  console.log(modeljs); */
  const model = await tf.loadLayersModel(
    "http://localhost:8000/Ml_model/model.json"
  );
  /*  console.log(model, "ismodel"); */
  const imageData = req.files.file;

  // Write the image data to a file
  /* fs.writeFile("image.jpg", imageData, "base64", (err) => {
    if (err) throw err;

    // Return a response indicating that the image was saved successfully
  }); */
  const data = processImage(req.files.file);

  // const imageTensor = tf.browser.fromPixels(data);

  /*  const prediction = model.predict(data);

  const tensorArr = prediction.arraySync()[0];
  console.log(tensorArr);
  const maxMatchIdx = tensorArr.indexOf(Math.max(...tensorArr));
  // console.log({ index: maxMatch });
  const confidence =
    (tensorArr[maxMatchIdx] * 100) /
    tensorArr.reduce((partialSum, a) => partialSum + a, 0);
  console.log(confidence.toFixed(2));
  const labels = ["Cyst", "Normal", "Stone", "Tumor"]; */

  res.status(200).json({
    data: {
      name: labels[maxMatchIdx],
      confidence: confidence.toFixed(2),
    },
  });
};
module.exports = { mlfunction };
