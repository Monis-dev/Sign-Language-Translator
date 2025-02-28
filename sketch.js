let video; // access the cam

let handPose;

let connections; //to connects the dots

let hands = []; 

let stack = [];

const itemsToAdd = [];

let total = 0;

const Myname = 'Monis';

const custome =" Model"
const custome2 = 'Project'


let lerpedPosition = {
  thumb: {x:0, y:0},
  index: {x:0, y:0},
  middle: {x:0, y:0},
  ring: {x:0, y:0},
  pinky: {x:0, y:0},
}

function preload(){
  handPose = ml5.handPose({flipped: true});
}

function gotHands(results){
  hands = results;  
}

function mousePressed(){
  console.log(hands)
}

function setup(){
  createCanvas(650, 480); 
  video = createCapture(VIDEO, {flipped: true});
  video.size(650, 480);
  video.hide();
  
  handPose.detectStart(video, gotHands);
}


function draw(){
  image(video, 0, 0);

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
  if (hands.length > 0) {
    let hand = hands[0]
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_ip;
    let pinky = hand.pinky_finger_dip;
    let middle = hand.middle_finger_dip;
    let ring = hand.ring_finger_mcp;
    let wrist = hand.wrist;
      
    
      lerpedPosition.index= calculateLarp(lerpedPosition.index, index.x,index.y);
      lerpedPosition.thumb= calculateLarp(lerpedPosition.thumb, thumb.x,thumb.y);
      lerpedPosition.middle= calculateLarp(lerpedPosition.middle, middle.x,middle.y);
      lerpedPosition.ring= calculateLarp(lerpedPosition.ring, ring.x,ring.y);
      lerpedPosition.pinky= calculateLarp(lerpedPosition.pinky, pinky.x,pinky.y);
      
    //   let firstAngle = calculateAngle(
    //   lerpedPosition.thumb.x,lerpedPosition.thumb.y,
    //   lerpedPosition.index.x,lerpedPosition.index.y,
    //   lerpedPosition.pinky.x,lerpedPosition.pinky.y
    // );
    //   let secondAngle = calculateAngle(
    //   lerpedPosition.ring.x,lerpedPosition.ring.y,
    //   lerpedPosition.middle.x,lerpedPosition.middle.y,
    //   lerpedPosition.pinky.x,lerpedPosition.pinky.y
    // );
    //   let total = ((firstAngle + secondAngle) / 10) ;
    total = calculateAngleSum(hand) 
    fill(255, 0, 0);
      console.log("Total", total);
      detectHandPose(total);
  // Draw circles

      circle(lerpedPosition.index.x, lerpedPosition.index.y, 10);
      circle(lerpedPosition.thumb.x, lerpedPosition.thumb.y, 10);
      circle(lerpedPosition.middle.x, lerpedPosition.middle.y, 10);
      circle(lerpedPosition.ring.x, lerpedPosition.ring.y, 10);
      circle(lerpedPosition.pinky.x, lerpedPosition.pinky.y, 10);
      circle(wrist.x, wrist.y, 10);
      return total;
  }
}

function calculateAngleSum(hand){
  let firstAngle = calculateAngle(
    lerpedPosition.thumb.x,lerpedPosition.thumb.y,
    lerpedPosition.index.x,lerpedPosition.index.y,
    lerpedPosition.pinky.x,lerpedPosition.pinky.y
  );
    let secondAngle = calculateAngle(
    lerpedPosition.ring.x,lerpedPosition.ring.y,
    lerpedPosition.middle.x,lerpedPosition.middle.y,
    lerpedPosition.pinky.x,lerpedPosition.pinky.y
  );
 
  return ((firstAngle + secondAngle) / 10) ;
}

//Calculate angle between thumb, index finger, and middle finger
// function detectHandPose(a){
//    let hand = hands[0]
//       let index = hand.index_finger_tip;
//       let thumb = hand.thumb_ip;
//       let thumbT = hand.thumb_tip;
//       let pinky = hand.pinky_finger_dip;
//       let middle = hand.middle_finger_dip;
//       let ring = hand.ring_finger_mcp;
//       let middleT = hand.middle_finger_tip;
//       let wrist = hand.wrist;

//       let d = dist(index.x, index.y, middleT.x, middleT.y);
//       let d2 = dist(middle.x, middle.y, middleT.x, middleT.y)

//   if(hand.handedness == 'Left'){
//     if(a >= 22.5 && a < 24.5 && index.x < wrist.x){
//       console.log("Hello");
//       checkText("Hello");
//       return "Hello"
//     } else if(a > 21.5 && a < 23.5 && d2 < 15 && index.x > thumb.x && index.y > thumbT.y && thumb.y < ring.y && middleT.y > index.y){
//       console.log("I am");
//       checkText("I am");
//     } else if (a > 23.5 && a < 24.5 && wrist.y < index.y && wrist.y < ring.y && pinky.y < index.y && index.y < middleT.y) {
//       console.log(Myname);
//       checkText(Myname);
//     } else if (a > 27.5 && a < 29.8 && wrist.y < index.y && middleT.y < thumbT.y && thumbT.x < index.x ) {
//       console.log("This is");
//       checkText("This is");
//     } else if (a > 23.5 && a < 25.8 && d < 30 && wrist.x < ring.x && wrist.x < pinky.x && thumb.x < ring.x) {
//       console.log("My");
//       checkText("My");
//     } else if (a > 30.5 && a < 33.8 && thumbT.x < index.x && thumbT.x < middle.x && index.y > middle.y && dist(ring.x, ring.y, pinky.x, pinky.y) < 20) {
//       console.log("M");
//       checkText("M");
//     } else if (a > 26.5 && a < 28.8 && index.y < middleT.y  && middle.y > ring.y && pinky.y > ring.y && index.x < thumb.x && middleT.y > pinky.y) {
//       console.log("L");
//       checkText("L");
//     } else if (a > 32.5 && a < 35.5 && thumb.x < index.x && thumbT.x < middle.x && thumbT.x < index.x && pinky.y < thumb.y ) {
//       console.log(custome);
//       checkText(custome + "" + custome2);
      
//     }

//     //ASL Letters
//   //   if(a >= 18.9 && a < 22 && index.y > thumb.y && pinky.y > ring.y){
//   //       console.log("A");
          
//   //       checkText("A");
//   //   } else if(a >= 27 && a <= 29.2 && middle.x > thumb.x && pinky.y < thumb.y){
//   //       console.log("B");
          
//   //       checkText("B");
//   //   // } else if( a >= 26.5 && a <= 27.6 && index.x < thumb.x ){
//   //   //   console.log("C");
//   //   } else if( a >= 31.5 && a <= 33.1 && middleT.y > index.y && middleT.x < index.x){
//   //        console.log("D");
          
//   //       checkText("D");
//   //   // } else if( a >= 25 && a <= 26.4 ){
//   //   //   console.log("E");
//   //   } else if( a >= 14.3 && a <= 17.2 && middle.y < index.y &&  pinky.y < index.y && ring.y > middle.y){
//   //        console.log("F");
          
//   //       checkText("F");
//   //  } else if( a >= 25 && a <= 26.4 && index.x < thumb.x ){
//   //       console.log("G");
          
//   //       checkText("G");
//   //   } else if( a >= 33.5 && a <= 34.5 && index.x < thumb.x && middle.x < thumb.x){
//   //       console.log("H");
          
//   //       checkText("H");
//   //   }
//   }
  
//   if(hand.handedness == 'Right'){
//     if(a > 23.5 && a < 24.5 && index.x > wrist.x){
//       console.log("Hello");
//       checkText("Hello");
//     } else if(a > 22.5 && a < 24.5 && index.x < thumb.x && index.y > thumbT.y && thumbT.y < ring.y){
//       console.log("I am");
//       checkText("I am");
//     } else if (a > 25.5 && a < 27.1 && wrist.y < index.y && wrist.y < ring.y && pinky.y < index.y && index.y < middleT.y) {
//       console.log(Myname);
//       checkText(Myname);
//     } else if (a > 27.5 && a < 29.8 && wrist.y < index.y && middleT.y < thumbT.y && thumbT.x > index.x && index.y < thumbT.y ) {
//       console.log("This is");
//       checkText("This is");
//     } else if (a > 23.5 && a < 25.8 && wrist.x > ring.x ) {
//       console.log("My");
//       checkText("My");
//     }
//   }

// }

function detectHandPose(a){
   let hand = hands[0]
      let index = hand.index_finger_tip;
      let thumb = hand.thumb_ip;
      let thumbT = hand.thumb_tip;
      let pinky = hand.pinky_finger_dip;
      let pinkyT = hand.pinky_finger_tip;
      let middle = hand.middle_finger_dip;
      let ring = hand.ring_finger_mcp;
      let middleT = hand.middle_finger_tip;
      let wrist = hand.wrist;
      
  if(a >= 18.9 && a < 22 && index.y > thumb.y && pinky.y > ring.y && pinkyT.y < index.y  && dist(middleT.x, middleT.y, index.x, index.y) < 15){
    console.log("A");
    checkText("A");
  } else if(a >= 27 && a <= 29.2 && middle.x > thumb.x && pinky.y < thumb.y){
    console.log("B");
    checkText("B");
  // } else if( a >= 26.5 && a <= 27.6 && index.x < thumb.x ){
  //   console.log("C");
  } else if( a >= 31.5 && a <= 33.1 && middleT.y > index.y && middleT.x < index.x && dist(ring.x, ring.y, middle.x, middle.y) < 20 && pinkyT.y > index.y && dist(index.x, index.y, middle.x, middle.y) > 30 && index.x < thumb.x){
    console.log("D");
    checkText("D");
  // } else if( a >= 25 && a <= 26.4 ){
  //   console.log("E");
  } else if( a >= 14.3 && a <= 17.2 && middle.y < index.y &&  pinky.y < index.y && ring.y > middle.y && pinkyT.y > middleT.y && index.y > middleT.y){
    console.log("F");
    checkText("F");
  } else if( a >= 27.2 && a <= 29.1 && index.x < thumb.x && thumbT.y < middleT.y && dist(middle.x, middle.y, ring.x, ring.y) < 15 ){
    console.log("G");
    checkText("G");
  } else if( a >= 33.5 && a <= 34.5 && index.x < thumb.x && middle.x < thumb.x){
    console.log("H");
    checkText("H");
  } else if( a >= 21.9 && a <= 23.5 && pinkyT.y < middleT.y && pinkyT.y < index.y && pinkyT.y < middle.y && dist(middle.x, middle.y, thumbT.x, thumbT.y) < 20 && wrist.x < index.x){
    console.log("I");
    checkText("I");
  } else if( a >= 24.2 && a <= 26.2 && wrist.x > index.x && wrist.x > middle.x && dist(middle.x, middle.y, thumbT.x, thumbT.y) < 20 ){
    console.log("J");
    checkText("J");
  } else if (a > 30.5 && a < 33.8 && thumbT.x < index.x && thumbT.x < middle.x && index.y > middle.y && dist(ring.x, ring.y, pinky.x, pinky.y) < 20) {
    console.log("M");
    checkText("M");
  } else if (a > 26.5 && a < 28.8 && index.y < middleT.y  && middle.y > ring.y && pinky.y > ring.y && index.x < thumb.x && middleT.y > pinky.y) {
    console.log("L");
    checkText("L");
  } else if (a > 32.5 && a < 34.2 && index.x > thumb.x && ring.y > index.y && pinkyT.y > middle.y ) {
    console.log("K");
    checkText("K");
  }

}

function calculateLarp(lerpedPos,x, y)
{
    lerpedPos.x = lerp(lerpedPos.x, x, 0.3);
    lerpedPos.y = lerp(lerpedPos.y, y, 0.3);
  return lerpedPos;
} 

//Calculate angle 
function calculateAngle(x1, y1, x2, y2, x3, y3) {
  let v1 = { x: x2 - x1, y: y2 - y1 }; // Vector 1 (from joint 1 to joint 2)
  let v2 = { x: x3 - x2, y: y3 - y2 }; // Vector 2 (from joint 2 to joint 3)

  let dotProduct = v1.x * v2.x + v1.y * v2.y; // Dot product
  let magV1 = Math.sqrt(v1.x ** 2 + v1.y ** 2); // Magnitude of vector 1
  let magV2 = Math.sqrt(v2.x ** 2 + v2.y ** 2); // Magnitude of vector 2

  let angle = Math.acos(dotProduct / (magV1 * magV2)); // Angle in radians
  return angle * (180 / Math.PI); // Convert to degrees
}

function displayText(text){
  let ulElement = document.querySelector("ul");
  
  let liElement = document.createElement("li");
  
  liElement.innerHTML = text;
  
  ulElement.appendChild(liElement);
  // setTimeout(()=>{
  //   if (ulElement.firstElementChild) {
  //     ulElement.removeChild(ulElement.firstElementChild);
  //   }
  // }, 9000)
  
}

function peek() {
  return stack[stack.length - 1];
}

const synth = window.speechSynthesis;


function checkText(Text){ //remove contineous repetation of words
  let checkValue = peek();
  if(checkValue != Text){
    stack.push(Text);
    displayText(Text);
    speakGesture(Text);
  }
}

function speakGesture(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  var voices = synth.getVoices();
  utterance.lang = voices[1]; // Language
  utterance.pitch = 0.8; // Voice pitch
  utterance.rate = 0.7; // Speech rate
  utterance.volume = 1; // Volume
  synth.speak(utterance); // Use Speech Synthesis API to speak text
  console.log("Available Voices:");
  voices.forEach((voice, index) => {
    console.log(`${index}: ${voice.name} (${voice.lang}) ${voice.default ? "- Default" : ""}`);
  });
}



document.addEventListener("DOMContentLoaded", () => {
  
  itemsToAdd.forEach(item => {
      displayText(item); // Call function to display each item
  });
});

