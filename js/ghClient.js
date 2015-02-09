//create our constructor function
function GhClient(tkn) {
    this.token = tkn;
    console.log('client instantiated');
    this.startClient();
}

//add the critical methods to our prototype

//----------------------------------
// Our Client
//----------------------------------

GhClient.prototype.startClient = function() {
    $.when(
        this.getGHdata(),
        this.getHtmlTemplate()
         //1
        // *get/load html template
    ).then(function(GHdata, myHTMLTemplate) {
        console.log(GHdata);
        console.log(myHTMLTemplate)
        //put our data in the template
        console.log(GHdata[0]);

        //1 - using lodash _,template() to compile Html

        var compiled = _.template(myHTMLTemplate);

        console.log(compiled)
        //2- pass our compiledHTML the data

        var readyTemplate = compiled(GHdata[0])

        document.querySelector(".container").innerHTML = readyTemplate



    })
}

//----------------------------------
// Our 'gets'
//----------------------------------

GhClient.prototype.getGHdata = function() {
    var ghURL = "https://api.github.com/users?access_token="+this.token
    console.log(ghURL);
    return $.getJSON(ghURL).then(
        function(GHdata) {
            return GHdata;
        }
    )
}


GhClient.prototype.getHtmlTemplate = function() {
    var filePath = "./templates/profile.html"
    console.log(filePath);
    return $.get(filePath).then(
        function(myTemplate) {
            return myTemplate;
        }
    )


}

