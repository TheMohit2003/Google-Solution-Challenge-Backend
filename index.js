const app = require('./app');

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
