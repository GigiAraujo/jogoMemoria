import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const COLORS = [
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333',
  '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900',
  '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66',
  '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300',
  '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066',
  '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00',
  '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D',
  '#99E6E6', '#6666FF'
];

const NUM_PAIRS = 6;

const App = () => {
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    if (correct.length === NUM_PAIRS * 2) {
      setGameOver(true);
      Alert.alert('Parabéns!', 'Você encontrou todos os pares!', [{ text: 'OK', onPress: newGame }]);
    }
  }, [correct]);

  const shuffleColors = (array) => {
    const shuffled = array.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, NUM_PAIRS);
  };

  const newGame = () => {
    const shuffledColors = shuffleColors(COLORS);
    const newBoard = [...shuffledColors, ...shuffledColors];
    setBoard(newBoard.sort(() => Math.random() - 0.5));
    setSelected([]);
    setCorrect([]);
    setGameOver(false);
  };

  const handleCardClick = (index) => {
    if (selected.length === 2 || correct.includes(index) || gameOver) return;

    setSelected([...selected, index]);

    if (selected.length === 1) {
      if (board[selected[0]] === board[index]) {
        setCorrect([...correct, selected[0], index]);
        setSelected([]);
      } else {
        setTimeout(() => setSelected([]), 1000);
      }
    }
  };

  const renderBoard = () => {
    return board.map((color, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.card,
          {
            backgroundColor: selected.includes(index) || correct.includes(index) ? color : 'gray',
          },
        ]}
        onPress={() => handleCardClick(index)}
      >
        {/* Removido o ponto de interrogação */}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Memória</Text>
      <View style={styles.board}>{renderBoard()}</View>
      <TouchableOpacity style={styles.button} onPress={newGame}>
        <Text style={styles.buttonText}>Novo Jogo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  card: {
    width: 80,
    height: 80,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default App;
