// The link to status codes in the Discord API
// Put it here to avoid clutter
var resultsLink = "https://discord.com/developers/docs/topics/opcodes-and-status-codes#http' target='_blank";

// Options
var confirmClear = true; // Should a confirmation box appear when clearing settings?
var override = false; // Should settings be overriden, only for private use cases
var clearOnSend = true; // Should settings be cleared after webhook is sent?

// ran when the 'send message' button gets pressed
function GetValues() {

    console.log('Button Pressed, Finding Values.'); // debugging console

    // gets info from value
    var url = document.getElementById('Webhook').value.replaceAll('"', "''"); // gets webhook url
    var title = document.getElementById('Title').value.replaceAll('"', "''"); // gets title
    var description = document.getElementById('Description').value.replaceAll('"', "''"); // gets description
    var imageURL = document.getElementById('ImageURL').value.replaceAll('"', "''"); // gets image url
    var thumbnailURL = document.getElementById('ThumbnailURL').value.replaceAll('"', "''"); // gets thumbnail url 
    var author = document.getElementById('AuthorName').value.replaceAll('"', "''"); // gets author name
    var authorURL = document.getElementById('AuthorURL').value.replaceAll('"', "''"); // gets author url
    var authorImageURL = document.getElementById('AuthorImageURL').value.replaceAll('"', "''"); // gets author image url
    var footer = document.getElementById('Footer').value.replaceAll('"', "''"); // gets footer title
    var footerImage = document.getElementById('FooterImageURL').value.replaceAll('"', "''"); // gets footer image url

    var color = document.getElementById('Color').value.toString().replaceAll('#',"");
    color = parseInt(color,16);

    console.log("Color: " + color);

    if(override == true) {
        // if public make sure these variables are set to nothing
        // these values can be changed & swapped for other defaults
        // overrides the url
        url = "";
        author = ""; // overrides the author name
        authorURL = ""; // overrides the author url
        authorImageURL = ""; // overrides the author image

        console.log('Override is enabled, some values have been overwritten.'); // debugging console
    }

    console.log('Checking if URL is NULL'); // debugging console

    // checks to make sure the url is not empty
    if(url == "") {
        // if it is, gives public error code
        document.getElementById('Results').innerHTML = "Error Code S1: Must Provide Webhook URL";
        console.log('ERROR: Code S1: Must Provide Webhook Link'); // debugging console
        return; // if there is no url, stops code execution
    }

    console.log("URL is not NULL, continuing."); // debugging console

    // runs a different function with all needed values plugged in (creates json)
    CreateJson(url,title,description,imageURL,thumbnailURL,author,authorURL,authorImageURL,footer,footerImage,color);
}

// runs at end of button press, and creates json file
function CreateJson(url,title,description,imageURL,thumbnailURL,author,authorURL,authorImageURL,footer,footerImage,colorsTotal) {

    console.log('Creating JSON File'); // debugging console

    // creates json file with all variables plugged into it
    let data = `{
        "content":"@everyone",
        "embeds": [
            {
                "type":"rich",
                "title":"`+title+`",
                "description":"`+description+`",
                "color":"`+colorsTotal+`",
                "image": {
                    "url":"`+imageURL+`",
                    "height":"0",
                    "width":"0"
                },
                "thumbnail": {
                    "url":"`+thumbnailURL+`",
                    "height":"0",
                    "width":"0"
                },
                "author": {
                    "name":"`+author+`",
                    "url":"`+authorURL+`",
                    "icon_url":"`+authorImageURL+`"
                },
                "footer": {
                    "text":"`+footer+`",
                    "icon_url":"`+footerImage+`"
                }
            }
        ]
    }`

    console.log('JSON File Created'); // debugging console
    console.log(data); // debugging console

    // runs a different function with all needed values plugged in (sends webhook request)
    SendWebhook(url,data);

}

// runs after json was created
function SendWebhook(url,data) {
    
    console.log('Attempting To Send Webhook'); // debugging console
    
    console.log('Creating Webhook Send Request'); // debugging console

    let WebhookSend = new XMLHttpRequest(); // creates web request
    WebhookSend.open("POST", url); // sets it to a post request

    console.log('Setting Request Headers'); // debugging console

    WebhookSend.setRequestHeader('Accept',"application/json"); // sets it to accept json files
    WebhookSend.setRequestHeader('Content-Type',"application/json"); // sets it to send json files

    console.log('Attempting To Send Data'); // debugging console

    WebhookSend.send(data); // sends json file from earlier in code execution

    // once the web request loads
    WebhookSend.onload = () => {
        var status = WebhookSend.status; // creates a variable with status
        console.log('Response Status: ' + status); // debugging console, prints status
        if (status == 204) { // checks if status was success
            // if it was, writes response with success tag
            document.getElementById('Results').innerHTML = "Success: Response Status: <a href='"+resultsLink+"' target='_blank'>" + status; + "</a>"
            if(clearOnSend == true) {
                console.log("Clear On Send Set To True, Clearing Settings");
                ClearSettings();
            }
        } else {
            // if it was not, writes response with error tag
            document.getElementById('Results').innerHTML = "Error: Response Status: <a href='"+resultsLink+"' target='_blank'>" + status; + "</a>"
        }
    }

}

// clears values on button press    
function ClearSettingsParse() {

    console.log('Button Pressed, Checking For Clear')
    if(confirmClear == true) {
        console.log('Confirmation Required')
        if(confirm("Are You Sure You Want To Clear Settings")) {
            console.log('Confirmation = True, Proceeding')
            ClearSettings();
            return;
        }
        console.log('Confirmation = False, Cancelling')
    } else {
        console.log('Confirmation Not Required, Proceeding')
        ClearSettings();
        return;
    }
}

function ClearSettings() {
    console.log('Clearing Settings'); // debugging console

    // clears all values, apart from color
    document.getElementById('Webhook').value = "";
    document.getElementById('Title').value = "";
    document.getElementById('Description').value = "";
    document.getElementById('ImageURL').value = "";
    document.getElementById('ThumbnailURL').value = "";
    document.getElementById('AuthorName').value = "";
    document.getElementById('AuthorURL').value = "";
    document.getElementById('AuthorImageURL').value = "";
    document.getElementById('Footer').value = "";
    document.getElementById('FooterImageURL').value = "";
}