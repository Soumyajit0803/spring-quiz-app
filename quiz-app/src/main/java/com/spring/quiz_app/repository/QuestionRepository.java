package com.spring.quiz_app.repository;

import com.spring.quiz_app.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByDifficultyLevelIgnoreCase(String difficultyLevel);

    List<com.spring.quiz_app.entity.Question> findByCategoryIgnoreCase(String category);

    List<com.spring.quiz_app.entity.Question> findByDifficultyLevelIgnoreCaseAndCategoryIgnoreCase(String difficultyLevel, String category);
}
