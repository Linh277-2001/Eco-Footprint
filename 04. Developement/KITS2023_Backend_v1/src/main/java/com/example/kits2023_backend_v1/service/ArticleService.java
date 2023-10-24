package com.example.kits2023_backend_v1.service;

import com.example.kits2023_backend_v1.model.Article;
import com.example.kits2023_backend_v1.model.User;
import com.example.kits2023_backend_v1.repository.ArticleRepository;
import com.example.kits2023_backend_v1.repository.UserRepository;
import com.example.kits2023_backend_v1.response.GenericApiResponse;
import com.example.kits2023_backend_v1.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {
    @Autowired
    ArticleRepository articleRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ImageService imageService;

    public List<Article> getListArticle(){
        return  articleRepository.findAll();
    }
    public ResponseEntity<?> getListArticleToApproval(){
        List<Article> articles = articleRepository.getListArticleToApproval();
        if(articles.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No posts need approval.");
        }
        else{
            return ResponseEntity.ok(articles);
        }
    }

    public ResponseEntity<GenericApiResponse<Article>> getArticleById(int id){
        Optional<Article> article = articleRepository.findArticleById(id);
        if(article.isPresent()){
            GenericApiResponse<Article> apiResponse = new GenericApiResponse<>("" ,"200", article.get());
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        }
        else{
            GenericApiResponse<Article> apiResponse = new GenericApiResponse<>("Article with ID " + id + " does not exist.", "404", null);
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<GenericApiResponse<Article>> getArticleByName(String name){
        Optional<Article> article = articleRepository.findArticleByName(name);
        if(article.isPresent()){
            GenericApiResponse<Article> apiResponse = new GenericApiResponse<>("" ,"200", article.get());
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        }
        else{
            GenericApiResponse<Article> apiResponse = new GenericApiResponse<>("Article with name " + name + " does not exist.", "404", null);
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> createArticle(String name, String featureImage, String content, int userId) {
        Optional<Article> a = articleRepository.findArticleByName(name);
        if (a.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Article's name is already taken!"));

        } else {

            Article article = new Article();
            article.setName(name);
            article.setFeatureImage(featureImage);
            article.setContent(content);
            article.setStatus(false);

            // Lấy thông tin user từ UserRepository
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            article.setUser(user);

            articleRepository.save(article);
            return ResponseEntity.ok(new MessageResponse("Create Article successfully!"));
        }
    }

        public ResponseEntity<GenericApiResponse<Article>> changeFeatureImage ( int id, MultipartFile featureImage){
            Optional<Article> article = articleRepository.findById(id);
            if (article.isPresent()) {
                Article article1 = article.get();
                String newFeatureImage = imageService.create(featureImage);
                article1.setFeatureImage(newFeatureImage);
                // New password matches old password
                articleRepository.save(article1);
                GenericApiResponse<Article> apiResponse = new GenericApiResponse<>("Feature image has changed", "200", article1);
                return new ResponseEntity<>(apiResponse, HttpStatus.OK);
            } else {
                GenericApiResponse<Article> apiResponse = new GenericApiResponse<>("Article with ID " + id + " does not exist.", "404", null);
                return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
            }
        }
    public ResponseEntity<GenericApiResponse<Article>> changeContent ( int id, MultipartFile content){
        Optional<Article> article = articleRepository.findById(id);
        if (article.isPresent()) {
            Article article1 = article.get();
            String newFeatureImage = imageService.create(content);
            article1.setFeatureImage(newFeatureImage);
            // New password matches old password
            articleRepository.save(article1);
            GenericApiResponse<Article> apiResponse = new GenericApiResponse<>("Content has changed", "200", article1);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } else {
            GenericApiResponse<Article> apiResponse = new GenericApiResponse<>("Article with ID " + id + " does not exist.", "404", null);
            return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<?> deleteArticleById(int id) {
        Optional<Article> article = articleRepository.findById(id);
        if (article.isPresent()) {
            articleRepository.delete(article.get());

            return ResponseEntity.ok(new MessageResponse("The article has been deleted"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Article not found"));
        }
    }

    }
