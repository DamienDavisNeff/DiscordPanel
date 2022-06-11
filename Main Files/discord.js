// The link to status codes in the Discord API
// Put it here to avoid clutter
var resultsLink = "https://discord.com/developers/docs/topics/opcodes-and-status-codes#http' target='_blank";

// ran when the 'send message' button gets pressed
function GetValues() {

    console.log('Button Pressed, Finding Values.'); // debugging console

    // gets info from value
    var url = document.getElementById('Webhook').value; // gets webhook url
    var title = document.getElementById('Title').value; // gets title
    var description = document.getElementById('Description').value; // gets description
    var imageURL = document.getElementById('ImageURL').value; // gets image url
    var thumbnailURL = document.getElementById('ThumbnailURL').value; // gets thumbnail url 
    var author = document.getElementById('AuthorName').value; // gets author name
    var authorURL = document.getElementById('AuthorURL').value; // gets author url
    var authorImageURL = document.getElementById('AuthorImageURL').value; // gets author image url
    var footer = document.getElementById('Footer').value; // gets footer title
    var footerImage = document.getElementById('FooterImageURL').value; // gets footer image url

    var override = false; // if public, set to false
    if(override == true) {
        // if public make sure these variables are set to nothing
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
        document.getElementById('results').innerHTML = "Error Code S1: Must Provide Webhook URL";
        console.log('ERROR: Code S1: Must Provide Webhook Link'); // debugging console
        return; // if there is no url, stops code execution
    }

    console.log("URL is not NULL, continuing."); // debugging console

    // runs a different function with all needed values plugged in (creates json)
    CreateJson(url,title,description,imageURL,thumbnailURL,author,authorURL,authorImageURL,footer,footerImage);
}

// runs at end of button press, and creates json file
function CreateJson(url,title,description,imageURL,thumbnailURL,author,authorURL,authorImageURL,footer,footerImage) {

    console.log('Creating JSON File'); // debugging console

    // creates json file with all variables plugged into it
    let data = `{
        "content":"**Announcement** @everyone",
        "embeds": [
            {
                "type":"rich",
                "title":"`+title+`",
                "description":"`+description+`",
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
        } else {
            // if it was not, writes response with error tag
            document.getElementById('Results').innerHTML = "Error: Response Status: <a href='"+resultsLink+"' target='_blank'>" + status; + "</a>"
        }
    }

}
