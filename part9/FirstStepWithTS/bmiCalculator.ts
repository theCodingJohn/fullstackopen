const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = (weight / Math.pow(height, 2)) * 10000;

  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal (healthy weight)";
  if (bmi > 25) return "Overweight";
}

console.log(calculateBmi(180, 74));