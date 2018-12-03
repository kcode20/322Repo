# OneDoc

Document Sharing System Software

### Team Members

- Khristian Brooks
- Connie Wu
- Songren Zhao
- Chantelle Levy

### How to Contribute

To contribute, clone the repo and create a new branch.

You can use the following code to create a new branch, replacing `newBranchName` with the name of the branch you are trying to create.
`git checkout -b newBranchName`

After you create this branch, run:
`git push --set-upstream origin newBranchName`
This will create a remote branch in Github that is a copy of the branch you created locally.

Once your local branch and remote branch is created you can make your changes on this branch. This branch is seperate from the master branch, so even if you make a huge mistake and mess up everything, it will not affect already existing code on master.

When you are done making your changes on your local branch, you can push your remotely push changes to GitHub:
`git push`

Now, it's time to create a Pull Request! In your browser, go to the repo in Github. Click the button to "Compare & pull request" button as shown in the image below:

<img src="/src/img/CreatingPR.png" width="500"/>

This will create a Pull Request with all your changes that can be viewed by other contributors to this repo. Once it has been approved, you can merge this pull request into master.
