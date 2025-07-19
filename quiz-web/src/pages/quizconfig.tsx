import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizConfigForm() {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [count, setCount] = useState(5);

  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/quiz/start?category=${category}&count=${count}` + (difficulty ? `&difficulty=${difficulty}` : ''));
  };

  return (
    <Box p={3} display="flex" flexDirection="column" gap={2} maxWidth={400}>
      <Typography variant="h5" fontWeight="bold">
        Start a Quiz
      </Typography>

      <TextField
        label="Category"
        variant="outlined"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Difficulty</InputLabel>
        <Select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          label="Difficulty"
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Number of Questions"
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        inputProps={{ min: 1 }}
        fullWidth
      />

      <Button variant="contained" color="primary" onClick={handleStart}>
        Start Quiz
      </Button>
    </Box>
  );
}
