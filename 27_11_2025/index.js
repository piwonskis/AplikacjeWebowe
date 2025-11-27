const express = require('express');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');
const categoriesRouter = require('./routes/categories');
const commentsRouter = require('./routes/comments');

const app = express();
app.use(bodyParser.json());

app.use('/categories', categoriesRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    next()
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
