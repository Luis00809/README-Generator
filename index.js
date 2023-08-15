const fs = require('fs');
const inquirer = require('inquirer');

// need to get a new access token and hide token when commiting
let LicenseToken= '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'

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
        choices: [  'apache-2.0', 'gpl-3.0',
                    'mit', 'bsd-2-clause',
                    'bsd-3-clause', 'bsl-1.0', 'cc0-1.0', 
                    'epl-2.0','lgpl-2.1',
                    'mpl-2.0', 'unlicense'
                ]
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

    let licenseToGenerate = response.license;
    getBadge(licenseToGenerate);

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
        
        // gets the user's license input and creates a file of that license
        
        
        getLicense(licenseToGenerate);


        // generates the README file with the user's input
        fs.writeFile('UserREADME.md',readmeContent, (err) => 
            err ? console.error(err) : console.log('Success'))
})

function template(title, description,install,usage,credit,license,contribute,userName,userLink,email,test){
   return `${badge}
   # ${title}

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
   
   ${image}
   
   ![alt text](file path)
   
   ## Credits
   
    ${credit}

   ## License 
   
    This project is licensed under the terms of the ${license}

   DESCRIPTION: 
   
   ## Badges
   need to look up
   
   ## How to Contribute
   ${contribute}
   
   Contact me at: [${userName}](${userLink})
   
   You can also reach me at ${email}
   
   ## Tests
   
   ${test}`
}

const getLicense = (licenseToGenerate) => {

    const { Octokit } = require("@octokit/rest");
    const octokit = new Octokit({
        auth: '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'
    });

    octokit.rest.licenses.get({
        license: licenseToGenerate,
        description: 'description'
    })
    .then(response => {
    //   console.log(response.data);
        licenseDescription = response.data.description
        fs.writeFile('License.txt',response.data.body, (err) => 
        err ? console.error(err) : console.log('Got the file'));
    })
    .catch(error => {
      console.error(error);
    });
 };


let badge = '';
let getBadge = (license) => {
    switch (license){
        case 'apache-2.0':
            badge = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
        break; 
    
        case 'gpl-3.0': 
            badge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
            break;
        
        case 'mit':
            badge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
        break;
    
        case 'bsd-2-clause':
            badge = '[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)'
            break;
    
        case 'bsd-3-clause': 
            badge = '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)'
        break;
    
        case 'bsl-1.0':
            badge = '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)'
        break;
    
        case 'cc0-1.0': 
            badge: '[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)'
        break;
    
        case 'epl-2.0': 
            badge = '[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)'
        break;
    
        case 'lgpl-2.1':
            badge = '[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)';
        break;
    
        case 'mpl-2.0':
            badge = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
        break;
    
        case 'unlicense':
            badge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'
        break;
    
        case 'default':
            console.log('NO BADGE!')
        break;
    }
}
