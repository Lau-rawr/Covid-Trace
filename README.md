Project Covid-Trace
-


### Participants

- Anna D: amdaccache
- Hasti G: hgheibidehnashi
- Lily S: sabirova
- Shyla S: ssuri
- Laura W: lauraworboys

### Project Summary

The goal of this project is to develop a web application that augments traditional contact tracing by relying on self-reported contact information for automated and confidential notifications. The application will also monitor contacts throughout the self-quarantine period, and collect daily self-reported wellness checks.

### Repository Contents 

1. **docs folder** contains the html and images for our landing page as well as the communication plan
2. **src folder** contains front end App.js and index.js 
   - contains components folder
     - holds additions front end code: css and js 
     - holds additional folders: css, fonts, images
   - contains context folder
     - ContextUser.js: creates a context for the entire app instead of just one component
3. **public folder** contains placeholds for the website
4. **backend folder** contains several folders and files
   - .env file holds private information that should only be visible to the developer
   - routes folder contains routes for images and the contact, symptom, and user information that is input
   - middleware folder conatins auth.js that builds the authentication for user sign in to make sure a verified user is logging in
   - models folder contains models of the JSON objects the database is going to accept
5. The **5500 UML** portable network graphic is just a unified modeling language diagram made on Lucid Chart that represents the intial idea behind the site and the data we wanted to collect/need users to provide for contact tracing purposes.
6. **MongoDB folder** contains the code and data for running analytics on the CovidTrace web app. 
   - data folder contains the sample data generate
   - notebooks folder contains R notebook files that configure the data/connect to the database and explore use cases
   - images folder contains the ERD
7. **CovidTracePres** contains the project presentation.

### Links 

- [Landing Page](https://pages.github.ccs.neu.edu/2020FACS5500SV/project-Covid-trace/)

- [Heroku Deployed Application](https://immense-ocean-18496.herokuapp.com/)

- [Demo](https://www.youtube.com/watch?v=sZ84XGj5Ir8&feature=youtu.be)

- [Personal GitHub Containing Earlier Repositories](https://github.com/suris8?tab=repositories)

### Note about Twilio Texting Feature

Our **Contacts** page includes a text button which allows users to send anonymous texts to contacts through Twilio.  This feature is fully functional, however, since we are using a Free Twilio Trial Account, we have disabled our Twilio account in order to avoid being charged for excessive and unintentional usage.  If you would like to use this feature, please alert a Covid-Trace team member so that we can enable it.  
