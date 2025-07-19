package com.spring.quiz_app.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.spring.quiz_app.entity.Question;
import com.spring.quiz_app.service.QuizService;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(
        origins = "http://localhost:5173",
        methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS }
)

@Tag(name = "Quiz Controller", description = "APIs for handling quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @Operation(summary = "Generate a quiz", description = "Returns a list of random questions filtered by category and optionally by difficulty level")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Quiz generated successfully"),
            @ApiResponse(responseCode = "400", description = "Not enough questions or invalid input"),
            @ApiResponse(responseCode = "404", description = "No questions found")
    })
    @GetMapping()
    public ResponseEntity<List<Question>> generateQuiz(
            @RequestParam String category,
            @RequestParam Integer count,
            @RequestParam(required = false) String difficultyLevel
    ) {
        return quizService.generateQuiz(category, count, difficultyLevel);
    }
}
