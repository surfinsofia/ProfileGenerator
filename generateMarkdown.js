//manager questions
function generateMarkdown(answers) {
  return `
  ## Name
  ${answers.ManagerName}
 
  ## ID Number
  ${answers.IDNumber}

  ## Email
  ${answers.Email}

  ## Office Number
  ${answers.OfficeNumber}
  
  `;
}

// engineer markdown with github

function generateMarkdownEngineer(answers) {
  return `
## Role
${answers.Menu}

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
