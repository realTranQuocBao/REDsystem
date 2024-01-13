import express from "express";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Hello Bao <3");
});

app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
})