package com.spring.quiz_app.controller;

import com.spring.quiz_app.entity.Question;
import com.spring.quiz_app.service.QuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
@CrossOrigin(
        origins = "http://localhost:5173",
        methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS }
)

@Tag(name = "Question Controller", description = "APIs for handling quiz questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Operation(summary = "Get questions by difficulty/category", description = "Returns all questions or filters by difficulty and/or category if provided")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Questions found"),
            @ApiResponse(responseCode = "404", description = "No questions found")
    })
    @GetMapping
    public ResponseEntity<List<Question>> getQuestions(
            @RequestParam(required = false) String difficultyLevel,
            @RequestParam(required = false) String category) {
        return questionService.getQuestions(difficultyLevel, category);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(
            @PathVariable Integer id
    ){
        return questionService.getQuestionById(id);
    }


    @Operation(summary = "Add a new question", description = "Adds a new question to the database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Question created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        return questionService.addQuestion(question);
    }

    @Operation(summary = "Edit a question", description = "Edit an existing question from the database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Question updated successfully"),
            @ApiResponse(responseCode = "404", description = "Question not found"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(
            @RequestBody Question question,
            @PathVariable Integer id
    ){
        return questionService.updateQuestion(question);
    }

    @Operation(summary = "Delete question", description = "Delete an existing question from database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Question deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Question not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(
            @PathVariable Integer id
    ){
        return questionService.deleteQuestion(id);
    }

}
