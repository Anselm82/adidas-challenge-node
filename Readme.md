# Architecture challenge

This challenge has been a big one, for real. I've never coded in Node JS, the only typescript projects I've participate so far are frontend development.

The structure of the repo is partially a monorepo. It needs to be adjusted to use lerna o a similar tool to have the services deployed.

To deploy the apps, just run "docker-compose up" from the root folder. The services will be deployed in:

- http://localhost:3000
- http://localhost:3001

Sign up, login and user CRUD operations have been implemented. So does CRUD operations with reviews and an endpoint for review summary (average ratio and total number of reviews for a product).

Both services are dockerized. 

My proposal for a pipeline would be similar to the following:

![alt text](https://github.com/Anselm82/adidas-challenge-node/blob/master/image.jpg?raw=true)

I'm more familiar with strongly typed compiled languages, that's why I added Kotlin but it can be perfectly NodeJS. Under a control versión like github, I will use Jenkins for the pipelines using Jenkinsfiles. It allows granular control but requires more management compared with other solutions like github actions or gitlab. In the pipeline, the stages will include: checkout, set new version and commit it, test and sonarqube qa check, containerize and store in ECR, and deploy to the cloud. All this depending on the branching strategy. Ideally the development process should also include TDD and the deployment phase, should also use IaC like terraform.