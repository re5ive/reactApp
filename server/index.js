/**
 *  @fileOverview tnexus-ui Write what's going on in the file here.
 *  @file         index.js Created at 4/26/18 with WebStorm
 *  @author       Kamaal ABOOTHALIB | MacbookPro
 */

const app = require('./app')
    , PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
})
