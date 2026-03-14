router.post("/", uploadMiddleware, auth, createPost);

router.get("/", auth, getAllPosts);

router.get("/my-posts", auth, getMyPosts); // move this UP

router.get("/:id", auth, getSinglePost);

router.delete("/:id", auth, deletePost);

router.post("/like/:id", auth, likePost);

router.post("/dislike/:id", auth, dislikePost);;

const router = express.Router();

router.post("/", uploadMiddleware, auth, createPost);
router.get("/", auth, getAllPosts);
router.get("/:id", auth, getSinglePost);
router.delete("/:id", auth, deletePost);
router.post("/like/:id", auth, likePost);
router.post("/dislike/:id", auth, dislikePost);
router.get("/my-posts", auth, getMyPosts);

export default router;