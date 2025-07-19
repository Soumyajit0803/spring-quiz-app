import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Card, CardContent, Typography, RadioGroup,
  FormControlLabel, Radio, Button, Snackbar
} from '@mui/material';

interface Question {
  id: number;
  questionText: string;
  category: string;
  difficultyLevel: string;
  option1: string;
  option2: string;
  option3: string;
  correctOption: string;
}

export default function QuizPage() {
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [id: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category') || '';
    const difficulty = searchParams.get('difficulty') || '';
    const count = searchParams.get('count') || '5';

    const fetchQuestions = async () => {
      const res = await fetch(`http://localhost:8080/quiz?category=${category}&count=${count}` + (difficulty ? `&difficulty=${difficulty}` : ''));
      const data = await res.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, [searchParams]);

  const handleAnswer = (id: number, selected: string) => {
    setAnswers(prev => ({ ...prev, [id]: selected }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctOption) correct++;
    });
    setScore(correct);
    setOpen(true);
  };

  useEffect(() => {
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = ''; // Required for modern browsers to show the prompt
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, []);


  return (
    <div style={{ padding: '1rem' }}>
      {questions.map((q, idx) => {
  const userAnswer = answers[q.id];
  const isCorrect = userAnswer === q.correctOption;
  const isSubmitted = score !== null;

  return (
    <Card key={q.id} style={{ marginBottom: '1rem' }}>
      <CardContent>
        <Typography
          variant="h6"
          style={{
            color: isSubmitted
              ? isCorrect
                ? 'green'
                : 'red'
              : 'inherit'
          }}
        >
          Q{idx + 1}. {q.questionText}
        </Typography>

        <RadioGroup
          value={userAnswer || ''}
          onChange={(e) => handleAnswer(q.id, e.target.value)}
        >
          <FormControlLabel value="option1" control={<Radio />} label={q.option1} disabled={isSubmitted} />
          <FormControlLabel value="option2" control={<Radio />} label={q.option2} disabled={isSubmitted} />
          <FormControlLabel value="option3" control={<Radio />} label={q.option3} disabled={isSubmitted} />
        </RadioGroup>

        {isSubmitted && !isCorrect && (
          <Typography variant="body2" color="textSecondary">
            Correct Answer: {q[q.correctOption as keyof Question]}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
})}


      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={questions.length === 0}
      >
        Submit Quiz
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={`You scored ${score} out of ${questions.length}`}
      />
    </div>
  );
}
