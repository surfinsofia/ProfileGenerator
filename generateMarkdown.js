function generateMarkdown(answers) {
  return `
  ## Name
  ${answers.Name}

  ## Role
  ${answers.Role}
  
  ## ID Number
  ${answers.IDNumber}

  ## Email
  ${answers.Email}

  ## Github
  https://github.com/${answers.Questions}
  
  `;
}


module.exports = {generateMarkdown};
