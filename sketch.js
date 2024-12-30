let video; // access the cam

let bodyPose; //holds the body pose;

let handPose;

let connections; //to connects the dots

let poses = []; //storing the results data

let hands = []; 

let painting;

let px = 0;
let py = 0;

function preload(){
  bodyPose = ml5.bodyPose("MoveNet" ,{flipped: true}) // loads the body pose form the server
  handPose = ml5.handPose({flipped: true});
}

function gotPoses(results){
  poses = results;  
}

function gotHands(results){
  hands = results;  
}

function mousePressed(){
  console.log(hands)
}

function setup(){
  createCanvas(650, 480); 
  painting = createGraphics(650, 480);
  painting.clear();
  video = createCapture(VIDEO, {flipped: true});
  video.size(650, 480);
  video.hide();
  
  handPose.detectStart(video, gotHands);
  bodyPose.detectStart(video, gotPoses); //detect the live image from the cam contineously 
  // two variables video to get data and gotPose to get back the results
  connections = bodyPose.getSkeleton();
  
}


function draw(){
  image(video, 0, 0);

//   if(poses.length > 0){
//     let pose = poses[0]; //drawing circle on nose with has an index of 0
//     for(let i = 0; i < pose.keypoints.length; i++){  
//       let keypoints = pose.keypoints[i];
//       fill(0, 255, 0);
//       noStroke();
//       if(keypoints.confidence > 0.1){  
//         circle(keypoints.x, keypoints.y, 10); 
//         for(let j = 0; j < connections.length; j++){
//           let connection = connections[j];
//           let a = connection[0];
//           let b = connection[1];
//           let keyPointA = pose.keypoints[a];
//           let keyPointB = pose.keypoints[b];
//           if(keyPointA.confidence > 0.1 && keyPointB.confidence > 0.1){
//           stroke(0, 0, 255);
//           strokeWeight(5);
//           line(keyPointA.x, keyPointA.y, keyPointB.x, keyPointB.y)
//         }
//         }
        
//       }
//     }
    //hands
//   for(let i = 0; i < hands.length; i++){
//     let hand = hands[i];
//     for(let i = 0; i < hand.keypoints.length; i++){
//         let keypoint = hand.keypoints[i];
//         fill(255,0,255);
//         noStroke();
//         circle(keypoint.x, keypoint.y, 10);
//     }

//   }
    if(hands.length > 0){
      let hand = hands[0];
      let index = hand.index_finger_tip;
      let thumb = hand.thumb_tip;
      let x = (index.x + thumb.x) * 0.5;
      let y = (index.y + thumb.y) * 0.5;
      
      let d = dist(index.x, index.y, thumb.x, thumb.y );
      
      if( d < 30){
        painting.stroke(0,255,0);
        painting.strokeWeight(8);
        painting.line(px, py, x, y);
      }
       px = x;
      py = y; 
    }
 image(painting, 0, 0);

  //Make size of a circle bigger with hands distance
    // let rx = pose.right_wrist.x;
    // let ry = pose.right_wrist.y;

    // let lx = pose.left_wrist.x;
    // let ly = pose.left_wrist.y;

    //  fill(0,0,255);
    // circle(rx,ry,10);
    
    
    //  fill(0,255, 0);
    // circle(lx,ly,10);
    
    // let d = dist(rx,ry,lx,ly);
    
    // fill(255, 0, 0);
    // circle(x, y, d); //change of size of nose depending on the distance between the two writ pts.

  //}
  
}