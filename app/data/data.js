const texts = Array.from({ length: 6 }, (_, i) => String.fromCharCode(65 + i)); // Generates ['A', 'B', 'C', ..., 'J']
const data = texts.map((text, index) => ({
  key: (index + 1).toString(),
  text: text,
  backgroundImage: require('../assets/sample.jpg'),
}));

export default data;