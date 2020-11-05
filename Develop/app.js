"use strict";

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];

async function main() {
    prompts();
}

async function prompts() {
    console.clear();
    console.log("======================================================================");
    inquirer.prompt([
        {
            type:"input",
            name:"name",
            message:"Please enter the employee's name: "    
        },
        {
            type:"input",
            name:"id",
            message:"Please enter the employee's ID: "    
        },
        {
            type:"input",
            name:"email",
            message:"Please enter the employee's Email: "    
        },
        {
            type:"list",
            name:"role",
            message:"Please select the employee's role: ",
            choices: ["Manager", "Engineer", "Intern"],   
        },
    ]).then((data) => {
        promptRole(data);
    });
    
}

async function promptRole(datas) {
    const {role} = datas;
    if (role === "Manager") {
        inquirer.prompt([
            {
                type:"input",
                name:"officeNumber",
                message:"What is your office number? "
            }
    ]).then((data) => {
        const tempData = datas;
        tempData["officeNumber"] = data.officeNumber;

        const manager = new Manager(Object.values(tempData)[0], Object.values(tempData)[1], Object.values(tempData)[2], Object.values(tempData)[4]);
        
        team.push(manager);
        continueAdd();

    })};
    if (role === "Engineer") {
        inquirer.prompt([
            {
                type:"input",
                name:"github",
                message:"What is your Github? "
            }
    ]).then((data) => {
        const tempData = datas;
        tempData["github"] = data.github;

        const emgineer = new Engineer(Object.values(tempData)[0], Object.values(tempData)[1], Object.values(tempData)[2], Object.values(tempData)[4]);

        team.push(emgineer);
        continueAdd();

    })};
    if (role === "Intern") {
        inquirer.prompt([
            {
                type:"input",
                name:"school",
                message:"What school is the employee atttending? "
            }
    ]).then((data) => {
        const tempData = datas;
        tempData["school"] = data.school;
        
        const intern = new Intern(Object.values(tempData)[0], Object.values(tempData)[1], Object.values(tempData)[2], Object.values(tempData)[4]);

        team.push(intern);
        continueAdd();

    });
    };
};


async function continueAdd() {
    inquirer.prompt([
        {
            type: "list",
            name: "finish",
            message: "Do you want to add more employees? ",
            choices: ["Yes", "No"]
        }
    ]).then((data) => {
        if (data.finish === "Yes") {
            prompts();
        } else {
            // console.log(render(team));
            fs.writeFileSync(outputPath, render(team));
            // teamHtml = fs.readFileSync(OUTPUT_DIR, render(team));
            // console.log(teamHtml)
        }
    })
}

main();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (`manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
