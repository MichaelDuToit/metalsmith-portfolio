const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const contentful = require('contentful-metalsmith');
const marked = require('marked');
const handlebars = require('handlebars');
const rootpath = require('metalsmith-rootpath');
const moment = require('moment');
const sass = require('metalsmith-sass');
const discoverPartials = require('metalsmith-discover-partials');
const autoprefixer = require('metalsmith-autoprefixer');
const pageTitle = require('metalsmith-page-titles');
const dotenv = require('dotenv');
const assets = require('metalsmith-assets');

//.env
dotenv.config();

//Handlebars Helpers
handlebars.registerHelper('marked', function(text){
    return marked(text);
})
handlebars.registerHelper('moment', function(date){
    return moment(date).format('Do MMMM YYYY HH:mma');
})
handlebars.registerHelper('eachSortedByDate', function(context, options){
    let ret = '';
    let sortedContext = context.sort(function (a,b){
        if (new Date(a.fields.datePublished) > new Date(b.fields.datePublished)){
            return -1;
        }
        if (new Date(a.fields.datePublished) < new Date(b.fields.datePublished)){
            return 1;
        }
        return 0;
    });
    for(let i = 0, j = sortedContext.length; i < j; i++){
        ret = ret + options.fn(sortedContext[i]);
    }
    return ret
});

//Metalsmith Config
Metalsmith(__dirname)
    .clean(true)
    .source('./src')
    .destination('./build')
    .metadata({
        site: {
            title: "Michael Du Toit"
        }
    })
    .use(pageTitle())
    .use(contentful({
        'access_token': process.env.ACCESS_TOKEN,
        'space_id': process.env.SPACE_ID
    }))
    .use(rootpath())
    .use(sass({
        outputDir: './css'
    }))
    .use(autoprefixer())
    .use(markdown({
        langPrefix: 'language-',
    }))
    .use(permalinks({
        relative: true
    }))
    .use(discoverPartials({
        directory: 'layouts/partials'
    }))
    .use(layouts('handlebars'))
    .use(assets({
        source: 'src/favicon',
        destination: './'
    }))
    .build(function(err){
        if (err) throw err
    });