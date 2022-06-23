//packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { generateMarkdown } = require('./generateMarkdown');


// array of questions for user input
const init = () => {

    inquirer.prompt([
        {
            name: "Name",
            message: "What is your name?",
            type: "input",
        },
        {
            type: 'list',
            message: 'What is your role?',
            name: 'Role',
            choices: [
                "Employee", 
                "Engineer",
                "Intern",
                "Manager",
                ],
        },

        {
            name: "IDNumber",
            message: "What is your ID Number?",
            type: "input",
        },
        {
            type: 'input',
            name: 'Email',
            message: 'Enter your Email address',
        },
        {
            type: 'input',
            message: 'Enter your github username',
            name: 'Questions',

        },
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
