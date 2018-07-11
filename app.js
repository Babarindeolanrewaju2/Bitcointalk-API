const express = require("express");
const axios = require("axios");
const config  = require("./config");
const app     = express();
const jsdom = require("jsdom").JSDOM;



app.get("/users/:uid/signature", (req, res)=>{
    const btalkProfile = `https://bitcointalk.org/index.php?action=profile;u=${req.params.uid}`;

    axios.get(btalkProfile)
        .then((response)=>{
            if(response.status !== 200){
                return res.json({error: true, data: {error: "Error 404"}});
            }
            const html = response.data;
            const dom = new jsdom(html);
            const test = dom.window.document.getElementsByClassName("signature")[0];

            res.json({error: false, data: {signature: test.innerHTML}});
        })
        .catch((err)=> res.send({error: true, data: {error: err}}));
});

app.get("/users/:uid/level", (req, res)=>{
    const btalkProfile = `https://bitcointalk.org/index.php?action=profile;u=${req.params.uid}`;

    axios.get(btalkProfile)
        .then((response)=>{
            if(response.status !== 200){
                return res.json({error: true, data: {error: "Error 404"}});
            }
            const html = response.data;
            const dom = new jsdom(html);
            const windowbg = dom.window.document.getElementsByClassName("windowbg");
            const table = windowbg[0].getElementsByTagName("table");
            const tbody = table[0].getElementsByTagName("tbody");
            const tr = tbody[0].getElementsByTagName("tr");
            const positionSec = tr[4].getElementsByTagName("td");
            const level =  positionSec[1].innerHTML;

            res.json({error: false, data: { level }});
        })
        .catch((err)=>{
            console.log(err);
            res.send({error: true, data: {error: err}})
        });
});


app.get("/users/:uid/posts/count", (req, res)=>{

    const btalkPost = `https://bitcointalk.org/index.php?action=profile;u=${req.params.uid};sa=showPosts;start=0`;

    axios.get(btalkPost)
        .then((response)=>{
            if(response.status !== 200){
                return res.json({error: true, data: {error: "Error 404"}});
            }

            let count = 0;

            const html = response.data;
            const dom = new jsdom(html);

            const body = dom.window.document.getElementById("bodyarea");

            const titleBlock = body.getElementsByClassName("titlebg2");

            for(let i = 0; i < 20; i++){
                const title = titleBlock[i].getElementsByTagName("td");
                if(title[2].innerHTML.includes("Today")){
                    count++;
                }
            }

            res.json({error: false, data: { count }});

        })
        .catch((err)=> res.send({error: true, data: {error: err}}));
});

app.listen(config.port, ()=>{
    console.log("Api started on", config.port);
});

module.exports = app;