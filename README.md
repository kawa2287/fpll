# FPL Shell App

# APIs & the `netlify.toml` file

Redirects will need to be used in this file. This will serve as a proxy to help prevent CORS policy issues.

# Deployment to Netlify

first build the project wth

> `npm run build`

then deploy the project with

> `netlify deploy`

when it asks for the publish directory, select `build` folder. If all looks good then deploy production with

> `netlify deploy --prod`
