const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const employees = [];

function initApp() {
    startHtml();
    addManager();
}

function addManager() {
    inquirer.prompt([{
        message: "Enter manager's name",
        name: "name"
    },
    {
        message: "Enter manager's id",
        name: "id"
    },
    {
        message: "Enter managers email address",
        name: "email"
    },
    {
        message: "Enter managers office number",
        name: "officenum"
    },
    {
        type: "list",
        message: "Add a profile or finish",
        choices: [
            "Engineer",
            "Intern",
        
            "Finish and create file"
        ],
        name: "role"
    },
    ])



        .then(function ({ name, role, id, email }) {
            let roleInfo = "";
            if (role === "Engineer") {
                roleInfo = "GitHub username";
            } else if (role === "Intern") {
                roleInfo = "school name";
            }


            inquirer.prompt([
                {
                    message: "Enter team member's name",
                    name: "membername"
                },
                {
                    message: "Enter team member's id",
                    name: "memberid"
                },
                {
                    message: "Enter team member's email address",
                    name: "memberemail"
                },
                {
                    message: `Enter team member's ${roleInfo}`,
                    name: "roleInfo"
                },

                {
                    type: "list",
                    message: "Add a profile or finish",
                    choices: [
                        "Engineer",
                        "Intern",
                        "Finish and create file"
                    ],
                    name: "addmember"
                },])
                .then(function ({ roleInfo,  }) {
                    let newMember;
                    if ('addmember') === ("Engineer") {
                        newMember = new Engineer(name, id, email, roleInfo);
                    } else if ('addmember') === ("Intern") {
                        newMember = new Intern(name, id, email, roleInfo);
                    }
                    employees.push(newMember);
                    addHtml(newMember)
                        .then(function () {
                            if ('addmember' === "Finish and create file") {
                                finishHtml
                            }
                        });

                });
        });
}




function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
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
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${membername}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${memberid}</li>
                <li class="list-group-item">Email Address: ${memberemail}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${membername}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${memberid}</li>
                <li class="list-group-item">Email Address: ${memberemail}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officenum}</li>
            </ul>
            </div>
        </div>`
        }







        console.log("adding new team member");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });


}

function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Success! Your profiles have been created");
}

initApp();