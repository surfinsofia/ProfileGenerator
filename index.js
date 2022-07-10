//packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { generateMarkdown } = require('./src/generateMarkdown');
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

const employees = [];

function initApp() {
    startHtml();
    addMember();
}

// rendered output (HTML) and CSS style sheet      
// classes

// array of questions for user input
// all roles include: name, id, email
// differences between roles are:
// manager has office number, engineer has github, intern has school
const addMember = () => {

    inquirer.prompt([

        // three basic questions all employees will include
        {
            name: "ManagerName",
            message: "Enter Manager Name",
            type: "input",
        },
        {
            name: "ManIDNumber",
            message: "Enter Manager ID Number",
            type: "input",
        },
        {
            type: 'input',
            name: 'ManEmail',
            message: 'Enter Manager Email Address',
        },

        // manager office number is unique to manager

        {
            type: 'input',
            message: 'Enter Manager Office Number',
            name: 'OfficeNumber',

        },

        {
            type: 'list',
            message: 'Add an engineer, an intern, or finish',
            name: 'Menu',
            choices: [
                "Engineer",
                "Intern",
                "Finish and create HTML File"]
        },
    ])

        .then(function ({ name, Menu, id, email }) {
            let roleInfo = "";
            if (Menu === "Engineer") {
                roleInfo = "GitHub username";
            } else if (Menu === "Intern") {
                roleInfo = "school name";
            }
            inquirer.prompt([{
                message: `Enter employee ${roleInfo}`,
                name: "roleInfo"
            },
            {
                type: "list",
                message: "Would you like to add more team members?",
                choices: [
                    "yes",
                    "no"
                ],
                name: "moreMembers"
            }])
            .then(function({roleInfo, moreMembers}) {
                let newMember;
                if (moreMembers === "Engineer") {
                    newMember = new Engineer(name, id, email, roleInfo);
                } else if (moreMembers === "Intern") {
                    newMember = new Intern(name, id, email, roleInfo);
                } else {
                    newMember = new Manager(name, id, email, roleInfo);
                }
                employees.push(newMember);
                addHtml(newMember)
                .then(function() {
                    if (moreMembers === "yes") {
                        addMember();
                    } else {
                        finishHtml();
                            }
                        });

                });
        });
}


//         //* IF engineer is selected:
//         // name, id, email, AND GITHUB, then return to MENU of three options
//         {
//             type: 'input',
//             message: 'Enter your github username',
//             name: 'Questions',

//         },

//         // IF intern is selected:
//         //   name, id, email, AND SCHOOL, then return to MENU of three options
//         {
//             type: 'input',
//             message: 'Enter your school',
//             name: 'School',
//         },

//         // IF finish is selected:
//         // create html file with results 


function startHtml() {
    const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Team</title>
</head>
<body>
    
    
    `;
    fs.writeFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("Welcome");
}

function addHtml(member) {
    return new Promise(function (resolve, reject) {
        const name = member.getName();
        const role = member.getrole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `${name}Engineer
            <ul>
                <li class=">ID: ${id}</li>
                <li class="">Email Address: ${email}</li>
                <li class="">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `${name}
                ${id}
                ${email}
            ${school}`;
        } else {
            const officePhone = member.getOfficeNumber();
            data = `${name}
            <ul class="">
                <li class="">ID: ${id}</li>
                <li class="">Email Address: ${email}</li>
                <li class= Office Phone: ${officePhone}</li>
            `
        }
        console.log("adding team member");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function finishHtml() {
    const html = ` 
</body>
</html>`;

    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("team profile created!");
}


initApp();





