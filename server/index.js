const express = require('express');
const { postUsers} = require("./handlers")
const app = express();

app.use(express.json())
app.use(express.static("public"))

app.post("/post-users", postUsers)


app.get('/', (req, res) => {
   res.send('Hello World');
})

app.listen(8000, () => console.log("Listening on port 8000"));
