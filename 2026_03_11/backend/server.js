import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

let posts = [
    {
        id: 1,
        userId: 1,
        title: "Pierwszy post",
        body: "To jest treść pierwszego posta"
    },
    {
        id: 2,
        userId: 2,
        title: "Jak się robi post",
        body: "Posta się dodaje"
    },
    {
        id: 3,
        userId: 1,
        title: "Drugi post jest lepiej",
        body: "To jest lepsza treść drugiego posta"
    }
];

let comments = [
    {
        id: 1,
        postId: 1,
        name: "Jan",
        email: "jan@test.pl",
        body: "Świetny wpis!"
    },
    {
        id: 2,
        postId: 3,
        name: "Adam",
        email: "adam@ciwryj.pl",
        body: "Dobrze idzie podpisano Adam Ciwryj!"
    }
];

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.get("/posts/:id", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const postComments = comments.filter(c => c.postId == req.params.id);

    res.json({
        ...post,
        comments: postComments
    });
});

app.post("/posts/:id/comments", (req, res) => {
    const newComment = {
        id: comments.length + 1,
        postId: Number(req.params.id),
        name: req.body.name,
        email: req.body.email,
        body: req.body.body
    };

    comments.push(newComment);

    const postComments = comments.filter(c => c.postId == req.params.id);

    res.json(postComments);
});

app.listen(5000, () => {
    console.log("Server działa na porcie 5000");
});