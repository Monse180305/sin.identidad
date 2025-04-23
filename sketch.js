let bodyPose;
let video;
let poses = [];
let connections;
let painting;
let img;
let img2;


function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose({flipped: true});
}


function mousePressed() {
  console.log(poses);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  // Creamos una capa para graficos
  img = new Image ();
  img.src = "assets/mascara_triste-removebg-preview.png";
  
  img2 = new Image();
  img2.src = "assets/mascara_feliz-removebg-preview.png";

  painting = createGraphics (windowWidth, windowHeight);
  painting.clear();
  // Create the video and hide it
  video = createCapture(VIDEO, {flipped:true}); //para detectar el vídeo
  video.size(windowWidth, windowHeight);
  video.hide();
  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();
}



// Callback function for when the model returns pose data
function gotPoses(results) {
  // Store the model's results in a global variable
  poses = results;
}



function draw() {
  //cuadros de división de color de la pantalla
  //cuadro de la derecha superior


  /*painting.noStroke(); 
  painting.fill (171, 11, 3, 1);
  painting.rect (width/2, 0, width/2, height/2);

  //cuadro de la izquierda superior
  painting.fill(8, 53, 88, 2); //el cuarto valor pertenece a la opacidad o canal alpha, el RGB son canales de colores
  painting.rect(0, 0, width/2, height/2);

  //cuadro de la izquierda inferior 
  painting.fill(255, 255, 255, 1); //la variable painting porque nuestro proyect0 tiene dos capas que es la del vídeo (canvas) y la de dibujo graphics 
  painting.rect(0, height/2, width/2, height/2); //(x, y, w, h)

  //cuadro de la derecha inferior
  painting.fill(0, 0, 0, 1); 
  painting.rect(width/2, height/2, width/2, height/2);*/


  //fill (0, 128, 128);
  //rect (0, 0, width, height);
  
  //Display the video

  image(video, 0, 0, width, height);

  drawingContext.drawImage(img, 500, 200);
  
  
  // conecciones del esqueleto, las líneas
  /*for (let i = 0; i < poses.length; i++) {
    let pose = poses[i]; //lo que está en corchetes es un array, una lista
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if we have confidence in both points
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }*/
  
  
  // Iterate through all the poses
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    // Iterate through all the keypoints for each pose
    for (let j = 0; j < pose.keypoints.length; j++) {
      //let keypoint = pose.keypoints[j];
      let face = pose.keypoints[2];
      
      // Only draw a circle if the keypoint's confidence is greater than 0.1
      /*if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }*/

        //para condicionar que si nuestra muñeca está en un posición aparece un cuadro
        //mano 1
     if (face.confidence > 0.1){  
        fill (0, 255, 0);
        noStroke();
        circle(face.x, face.y, 10);
        drawingContext.drawImage(img2, face.x - 50, face.y - 170);

        // Coordenadas fijas de la máscara
      let fixedX = 500 + 77; 
      let fixedY = 200 + 188;

      // Calcula la distancia
      let d = dist(fixedX, fixedY, face.x, face.y);

      // Mostrar mensaje si están cerca
      if (d < 130) {
       fill(0, 0, 0);
       textSize(30);
       text("¿Eres lo que quieres ser o eres lo que los demás quieren?", 300, 200);
    }
  }

  
     //figura 1
     if(face.x > width/2 && face.y < height/2){
      fill(3, 50, 79);
      //rect(width/2, (height/2)-130, 130, 130);

     }

     //mano 2
     if (face.confidence > 0.1){  
      fill (0, 255, 0);
      noStroke();
      circle(face.x, face.y, 10);
      }
      
      //figura 2
    if(face.x > width/2 && face.y < height/2){
      (3, 50, 79);
      //rect(width/2, (height/2)-130, -130, 130); 
      textSize(32);
      fill(0, 0, 0);
      text('¿Quién eres realmente?', face.x, face.y);
      text('¿Quién eres realmente?', face.x + 20, face.y + 20); 
      textSize(30);
      text('¿Quién eres realmente?', face.x - 28, face.y - 28); 
      textSize(28);
      text('¿Quién eres realmente?', face.x - 47, face.y - 47); 
      textSize(26);
      text('¿Quién eres realmente?', face.x - 62, face.y - 62);
      textSize(24);
      text('¿Quién eres realmente?', face.x - 74, face.y - 74);
      textSize(22);
      text('¿Quién eres realmente?', face.x - 86, face.y - 86);
      textSize(20);
      text('¿Quién eres realmente?', face.x - 98, face.y - 98);


     }
    }
  }
  //Aqui colocamos nuestra capa para dibujar hecha con createGraphics
  image(painting, 0, 0);
}


function windowResized () {
  resizeCanvas (windowWidth, windowHeight);
}