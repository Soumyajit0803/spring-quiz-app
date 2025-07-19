package com.spring.quiz_app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.spring.quiz_app.entity.Question;
import com.spring.quiz_app.repository.QuestionRepository;

import java.util.Collections;
import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuestionRepository questionRepository;

    public ResponseEntity<List<Question>> generateQuiz(String category, Integer numQuestions, String difficultyLevel) {
        List<Question> questions;

        if (difficultyLevel != null && !difficultyLevel.isEmpty()) {
            questions = questionRepository.findByDifficultyLevelIgnoreCaseAndCategoryIgnoreCase(difficultyLevel, category);
        } else {
            questions = questionRepository.findByCategoryIgnoreCase(category);
        }

        if (questions.size() < numQuestions) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Not enough questions
        }

        // Shuffle and pick the first x questions
        Collections.shuffle(questions);
        List<Question> quiz = questions.subList(0, numQuestions);

        return ResponseEntity.ok(quiz);
    }

}
