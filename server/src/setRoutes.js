

/**
 * Description
 * @param {import('express').Express} app
 * @returns {any}
 */
export default function setRoutes(app){
    app.get('/',(req,res)=>{res.send('hello world')});
    // TODO set routes 
    return app;
}