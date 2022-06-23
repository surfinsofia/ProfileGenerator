//packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { generateMarkdown } = require('./generateMarkdown');


// array of questions for user input
// all roles include: name, id, email
// differences between roles are:
// manager has office number, engineer has github, intern has school
const init = () => {

    inquirer.prompt([

        // Basic + Manager questions
        {
            name: "ManagerName",
            message: "Enter Manager Name",
            type: "input",
        },
        {
            name: "IDNumber",
            message: "Enter Manager ID Number",
            type: "input",
        },
        {
            type: 'input',
            name: 'Email',
            message: 'Enter Manager Email Address',
        },

        // manager office number 

        {
            type: 'input',
            message: 'Enter Manager Office Number',
            name: 'OfficeNumber',

        },

        /// then.......////
        // START MENU of three options: add an engineer, add an intern, or finish

        
        {
            type: 'list',
            message: 'Add one of the following or finish',
            name: 'Menu',
            choices: [
                "Engineer",
                "Intern",
                "Finish and create HTML File",
            ],
        },

        //* IF engineer is selected:
        // name, id, email, GITHUB, then return to MENU of three options
        {
            type: 'input',
            message: 'Enter your github username',
            name: 'Questions',

        },

        // IF intern is selected:
        //   name, id, email, SCHOOL, then return to MENU of three options
        {
            type: 'input',
            message: 'Enter your school',
            name: 'School',
        },

        // IF finish is selected:
        // create html file with results 


    ])
        .then(answers => {
            writeToFile(answers)
            console.log('Success! Your HTML file has been created!')
        });
}


// function to write README file
const writeFileAsync = util.promisify(fs.writeFile);

function writeToFile(answers) {
    writeFileAsync('profile.html', generateMarkdown(answers))
}

init();
