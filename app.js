const express = require('express');
var morgan = require('morgan');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const cohorts = require("./cohorts.json")
app.use(morgan('tiny'));



function findById(data, id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            return data[i];
        }
    }
    return null;
}


app.use(cors());

app.get("/", function (request, response) {
    response.json({
        data: cohorts
    });
});

app.get("/:id", function (request, response) {
    var record = findById(cohorts, request.params.id);
    if (!record) {
        response.status(404).json({
            error: {
                message: "No record found!"
            }
        });
    } else {

        response.json({
            data: record
        });

    }
})

app.listen(port, () => {

    console.log("server running")


})