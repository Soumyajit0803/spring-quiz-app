package com.spring.quiz_app.service;

import com.spring.quiz_app.entity.Question;
import com.spring.quiz_app.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return ResponseEntity.ok(questions);
    }

    public ResponseEntity<List<Question>> getQuestions(String difficultyLevel, String category) {
        List<Question> questions;

        if (difficultyLevel != null && category != null) {
            questions = questionRepository.findByDifficultyLevelIgnoreCaseAndCategoryIgnoreCase(difficultyLevel, category);
        } else if (difficultyLevel != null) {
            questions = questionRepository.findByDifficultyLevelIgnoreCase(difficultyLevel);
        } else if (category != null) {
            questions = questionRepository.findByCategoryIgnoreCase(category);
        } else {
            questions = questionRepository.findAll();
        }

        if (questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(questions);
    }


    public ResponseEntity<Question> addQuestion(Question question) {
        if (question == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Question saved = questionRepository.save(question);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    public ResponseEntity<Question> updateQuestion(Question question) {
        if (question == null || question.getId() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Optional<Question> existing = questionRepository.findById(question.getId());
        if (existing.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Question updated = questionRepository.save(question);
        return ResponseEntity.ok(updated);
    }

    public ResponseEntity<Void> deleteQuestion(Integer id) {
        if (!questionRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        questionRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity<Question> getQuestionById(Integer id) {
        Optional<Question> question = questionRepository.findById(id);
        return question.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
