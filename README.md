# OneDoc

Document Sharing System Software

### Team Members

- Khristian Brooks
- Connie Wu
- Songren Zhao
- Chantelle Levy

### Tasks Checklist
#### Super User
- [ ] Update Memberships
- [ ] Maintain a list of taboo words
- [ ] unlock locked documents
- [ ] process complaints about ou’s
- [ ] have all privileges reserved for ou’s inside any group

#### Ordinary User
- [ ] Create New documents- They own the documents they create.
- [ ] Invite other ou’s to update documents they own.

#### Decide whether the document is:
- [ ] open to the public (can be seen by everyone)
- [ ] restricted (can only be viewed as read-only by gu’s and edited by ou’s)
- [ ] shared (viewed/ edited by ou’s who are invited)
- [ ] private

- [ ] accept/deny invitation(s) placed by other ou’s for their specific documents
- [ ] lock a shared document for updating (only one ou can lock a document successfully and system should indicate
which ou is updating the document)
- [ ] update a successfully locked document & assign a unique version sequence number & remember who made the
update & when the update was made
- [ ] unlock a shared document locked by him/herself
- [ ] file complaint to the owner of a document about another ou’s update
- [ ] file complaint to the a SuperUser about the owner of the documents
- [ ] if they own a document, they should deal with complaints filed by other ou’s
- [ ] remove ou’s who were invited before.
- [ ] unlock locked documents that s/he owns that is being updated by others (unlock documents locked by others as
long as you are the owner)
- [ ] search own files based on keyword
- [ ] search information about other ou’s based on name and/or interests.
- [ ] have all privileges for gu’s

#### Guest User
- [ ] read open documents
- [ ] retrieve old versions of open documents
- [ ] retrieve complaints about old versions of documents
- [ ] send suggestions to Super Users about taboo words.
- [ ] apply to be an ordinary user, that will be confirmed or rejected by su (in application, name and technical interests
are submitted)

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
