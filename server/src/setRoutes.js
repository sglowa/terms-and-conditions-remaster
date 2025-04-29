import path from 'path'
import express from 'express';

/**
 * Description
 * @param {import('express').Express} app
 * @returns {any}
 */
export default function setRoutes(app){
    
    // TODO set routes 

    // NOTE: rendering pug, this is for dev, should serve static html for prod.
    app.set('views', [
        path.join(__dirname,"../../client-user/src/pug/views"),
        path.join(__dirname,"../../client-screen/src/pug/views")
    ]);
    // app.set('views', path.join(__dirname,"../../client-screen/src/pug/views"));
    app.set('view engine', 'pug');
    app.locals.pretty = true;
    app.set('view options', { pretty: true});
    
    app.use(express.static(path.join(__dirname,"../../client-user/public")))
    app.use(express.static(path.join(__dirname,"../../client-screen/public")))
    app.use(express.static(path.join(__dirname,"../../client-user/public")))
    app.use(express.static(path.join(__dirname,"../../client-screen/public")))

    app.use('/public', express.static(path.join(__dirname,"../../client-user/public")))
    
    app.use('/user', express.static(path.join(__dirname,"../../client-user/dist")));
    app.use('/screen', express.static(path.join(__dirname,"../../client-screen/dist")));

    app.get('/',(req,res)=>{
        res.render('userLandingPage', {
            pathToPublic:"./",
            // pathToBundle:"user/js/bundle.js",
            pathToBundle:"",
        });
    });
    app.get('/screen',(req,res)=>{
        res.render('screen', {pathToPublic:"./", pathToBundle:"js/bundle.js"});
    });


    // app.get('/',(req,res)=>{
    //     res.sendFile(path.join(__dirname,"../../client-user/dist/html/userLandingPage.html"))
    // });

    return app;

}