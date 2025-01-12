export default function setRoutes(app){
    // TODO set routes 
    app.get('/', (req, res) => res.send('Hello World!'))
    return app;
}