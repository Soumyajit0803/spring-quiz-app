package com.spring.quiz_app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    private String category;

    @Column(name = "difficulty_level")
    private String difficultyLevel;

    private String option1;
    private String option2;
    private String option3;

    @Column(name = "correct_option")
    private String correctOption;  // values: "option1", "option2", or "option3"
}
