//manager questions
function generateMarkdown(answers) {
  return `

  ## My Team

  ## Name
  ${answers.ManagerName}

  ## Role
  ${answers.Menu}
 
  ## ID Number
  ${answers.IDNumber}

  ## Email
  ${answers.Email}
  
  ## Office Number
  ${answers.OfficeNumber}
  
  `;
}

// if engineer is selected... include github




function generateMarkdownEngineer(answers) {
  return `


## Name
  ${answers.Name}
 
## ID Number
  ${answers.IDNumber}

## Email
  ${answers.Email}

## Github
https://github.com/${answers.Questions}

`;
}


// intern markdown with school 
function generateMarkdownIntern(answers) {
  return `

## Role
${answers.Menu}

## Name
  ${answers.Name}
 
## ID Number
  ${answers.IDNumber}

## Email
  ${answers.Email}

## School
${answers.School}

`;
}


module.exports = { generateMarkdown };
