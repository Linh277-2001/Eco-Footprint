package com.example.kits2023_backend_v1.controller;

import com.example.kits2023_backend_v1.model.Article;
import com.example.kits2023_backend_v1.repository.ArticleRepository;
import com.example.kits2023_backend_v1.response.GenericApiResponse;
import com.example.kits2023_backend_v1.service.ArticleService;
import com.example.kits2023_backend_v1.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/article")

public class ArticleController {
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    ArticleService articleService;
    @Autowired
    private ImageService imageService;

    @GetMapping("/list")
    public List<Article> getAllArticle(){
        return articleService.getListArticle();
    }

    @GetMapping("/listApproval")
    public ResponseEntity<?> findListArticleToApproval(){
        return articleService.getListArticleToApproval();
    }
    @GetMapping("/{id}")
    public ResponseEntity<GenericApiResponse<Article>> findArticleById(@PathVariable  int id){
        return articleService.getArticleById(id);
    }
    @GetMapping("/{name}")
    public ResponseEntity<GenericApiResponse<Article>> findArticleByName(@RequestParam String  name){
        return articleService.getArticleByName(name);
    }


    @PutMapping("/{id}")
    public Article approveArticle(@PathVariable int id) {
        Optional<Article> a = articleRepository.findById(id);
        if (a.isPresent()) {
            Article article = a.get();
            article.setStatus(true);
            return articleRepository.save(article);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArticleById(@PathVariable int id){
        return articleService.deleteArticleById(id);
    }

    @PostMapping
    public ResponseEntity<?> createArticle(@RequestParam("name") String name, @RequestParam("featureImage") MultipartFile featureImage, @RequestParam("content") MultipartFile content, @RequestParam("userid") int userid) {
        String imageURL = imageService.create(featureImage);
        String contentURL = imageService.create(content);
        return articleService.createArticle(name, imageURL, contentURL, userid);
    }

    @PutMapping("/changeFeature")
    public ResponseEntity<GenericApiResponse<Article>> changeFeatureImage(@RequestParam("featureImage") MultipartFile featureImage, int id) {
        return articleService.changeFeatureImage(id, featureImage);
    }

    @PutMapping("/changeContent")
    public ResponseEntity<GenericApiResponse<Article>> changeContent(@RequestParam("content") MultipartFile content, int id) {
        return articleService.changeContent(id,content);
    }


//    @Value("${firebase.config.path}")
//    private String firebaseConfigPath;
//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadFile(@RequestParam("file")MultipartFile file){
//        try{
//            FileInputStream serviceAcount=new FileInputStream(firebaseConfigPath);
//            FirebaseOptions options=new FirebaseOptions.Builder()
//                    .setCredentials(GoogleCredentials.fromStream(serviceAcount)).build();
//            FirebaseApp.initializeApp(options);
//            // Lưu tệp lên Firebase Storage
//            StorageClient storageClient = StorageClient.getInstance();
//            String fileName = "articles/"+file.getOriginalFilename();
//            storageClient.bucket().create(fileName, file.getInputStream());
//            // Lưu đường dẫn đến Firebase vào Firestore
//            FirestoreOptions firestoreOptions = FirestoreOptions.getDefaultInstance()
//                    .toBuilder().setProjectId("ecofootprint-46f6a")
//                    .build();
//            Firestore firestore = firestoreOptions.getService();
//            DocumentReference document = firestore.collection("articles").document(fileName);
//            Map<String, Object> data=new HashMap<>();
//            data.put("firebaseUrl","gs://ecofootprint-46f6a.appspot.com/"+fileName);
//            document.set(data).get();
//            return ResponseEntity.ok("upload sucsessful");
//        }
//        catch (IOException e){
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error upload file");
//        }
//        catch (Exception e){
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving file URL");
//        }
//    }

}
