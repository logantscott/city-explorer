require('dotenv').config();
const { app } = require('./app.js');
const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT} . . .`);
});