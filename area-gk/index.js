'use strict'

const fetch = require('node-fetch');
const colors = require('colors');
const parseString = require('xml2js').parseString;

//http://sg.geodatenzentrum.de/gdz_cts?REQUEST=GetCoordinates&FROMSRS=GEO_DHDN&TOSRS=UTM32&COORDS=10 50 11 51

/*15.869179666042328  48.545542128801657
15.871078670024872  48.545716145940816
15.871143043041231  48.545424933248341
15.869211852550507  48.545240260916557
15.869179666042328  48.545542128801657*/

const getUrl = function(from, to, coordinates){
    const url = `http://sg.geodatenzentrum.de/gdz_cts?REQUEST=GetCoordinates&FROMSRS=${from}&TOSRS=${to}&COORDS=${coordinates}`
    return url
}

const coordinates = '48.545542128801657 15.869179666042328 48.545716145940816 15.871078670024872 48.545424933248341 15.871143043041231 48.545240260916557 15.869211852550507 48.545542128801657 15.869179666042328'
const url = getUrl('GEO84_Lat-Lon', 'GK4_N-E', coordinates)
console.log(url)

const opts = { method: 'GET' }

fetch(url, opts)
.then(function(res) {
	//console.log(colors.green(res.ok))
    console.log(colors.green(res.status))
    console.log(colors.green(res.statusText))
    //console.log(res.headers.raw())
    //console.log(res.headers.get('content-type'))
    //console.log(colors.green(' => request successful'))
    return res.text()
})
.then(function(result){
    //console.log(result)
    let json = ''
    parseString(result, function (err, result) {
        //console.log(colors.green(' => json generated'))
        const jsonString = JSON.stringify(result)
        console.log(jsonString)
        json = JSON.parse(jsonString);
        console.log(json)
        return json
    })
})
.then(function(json){
    console.log(json)
    const coordsString = json.CTS_Response.Coords[0].$.values
    console.log(coordsString)
    return coordsString
})
.then(function(coordsString){
    console.log(coordsString)
})
.catch(function(err) {
	console.log(colors.red(err))
})

const objectify = function(coordsString){
    const splitted = coordsString.split(" ")
    let points = new Array()
    let i = 0
    for (i = 0; i <= splitted.length; i++) {
        if ( (splitted[i] % 1) == 0 )
        {
            const y = splitted[i]
            const x = splitted[i-1]
            console.log(`x=${x}, y=${y}`)
            let point = {X:x, Y:y}
            points.push(point)
        }
    }
    return points
}

const computeArea = function(){

}


