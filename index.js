/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
//const qr_img = require("qr-image"); // module for generating the image
//const inquirer = require('inquirer'); //module for user to give input the URL
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {message:"Enter the URL",
    name: "URL"} // we need to keep curly braces because it is a JS object.
  ])
  .then((answers) => {
    var link = answers.URL;
    var qr_image = qr.image(link);//genetate readable streame with image data
    qr_image.pipe(fs.createWriteStream('qr_image.png')); //converts the readable image data into qr_image.png file.
    fs.writeFile('QR_URl.txt', link, err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });