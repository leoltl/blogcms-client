# blogcms-client

![blogcms-client](public/screenshot-1.png )

Headless blog CMS has an express server (api) that serves content, a Vue app (client) for rendering content and a React app (admin) for managing the content in the server (ie blog posts and comments). The system is communicating using REST API calls over HTTP.

Cms-client is a app built with Vue which renders the content stored in blogcms-api server. Users can view blog posts and leave comments. The client communicates with the server via REST API and JSON responses. Comments posted are sanitized to prevent XSS attacks.

It is part of the headless cms system.

View **CMS-admin** [here](https://github.com/leoltl/blogcms-admin)

View **CMS-api** [here](https://github.com/leoltl/blogcms-api)

## The stack
- **Client side**: Vue.js (Vue 3 syntax)
- **UI library**: Element UI

## Live App
**View this app (client) [here](https://leoltl-blogcms-client.herokuapp.com/)**

**View admin app [here](https://leoltl-blogcms-admin.herokuapp.com/)**

## Features
**As an unauthenticated user**:
- I can see a list of all blog posts.
- I can see an individual blog post.
- I can post a comment replying to a post.

#### TODO
- support posting of images in comments
- add analytics calls to record post views
