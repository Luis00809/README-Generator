const fs = require('fs');
const inquirer = require('inquirer');

let LicenseToken= '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'
let licenseDescription = '';

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
        message: 'Please include a screenshot of your project',
        name: 'image'
    },
    {
        type: 'input',
        message: 'Give an alt text for your image',
        name: 'altText'
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
    let imagePath = response.image;
    let imageDesination = 'assets/images/' + imagePath.split('/').pop();

    fs.appendFile(imagePath,imageDesination, (err) => 
    err ? console.error(err) : console.log('Got the image!'));

    let readmeContent = template(
        response.title,
        response.description,
        response.install,
        response.usage,
        response.image,
        response.altText,
        response.credit,
        response.license,
        response.contribute,
        response.userName,
        response.userLink,
        response.email,
        response.test
        );
        
        // gets the user's license input and creates a file of that license
        let licenseToGenerate = response.license; 
        getLicense(licenseToGenerate);


        // generates the README file with the user's input
        fs.writeFile('UserREADME.md',readmeContent, (err) => 
            err ? console.error(err) : console.log('Success'))
})

function template(title, description,install,usage,image,altText,credit,license,contribute,userName,userLink,email,test){
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
   
   ${image}
   
   ![alt text](file path)
   
   ## Credits
   
    ${credit}

   ## License 
   
    This project is licensed under the terms of the ${license}

   DESCRIPTION: ${licenseDescription}
   
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
console.log(licenseDescription)