function convert1Dto3D(arr1D) {
  const width = 224;
  const height = 224;
  const channels = 3;
  const arr3D = [];

  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      const pixel = [];
      for (let k = 0; k < channels; k++) {
        pixel.push(arr1D[i * width * channels + j * channels + k]);
      }
      row.push(pixel);
    }
    arr3D.push(row);
  }

  return arr3D;
}
function StandardScaler(data) {
  // Calculate mean and standard deviation of the data
  const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
  const std = Math.sqrt(
    data.reduce((acc, val) => acc + (val - mean) ** 2, 0) / (data.length - 1)
  );

  // Scale the data to have zero mean and unit variance
  const scaledData = data.map((val) => (val - mean) / std);

  return scaledData;
}
