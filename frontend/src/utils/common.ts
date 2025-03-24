/**
 *
 * Function for generating dummy test data for heatmap chart
 *
 */
export const generateData = (
  count: number,
  yrange: { max: number; min: number }
) => {
  let i = 0;
  const series = [];

  while (i < count) {
    const x = (i + 1).toString();
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y,
    });
    i++;
  }
  return series;
};
