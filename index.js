const fs = require('fs');
const inquirer = require('inquirer');

inquirer.prompt([
    {
        type: 'input',
        message: "What is the title of your project?",
        name: 'title'
    },
    {
        type: 'input',
        message: 'Describe your project',
        name: 'description'
    },
    {
        type: 'input', 
        message: 'Directions for installing your project:',
        name: 'install'
    },
    {
        type: 'input',
        message: 'How do you use your application?',
        name: 'usage'
        // need to add in getting a pic (png) and the alt text for it
    },
    {
        type: 'input',
        message: 'Who/what can you give credit to?',
        name: 'credit'
    },
    {
        type: 'list',
        message: 'Which license would you like to use:',
        name: 'license',
        choices: ['Apache License 2.0', 'GNU General public License v3.0',
                    'MIT License', 'BSD 2-Clause "Simplified" License',
                    'BSD 3-Clause "New" or "Revised" license', 'Boost Sofware license 1.0', 'Creative Commons Zero 1.0', 
                    'Eclipse Public License 2.0', 'GNU General Public License v3.0','GNU General Public License v2.0','GNU Lesser General Public License v2.1',
                    'Mozilla public License 2.0', 'The Unilicense']
    },
    {
        type: 'input',
        message: 'Explan how others can contribute to your work',
        name: 'contribute'
    },
    {
        type: 'input',
        message: 'What is your Github username?',
        name: 'userName'
    },
    {
        type: 'input',
        message: 'What is your Github link to your profile',
        name: 'userLink'
    },
    {
        type: 'input',
        message: 'What is your email?',
        name: 'email'
    }, 
    {
        type: 'input',
        message: 'Would you like to include any tests? If no, type N/A',
        name: 'test'
    }
]) .then ((response) => {
    // let userTitle = inquirer.title;
    // let userDescrip = inquirer.description;
    // let installation = inquirer.install;
    // let userUsage = inquirer.usage;
    // let credits = inquirer.credit;
    // let userlicense = inquirer.license;
    // let contributions = inquirer.contribute;
    // let userGithub = inquirer.userName;
    // let userGitLink = inquirer.userLink;
    // let userEmail = inquirer.email;
    // let test = inquirer.test;
    let readmeContent = template(
        response.title,
        response.description,
        response.install,
        response.usage,
        response.credit,
        response.license,
        response.contribute,
        response.userName,
        response.userLink,
        response.email,
        response.test
        );

        fs.writeFile('UserREADME.md',readmeContent, (err) => 
            err ? console.error(err) : console.log('Success'))
})

function template(title, description,install,usage,credit,license,contribute,userName,userLink,email,test){
   return `# ${title}

   ## Description
   
   ${description}
   
   ## Table of contents
   
   - [Installation](#installation)
   - [Usage](#usage)
   - [Credits](#credits)
   - [License](#license)
   - [Contribute](#how-to-contribute)
   
   
   ## Installation
   ${install}
   
   ## Usage
   
  ${usage}
   
   screenshot from user (will need to store img in a assets/image folder)
   
   ![alt text](file path)
   
   ## Credits
   
    ${credit}

   ## License 
   
    ${license}

   ## Badges
   need to look up
   
   ## How to Contribute
   ${contribute}
   
   Contact me at: ${userName}
   ${userLink}
   
   You can also reach me at ${email}
   
   ## Tests
   
   ${test}`
}