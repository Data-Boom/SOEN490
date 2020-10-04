
Welcome to the Databoom Github. This is an open source capstone project focused on recreating the detonation database located at https://shepherd.caltech.edu/detn_db/html/db.html

Please read all of the guidelines mentioned below to ensure consistent coding style, conventions and a well contructed contribution approach.

For any sort of contribution be it documentation or code the contributing method will be the same. If any Pull Requests are submitted and code does not follow outlined method then it should be rejected.

Ground Rules for Development

- Nobody should ever be commiting directly to the master branch. 

    The master branch will be used for production and the site will be hosted off this branch. Master will be updated by pull request following the end of every sprint with the approval of 3 team members. 

- All development will take place on develop branch, this branch is created under the master branch. To update your local git to reflect remote git please use the following command inside your locally cloned repo.

    git fetch --all
    git checkout develop 

    All feature branches are required to fork off develop branch and upon completion of your feature, you must submit a pull request from your feature branch to merge into develop. To create a branch under develop:

    git checkout -b myfeature_branch develop

- Feature branches should be appended with github issue associated to it. For example, lets say you  are working on a github issue referenced as '[Backend] Add Logic for Sign up #63'. To you should name your branch as 'Backend-SignUp-63'.

- Git committing style. The command used to commit changes is:

    git commit -m 'Message associated to your commit' 

    When making commits you should include the issue number in the commit, this allows the commits to be linked the git issue. For example if I was working under my branch 'Backend-SignUp-63' and a validator was implemented as part of the feature. The commit would look like '[#63] Add Validator for Input Fields'. 

- Pull requests by developers must be approved by at least 2 other developers. In order words, each pull request is required to have 2 reviewers at the minimum. In addition, all submitted pull requests must include Unit Tests as part of the feature implementation.

- Prettier should also be installed as a VCS extension. It beautifies the written code to follow common coding convensions


    If there are any questions about any of the points mentioned please raise them! 