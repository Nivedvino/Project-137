video = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(390, 390);
    canvas.center();
}

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function draw() {
    image(video, 0, 0, 390, 390);
    if (status != "") {
        objectdetector.detect(video, gotResult)
    }
    for (let i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        document.getElementById("status").innerHTML = "Number of Objects Detected" + objects.length;
        fill("#0000F");
        percent = floor(objects[i].confidence * 100);
        stroke("#0000F");
        noFill("#0000F");
        text(objects[i].label + percent + "%", objects[i].x, object[i].y);
        rect(objects[i].x, object[i].y, objects[i].width, object[i].height);
    }
}

function start() {
    objectdetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
    video.speed(1);
    video.volume(1);
    video.loop();
}

function gotResult() {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}